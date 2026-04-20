"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { loadGoogleMapsPlacesLibrary } from "@/lib/google-maps";

const MIN_QUERY_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 250;

function GooglePlacesAutocomplete({
  value,
  onValueChange,
  className,
  inputClassName,
  placeholder,
}) {
  const listboxId = React.useId();
  const placesLibraryRef = React.useRef(null);
  const sessionTokenRef = React.useRef(null);
  const requestSequenceRef = React.useRef(0);
  const closeTimeoutRef = React.useRef(null);
  const skipNextSearchRef = React.useRef(false);
  const [apiState, setApiState] = React.useState("idle");
  const [suggestions, setSuggestions] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [isSearching, setIsSearching] = React.useState(false);
  const [autocompleteMessage, setAutocompleteMessage] = React.useState("");

  React.useEffect(() => {
    let isCancelled = false;

    loadGoogleMapsPlacesLibrary()
      .then((placesLibrary) => {
        if (isCancelled) return;
        placesLibraryRef.current = placesLibrary;
        setApiState("ready");
        setAutocompleteMessage("");
      })
      .catch((error) => {
        if (isCancelled) return;
        setApiState("error");
        setAutocompleteMessage(
          error instanceof Error && error.message
            ? `${error.message} Controlla chiave browser, referrer e API abilitate.`
            : "Autocomplete Google non disponibile. Controlla chiave browser, referrer e API abilitate.",
        );
      });

    return () => {
      isCancelled = true;

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (apiState !== "ready") {
      return undefined;
    }

    const query = value.trim();

    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      setSuggestions([]);
      setActiveIndex(-1);
      setIsSearching(false);
      setAutocompleteMessage("");
      return undefined;
    }

    if (query.length < MIN_QUERY_LENGTH) {
      requestSequenceRef.current += 1;
      setSuggestions([]);
      setActiveIndex(-1);
      setIsSearching(false);
      setAutocompleteMessage("");
      return undefined;
    }

    const currentRequestId = requestSequenceRef.current + 1;
    requestSequenceRef.current = currentRequestId;
    setIsSearching(true);

    const timeoutId = setTimeout(async () => {
      try {
        const placesLibrary = placesLibraryRef.current ?? await loadGoogleMapsPlacesLibrary();
        placesLibraryRef.current = placesLibrary;

        if (!placesLibrary.AutocompleteSuggestion || !placesLibrary.AutocompleteSessionToken) {
          throw new Error("La libreria Places caricata non include Autocomplete.");
        }

        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new placesLibrary.AutocompleteSessionToken();
        }

        const { suggestions: rawSuggestions } =
          await placesLibrary.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: query,
            includedRegionCodes: ["it"],
            language: "it",
            region: "it",
            sessionToken: sessionTokenRef.current,
          });

        if (requestSequenceRef.current !== currentRequestId) {
          return;
        }

        const nextSuggestions = rawSuggestions
          .map(({ placePrediction }) => ({
            id: placePrediction.placeId,
            primaryText: placePrediction.mainText?.text || placePrediction.text?.text || "",
            secondaryText: placePrediction.secondaryText?.text || "",
            fullText: placePrediction.text?.text || "",
            placePrediction,
          }))
          .filter((suggestion) => suggestion.fullText);

        setSuggestions(nextSuggestions);
        setActiveIndex(nextSuggestions.length ? 0 : -1);
        setAutocompleteMessage(
          nextSuggestions.length ? "" : "Nessun suggerimento trovato per questo testo.",
        );
      } catch (error) {
        if (requestSequenceRef.current !== currentRequestId) {
          return;
        }

        setSuggestions([]);
        setActiveIndex(-1);
        setAutocompleteMessage(
          error instanceof Error && error.message
            ? `${error.message} Controlla chiave browser, referrer e API abilitate.`
            : "Autocomplete Google non disponibile. Verifica la chiave browser e aggiungi anche 127.0.0.1 se non usi localhost.",
        );
      } finally {
        if (requestSequenceRef.current === currentRequestId) {
          setIsSearching(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [apiState, value]);

  const selectSuggestion = React.useCallback(async (suggestion) => {
    const placesLibrary = placesLibraryRef.current;
    let resolvedText = suggestion.fullText;

    setSuggestions([]);
    setActiveIndex(-1);
    setAutocompleteMessage("");
    setIsSearching(true);

    try {
      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: ["displayName", "formattedAddress"],
      });

      resolvedText =
        place.formattedAddress ||
        place.displayName ||
        suggestion.fullText;
    } catch {
      resolvedText = suggestion.fullText;
    } finally {
      setIsSearching(false);
    }

    skipNextSearchRef.current = true;
    onValueChange(resolvedText);

    if (placesLibrary) {
      sessionTokenRef.current = new placesLibrary.AutocompleteSessionToken();
    } else {
      sessionTokenRef.current = null;
    }
  }, [onValueChange]);

  const handleKeyDown = React.useCallback(async (event) => {
    if (!suggestions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((currentIndex) => (currentIndex + 1) % suggestions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) => (currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1));
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      await selectSuggestion(suggestions[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  }, [activeIndex, selectSuggestion, suggestions]);

  const handleBlur = React.useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setSuggestions([]);
      setActiveIndex(-1);
    }, 150);
  }, []);

  const handleFocus = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  }, []);

  const showSuggestions = suggestions.length > 0;

  return (
    <div className={className}>
      <div className="relative">
        <Input
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls={showSuggestions ? listboxId : undefined}
          autoComplete="off"
        />

        {showSuggestions && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-[20px] border border-white/10 bg-[#11161C] shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => {
                  event.preventDefault();
                  void selectSuggestion(suggestion);
                }}
                className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition-colors ${
                  index === activeIndex ? "bg-[#10B7B3]/12 text-white" : "text-[#D7DCE2] hover:bg-white/5"
                }`}
              >
                <span className="text-sm font-medium">{suggestion.primaryText}</span>
                {suggestion.secondaryText && (
                  <span className="text-xs text-[#8F98A3]">{suggestion.secondaryText}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 px-1 text-xs leading-5 text-[#8F98A3]">
        {isSearching
          ? "Ricerca suggerimenti in corso..."
          : autocompleteMessage || "Scrivi almeno 3 caratteri per vedere i suggerimenti."}
      </div>
    </div>
  );
}

export { GooglePlacesAutocomplete };

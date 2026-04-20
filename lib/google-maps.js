let googleMapsPlacesPromise;

export function loadGoogleMapsPlacesLibrary() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps puo essere caricato solo nel browser."));
  }

  if (window.google?.maps?.places) {
    return Promise.resolve(window.google.maps.places);
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return Promise.reject(new Error("Variabile mancante: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"));
  }

  if (!googleMapsPlacesPromise) {
    googleMapsPlacesPromise = new Promise((resolve, reject) => {
      const callbackName = "__easyBattGoogleMapsInit";
      const authFailureHandlerName = "gm_authFailure";
      const existingScript = document.querySelector('script[data-google-maps-loader="true"]');
      const cleanup = () => {
        window.clearTimeout(timeoutId);

        if (window[callbackName]) {
          delete window[callbackName];
        }

        if (window[authFailureHandlerName] === handleAuthFailure) {
          delete window[authFailureHandlerName];
        }
      };
      const fail = (message) => {
        cleanup();
        googleMapsPlacesPromise = null;
        reject(new Error(message));
      };
      const resolvePlacesLibrary = () => {
        if (window.google?.maps?.places) {
          cleanup();
          resolve(window.google.maps.places);
          return;
        }

        fail("Google Maps caricato, ma la libreria Places non e disponibile.");
      };
      const timeoutId = window.setTimeout(() => {
        fail("Timeout nel caricamento di Google Maps.");
      }, 15000);
      const handleAuthFailure = () => {
        fail("Google Maps ha rifiutato la chiave browser.");
      };

      window[callbackName] = resolvePlacesLibrary;
      window[authFailureHandlerName] = handleAuthFailure;

      if (existingScript) {
        if (window.google?.maps?.places) {
          resolvePlacesLibrary();
          return;
        }
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&libraries=places&v=weekly&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      script.dataset.googleMapsLoader = "true";
      script.onerror = () => {
        fail("Impossibile caricare Google Maps.");
      };
      document.head.appendChild(script);
    });
  }

  return googleMapsPlacesPromise;
}

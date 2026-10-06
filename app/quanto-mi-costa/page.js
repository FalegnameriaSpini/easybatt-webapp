"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calculator as CalcIcon,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Layers3,
  MapPin,
  Package,
  PhoneCall,
  Ruler,
  Truck,
  Wrench,
  CheckCircle2 as CheckCircleIcon,
} from "lucide-react";
import { Button as ButtonComp } from "@/components/ui/button";
import { Card as CardComp, CardContent as CardContentComp, CardDescription as CardDescriptionComp, CardHeader as CardHeaderComp, CardTitle as CardTitleComp } from "@/components/ui/card";
import { GooglePlacesAutocomplete } from "@/components/google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { eb } from "@/app/easybatt-ui";
import { FINISH_FAMILY_ORDER } from "@/lib/easybatt-catalog.mjs";
import { AccountLink } from "@/components/account-link";
import { getCustomerAuth, customerHeaders } from "@/lib/easybatt-auth-client";

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

function getShippingPrice(weightKg, shippingBands) {
  if (weightKg <= 0) return 0;
  const band = shippingBands.find((item) => weightKg <= item.maxKg);
  return band ? band.price : shippingBands[shippingBands.length - 1]?.price ?? 0;
}

function ModelImagePreview({ title, src, alt, contain = false }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#11161C]">
      <div className="flex h-44 items-center justify-center bg-white/[0.03]">
        {src ? (
          <img src={src} alt={alt} className={`h-full w-full ${contain ? "bg-white p-3 object-contain" : "object-cover"}`} />
        ) : (
          <div className="px-4 text-center text-sm leading-6 text-[#8F98A3]">
            Immagine non ancora caricata
          </div>
        )}
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-sm font-semibold text-[#E3E7EC]">
        {title}
      </div>
    </div>
  );
}

function StepHeading({ number, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#10B7B3] text-xs font-bold text-[#11161C]">
        {number}
      </span>
      <h3 className="text-base font-semibold text-white">{children}</h3>
    </div>
  );
}

function SummaryDisclosure({ title, children }) {
  return (
    <details className="group/disclosure border-t border-white/10">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-semibold text-[#E3E7EC] outline-none focus-visible:ring-2 focus-visible:ring-[#10B7B3] [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-4 w-4 shrink-0 text-[#72E6E2] transition-transform group-open/disclosure:rotate-180" />
      </summary>
      <div className="grid gap-3 pb-3">{children}</div>
    </details>
  );
}

function ChoiceButton({ active, children, className = "", ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
        active
          ? "border-[#10B7B3]/70 bg-[#10B7B3] text-[#11161C] shadow-[0_8px_24px_rgba(16,183,179,0.18)]"
          : "border-white/10 bg-[#11161C] text-[#D9DDE2] hover:border-[#10B7B3]/35 hover:bg-white/[0.04]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const inputClassName =
  "h-12 rounded-2xl !border !border-white/20 !bg-[#10B7B3] !text-[#11161C] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-200 " +
  "hover:!border-[#10B7B3]/45 hover:!bg-[#0A8B87] " +
  "focus-visible:!border-[#10B7B3] focus-visible:!bg-[#0A8B87] focus-visible:!ring-2 focus-visible:!ring-[#10B7B3]/25 focus-visible:!outline-none " +
  "placeholder:!text-[#3A4147]";

const estimateFieldLabelClassName = "text-base font-semibold leading-6 text-white";
const neutralButtonClassName =
  `${eb.outlineButton} active:bg-[#10B7B3] active:text-white active:border-[#0A8B87] focus-visible:bg-[#10B7B3] focus-visible:text-white focus-visible:border-[#0A8B87] hover:border-[#10B7B3]/35`;
const finalSecondaryButtonClassName =
  "h-auto min-h-12 whitespace-normal rounded-2xl py-3 text-center text-base select-none touch-manipulation transition-all duration-150 active:scale-[0.98] focus-visible:scale-[0.98]";
const finalNeutralButtonClassName =
  `${eb.outlineButton} ${finalSecondaryButtonClassName} !border-white/10 !bg-transparent !text-white hover:!border-[#10B7B3]/35 hover:!bg-white/[0.06] active:!bg-[#10B7B3] active:!text-white active:!border-[#0A8B87] focus-visible:!bg-[#10B7B3] focus-visible:!text-white focus-visible:!border-[#0A8B87]`;
const finalTealAccentButtonClassName =
  `${finalSecondaryButtonClassName} !border-[#0A8B87] !bg-[#10B7B3] !text-white font-semibold hover:-translate-y-0.5 hover:!border-[#0A8B87] hover:!bg-[#22C7C2] hover:!text-white active:!bg-[#0A8B87] active:!text-white active:!border-[#08716E] focus-visible:!bg-[#10B7B3] focus-visible:!text-white focus-visible:!border-[#0A8B87]`;

function BrandLockup() {
  return (
    <div className="rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.1),_transparent_32%),linear-gradient(135deg,_rgba(20,23,29,0.98),_rgba(29,32,38,0.98))] px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:px-4">
      <div className="flex items-center">
        <img
          src="/Logo_easybatt_trasp.png"
          alt="EasyBatt - Battiscopa pronti da posare senza tagli sul posto"
          className="h-auto max-h-[108px] w-full max-w-[300px] object-contain object-left sm:max-w-[328px] lg:max-w-[352px] xl:max-w-[368px]"
        />
      </div>
    </div>
  );
}

function BrandHeader() {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <Link href="/" aria-label="Torna alla home EasyBatt" className="block w-full max-w-[368px]">
        <BrandLockup />
      </Link>
      <AccountLink />
    </header>
  );
}

export function EasyBattQuantoMiCostaPage() {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    let active = true;
    let subscription;
    const refresh = () => setAttempt((n) => n + 1);
    window.addEventListener("focus", refresh);
    getCustomerAuth().then(({ client }) => {
      if (!active || !client) return;
      subscription = client.auth.onAuthStateChange((event) => {
        if (active && event !== "INITIAL_SESSION") {
          if (event === "SIGNED_OUT") { setConfig(null); setPricing(null); }
          refresh();
        }
      }).data.subscription;
    }).catch(() => {});
    return () => { active = false; subscription?.unsubscribe(); window.removeEventListener("focus", refresh); };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getCustomerAuth().then(async ({ client }) => fetch("/api/easybatt-config", { headers: await customerHeaders(client), cache: "no-store", signal: controller.signal }))
      .then(async (response) => {
        const payload = await response.json();
        if (controller.signal.aborted) return;
        if (response.status === 401) throw new Error("Sessione scaduta. Accedi nuovamente dal tuo account.");
        if (!response.ok || !payload?.config) throw new Error("Il listino non e' disponibile al momento. Riprova tra poco.");
        setConfig(payload.config);
        setPricing(payload.pricing || null);
        setError("");
      })
      .catch((error) => {
        if (!controller.signal.aborted) { setConfig(null); setPricing(null); setError(error.message || "Caricamento non riuscito."); }
      });
    return () => controller.abort();
  }, [attempt]);

  if (config) return <QuoteConfigurator pricingConfig={config} pricing={pricing} />;
  return (
    <main className="min-h-screen bg-[#17191D] text-white">
      <div className={eb.pageShell}>
        <BrandHeader />
        <p role={error ? "alert" : "status"} className="py-6 text-base">{error || "Caricamento listino..."}</p>
        {error && <ButtonComp className={eb.primaryButtonYellow} onClick={() => { setError(""); setAttempt((value) => value + 1); }}>Riprova</ButtonComp>}
      </div>
    </main>
  );
}

function QuoteConfigurator({ pricingConfig, pricing }) {
  const [finishFamilyFilter, setFinishFamilyFilter] = useState("");
  const [finishImageFilter, setFinishImageFilter] = useState("");
  const [measureFilter, setMeasureFilter] = useState("");
  const [profileFilter, setProfileFilter] = useState("");
  const [linearMeters, setLinearMeters] = useState(100);
  const [returnKm, setReturnKm] = useState("");
  const [includeSupply, setIncludeSupply] = useState(true);
  const [includeShipping, setIncludeShipping] = useState(true);
  const [includePickup, setIncludePickup] = useState(false);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [isDistanceLoading, setIsDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState("");
  const [distanceMeta, setDistanceMeta] = useState(null);
  const [isLinearMetersFocused, setIsLinearMetersFocused] = useState(false);
  const models = useMemo(
    () => pricingConfig.models.filter((model) => model.active !== false),
    [pricingConfig.models],
  );
  const defaultModel = models[0];
  const whatsappUrl = `https://wa.me/${pricingConfig.whatsappNumber}?text=${encodeURIComponent(pricingConfig.whatsappMessage)}`;

  const finishFamilies = useMemo(() => {
    const available = new Set(models.map((model) => model.finishFamily));
    return [
      ...FINISH_FAMILY_ORDER.filter((family) => available.has(family)),
      ...[...available].filter((family) => !FINISH_FAMILY_ORDER.includes(family)).sort(),
    ];
  }, [models]);

  const selectedFamily = finishFamilies.includes(finishFamilyFilter)
    ? finishFamilyFilter
    : finishFamilies[0] || "";

  const finishOptions = useMemo(() => {
    const byImage = new Map();
    models
      .filter((model) => model.finishFamily === selectedFamily)
      .forEach((model) => {
        const key = model.finishKey || model.finishImageUrl || model.finishLabel;
        if (!byImage.has(key)) {
          const materialSuffix = ` \u00b7 ${model.material}`;
          byImage.set(key, {
            key,
            label: model.finishLabel.endsWith(materialSuffix)
              ? model.finishLabel.slice(0, -materialSuffix.length)
              : model.finishLabel,
            material: model.material,
            imageUrl: model.finishImageUrl,
          });
        }
      });
    return [...byImage.values()].sort((a, b) => a.label.localeCompare(b.label, "it"));
  }, [models, selectedFamily]);

  const selectedFinishImage = finishOptions.some((item) => item.key === finishImageFilter)
    ? finishImageFilter
    : finishOptions[0]?.key || "";

  const finishModels = useMemo(
    () => models.filter((model) =>
      model.finishFamily === selectedFamily &&
      (model.finishKey || model.finishImageUrl || model.finishLabel) === selectedFinishImage,
    ),
    [models, selectedFamily, selectedFinishImage],
  );

  const profileOptions = useMemo(() => {
    const byProfile = new Map();
    finishModels.forEach((model) => {
      if (!byProfile.has(model.profile)) {
        byProfile.set(model.profile, {
          key: model.profile,
          label: model.profile,
        });
      }
    });
    return [...byProfile.values()].sort((a, b) => a.label.localeCompare(b.label, "it"));
  }, [finishModels]);

  const selectedProfile = profileOptions.some((item) => item.key === profileFilter)
    ? profileFilter
    : profileOptions[0]?.key || "";

  const profileModels = useMemo(
    () => finishModels.filter((model) => model.profile === selectedProfile),
    [finishModels, selectedProfile],
  );

  const measureOptions = useMemo(() => {
    const byMeasure = new Map();
    profileModels.forEach((model) => {
      if (!byMeasure.has(model.measure)) byMeasure.set(model.measure, model);
    });
    return [...byMeasure.values()]
      .sort((a, b) => a.height - b.height || a.thickness - b.thickness)
      .map((model) => ({
        key: model.measure,
        label: `${model.height} × ${model.thickness} mm`,
        imageUrl: model.sectionImageUrl,
      }));
  }, [profileModels]);

  const selectedMeasure = measureOptions.some((item) => item.key === measureFilter)
    ? measureFilter
    : measureOptions[0]?.key || "";

  const selectedModel = profileModels.find((model) => model.measure === selectedMeasure) ?? defaultModel;

  const resetFilters = () => {
    setFinishFamilyFilter("");
    setFinishImageFilter("");
    setMeasureFilter("");
    setProfileFilter("");
  };

  const switchClassName =
    "data-[state=unchecked]:bg-[#2A2E34] data-[state=unchecked]:border-white/10 data-[state=checked]:bg-[#10B7B3] data-[state=checked]:border-[#10B7B3]/40";

  const handleShippingChange = (checked) => {
    setIncludeShipping(checked);

    if (checked) {
      setIncludePickup(false);
    }
  };

  const handlePickupChange = (checked) => {
    setIncludePickup(checked);

    if (checked) {
      setIncludeShipping(false);
    }
  };

  const handleZipCodeChange = (nextValue) => {
    setZipCode(nextValue);
    setReturnKm("");
    setDistanceError("");
    setDistanceMeta(null);
  };

  const handleCalculateDistance = async () => {
    const destinationQuery = zipCode.trim();

    if (!destinationQuery) {
      setDistanceMeta(null);
      setDistanceError("Inserisci indirizzo o CAP/località prima di calcolare i km.");
      return;
    }

    setIsDistanceLoading(true);
    setDistanceError("");
    setDistanceMeta(null);

    try {
      const response = await fetch("/api/quanto-mi-costa/distance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destinationQuery }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Calcolo non riuscito. Verifica l'indirizzo e riprova.");
      }

      setReturnKm(String(payload.returnKm));
      setDistanceMeta({
        mode: "auto",
        precision: payload.precision,
        resolvedAddress: payload.resolvedAddress,
        originLabel: payload.originLabel,
      });
    } catch (error) {
      setDistanceMeta(null);
      setDistanceError(error.message || "Calcolo non riuscito. Verifica l'indirizzo e riprova.");
    } finally {
      setIsDistanceLoading(false);
    }
  };

  const distanceFeedback = distanceError
    ? {
        tone: "error",
        message: distanceError,
      }
    : distanceMeta?.mode === "auto"
      ? {
          tone: distanceMeta.precision === "approx" ? "approx" : "success",
        message:
          distanceMeta.precision === "approx"
            ? "Calcolo basato su CAP/località"
            : "Km calcolati automaticamente",
        }
      : zipCode.trim()
        ? {
            tone: "pending",
            message: "Conferma l'indirizzo per calcolare la trasferta.",
          }
        : null;

  const calculation = useMemo(() => {
    const rawMl = Number(linearMeters);
    const rawKm = Number(returnKm);
    const ml = Number.isFinite(rawMl) ? Math.max(0, rawMl) : 0;
    const km = Number.isFinite(rawKm) ? Math.max(0, rawKm) : 0;
    const supplyUnitPrice = includeSupply ? (selectedModel?.supplyPricePerMl ?? 0) : 0;
    const baseWeight = includeSupply ? (selectedModel?.weightKgMl ?? 0) * ml : 0;
    const totalWeight = includeSupply ? baseWeight + pricingConfig.packagingWeightKgMl * ml : 0;
    const serviceSubtotal = ml * pricingConfig.serviceRate;
    const travelSubtotal = km * pricingConfig.travelRate;
    const serviceAndTravelSubtotal = serviceSubtotal + travelSubtotal;
    const supplySubtotal = includeSupply ? ml * supplyUnitPrice : 0;
    const shippingNeedsQuote = includeShipping && !includePickup && !includeSupply;
    const shippingSubtotal = includeShipping && !includePickup && includeSupply ? getShippingPrice(totalWeight, pricingConfig.shippingBands) : 0;
    const installationSubtotal = includeInstallation ? ml * pricingConfig.installationRate : 0;
    const subtotal = serviceSubtotal + travelSubtotal + supplySubtotal + shippingSubtotal + installationSubtotal;
    const vat = subtotal * pricingConfig.vat;
    const total = subtotal + vat;

    return {
      ml,
      km,
      supplyUnitPrice,
      baseWeight,
      totalWeight,
      serviceSubtotal,
      travelSubtotal,
      serviceAndTravelSubtotal,
      supplySubtotal,
      shippingSubtotal,
      shippingNeedsQuote,
      installationSubtotal,
      subtotal,
      vat,
      total,
    };
  }, [includeInstallation, includePickup, includeShipping, includeSupply, linearMeters, pricingConfig, returnKm, selectedModel]);

  const projectSummary = useMemo(() => {
    const chantierAddress = distanceMeta?.resolvedAddress || zipCode.trim() || "Da definire";
    const servizi = [
      "Misurazione e taglio",
      includeSupply && "Fornitura battiscopa",
      includeShipping && !includePickup && !calculation.shippingNeedsQuote && "Spedizione",
      includePickup && "Ritiro presso la sede",
      includeInstallation && "Posa in opera",
    ].filter(Boolean);

    return [
      "Ciao, ho configurato un progetto EasyBatt 👇",
      "",
      `📐 Metri battiscopa: ${calculation.ml} ml`,
      ...(includeSupply
        ? [`📦 Modello: ${selectedModel?.description || "Non selezionato"}`]
        : ["Fornitura battiscopa esclusa: materiale del cliente."]),
      `📍 Località: ${chantierAddress}`,
      "",
      `💰 Totale calcolato: ${euro.format(calculation.total)}`,
      ...(calculation.shippingNeedsQuote ? ["Spedizione richiesta: da quotare a parte, esclusa dal totale."] : []),
      "",
      ...(servizi.length ? ["Servizi inclusi:", ...servizi.map((servizio) => `- ${servizio}`), ""] : []),
      "Possiamo verificare insieme il progetto?",
    ].join("\n");
  }, [
    calculation.ml,
    calculation.total,
    calculation.shippingNeedsQuote,
    distanceMeta?.resolvedAddress,
    includeInstallation,
    includePickup,
    includeShipping,
    includeSupply,
    selectedModel?.description,
    zipCode,
  ]);

  const whatsappRecapUrl = useMemo(
    () => `https://wa.me/${pricingConfig.whatsappNumber}?text=${encodeURIComponent(`${pricingConfig.whatsappRecapMessage}\n\n${projectSummary}`)}`,
    [pricingConfig.whatsappNumber, pricingConfig.whatsappRecapMessage, projectSummary],
  );

  const resolvedLocationLabel = distanceMeta?.resolvedAddress || zipCode.trim();

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <div className={`${eb.pageShell} lg:max-w-[1800px]`}>
        <BrandHeader />
        {pricing?.kind === "dedicated" && <p className="mb-5 text-sm text-[#72E6E2]">Listino applicato: <strong>{pricing.name}</strong></p>}

        <div className="mb-6 max-w-3xl">
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">Quanto mi costa EasyBatt?</h1>
          <p className="mt-3 text-base leading-relaxed text-[#B6BDC6]">
            Calcola una stima indicativa in autonomia, senza registrarti o lasciare contatti.
            Il calcolo non invia una richiesta e non conferma un ordine.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="grid min-w-0 gap-6">
            <CardComp id="service-configuration" className={eb.cardInteractive}>
              <CardHeaderComp>
                <CardTitleComp role="heading" aria-level={2} className="flex items-center gap-2 text-xl text-white">
                  <CalcIcon className="h-5 w-5 text-[#F8E58A]" />
                  Configura il servizio
                </CardTitleComp>
              </CardHeaderComp>
              <CardContentComp className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="linear-meters" className={estimateFieldLabelClassName}>Quanti metri di battiscopa ti servono?</Label>
                  <Input
                    id="linear-meters"
                    className={inputClassName}
                    type="number"
                    min={0}
                    value={linearMeters}
                    onChange={(e) => setLinearMeters(e.target.value)}
                    onFocus={() => setIsLinearMetersFocused(true)}
                    onBlur={() => setIsLinearMetersFocused(false)}
                  />
                  {isLinearMetersFocused && (
                    <div className="rounded-[20px] border border-[#10B7B3]/20 bg-white/[0.04] px-4 py-3 text-sm text-[#D9E8E7] shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
                      <div className="font-semibold text-white">Non sai quanti metri inserire?</div>
                      <div className="mt-2 leading-6 text-[#C7CDD5]">
                        Per una prima valutazione puoi inserire i metri stimati aggiungendo circa un 10% di margine.
                      </div>
                      <div className="mt-2 leading-6 text-[#C7CDD5]">
                        Il prezzo verrà verificato sui metri reali prima della conferma dell&apos;ordine.
                      </div>
                      <div className="mt-2 leading-6 text-[#A7F3F0]">
                        Se hai dubbi, contattaci usando il pulsante WhatsApp in fondo alla pagina.
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label className={estimateFieldLabelClassName}>Dove si trova il cantiere?</Label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <GooglePlacesAutocomplete
                      className="flex-1"
                      inputClassName={inputClassName}
                      placeholder="Es. Via Roma 12, Lonato del Garda oppure 25017 Lonato del Garda"
                      value={zipCode}
                      onValueChange={handleZipCodeChange}
                    />
                    <ButtonComp
                      type="button"
                      onClick={handleCalculateDistance}
                      disabled={isDistanceLoading || !zipCode.trim()}
                      className={`${eb.primaryButtonYellow} h-12 rounded-2xl px-4 text-sm disabled:pointer-events-none disabled:opacity-60`}
                    >
                      {isDistanceLoading ? "Calcolo..." : "Conferma l'Indirizzo"}
                    </ButtonComp>
                  </div>
                  {distanceFeedback && (
                    <div
                      className={`px-1 text-sm ${
                        distanceFeedback.tone === "error"
                          ? "text-[#F2A3A3]"
                          : distanceFeedback.tone === "approx"
                            ? "text-[#F8E58A]"
                            : distanceFeedback.tone === "pending"
                              ? "text-[#AEB6BF]"
                              : "text-[#72E6E2]"
                      }`}
                    >
                      {distanceFeedback.message}
                    </div>
                  )}
                  {distanceMeta?.mode === "auto" && distanceMeta.resolvedAddress && (
                    <div className="px-1 text-xs leading-6 text-[#8F98A3]">
                      Destinazione trovata: {distanceMeta.resolvedAddress}
                    </div>
                  )}
                </div>

                <div className="grid gap-2 sm:max-w-sm">
                  <Label className={estimateFieldLabelClassName}>Distanza A/R calcolata</Label>
                  <Input
                    aria-readonly="true"
                    className={`${inputClassName} cursor-not-allowed`}
                    placeholder="Da confermare"
                    readOnly
                    type="number"
                    value={returnKm}
                  />
                </div>

                <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#17191D] p-4">
                  <div className="grid gap-1 px-1">
                    <div className="text-base font-semibold tracking-[0.01em] text-white">Opzioni del servizio</div>
                    <div className="text-sm text-[#8F98A3]">Personalizza la tua soluzione</div>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3.5">
                    <div>
                      <div className="font-semibold text-white">Fornitura battiscopa inclusa</div>
                      <div className="text-sm text-[#9FA7B0]">Ricevi il materiale già pronto da posare</div>
                    </div>
                    <Switch aria-label="Fornitura battiscopa inclusa" className={switchClassName} checked={includeSupply} onCheckedChange={setIncludeSupply} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3.5">
                    <div>
                      <div className="font-semibold text-white">{includeSupply ? "Spedizione inclusa" : "Richiedi spedizione"}</div>
                      <div className="text-sm text-[#9FA7B0]">{includeSupply ? "Consegna diretta dove serve" : "Con materiale del cliente, costo da quotare a parte"}</div>
                    </div>
                    <Switch aria-label="Spedizione" className={switchClassName} checked={includeShipping} onCheckedChange={handleShippingChange} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3.5">
                    <div>
                      <div className="font-semibold text-white">Ritiro presso la sede</div>
                      <div className="text-sm text-[#9FA7B0]">Risparmi la spedizione ritirando direttamente</div>
                    </div>
                    <Switch aria-label="Ritiro presso la sede" className={switchClassName} checked={includePickup} onCheckedChange={handlePickupChange} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3.5">
                    <div>
                      <div className="font-semibold text-white">Posa in opera inclusa</div>
                      <div className="text-sm text-[#9FA7B0]">Valuta subito anche il servizio completo</div>
                    </div>
                    <Switch aria-label="Posa in opera inclusa" className={switchClassName} checked={includeInstallation} onCheckedChange={setIncludeInstallation} />
                  </div>
                </div>
              </CardContentComp>
            </CardComp>

            {includeSupply && (
              <CardComp id="battiscopa-selection" className={eb.cardInteractive}>
                <CardHeaderComp>
                  <CardTitleComp role="heading" aria-level={2} className="flex items-center gap-2 text-xl text-white">
                    <Layers3 className="h-5 w-5 text-[#72E6E2]" />
                    Scegli il battiscopa
                  </CardTitleComp>
                  <CardDescriptionComp className="text-base leading-7 text-[#B6BDC6]">
                    Filtra i modelli e seleziona quello più adatto al tuo progetto.
                  </CardDescriptionComp>
                </CardHeaderComp>
                <CardContentComp className="grid gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <ButtonComp
                      type="button"
                      variant="outline"
                      onClick={resetFilters}
                      className={`${neutralButtonClassName} h-10 px-4 text-sm sm:ml-auto`}
                    >
                      Reimposta filtri
                    </ButtonComp>
                  </div>

                  <div className="grid gap-5">
                    <div className="grid gap-3">
                      <StepHeading number="1">Famiglia di finitura</StepHeading>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {finishFamilies.map((family) => (
                          <ChoiceButton
                            key={family}
                            active={family === selectedFamily}
                            onClick={() => {
                              setFinishFamilyFilter(family);
                              setFinishImageFilter("");
                              setMeasureFilter("");
                              setProfileFilter("");
                            }}
                          >
                            {family}
                          </ChoiceButton>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <StepHeading number="2">Finitura</StepHeading>
                      <div className="grid max-h-[420px] auto-rows-max grid-cols-2 content-start gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:max-h-[620px] xl:grid-cols-4 2xl:grid-cols-5">
                        {finishOptions.map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            aria-pressed={item.key === selectedFinishImage}
                            onClick={() => {
                              setFinishImageFilter(item.key);
                              setMeasureFilter("");
                              setProfileFilter("");
                            }}
                            className={`flex min-w-0 flex-col overflow-hidden rounded-xl border text-left transition ${
                              item.key === selectedFinishImage
                                ? "border-[#10B7B3]/70 bg-[#10B7B3]/12 shadow-[0_8px_24px_rgba(16,183,179,0.14)]"
                                : "border-white/10 bg-[#11161C] hover:border-[#10B7B3]/35"
                            }`}
                          >
                            <span className="flex h-20 w-full shrink-0 items-center justify-center bg-white/[0.04]">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <span className="text-xs text-[#8F98A3]">Nessuna immagine</span>
                              )}
                            </span>
                            <span className="flex w-full flex-1 flex-col gap-1 px-3 py-3 [overflow-wrap:anywhere]">
                              <span className="block text-sm font-semibold leading-5 text-white">{item.label}</span>
                              {item.material && (
                                <span className="block text-xs leading-4 text-[#B8C0CC]">{item.material}</span>
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <StepHeading number="3">Profilo</StepHeading>
                      <div className="flex flex-wrap gap-2">
                        {profileOptions.map((item) => (
                          <ChoiceButton
                            key={item.key}
                            active={item.key === selectedProfile}
                            onClick={() => {
                              setProfileFilter(item.key);
                              setMeasureFilter("");
                            }}
                          >
                            {item.label}
                          </ChoiceButton>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <StepHeading number="4">Misura</StepHeading>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {measureOptions.map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            aria-pressed={item.key === selectedMeasure}
                            onClick={() => setMeasureFilter(item.key)}
                            className={`flex min-w-0 flex-col overflow-hidden rounded-xl border text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B7B3] ${
                              item.key === selectedMeasure
                                ? "border-[#10B7B3]/70 bg-[#10B7B3]/12"
                                : "border-white/10 bg-[#11161C] hover:border-[#10B7B3]/35"
                            }`}
                          >
                            <span className="flex h-28 w-full shrink-0 items-center justify-center bg-white p-2 sm:h-32">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt="" className="h-full w-full object-contain" />
                              ) : (
                                <span className="text-xs text-[#68717A]">Nessuna immagine</span>
                              )}
                            </span>
                            <span className="block w-full px-3 py-2 text-sm font-semibold text-white [overflow-wrap:anywhere]">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedModel && (
                    <div className="grid gap-4 rounded-[24px] bg-[#17191D] p-4">
                      <div className="grid gap-3 [overflow-wrap:anywhere] sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                        <div className={eb.statInset}>
                          <div className="text-xs text-[#8F98A3]">Codice</div>
                          <div className="mt-1 font-semibold text-white">{selectedModel.code}</div>
                        </div>
                        <div className={eb.statInset}>
                          <div className="text-xs text-[#8F98A3]">Profilo</div>
                          <div className="mt-1 font-semibold text-white">{selectedModel.profile}</div>
                        </div>
                        <div className={eb.statInset}>
                          <div className="text-xs text-[#8F98A3]">Sezione</div>
                          <div className="mt-1 font-semibold text-white">{selectedModel.height} × {selectedModel.thickness} mm</div>
                        </div>
                        <div className={eb.statInset}>
                          <div className="text-xs text-[#8F98A3]">Finitura</div>
                          <div className="mt-1 font-semibold text-white">{selectedModel.finishLabel}</div>
                        </div>
                        <div className={eb.statInset}>
                          <div className="text-xs text-[#8F98A3]">Lunghezza stecca</div>
                          <div className="mt-1 font-semibold text-white">{selectedModel.stickLengthLabel} mm</div>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <ModelImagePreview
                          title="Sezione tecnica"
                          src={selectedModel.sectionImageUrl}
                          alt={`Sezione tecnica ${selectedModel.description}`}
                          contain
                        />
                        <ModelImagePreview
                          title="Finitura"
                          src={selectedModel.finishImageUrl}
                          alt={`Finitura ${selectedModel.finishLabel}`}
                        />
                      </div>
                    </div>
                  )}
                </CardContentComp>
              </CardComp>
            )}
          </div>

          <aside aria-label="Riepilogo della stima" className="min-w-0 self-start lg:sticky lg:top-6">
            <CardComp className={`${eb.card} lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto`}>
              <CardHeaderComp>
                <CardTitleComp className="text-xl text-white">La tua stima indicativa</CardTitleComp>
              </CardHeaderComp>
              <CardContentComp className="grid min-w-0 gap-4 [overflow-wrap:anywhere] [&_svg]:shrink-0">
                <div className="border-b border-white/10 pb-4">
                  <div className="text-sm text-[#B6BDC6]">Totale stimato, IVA inclusa</div>
                  <div aria-live="polite" aria-atomic="true" className="mt-2 text-3xl font-bold text-[#F4CC18] xl:text-4xl">{euro.format(calculation.total)}</div>
                  {calculation.shippingNeedsQuote && (
                    <div className="mt-2 text-sm font-semibold text-[#F8E58A]">Spedizione da quotare a parte, esclusa dal totale.</div>
                  )}
                  <div className="mt-2 text-sm leading-5 text-[#B6BDC6]">Non è un preventivo definitivo. Misure, fattibilità e costi vanno verificati prima dell&apos;ordine.</div>
                </div>

                <div className="grid gap-3 text-sm text-[#D9E8E7]">
                  <div className="flex items-start gap-3">
                    <Ruler className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white">Misurazione e taglio</div>
                      <div className="mt-1 text-[#B6BDC6]">{calculation.ml} metri lineari</div>
                      {includeSupply && <div className="mt-2 text-[#D9E8E7]">{selectedModel?.description}</div>}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wrench className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div>Fornitura {includeSupply ? "inclusa" : "esclusa"} · {includePickup ? "Ritiro in sede" : calculation.shippingNeedsQuote ? "Spedizione da quotare" : includeShipping ? "Spedizione inclusa" : "Consegna da concordare"}{includeInstallation ? " · Posa inclusa" : ""}</div>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-white/10 pt-4">
                  <p className="text-sm leading-6 text-[#B6BDC6]">Hai un lavoro concreto? Con Prova EasyBatt ne valutiamo insieme la fattibilità.</p>
                  <ButtonComp asChild className={finalTealAccentButtonClassName}>
                    <Link href="/prova-easybatt?from=%2Fquanto-mi-costa#progetto">
                      Valutiamo il tuo progetto
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </ButtonComp>
                </div>

                <ButtonComp asChild variant="outline" className={finalNeutralButtonClassName}>
                  <a href={whatsappRecapUrl} target="_blank" rel="noreferrer" draggable={false} onContextMenu={(e) => e.preventDefault()}>
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Invia il riepilogo su WhatsApp
                  </a>
                </ButtonComp>

                <div>
                  <SummaryDisclosure title="Dettaglio del prezzo">
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                        <span className="text-[15px] font-medium text-[#E3E7EC]">Servizio di taglio e preparazione</span>
                        <span className="shrink-0 whitespace-nowrap font-semibold text-white">{euro.format(calculation.serviceAndTravelSubtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                        <div>
                          <div className="text-sm text-[#D0D5DB]">Fornitura battiscopa</div>
                          <div className="text-xs text-[#8F98A3]">{includeSupply ? `${calculation.ml} ml × ${euro.format(calculation.supplyUnitPrice)}/ml` : "non inclusa"}</div>
                        </div>
                        <span className="shrink-0 whitespace-nowrap font-semibold text-white">{euro.format(calculation.supplySubtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                        <span className="text-sm text-[#D0D5DB]">Spedizione</span>
                        <span className="shrink-0 whitespace-nowrap font-semibold text-white">{calculation.shippingNeedsQuote ? "Da quotare" : euro.format(calculation.shippingSubtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                        <span className="text-sm text-[#D0D5DB]">Posa in opera</span>
                        <span className="shrink-0 whitespace-nowrap font-semibold text-white">{euro.format(calculation.installationSubtotal)}</span>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="flex items-center justify-between text-sm text-[#D0D5DB]">
                        <span>Subtotale imponibile</span>
                        <span className="shrink-0 whitespace-nowrap">{euro.format(calculation.subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-[#D0D5DB]">
                      <span>IVA {Math.round(pricingConfig.vat * 100)}%</span>
                        <span className="shrink-0 whitespace-nowrap">{euro.format(calculation.vat)}</span>
                      </div>
                    </div>
                  </SummaryDisclosure>

                  <SummaryDisclosure title={includeSupply ? "Consegna e pesi" : "Consegna"}>
                    <div className="grid gap-3 text-sm text-[#D9E8E7]">
                      {includeSupply && (
                        <>
                          <div className="flex items-start gap-3">
                            <Package className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                            <div>Peso battiscopa: <span className="font-semibold text-white">{calculation.baseWeight.toFixed(1)} kg</span></div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Truck className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                            <div>Peso totale con imballo: <span className="font-semibold text-white">{calculation.totalWeight.toFixed(1)} kg</span></div>
                          </div>
                        </>
                      )}
                      {!includePickup && (
                        <div className="flex items-start gap-3">
                          <Truck className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                          <div>Modalità di consegna: <span className="font-semibold text-white">{calculation.shippingNeedsQuote ? "spedizione da quotare a parte" : includeShipping ? "spedizione inclusa" : "da concordare"}</span></div>
                        </div>
                      )}
                      {includePickup && (
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                          <div>
                            <div className="font-semibold text-white">Ritiro presso la sede EasyBatt</div>
                            <div>{pricingConfig.headquartersLabel}</div>
                          </div>
                        </div>
                      )}
                      {resolvedLocationLabel && (
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                          <div>Località: <span className="font-semibold text-white">{resolvedLocationLabel}</span></div>
                        </div>
                      )}
                    </div>
                  </SummaryDisclosure>

                  <SummaryDisclosure title="Dalla stima alla valutazione">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-white">
                        <CheckCircleIcon className="h-4 w-4 text-[#F4CC18]" />
                        <span className="font-semibold">Verifichiamo insieme il progetto</span>
                      </div>
                      <div className="grid gap-3 text-sm text-[#AAB2BB]">
                        <div>1. Raccontaci il lavoro con Prova EasyBatt, anche se non hai ancora tutte le misure.</div>
                        <div>2. Ti ricontattiamo per valutare il progetto e concordare come procedere, senza impegno di acquisto.</div>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <ButtonComp asChild variant="outline" className={finalNeutralButtonClassName}>
                        <a href={whatsappUrl} target="_blank" rel="noreferrer" draggable={false} onContextMenu={(e) => e.preventDefault()}>
                          <PhoneCall className="mr-2 h-4 w-4" />
                          Hai un dubbio? Parla con noi
                        </a>
                      </ButtonComp>
                    </div>
                  </SummaryDisclosure>
                </div>
              </CardContentComp>
            </CardComp>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default EasyBattQuantoMiCostaPage;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calculator as CalcIcon,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { eb } from "@/app/easybatt-ui";

const MODELS = [
  { code: "3013R3TG01", description: "30x13 R3 Tanganika Grezzo", material: "Multist. Tanganika", height: 30, thickness: 13, profile: "Raggio 3", finish: "Grezzo", weightKgMl: 0.1014, supplyBaseCostPerMl: 3.2 },
  { code: "3013R3TG11", description: "30x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 30, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.1014, supplyBaseCostPerMl: 3.2 },
  { code: "4013R3TG11", description: "40x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 40, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.1352, supplyBaseCostPerMl: 4 },
  { code: "4013R3RV02", description: "40x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 40, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.1352, supplyBaseCostPerMl: 4 },
  { code: "5013R3TG11", description: "50x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 50, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.169, supplyBaseCostPerMl: 4 },
  { code: "5013R3RV02", description: "50x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 50, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.169, supplyBaseCostPerMl: 4 },
  { code: "8013R3TG11", description: "80x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 80, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.2704, supplyBaseCostPerMl: 4 },
  { code: "8013R3RV02", description: "80x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 80, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.2704, supplyBaseCostPerMl: 4 },
  { code: "10013R3TG11", description: "100x13 R3 Tanganika Bianco", material: "Multist. Tanganika", height: 100, thickness: 13, profile: "Raggio 3", finish: "Bianco", weightKgMl: 0.338, supplyBaseCostPerMl: 4 },
  { code: "10015AYB14", description: "100x15 Baroc Ayous 9010", material: "Massello Ayous", height: 100, thickness: 15, profile: "Barocco", finish: "Ral 9010", weightKgMl: 0.39, supplyBaseCostPerMl: 4.8 },
  { code: "12013R3RV02", description: "120x13 R3 Rovere Naturale", material: "Multistrati Rovere", height: 120, thickness: 13, profile: "Raggio 3", finish: "Naturale", weightKgMl: 0.4056, supplyBaseCostPerMl: 4.8 },
  { code: "12015ROB01", description: "120x15 Baroc Rovere Grezzo", material: "Massello Rovere", height: 120, thickness: 15, profile: "Barocco", finish: "Grezzo", weightKgMl: 0.468, supplyBaseCostPerMl: 8.96 },
];

const SERVICE_RATE = 3.6;
const TRAVEL_RATE = 0.95;
const INSTALLATION_RATE = 3;
const PACKAGING_WEIGHT_KG_ML = 0.07;
const SUPPLY_MARGIN = 0.3;
const VAT = 0.22;
const SEDE_LABEL = "Via Benedetto Castelli,40/42 - Gussago - BS";
const WHATSAPP_NUMBER = "393445677063";
const WHATSAPP_VERIFY_MESSAGE = "Ciao, ho visto il prezzo per il mio progetto EasyBatt e vorrei prenotare la verifica.";
const WHATSAPP_ESTIMATE_MESSAGE = "Ciao, vorrei inviare il riepilogo del mio progetto EasyBatt.";
const WHATSAPP_MESSAGE = "Ciao, ho visto EasyBatt e vorrei un chiarimento.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const SHIPPING_BANDS = [
  { maxKg: 50, price: 17.5 },
  { maxKg: 100, price: 35 },
  { maxKg: 200, price: 70 },
  { maxKg: 300, price: 105 },
];

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

function getShippingPrice(weightKg) {
  if (weightKg <= 0) return 0;
  const band = SHIPPING_BANDS.find((item) => weightKg <= item.maxKg);
  return band ? band.price : SHIPPING_BANDS[SHIPPING_BANDS.length - 1].price;
}

function unique(array) {
  return Array.from(new Set(array));
}

const fieldClassName =
  "h-12 rounded-2xl !border !border-white/20 !bg-[#10B7B3] !text-[#11161C] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-200 " +
  "hover:!border-[#10B7B3]/45 hover:!bg-[#0A8B87] " +
  "focus-visible:!border-[#10B7B3] focus-visible:!bg-[#0A8B87] focus-visible:!ring-2 focus-visible:!ring-[#10B7B3]/25 focus-visible:!outline-none " +
  "data-[state=open]:!border-[#10B7B3] data-[state=open]:!bg-[#0A8B87] data-[state=open]:!ring-2 data-[state=open]:!ring-[#10B7B3]/25 " +
  "[&_svg]:text-[#1A1F26] hover:[&_svg]:text-[#11161C] data-[state=open]:[&_svg]:text-[#11161C]";

const inputClassName =
  "h-12 rounded-2xl !border !border-white/20 !bg-[#10B7B3] !text-[#11161C] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-200 " +
  "hover:!border-[#10B7B3]/45 hover:!bg-[#0A8B87] " +
  "focus-visible:!border-[#10B7B3] focus-visible:!bg-[#0A8B87] focus-visible:!ring-2 focus-visible:!ring-[#10B7B3]/25 focus-visible:!outline-none " +
  "placeholder:!text-[#3A4147]";

const estimateFieldLabelClassName = "text-base font-semibold leading-6 text-white";
const neutralButtonClassName =
  `${eb.outlineButton} active:bg-[#10B7B3] active:text-white active:border-[#0A8B87] focus-visible:bg-[#10B7B3] focus-visible:text-white focus-visible:border-[#0A8B87] hover:border-[#10B7B3]/35`;
const tealAccentButtonClassName =
  "h-12 rounded-2xl border border-[#10B7B3]/30 bg-[#10B7B3]/10 text-base font-semibold text-[#C8FAF8] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#10B7B3]/45 hover:bg-[#10B7B3]/16 active:bg-[#10B7B3] active:text-white active:border-[#0A8B87] focus-visible:bg-[#10B7B3] focus-visible:text-white focus-visible:border-[#0A8B87]";
const finalSecondaryButtonClassName =
  "h-12 rounded-2xl text-base select-none touch-manipulation transition-all duration-150 active:scale-[0.98] focus-visible:scale-[0.98]";
const finalNeutralButtonClassName =
  `${eb.outlineButton} ${finalSecondaryButtonClassName} !border-white/10 !bg-transparent !text-white hover:!border-[#10B7B3]/35 hover:!bg-white/[0.06] active:!bg-[#10B7B3] active:!text-white active:!border-[#0A8B87] focus-visible:!bg-[#10B7B3] focus-visible:!text-white focus-visible:!border-[#0A8B87]`;
const finalTealAccentButtonClassName =
  `${finalSecondaryButtonClassName} !border-[#10B7B3]/30 !bg-[#10B7B3]/10 !text-[#C8FAF8] font-semibold hover:-translate-y-0.5 hover:!border-[#10B7B3]/45 hover:!bg-[#10B7B3]/16 active:!bg-[#10B7B3] active:!text-white active:!border-[#0A8B87] focus-visible:!bg-[#10B7B3] focus-visible:!text-white focus-visible:!border-[#0A8B87]`;
const finalPrimaryButtonClassName =
  `${eb.primaryButtonYellow} h-12 text-base select-none touch-manipulation transition-all duration-150 active:scale-[0.98] active:!bg-[#E1BC14] active:!text-slate-950 active:!border-[#C9A713] focus-visible:!bg-[#F4CC18] focus-visible:!text-slate-950 focus-visible:!border-[#C9A713]`;

const selectContentClassName =
  "rounded-2xl !border !border-white/10 !bg-[#11161C] !text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)]";

const selectItemClassName =
  "rounded-xl px-2.5 py-2 text-[#D7DCE2] " +
  "focus:bg-[#10B7B3]/10 focus:text-white " +
  "data-[state=checked]:bg-white/5 data-[state=checked]:text-white " +
  "[&_svg]:text-[#72E6E2]";

function BrandLockup() {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.1),_transparent_32%),linear-gradient(135deg,_rgba(20,23,29,0.98),_rgba(29,32,38,0.98))] px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:px-4 sm:py-2">
      <div className="flex items-center">
        <img
          src="/Logo_easybatt_trasp.svg"
          alt="EasyBatt - il battiscopa diventa facile"
          className="h-auto w-full max-w-[300px] sm:max-w-[328px] lg:max-w-[352px] xl:max-w-[368px]"
        />
      </div>
    </div>
  );
}

function StickyBrandHeader() {
  return (
    <div className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5">
        <Link href="/" aria-label="Torna alla home EasyBatt" className="block w-full max-w-[368px]">
          <BrandLockup />
        </Link>
      </div>
    </div>
  );
}

export function EasyBattQuantoMiCostaPage() {
  const [materialFilter, setMaterialFilter] = useState("all");
  const [heightFilter, setHeightFilter] = useState("all");
  const [finishFilter, setFinishFilter] = useState("all");
  const [selectedCode, setSelectedCode] = useState("4013R3TG11");
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

  const matchesFilters = (model, filters) => {
    const materialOk = filters.material === "all" || model.material === filters.material;
    const heightOk = filters.height === "all" || String(model.height) === filters.height;
    const finishOk = filters.finish === "all" || model.finish === filters.finish;
    return materialOk && heightOk && finishOk;
  };

  const availableMaterials = useMemo(() => {
    return unique(
      MODELS.filter((model) =>
        matchesFilters(model, { material: "all", height: heightFilter, finish: finishFilter }),
      ).map((model) => model.material),
    ).sort();
  }, [finishFilter, heightFilter]);

  const availableHeights = useMemo(() => {
    return unique(
      MODELS.filter((model) =>
        matchesFilters(model, { material: materialFilter, height: "all", finish: finishFilter }),
      ).map((model) => String(model.height)),
    ).sort((a, b) => Number(a) - Number(b));
  }, [finishFilter, materialFilter]);

  const availableFinishes = useMemo(() => {
    return unique(
      MODELS.filter((model) =>
        matchesFilters(model, { material: materialFilter, height: heightFilter, finish: "all" }),
      ).map((model) => model.finish),
    ).sort();
  }, [heightFilter, materialFilter]);

  useEffect(() => {
    if (materialFilter !== "all" && !availableMaterials.includes(materialFilter)) {
      setMaterialFilter("all");
    }
  }, [availableMaterials, materialFilter]);

  useEffect(() => {
    if (heightFilter !== "all" && !availableHeights.includes(heightFilter)) {
      setHeightFilter("all");
    }
  }, [availableHeights, heightFilter]);

  useEffect(() => {
    if (finishFilter !== "all" && !availableFinishes.includes(finishFilter)) {
      setFinishFilter("all");
    }
  }, [availableFinishes, finishFilter]);

  const filteredModels = useMemo(() => {
    return MODELS.filter((model) =>
      matchesFilters(model, { material: materialFilter, height: heightFilter, finish: finishFilter }),
    );
  }, [materialFilter, heightFilter, finishFilter]);

  const selectedModel = useMemo(() => {
    const insideFiltered = filteredModels.find((m) => m.code === selectedCode);
    if (insideFiltered) return insideFiltered;
    return filteredModels[0] ?? MODELS[0];
  }, [filteredModels, selectedCode]);

  useEffect(() => {
    if (!filteredModels.some((model) => model.code === selectedCode)) {
      setSelectedCode(filteredModels[0]?.code ?? MODELS[0].code);
    }
  }, [filteredModels, selectedCode]);

  const resetFilters = () => {
    setMaterialFilter("all");
    setHeightFilter("all");
    setFinishFilter("all");
    setSelectedCode(MODELS[0].code);
  };

  const effectiveSelectedCode = selectedModel?.code ?? MODELS[0].code;

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
        throw new Error(payload?.error || "Calcolo non riuscito: inserisci i km manualmente");
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
      setDistanceError(error.message || "Calcolo non riuscito: inserisci i km manualmente");
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
            ? "Stima basata su CAP/località"
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
    const supplyUnitPrice = includeSupply ? (selectedModel?.supplyBaseCostPerMl ?? 0) * (1 + SUPPLY_MARGIN) : 0;
    const baseWeight = (selectedModel?.weightKgMl ?? 0) * ml;
    const totalWeight = includeSupply ? baseWeight + PACKAGING_WEIGHT_KG_ML * ml : 0;
    const serviceSubtotal = ml * SERVICE_RATE;
    const travelSubtotal = km * TRAVEL_RATE;
    const serviceAndTravelSubtotal = serviceSubtotal + travelSubtotal;
    const supplySubtotal = includeSupply ? ml * supplyUnitPrice : 0;
    const shippingSubtotal = includeShipping && includeSupply && !includePickup ? getShippingPrice(totalWeight) : 0;
    const installationSubtotal = includeInstallation ? ml * INSTALLATION_RATE : 0;
    const subtotal = serviceSubtotal + travelSubtotal + supplySubtotal + shippingSubtotal + installationSubtotal;
    const vat = subtotal * VAT;
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
      installationSubtotal,
      subtotal,
      vat,
      total,
    };
  }, [includeInstallation, includePickup, includeShipping, includeSupply, linearMeters, returnKm, selectedModel]);

  const estimateSummary = useMemo(() => {
    const chantierAddress = distanceMeta?.resolvedAddress || zipCode.trim() || "Non indicata";
    const roundTripDistance = returnKm ? `${returnKm} km` : "Da confermare";

    return [
      `Modello: ${selectedModel?.description || "Non selezionato"}`,
      `Metri di battiscopa: ${calculation.ml}`,
      `Località cantiere: ${chantierAddress}`,
      `Distanza A/R: ${roundTripDistance}`,
      `Fornitura battiscopa: ${includeSupply ? "Sì" : "No"}`,
      `Spedizione: ${includeShipping && !includePickup ? "Sì" : "No"}`,
      `Ritiro presso la sede: ${includePickup ? "Sì" : "No"}`,
      `Posa in opera: ${includeInstallation ? "Sì" : "No"}`,
      `Totale indicativo: ${euro.format(calculation.total)}`,
    ].join("\n");
  }, [
    calculation.ml,
    calculation.total,
    distanceMeta?.resolvedAddress,
    includeInstallation,
    includePickup,
    includeShipping,
    includeSupply,
    returnKm,
    selectedModel?.description,
    zipCode,
  ]);

  const whatsappVerifyUrl = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_VERIFY_MESSAGE}\n\n${estimateSummary}`)}`,
    [estimateSummary],
  );

  const whatsappEstimateUrl = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_ESTIMATE_MESSAGE}\n\n${estimateSummary}`)}`,
    [estimateSummary],
  );

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <StickyBrandHeader />

      <div className={`${eb.pageShell} pt-[184px] sm:pt-[198px] lg:pt-[210px]`}>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="grid gap-6">
            <CardComp className={eb.cardInteractive}>
              <CardHeaderComp>
                <CardTitleComp className="flex items-center gap-2 text-xl text-white">
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

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label className="text-[#D9DDE2]">Materiale</Label>
                    <Select value={materialFilter} onValueChange={setMaterialFilter}>
                      <SelectTrigger className={fieldClassName}>
                        <SelectValue placeholder="Tutti" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClassName}>
                        <SelectItem className={selectItemClassName} value="all">Tutti</SelectItem>
                        {availableMaterials.map((item) => (
                          <SelectItem className={selectItemClassName} key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-[#D9DDE2]">Altezza</Label>
                    <Select value={heightFilter} onValueChange={setHeightFilter}>
                      <SelectTrigger className={fieldClassName}>
                        <SelectValue placeholder="Tutte" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClassName}>
                        <SelectItem className={selectItemClassName} value="all">Tutte</SelectItem>
                        {availableHeights.map((item) => (
                          <SelectItem className={selectItemClassName} key={item} value={item}>{item} mm</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-[#D9DDE2]">Finitura</Label>
                    <Select value={finishFilter} onValueChange={setFinishFilter}>
                      <SelectTrigger className={fieldClassName}>
                        <SelectValue placeholder="Tutte" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClassName}>
                        <SelectItem className={selectItemClassName} value="all">Tutte</SelectItem>
                        {availableFinishes.map((item) => (
                          <SelectItem className={selectItemClassName} key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="text-[#D9DDE2]">Modello</Label>
                  <Select value={effectiveSelectedCode} onValueChange={setSelectedCode}>
                    <SelectTrigger className={fieldClassName}>
                      <SelectValue placeholder="Scegli un modello" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClassName}>
                      {filteredModels.map((model) => (
                        <SelectItem className={selectItemClassName} key={model.code} value={model.code}>
                          {model.code} · {model.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedModel && (
                  <div className="grid gap-3 rounded-[24px] bg-[#17191D] p-4 sm:grid-cols-2 xl:grid-cols-4">
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
                      <div className="mt-1 font-semibold text-white">{selectedModel.finish}</div>
                    </div>
                  </div>
                )}
              </CardContentComp>
            </CardComp>

            <CardComp className={eb.cardInteractive}>
              <CardHeaderComp>
                <CardTitleComp className="flex items-center gap-2 text-xl text-white">
                  <CalcIcon className="h-5 w-5 text-[#F8E58A]" />
                  Completa la stima
                </CardTitleComp>
              </CardHeaderComp>
              <CardContentComp className="grid gap-5">
                <div className="grid gap-2">
                  <Label className={estimateFieldLabelClassName}>Quanti metri di battiscopa ti servono?</Label>
                  <Input
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
                        Per una prima valutazione puoi indicare i metri stimati aggiungendo circa un 10% di margine.
                      </div>
                      <div className="mt-2 leading-6 text-[#C7CDD5]">
                        Il costo finale verrà calcolato dopo il rilievo, sui metri reali effettivamente necessari. Questo evita sprechi e maggiorazioni inutili.
                      </div>
                      <div className="mt-2 leading-6 text-[#A7F3F0]">
                        Se hai dubbi, usa il pulsante WhatsApp in fondo alla pagina.
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
                      {isDistanceLoading ? "Calcolo..." : "Calcola i km"}
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
                    <Switch className={switchClassName} checked={includeSupply} onCheckedChange={setIncludeSupply} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3.5">
                    <div>
                      <div className="font-semibold text-white">Spedizione inclusa</div>
                      <div className="text-sm text-[#9FA7B0]">Consegna diretta dove serve</div>
                    </div>
                    <Switch className={switchClassName} checked={includeShipping} onCheckedChange={handleShippingChange} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3.5">
                    <div>
                      <div className="font-semibold text-white">Ritiro presso la sede</div>
                      <div className="text-sm text-[#9FA7B0]">Risparmi la spedizione ritirando direttamente</div>
                    </div>
                    <Switch className={switchClassName} checked={includePickup} onCheckedChange={handlePickupChange} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3.5">
                    <div>
                      <div className="font-semibold text-white">Posa in opera inclusa</div>
                      <div className="text-sm text-[#9FA7B0]">Valuta subito anche il servizio completo</div>
                    </div>
                    <Switch className={switchClassName} checked={includeInstallation} onCheckedChange={setIncludeInstallation} />
                  </div>
                </div>
              </CardContentComp>
            </CardComp>
          </div>

          <div className="flex flex-col gap-6">
            <CardComp className={`sticky top-[184px] sm:top-[198px] lg:top-4 ${eb.cardInteractive}`}>
              <CardHeaderComp className="pb-3">
                <CardTitleComp className="text-2xl text-white">Il tuo prezzo EasyBatt</CardTitleComp>
                <CardDescriptionComp className="text-base leading-7 text-[#B6BDC6]">
                  Un prezzo calcolato sui dati inseriti, per capire subito il costo del tuo progetto.
                </CardDescriptionComp>
              </CardHeaderComp>
              <CardContentComp className="grid gap-4">
                <div className={eb.summaryPanel}>
                  <div className="text-sm text-[#B6BDC6]">Totale IVA inclusa</div>
                  <div className="mt-3 text-4xl font-bold tracking-tight text-[#F4CC18]">{euro.format(calculation.total)}</div>
                  <div className="mt-3 text-sm leading-6 text-[#C7CDD5]">Include tutto il necessario per partire, senza costi nascosti.</div>
                  <div className="mt-1 text-xs leading-5 text-[#8F98A3]">Prezzo calcolato sui dati inseriti.</div>
                  <div className="mt-1 text-xs leading-5 text-[#8F98A3]">Il costo finale viene confermato dopo il rilievo sui metri reali.</div>
                  <div className="mt-1 text-xs leading-5 text-[#8F98A3]">Paghi solo i metri realmente necessari, senza margini di sicurezza.</div>
                </div>

                <div className="grid gap-3">
                  <div className="px-1 text-xs font-medium uppercase tracking-[0.08em] text-[#8F98A3]">Dettaglio del prezzo</div>
                  <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                    <span className="text-[15px] font-medium text-[#E3E7EC]">Servizio di rilievo, taglio e imballo</span>
                    <span className="font-semibold text-white">{euro.format(calculation.serviceAndTravelSubtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                    <div>
                      <div className="text-sm text-[#D0D5DB]">Fornitura battiscopa</div>
                      <div className="text-xs text-[#8F98A3]">{includeSupply ? `${calculation.ml} ml × ${euro.format(calculation.supplyUnitPrice)}/ml` : "non inclusa"}</div>
                    </div>
                    <span className="font-semibold text-white">{euro.format(calculation.supplySubtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                    <span className="text-sm text-[#D0D5DB]">Spedizione</span>
                    <span className="font-semibold text-white">{euro.format(calculation.shippingSubtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                    <span className="text-sm text-[#D0D5DB]">Posa in opera</span>
                    <span className="font-semibold text-white">{euro.format(calculation.installationSubtotal)}</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex items-center justify-between text-sm text-[#D0D5DB]">
                    <span>Subtotale imponibile</span>
                    <span>{euro.format(calculation.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#D0D5DB]">
                    <span>IVA 22%</span>
                    <span>{euro.format(calculation.vat)}</span>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[24px] border border-[#10B7B3]/18 bg-[#0E2B2A] p-4 text-sm text-[#D9E8E7]">
                  <div className="flex items-start gap-3">
                    <Package className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div>Peso battiscopa: <span className="font-semibold text-white">{calculation.baseWeight.toFixed(1)} kg</span></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div>Peso totale con imballo: <span className="font-semibold text-white">{calculation.totalWeight.toFixed(1)} kg</span></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div>Consegna: <span className="font-semibold text-white">{includePickup ? "ritiro presso la sede" : includeShipping ? "spedizione inclusa" : "da concordare"}</span></div>
                  </div>
                  {includePickup && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                      <div>
                        <div className="font-semibold text-white">Ritiro presso la sede EasyBatt</div>
                        <div>{SEDE_LABEL}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div>Località: <span className="font-semibold text-white">{zipCode || "non inserita"}</span></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Ruler className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div>Modello selezionato: <span className="font-semibold text-white">{selectedModel?.description}</span></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wrench className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                    <div>Stato fornitura: <span className="font-semibold text-white">{includeSupply ? "inclusa nel preventivo" : "esclusa dal preventivo"}</span></div>
                  </div>
                </div>

                <div className={eb.cardInset}>
                  <div className="mb-3 flex items-center gap-2 text-white">
                    <CheckCircleIcon className="h-4 w-4 text-[#F4CC18]" />
                    <span className="font-semibold">Cosa succede dopo</span>
                  </div>
                  <div className="grid gap-3 text-sm text-[#AAB2BB]">
                    <div>1. Ci invii i dati del progetto e verifichiamo insieme misure, modello e servizi scelti.</div>
                    <div>2. Confermiamo il prezzo sulla base dei dati reali del rilievo.</div>
                    <div>3. Parti con un riferimento chiaro, senza sprechi e senza sorprese.</div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <ButtonComp
                    asChild
                    variant="outline"
                    className={finalTealAccentButtonClassName}
                  >
                    <a href={whatsappEstimateUrl} target="_blank" rel="noreferrer" draggable={false} onContextMenu={(e) => e.preventDefault()}>
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Invia il riepilogo su WhatsApp
                    </a>
                  </ButtonComp>
                  <ButtonComp asChild className={finalPrimaryButtonClassName}>
                    <a href={whatsappVerifyUrl} target="_blank" rel="noreferrer" draggable={false} onContextMenu={(e) => e.preventDefault()}>
                      Prenota la verifica del progetto
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </a>
                  </ButtonComp>
                  <ButtonComp asChild variant="outline" className={finalNeutralButtonClassName}>
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" draggable={false} onContextMenu={(e) => e.preventDefault()}>
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Hai un dubbio? Parla con noi
                    </a>
                  </ButtonComp>
                </div>
              </CardContentComp>
            </CardComp>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EasyBattQuantoMiCostaPage;

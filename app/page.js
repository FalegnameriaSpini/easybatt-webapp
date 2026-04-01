"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Outfit } from "next/font/google";
import {
  Calculator,
  MapPin,
  Package,
  Wrench,
  ChevronRight,
  ShieldCheck,
  Ruler,
  Truck,
  Layers3,
  ScanLine,
  Cog,
  Boxes,
  BadgeCheck,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  Home,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

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

const SHIPPING_BANDS = [
  { maxKg: 50, price: 17.5 },
  { maxKg: 100, price: 35 },
  { maxKg: 200, price: 70 },
  { maxKg: 300, price: 105 },
];

const PROCESS_STEPS = [
  {
    number: "1",
    title: "Scegli il tuo stile",
    text: "Seleziona il battiscopa più adatto alla tua casa in modo semplice e veloce.",
    icon: Layers3,
  },
  {
    number: "2",
    title: "Rilievo preciso",
    text: "Un rilievo accurato riduce imprevisti, adattamenti sul posto e lavori inutili dentro casa.",
    icon: ScanLine,
  },
  {
    number: "3",
    title: "Preparazione intelligente",
    text: "I pezzi arrivano già organizzati e pronti, con meno polvere e meno confusione durante i lavori.",
    icon: Cog,
  },
  {
    number: "4",
    title: "Posa più veloce",
    text: "Il lavoro scorre meglio e i tempi si accorciano, con meno disagio per chi vive la casa.",
    icon: Boxes,
  },
];

const DIFFERENTIATORS = [
  {
    title: "Meno polvere in casa",
    text: "Meno tagli e meno lavorazioni improvvisate sul posto significano un ambiente più pulito.",
  },
  {
    title: "Posa più rapida",
    text: "Con i pezzi già preparati il lavoro scorre meglio e il risultato arriva prima.",
  },
  {
    title: "Un solo referente",
    text: "EasyBatt segue il flusso fino alla posa, così per te è tutto più semplice da gestire.",
  },
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

function BrandLockup() {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 shadow-inner">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-500/10">
          <Home className="h-8 w-8 text-teal-300" />
        </div>
        <div>
          <div className="text-4xl font-extrabold tracking-tight leading-none">
            <span className="text-yellow-300">Easy</span>
            <span className="text-slate-100">Batt</span>
          </div>
          <div className="mt-2 text-sm text-slate-300">il battiscopa diventa facile</div>
        </div>
      </div>
    </div>
  );
}

export default function EasyBattPreventivatorePrototype() {
  const [materialFilter, setMaterialFilter] = useState("all");
  const [heightFilter, setHeightFilter] = useState("all");
  const [finishFilter, setFinishFilter] = useState("all");
  const [selectedCode, setSelectedCode] = useState("4013R3TG11");
  const [linearMeters, setLinearMeters] = useState(100);
  const [returnKm, setReturnKm] = useState(50);
  const [includeSupply, setIncludeSupply] = useState(true);
  const [includeShipping, setIncludeShipping] = useState(true);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [zipCode, setZipCode] = useState("");

  const materials = useMemo(() => unique(MODELS.map((m) => m.material)), []);
  const heights = useMemo(() => unique(MODELS.map((m) => String(m.height))).sort((a, b) => Number(a) - Number(b)), []);
  const finishes = useMemo(() => unique(MODELS.map((m) => m.finish)).sort(), []);

  const filteredModels = useMemo(() => {
    return MODELS.filter((model) => {
      const materialOk = materialFilter === "all" || model.material === materialFilter;
      const heightOk = heightFilter === "all" || String(model.height) === heightFilter;
      const finishOk = finishFilter === "all" || model.finish === finishFilter;
      return materialOk && heightOk && finishOk;
    });
  }, [materialFilter, heightFilter, finishFilter]);

  const selectedModel = useMemo(() => {
    const insideFiltered = filteredModels.find((m) => m.code === selectedCode);
    if (insideFiltered) return insideFiltered;
    return filteredModels[0] ?? MODELS[0];
  }, [filteredModels, selectedCode]);

  const effectiveSelectedCode = selectedModel?.code ?? MODELS[0].code;

  const calculation = useMemo(() => {
    const ml = Number.isFinite(linearMeters) ? Math.max(0, linearMeters) : 0;
    const km = Number.isFinite(returnKm) ? Math.max(0, returnKm) : 0;
    const supplyUnitPrice = includeSupply ? (selectedModel?.supplyBaseCostPerMl ?? 0) * (1 + SUPPLY_MARGIN) : 0;
    const baseWeight = (selectedModel?.weightKgMl ?? 0) * ml;
    const totalWeight = includeSupply ? baseWeight + PACKAGING_WEIGHT_KG_ML * ml : 0;
    const serviceSubtotal = ml * SERVICE_RATE;
    const travelSubtotal = km * TRAVEL_RATE;
    const supplySubtotal = includeSupply ? ml * supplyUnitPrice : 0;
    const shippingSubtotal = includeShipping && includeSupply ? getShippingPrice(totalWeight) : 0;
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
      supplySubtotal,
      shippingSubtotal,
      installationSubtotal,
      subtotal,
      vat,
      total,
    };
  }, [includeInstallation, includeShipping, includeSupply, linearMeters, returnKm, selectedModel]);

  return (
    <div className={`${outfit.className} min-h-screen bg-slate-950 text-slate-100`}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 p-4 sm:max-w-7xl sm:grid sm:grid-cols-[1.08fr_0.92fr] sm:gap-6 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4"
        >
          <Card className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 text-white">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full border border-teal-500/30 bg-teal-500/15 text-teal-200 hover:bg-teal-500/15">
                    Preventivo online EasyBatt
                  </Badge>
                  <Badge className="rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 hover:bg-yellow-500/10">
                    Meno polvere • posa più veloce
                  </Badge>
                </div>

                <BrandLockup />

                <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Il battiscopa pronto, con meno stress in casa</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                      EasyBatt è pensato per chi vuole un lavoro più pulito, più veloce e più semplice da gestire. Tu scegli il battiscopa, ricevi una stima chiara e hai un unico referente che segue il flusso fino alla posa.
                    </p>
                  </div>

                  <div className="grid gap-3 rounded-3xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 text-yellow-300" />
                      <div>
                        <div className="font-semibold text-white">Meno polvere, meno disordine</div>
                        <div className="text-slate-400">Un approccio più organizzato significa una casa più pulita durante i lavori.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-teal-300" />
                      <div>
                        <div className="font-semibold text-white">Più velocità, meno pensieri</div>
                        <div className="text-slate-400">Non acquisti solo battiscopa, ma un servizio studiato per semplificarti tutto.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white"><ShieldCheck className="h-5 w-5 text-teal-400" /> Come funziona</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/15 text-sm font-bold text-teal-300">
                        {step.number}
                      </div>
                      <Icon className="h-5 w-5 text-yellow-300" />
                    </div>
                    <div className="font-semibold text-white">{step.title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-400">{step.text}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white"><BadgeCheck className="h-5 w-5 text-yellow-400" /> Perché conviene</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {DIFFERENTIATORS.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{item.text}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white"><Layers3 className="h-5 w-5 text-teal-400" /> Scegli il battiscopa</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label className="text-slate-300">Materiale</Label>
                  <Select value={materialFilter} onValueChange={setMaterialFilter}>
                    <SelectTrigger className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100"><SelectValue placeholder="Tutti" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tutti</SelectItem>
                      {materials.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-slate-300">Altezza</Label>
                  <Select value={heightFilter} onValueChange={setHeightFilter}>
                    <SelectTrigger className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100"><SelectValue placeholder="Tutte" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tutte</SelectItem>
                      {heights.map((item) => (
                        <SelectItem key={item} value={item}>{item} mm</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-slate-300">Finitura</Label>
                  <Select value={finishFilter} onValueChange={setFinishFilter}>
                    <SelectTrigger className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100"><SelectValue placeholder="Tutte" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tutte</SelectItem>
                      {finishes.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3">
                <Label className="text-slate-300">Modello</Label>
                <Select value={effectiveSelectedCode} onValueChange={setSelectedCode}>
                  <SelectTrigger className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100"><SelectValue placeholder="Scegli un modello" /></SelectTrigger>
                  <SelectContent>
                    {filteredModels.map((model) => (
                      <SelectItem key={model.code} value={model.code}>
                        {model.code} · {model.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedModel && (
                <div className="grid gap-3 rounded-3xl bg-slate-950 p-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-sm">
                    <div className="text-xs text-slate-500">Codice</div>
                    <div className="mt-1 font-semibold text-white">{selectedModel.code}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-sm">
                    <div className="text-xs text-slate-500">Profilo</div>
                    <div className="mt-1 font-semibold text-white">{selectedModel.profile}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-sm">
                    <div className="text-xs text-slate-500">Sezione</div>
                    <div className="mt-1 font-semibold text-white">{selectedModel.height} × {selectedModel.thickness} mm</div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-sm">
                    <div className="text-xs text-slate-500">Finitura</div>
                    <div className="mt-1 font-semibold text-white">{selectedModel.finish}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white"><Calculator className="h-5 w-5 text-yellow-400" /> Ricevi una stima indicativa</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-slate-300">Metri lineari</Label>
                <Input
                  className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100"
                  type="number"
                  min={0}
                  value={linearMeters}
                  onChange={(e) => setLinearMeters(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-slate-300">Km totali A/R</Label>
                <Input
                  className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100"
                  type="number"
                  min={0}
                  value={returnKm}
                  onChange={(e) => setReturnKm(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label className="text-slate-300">CAP o località del cantiere</Label>
                <Input
                  className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100"
                  placeholder="Es. 25017 Lonato del Garda"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 grid gap-3 rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div>
                    <div className="font-medium text-white">Fornitura battiscopa inclusa</div>
                    <div className="text-sm text-slate-400">Attiva di default per avere una stima completa.</div>
                  </div>
                  <Switch checked={includeSupply} onCheckedChange={setIncludeSupply} />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div>
                    <div className="font-medium text-white">Spedizione inclusa</div>
                    <div className="text-sm text-slate-400">Calcolata in base al peso totale con imballo.</div>
                  </div>
                  <Switch checked={includeShipping} onCheckedChange={setIncludeShipping} />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div>
                    <div className="font-medium text-white">Posa in opera inclusa</div>
                    <div className="text-sm text-slate-400">Puoi valutarla subito nella tua stima.</div>
                  </div>
                  <Switch checked={includeInstallation} onCheckedChange={setIncludeInstallation} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-col gap-4"
        >
          <Card className="sticky top-4 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-white">La tua stima indicativa</CardTitle>
              <CardDescription className="text-slate-400">
                Una cifra chiara da cui partire, con un servizio pensato per ridurre disagio, polvere e tempi di lavoro in casa.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-4 text-white">
                <div className="text-sm text-slate-300">Totale indicativo IVA inclusa</div>
                <div className="mt-2 text-4xl font-bold tracking-tight text-yellow-300">{euro.format(calculation.total)}</div>
                <div className="mt-2 text-sm leading-6 text-slate-300">
                  Include fornitura battiscopa, servizio EasyBatt, trasferta e opzioni attive.
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-sm text-slate-300">Servizio EasyBatt: rilievo + preparazione + taglio</span>
                  <span className="font-semibold text-white">{euro.format(calculation.serviceSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-sm text-slate-300">Trasferta</span>
                  <span className="font-semibold text-white">{euro.format(calculation.travelSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3">
                  <div>
                    <div className="text-sm text-slate-300">Fornitura battiscopa</div>
                    <div className="text-xs text-slate-500">{includeSupply ? `${calculation.ml} ml × ${euro.format(calculation.supplyUnitPrice)}/ml` : "non inclusa"}</div>
                  </div>
                  <span className="font-semibold text-white">{euro.format(calculation.supplySubtotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-sm text-slate-300">Spedizione</span>
                  <span className="font-semibold text-white">{euro.format(calculation.shippingSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-sm text-slate-300">Posa in opera</span>
                  <span className="font-semibold text-white">{euro.format(calculation.installationSubtotal)}</span>
                </div>
                <Separator className="bg-slate-800" />
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Subtotale imponibile</span>
                  <span>{euro.format(calculation.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>IVA 22%</span>
                  <span>{euro.format(calculation.vat)}</span>
                </div>
              </div>

              <div className="grid gap-3 rounded-3xl border border-teal-900 bg-teal-950/30 p-4 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <Package className="mt-0.5 h-4 w-4 text-teal-300" />
                  <div>
                    Peso battiscopa: <span className="font-semibold text-white">{calculation.baseWeight.toFixed(1)} kg</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-4 w-4 text-teal-300" />
                  <div>
                    Peso totale con imballo: <span className="font-semibold text-white">{calculation.totalWeight.toFixed(1)} kg</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-teal-300" />
                  <div>
                    Località: <span className="font-semibold text-white">{zipCode || "non inserita"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="mt-0.5 h-4 w-4 text-teal-300" />
                  <div>
                    Modello selezionato: <span className="font-semibold text-white">{selectedModel?.description}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wrench className="mt-0.5 h-4 w-4 text-teal-300" />
                  <div>
                    Stato fornitura: <span className="font-semibold text-white">{includeSupply ? "inclusa nel preventivo" : "esclusa dal preventivo"}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <div className="mb-3 flex items-center gap-2 text-white">
                  <CheckCircle2 className="h-4 w-4 text-yellow-300" />
                  <span className="font-semibold">Cosa succede dopo</span>
                </div>
                <div className="grid gap-3 text-sm text-slate-400">
                  <div>1. Verifichiamo la richiesta e ti aiutiamo a confermare la soluzione più adatta.</div>
                  <div>2. Organizziamo il flusso EasyBatt e coordiniamo anche la posa.</div>
                  <div>3. Tu hai un unico riferimento e un lavoro più veloce, più ordinato e più semplice da gestire.</div>
                </div>
              </div>

              <div className="grid gap-3">
                <Button className="h-12 rounded-2xl bg-yellow-400 text-base font-semibold text-slate-950 hover:bg-yellow-300">
                  Richiedi verifica e conferma <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-12 rounded-2xl border-slate-700 bg-transparent text-base text-slate-100 hover:bg-slate-800">
                  <PhoneCall className="mr-2 h-4 w-4" /> Scrivici su WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white"><PhoneCall className="h-5 w-5 text-yellow-400" /> Hai dubbi? Ti aiutiamo noi</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-slate-400">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="font-semibold text-white">Ti aiutiamo a scegliere il modello giusto</div>
                <div className="mt-1">Se hai dubbi su altezza, finitura o stile, ti guidiamo noi nella scelta più adatta alla tua casa.</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="font-semibold text-white">Verifica tecnica prima di confermare</div>
                <div className="mt-1">La stima online è il punto di partenza. Prima della conferma finale verifichiamo sempre i dettagli operativi.</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="font-semibold text-white">Un unico riferimento fino alla posa</div>
                <div className="mt-1">Non devi coordinare fornitori e posatori: EasyBatt segue il flusso e rende tutto più semplice da gestire.</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}




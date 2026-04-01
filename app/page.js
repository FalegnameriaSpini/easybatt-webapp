import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const LOGO_DATA_URI = "data:image/webp;base64,UklGRm46AABXRUJQVlA4IGI6AADwfgCdASq8APgAPtFCnkikIyKhICgAgA2JaW7hdrEICWkA4CdAEB6A/v+51a4P6LZg2s8H+dDBycXXT2d/u+qf2fP7T9v16fAr0p0A9RP+f/yf58f9wP3J42pNpj9b0j9P8ff1v7j/7f/j36cDJh/7P+kf8Yf7k/5n/a/6Q/w7/2v5T/d3/6P8x/sT/Xf4V/oj+zP9B/av4X/xP8Y/nD9yf2Z/Tr9tf21+Xn8xv3d/Cr9N/4A/oj+vf8k/O39Qf8r/mv9of56/Rf+sv6K/Rn+hP+M/Bj+zP1J/o/+0f6d/y/+8P7f/bH+7/7m/k//2P+0/a39G/8V/yX+Wf1B/yv+8v4S/e7+Vv9p/1j+8P4K/gD+O/1j/mz8Wf4V/y7+0v1T/1D+Mf5A/wL+8P9m/s/+yv8x/2P+Kf4r/zX+Hf4W/4L9l/4k/cf++v6w/s3+eP7C/w//Wv4q/qP+cP8W/nT+Lv7J/qz/OP7k/rf+6/5d/hT+Vf4G/1D+bP3X/kn/Jf7E/4j+Yf8s/0b+9f5R/jP+qP4e/x3+tP4w/4f9Jv7B/VT/bv6L/kv+ef9O/lb+zP4u/vj+Jf4I/ib+8f6e/gv+hP89/tT+7v7U/ub+Nv5l/T7+N/6h/hX/ef4X/o3+2v49/0X+MP6I/f7+KP8j/vP+Kf6u/5b+4v3m/kj+5P5o/ib+yP7t/0b+Vv7s/lD+Zf7o/iv+XP8J/sP+9v5n/k3+6v4U/ff+J/6p/kD+gv6H/2P+fP5r/ln+Lv1l/7H+Zv6V/YP+Mv6j/jX+C/7R/0j+cP4s/s7+r/4M/nX+Qv5V/3D+1P4Q/2/+5f6G/7z+of6t/oj+aP6B/vr+4/5Y/lH+kf8I/vn+mv7B/n3+lf6P/uP+2/8T/oX+hv4W/6n+Df5V/fn+7P8s/hD+Iv5b/6X+Rf4A/zH+Zv8M/1L+Yf6y/oz+TP6h/gH+2f6W/oP+g/7W/0j+s/7g/ef+xv4f/zX+Vf6g/s7+m/69/vH+Ff8I/57+if7M/hH+3P4d/nL+Tf3z/lj+4v5w/oP+VP8N/sP+uP7W/4f+fP8B/2H+Lv5a/r/+0v4H/i7+Qv5R/rr+4v7S/3n+fP5N/3f+V/4n/6P+x/67/mL+If8P/7n+3f7S/8z+M/6F/mT+pP4s/wH+Nv6K/fL+ev4J/4j++f7r/pn+XP4I/o7+bP7Q/ov+K/4w/iT+3f5j/nH+8f7p/VP+XP4L/r7+ef7O/rP+eP5q/57+u/6m/1r+5v7E/nH+Iv6W/hf+ev8W/nj+4v65/oP+PP54/1D+Gf7R/ij+zv4l/ov+pv72/0P+nP8M/2z+u/6G/6P+pP4q/oX+pv7W/nz+e/6Q/1D+KP7b/if+FP7o/r7+hf5o/tb+cf6R/i/+0v6k/lj+Jf6l/uP+1v55/0L+iv59/8L+Gf5d/o7+oP5q/uj+nf7B/tT+f/6t/n7+iP6L/pH+Rf7Q/uT+qP6g/w==";

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
    title: "Scegli lo stile",
    text: "Scegli il battiscopa più adatto alla tua casa in pochi passaggi, senza complicazioni tecniche e senza perdere tempo.",
    icon: Layers3,
  },
  {
    number: "2",
    title: "Rilievo preciso",
    text: "Il servizio parte da un rilievo accurato, così si riducono imprevisti, adattamenti sul posto e lavorazioni inutili dentro casa.",
    icon: ScanLine,
  },
  {
    number: "3",
    title: "Preparazione intelligente",
    text: "I pezzi arrivano già preparati e organizzati: questo significa meno polvere, meno disordine e meno stress durante i lavori.",
    icon: Cog,
  },
  {
    number: "4",
    title: "Posa più veloce",
    text: "La posa diventa più rapida e scorrevole. Tu hai un risultato più pulito e tempi più brevi di intervento in casa.",
    icon: Boxes,
  },
];

const DIFFERENTIATORS = [
  {
    title: "Meno polvere in casa",
    text: "Il vantaggio per te è concreto: meno tagli e meno lavorazioni improvvisate sul posto significano un ambiente più pulito.",
  },
  {
    title: "Posa più rapida",
    text: "Con i pezzi già preparati il lavoro scorre meglio e i tempi si accorciano. Meno giorni di disagio, più velocità nel risultato finale.",
  },
  {
    title: "Un solo referente",
    text: "Non devi coordinare tutto tu: EasyBatt gestisce il flusso e coinvolge anche il posatore, così per te è tutto più semplice.",
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
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

                <div className="rounded-[28px] border border-slate-800 bg-slate-950/60 p-4">
                  <img src={LOGO_DATA_URI} alt="EasyBatt" className="h-auto w-full max-w-[520px] object-contain" />
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Il battiscopa pronto, con meno stress in casa</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                      EasyBatt è pensato per chi vuole un lavoro più pulito, più veloce e più semplice da gestire. Tu scegli il battiscopa, ricevi una stima chiara e hai un unico referente che segue il flusso fino alla posa.
                    </p>
                  </div>

                  <div className="grid gap-3 rounded-3xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 text-yellow-300" />
                      <div>
                        <div className="font-semibold text-white">Perché piace al cliente privato</div>
                        <div className="text-slate-400">Meno polvere in casa, meno confusione durante i lavori e una posa più rapida.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-teal-300" />
                      <div>
                        <div className="font-semibold text-white">Cosa percepisce subito</div>
                        <div className="text-slate-400">Non un semplice battiscopa, ma un servizio organizzato che ti fa risparmiare tempo e pensieri.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white"><ShieldCheck className="h-5 w-5 text-teal-400" /> Come EasyBatt ti semplifica la casa</CardTitle>
              <CardDescription className="text-slate-400">
                Qui l’app deve far sentire il beneficio. Prima ancora del prezzo, il cliente deve capire perché questa soluzione gli conviene davvero.
              </CardDescription>
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
              <CardTitle className="flex items-center gap-2 text-lg text-white"><BadgeCheck className="h-5 w-5 text-yellow-400" /> Vantaggi per te</CardTitle>
              <CardDescription className="text-slate-400">
                Questa sezione deve essere molto chiara: il vantaggio non è per il posatore, ma per chi vive la casa.
              </CardDescription>
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
              <CardTitle className="flex items-center gap-2 text-lg text-white"><Layers3 className="h-5 w-5 text-teal-400" /> 1. Scegli il battiscopa</CardTitle>
              <CardDescription className="text-slate-400">
                Il cliente non deve perdersi nei codici. Prima filtra, poi confronta, poi seleziona.
              </CardDescription>
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
              <CardTitle className="flex items-center gap-2 text-lg text-white"><Calculator className="h-5 w-5 text-yellow-400" /> 2. Ricevi una stima indicativa</CardTitle>
              <CardDescription className="text-slate-400">
                Pochi dati essenziali, una stima immediata e nessun linguaggio tecnico complicato.
              </CardDescription>
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
                    <div className="text-sm text-slate-400">Attiva di default: il cliente vede una stima davvero completa.</div>
                  </div>
                  <Switch checked={includeSupply} onCheckedChange={setIncludeSupply} />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div>
                    <div className="font-medium text-white">Spedizione inclusa</div>
                    <div className="text-sm text-slate-400">Calcolata in automatico in base al peso totale con imballo.</div>
                  </div>
                  <Switch checked={includeShipping} onCheckedChange={setIncludeShipping} />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div>
                    <div className="font-medium text-white">Posa in opera inclusa</div>
                    <div className="text-sm text-slate-400">Può restare un’opzione premium, senza complicare la versione base.</div>
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
                  Include fornitura battiscopa, servizio EasyBatt, trasferta e opzioni attive. Il tutto con un approccio pensato per ridurre disagi, polvere e tempi di lavoro in casa.
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
                  <div>2. Organizziamo il flusso EasyBatt e coordiniamo anche la posa, senza scaricare tutto su di te.</div>
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
              <CardDescription className="text-slate-400">
                Questa sezione chiude la home in modo più commerciale e rassicurante, invece di parlare della struttura interna dell’app.
              </CardDescription>
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
              <div className="rounded-2xl border border-dashed border-teal-800 bg-slate-950 p-4">
                <div className="font-semibold text-white">Contatti da collegare</div>
                <div className="mt-2 grid gap-2 text-slate-300">
                  <div>WhatsApp: inserisci qui il tuo numero o link diretto</div>
                  <div>Telefono: inserisci qui il numero da chiamare</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


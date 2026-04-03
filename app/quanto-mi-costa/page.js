"use client";

import React, { useMemo, useState } from "react";
import {
  Calculator as CalcIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  Layers3,
  MapPin,
  Package,
  PhoneCall,
  Ruler,
  ShieldCheck as ShieldCheckIcon,
  Truck,
  Wrench,
  CheckCircle2 as CheckCircleIcon,
} from "lucide-react";
import { Badge as BadgeComp } from "@/components/ui/badge";
import { Button as ButtonComp } from "@/components/ui/button";
import { Card as CardComp, CardContent as CardContentComp, CardDescription as CardDescriptionComp, CardHeader as CardHeaderComp, CardTitle as CardTitleComp } from "@/components/ui/card";
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

function TopNavCosto() {
  return (
    <header className={eb.topNav}>
      <div className="flex items-center gap-3">
        <div className={eb.topNavIcon}>
          <HomeIcon className="h-5 w-5 text-[#72E6E2]" />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D8DDE3]">EasyBatt</div>
          <div className="text-sm text-[#8F98A3]">Quanto mi costa</div>
        </div>
      </div>

      <nav className={eb.navGroup}>
        <ButtonComp asChild variant="ghost" className={eb.navGhost}>
          <a href="/">Home</a>
        </ButtonComp>
        <ButtonComp asChild variant="ghost" className={eb.navGhost}>
          <a href="/come-funziona">Come funziona</a>
        </ButtonComp>
        <ButtonComp asChild variant="ghost" className={eb.navGhost}>
          <a href="/perche-conviene">Perché conviene</a>
        </ButtonComp>
        <ButtonComp asChild variant="ghost" className={eb.navActiveYellow}>
          <a href="/quanto-mi-costa">Quanto mi costa</a>
        </ButtonComp>
      </nav>
    </header>
  );
}

export function EasyBattQuantoMiCostaPage() {
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
    const rawMl = Number(linearMeters);
    const rawKm = Number(returnKm);
    const ml = Number.isFinite(rawMl) ? Math.max(0, rawMl) : 0;
    const km = Number.isFinite(rawKm) ? Math.max(0, rawKm) : 0;
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
    <div className="min-h-screen bg-[#17191D] text-white">
      <div className={eb.pageShell}>
        <TopNavCosto />

        <div className="mb-5 grid gap-3 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.1),_transparent_30%),linear-gradient(135deg,_rgba(20,23,29,0.96),_rgba(29,32,38,0.96))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <BadgeComp className={eb.badgeYellow}>
              Stima rapida EasyBatt
            </BadgeComp>
            <BadgeComp className={eb.badgeTeal}>
              Preventivo operativo
            </BadgeComp>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-5xl">
                Quanto mi costa
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-7 text-[#B6BDC6] sm:text-lg">
                Scegli il modello, inserisci i dati essenziali e ottieni subito una stima indicativa chiara.
              </p>
            </div>

            <div className="grid gap-2 rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-start gap-3">
                <ShieldCheckIcon className="mt-0.5 h-4 w-4 text-[#72E6E2]" />
                <div className="text-sm leading-6 text-[#C6CCD4]">
                  Totale aggiornato in tempo reale.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalcIcon className="mt-0.5 h-4 w-4 text-[#F8E58A]" />
                <div className="text-sm leading-6 text-[#C6CCD4]">
                  Servizio, trasferta, fornitura, spedizione e posa restano inclusi nel calcolo.
                </div>
              </div>
            </div>
          </div>
        </div>

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
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label className="text-[#D9DDE2]">Materiale</Label>
                    <Select value={materialFilter} onValueChange={setMaterialFilter}>
                      <SelectTrigger className="rounded-2xl border-white/10 bg-[#17191D] text-white">
                        <SelectValue placeholder="Tutti" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutti</SelectItem>
                        {materials.map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-[#D9DDE2]">Altezza</Label>
                    <Select value={heightFilter} onValueChange={setHeightFilter}>
                      <SelectTrigger className="rounded-2xl border-white/10 bg-[#17191D] text-white">
                        <SelectValue placeholder="Tutte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutte</SelectItem>
                        {heights.map((item) => (
                          <SelectItem key={item} value={item}>{item} mm</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-[#D9DDE2]">Finitura</Label>
                    <Select value={finishFilter} onValueChange={setFinishFilter}>
                      <SelectTrigger className="rounded-2xl border-white/10 bg-[#17191D] text-white">
                        <SelectValue placeholder="Tutte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutte</SelectItem>
                        {finishes.map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="text-[#D9DDE2]">Modello</Label>
                  <Select value={effectiveSelectedCode} onValueChange={setSelectedCode}>
                    <SelectTrigger className="rounded-2xl border-white/10 bg-[#17191D] text-white">
                      <SelectValue placeholder="Scegli un modello" />
                    </SelectTrigger>
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
                  Dati per la stima
                </CardTitleComp>
                <CardDescriptionComp className="text-base leading-7 text-[#B6BDC6]">
                  Compila solo i dati essenziali. Il totale si aggiorna subito.
                </CardDescriptionComp>
              </CardHeaderComp>
              <CardContentComp className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label className="text-[#D9DDE2]">Metri lineari</Label>
                  <Input className="rounded-2xl border-white/10 bg-[#17191D] text-white" type="number" min={0} value={linearMeters} onChange={(e) => setLinearMeters(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label className="text-[#D9DDE2]">Km totali A/R</Label>
                  <Input className="rounded-2xl border-white/10 bg-[#17191D] text-white" type="number" min={0} value={returnKm} onChange={(e) => setReturnKm(e.target.value)} />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label className="text-[#D9DDE2]">CAP o località del cantiere</Label>
                  <Input className="rounded-2xl border-white/10 bg-[#17191D] text-white" placeholder="Es. 25017 Lonato del Garda" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>
                <div className="sm:col-span-2 grid gap-3 rounded-[24px] border border-white/10 bg-[#17191D] p-4">
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3">
                    <div>
                      <div className="font-medium text-white">Fornitura battiscopa inclusa</div>
                      <div className="text-sm text-[#9FA7B0]">Attiva di default per avere una stima completa.</div>
                    </div>
                    <Switch checked={includeSupply} onCheckedChange={setIncludeSupply} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3">
                    <div>
                      <div className="font-medium text-white">Spedizione inclusa</div>
                      <div className="text-sm text-[#9FA7B0]">Calcolata in base al peso totale con imballo.</div>
                    </div>
                    <Switch checked={includeShipping} onCheckedChange={setIncludeShipping} />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-[#1F2329] px-4 py-3">
                    <div>
                      <div className="font-medium text-white">Posa in opera inclusa</div>
                      <div className="text-sm text-[#9FA7B0]">Puoi valutarla subito nella tua stima.</div>
                    </div>
                    <Switch checked={includeInstallation} onCheckedChange={setIncludeInstallation} />
                  </div>
                </div>
              </CardContentComp>
            </CardComp>
          </div>

          <div className="flex flex-col gap-6">
            <CardComp className={`sticky top-4 ${eb.cardInteractive}`}>
              <CardHeaderComp className="pb-3">
                <CardTitleComp className="text-2xl text-white">La tua stima indicativa</CardTitleComp>
                <CardDescriptionComp className="text-base leading-7 text-[#B6BDC6]">
                  Una cifra chiara da cui partire, con il motore di calcolo già presente nel preventivatore attuale.
                </CardDescriptionComp>
              </CardHeaderComp>
              <CardContentComp className="grid gap-4">
                <div className={eb.summaryPanel}>
                  <div className="text-sm text-[#B6BDC6]">Totale indicativo IVA inclusa</div>
                  <div className="mt-2 text-4xl font-bold tracking-tight text-[#F4CC18]">{euro.format(calculation.total)}</div>
                  <div className="mt-2 text-sm leading-6 text-[#C7CDD5]">Include servizio EasyBatt, trasferta e tutte le opzioni attive nel preventivo.</div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                    <span className="text-sm text-[#D0D5DB]">Servizio EasyBatt: rilievo + preparazione + taglio</span>
                    <span className="font-semibold text-white">{euro.format(calculation.serviceSubtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3">
                    <span className="text-sm text-[#D0D5DB]">Trasferta</span>
                    <span className="font-semibold text-white">{euro.format(calculation.travelSubtotal)}</span>
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
                    <div>1. Verifichiamo la richiesta e ti aiutiamo a confermare la soluzione più adatta.</div>
                    <div>2. Controlliamo i dettagli operativi prima della conferma finale.</div>
                    <div>3. Ricevi un riferimento chiaro da cui partire per organizzare il lavoro.</div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <ButtonComp className={`${eb.primaryButtonYellow} h-12 text-base`}>
                    Richiedi verifica e conferma
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </ButtonComp>
                  <ButtonComp variant="outline" className={`${eb.outlineButton} h-12 text-base`}>
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Scrivici su WhatsApp
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

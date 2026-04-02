"use client";

import React from "react";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Cog,
  Home,
  ScanLine,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PROCESS_STEPS = [
  {
    number: "1",
    title: "Rilievo preciso",
    text: "Partiamo da un rilievo accurato della stanza, così il lavoro nasce già su basi affidabili.",
    icon: ScanLine,
  },
  {
    number: "2",
    title: "Sviluppo del lavoro",
    text: "Le misure vengono trasformate in lunghezze, angoli e sequenza dei pezzi in modo ordinato.",
    icon: Workflow,
  },
  {
    number: "3",
    title: "Preparazione intelligente",
    text: "I battiscopa vengono preparati con una logica chiara, per semplificare la gestione del lavoro.",
    icon: Cog,
  },
  {
    number: "4",
    title: "Consegna pronta da gestire",
    text: "Ricevi un materiale più ordinato e più semplice da portare in posa.",
    icon: Boxes,
  },
];

function TopNavCome() {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/8 bg-white/[0.03] px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#10B7B3]/25 bg-[#10B7B3]/10">
          <Home className="h-5 w-5 text-[#72E6E2]" />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BFC3C8]">EasyBatt</div>
          <div className="text-sm text-[#8F98A3]">Come funziona</div>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <Button asChild variant="ghost" className="rounded-full px-4 text-[#D8DCE1] hover:bg-white/6 hover:text-white">
          <a href="/">Home</a>
        </Button>
        <Button className="rounded-full bg-[#10B7B3] px-4 font-semibold text-slate-950 hover:bg-[#22C7C2]">
          Pagina attiva
        </Button>
        <Button asChild variant="ghost" className="rounded-full px-4 text-[#D8DCE1] hover:bg-white/6 hover:text-white">
          <a href="/perche-conviene">Perché conviene</a>
        </Button>
        <Button asChild className="rounded-full bg-[#F4CC18] px-4 font-semibold text-slate-950 hover:bg-[#F7D742]">
          <a href="/quanto-mi-costa">Quanto mi costa</a>
        </Button>
      </nav>
    </header>
  );
}

export function EasyBattComeFunzionaPage() {
  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
        <TopNavCome />

        <section className="mb-6 grid gap-4 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.12),_transparent_34%),linear-gradient(135deg,_rgba(20,23,29,0.98),_rgba(29,32,38,0.98))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border border-[#10B7B3]/35 bg-[#10B7B3]/12 px-4 py-1.5 text-[#A7F3F0] hover:bg-[#10B7B3]/12">
                Come funziona
              </Badge>
              <Badge className="rounded-full border border-white/15 bg-white/6 px-4 py-1.5 text-[#D6DBE0] hover:bg-white/6">
                Percorso chiaro e ordinato
              </Badge>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl">
              Dal rilievo alla consegna, senza passaggi confusi
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#B6BDC6] sm:text-xl">
              EasyBatt trasforma il rilievo della stanza in un lavoro più semplice da gestire.
              L’obiettivo non è solo tagliare il battiscopa, ma organizzare meglio tutto il flusso.
            </p>
          </div>

          <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-[#72E6E2]" />
              <div className="text-sm leading-7 text-[#C6CCD4]">
                Il risultato è un processo più lineare: meno improvvisazione in cantiere e più controllo sul lavoro finito.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.number} className="rounded-[30px] border border-white/10 bg-[#1C1F24] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B7B3]/15 text-sm font-bold text-[#72E6E2]">
                      {step.number}
                    </div>
                    <Icon className="h-5 w-5 text-[#F4CC18]" />
                  </div>
                  <CardTitle className="text-2xl text-white">{step.title}</CardTitle>
                  <CardDescription className="text-base leading-7 text-[#B6BDC6]">
                    {step.text}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card className="rounded-[30px] border border-white/10 bg-[#1C1F24] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <CheckCircle2 className="h-5 w-5 text-[#F4CC18]" />
                Cosa ricevi
              </CardTitle>
              <CardDescription className="text-base leading-7 text-[#B6BDC6]">
                Un lavoro più ordinato, più leggibile e più semplice da gestire nella fase successiva.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-[#C6CCD4]">
              <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4">Battiscopa preparato con una logica precisa.</div>
              <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4">Sequenza di lavoro più chiara e meno improvvisata.</div>
              <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4">Gestione più semplice del materiale durante la posa.</div>
              <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4">Meno incertezze e meno perdite di tempo in cantiere.</div>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] border border-white/10 bg-[#1C1F24] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Continua il percorso</CardTitle>
              <CardDescription className="text-base leading-7 text-[#B6BDC6]">
                Adesso puoi passare alla parte del valore oppure andare diretto alla stima del servizio.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button asChild className="h-12 rounded-2xl bg-[#10B7B3] text-base font-semibold text-slate-950 hover:bg-[#22C7C2]">
                <a href="/perche-conviene">
                  Vai a Perché conviene
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild className="h-12 rounded-2xl bg-[#F4CC18] text-base font-semibold text-slate-950 hover:bg-[#F7D742]">
                <a href="/quanto-mi-costa">
                  Vai a Quanto mi costa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default EasyBattComeFunzionaPage;
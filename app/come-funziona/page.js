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
import { eb } from "@/app/easybatt-ui";

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
    <header className={eb.topNav}>
      <div className="flex items-center gap-3">
        <div className={eb.topNavIcon}>
          <Home className="h-5 w-5 text-[#72E6E2]" />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BFC3C8]">EasyBatt</div>
          <div className="text-sm text-[#8F98A3]">Come funziona</div>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <Button asChild variant="ghost" className={eb.navGhost}>
          <a href="/">Home</a>
        </Button>
        <Button className={eb.navActiveTeal}>
          Pagina attiva
        </Button>
        <Button asChild variant="ghost" className={eb.navGhost}>
          <a href="/perche-conviene">Perché conviene</a>
        </Button>
        <Button asChild className={eb.navActiveYellow}>
          <a href="/quanto-mi-costa">Quanto mi costa</a>
        </Button>
      </nav>
    </header>
  );
}

export function EasyBattComeFunzionaPage() {
  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <div className={eb.pageShell}>
        <TopNavCome />

        <section className={`${eb.hero} mb-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end`}>
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className={eb.badgeTeal}>
                Come funziona
              </Badge>
              <Badge className={eb.badgeNeutral}>
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

          <div className={eb.cardInsetSoft}>
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
              <Card key={step.number} className={eb.cardInteractive}>
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
          <Card className={eb.cardInteractive}>
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
              <div className={eb.cardInset}>Battiscopa preparato con una logica precisa.</div>
              <div className={eb.cardInset}>Sequenza di lavoro più chiara e meno improvvisata.</div>
              <div className={eb.cardInset}>Gestione più semplice del materiale durante la posa.</div>
              <div className={eb.cardInset}>Meno incertezze e meno perdite di tempo in cantiere.</div>
            </CardContent>
          </Card>

          <Card className={eb.cardInteractive}>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Continua il percorso</CardTitle>
              <CardDescription className="text-base leading-7 text-[#B6BDC6]">
                Adesso puoi passare alla parte del valore oppure andare diretto alla stima del servizio.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button asChild className={`${eb.primaryButtonTeal} h-12 text-base`}>
                <a href="/perche-conviene">
                  Vai a Perché conviene
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild className={`${eb.primaryButtonYellow} h-12 text-base`}>
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

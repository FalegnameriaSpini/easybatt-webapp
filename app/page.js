"use client";

import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  ChevronRight,
  Home,
  ScanLine,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ENTRY_POINTS = [
  {
    title: "Come funziona",
    description:
      "Scopri il processo: dal rilievo della stanza fino alla preparazione del battiscopa pronto da posare.",
    href: "/come-funziona",
    cta: "Scopri come funziona",
    icon: Workflow,
    accent: "teal",
  },
  {
    title: "Perché conviene",
    description:
      "Capisci subito i vantaggi: meno errori, meno perdite di tempo e un lavoro più ordinato da gestire.",
    href: "/perche-conviene",
    cta: "Scopri i vantaggi",
    icon: BadgeCheck,
    accent: "slate",
  },
  {
    title: "Quanto mi costa",
    description:
      "Vai direttamente alla sezione più pratica e ottieni una stima rapida del servizio EasyBatt.",
    href: "/quanto-mi-costa",
    cta: "Vai al costo",
    icon: Calculator,
    accent: "yellow",
  },
];

function BrandLockup() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.12),_transparent_34%),linear-gradient(135deg,_rgba(20,23,29,0.98),_rgba(29,32,38,0.98))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="flex items-center">
        <img
          src="/Logo_easybatt_trasp.svg"
          alt="EasyBatt - il battiscopa diventa facile"
          className="h-auto w-full max-w-[560px]"
        />
      </div>
    </div>
  );
}

function QuickNav() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="rounded-full border border-[#10B7B3]/35 bg-[#10B7B3]/12 px-4 py-1.5 text-[#A7F3F0] hover:bg-[#10B7B3]/12">
        Nuova home EasyBatt
      </Badge>
      <Badge className="rounded-full border border-[#F4CC18]/35 bg-[#F4CC18]/10 px-4 py-1.5 text-[#F8E58A] hover:bg-[#F4CC18]/10">
        Meno scroll, più chiarezza
      </Badge>
    </div>
  );
}

function EntryCard({ item }) {
  const Icon = item.icon;

  const accentStyles = {
    teal: {
      iconWrap: "bg-[#10B7B3]/12 text-[#72E6E2] border-[#10B7B3]/25",
      button: "bg-[#10B7B3] text-slate-950 hover:bg-[#22C7C2]",
      glow: "from-[#10B7B3]/18",
    },
    slate: {
      iconWrap: "bg-white/6 text-[#D0D5DB] border-white/10",
      button: "bg-[#BFC3C8] text-slate-950 hover:bg-[#D4D8DD]",
      glow: "from-white/10",
    },
    yellow: {
      iconWrap: "bg-[#F4CC18]/12 text-[#F7DA57] border-[#F4CC18]/25",
      button: "bg-[#F4CC18] text-slate-950 hover:bg-[#F7D742]",
      glow: "from-[#F4CC18]/18",
    },
  };

  const styles = accentStyles[item.accent];

  return (
    <div>
      <Card className={`group h-full overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b ${styles.glow} to-transparent shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20`}>
        <CardHeader className="pb-4">
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border ${styles.iconWrap}`}>
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl text-white">{item.title}</CardTitle>
          <CardDescription className="text-base leading-7 text-[#B6BDC6]">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className={`h-12 w-full rounded-2xl text-base font-semibold ${styles.button}`}>
            <a href={item.href}>
              {item.cta}
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EasyBattHomePage() {
  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-6">
        <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/8 bg-white/[0.03] px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#10B7B3]/25 bg-[#10B7B3]/10">
              <Home className="h-5 w-5 text-[#72E6E2]" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BFC3C8]">EasyBatt</div>
              <div className="text-sm text-[#8F98A3]">Home di orientamento</div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Button asChild variant="ghost" className="rounded-full px-4 text-[#D8DCE1] hover:bg-white/6 hover:text-white">
              <a href="/come-funziona">Come funziona</a>
            </Button>
            <Button asChild variant="ghost" className="rounded-full px-4 text-[#D8DCE1] hover:bg-white/6 hover:text-white">
              <a href="/perche-conviene">Perché conviene</a>
            </Button>
            <Button asChild className="rounded-full bg-[#F4CC18] px-4 font-semibold text-slate-950 hover:bg-[#F7D742]">
              <a href="/quanto-mi-costa">Quanto mi costa</a>
            </Button>
          </nav>
        </header>

        <main className="flex flex-1 flex-col justify-center">
          <section className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col gap-6">
              <QuickNav />
              <BrandLockup />

              <div className="max-w-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl">
                  Scegli subito dove vuoi andare
                </h1>
                <p className="mt-4 text-lg leading-8 text-[#B6BDC6] sm:text-xl">
                  EasyBatt ti guida in modo semplice. Se stai scoprendo ora il servizio puoi capire
                  <span className="text-white"> come funziona </span>
                  e
                  <span className="text-white"> perché conviene</span>. Se invece vuoi arrivare subito al punto,
                  puoi andare direttamente alla sezione
                  <span className="text-[#F8E58A]"> Quanto mi costa</span>.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-3 flex items-center gap-2 text-[#72E6E2]">
                    <ScanLine className="h-5 w-5" />
                    <span className="font-semibold text-white">Per chi scopre EasyBatt adesso</span>
                  </div>
                  <p className="text-sm leading-7 text-[#B6BDC6]">
                    Parti da <span className="text-white">Come funziona</span> e poi passa a
                    <span className="text-white"> Perché conviene</span>.
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#F4CC18]/18 bg-[#F4CC18]/6 p-5">
                  <div className="mb-3 flex items-center gap-2 text-[#F8E58A]">
                    <Calculator className="h-5 w-5" />
                    <span className="font-semibold text-white">Per chi vuole andare diretto</span>
                  </div>
                  <p className="text-sm leading-7 text-[#C9CED4]">
                    Vai subito su <span className="text-white">Quanto mi costa</span> e ottieni una stima rapida.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:gap-5">
              {ENTRY_POINTS.map((item) => (
                <EntryCard key={item.title} item={item} />
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[32px] border border-white/8 bg-gradient-to-r from-white/[0.04] via-white/[0.03] to-white/[0.02] p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#8F98A3]">
                  EasyBatt in breve
                </div>
                <p className="text-base leading-8 text-[#C4CBD3] sm:text-lg">
                  Un ingresso più pulito, meno scroll prima del preventivo e una navigazione più chiara.
                  La home orienta, le pagine interne spiegano, e la parte di stima resta nella sezione dedicata.
                </p>
              </div>

              <Button asChild className="h-12 rounded-2xl bg-[#10B7B3] px-5 text-base font-semibold text-slate-950 hover:bg-[#22C7C2]">
                <a href="/quanto-mi-costa">
                  Vai subito al costo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}



"use client";

import React from "react";
import {
  BadgeCheck,
  Calculator,
  ChevronRight,
  Home,
  ScanLine,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { eb } from "@/app/easybatt-ui";

const ENTRY_POINTS = [
  {
    title: "Come funziona",
    description:
      "Vedi il processo: dal rilievo alla preparazione del battiscopa pronto da posare.",
    href: "/come-funziona",
    cta: "Vedi il processo",
    icon: Workflow,
    accent: "teal",
  },
  {
    title: "Perché conviene",
    description:
      "Scopri i vantaggi: meno errori, meno tempo perso, più ordine nel lavoro.",
    href: "/perche-conviene",
    cta: "Vedi i vantaggi",
    icon: BadgeCheck,
    accent: "slate",
  },
  {
    title: "Quanto mi costa",
    description:
      "Vai al punto e ottieni una stima rapida del servizio EasyBatt.",
    href: "/quanto-mi-costa",
    cta: "Vai al costo",
    icon: Calculator,
    accent: "yellow",
  },
];

function BrandLockup() {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.1),_transparent_32%),linear-gradient(135deg,_rgba(20,23,29,0.98),_rgba(29,32,38,0.98))] px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:px-4 sm:py-2.5">
      <div className="flex items-center">
        {/* The SVG uses a large 595.2 x 419.52 viewBox and may still include extra internal whitespace. If the logo keeps feeling too airy, trim the SVG canvas in /public/Logo_easybatt_trasp.svg. */}
        <img
          src="/Logo_easybatt_trasp.svg"
          alt="EasyBatt - il battiscopa diventa facile"
          className="h-auto w-full max-w-[400px] sm:max-w-[420px]"
        />
      </div>
    </div>
  );
}

function EntryCard({ item }) {
  const Icon = item.icon;

  const accentStyles = {
    teal: {
      iconWrap: "bg-[#10B7B3]/12 text-[#72E6E2] border-[#10B7B3]/25",
      button: eb.primaryButtonTeal,
      glow: "from-[#10B7B3]/18",
    },
    slate: {
      iconWrap: "bg-white/6 text-[#D0D5DB] border-white/10",
      button:
        "h-11 rounded-2xl border border-white/10 bg-[#BFC3C8] text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D4D8DD] sm:text-[15px]",
      glow: "from-white/10",
    },
    yellow: {
      iconWrap: "bg-[#F4CC18]/12 text-[#F7DA57] border-[#F4CC18]/25",
      button: eb.primaryButtonYellow,
      glow: "from-[#F4CC18]/18",
    },
  };

  const styles = accentStyles[item.accent];

  return (
    <div>
      <Card className={`group h-full overflow-hidden ${eb.cardInteractive} bg-gradient-to-b ${styles.glow} to-transparent`}>
        <CardHeader className="space-y-3 pb-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${styles.iconWrap}`}>
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl text-white">{item.title}</CardTitle>
          <CardDescription className="text-sm leading-6 text-[#B6BDC6] sm:text-[15px]">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button asChild className={`w-full ${styles.button}`}>
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
    <div className="bg-[#17191D] text-white">
      <div className={`flex min-h-screen flex-col ${eb.pageShell}`}>
        <header className={eb.topNav}>
          <div className="flex items-center gap-3">
            <div className={eb.topNavIcon}>
              <Home className="h-5 w-5 text-[#72E6E2]" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D8DDE3]">EasyBatt</div>
            </div>
          </div>

          <nav className={eb.navGroup}>
            <Button asChild variant="ghost" className={eb.navActiveTeal}>
              <a href="/">Home</a>
            </Button>
            <Button asChild variant="ghost" className={eb.navGhost}>
              <a href="/come-funziona">Come funziona</a>
            </Button>
            <Button asChild variant="ghost" className={eb.navGhost}>
              <a href="/perche-conviene">Perché conviene</a>
            </Button>
            <Button asChild variant="ghost" className={eb.navGhost}>
              <a href="/quanto-mi-costa">Quanto mi costa</a>
            </Button>
          </nav>
        </header>

        <main className="flex flex-1 flex-col">
          <section className="grid items-start gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
            <div className="flex flex-col gap-4">
              <BrandLockup />

              <div className="max-w-2xl">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-5xl">
                  Scegli dove andare
                </h1>
                <p className="mt-3 text-base leading-7 text-[#B6BDC6] sm:text-lg">
                  Se stai scoprendo EasyBatt, parti da
                  <span className="text-white"> Come funziona </span>
                  e
                  <span className="text-white"> Perché conviene</span>. Se vuoi una risposta rapida, vai su
                  <span className="text-[#F8E58A]"> Quanto mi costa</span>.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className={eb.cardInsetSoft}>
                  <div className="mb-2 flex items-center gap-2 text-[#72E6E2]">
                    <ScanLine className="h-5 w-5" />
                    <span className="font-semibold text-white">Se parti da zero</span>
                  </div>
                  <p className="text-sm leading-6 text-[#B6BDC6]">
                    Parti da <span className="text-white">Come funziona</span>, poi vai a
                    <span className="text-white"> Perché conviene</span>.
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#F4CC18]/18 bg-[#F4CC18]/6 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#F8E58A]">
                    <Calculator className="h-5 w-5" />
                    <span className="font-semibold text-white">Se vuoi andare al punto</span>
                  </div>
                  <p className="text-sm leading-6 text-[#C9CED4]">
                    Vai su <span className="text-white">Quanto mi costa</span> e ottieni una stima rapida.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 lg:gap-4">
              {ENTRY_POINTS.map((item) => (
                <EntryCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  BadgeCheck,
  Calculator,
  ChevronRight,
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

function FixedBrandLockup() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5">
          <BrandLockup />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-40 hidden lg:flex lg:items-center">
        <div className="mx-auto flex w-full max-w-7xl px-6">
          <div className="pointer-events-auto w-full max-w-[368px]">
            <BrandLockup />
          </div>
        </div>
      </div>
    </>
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
      <FixedBrandLockup />

      <div className={`flex min-h-screen flex-col ${eb.pageShell} pt-[184px] sm:pt-[198px] lg:py-5`}>
        <main className="flex flex-1 items-start lg:items-center">
          <section className="grid w-full items-center gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
            <div aria-hidden="true" className="hidden lg:block" />

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

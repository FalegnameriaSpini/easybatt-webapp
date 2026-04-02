"use client";

import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Home,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DIFFERENTIATORS = [
  {
    title: "Risparmi tempo",
    text: "Riduci i tempi morti e le lavorazioni improvvisate sul posto, con un flusso più lineare.",
    icon: Clock3,
  },
  {
    title: "Riduci gli errori",
    text: "Una preparazione più precisa aiuta a limitare rifacimenti, aggiustamenti e incertezze.",
    icon: ShieldCheck,
  },
  {
    title: "Lavori meglio",
    text: "Materiale più ordinato e gestione più chiara significano un cantiere più semplice da seguire.",
    icon: Wrench,
  },
];

function TopNavPerche() {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/8 bg-white/[0.03] px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#10B7B3]/25 bg-[#10B7B3]/10">
          <Home className="h-5 w-5 text-[#72E6E2]" />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BFC3C8]">EasyBatt</div>
          <div className="text-sm text-[#8F98A3]">Perché conviene</div>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <Button asChild variant="ghost" className="rounded-full px-4 text-[#D8DCE1] hover:bg-white/6 hover:text-white">
          <a href="/">Home</a>
        </Button>
        <Button asChild variant="ghost" className="rounded-full px-4 text-[#D8DCE1] hover:bg-white/6 hover:text-white">
          <a href="/come-funziona">Come funziona</a>
        </Button>
        <Button className="rounded-full bg-[#10B7B3] px-4 font-semibold text-slate-950 hover:bg-[#22C7C2]">
          Pagina attiva
        </Button>
        <Button asChild className="rounded-full bg-[#F4CC18] px-4 font-semibold text-slate-950 hover:bg-[#F7D742]">
          <a href="/quanto-mi-costa">Quanto mi costa</a>
        </Button>
      </nav>
    </header>
  );
}

export function EasyBattPercheConvienePage() {
  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
        <TopNavPerche />

        <section className="mb-6 grid gap-4 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,175,169,0.12),_transparent_34%),linear-gradient(135deg,_rgba(20,23,29,0.98),_rgba(29,32,38,0.98))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border border-[#10B7B3]/35 bg-[#10B7B3]/12 px-4 py-1.5 text-[#A7F3F0] hover:bg-[#10B7B3]/12">
                Perché conviene
              </Badge>
              <Badge className="rounded-full border border-[#F4CC18]/35 bg-[#F4CC18]/10 px-4 py-1.5 text-[#F8E58A] hover:bg-[#F4CC18]/10">
                Più ordine, meno attrito
              </Badge>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl">
              Meno tempo perso, meno errori, più controllo del lavoro
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#B6BDC6] sm:text-xl">
              Quando il battiscopa viene gestito in modo più preciso e organizzato, si riducono complicazioni,
              rifacimenti e passaggi inutili. Il vantaggio non è solo estetico: è soprattutto pratico.
            </p>
          </div>

          <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-[#F4CC18]" />
              <div className="text-sm leading-7 text-[#C6CCD4]">
                Non si tratta solo di avere il battiscopa tagliato. Si tratta di semplificare tutto il lavoro che c’è intorno.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="rounded-[30px] border border-white/10 bg-[#1C1F24] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#10B7B3]/25 bg-[#10B7B3]/12 text-[#72E6E2]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl text-white">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-7 text-[#B6BDC6]">
                    {item.text}
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
                <BadgeCheck className="h-5 w-5 text-[#F4CC18]" />
                A chi è utile
              </CardTitle>
              <CardDescription className="text-base leading-7 text-[#B6BDC6]">
                EasyBatt è pensato per semplificare il lavoro di chi deve far andare bene il risultato finale.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-[#C6CCD4]">
              <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4">Posatori che vogliono velocizzare la fase di posa.</div>
              <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4">Imprese che cercano più ordine e meno imprevisti in cantiere.</div>
              <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4">Clienti che vogliono un servizio più preciso e più semplice da seguire.</div>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] border border-white/10 bg-[#1C1F24] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <CheckCircle2 className="h-5 w-5 text-[#72E6E2]" />
                Continua il percorso
              </CardTitle>
              <CardDescription className="text-base leading-7 text-[#B6BDC6]">
                Adesso puoi vedere meglio il processo oppure arrivare direttamente alla stima del servizio.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button asChild className="h-12 rounded-2xl bg-[#10B7B3] text-base font-semibold text-slate-950 hover:bg-[#22C7C2]">
                <a href="/come-funziona">
                  Vai a Come funziona
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

export default EasyBattPercheConvienePage;
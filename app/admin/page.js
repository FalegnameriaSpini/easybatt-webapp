"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, Plus, Save, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_EASYBATT_CONFIG, normalizeEasyBattConfig } from "@/lib/easybatt-config";
import { eb } from "@/app/easybatt-ui";

function cloneConfig(config) {
  return normalizeEasyBattConfig(JSON.parse(JSON.stringify(config)));
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function Field({ label, children, help }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#E7EBEF]">{label}</span>
      {children}
      {help && <span className="text-xs leading-5 text-[#8F98A3]">{help}</span>}
    </label>
  );
}

const inputClass =
  "h-11 rounded-xl border border-white/10 bg-[#11161C] px-3 text-sm text-white outline-none transition focus:border-[#10B7B3]/50 focus:ring-2 focus:ring-[#10B7B3]/20";

export default function EasyBattAdminPage() {
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState(() => cloneConfig(DEFAULT_EASYBATT_CONFIG));
  const [savedConfig, setSavedConfig] = useState(() => cloneConfig(DEFAULT_EASYBATT_CONFIG));
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const changed = useMemo(
    () => JSON.stringify(config) !== JSON.stringify(savedConfig),
    [config, savedConfig],
  );

  useEffect(() => {
    setPassword(sessionStorage.getItem("easybatt-admin-password") || "");

    fetch("/api/easybatt-config")
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (payload?.config) {
          const next = cloneConfig(payload.config);
          setConfig(next);
          setSavedConfig(cloneConfig(next));
        }
      })
      .catch(() => {
        setMessage("Non riesco a caricare la configurazione salvata. Uso i valori di default.");
      });
  }, []);

  function updateValue(key, value) {
    setConfig((current) => ({ ...current, [key]: value }));
    setStatus("idle");
  }

  function updateNumber(key, value) {
    updateValue(key, numberValue(value));
  }

  function updateModel(index, patch) {
    setConfig((current) => ({
      ...current,
      models: current.models.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    }));
    setStatus("idle");
  }

  function addModel() {
    setConfig((current) => ({
      ...current,
      models: [
        ...current.models,
        {
          code: `NUOVO-${current.models.length + 1}`,
          description: "Nuovo battiscopa",
          material: "Materiale",
          height: 80,
          thickness: 13,
          profile: "Raggio 3",
          finish: "Grezzo",
          weightKgMl: 0.27,
          supplyBaseCostPerMl: 4,
          sectionImageUrl: "",
          ambientImageUrl: "",
          active: true,
        },
      ],
    }));
    setStatus("idle");
  }

  function removeModel(index) {
    setConfig((current) => ({
      ...current,
      models: current.models.filter((_, itemIndex) => itemIndex !== index),
    }));
    setStatus("idle");
  }

  async function uploadModelImage(index, kind, file) {
    if (!file) return;

    setStatus("saving");
    setMessage("Caricamento immagine in corso...");
    sessionStorage.setItem("easybatt-admin-password", password);

    try {
      const model = config.models[index];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("code", model.code);
      formData.append("kind", kind);

      const response = await fetch("/api/easybatt-model-image", {
        method: "POST",
        headers: {
          "x-admin-password": password,
        },
        body: formData,
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "Caricamento non riuscito.");
      }

      updateModel(index, kind === "section" ? { sectionImageUrl: payload.url } : { ambientImageUrl: payload.url });
      setStatus("idle");
      setMessage("Immagine caricata. Premi Salva e pubblica per aggiornare il sito.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Caricamento non riuscito.");
    }
  }

  function updateBand(index, patch) {
    setConfig((current) => ({
      ...current,
      shippingBands: current.shippingBands.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    }));
    setStatus("idle");
  }

  function addBand() {
    setConfig((current) => ({
      ...current,
      shippingBands: [...current.shippingBands, { maxKg: 400, price: 140 }],
    }));
    setStatus("idle");
  }

  function removeBand(index) {
    setConfig((current) => ({
      ...current,
      shippingBands: current.shippingBands.filter((_, itemIndex) => itemIndex !== index),
    }));
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    setMessage("");
    sessionStorage.setItem("easybatt-admin-password", password);

    try {
      const response = await fetch("/api/easybatt-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ config }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.config) {
        throw new Error(payload?.error || "Salvataggio non riuscito.");
      }

      const next = cloneConfig(payload.config);
      setConfig(next);
      setSavedConfig(cloneConfig(next));
      setStatus("saved");
      setMessage("Listino pubblicato. Il preventivatore usa gia' questi valori.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Salvataggio non riuscito.");
    }
  }

  return (
    <main className="min-h-screen bg-[#17191D] text-white">
      <div className={eb.pageShell}>
        <header className="mb-5 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-[#1C1F24] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/Logo_easybatt_trasp.png" alt="EasyBatt" className="h-auto w-52 max-w-full" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#72E6E2]">Area riservata</p>
              <h1 className="text-2xl font-bold">Gestione EasyBatt</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className={eb.outlineButton}>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Sito
              </Link>
            </Button>
            <Button asChild className={eb.primaryButtonYellow}>
              <Link href="/quanto-mi-costa">
                <Eye className="mr-2 h-4 w-4" />
                Preventivatore
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-[24px] border border-white/10 bg-[#1C1F24] p-4">
            <nav className="grid gap-2 text-sm">
              <a className="rounded-xl bg-[#10B7B3]/12 px-3 py-2 font-semibold text-[#A7F3F0]" href="#accesso">Accesso</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#tariffe">Tariffe</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#spedizioni">Spedizioni</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#modelli">Modelli</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#contatti">WhatsApp</a>
            </nav>
          </aside>

          <section className="grid gap-5 pb-24">
            <section id="accesso" className={eb.card}>
              <div className="grid gap-4 p-5">
                <div>
                  <h2 className="text-xl font-bold">Accesso admin</h2>
                  <p className="mt-1 text-sm text-[#B6BDC6]">Password richiesta per salvare. In locale, se non imposti una variabile ambiente, la password e&apos; easybatt-admin.</p>
                </div>
                <Field label="Password admin">
                  <input className={inputClass} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                </Field>
              </div>
            </section>

            <section id="tariffe" className={eb.card}>
              <div className="grid gap-4 p-5">
                <div>
                  <h2 className="text-xl font-bold">Tariffe generali</h2>
                  <p className="mt-1 text-sm text-[#B6BDC6]">Questi valori alimentano direttamente il calcolo del prezzo.</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <Field label="Taglio e preparazione" help="EUR per metro lineare">
                    <input className={inputClass} type="number" min="0" step="0.01" value={config.serviceRate} onChange={(event) => updateNumber("serviceRate", event.target.value)} />
                  </Field>
                  <Field label="Trasferta" help="EUR per km andata/ritorno">
                    <input className={inputClass} type="number" min="0" step="0.01" value={config.travelRate} onChange={(event) => updateNumber("travelRate", event.target.value)} />
                  </Field>
                  <Field label="Posa in opera" help="EUR per metro lineare">
                    <input className={inputClass} type="number" min="0" step="0.01" value={config.installationRate} onChange={(event) => updateNumber("installationRate", event.target.value)} />
                  </Field>
                  <Field label="Margine fornitura" help="0.30 significa +30%">
                    <input className={inputClass} type="number" min="0" step="0.01" value={config.supplyMargin} onChange={(event) => updateNumber("supplyMargin", event.target.value)} />
                  </Field>
                  <Field label="Peso imballo" help="Kg per metro lineare">
                    <input className={inputClass} type="number" min="0" step="0.01" value={config.packagingWeightKgMl} onChange={(event) => updateNumber("packagingWeightKgMl", event.target.value)} />
                  </Field>
                  <Field label="IVA" help="0.22 significa 22%">
                    <input className={inputClass} type="number" min="0" max="1" step="0.01" value={config.vat} onChange={(event) => updateNumber("vat", event.target.value)} />
                  </Field>
                </div>
              </div>
            </section>

            <section id="spedizioni" className={eb.card}>
              <div className="grid gap-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">Fasce spedizione</h2>
                    <p className="mt-1 text-sm text-[#B6BDC6]">Il preventivatore usa la prima fascia in cui il peso totale rientra.</p>
                  </div>
                  <Button type="button" className={eb.primaryButtonTeal} onClick={addBand}>
                    <Plus className="mr-2 h-4 w-4" />
                    Fascia
                  </Button>
                </div>
                <div className="grid gap-3">
                  {config.shippingBands.map((band, index) => (
                    <div className="grid gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-3 sm:grid-cols-[1fr_1fr_auto]" key={`${band.maxKg}-${index}`}>
                      <Field label="Fino a kg">
                        <input className={inputClass} type="number" min="0" step="1" value={band.maxKg} onChange={(event) => updateBand(index, { maxKg: numberValue(event.target.value) })} />
                      </Field>
                      <Field label="Prezzo">
                        <input className={inputClass} type="number" min="0" step="0.01" value={band.price} onChange={(event) => updateBand(index, { price: numberValue(event.target.value) })} />
                      </Field>
                      <Button type="button" variant="outline" className={`${eb.outlineButton} self-end`} onClick={() => removeBand(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="modelli" className={eb.card}>
              <div className="grid gap-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">Listino battiscopa</h2>
                    <p className="mt-1 text-sm text-[#B6BDC6]">Puoi aggiungere, nascondere o modificare i modelli disponibili nel calcolatore.</p>
                  </div>
                  <Button type="button" className={eb.primaryButtonTeal} onClick={addModel}>
                    <Plus className="mr-2 h-4 w-4" />
                    Modello
                  </Button>
                </div>
                <div className="grid gap-4">
                  {config.models.map((model, index) => (
                    <article className="grid gap-3 rounded-[20px] border border-white/10 bg-[#17191D] p-4" key={`${model.code}-${index}`}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <strong className="text-[#F4CC18]">{model.code}</strong>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="flex items-center gap-2 text-sm text-[#D9DDE2]">
                            <input type="checkbox" checked={model.active !== false} onChange={(event) => updateModel(index, { active: event.target.checked })} />
                            Visibile
                          </label>
                          <Button type="button" variant="outline" className={eb.outlineButton} onClick={() => removeModel(index)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Rimuovi
                          </Button>
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <Field label="Codice"><input className={inputClass} value={model.code} onChange={(event) => updateModel(index, { code: event.target.value })} /></Field>
                        <Field label="Descrizione"><input className={inputClass} value={model.description} onChange={(event) => updateModel(index, { description: event.target.value })} /></Field>
                        <Field label="Materiale"><input className={inputClass} value={model.material} onChange={(event) => updateModel(index, { material: event.target.value })} /></Field>
                        <Field label="Finitura"><input className={inputClass} value={model.finish} onChange={(event) => updateModel(index, { finish: event.target.value })} /></Field>
                        <Field label="Altezza mm"><input className={inputClass} type="number" min="0" value={model.height} onChange={(event) => updateModel(index, { height: numberValue(event.target.value) })} /></Field>
                        <Field label="Spessore mm"><input className={inputClass} type="number" min="0" value={model.thickness} onChange={(event) => updateModel(index, { thickness: numberValue(event.target.value) })} /></Field>
                        <Field label="Profilo"><input className={inputClass} value={model.profile} onChange={(event) => updateModel(index, { profile: event.target.value })} /></Field>
                        <Field label="Kg/ml"><input className={inputClass} type="number" min="0" step="0.0001" value={model.weightKgMl} onChange={(event) => updateModel(index, { weightKgMl: numberValue(event.target.value) })} /></Field>
                        <Field label="Costo base EUR/ml"><input className={inputClass} type="number" min="0" step="0.01" value={model.supplyBaseCostPerMl} onChange={(event) => updateModel(index, { supplyBaseCostPerMl: numberValue(event.target.value) })} /></Field>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#11161C]">
                          <div className="flex h-40 items-center justify-center bg-white/[0.03]">
                            {model.sectionImageUrl ? (
                              <img src={model.sectionImageUrl} alt={`Sezione tecnica ${model.description}`} className="h-full w-full object-cover" />
                            ) : (
                              <span className="px-4 text-center text-sm text-[#8F98A3]">Sezione tecnica non caricata</span>
                            )}
                          </div>
                          <div className="grid gap-3 border-t border-white/10 p-3">
                            <Field label="URL sezione tecnica">
                              <input className={inputClass} value={model.sectionImageUrl || ""} onChange={(event) => updateModel(index, { sectionImageUrl: event.target.value })} placeholder="/uploads/easybatt-models/..." />
                            </Field>
                            <label className={`${eb.outlineButton} flex h-11 cursor-pointer items-center justify-center rounded-2xl text-sm font-semibold`}>
                              <Upload className="mr-2 h-4 w-4" />
                              Carica sezione tecnica
                              <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void uploadModelImage(index, "section", event.target.files?.[0])} />
                            </label>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#11161C]">
                          <div className="flex h-40 items-center justify-center bg-white/[0.03]">
                            {model.ambientImageUrl ? (
                              <img src={model.ambientImageUrl} alt={`Battiscopa ambientato ${model.description}`} className="h-full w-full object-cover" />
                            ) : (
                              <span className="px-4 text-center text-sm text-[#8F98A3]">Immagine ambientata non caricata</span>
                            )}
                          </div>
                          <div className="grid gap-3 border-t border-white/10 p-3">
                            <Field label="URL immagine ambientata">
                              <input className={inputClass} value={model.ambientImageUrl || ""} onChange={(event) => updateModel(index, { ambientImageUrl: event.target.value })} placeholder="/uploads/easybatt-models/..." />
                            </Field>
                            <label className={`${eb.outlineButton} flex h-11 cursor-pointer items-center justify-center rounded-2xl text-sm font-semibold`}>
                              <Upload className="mr-2 h-4 w-4" />
                              Carica immagine ambientata
                              <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void uploadModelImage(index, "ambient", event.target.files?.[0])} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="contatti" className={eb.card}>
              <div className="grid gap-4 p-5">
                <div>
                  <h2 className="text-xl font-bold">WhatsApp e sede</h2>
                  <p className="mt-1 text-sm text-[#B6BDC6]">Un solo punto per aggiornare contatti e messaggi precompilati.</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Numero WhatsApp"><input className={inputClass} value={config.whatsappNumber} onChange={(event) => updateValue("whatsappNumber", event.target.value)} /></Field>
                  <Field label="Sede"><input className={inputClass} value={config.headquartersLabel} onChange={(event) => updateValue("headquartersLabel", event.target.value)} /></Field>
                  <Field label="Messaggio chiarimento"><input className={inputClass} value={config.whatsappMessage} onChange={(event) => updateValue("whatsappMessage", event.target.value)} /></Field>
                  <Field label="Messaggio riepilogo"><input className={inputClass} value={config.whatsappRecapMessage} onChange={(event) => updateValue("whatsappRecapMessage", event.target.value)} /></Field>
                  <Field label="Messaggio verifica"><input className={inputClass} value={config.whatsappVerifyMessage} onChange={(event) => updateValue("whatsappVerifyMessage", event.target.value)} /></Field>
                </div>
              </div>
            </section>
          </section>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#11161C]/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className={`text-sm ${status === "error" ? "text-[#F2A3A3]" : status === "saved" ? "text-[#72E6E2]" : "text-[#B6BDC6]"}`}>
              {message || (changed ? "Hai modifiche non ancora pubblicate." : "Tutto salvato.")}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className={eb.outlineButton} disabled={!changed || status === "saving"} onClick={() => { setConfig(cloneConfig(savedConfig)); setStatus("idle"); setMessage(""); }}>
                Annulla
              </Button>
              <Button type="button" className={eb.primaryButtonYellow} disabled={!changed || status === "saving"} onClick={() => void save()}>
                <Save className="mr-2 h-4 w-4" />
                {status === "saving" ? "Salvataggio..." : "Salva e pubblica"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

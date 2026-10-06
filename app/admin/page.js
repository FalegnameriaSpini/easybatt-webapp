"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, LogIn, LogOut, Plus, Save, Search, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { normalizeEasyBattConfig } from "@/lib/easybatt-config";
import { mapBattiscopaCatalog } from "@/lib/easybatt-catalog.mjs";
import { validatePriceLists } from "@/lib/easybatt-price-lists.mjs";
import { AdminPriceLists } from "@/components/admin-price-lists";
import { AdminCustomers } from "@/components/admin-customers";
import { eb } from "@/app/easybatt-ui";

function cloneConfig(config) {
  return normalizeEasyBattConfig(JSON.parse(JSON.stringify(config)));
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function Field({ label, children, help, className = "" }) {
  return (
    <label className={`grid gap-2 lg:min-w-0 ${className}`}>
      <span className="text-sm font-semibold text-[#E7EBEF]">{label}</span>
      {children}
      {help && <span className="text-xs leading-5 text-[#8F98A3]">{help}</span>}
    </label>
  );
}

const inputClass =
  "h-11 rounded-xl border border-white/10 bg-[#11161C] px-3 text-sm text-white outline-none transition focus:border-[#10B7B3]/50 focus:ring-2 focus:ring-[#10B7B3]/20 lg:min-w-0 lg:w-full";

export default function EasyBattAdminPage() {
  const [password, setPassword] = useState("");
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { sessionStorage.removeItem("easybatt-admin-password"); }, []);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/easybatt-config?admin=1", {
        headers: { "x-admin-password": password }, cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok || !payload.config) throw new Error(payload.error || "Accesso non riuscito.");
      setRecord(payload);
    } catch (error) {
      setError(error.message || "Accesso non riuscito.");
    } finally {
      setLoading(false);
    }
  }

  if (record) return <AdminEditor initialRecord={record} password={password} onLogout={() => { setRecord(null); setPassword(""); }} />;

  return (
    <main className="min-h-screen bg-[#17191D] px-5 py-12 text-white">
      <form onSubmit={login} className="mx-auto grid w-full max-w-sm gap-5">
        <Link href="/"><img src="/Logo_easybatt_trasp.png" alt="EasyBatt" className="h-auto w-64 max-w-full" /></Link>
        <h1 className="text-2xl font-bold">Accesso admin</h1>
        <Field label="Password admin">
          <input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        </Field>
        {error && <p role="alert" className="text-sm text-[#F2A3A3]">{error}</p>}
        <Button type="submit" disabled={loading} className={eb.primaryButtonYellow}><LogIn className="mr-2 h-4 w-4" />{loading ? "Accesso..." : "Accedi"}</Button>
      </form>
    </main>
  );
}

function AdminEditor({ initialRecord, password, onLogout }) {
  const [config, setConfig] = useState(() => cloneConfig(initialRecord.config));
  const [savedConfig, setSavedConfig] = useState(() => cloneConfig(initialRecord.config));
  const [revision, setRevision] = useState(initialRecord.revision);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [selectedModelCode, setSelectedModelCode] = useState(initialRecord.config.models[0]?.code || "");
  const [catalogImportSummary, setCatalogImportSummary] = useState(null);

  const changed = useMemo(
    () => JSON.stringify(config) !== JSON.stringify(savedConfig),
    [config, savedConfig],
  );

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
    const code = `NUOVO-${config.models.length + 1}`;
    setConfig((current) => ({
      ...current,
      models: [
        ...current.models,
        {
          code,
          description: "Nuovo battiscopa",
          material: "Materiale",
          height: 80,
          thickness: 13,
          measure: "80x13",
          stickLengthLabel: "2400",
          profile: "Raggio 3",
          finish: "Grezzo",
          finishFamily: "Legno grezzo",
          finishLabel: "Nuova finitura",
          weightKgMl: 0.27,
          supplyBaseCostPerMl: 4,
          sectionImageUrl: "",
          finishImageUrl: "",
          active: true,
        },
      ],
    }));
    setSelectedModelCode(code);
    setStatus("idle");
  }

  function removeModel(index) {
    setConfig((current) => ({
      ...current,
      models: current.models.filter((_, itemIndex) => itemIndex !== index),
    }));
    setSelectedModelCode("");
    setStatus("idle");
  }

  async function uploadModelImage(index, kind, file) {
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setStatus("error");
      setMessage("Immagine troppo grande. Limite 3 MB.");
      return;
    }

    setStatus("saving");
    setMessage("Caricamento immagine in corso...");

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

      updateModel(index, kind === "section" ? { sectionImageUrl: payload.url } : { finishImageUrl: payload.url });
      setStatus("idle");
      setMessage("Immagine caricata. Premi Salva e pubblica per aggiornare il sito.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Caricamento non riuscito.");
    }
  }

  async function importCatalogFile(file) {
    if (!file) return;
    setStatus("saving");
    setMessage("Analisi del catalogo in corso...");

    try {
      const parsed = JSON.parse(await file.text());
      const { models, errors } = mapBattiscopaCatalog(parsed);
      if (errors.length) throw new Error(errors.slice(0, 8).join(" "));

      const currentByCode = new Map(config.models.map((model) => [model.code, model]));
      let added = 0;
      let updated = 0;
      let unchanged = 0;
      models.forEach((model) => {
        const current = currentByCode.get(model.code);
        // Price imports must not discard photographs already published from the admin.
        for (const key of ["sectionImageUrl", "finishImageUrl"]) {
          if (current?.[key]?.startsWith("https://") || current?.[key]?.startsWith("/uploads/")) {
            model[key] = current[key];
          }
        }
        if (!current) added += 1;
        else if (JSON.stringify(current) === JSON.stringify(model)) unchanged += 1;
        else updated += 1;
      });

      setConfig((current) => ({ ...current, models }));
      setSelectedModelCode(models[0]?.code || "");
      setCatalogImportSummary({ total: models.length, added, updated, unchanged });
      setStatus("idle");
      setMessage(`Catalogo pronto: ${models.length} prodotti. Premi Salva e pubblica.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "File JSON non valido.");
    }
  }

  const filteredAdminModels = useMemo(() => {
    const query = modelSearch.trim().toLowerCase();
    return config.models
      .map((model, index) => ({ model, index }))
      .filter(({ model }) => !query || [model.code, model.description, model.material, model.finishLabel, model.profile]
        .some((value) => String(value || "").toLowerCase().includes(query)));
  }, [config.models, modelSearch]);

  const selectedModelIndex = config.models.findIndex((model) => model.code === selectedModelCode);
  const activeModelIndex = selectedModelIndex >= 0 ? selectedModelIndex : filteredAdminModels[0]?.index ?? -1;
  const adminModel = activeModelIndex >= 0 ? config.models[activeModelIndex] : null;

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
    const errors = validatePriceLists(config.priceLists);
    if (errors.length) {
      setStatus("error");
      setMessage(errors[0]);
      return;
    }
    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch("/api/easybatt-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ config, revision }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.config) {
        throw new Error(payload?.error || "Salvataggio non riuscito.");
      }

      const next = cloneConfig(payload.config);
      setConfig(next);
      setSavedConfig(cloneConfig(next));
      setRevision(payload.revision);
      setStatus("saved");
      setMessage("Configurazione salvata. I listini dedicati mantengono lo stato scelto.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Salvataggio non riuscito.");
    }
  }

  return (
    <main className="min-h-screen bg-[#17191D] text-white">
      <div className={`${eb.pageShell} lg:max-w-[1800px]`}>
        <header className="mb-5 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-[#1C1F24] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <img src="/Logo_easybatt_trasp.png" alt="EasyBatt" className="h-auto w-52 max-w-full" />
            <div className="min-w-0">
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

        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[24px] border border-white/10 bg-[#1C1F24] p-4">
            <nav className="grid gap-2 text-sm">
              <a className="rounded-xl bg-[#10B7B3]/12 px-3 py-2 font-semibold text-[#A7F3F0]" href="#accesso">Accesso</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#tariffe">Tariffe</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#listini">Listini dedicati</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#clienti">Clienti</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#spedizioni">Spedizioni</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#modelli">Modelli</a>
              <a className="rounded-xl px-3 py-2 text-[#B9C1CA] hover:bg-white/[0.06]" href="#contatti">WhatsApp</a>
            </nav>
          </aside>

          <section className="grid gap-5 pb-24 lg:min-w-0">
            <section id="accesso" className={eb.card}>
              <div className="grid gap-4 p-5">
                <div>
                  <h2 className="text-xl font-bold">Accesso admin</h2>
                  <p className={`mt-1 text-sm ${initialRecord.storage === "sandbox" ? "text-[#F4CC18]" : "text-[#B6BDC6]"}`}>{initialRecord.storage === "supabase" ? "Database e immagini: Supabase" : initialRecord.storage === "sandbox" ? "Ambiente di prova - dati locali separati" : "Archivio locale"}</p>
                  {!initialRecord.writable && <p role="alert" className="mt-2 text-sm text-[#F2A3A3]">Salvataggio online non configurato. Collega Supabase.</p>}
                </div>
                <Button type="button" variant="outline" className={`${eb.outlineButton} w-fit`} onClick={onLogout}><LogOut className="mr-2 h-4 w-4" />Esci</Button>
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

            <AdminPriceLists config={config} onChange={(priceLists) => updateValue("priceLists", priceLists)} disabled={status === "saving" || !initialRecord.writable} />
            <AdminCustomers password={password} />

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
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Listino battiscopa</h2>
                    <p className="mt-1 text-sm text-[#B6BDC6]">{config.models.length} prodotti disponibili nel calcolatore.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <label className={`${eb.outlineButton} flex h-11 cursor-pointer items-center justify-center rounded-2xl px-4 text-sm font-semibold`}>
                      <Upload className="mr-2 h-4 w-4" />
                      Importa JSON
                      <input className="sr-only" type="file" accept="application/json,.json" onChange={(event) => void importCatalogFile(event.target.files?.[0])} />
                    </label>
                    <Button type="button" className={eb.primaryButtonTeal} onClick={addModel}>
                      <Plus className="mr-2 h-4 w-4" />
                      Modello
                    </Button>
                  </div>
                </div>

                {catalogImportSummary && (
                  <div className="grid gap-2 rounded-[18px] border border-[#10B7B3]/25 bg-[#10B7B3]/8 p-4 text-sm text-[#C8FAF8] sm:grid-cols-4">
                    <span><strong>{catalogImportSummary.total}</strong> totali</span>
                    <span><strong>{catalogImportSummary.added}</strong> nuovi</span>
                    <span><strong>{catalogImportSummary.updated}</strong> aggiornati</span>
                    <span><strong>{catalogImportSummary.unchanged}</strong> invariati</span>
                  </div>
                )}

                <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)]">
                  <div className="grid content-start gap-3 lg:min-w-0">
                    <label className="relative">
                      <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#8F98A3]" />
                      <input className={`${inputClass} w-full pl-10`} value={modelSearch} onChange={(event) => setModelSearch(event.target.value)} placeholder="Codice, finitura o materiale" />
                    </label>
                    <div className="max-h-[620px] overflow-y-auto rounded-[18px] border border-white/10 bg-[#11161C] p-1.5">
                      {filteredAdminModels.map(({ model, index }) => (
                        <button
                          type="button"
                          key={`${model.code}-${index}`}
                          onClick={() => setSelectedModelCode(model.code)}
                          className={`grid w-full gap-0.5 rounded-xl px-3 py-2.5 text-left transition ${
                            index === activeModelIndex ? "bg-[#10B7B3]/14 text-white" : "text-[#C6CCD4] hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="text-sm font-semibold">{model.code}</span>
                          <span className="truncate text-xs text-[#8F98A3]">{model.finishLabel} · {model.measure}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {adminModel && (
                    <article className="grid gap-4 rounded-[20px] border border-white/10 bg-[#17191D] p-4 lg:min-w-0">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <strong className="text-[#F4CC18]">{adminModel.code}</strong>
                          <div className="mt-1 text-sm text-[#8F98A3]">{adminModel.description}</div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="flex items-center gap-2 text-sm text-[#D9DDE2]">
                            <input type="checkbox" checked={adminModel.active !== false} onChange={(event) => updateModel(activeModelIndex, { active: event.target.checked })} />
                            Visibile
                          </label>
                          <Button type="button" variant="outline" className={eb.outlineButton} onClick={() => removeModel(activeModelIndex)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Rimuovi
                          </Button>
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                        <Field label="Codice"><input className={inputClass} value={adminModel.code} onChange={(event) => { updateModel(activeModelIndex, { code: event.target.value }); setSelectedModelCode(event.target.value); }} /></Field>
                        <Field label="Descrizione" className="2xl:col-span-2"><input className={inputClass} value={adminModel.description} onChange={(event) => updateModel(activeModelIndex, { description: event.target.value })} /></Field>
                        <Field label="Materiale" className="lg:col-span-full"><input className={inputClass} value={adminModel.material} onChange={(event) => updateModel(activeModelIndex, { material: event.target.value })} /></Field>
                        <Field label="Famiglia finitura"><input className={inputClass} value={adminModel.finishFamily} onChange={(event) => updateModel(activeModelIndex, { finishFamily: event.target.value })} /></Field>
                        <Field label="Finitura commerciale"><input className={inputClass} value={adminModel.finishLabel} onChange={(event) => updateModel(activeModelIndex, { finishLabel: event.target.value })} /></Field>
                        <Field label="Finitura tecnica"><input className={inputClass} value={adminModel.finish} onChange={(event) => updateModel(activeModelIndex, { finish: event.target.value })} /></Field>
                        <Field label="Misura"><input className={inputClass} value={adminModel.measure} onChange={(event) => updateModel(activeModelIndex, { measure: event.target.value })} /></Field>
                        <Field label="Altezza mm"><input className={inputClass} type="number" min="0" value={adminModel.height} onChange={(event) => updateModel(activeModelIndex, { height: numberValue(event.target.value) })} /></Field>
                        <Field label="Spessore mm"><input className={inputClass} type="number" min="0" value={adminModel.thickness} onChange={(event) => updateModel(activeModelIndex, { thickness: numberValue(event.target.value) })} /></Field>
                        <Field label="Lunghezza stecca"><input className={inputClass} value={adminModel.stickLengthLabel} onChange={(event) => updateModel(activeModelIndex, { stickLengthLabel: event.target.value })} /></Field>
                        <Field label="Profilo"><input className={inputClass} value={adminModel.profile} onChange={(event) => updateModel(activeModelIndex, { profile: event.target.value })} /></Field>
                        <Field label="Kg/ml"><input className={inputClass} type="number" min="0" step="0.0001" value={adminModel.weightKgMl} onChange={(event) => updateModel(activeModelIndex, { weightKgMl: numberValue(event.target.value) })} /></Field>
                        <Field label="Costo base EUR/ml"><input className={inputClass} type="number" min="0" step="0.01" value={adminModel.supplyBaseCostPerMl} onChange={(event) => updateModel(activeModelIndex, { supplyBaseCostPerMl: numberValue(event.target.value) })} /></Field>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#11161C]">
                          <div className="flex h-40 items-center justify-center bg-white p-3">
                            {adminModel.sectionImageUrl ? (
                              <img src={adminModel.sectionImageUrl} alt={`Sezione tecnica ${adminModel.description}`} className="h-full w-full object-contain" />
                            ) : (
                              <span className="px-4 text-center text-sm text-[#68717A]">Sezione tecnica non caricata</span>
                            )}
                          </div>
                          <div className="grid gap-3 border-t border-white/10 p-3">
                            <Field label="URL sezione tecnica">
                              <input className={inputClass} value={adminModel.sectionImageUrl || ""} onChange={(event) => updateModel(activeModelIndex, { sectionImageUrl: event.target.value })} placeholder="/catalog/profili/..." />
                            </Field>
                            <label className={`${eb.outlineButton} flex h-11 cursor-pointer items-center justify-center rounded-2xl text-sm font-semibold`}>
                              <Upload className="mr-2 h-4 w-4" />
                              Carica sezione tecnica
                              <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void uploadModelImage(activeModelIndex, "section", event.target.files?.[0])} />
                            </label>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#11161C]">
                          <div className="flex h-40 items-center justify-center bg-white/[0.03]">
                            {adminModel.finishImageUrl ? (
                              <img src={adminModel.finishImageUrl} alt={`Finitura ${adminModel.finishLabel}`} className="h-full w-full object-cover" />
                            ) : (
                              <span className="px-4 text-center text-sm text-[#8F98A3]">Immagine finitura non caricata</span>
                            )}
                          </div>
                          <div className="grid gap-3 border-t border-white/10 p-3">
                            <Field label="URL immagine finitura">
                              <input className={inputClass} value={adminModel.finishImageUrl || ""} onChange={(event) => updateModel(activeModelIndex, { finishImageUrl: event.target.value })} placeholder="/catalog/finiture/..." />
                            </Field>
                            <label className={`${eb.outlineButton} flex h-11 cursor-pointer items-center justify-center rounded-2xl text-sm font-semibold`}>
                              <Upload className="mr-2 h-4 w-4" />
                              Carica immagine finitura
                              <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void uploadModelImage(activeModelIndex, "finish", event.target.files?.[0])} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}
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
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:max-w-[1752px]">
            <div className={`text-sm ${status === "error" ? "text-[#F2A3A3]" : status === "saved" ? "text-[#72E6E2]" : "text-[#B6BDC6]"}`}>
              {message || (changed ? "Hai modifiche non ancora pubblicate." : "Tutto salvato.")}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className={eb.outlineButton} disabled={!changed || status === "saving"} onClick={() => { setConfig(cloneConfig(savedConfig)); setStatus("idle"); setMessage(""); }}>
                Annulla
              </Button>
              <Button type="button" className={eb.primaryButtonYellow} disabled={!initialRecord.writable || !changed || status === "saving"} onClick={() => void save()}>
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

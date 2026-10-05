"use client";

import { cloneElement, useId, useState } from "react";
import { Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_PRICE_LISTS, newPriceList, PRICE_LIST_RATES, previewPriceList, validatePriceLists } from "@/lib/easybatt-price-lists.mjs";
import { eb } from "@/app/easybatt-ui";

const inputClass = "h-11 w-full min-w-0 rounded-lg border border-white/15 bg-[#11161C] px-3 text-sm text-white outline-none focus:border-[#10B7B3] focus:ring-2 focus:ring-[#10B7B3]/20";
const iconClass = "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 text-[#D9DDE2] hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#10B7B3] disabled:opacity-40";
const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

function Field({ label, children }) {
  const id = useId();
  return <div className="grid min-w-0 gap-2 text-sm font-semibold text-[#E7EBEF]"><label htmlFor={id}>{label}</label>{cloneElement(children, { id })}</div>;
}

export function AdminPriceLists({ config, onChange, disabled }) {
  const lists = config.priceLists;
  const [selectedId, setSelectedId] = useState(lists[0]?.id || "");
  const [modelCode, setModelCode] = useState("");
  const [error, setError] = useState("");
  const selected = lists.find((list) => list.id === selectedId) || lists[0];
  const models = config.models.filter((model) => model.active !== false);
  const model = models.find((item) => item.code === modelCode) || models[0];
  const preview = selected && !validatePriceLists([selected]).length ? previewPriceList(config, selected, model) : null;

  function update(patch) {
    onChange(lists.map((list) => list.id === selected.id ? { ...list, ...patch } : list));
    setError("");
  }

  function add(copy = false) {
    if (lists.length >= MAX_PRICE_LISTS) return;
    const root = copy ? `${selected.name} - copia`.slice(0, 90) : "Nuovo listino";
    let name = root;
    let suffix = 2;
    while (lists.some((list) => list.name.trim().toLocaleLowerCase("it") === name.toLocaleLowerCase("it"))) name = `${root} ${suffix++}`;
    const list = copy ? { ...selected, id: crypto.randomUUID(), name, status: "draft" } : newPriceList(crypto.randomUUID(), name);
    onChange([...lists, list]);
    setSelectedId(list.id);
    setError("");
  }

  function changeStatus(status) {
    if (status === "published") {
      const errors = validatePriceLists(lists.map((list) => list.id === selected.id ? { ...list, status } : list));
      if (errors.length) { setError(errors[0]); return; }
      if (!window.confirm(`Confermi le condizioni del listino "${selected.name}"? Lo stato sara' registrato al salvataggio.`)) return;
    }
    update({ status });
  }

  function remove() {
    if (!window.confirm(`Eliminare il listino "${selected.name}"? La rimozione sara' registrata al salvataggio.`)) return;
    onChange(lists.filter((list) => list.id !== selected.id));
    setSelectedId("");
    setError("");
  }

  return (
    <section id="listini" aria-labelledby="price-lists-title" className="min-w-0 scroll-mt-5 border-y border-white/15 px-4 py-6 sm:px-5">
      <fieldset disabled={disabled} className="grid min-w-0 gap-5 disabled:opacity-60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 id="price-lists-title" className="text-xl font-bold">Listini dedicati</h2>
            <p className="mt-1 text-sm text-[#B6BDC6]">Assegnazione clienti non attiva</p>
          </div>
          <Button type="button" className={eb.primaryButtonTeal} disabled={lists.length >= MAX_PRICE_LISTS} onClick={() => add()}><Plus className="mr-2 h-4 w-4" />Nuovo listino</Button>
        </div>

        {selected ? <>
          <div className="flex min-w-0 items-end gap-2">
            <div className="min-w-0 flex-1">
              <Field label="Listino">
                <select className={inputClass} value={selected.id} onChange={(event) => { setSelectedId(event.target.value); setError(""); }}>
                  {lists.map((list) => <option key={list.id} value={list.id}>{list.name || "Senza nome"} ({list.status === "published" ? "Pubblicato" : "Bozza"})</option>)}
                </select>
              </Field>
            </div>
            <button type="button" title="Duplica listino" aria-label="Duplica listino" className={iconClass} disabled={lists.length >= MAX_PRICE_LISTS} onClick={() => add(true)}><Copy className="h-4 w-4" /></button>
            <button type="button" title="Elimina listino" aria-label="Elimina listino" className={iconClass} onClick={remove}><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Field label="Nome listino"><input className={inputClass} maxLength={100} value={selected.name} onChange={(event) => update({ name: event.target.value })} /></Field>
            <Field label="Stato listino"><select className={inputClass} value={selected.status} onChange={(event) => changeStatus(event.target.value)}><option value="draft">Bozza</option><option value="published">Pubblicato</option></select></Field>
          </div>
          {error && <p role="alert" className="text-sm text-[#F2A3A3]">{error}</p>}

          <div className="grid min-w-0 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Sconto battiscopa (%)">
              <input className={inputClass} type="number" min="0" max="100" step="0.01" inputMode="decimal" placeholder="Da definire" value={selected.supplyDiscountPercent ?? ""} onChange={(event) => update({ supplyDiscountPercent: event.target.value === "" ? null : event.target.value })} />
            </Field>
            {PRICE_LIST_RATES.map(({ key, label, unit, max }) => <Field key={key} label={`${label} (${unit})`}>
              <input className={inputClass} type="number" min="0" max={max} step="0.01" inputMode="decimal" placeholder={`Pubblico: ${config[key]}`} value={selected[key] ?? ""} onChange={(event) => update({ [key]: event.target.value === "" ? null : event.target.value })} />
            </Field>)}
          </div>

          <div className="grid min-w-0 gap-4 border-t border-white/10 pt-5 xl:grid-cols-2">
            <div className="min-w-0">
              <h3 className="mb-3 text-base font-semibold">Tariffe effettive <span className="text-sm font-normal text-[#8F98A3]">IVA esclusa</span></h3>
              <dl className="divide-y divide-white/10">
                {PRICE_LIST_RATES.map(({ key, label, unit }) => <div key={key} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3 text-sm">
                  <dt className="min-w-0 text-[#C6CCD4]">{label}<span className="mt-1 block text-xs text-[#8F98A3]">{selected[key] === null || selected[key] === "" ? "Tariffa pubblica" : Number(selected[key]) === 0 ? "Gratuito" : "Tariffa dedicata"}</span></dt>
                  <dd className="text-right font-semibold tabular-nums">{preview ? euro.format(preview[key]) : "-"}<span className="block text-xs font-normal text-[#8F98A3]">{unit}</span></dd>
                </div>)}
              </dl>
              <p className="mt-3 text-xs text-[#8F98A3]">Spedizione e IVA: condizioni pubbliche</p>
            </div>
            <div className="grid min-w-0 content-start gap-3">
              <h3 className="text-base font-semibold">Anteprima fornitura <span className="text-sm font-normal text-[#8F98A3]">IVA esclusa</span></h3>
              {model ? <>
                <Field label="Prodotto di riferimento"><select className={inputClass} value={model.code} onChange={(event) => setModelCode(event.target.value)}>{models.map((item) => <option key={item.code} value={item.code}>{item.code} - {item.description}</option>)}</select></Field>
                <div className="flex min-w-0 items-center gap-3 py-2">
                  {model.sectionImageUrl && <img src={model.sectionImageUrl} alt={`Sezione ${model.description}`} className="h-20 w-24 shrink-0 rounded-lg bg-white p-2 object-contain" />}
                  <div className="min-w-0 text-sm [overflow-wrap:anywhere]">{model.description}</div>
                </div>
                <dl className="grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-sm">
                  <div><dt className="text-[#8F98A3]">Pubblico / ml</dt><dd className="mt-1 font-semibold tabular-nums">{preview ? euro.format(preview.publicSupplyPrice) : "-"}</dd></div>
                  <div><dt className="text-[#8F98A3]">Dedicato / ml</dt><dd className="mt-1 font-semibold tabular-nums text-[#F4CC18]">{preview && selected.supplyDiscountPercent !== null && selected.supplyDiscountPercent !== "" ? euro.format(preview.supplyPrice) : "Da definire"}</dd></div>
                </dl>
              </> : <p className="text-sm text-[#8F98A3]">Nessun prodotto attivo</p>}
            </div>
          </div>
        </> : <p className="py-4 text-sm text-[#B6BDC6]">Nessun listino dedicato.</p>}
      </fieldset>
    </section>
  );
}

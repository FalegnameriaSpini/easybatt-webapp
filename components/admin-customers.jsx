"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Save } from "lucide-react";
import { CUSTOMER_STATES } from "@/lib/easybatt-customers.mjs";

const input = "h-11 min-w-0 rounded-lg border border-white/15 bg-[#11161C] px-3 text-sm text-white";
const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 text-sm disabled:opacity-40";

export function AdminCustomers({ password }) {
  const [data, setData] = useState(null);
  const [enabled, setEnabled] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setBusy(true); setError("");
      try {
        const settingsResponse = await fetch("/api/account/settings", { cache: "no-store", signal: controller.signal });
        if (!settingsResponse.ok) throw new Error("Configurazione utenti non disponibile.");
        const settings = await settingsResponse.json();
        setEnabled(settings.enabled);
        if (!settings.enabled) return;
        const response = await fetch(`/api/admin/customers?page=${page}&status=${status}`, { headers: { "x-admin-password": password }, cache: "no-store", signal: controller.signal });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Elenco non disponibile.");
        setData(result);
      } catch (err) { if (!controller.signal.aborted) setError(err.message); }
      finally { if (!controller.signal.aborted) setBusy(false); }
    }
    load();
    return () => controller.abort();
  }, [password, status, page, refresh]);

  async function save(customer, decision) {
    if (!window.confirm(`Salvare stato e listino per ${customer.company_name || customer.full_name}? La modifica sara' applicata subito.`)) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/customers", {
        method: "PATCH", headers: { "x-admin-password": password, "Content-Type": "application/json" },
        body: JSON.stringify({ id: customer.id, revision: customer.revision, ...decision }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Salvataggio non riuscito.");
      setMessage("Cliente aggiornato."); setSelectedId(""); setRefresh((n) => n + 1);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  const selected = data?.customers.find((customer) => customer.id === selectedId);

  return <section id="clienti" aria-labelledby="customers-title" className="min-w-0 scroll-mt-5 border-y border-white/15 px-4 py-6 sm:px-5">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 id="customers-title" className="text-xl font-bold">Clienti</h2><button type="button" title="Aggiorna clienti e listini salvati" aria-label="Aggiorna clienti" className={button} disabled={busy} onClick={() => setRefresh((n) => n + 1)}><RefreshCw size={16} /></button></div>
    {error && <p role="alert" className="mb-4 text-sm text-[#F2A3A3]">{error}</p>}
    {message && <p role="status" className="mb-4 text-sm text-[#72E6E2]">{message}</p>}
    {enabled === false ? <p className="text-sm text-[#B6BDC6]">Gestione clienti non ancora attiva in questo ambiente.</p> : <>
      <label className="mb-4 grid max-w-sm gap-2 text-sm"><span>Stato clienti</span><select aria-label="Stato clienti" className={input} value={status} disabled={busy} onChange={(e) => { setStatus(e.target.value); setPage(0); setSelectedId(""); }}><option value="">Tutti</option>{Object.entries(CUSTOMER_STATES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      {busy && <p role="status" className="mb-3 text-sm text-[#B6BDC6]">Caricamento...</p>}
      {data && <>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-white/20 text-[#8F98A3]"><tr>{["Cliente", "Azienda / P. IVA", "Stato", "Email", "Marketing", ""].map((label, i) => <th className="px-2 py-3 font-medium" key={i} scope="col">{label}</th>)}</tr></thead>
            <tbody>{data.customers.map((customer) => <tr key={customer.id} className="border-b border-white/10 align-top"><td className="max-w-60 break-words px-2 py-3"><strong>{customer.full_name}</strong><span className="mt-1 block break-all text-xs text-[#B6BDC6]">{customer.email}</span></td><td className="max-w-52 break-words px-2 py-3">{customer.company_name || "-"}<span className="mt-1 block text-xs text-[#B6BDC6]">{customer.vat_number}</span></td><td className="px-2 py-3">{CUSTOMER_STATES[customer.status]}</td><td className="px-2 py-3">{customer.email_confirmed_at ? "Confermata" : "Da confermare"}</td><td className="px-2 py-3">{customer.marketing_consent ? "Consenso" : "No"}</td><td className="px-2 py-3"><button type="button" className={button} disabled={busy} onClick={() => setSelectedId(customer.id)}>Gestisci</button></td></tr>)}</tbody>
          </table>
        </div>
        {!data.customers.length && <p className="py-5 text-sm text-[#B6BDC6]">Nessun cliente in questo elenco.</p>}
        <div className="my-4 flex flex-wrap items-center justify-between gap-3 text-sm"><span>{data.count} clienti · Pagina {page + 1}</span><div className="flex gap-2"><button type="button" title="Pagina precedente" aria-label="Pagina precedente" className={button} disabled={busy || page === 0} onClick={() => { setPage((n) => n - 1); setSelectedId(""); }}><ChevronLeft size={18} /></button><button type="button" title="Pagina successiva" aria-label="Pagina successiva" className={button} disabled={busy || (page + 1) * 25 >= data.count} onClick={() => { setPage((n) => n + 1); setSelectedId(""); }}><ChevronRight size={18} /></button></div></div>
        {selected && <CustomerReview key={`${selected.id}-${selected.revision}`} customer={selected} priceLists={data.priceLists} busy={busy} onSave={save} />}
      </>}
    </>}
  </section>;
}

function CustomerReview({ customer, priceLists, busy, onSave }) {
  const [status, setStatus] = useState(customer.status);
  const [listId, setListId] = useState(customer.price_list_id || "");
  return <div className="grid min-w-0 gap-4 border-t border-white/20 pt-5">
    <h3 className="break-words text-lg font-semibold">{customer.company_name || customer.full_name}</h3>
    {customer.account_type === "private" ? <p className="text-sm text-[#B6BDC6]">Account privato: listino pubblico.</p> : <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid min-w-0 gap-2 text-sm"><span>Approvazione</span><select aria-label="Approvazione" className={input} value={status} disabled={busy} onChange={(e) => setStatus(e.target.value)}>{["pending", "approved", "rejected"].map((state) => <option key={state} value={state}>{CUSTOMER_STATES[state]}</option>)}</select></label>
        <label className="grid min-w-0 gap-2 text-sm"><span>Listino assegnato</span><select aria-label="Listino assegnato" className={input} value={status === "approved" ? listId : ""} disabled={busy || status !== "approved"} onChange={(e) => setListId(e.target.value)}><option value="">Listino pubblico</option>{listId && !priceLists.some((list) => list.id === listId) && <option value={listId} disabled>Listino non piu pubblicato</option>}{priceLists.map((list) => <option key={list.id} value={list.id}>{list.name}</option>)}</select></label>
      </div>
      {!customer.email_confirmed_at && <p className="text-sm text-[#F4CC18]">Approvazione disponibile dopo la conferma dell&apos;email.</p>}
      <button type="button" disabled={busy || (status === "approved" && !customer.email_confirmed_at)} className={`${button} w-fit bg-[#10B7B3] font-semibold text-[#11161C]`} onClick={() => onSave(customer, { status, price_list_id: status === "approved" ? listId || null : null })}><Save size={16} />Salva cliente</button>
    </>}
  </div>;
}

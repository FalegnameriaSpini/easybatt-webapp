"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Save,
  Mail,
  Phone,
  X,
  Trash2,
} from "lucide-react";
import {
  PROJECT_STATES,
  PROJECT_PROFESSIONS,
  PROJECT_INTERVENTIONS,
  PROJECT_METRES,
  PROJECT_TIMING,
} from "@/lib/easybatt-projects.mjs";
import {
  projectCanExpire,
  romeDate,
} from "@/lib/easybatt-project-retention.mjs";

const input =
  "min-h-11 min-w-0 rounded border border-white/20 bg-[#22282a] px-3 py-2 text-sm text-white";
const button =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded border border-white/20 px-3 text-sm disabled:opacity-40";
const date = (value) =>
  new Date(value).toLocaleString("it-IT", {
    dateStyle: "short",
    timeStyle: "short",
  });

export function AdminProjects({ password }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [retention, setRetention] = useState("");
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const detail = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setBusy(true);
      setError("");
      setData(null);
      try {
        const response = await fetch(
          `/api/admin/project-requests?page=${page}&status=${status}&retention=${retention}`,
          {
            headers: { "x-admin-password": password },
            cache: "no-store",
            signal: controller.signal,
          },
        );
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Elenco non disponibile.");
        setData(result);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setBusy(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [password, page, status, retention, refresh]);
  useEffect(() => {
    if (selectedId) detail.current?.focus();
  }, [selectedId]);
  const selected = data?.requests.find((item) => item.id === selectedId);
  async function save(current, changes) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/project-requests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          id: current.id,
          revision: current.revision,
          ...changes,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Salvataggio non riuscito.");
      setMessage("Richiesta aggiornata.");
      setSelectedId("");
      setRefresh((n) => n + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function remove(current) {
    if (
      !window.confirm(
        `Eliminare definitivamente la richiesta di ${current.full_name}? Saranno eliminati recapiti, note e la coda interna Brevo. Questa azione non elimina eventuali email, copie esterne o backup.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/project-requests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          id: current.id,
          revision: current.revision,
          confirmed: true,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.deleted)
        throw new Error(result.error || "Cancellazione non confermata.");
      setMessage("Richiesta eliminata dall'archivio e dalla coda interna.");
      setSelectedId("");
      setPage(0);
      setRefresh((n) => n + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      id="richieste"
      className="min-w-0 border-t border-white/20 px-5 py-6"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Richieste Prova EasyBatt</h2>
        <button
          type="button"
          title="Aggiorna richieste"
          aria-label="Aggiorna richieste"
          className={button}
          disabled={busy}
          onClick={() => {
            setSelectedId("");
            setMessage("");
            setRefresh((n) => n + 1);
          }}
        >
          <RefreshCw size={18} />
        </button>
      </div>
      {error && (
        <p role="alert" className="mb-4 text-sm text-[#ffb4b4]">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="mb-4 text-sm text-[#83cdc6]">
          {message}
        </p>
      )}
      {busy && (
        <p role="status" className="mb-4 text-sm">
          Caricamento...
        </p>
      )}
      {data?.available === false && (
        <p className="text-sm text-[#bbc2c6]">
          Archivio richieste non collegato in questo ambiente.
        </p>
      )}
      {data?.available && (
        <>
          {!data.accepting && (
            <p className="mb-4 text-sm text-[#fcc719]">
              Ricezione pubblica disattivata. Le richieste esistenti restano
              consultabili.
            </p>
          )}
          <label className="mb-4 grid max-w-sm gap-2 text-sm">
            Stato richieste
            <select
              aria-label="Stato richieste"
              className={input}
              value={status}
              disabled={busy}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(0);
                setSelectedId("");
              }}
            >
              <option value="">Tutti</option>
              {Object.entries(PROJECT_STATES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-4 grid max-w-sm gap-2 text-sm">
            Conservazione richieste
            <select
              className={input}
              value={retention}
              disabled={busy}
              onChange={(event) => {
                setRetention(event.target.value);
                setPage(0);
                setSelectedId("");
              }}
            >
              <option value="">Tutte</option>
              <option value="due">12 mesi trascorsi</option>
              <option value="unverified">Ultimo contatto da verificare</option>
            </select>
          </label>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  {[
                    "Ricevuta",
                    "Contatto",
                    "Cantiere",
                    "Tempi / metri",
                    "Stato",
                    "Conservazione",
                    "",
                  ].map((label, i) => (
                    <th key={i} scope="col" className="px-2 py-3 font-medium">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.requests.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/10 align-top"
                  >
                    <td className="px-2 py-3">{date(item.created_at)}</td>
                    <td className="max-w-56 break-words px-2 py-3">
                      <strong>{item.full_name}</strong>
                      <span className="block text-[#bbc2c6]">
                        {item.company || PROJECT_PROFESSIONS[item.profession]}
                      </span>
                    </td>
                    <td className="max-w-40 break-words px-2 py-3">
                      {item.town} ({item.province})
                    </td>
                    <td className="px-2 py-3">
                      {PROJECT_TIMING[item.timing]}
                      <span className="block text-[#bbc2c6]">
                        {PROJECT_METRES[item.metres]}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      {PROJECT_STATES[item.status]}
                      {item.follow_up_on && (
                        <span className="block text-[#bbc2c6]">
                          Ricontatto:{" "}
                          {item.follow_up_on.split("-").reverse().join("/")}
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-3">
                      {item.status === "customer" ? (
                        "Rapporto cliente"
                      ) : !item.last_contact_on ? (
                        "Ultimo contatto da verificare"
                      ) : (
                        <>
                          <span
                            className={
                              projectCanExpire(item, data.today)
                                ? "text-[#fcc719]"
                                : "text-[#bbc2c6]"
                            }
                          >
                            {projectCanExpire(item, data.today)
                              ? "Da eliminare dopo verifica"
                              : "Termine 12 mesi"}
                          </span>
                          <span className="block">
                            {item.retention_due_on
                              ?.split("-")
                              .reverse()
                              .join("/")}
                          </span>
                        </>
                      )}
                    </td>
                    <td className="px-2 py-3">
                      <button
                        className={button}
                        disabled={busy}
                        onClick={() => setSelectedId(item.id)}
                      >
                        Apri
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!data.requests.length && (
            <p className="py-5 text-sm text-[#bbc2c6]">
              Nessuna richiesta in questo elenco.
            </p>
          )}
          <div className="my-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span>
              {data.count} richieste · Pagina {page + 1}
            </span>
            <div className="flex gap-2">
              <button
                className={button}
                title="Pagina precedente richieste"
                aria-label="Pagina precedente richieste"
                disabled={busy || page === 0}
                onClick={() => {
                  setPage((n) => n - 1);
                  setSelectedId("");
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className={button}
                title="Pagina successiva richieste"
                aria-label="Pagina successiva richieste"
                disabled={busy || (page + 1) * 20 >= data.count}
                onClick={() => {
                  setPage((n) => n + 1);
                  setSelectedId("");
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          {selected && (
            <div ref={detail} tabIndex={-1}>
              <ProjectReview
                key={`${selected.id}-${selected.revision}`}
                project={selected}
                busy={busy}
                onSave={save}
                onRemove={remove}
                today={data.today || romeDate()}
                onClose={() => setSelectedId("")}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}

function ProjectReview({ project, busy, onSave, onClose, onRemove, today }) {
  const [status, setStatus] = useState(project.status);
  const [notes, setNotes] = useState(project.staff_notes);
  const [followUp, setFollowUp] = useState(project.follow_up_on || "");
  const [lastContact, setLastContact] = useState(project.last_contact_on || "");
  const [confirmed, setConfirmed] = useState(false);
  const dirty =
    status !== project.status ||
    notes !== project.staff_notes ||
    followUp !== (project.follow_up_on || "") ||
    lastContact !== (project.last_contact_on || "");
  return (
    <div className="grid min-w-0 gap-5 border-t border-white/20 pt-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold">
            {project.full_name}
          </h3>
          <p className="break-words text-sm text-[#bbc2c6]">
            {PROJECT_PROFESSIONS[project.profession]}{" "}
            {project.company && `- ${project.company}`}
          </p>
        </div>
        <button
          className={button}
          title="Chiudi dettaglio"
          aria-label="Chiudi dettaglio"
          disabled={busy}
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <a
          className="inline-flex min-w-0 items-center gap-2"
          href={`mailto:${project.email}`}
        >
          <Mail className="shrink-0" size={18} />
          <span className="break-all">{project.email}</span>
        </a>
        <a
          className="inline-flex items-center gap-2"
          href={`tel:${project.phone.replace(/[^+\d]/g, "")}`}
        >
          <Phone size={18} />
          {project.phone}
        </a>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        {[
          ["Cantiere", `${project.town} (${project.province})`],
          ["Intervento", PROJECT_INTERVENTIONS[project.intervention]],
          ["Metri", PROJECT_METRES[project.metres]],
          ["Posa prevista", PROJECT_TIMING[project.timing]],
          ["Ricevuta", date(project.created_at)],
          [
            "Preferenza marketing dichiarata (email non verificata)",
            project.marketing_consent
              ? "Sì - non iscrivere automaticamente a campagne"
              : "No",
          ],
          [
            "Informativa",
            `${project.privacy_version} - ${date(project.privacy_acknowledged_at)}`,
          ],
          [
            "Provenienza dichiarata",
            Object.entries(project.source || {})
              .map(([key, value]) => `${key}: ${value}`)
              .join("; "),
          ],
        ].map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-[#bbc2c6]">{label}</dt>
            <dd className="break-words">{value}</dd>
          </div>
        ))}
      </dl>
      {project.notes && (
        <div>
          <h4 className="text-sm font-semibold">Note del progetto</h4>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm">
            {project.notes}
          </p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Stato progetto
          <select
            className={input}
            value={status}
            disabled={busy}
            onChange={(event) => setStatus(event.target.value)}
          >
            {Object.entries(PROJECT_STATES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Data ricontatto
          <input
            type="date"
            className={input}
            value={followUp}
            disabled={busy}
            onChange={(event) => setFollowUp(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm">
          Ultimo contatto effettivo
          <input
            type="date"
            className={input}
            value={lastContact}
            min={romeDate(new Date(project.created_at))}
            max={today}
            disabled={busy}
            onChange={(event) => setLastContact(event.target.value)}
          />
        </label>
      </div>
      {project.status !== "customer" && (
        <p className="text-sm text-[#bbc2c6]">
          {project.retention_due_on
            ? `Termine di conservazione: ${project.retention_due_on.split("-").reverse().join("/")}.`
            : "Data dell'ultimo contatto da verificare: termine non ancora determinato."}
        </p>
      )}
      <label className="grid gap-2 text-sm">
        Note interne
        <textarea
          className={input}
          rows={4}
          maxLength={4000}
          value={notes}
          disabled={busy}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>
      <button
        className={`${button} w-fit bg-[#fcc719] font-semibold text-[#17191d]`}
        disabled={busy}
        onClick={() =>
          onSave(project, {
            status,
            staff_notes: notes,
            follow_up_on: followUp || null,
            ...(lastContact !== (project.last_contact_on || "")
              ? { last_contact_on: lastContact }
              : {}),
          })
        }
      >
        <Save size={16} />
        Salva richiesta
      </button>
      {projectCanExpire(project, today) && (
        <div className="grid gap-4 border-t border-white/20 pt-5">
          <h4 className="font-semibold text-[#fcc719]">
            Richiesta oltre il termine di conservazione
          </h4>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-5 shrink-0 accent-[#3a958e]"
              checked={confirmed}
              disabled={busy || dirty}
              onChange={(event) => setConfirmed(event.target.checked)}
            />
            <span>
              Confermo che la richiesta non è diventata un lavoro e che la data
              dell&apos;ultimo contatto è corretta.
            </span>
          </label>
          <p className="text-sm text-[#bbc2c6]">
            La cancellazione riguarda l&apos;archivio richieste e la coda
            interna. Eventuali email, copie esterne e backup richiedono una
            gestione separata.
          </p>
          {dirty && (
            <p className="text-sm text-[#fcc719]">
              Sono presenti modifiche non salvate.
            </p>
          )}
          <button
            type="button"
            className={`${button} w-fit border-[#ffb4b4]/50 text-[#ffb4b4]`}
            disabled={busy || dirty || !confirmed}
            onClick={() => onRemove(project)}
          >
            <Trash2 size={18} />
            Elimina richiesta scaduta
          </button>
        </div>
      )}
    </div>
  );
}

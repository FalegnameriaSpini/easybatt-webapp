"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import {
  projectData,
  projectSource,
  PROJECT_PROFESSIONS,
  PROJECT_INTERVENTIONS,
  PROJECT_METRES,
  PROJECT_TIMING,
} from "@/lib/easybatt-projects.mjs";
import { projectEmailHref } from "@/lib/easybatt-marketing.mjs";
import styles from "./project-form.module.css";
import marketing from "./marketing.module.css";

export function ProjectForm() {
  const [settings, setSettings] = useState(null);
  const [fields, setFields] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const attempt = useRef(null);
  const inFlight = useRef(false);
  const form = useRef(null);
  const errorBox = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/project-requests/settings", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(setSettings)
      .catch((err) => {
        if (err.name !== "AbortError") setSettings({ enabled: false });
      });
    return () => controller.abort();
  }, []);

  function showErrors(message, errors = {}) {
    setFields(errors);
    setError(message);
    requestAnimationFrame(() => {
      const first = Object.keys(errors)[0];
      if (first) form.current?.elements.namedItem(first)?.focus();
      else errorBox.current?.focus();
    });
  }
  async function submit(event) {
    event.preventDefault();
    if (!settings?.enabled || inFlight.current) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    values.privacy_acknowledged = values.privacy_acknowledged === "on";
    try {
      projectData(values);
    } catch (err) {
      showErrors(err.message, err.fields);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const source = projectSource({
      page: params.get("from") || "/prova-easybatt",
      ...Object.fromEntries(
        ["utm_source", "utm_medium", "utm_campaign"].map((key) => [
          key,
          params.get(key),
        ]),
      ),
    });
    const payload = {
      ...values,
      source,
      privacy_version: settings.privacyVersion,
    };
    const serialized = JSON.stringify(payload);
    if (attempt.current?.serialized !== serialized)
      attempt.current = { serialized, id: crypto.randomUUID() };
    inFlight.current = true;
    setBusy(true);
    setFields({});
    setError("");
    try {
      const response = await fetch("/api/project-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: attempt.current.id }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || !data.received) {
        showErrors(data.error || "Invio non riuscito. Riprova.", data.fields);
        return;
      }
      window.location.assign("/grazie-prova-easybatt");
    } catch {
      showErrors(
        "Non siamo riusciti a confermare la ricezione. I dati sono ancora qui: riprova oppure scrivici a info@easy-batt.it.",
      );
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }
  const fieldProps = (name) => ({
    name,
    id: `project-${name}`,
    "aria-invalid": Boolean(fields[name]),
    "aria-describedby": fields[name] ? `error-${name}` : undefined,
  });
  const field = (name, label, input) => (
    <div className={styles.field} key={name}>
      <label htmlFor={`project-${name}`}>{label}</label>
      {input}
      {fields[name] && (
        <span className={styles.fieldError} id={`error-${name}`}>
          {fields[name]}
        </span>
      )}
    </div>
  );
  const select = (name, label, options, initial = "") =>
    field(
      name,
      label,
      <select {...fieldProps(name)} defaultValue={initial}>
        <option value="" disabled>
          Seleziona
        </option>
        {Object.entries(options).map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>,
    );

  if (!settings) return <p role="status">Caricamento...</p>;
  if (!settings.enabled && !settings.preview)
    return (
      <div className={styles.unavailable}>
        <h3>Parliamone via email.</h3>
        <p>
          Scrivici dove si trova il cantiere e che lavoro hai in programma. Non
          servono ancora misure esatte.
        </p>
        <a href={projectEmailHref} className={marketing.primaryButton}>
          Raccontaci il progetto <Mail size={18} aria-hidden="true" />
        </a>
        <a href="mailto:info@easy-batt.it" className={marketing.textLink}>
          info@easy-batt.it
        </a>
      </div>
    );
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className={styles.form}
      aria-busy={busy}
    >
      {settings.preview && (
        <p className={styles.notice}>
          Anteprima locale: invio disattivato. Nessun dato viene salvato.
        </p>
      )}
      {error && (
        <p ref={errorBox} tabIndex={-1} role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <fieldset disabled={busy}>
        <legend>I tuoi recapiti</legend>
        <div className={styles.grid}>
          {field(
            "full_name",
            "Nome e cognome *",
            <input
              {...fieldProps("full_name")}
              autoComplete="name"
              maxLength={120}
              required
            />,
          )}
          {field(
            "company",
            "Azienda",
            <input
              {...fieldProps("company")}
              autoComplete="organization"
              maxLength={160}
            />,
          )}
          {field(
            "email",
            "Email *",
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />,
          )}
          {field(
            "phone",
            "Telefono *",
            <input
              {...fieldProps("phone")}
              type="tel"
              autoComplete="tel"
              maxLength={32}
              required
            />,
          )}
          {select("profession", "Professione *", PROJECT_PROFESSIONS)}
        </div>
      </fieldset>
      <fieldset disabled={busy}>
        <legend>Il lavoro in programma</legend>
        <div className={styles.grid}>
          {field(
            "town",
            "Comune del cantiere *",
            <input {...fieldProps("town")} maxLength={100} required />,
          )}
          {field(
            "province",
            "Provincia (sigla) *",
            <input
              {...fieldProps("province")}
              autoCapitalize="characters"
              maxLength={2}
              placeholder="BS"
              required
            />,
          )}
          {select(
            "intervention",
            "Tipo di intervento *",
            PROJECT_INTERVENTIONS,
          )}
          {select("metres", "Metri indicativi", PROJECT_METRES, "unknown")}
          {select(
            "timing",
            "Quando è prevista la posa?",
            PROJECT_TIMING,
            "unknown",
          )}
        </div>
        {field(
          "notes",
          "Qualcosa in più sul progetto",
          <textarea {...fieldProps("notes")} rows={4} maxLength={3000} />,
        )}
      </fieldset>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="project-website">Sito web</label>
        <input
          id="project-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className={styles.consents}>
        <label className={styles.checkbox}>
          <input
            {...fieldProps("privacy_acknowledged")}
            type="checkbox"
            required
            disabled={busy || !settings.enabled}
          />
          <span>
            Ho letto{" "}
            {settings.privacyUrl ? (
              <a
                href={settings.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                l&apos;informativa privacy
              </a>
            ) : (
              "l'informativa privacy (in preparazione)"
            )}
            . *
          </span>
        </label>
        {fields.privacy_acknowledged && (
          <p className={styles.fieldError} id="error-privacy_acknowledged">
            {fields.privacy_acknowledged}
          </p>
        )}
      </div>
      <div className={styles.submitRow}>
        <button
          className={marketing.primaryButton}
          disabled={busy || !settings.enabled}
          type="submit"
        >
          {busy ? (
            <LoaderCircle
              className={styles.spinner}
              size={18}
              aria-hidden="true"
            />
          ) : (
            <ArrowRight size={18} aria-hidden="true" />
          )}
          {busy ? "Invio in corso..." : "Valuta il mio progetto"}
        </button>
        <p>
          Compilare il modulo non ti impegna ad acquistare EasyBatt. Serve a
          capire se il servizio è adatto al tuo lavoro.
        </p>
      </div>
    </form>
  );
}

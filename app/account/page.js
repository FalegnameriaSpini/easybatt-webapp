"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, LogIn, LogOut, Mail, Save, UserPlus } from "lucide-react";
import { getCustomerAuth, customerRequest } from "@/lib/easybatt-auth-client";
import { registrationData, CUSTOMER_STATES } from "@/lib/easybatt-customers.mjs";

const input = "h-11 w-full min-w-0 rounded-lg border border-white/20 bg-[#11161C] px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#10B7B3]";
const primary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#F4CC18] px-4 py-2 font-semibold text-[#11161C] disabled:opacity-50";
const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm disabled:opacity-50";
const initialDetails = { full_name: "", account_type: "private", company_name: "", vat_number: "", privacy_acknowledged: false, marketing_consent: false };

export default function AccountPage() {
  const [auth, setAuth] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [mode, setMode] = useState("login");
  const [details, setDetails] = useState(initialDetails);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    let subscription;
    if (new URLSearchParams(window.location.search).get("flow") === "recovery") setMode("recovery");
    getCustomerAuth().then((value) => {
      if (!active) return;
      setAuth(value);
      if (!value.client) return;
      subscription = value.client.auth.onAuthStateChange((event, nextSession) => {
        if (!active) return;
        setSession(nextSession);
        if (event === "PASSWORD_RECOVERY") setMode("recovery");
        if (event === "SIGNED_OUT") setProfile(null);
      }).data.subscription;
    }).catch(() => { if (active) setError("Accesso clienti non disponibile. Ricarica la pagina."); });
    return () => { active = false; subscription?.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!session || !auth?.client) return;
    let active = true;
    customerRequest(auth.client, "/api/account").then((data) => {
      if (!active) return;
      setProfile(data);
      setMarketing(data.customer.marketing_consent);
    }).catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [session, auth, reload]);

  function chooseMode(value) { setMode(value); setError(""); setMessage(""); setPassword(""); setConfirmation(""); }
  function detail(key, value) { setDetails((current) => ({ ...current, [key]: value })); }
  const redirectTo = () => `${window.location.origin}/account`;

  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    try {
      const client = auth.client;
      if (mode === "register") {
        if (password !== confirmation) throw new Error("Le password non coincidono.");
        const metadata = registrationData(details);
        const result = await client.auth.signUp({ email: email.trim(), password, options: { data: metadata, emailRedirectTo: redirectTo() } });
        if (result.error) throw new Error("Registrazione non completata. Verifica i dati o riprova tra poco.");
        if (result.data.session) await client.auth.signOut();
        setPassword(""); setConfirmation(""); setMode("login");
        setMessage("Controlla la tua email per confermare la registrazione. Se hai gia un account, accedi o recupera la password.");
      } else if (mode === "reset") {
        const result = await client.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${redirectTo()}?flow=recovery` });
        if (result.error) throw new Error("Invio non riuscito. Attendi qualche minuto e riprova.");
        setMessage("Se l'indirizzo e associato a un account, riceverai un link per impostare una nuova password.");
      } else if (mode === "recovery") {
        if (!session) throw new Error("Apri il link ricevuto via email per cambiare la password.");
        if (password !== confirmation) throw new Error("Le password non coincidono.");
        const result = await client.auth.updateUser({ password });
        if (result.error) throw new Error("Password non aggiornata. Richiedi un nuovo link e usa una password di almeno 12 caratteri.");
        setPassword(""); setConfirmation(""); setMode("login");
        window.history.replaceState(null, "", "/account");
        setMessage("Password aggiornata.");
      } else {
        const result = await client.auth.signInWithPassword({ email: email.trim(), password });
        if (result.error) throw new Error("Accesso non riuscito. Verifica email, password e conferma dell'indirizzo.");
        setPassword("");
      }
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function logout() {
    setBusy(true); setError("");
    try {
      const { error } = await auth.client.auth.signOut();
      if (error) throw error;
      setSession(null); setProfile(null); setMode("login"); setMessage("");
    } catch { setError("Uscita non riuscita. Riprova."); }
    finally { setBusy(false); }
  }

  async function resend() {
    if (!email.trim()) { setError("Inserisci l'email a cui inviare la conferma."); return; }
    setBusy(true); setError(""); setMessage("");
    try {
      const { error } = await auth.client.auth.resend({ type: "signup", email: email.trim(), options: { emailRedirectTo: redirectTo() } });
      if (error) throw error;
      setMessage("Se la registrazione e in attesa, riceverai una nuova email di conferma.");
    } catch { setError("Invio non riuscito. Attendi qualche minuto e riprova."); }
    finally { setBusy(false); }
  }

  async function savePreference(event) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const data = await customerRequest(auth.client, "/api/account", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marketing_consent: marketing, consent_version: auth.settings.consentVersion, revision: profile.customer.revision }),
      });
      setProfile((current) => ({ ...current, customer: data.customer }));
      setMessage("Preferenza email salvata.");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  const recovery = mode === "recovery" && session;
  return <main className="min-h-screen bg-[#17191D] px-4 py-6 text-white sm:py-10">
    <div className="mx-auto w-full max-w-xl">
      <header className="mb-8 grid gap-5">
        <Link href="/" className="w-fit"><img src="/Logo_easybatt_trasp.png" alt="EasyBatt" className="h-auto w-64 max-w-full" /></Link>
        <Link href="/quanto-mi-costa" className="inline-flex w-fit items-center gap-2 text-sm text-[#72E6E2]"><ArrowLeft size={16} />Calcola il prezzo</Link>
        <h1 className="text-2xl font-bold">Il tuo account EasyBatt</h1>
      </header>
      {error && <p role="alert" className="mb-5 text-sm text-[#F2A3A3]">{error}</p>}
      {message && <p role="status" className="mb-5 text-sm text-[#A7F3F0]">{message}</p>}
      {!auth ? <p role="status">Caricamento...</p> : !auth.settings.enabled ? <p className="text-[#B6BDC6]">Registrazione clienti non ancora attiva.</p> : <>
        {session && !recovery ? <div className="grid min-w-0 gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="min-w-0 break-all text-[#B6BDC6]">{session.user.email}</p><button onClick={logout} disabled={busy} className={secondary}><LogOut size={16} />Esci</button></div>
          {profile ? <>
            <section className="grid gap-3 border-y border-white/15 py-5">
              <h2 className="text-xl font-semibold break-words">{profile.customer.full_name}</h2>
              <p className="text-[#72E6E2]">{CUSTOMER_STATES[profile.customer.status]}</p>
              {profile.customer.company_name && <p className="break-words text-sm">{profile.customer.company_name}<span className="mt-1 block text-[#B6BDC6]">P. IVA {profile.customer.vat_number}</span></p>}
              <p className="text-sm">Condizioni applicate: <strong>{profile.pricing.name}</strong></p>
              <Link href="/quanto-mi-costa" className={`${primary} w-fit`}>Calcola il prezzo</Link>
            </section>
            <form onSubmit={savePreference} className="grid gap-4">
              <h2 className="text-lg font-semibold">Preferenze email</h2>
              <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#10B7B3]" checked={marketing} disabled={busy} onChange={(e) => setMarketing(e.target.checked)} />{auth.settings.marketingText}</label>
              <a href={auth.settings.privacyUrl} target="_blank" rel="noopener noreferrer" className="w-fit text-sm text-[#72E6E2] underline">Informativa privacy</a>
              <button className={`${secondary} w-fit`} disabled={busy || marketing === profile.customer.marketing_consent}><Save size={16} />Salva preferenza</button>
            </form>
          </> : <p role="status">{error ? "Impossibile caricare il profilo." : "Caricamento profilo..."}</p>}
          <button className={`${secondary} w-fit`} disabled={busy} onClick={() => { setError(""); setReload((n) => n + 1); }}>Aggiorna profilo</button>
        </div> : <>
          {!recovery && <div role="tablist" aria-label="Accesso account" className="mb-6 grid grid-cols-2 border-b border-white/20">
            {[["login", "Accedi"], ["register", "Registrati"]].map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={mode === value} disabled={busy} onClick={() => chooseMode(value)} className={`min-h-12 border-b-2 text-sm font-semibold ${mode === value ? "border-[#10B7B3] text-[#72E6E2]" : "border-transparent text-[#B6BDC6]"}`}>{label}</button>)}
          </div>}
          <form onSubmit={submit} className="grid gap-5">
            <fieldset disabled={busy} className="grid min-w-0 gap-5">
              {mode === "register" && <>
                <label className="grid gap-2 text-sm">Nome e cognome<input className={input} autoComplete="name" required maxLength={120} value={details.full_name} onChange={(e) => detail("full_name", e.target.value)} /></label>
                <fieldset><legend className="mb-2 text-sm">Tipo di account</legend><div className="grid grid-cols-2 gap-3">{[["private", "Privato"], ["professional", "Professionista"]].map(([value, label]) => <label key={value} className="flex min-h-11 items-center gap-2 text-sm"><input type="radio" name="account-type" value={value} checked={details.account_type === value} onChange={() => detail("account_type", value)} className="h-4 w-4 accent-[#10B7B3]" />{label}</label>)}</div></fieldset>
                {details.account_type === "professional" && <>
                  <label className="grid gap-2 text-sm">Ragione sociale<input className={input} required autoComplete="organization" maxLength={160} value={details.company_name} onChange={(e) => detail("company_name", e.target.value)} /></label>
                  <label className="grid gap-2 text-sm">Partita IVA italiana<input className={input} required maxLength={13} placeholder="11 cifre" value={details.vat_number} onChange={(e) => detail("vat_number", e.target.value)} /></label>
                  <p className="text-sm text-[#B6BDC6]">Condizioni professionali soggette ad approvazione EasyBatt.</p>
                </>}
              </>}
              {!recovery && <label className="grid gap-2 text-sm">Email<input className={input} type="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} /></label>}
              {mode !== "reset" && !(mode === "recovery" && !session) && <label className="grid gap-2 text-sm">{recovery ? "Nuova password" : "Password"}<input className={input} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={mode === "login" ? 1 : 12} maxLength={128} value={password} onChange={(e) => setPassword(e.target.value)} />{mode !== "login" && <span className="text-xs text-[#B6BDC6]">Almeno 12 caratteri</span>}</label>}
              {(mode === "register" || recovery) && <label className="grid gap-2 text-sm">Conferma password<input className={input} type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} /></label>}
              {mode === "register" && <div className="grid gap-4 border-t border-white/15 pt-5">
                <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#10B7B3]" required checked={details.privacy_acknowledged} onChange={(e) => detail("privacy_acknowledged", e.target.checked)} /><span>Ho letto l&apos;<a href={auth.settings.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-[#72E6E2] underline">informativa privacy</a>.</span></label>
                <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#10B7B3]" checked={details.marketing_consent} onChange={(e) => detail("marketing_consent", e.target.checked)} /><span>{auth.settings.marketingText} <span className="text-[#B6BDC6]">(Facoltativo)</span></span></label>
              </div>}
              {mode === "recovery" && !session ? <p className="text-sm text-[#B6BDC6]">Apri il link ricevuto via email. Se e scaduto, richiedine uno nuovo.</p> : <button className={primary} disabled={busy}>{mode === "register" ? <UserPlus size={18} /> : mode === "reset" ? <Mail size={18} /> : <LogIn size={18} />}{busy ? "Attendi..." : mode === "register" ? "Crea account" : mode === "reset" ? "Invia link di recupero" : recovery ? "Aggiorna password" : "Accedi"}</button>}
            </fieldset>
          </form>
          {!recovery && <div className="mt-5 flex flex-wrap gap-3"><button className={secondary} disabled={busy} onClick={() => chooseMode("reset")}>Password dimenticata?</button><button className={secondary} disabled={busy} onClick={resend}>Reinvia conferma email</button></div>}
        </>}
      </>}
    </div>
  </main>;
}

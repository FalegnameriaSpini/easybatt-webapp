# Account EasyBatt: attivazione controllata

## Stato

Codice predisposto, non attivato e non pubblicato automaticamente. Nessuna
migrazione o registrazione viene eseguita sul progetto reale dagli script di test.
`npm run dev:sandbox` disabilita sempre Auth e non crea utenti in Supabase.
Per prove complete con vere email usare un progetto Supabase di sviluppo separato.

## Prima dell'attivazione

1. Conservare un backup ed eseguire nel SQL Editor la migrazione
   `supabase/migrations/202610050002_customers.sql`, una sola volta, dopo quella
   del catalogo. Non modifica prodotti o prezzi. Crea profili, storico consensi,
   storico approvazioni e trigger su `auth.users`. I vecchi utenti Auth non sono
   importati automaticamente: la registrazione EasyBatt parte da questa versione.
2. In Supabase Authentication abilitare email/password e **Confirm email**.
   Impostare password di almeno 12 caratteri e rivedere rate limits e protezione
   anti-abuso; per apertura al pubblico valutare CAPTCHA (integrazione non inclusa).
3. Configurare un provider SMTP e verificare il mittente e il dominio. Il servizio
   email predefinito di Supabase e' limitato e non va considerato pronto per
   inviare ai clienti. Eseguire una prova reale di conferma e recupero password.
4. Configurare Site URL `https://www.easy-batt.it` e Redirect URLs esatti:
   `https://www.easy-batt.it/account` e
   `https://www.easy-batt.it/account?flow=recovery`.
   Nel progetto di sviluppo aggiungere l'origine locale effettiva, non wildcard
   per domini esterni. L'app usa il flusso browser standard Supabase (implicit).
5. Predisporre un'informativa privacy definitiva con titolare, finalita', tempi di
   conservazione e contatti corretti. La [bozza interna EasyBatt](privacy-policy-draft.md)
   contiene i dati aziendali forniti e i punti ancora da completare; non pubblicarla
   e non collegarla alla registrazione finche' non e' approvata.
   Il testo marketing mostrato e' in `lib/easybatt-customers.mjs`:
   "Desidero ricevere via email novita e offerte EasyBatt. Posso revocare il
   consenso in qualsiasi momento." Versione iniziale `2026-10-05-v1`.
   Prima dell'apertura verificare testo e informativa con chi segue la privacy.
   Ogni futura revisione richiede versionamento coerente di codice e migrazione,
   conservazione dei testi precedenti e nessuna riscrittura dello storico.
6. Aggiungere in `.env.local` del progetto di sviluppo e poi su Vercel:

   ```dotenv
   EASYBATT_AUTH_ENABLED=1
   SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   EASYBATT_PRIVACY_URL=https://DOMINIO/PERCORSO-INFORMATIVA
   ```

   Restano necessarie `SUPABASE_URL` e `SUPABASE_SECRET_KEY` del progetto corretto.
   Solo la publishable key viene fornita al browser. Non usare la secret key in
   questo campo. Nessun segreto deve essere inserito in Git o screenshot.
7. Riavviare/rideployare e verificare `/account` e `/admin` prima di invitare clienti.
   Con flag assente/0, URL privacy non HTTPS, chiavi mancanti o sandbox attiva,
   account e link di registrazione restano disattivati. Il flag non modifica le
   impostazioni Auth del provider: per bloccare anche signup dirette all'API
   Supabase disabilitare "Allow new users to sign up" nella dashboard.

## Comportamento

- Registrazione con nome, email e password; professionisti anche ragione sociale
  e partita IVA italiana. Si controlla solo il formato di 11 cifre, non esistenza,
  stato fiscale o appartenenza dell'azienda. La verifica resta manuale.
- Il trigger crea un profilo privato o professionista in attesa. Ignora eventuali
  ruoli, stati di approvazione e listini aggiunti ai metadata dal browser.
- L'email non confermata non accede alle API clienti. L'admin vede anche le
  registrazioni in attesa di conferma, ma non puo' approvarle prima della conferma.
- L'admin filtra clienti per stato, approva/rifiuta/rimette in attesa e assegna un
  listino pubblicato. "Salva cliente" applica subito la scelta, separatamente dal
  pulsante "Salva e pubblica" del catalogo. Le modifiche concorrenti sono respinte.
  Dopo aver pubblicato un listino premere "Aggiorna clienti" per ricaricare le opzioni.
- Un listino condiviso da piu' clienti equivale al gruppo commerciale. Per una
  condizione individuale duplicare il listino, modificarlo e assegnarlo al cliente.
- Tariffe dedicate solo per professionisti approvati con email confermata e
  listino ancora pubblicato. Rifiuto, revoca, eliminazione o ritorno in bozza del
  listino fanno usare quello pubblico alla successiva richiesta dei prezzi.
- Il preventivatore aggiorna le tariffe all'accesso, uscita e ritorno alla finestra;
  non e' un sistema di ordini: i totali mostrati sono ancora stime lato browser.
- Costi d'acquisto, margini, altri listini e dati degli altri clienti non sono
  restituiti all'utente. Ogni richiesta riservata verifica il token con `getUser`.
- Supabase JS mantiene la sessione nel browser e rinnova i token. Non ci sono
  credenziali cliente nella configurazione prezzi. L'admin conserva il proprio
  accesso separato con password condivisa: lo storico non identifica il singolo
  operatore, finche' non si migrera' anche l'admin a identita' personali.

## Basi del funnel, non invii automatici

La casella marketing e' facoltativa, inizialmente vuota e separata dalla presa
visione dell'informativa. Data, versione e concessione/revoca vengono registrate
in `easybatt_consent_events` nella stessa transazione del profilo. Dall'account
si puo' revocare o riattivare il consenso; l'admin non puo' modificarlo.

Nessuna newsletter o automazione e' collegata. Una futura integrazione dovra'
usare soltanto email confermate con consenso attuale, gestire disiscrizioni anche
dal messaggio e sincronizzare le revoche prima di ogni invio. Definire prima
anche conservazione, cancellazione ed esportazione dei dati. Le tabelle private
non hanno policy o privilegi per `anon`/`authenticated`; vi accede solo il server.
La cancellazione di un utente Auth elimina in cascata il profilo e gli storici:
valutare la politica di conservazione prima di eseguire cancellazioni reali.

## Collaudo in progetto separato

Registrare un privato e un professionista, con/senza marketing; verificare email,
login/logout, recupero password, revoca consenso e ricaricamento. Approvare il
professionista, assegnare un listino pubblicato e confrontare servizi, fornitura,
IVA e spedizione. Provare revoca, listino in bozza, conflitto tra due admin,
accesso anonimo e token non valido. Verificare RLS anche con un utente normale.
I test locali del codice e SQL non sostituiscono il collaudo SMTP su Supabase.

Riferimenti ufficiali:
- https://supabase.com/docs/guides/auth/passwords
- https://supabase.com/docs/guides/auth/managing-user-data
- https://supabase.com/docs/reference/javascript/auth-getuser
- https://supabase.com/docs/guides/auth/auth-smtp

# Bozza informativa privacy EasyBatt

**Bozza interna del 6 ottobre 2026. Non pubblicare e non collegare ai moduli.**

Testo da completare e sottoporre a un consulente privacy prima dell'uso.
I punti contrassegnati **DA DEFINIRE** impediscono di considerarlo definitivo.
La data della bozza non e' la versione dell'informativa accettata dagli utenti.
Account, modulo Prova EasyBatt e consenso marketing descritti sotto sono
predisposti nel codice, ma non sono ancora attivati online. Nessuna campagna
email e' collegata. Le tabelle del modulo sono presenti nel progetto Supabase
EasyBatt secondo la conferma del titolare, che ha eseguito anche la migrazione
dei 12 mesi e verificato il caricamento dell'elenco richieste online. Questo
non costituisce un collaudo completo dei permessi o dell'invio pubblico.

## Ambito della prima attivazione

La prima fase riguarda il sito pubblico, il preventivatore e l'apertura del
modulo Prova EasyBatt per ricevere richieste e ricontattare gli interessati.
La bozza distingue questo percorso da registrazione account, listini riservati
e marketing: le relative parti sono una preparazione per una fase successiva,
non la descrizione di servizi gia' attivi.

Il testo pubblico dovra' descrivere solo i trattamenti effettivamente svolti.
Non occorre attivare account, newsletter o Brevo per ricevere richieste di
progetto. Restano invece da verificare i servizi gia' utilizzati dal sito,
anche se il modulo e' ancora chiuso.

### Verifiche necessarie

| Punto | Stato e azione prima dell'apertura |
| --- | --- |
| Titolare, sede e recapito privacy | Dati forniti dal titolare, riportati sotto; confermare l'eventuale nomina di un DPO senza confonderlo con la persona incaricata della casella. |
| Finalita' e basi giuridiche | Validare la distinzione tra richieste personali, referenti aziendali, sicurezza e provenienza delle richieste. |
| Fornitori e trasferimenti | Verificare contratti e impostazioni reali di Vercel, Supabase, Microsoft 365 e dei servizi Google; completare ruoli, localizzazioni e garanzie. |
| Cookie, log e copie di sicurezza | Verificare il sito pubblicato e i tempi configurati, non desumerli dalla sola lettura del codice. |
| Conservazione e diritti | Strumenti dei 12 mesi installati secondo conferma del titolare; definire il presidio operativo e le procedure per email, WhatsApp, backup e richieste di cancellazione anticipata. |
| Pubblicazione e prova completa | Revisione del testo, versione approvata, pagina pubblica e URL configurato; collaudo controllato di invio, consultazione e cancellazione prima dell'apertura generale. |

I punti aperti relativi ai soli account e al marketing restano rinviati, a
condizione che tali funzioni rimangano disattivate. Non rinviare invece le
verifiche che riguardano il sito e il modulo della prima fase.

## Titolare e contatti

EasyBatt e' un marchio di **Falegnameria Spini Gianluca e Marco snc**, titolare
del trattamento dei dati personali per le attivita' EasyBatt descritte qui.

Sede: Via Benedetto Castelli 40/42, 25064 Gussago (BS), Italia.

Partita IVA: **03098310984**.

Sito: **www.easy-batt.it**.

Email per assistenza e richieste privacy: **info@easy-batt.it**.
Il titolare conferma che la casella e' gia' attiva e condivisa su Microsoft 365,
nel tenant Easybatt.
Il titolare conferma che seguira' personalmente le richieste dei clienti e quelle
relative ai dati personali, con l'eventuale supporto di una persona incaricata
e autorizzata, tramite `info@easy-batt.it`.
**DA DEFINIRE:** confermare se esiste un responsabile della protezione dei dati
e, se applicabile, inserirne i contatti. La persona incaricata della casella
non viene automaticamente qualificata come responsabile della protezione dei dati.

## Dati e funzioni del sito

Il preventivatore pubblico non richiede la registrazione. Puoi scegliere
servizi, modello e quantita' di battiscopa per ottenere una stima. Nel codice
attuale non e' previsto il salvataggio automatico del progetto nel profilo.
Restano distinti i dati trasmessi ai servizi tecnici e quelli che decidi di
condividere contattandoci.

### Richieste Prova EasyBatt

Il modulo serve a raccontare un lavoro e chiedere una valutazione con ricontatto.
Non richiede un account, non conferma un ordine e non implica una lavorazione
gratuita. Il calcolo autonomo del prezzo non invia automaticamente una richiesta.

Con l'attivazione del modulo saranno trattati:

- Nome e cognome, email, telefono, professione (compresa la scelta Privato),
  comune e provincia del cantiere e tipo di intervento, richiesti dal modulo.
- Azienda e note sul lavoro, facoltative; fascia indicativa dei metri e periodo
  previsto, per i quali e' possibile indicare che il dato non e' ancora noto.
- Identificativo e data della richiesta, versione e URL dell'informativa,
  data di presa visione. Nella prima fase non viene raccolto consenso marketing.
- Stato della valutazione, annotazioni interne, data di ricontatto e ultimo
  contatto effettivo inseriti dalle persone autorizzate a seguire il progetto;
  termine di conservazione calcolato dall'ultimo contatto.
- Pagina di provenienza dichiarata e parametri fonte, mezzo e campagna, solo
  quando presenti nel collegamento al modulo. Non vengono memorizzati URL
  completi o identificativi pubblicitari attraverso questa funzione.

Richieste diverse della stessa persona rimangono progetti distinti. I dati
digitati non sono salvati dal modulo nel local storage del browser. In caso di
errore rimangono nei campi fino alla chiusura o ricarica della pagina. Non sono
attualmente accettati allegati: non inserire nelle note dati particolari,
credenziali o informazioni personali di terzi non necessarie alla valutazione.

La finalita' principale e' leggere la richiesta, approfondire il lavoro e
rispondere ai recapiti forniti. Per richieste dell'interessato relative a un
possibile contratto, la base proposta e' l'art. 6.1.b GDPR. Per i referenti di
societa' si propone l'interesse legittimo alla gestione dei rapporti e delle
richieste aziendali (art. 6.1.f), da validare e bilanciare sul caso concreto,
senza estendere automaticamente la base contrattuale del cliente al referente.
La presa
visione dell'informativa non e' un consenso generico a ulteriori utilizzi.
[GDPR, articoli 6 e 13](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32016R0679).

Le richieste saranno salvate nel database Supabase e consultate dall'admin
riservato. Brevo e' la destinazione CRM futura concordata, ma il connettore
non e' attivo: la coda interna non trasferisce dati a Brevo. Non sono ancora
inviate email automatiche di conferma o notifiche al titolare. Il ricontatto
deve quindi essere gestito dalle persone incaricate.

**Scelte confermate dal titolare:** gestione personale delle richieste e dei
diritti privacy, con eventuale persona incaricata e autorizzata, tramite
`info@easy-batt.it`; conservazione delle richieste che non diventano lavori per
12 mesi dall'ultimo contatto, poi cancellazione; nessuna raccolta del consenso
marketing nella prima fase. Il collegamento a Brevo e' rinviato.

**Predisposizione tecnica:** l'admin permette di registrare l'ultimo contatto
effettivo, filtrare i progetti oltre il termine e cancellarli singolarmente dopo
verifica e conferma. Per nuove richieste la data iniziale e' quella di ricezione;
per quelle preesistenti deve essere verificata. La modifica di una nota o un
ricontatto futuro non fanno ripartire i 12 mesi. I progetti in stato Cliente
sono esclusi da questa procedura, non da qualsiasi obbligo di conservazione limitata.
**Stato confermato dal titolare:** migrazioni eseguite e sezione richieste
caricata correttamente nell'admin online.
**DA ATTUARE prima dell'attivazione:** collaudo completo e controllo periodico
affidato al titolare o a persona incaricata, gestione delle eventuali copie
operative. Non dichiarare una cancellazione
automatica: non e' implementata. I 12 mesi sono una scelta operativa del titolare, da verificare
nel contesto complessivo dell'informativa, non un termine prescritto per legge.

### Account clienti per una fase successiva

Questa sezione non deve essere presentata come un servizio attivo nella prima
versione pubblica dell'informativa. La sua approvazione e' separata dall'apertura
del solo modulo Prova EasyBatt.

Con l'attivazione degli account saranno trattati:

- Nome e cognome, email, identificativo account e informazioni di autenticazione
  gestite tramite Supabase Auth; la password non compare nell'elenco clienti
  dell'admin EasyBatt.
- Per i professionisti, ragione sociale e partita IVA italiana, stato della
  richiesta e listino assegnato. La verifica dell'azienda e l'approvazione sono
  manuali; il controllo automatico della partita IVA riguarda solo il formato.
- Conferma dell'email, data di creazione del profilo, revisioni e storico delle
  modifiche a stato e listino.
- Presa visione dell'informativa e scelta marketing, con versione del testo,
  data e storico delle concessioni o revoche del consenso.

### Preventivatore e canali di contatto pubblici

Queste funzioni non dipendono dalla registrazione di un account.
Per il calcolo della trasferta possono essere trattati indirizzo del cantiere,
coordinate ricavate dall'indirizzo e distanza dalla sede. Google Places riceve
il testo digitato per proporre indirizzi; alla conferma il server utilizza
Google Geocoding e Routes. Nella modifica locale del 6 ottobre 2026 la libreria
Google viene caricata solo dopo il pulsante "Attiva ricerca indirizzo con Google",
preceduto da un avviso sui dati trasmessi. Il campo dei chilometri andata e ritorno
e' modificabile anche senza Google. La scelta non viene memorizzata nel browser:
a ogni ricarica la ricerca riparte disattivata. Dopo l'attivazione, i suggerimenti
trasmettono il testo digitato senza attendere "Conferma l'Indirizzo".
Il controllo del sito pubblico precedente alla modifica mostrava invece il
caricamento immediato di Google. Verificare il nuovo comportamento dopo il deploy;
non descriverlo come gia' pubblicato o come un sistema completo di consenso cookie.

I collegamenti WhatsApp possono contenere un riepilogo con localita', quantita',
modello, servizi e prezzo stimato. Aprendo il collegamento il testo incluso
nell'URL viene comunicato al servizio WhatsApp; l'invio del messaggio alla
falegnameria resta una tua azione. Se ci contatti riceviamo anche i recapiti e
gli ulteriori dati che condividi nel messaggio.

I servizi di hosting e autenticazione possono trattare dati tecnici come IP,
orari, richieste ed eventi di accesso. **DA DEFINIRE:** inventario effettivo dei
log e delle impostazioni attive presso i fornitori, incluse eventuali funzioni
di analisi abilitate dalla dashboard e non presenti nel codice.

## Finalita e basi giuridiche proposte

L'impostazione seguente va validata sulle attivita' effettive della falegnameria.

| Attivita' | Base proposta |
| --- | --- |
| Richieste di progetto, stime e assistenza precontrattuale dell'interessato | Misure precontrattuali richieste dall'interessato, art. 6.1.b GDPR. |
| Contatti con referenti di societa' | Interesse legittimo alla gestione della relazione aziendale richiesta, art. 6.1.f, da verificare e bilanciare. |
| Protezione degli accessi e prevenzione degli abusi | Interesse legittimo alla sicurezza, art. 6.1.f, previa valutazione e documentazione del bilanciamento. |
| Provenienza delle richieste e tre etichette UTM | Finalita' proposta: comprendere quali canali generano richieste. Validare necessita', base giuridica e bilanciamento prima dell'apertura; i dati sono associati alla richiesta, non statistiche anonime. Non inserire nomi, email o identificativi individuali nelle etichette campagna. |
| Account e condizioni professionali, fase successiva | Gestione della relazione richiesta; validare la base per l'account, il referente aziendale e le eventuali verifiche esterne. |
| Novita' e offerte via email, fase successiva | Consenso facoltativo, art. 6.1.a; non raccolto dal modulo progetti della prima fase. |

La presa visione dell'informativa non sostituisce il consenso marketing.
Le basi e il bilanciamento richiedono una verifica concreta, non la sola
inclusione nel testo. [Garante, liceita' e consenso](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/8981258).

Eventuali ordini, fatture, pagamenti o altri trattamenti successivi non sono
disciplinati compiutamente da questa bozza del sito e andranno integrati prima
della loro introduzione.

## Dati necessari e scelte facoltative

Nel modulo Prova EasyBatt i campi obbligatori sono indicati prima dell'invio:
senza compilarli non e' possibile inoltrare la richiesta tramite il modulo.
Azienda e note sono facoltative; per metri e tempi e' disponibile l'opzione
di dato non ancora noto. Non fornire dati particolari o informazioni di terzi
non necessarie. Il preventivatore pubblico resta utilizzabile senza inviare
una richiesta o registrarsi.

**Verifica di minimizzazione:** il codice richiede sia email sia telefono.
Confermare che entrambi siano necessari al ricontatto previsto oppure rendere
facoltativo il telefono prima della pubblicazione, allineando modulo e validazione.
Questa bozza non modifica i campi del sito.

Per la futura registrazione, nome, email e credenziali sono necessari per creare l'account. Ragione sociale
e partita IVA servono per richiedere le condizioni professionali. Senza questi
dati restano disponibili le funzioni pubbliche; senza approvazione si applica
il listino pubblico. L'indirizzo serve al calcolo automatico della trasferta;
il preventivatore consente anche l'inserimento manuale dei chilometri.

Per il modulo Prova EasyBatt, nella prima fase, sono raccolte soltanto richieste
di progetto: nessuna casella per novita' e offerte e nessuna iscrizione a campagne.
I campi tecnici del database restano predisposti, ma i nuovi invii registrano
`marketing_consent=false` e nessun testo di consenso. Non e' una revoca di eventuali
consensi precedenti o di altri canali e non modifica i profili account.

Nel distinto percorso account predisposto, la scelta di ricevere email promozionali e' facoltativa, non preselezionata e
non condiziona account, approvazione professionale o listino. Puoi modificarla
nell'area account o contattare il titolare. La revoca non pregiudica la liceita'
del trattamento precedente. [Garante, consenso](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/8981258).

**DA DEFINIRE prima di qualsiasi campagna:** piattaforma di invio, gestione
delle disiscrizioni dal messaggio e sincronizzazione delle revoche. Il sito
predispone la preferenza per gli account, ma non invia newsletter. La raccolta
dal modulo progetto e' invece rinviata a una fase successiva.

## Destinatari e servizi esterni

I dati necessari alla gestione clienti sono accessibili agli incaricati della
falegnameria autorizzati. L'admin mostra contatti, dati aziendali, stato e
preferenza marketing; non rende pubblico l'elenco degli iscritti.

Le integrazioni previste sono:

- **Vercel:** hosting del sito ed esecuzione delle API.
- **Supabase:** autenticazione, database dei profili e delle richieste progetto; lo Storage immagini
  del catalogo e' pubblico e non e' destinato a documenti o dati dei clienti.
- **Google Maps Platform:** suggerimenti indirizzi e calcolo della trasferta.
- **WhatsApp:** canale esterno di contatto aperto dall'utente.
- **Microsoft 365:** gestione della casella condivisa `info@easy-batt.it`
  nel tenant Easybatt, secondo quanto confermato dal titolare.
- **Serverplan:** registrazione del dominio, secondo quanto confermato dal
  titolare; non e' il fornitore della casella Microsoft 365.
- **Provider dell'invio automatico:** **DA DEFINIRE** per le email account;
  la casella Microsoft 365 non ne configura automaticamente l'invio.

**DA DEFINIRE:** soggetti giuridici contrattuali, rispettivi ruoli privacy,
accordi di trattamento, subfornitori e informative pertinenti. Non presumere
che tutti i fornitori operino con lo stesso ruolo.

**DA DEFINIRE per i trasferimenti internazionali:** sedi del trattamento e
degli accessi, eventuali trasferimenti fuori dallo SEE, garanzie applicabili e
modalita' per ottenerne copia. Non dichiarare che tutti i dati rimangono in
Europa senza verificare contratti, configurazioni e subfornitori.

## Conservazione

I periodi devono riflettere esigenze reali e procedure attuabili. Non sono
ancora stabilite scadenze automatiche di cancellazione nel codice dell'app.

| Categoria | Decisione da completare prima della pubblicazione |
| --- | --- |
| Registrazioni senza conferma email | Termine dalla registrazione e procedura di rimozione. |
| Account attivi o inattivi | Durata del rapporto, criterio di inattivita' e gestione della chiusura. |
| Richieste professionali e storico approvazioni | Termine per richieste non approvate e durata dello storico necessario. |
| Richieste di preventivo e messaggi email o WhatsApp | Periodo dalla conclusione del contatto e distinzione dai rapporti divenuti contrattuali. |
| Richieste Prova EasyBatt che non diventano lavori | 12 mesi dall'ultimo contatto effettivo, poi cancellazione: scelta confermata; strumenti manuali installati secondo conferma del titolare, da collaudare e presidiare insieme alla gestione delle copie. |
| Marketing e prove del consenso | Durata massima dell'uso promozionale, stop alla revoca, durata e base della conservazione delle prove. |
| Log e backup | Tempi effettivi per ciascun fornitore, rotazione e trattamento delle copie. |

**DA DEFINIRE:** completare la tabella con termini o criteri sufficientemente
precisi; predisporre le corrispondenti operazioni di cancellazione. L'informativa
deve indicare periodi o criteri di conservazione. [Garante, informazioni agli interessati](https://www.garanteprivacy.it/it/home/i-miei-diritti/diritti).

## Sessioni e strumenti di tracciamento

Il modulo Prova EasyBatt predisposto imposta, solo dopo un invio ricevuto,
il cookie `easybatt-project-receipt`, valido per 30 minuti e limitato alla pagina
`/grazie-prova-easybatt`. Contiene identificativo, scadenza e firma della
ricevuta, non nome, email o telefono. Serve a mostrare una conferma soltanto
dopo il salvataggio; non viene usato per pubblicita' o profilazione.

Per limitare invii ripetuti, il server deriva con HMAC identificatori da IP ed
email. Il contatore antiabuso non conserva l'IP in chiaro; questo non esclude
gli eventuali log tecnici dei fornitori. Le finestre di conteggio piu' vecchie
di due giorni vengono rimosse al successivo nuovo invio, non da una cancellazione
programmata a un'ora esatta. Descrivere e verificare separatamente i log e i backup.

L'accesso clienti predisposto usa Supabase JS per conservare la sessione nella
memoria locale del browser e rinnovare i token. Questo meccanismo non coincide
con la preferenza marketing.

**DA DEFINIRE:** verificare sul sito pubblicato cookie, local storage e
richieste di terze parti, classificandoli per finalita' e durata. Nel codice
esaminato non risultano integrazioni esplicite con Google Analytics o pixel
pubblicitari; questo non esclude funzioni attivate dai fornitori o dalla
dashboard di hosting.

La modifica locale evita il caricamento iniziale di Google Places senza una
scelta esplicita; non scarica la libreria gia' caricata e non costituisce da sola
una gestione del consenso e della revoca. Va verificata la classificazione dei
trattamenti Google: se emergono
strumenti non tecnici soggetti a consenso, occorre bloccarli fino alla scelta
dell'utente e predisporre i relativi controlli. Non e' sufficiente aggiungere
un banner privo di effetti sul caricamento. [Garante, linee guida cookie e altri strumenti di tracciamento](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/9677876).

## Diritti e richieste

Nei casi previsti dal GDPR puoi chiedere accesso, rettifica, cancellazione,
limitazione e portabilita' dei dati, nonche' opporti ai trattamenti fondati
sull'interesse legittimo per motivi legati alla tua situazione. Puoi opporti
al marketing diretto senza dover motivare la richiesta e revocare il consenso.

Le richieste possono essere rivolte al titolare ai recapiti indicati sopra.
Resta il diritto di presentare reclamo al Garante per la protezione dei dati
personali. [Garante, diritti degli interessati](https://www.garanteprivacy.it/it/home/i-miei-diritti/diritti).

Il referente operativo confermato e' il titolare, con l'eventuale supporto di
una persona autorizzata, tramite `info@easy-batt.it`. Il riscontro va fornito
entro un mese; quando necessario per numero o complessita' delle richieste,
la proroga puo' arrivare a ulteriori due mesi, comunicandone i motivi entro il
primo mese. In presenza di ragionevoli dubbi sull'identita' possono essere
chieste informazioni proporzionate per verificarla, non documenti indiscriminati.
[GDPR, articolo 12](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32016R0679).

**DA ATTUARE:** registrazione della ricezione, verifica proporzionata
dell'identita', ricerca delle copie pertinenti e gestione di rettifiche,
esportazioni e cancellazioni. Il pulsante dei 12 mesi non gestisce le richieste
di esercizio dei diritti: non consente di eliminare richieste non scadute o
in stato Cliente. Per questi casi serve una procedura riservata separata,
senza attendere la scadenza dei 12 mesi e valutando le condizioni applicabili.
Non promettere funzioni self-service non disponibili.

L'approvazione professionale e l'assegnazione del listino sono manuali. Il
preventivatore calcola una stima utilizzando le tariffe applicabili; non
conclude automaticamente ordini. Non e' implementato un funnel basato su
tracciamento comportamentale. Prima di aggiungerlo occorre valutarne finalita',
regole e informativa, senza estendere automaticamente il consenso email.

## Note interne prima dell'attivazione

Questa sezione non va inclusa nel testo pubblico.

### Presidio della conservazione da confermare

1. Il titolare o la persona autorizzata aggiorna l'ultimo contatto solo dopo
   uno scambio effettivo sul progetto; una nota interna non rinnova il termine.
2. Proposta operativa: controllare almeno ogni settimana il filtro dei 12 mesi
   e le date da verificare; valutare un'automazione se il volume non permette
   di rispettare il termine concordato. La periodicita' non autorizza una
   conservazione indefinita e non e' ancora stata approvata dal titolare.
3. Prima della cancellazione verificare che la richiesta non sia diventata un
   lavoro, risolvere date mancanti e gestire le copie pertinenti in posta e
   negli altri canali. Non usare lo stato Cliente solo per evitare la scadenza.
4. La cancellazione admin elimina la richiesta e la relativa riga della coda
   interna Brevo, non messaggi, log o backup dei fornitori. Verificare tempi di
   rotazione e procedura di ripristino per non reintrodurre dati gia' cancellati.
5. Definire la conservazione dei fascicoli divenuti lavori e delle eventuali
   informazioni necessarie per obblighi o controversie, con finalita', accessi
   e termini separati. L'esclusione dal filtro non significa conservazione
   illimitata di tutti i dati del modulo.

### Attivazione tecnica

Aggiornamento tecnico: e' ora predisposto anche il modulo Prova EasyBatt, disattivato
per impostazione predefinita. Integrare la bozza per nome, azienda facoltativa, email,
telefono, professione, comune/provincia, intervento, metri indicativi, tempi e note.
La richiesta conserva versione/URL dell'informativa e data di presa visione. Per
questa prima fase il consenso marketing non e' raccolto. Sono previsti note
interne, stato e data del ricontatto, tre etichette UTM e un percorso di provenienza
dichiarato. I contatori antiabuso usano HMAC di IP/email con rimozione delle finestre
piu' vecchie di due giorni al successivo invio nuovo. La conferma usa un cookie firmato,
HttpOnly, di 30 minuti, limitato al percorso `/grazie-prova-easybatt` e privo di recapiti.
E' predisposta una coda privata per Brevo, ma nessun dato viene ancora trasferito al
fornitore e non sono inviate email automatiche. Attuare la conservazione concordata
di 12 mesi per richieste senza seguito; completare la verifica dell'informativa
prima dell'attivazione. Revoche e verifica email restano da predisporre per una
futura raccolta marketing. Gli allegati
non sono accettati. Questa nota tecnica non approva o completa l'informativa.

1. Il referente operativo confermato e' il titolare, con eventuale persona
   incaricata e autorizzata, sulla casella condivisa Microsoft 365. Definire
   gli accessi individuali e le relative istruzioni operative.
2. Completare le parti evidenziate e far verificare il testo al consulente privacy.
3. Per la fase account configurare l'invio SMTP ed eventualmente, in una fase
   successiva, il servizio marketing, mantenendo la casella Microsoft 365 esistente;
   non iscrivere automaticamente ai messaggi promozionali i clienti registrati.
   L'SMTP degli account non e' un prerequisito del solo modulo progetti, che
   attualmente non invia email automatiche.
4. Verificare trattamenti esterni, contratti, trasferimenti, cookie e log anche
   sul sito gia' pubblico: la disattivazione degli account non disattiva mappe,
   hosting e collegamenti WhatsApp.
5. Stabilire conservazione e procedure pratiche. La migrazione utenti attuale
   elimina in cascata profilo e storici alla cancellazione dell'utente Auth:
   concordare la gestione delle prove prima di cancellare account reali.
   Le scelte marketing nei metadata iniziali Auth non sono lo stato corrente:
   per gli invii usare il profilo confermato e la preferenza aggiornata.
6. Assegnare una versione finale al testo approvato. Il codice e il trigger SQL
   usano attualmente `2026-10-05-v1`: non associarla silenziosamente a un testo
   diverso. Allineare codice, migrazione e archivio dei testi prima dell'apertura.
7. Solo dopo l'approvazione, pubblicare la pagina privacy e collegarne l'URL
   a `EASYBATT_PRIVACY_URL`. Non usare questa bozza come informativa definitiva.
8. Per il solo modulo progetti, seguire la procedura e i collaudi in
   [Configurazione Supabase](supabase-setup.md). Assegnare al testo approvato
   `EASYBATT_PROJECTS_PRIVACY_VERSION` e verificare l'URL prima di impostare
   `EASYBATT_PROJECTS_ENABLED=1`. Non abilitare gli account contestualmente.
9. In una fase successiva completare i collaudi descritti in
   [Attivazione account](customer-accounts.md) prima di abilitare le registrazioni.

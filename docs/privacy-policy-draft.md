# Bozza informativa privacy EasyBatt

**Bozza interna del 6 ottobre 2026. Non pubblicare e non collegare al modulo di registrazione.**

Testo da completare e sottoporre a un consulente privacy prima dell'uso.
I punti contrassegnati **DA DEFINIRE** impediscono di considerarlo definitivo.
La data della bozza non e' la versione dell'informativa accettata dagli utenti.
Account, modulo Prova EasyBatt e consenso marketing descritti sotto sono
predisposti nel codice, ma non sono ancora attivati online. Nessuna campagna
email e' collegata. Le tabelle del modulo sono presenti nel progetto Supabase
configurato localmente; questo non costituisce un collaudo completo dei permessi
o una conferma dell'attivazione pubblica.

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
- Stato della valutazione, annotazioni interne e data di ricontatto inseriti
  dalle persone autorizzate a seguire il progetto.
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
possibile contratto, la base proposta e' l'art. 6.1.b GDPR; per i referenti di
aziende va individuata la base appropriata al rapporto concreto. La presa
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
**DA ATTUARE prima dell'attivazione:** migrazione e distribuzione del codice,
collaudo e controllo periodico affidato al titolare o a persona incaricata,
gestione delle eventuali copie operative. Non dichiarare una cancellazione
automatica: non e' implementata. I 12 mesi sono una scelta operativa del titolare, da verificare
nel contesto complessivo dell'informativa, non un termine prescritto per legge.

### Account clienti

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

Per il calcolo della trasferta possono essere trattati indirizzo del cantiere,
coordinate ricavate dall'indirizzo e distanza dalla sede. Google Places riceve
il testo digitato per proporre indirizzi; alla conferma il server utilizza
Google Geocoding e Routes. La libreria Google viene caricata dal browser quando
si inizializza il campo indirizzo, se il servizio e' configurato: non soltanto
quando premi il pulsante di conferma.

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
| Account, stime richieste, contatti e assistenza precontrattuale | Esecuzione del servizio richiesto o misure precontrattuali, art. 6.1.b GDPR. Per referenti di societa' va verificata la base pertinente al loro rapporto con il titolare. |
| Valutazione della richiesta professionale e applicazione del listino | Gestione della relazione richiesta; confermare separatamente la base per eventuali verifiche esterne dell'azienda. |
| Protezione degli accessi e prevenzione degli abusi | Interesse legittimo alla sicurezza, art. 6.1.f, previa valutazione e documentazione del bilanciamento. |
| Novita' e offerte EasyBatt via email | Consenso facoltativo, art. 6.1.a; distinto dalle comunicazioni necessarie all'account. |

La presa visione dell'informativa non sostituisce il consenso marketing.
Le basi e il bilanciamento richiedono una verifica concreta, non la sola
inclusione nel testo. [Garante, liceita' e consenso](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/8981258).

Eventuali ordini, fatture, pagamenti o altri trattamenti successivi non sono
disciplinati compiutamente da questa bozza del sito e andranno integrati prima
della loro introduzione.

## Dati necessari e scelte facoltative

Nome, email e credenziali sono necessari per creare l'account. Ragione sociale
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
| Richieste Prova EasyBatt che non diventano lavori | 12 mesi dall'ultimo contatto, poi cancellazione: scelta confermata; strumenti manuali predisposti nell'admin, da distribuire e presidiare insieme alla gestione delle copie. |
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

Va valutato anche il caricamento iniziale di Google Places: se emergono
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

**DA DEFINIRE:** responsabile interno della gestione richieste, procedura di
identificazione proporzionata e gestione di rettifiche, esportazioni e
cancellazioni. Non promettere funzioni self-service non disponibili.

L'approvazione professionale e l'assegnazione del listino sono manuali. Il
preventivatore calcola una stima utilizzando le tariffe applicabili; non
conclude automaticamente ordini. Non e' implementato un funnel basato su
tracciamento comportamentale. Prima di aggiungerlo occorre valutarne finalita',
regole e informativa, senza estendere automaticamente il consenso email.

## Note interne prima dell'attivazione

Questa sezione non va inclusa nel testo pubblico.

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
3. Configurare l'invio SMTP ed eventuale futuro servizio marketing, mantenendo
   la casella Microsoft 365 esistente;
   non iscrivere automaticamente ai messaggi promozionali i clienti registrati.
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
8. Completare i collaudi descritti in [Attivazione account](customer-accounts.md)
   prima di abilitare le registrazioni pubbliche.

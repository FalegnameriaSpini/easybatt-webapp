# Bozza informativa privacy EasyBatt

**Bozza interna del 6 ottobre 2026. Non pubblicare e non collegare al modulo di registrazione.**

Testo da completare e sottoporre a un consulente privacy prima dell'uso.
I punti contrassegnati **DA DEFINIRE** impediscono di considerarlo definitivo.
La data della bozza non e' la versione dell'informativa accettata dagli utenti.
Account e consenso marketing descritti sotto sono predisposti nel codice, ma
non sono ancora attivati online. Nessuna campagna email e' collegata.

## Titolare e contatti

EasyBatt e' un marchio di **Falegnameria Spini Gianluca e Marco snc**, titolare
del trattamento dei dati personali per le attivita' EasyBatt descritte qui.

Sede: Via Benedetto Castelli 40/42, 25064 Gussago (BS), Italia.

Partita IVA: **03098310984**.

Sito: **www.easy-batt.it**.

Email per assistenza e richieste privacy: **info@easy-batt.it**.
Il titolare conferma che la casella e' gia' attiva e condivisa su Microsoft 365,
nel tenant Easybatt.
**DA DEFINIRE:** individuare chi presidia le richieste privacy. Confermare se esiste un
responsabile della protezione dei dati e, se applicabile, inserirne i contatti.

## Dati e funzioni del sito

Il preventivatore pubblico non richiede la registrazione. Puoi scegliere
servizi, modello e quantita' di battiscopa per ottenere una stima. Nel codice
attuale non e' previsto il salvataggio automatico del progetto nel profilo.
Restano distinti i dati trasmessi ai servizi tecnici e quelli che decidi di
condividere contattandoci.

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

La scelta di ricevere email promozionali e' facoltativa, non preselezionata e
non condiziona account, approvazione professionale o listino. Puoi modificarla
nell'area account o contattare il titolare. La revoca non pregiudica la liceita'
del trattamento precedente. [Garante, consenso](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/8981258).

**DA DEFINIRE prima di qualsiasi campagna:** piattaforma di invio, gestione
delle disiscrizioni dal messaggio e sincronizzazione delle revoche. Il sito
attualmente registra la preferenza, ma non invia newsletter.

## Destinatari e servizi esterni

I dati necessari alla gestione clienti sono accessibili agli incaricati della
falegnameria autorizzati. L'admin mostra contatti, dati aziendali, stato e
preferenza marketing; non rende pubblico l'elenco degli iscritti.

Le integrazioni previste sono:

- **Vercel:** hosting del sito ed esecuzione delle API.
- **Supabase:** autenticazione e database dei profili; lo Storage immagini
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
| Marketing e prove del consenso | Durata massima dell'uso promozionale, stop alla revoca, durata e base della conservazione delle prove. |
| Log e backup | Tempi effettivi per ciascun fornitore, rotazione e trattamento delle copie. |

**DA DEFINIRE:** completare la tabella con termini o criteri sufficientemente
precisi; predisporre le corrispondenti operazioni di cancellazione. L'informativa
deve indicare periodi o criteri di conservazione. [Garante, informazioni agli interessati](https://www.garanteprivacy.it/it/home/i-miei-diritti/diritti).

## Sessioni e strumenti di tracciamento

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

1. Confermare i dati del titolare e individuare il referente privacy della
   casella condivisa gia' attiva su Microsoft 365.
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

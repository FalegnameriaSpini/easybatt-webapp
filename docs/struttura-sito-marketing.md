# Struttura del sito EasyBatt

Il sito presenta il servizio EasyBatt e accompagna il visitatore verso la valutazione di un lavoro concreto. La struttura segue le sei pagine preparate dall'agenzia e conserva il preventivatore, il catalogo, l'admin e la predisposizione per gli account. Foto e video definitivi possono essere aggiunti successivamente senza cambiare l'ordine delle pagine.

Questa e' la specifica per la realizzazione progressiva, non una conferma di pubblicazione online. Il primo pubblico e' costituito dai professionisti di Brescia e provincia; i privati possono continuare a consultare il sito e il preventivatore. Il servizio di rilievo e preparazione rimane centrale, con fornitura del battiscopa opzionale.

## Stato dell'implementazione

Home, Come funziona, Per i professionisti, Il sistema e Chi siamo hanno ora un'intestazione e un footer condivisi, sezioni responsive, FAQ specifiche espandibili e un'ambientazione illustrativa dichiarata. Preventivatore, catalogo e admin non sono stati modificati da questo intervento.

Il menu, il footer e gli approfondimenti collegano le pagine dedicate `/per-professionisti`, `/il-sistema` e `/chi-siamo`. La pagina professionisti comprende quattro ancore per mestiere e un invito al contatto sempre visibile nell'intestazione mobile. Prova EasyBatt raggiunge `/prova-easybatt`, con presentazione, FAQ e modulo predisposto. Finche' la ricezione non e' attivata, online viene proposto il contatto tramite `info@easy-batt.it`; nella sandbox locale compare il modulo in anteprima senza invio. I collegamenti del menu sono centralizzati in `lib/easybatt-marketing.mjs`.

L'immagine di apertura e' sostituibile tramite la stessa configurazione; provenienza e prompt sono in `docs/marketing-assets.md`. La gestione dei contenuti nell'admin, i filmati e il flusso CRM restano interventi successivi. Le sezioni di casi reali non sono pubblicate senza materiale autentico.

## Riferimenti editoriali

Fonti nella cartella dell'agenzia `Piano Marketing`, sottocartella `TESTI SITO WEB`:

- `1 Easybatt_homepage.docx`: ordine delle sezioni e messaggio della Home.
- `2 EasyBatt_comefunziona.docx`: percorso dal rilievo alla posa.
- `3 EasyBatt_perprofessionisti.docx`: pagina unica B2B e benefici per mestiere.
- `4 EasyBatt_sistema.docx`: processo integrato e dimostrazioni tecniche.
- `5 EasyBatt_Chisiamo.docx`: origine, persone e valori.
- `6 EasyBatt_Prova_Thank_You_CRM.docx`: richiesta progetto, conferma e gestione dei contatti.

Il `PIANO MARKETING EASYBATT.pdf` definisce il posizionamento alle pagine 68-82, la strategia del sito alle pagine 126-134 e l'identita' visiva alle pagine 201-202. I documenti `EasyBatt_Magneti.docx` e `EasyBatt_Sequenza_Email_Marketing_Brevo.docx` riguardano il successivo percorso di acquisizione e accompagnamento dei contatti.

L'ordine narrativo dei documenti viene mantenuto. Le spiegazioni interne su persuasione, SEO, regia e impaginazione non diventano testo pubblico. Gli adattamenti rispetto all'agenzia sono esplicitati di seguito: conservazione del preventivatore, fornitura opzionale, materiali mancanti e continuita' dei collegamenti esistenti.

## Navigazione comune

Il logo riporta alla Home. Nel menu principale compaiono, in questo ordine, Come funziona, Per i professionisti, Il sistema e Chi siamo. Seguono l'accesso a Quanto mi costa e il pulsante principale Prova EasyBatt. L'account resta un accesso secondario e compare solo quando il servizio e' effettivamente abilitato.

Su schermi stretti i collegamenti passano in un menu apribile. Il pulsante di richiesta rimane facilmente raggiungibile; un eventuale comando fisso su mobile non deve coprire moduli, tastiera, contenuti o preferenze privacy.

| Pagina | Percorso previsto | Stato rispetto all'app |
| --- | --- | --- |
| Home | `/` | Sostituisce la sola schermata di accesso con il racconto del servizio |
| Come funziona | `/come-funziona` | Mantiene l'indirizzo, amplia e riordina i contenuti |
| Per i professionisti | `/per-professionisti` | Nuova pagina unica con sezioni per mestiere |
| Il sistema | `/il-sistema` | Nuovo approfondimento tecnico |
| Chi siamo | `/chi-siamo` | Nuova pagina sul marchio e sulla falegnameria |
| Prova EasyBatt | `/prova-easybatt` | Nuova pagina di richiesta progetto |
| Quanto mi costa | `/quanto-mi-costa` | Conserva il preventivatore funzionante |
| Conferma richiesta | `/grazie-prova-easybatt` | Accessibile dopo una richiesta ricevuta, non nel menu |
| Account | `/account` | Servizio riservato distinto dalla prima richiesta |
| Admin | `/admin` | Gestione riservata, non nel menu pubblico |

Il footer raccoglie recapiti, dati aziendali, relazione con Falegnameria Spini, collegamenti alle pagine e informative approvate. Non si pubblicano collegamenti a documenti o profili ancora inesistenti.

## Home

Obiettivo: capire che cosa fa EasyBatt, riconoscerne il valore e scegliere l'approfondimento o la richiesta progetto. Fonte: documento 1, sezioni 1-11.

| Ordine | Sezione | Contenuto e collegamenti | Materiale previsto |
| --- | --- | --- | --- |
| 1 | Apertura | EasyBatt e battiscopa su misura pronti da posare; sintesi del risultato. Scopri come funziona e Prova EasyBatt | Video breve di pezzi numerati, planimetria e posa; immagine statica in alternativa |
| 2 | Il lavoro prima della posa | Misurare, segnare, tagliare, organizzare. Vedi cosa cambia porta alla sezione benefici | Sequenza visiva delle attivita' |
| 3 | Benefici | Preparazione anticipata, pezzi identificabili e meno lavorazioni in cantiere | Dettagli del materiale preparato |
| 4 | Processo in sintesi | Rilievo, elaborazione, lavorazione, codifica, planimetria, posa. Collegamento al Sistema | Sequenza in sei passaggi |
| 5 | Tecnologia al servizio del risultato | Laser, software proprietario e CNC collegati. Entra nel sistema EasyBatt | Foto reali di strumenti e lavorazione |
| 6 | Professionisti | Posatori, falegnami, imprese, rivenditori | Collegamenti alle rispettive sezioni della pagina professionisti |
| 7 | Beneficio nell'immobile | Meno lavorazioni sul posto; polvere e rumore riferiti specificamente al taglio | Confronto dimostrativo autentico, quando disponibile |
| 8 | Lavori reali | Casi documentati e risultati verificabili | Sezione nascosta fino al primo caso utilizzabile |
| 9 | Domande principali | Rilievo, codifica, pareti irregolari, cosa si riceve e primo contatto | Risposte brevi e rimandi alle FAQ pertinenti |
| 10 | Origine | La domanda da cui nasce EasyBatt e l'esperienza di Falegnameria Spini. Collegamento a Chi siamo | Foto del titolare o del laboratorio |
| 11 | Richiesta | Invito a raccontare il prossimo lavoro, con indicazione del territorio iniziale | Pulsante verso Prova EasyBatt |

Quanto mi costa resta disponibile nella navigazione e puo' essere richiamato nella risposta sui costi, senza aggiungere un catalogo commerciale alla Home.

## Come funziona

Obiettivo: spiegare cosa accade dal rilievo alla consegna e cosa riceve il cliente. Fonte: documento 2, sezioni 1-9.

1. Apertura sul percorso dal rilievo al battiscopa pronto da posare, con collegamento alla sequenza del metodo.
2. Principio del servizio: preparare prima cio' che normalmente viene lavorato sul posto, senza svalutare il mestiere.
3. Sei passaggi: rilievo dell'ambiente, elaborazione dei dati, preparazione CNC, codifica, planimetria, consegna pronta per la posa.
4. Ruolo del software proprietario come collegamento tra dati, produzione e organizzazione della posa. Rimando al Sistema per l'approfondimento.
5. Esperienza di Falegnameria Spini e origine pratica del metodo, con rimando a Chi siamo.
6. Cosa riceve il cliente: pezzi preparati, codici e planimetria. Precisare che la fornitura del materiale e' opzionale e che l'eventuale materiale del cliente va valutato.
7. Confronto tra attivita' normalmente svolte in cantiere e identificazione/posa con EasyBatt, senza percentuali di risparmio non misurate.
8. FAQ sul metodo: chi rileva, come si identificano i pezzi, cosa fa il software e come viene gestita la posa.
9. Invito a valutare il prossimo lavoro tramite Prova EasyBatt.

Materiali: una foto o un breve filmato per fase, una planimetria dimostrativa priva di dati personali e dettagli dei codici. La prima versione puo' usare una sequenza grafica esplicativa al posto delle riprese mancanti.

## Per i professionisti

Obiettivo: far riconoscere il servizio come pertinente al proprio mestiere. Fonte: documento 3, sezioni 1-11.

1. Apertura rivolta a posatori, parquetisti, falegnami, imprese e rivenditori.
2. Chiarimento: EasyBatt prepara il lavoro, non sostituisce la competenza di chi posa.
3. Confronto tra preparazione tradizionale e identificazione/posa.
4. Quattro sezioni per mestiere: posatori e parquetisti, falegnami, imprese e ristrutturatori, rivenditori e showroom.
5. Valore economico del tempo di preparazione, senza promesse numeriche non documentate. Accesso secondario a Quanto mi costa.
6. Vantaggi per il cliente finale, soprattutto negli immobili abitati.
7. Cosa si riceve: materiale preparato, codifica e planimetria.
8. Sintesi del sistema con rimandi a Come funziona e Il sistema.
9. Lavori reali, visibili solo quando documentati.
10. FAQ commerciali: destinatari, singolo lavoro, territorio, collaborazioni e condizioni da valutare.
11. Prova EasyBatt sul tuo prossimo lavoro come azione principale.

Ancore previste: `#posatori`, `#falegnami`, `#imprese`, `#rivenditori`. I collegamenti dalla Home puntano qui. Si segue la scelta esplicita del documento 3 di una pagina unica al lancio, anche se Home e piano generale citano possibili pagine per ruolo.

La partita IVA e l'eventuale approvazione del listino appartengono al percorso account, non diventano una barriera obbligatoria alla prima richiesta progetto.

## Il sistema

Obiettivo: rendere credibile la promessa mostrando il collegamento tra strumenti, dati e lavorazioni. Fonte: documento 4, sezioni 1-12.

1. Apertura sulla relazione tra precisione del rilievo e semplicita' della posa.
2. Presentazione del processo come sistema integrato, non elenco di macchinari.
3. Rilievo laser dell'ambiente reale.
4. Software proprietario: elaborazione e organizzazione dei dati, con particolare rilievo visivo.
5. Lavorazione CNC che trasforma i dati in pezzi preparati.
6. Codifica dei singoli elementi.
7. Planimetria che collega ogni codice alla sua posizione.
8. Valore dell'intero sistema rispetto al solo acquisto del materiale o al solo taglio.
9. Tecnologia ed esperienza di Falegnameria Spini.
10. Conseguenze concrete per il professionista, con collegamento alla pagina dedicata.
11. FAQ tecniche e definizioni del sistema.
12. Invito a proporre un lavoro; collegamento ai casi reali solo quando presenti.

Materiali: laser in uso, schermate del software produttivo, CNC realmente impiegata, etichette leggibili, planimetria abbinata ai pezzi e risultato posato. Il software produttivo non va confuso con il preventivatore web. Le schermate non devono esporre dati dei clienti.

## Chi siamo

Obiettivo: dare un volto e una provenienza credibile al nuovo marchio. Fonte: documento 5, sezioni 1-11.

1. Apertura sull'esperienza reale da cui nasce EasyBatt.
2. Falegnameria Spini e cultura del lavoro su misura, con collegamento al sito della falegnameria.
3. Domanda iniziale: perche' eseguire sul posto cio' che si puo' preparare prima?
4. Passaggio dall'esperienza della falegnameria al metodo EasyBatt.
5. Innovazione come semplificazione del lavoro, non tecnologia fine a se stessa.
6. Valori spiegati attraverso comportamenti: onesta', miglioramento, collaborazione, rispetto e responsabilita'.
7. Scopo del progetto.
8. Persone e responsabilita' dietro il sistema.
9. Origine a Gussago e territorio iniziale di Brescia e provincia.
10. FAQ su identita', provenienza e specializzazione.
11. Invito a valutare il servizio sul prossimo lavoro.

Materiali: persone al lavoro, laboratorio e immagini autentiche della falegnameria. Non usare ritratti di repertorio per rappresentare titolari o dipendenti. Nel testo usare la relazione gia' confermata dal titolare: EasyBatt e' un marchio di Falegnameria Spini Gianluca e Marco snc. Verificare la formulazione dell'agenzia "ramo d'azienda" prima di adottarla.

## Prova EasyBatt

Obiettivo: raccogliere una richiesta concreta senza obbligare a registrarsi o acquistare. Fonte: documento 6, sezioni 1-8.

1. Apertura: valutare EasyBatt sul prossimo lavoro.
2. Benefici per chi posa.
3. Breve spiegazione del sistema che rende possibile il risultato.
4. Tre passaggi: raccontare il progetto, valutarlo insieme, organizzare il lavoro se adatto.
5. Rassicurazione: si puo' iniziare anche senza metri esatti o documentazione completa.
6. Modulo Raccontaci il progetto.
7. FAQ prima dell'invio: impegno, misure, planimetria, territorio e idoneita'.
8. Presentazione della persona che seguira' la richiesta.

Il pulsante del modulo e' "Valuta il mio progetto". Prova non significa lavorazione gratuita e l'invio non equivale a un ordine. Non promettere tempi di risposta che non siano stati concordati.

| Campo | Comportamento previsto |
| --- | --- |
| Nome e cognome, email, telefono | Obbligatori secondo il documento dell'agenzia |
| Azienda | Facoltativa |
| Professione | Scelta del mestiere; prevedere anche Privato per non escludere il pubblico gia' accolto dall'app |
| Comune e provincia del cantiere | Obbligatori |
| Tipo di intervento | Nuova costruzione, ristrutturazione, sostituzione, altro |
| Metri indicativi | Non lo so, fino a 50, oltre 50 fino a 100, oltre 100 fino a 200, oltre 200 |
| Periodo previsto | Appena possibile, entro 30 giorni, 1-3 mesi, oltre 3 mesi, non definito |
| Note | Facoltative |
| Planimetria o documento | Facoltativo; caricamento da attivare con la gestione protetta degli allegati |
| Informativa e preferenza marketing | Gestione distinta, con testi approvati; marketing facoltativo |

Il modulo deve gestire invio in corso, errori per campo, errore di ricezione e invio riuscito. Il messaggio di conferma compare soltanto dopo che la richiesta e' stata salvata. In una semplice anteprima non si simula un invio riuscito.

### Conferma della richiesta

La pagina `/grazie-prova-easybatt` conferma la ricezione e spiega i passaggi successivi: lettura, ricontatto e valutazione. Propone approfondimenti su Come funziona e Il sistema. Non sostituisce la conferma email e non contiene dati personali nell'indirizzo.

### Gestione dei contatti

Brevo e' stato confermato dal titolare come destinazione futura. La configurazione effettiva e il piano necessario restano da verificare prima dell'integrazione. La ricezione e' predisposta in Supabase con una richiesta distinta per progetto e una coda privata per Brevo creata nella stessa transazione. Non sono ancora implementati il connettore, le email automatiche o le campagne.

L'admin comprende l'elenco richieste, filtro per stato, dettagli, note interne e data di ricontatto. Gli aggiornamenti verificano la revisione per non sovrascrivere modifiche concorrenti e sono separati da Salva e pubblica del catalogo. La conferma `/grazie-prova-easybatt` richiede una ricevuta firmata, generata solo dopo il salvataggio; non e' una conferma dell'invio di un'email. Attivazione e limiti sono descritti in `docs/supabase-setup.md`, sezione Richieste progetto.

Il percorso previsto e': richiesta ricevuta, registrazione del progetto, creazione o aggiornamento del contatto nel CRM, conferma al richiedente, notifica al titolare e attivita' di ricontatto. Piu' richieste della stessa persona devono rimanere progetti distinti, non sovrascriversi.

Conservare provenienza, professione, territorio, tempi, stato della richiesta e preferenze di contatto. La registrazione di un account e l'assegnazione dei listini rimangono processi separati. Gli allegati dei clienti non vanno nel contenitore pubblico delle fotografie dei battiscopa.

## Quanto mi costa

Nella navigazione pubblica il comando e' **Calcola il prezzo**; l'indirizzo
`/quanto-mi-costa` rimane invariato e il titolo e' **Quanto mi costa EasyBatt?**.
Il risultato e' una stima indicativa autonoma, senza richiesta di contatto o ordine.
**Prova EasyBatt** e' invece la valutazione di un lavoro concreto con ricontatto:
non e' una demo del calcolatore e non richiede una stima precedente. Il risultato
collega al modulo con **Valutiamo il tuo progetto**, mentre WhatsApp resta un canale
alternativo per condividere il riepilogo. Il collegamento al modulo registra solo
la provenienza: il trasferimento automatico di misure, modello e servizi e' ancora
da implementare, non viene presentato come disponibile.

Il preventivatore rimane operativo e conserva calcoli, selezione dei modelli, immagini, tariffe e listini autorizzati. Non e' necessario riscriverne il funzionamento per realizzare le pagine informative.

- Servizio prima della fornitura opzionale, mantenendo l'impostazione gia' concordata.
- Per il materiale proprio del cliente non mostrare come certi costi logistici che richiedono ancora una valutazione.
- Preventivo indicativo distinto dall'ordine e dalla conferma di fattibilita'.
- Collegamento a Prova EasyBatt con possibilita' futura di riutilizzare il riepilogo, senza far reinserire dati gia' forniti.
- WhatsApp resta un canale disponibile, ma non l'unico modo di registrare una richiesta.

Il calcolatore di risparmio citato nei magneti dell'agenzia e' un altro strumento: confronta tempo e costo del metodo tradizionale. Non viene introdotto senza dati attendibili e non sostituisce Quanto mi costa.

## Identita visiva e materiali mancanti

Verde `#3A958E` e giallo `#FCC719` sono i riferimenti del marchio indicati dall'agenzia. Il logo e il payoff attuali restano riconoscibili. Le pagine informative possono alternare superfici neutre e scure senza trasformare tutto il sito in una successione di riquadri. Contrasto, leggibilita' e stati dei controlli vanno verificati: il colore del marchio non garantisce da solo la leggibilita' del testo.

Il riferimento tipografico del PDF riporta "AROBOTO": confermare con l'agenzia il nome del carattere prima di sostituire quello esistente. Non e' un vincolo per definire la struttura.

| Spazio | Formato di progetto | Anteprima senza materiale definitivo | Versione pubblica senza materiale definitivo |
| --- | --- | --- | --- |
| Apertura Home | Video orizzontale con immagine di copertina | Segnaposto o immagine dimostrativa identificata | Immagine pertinente autorizzata; nessun video di terzi presentato come EasyBatt |
| Fasi del processo | Foto o brevi filmati con proporzioni stabili | Segnaposto nominati per fase | Sequenza grafica esplicativa o foto reali disponibili |
| Software | Schermata leggibile | Area riservata alla schermata prevista | Spiegazione testuale finche' manca una schermata utilizzabile |
| Codici e planimetria | Dettagli affiancati e ingrandibili | Esempio dimostrativo esplicitamente identificato | Esempio autentico e anonimizzato oppure omissione del visual |
| Persone | Foto nel contesto di lavoro | Segnaposto della foto da produrre | Testo senza ritratti sostitutivi |
| Casi e testimonianze | Schede di lavori documentati | Sezione predisposta ma non pubblicata | Sezione e relativi collegamenti nascosti |

Gli spazi vengono riservati nel progetto e nell'anteprima: non si lasciano grandi vuoti o scritte "in arrivo" nel sito pubblico. I video alternativi possono servire a studiare il montaggio, ma non devono suggerire che macchinari, persone o cantieri di altre aziende appartengano a EasyBatt.

Per l'implementazione prevedere immagini di copertina, comandi video accessibili, rispetto delle preferenze di movimento ridotto e proporzioni responsive senza tagliare i dettagli importanti. Gli eventuali video esterni richiedono una scelta di integrazione prima della pubblicazione.

### Gestione successiva dall admin

Estendere l'admin esistente con contenuti del sito separati dai prodotti: titolo, testo, immagine, testo alternativo, copertina video, collegamento video, visibilita' e stato di approvazione del materiale. Il caricamento video diretto non va dato per disponibile: storage, formati e modalita' di riproduzione sono ancora da scegliere.

Anteprima e pubblicazione devono restare distinte. Le immagini campione dei modelli non diventano automaticamente fotografie di cantieri realizzati. L'importazione del listino non deve sovrascrivere i contenuti delle pagine.

## Continuita e pubblicazione

Gli indirizzi esistenti di Come funziona, Quanto mi costa, Account e Admin sono conservati. I benefici sono presentati nella Home e nella pagina professionisti; `/perche-conviene` reindirizza in modo permanente verso `/per-professionisti#benefici`.

Le FAQ restano specifiche di ciascuna pagina. Al lancio non serve aggiungere una pagina FAQ autonoma: dalla Home si raggiungono le sezioni pertinenti. Non pubblicare il comando generico "Leggi tutte le domande" senza una destinazione che le raccolga davvero. Lo stesso vale per "Guarda i lavori": nessun collegamento a pagine vuote.

Per ogni pagina predisporre titolo, descrizione, gerarchia delle intestazioni e collegamenti interni coerenti. Non indicizzare anteprime, conferme di richiesta o aree riservate; questa esclusione non sostituisce l'autenticazione delle aree private.

## Ordine di realizzazione

1. Struttura condivisa: navigazione, footer, colori e comportamento responsive.
2. Home e Come funziona, con posizioni definite per i materiali ancora mancanti.
3. Per i professionisti, Il sistema e Chi siamo, usando i testi dell'agenzia e gli adattamenti esplicitati qui.
4. Presentazione di Prova EasyBatt e definizione finale del modulo; nessun modulo pubblico operativo prima di avere una ricezione affidabile.
5. Gestione contatti: ricezione persistente, conferme, notifiche e integrazione CRM concordata.
6. Gestione dei contenuti nell'admin e sostituzione progressiva dei materiali provvisori.
7. Verifica su desktop e mobile, controllo collegamenti e preventivatore, revisione dei contenuti e pubblicazione.

Le pagine possono essere costruite prima di disporre di tutte le riprese. Prima del rilascio pubblico devono invece essere pronte le destinazioni dei pulsanti principali, le condizioni operative dichiarate, i recapiti presidiati e le informative applicabili.

## Verifiche prima del rilascio

- Ordine dei contenuti confrontato con i sei documenti dell'agenzia; note interne escluse dalle pagine.
- Fornitura opzionale e ruolo del posatore sempre chiari; eventuale posa aggiuntiva distinta dal servizio principale.
- Nessuna testimonianza, percentuale, cantiere o prova gratuita inventata.
- Foto e video utilizzabili e approvati; nessun dato cliente visibile nelle schermate.
- Sezioni mancanti nascoste anche nei rimandi; nessun invio simulato presentato come riuscito.
- Preventivatore, catalogo, importazione JSON e listini riservati invariati nel comportamento.
- Testi leggibili, menu utilizzabile da tastiera e nessuna sovrapposizione su mobile.
- Conferma di ricezione verificata anche in caso di errore email o CRM, senza perdere la richiesta.

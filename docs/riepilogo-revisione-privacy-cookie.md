# EasyBatt revisione Privacy e Cookie

Scheda per agenzia e consulente privacy - 6 ottobre 2026

Chiediamo una revisione del sito **www.easy-batt.it** e la finalizzazione delle
informative prima di aprire il modulo di richiesta progetto. Il sito e il
preventivatore sono gia' pubblici: le verifiche su questi servizi servono anche
mentre il modulo e' disattivato. Questa scheda descrive il funzionamento e le
scelte aziendali; non e' un'informativa da pubblicare o un'attestazione di conformita'.

## Azienda e contatti

EasyBatt e' un marchio di **Falegnameria Spini Gianluca e Marco snc**.

- Sede: Via Benedetto Castelli 40/42, 25064 Gussago (BS).
- Partita IVA: 03098310984.
- Contatto clienti e privacy: **info@easy-batt.it**, casella condivisa Microsoft 365.
- Gestione delle richieste: il titolare, eventualmente affiancato da una persona autorizzata.
- Avvio commerciale del progetto previsto a inizio 2027.

## Cosa fa il sito

**Oggi:** presenta il servizio di misurazione e taglio dei battiscopa, con
fornitura opzionale del materiale. Il preventivatore calcola una stima senza
account e non invia automaticamente un ordine o una richiesta. Sono disponibili
contatti via email e collegamenti WhatsApp, anche con riepilogo della stima.

La ricerca dell'indirizzo con Google e' stata resa facoltativa: si carica dopo
un pulsante accompagnato da un avviso. Da quel momento Google riceve il testo
digitato per i suggerimenti; alla conferma riceve i dati necessari al calcolo
della distanza. E' possibile inserire i chilometri manualmente senza attivare
Google. La scelta non viene conservata dopo la ricarica. Non si tratta ancora
di un sistema completo per raccogliere e revocare eventuali consensi.

**Prossima apertura:** il modulo Prova EasyBatt, ancora disattivato, permettera'
di descrivere un lavoro e chiedere un ricontatto. Le richieste saranno salvate
in Supabase e consultate nell'area amministrativa, senza email automatiche.

**Rinviati:** account clienti, condizioni riservate B2B, newsletter e collegamento
a Brevo. Il modulo progetti non raccoglie consenso marketing e non iscrive a
campagne. La predisposizione interna per Brevo non trasferisce dati al servizio.

## Dati del modulo

- Nome e cognome, email, telefono, professione, comune e provincia del cantiere,
  tipo di intervento: attualmente obbligatori.
- Metri indicativi e periodo previsto: selezionabili anche come non ancora noti.
- Azienda e note: facoltative. Nessun allegato previsto.
- Data e identificativo della richiesta, versione dell'informativa e presa visione;
  stato, note interne, ricontatto programmato e ultimo contatto effettivo.
- Pagina di provenienza e, se presenti, tre etichette del collegamento che
  identificano fonte, mezzo e campagna. Sono associate alla richiesta, non
  statistiche anonime; non e' implementato un tracciamento comportamentale.

Sono inoltre predisposti identificatori derivati da IP ed email per limitare
invii ripetuti. I contatori piu' vecchi di due giorni vengono rimossi al successivo
nuovo invio, non tramite una pulizia periodica automatica.

## Scelte di conservazione

Per i progetti che non diventano lavori abbiamo scelto **12 mesi dall'ultimo
contatto effettivo**, poi cancellazione. E' una scelta aziendale da validare,
non un termine che stiamo presentando come imposto dalla legge.

L'admin permette di individuare e cancellare singole richieste scadute con
conferma. La cancellazione non e' automatica; una nota interna non rinnova il
termine. I progetti diventati clienti seguono una gestione separata da definire.
Il pulsante non elimina email, messaggi WhatsApp o backup e non gestisce le
richieste di cancellazione anticipata: occorre una procedura distinta.

## Servizi e cookie

| Servizio | Utilizzo |
| --- | --- |
| Vercel | Pubblicazione del sito ed elaborazione delle richieste al server. |
| Supabase | Catalogo e immagini pubbliche; archivio riservato dei progetti predisposto. Account futuri. |
| Google Maps Platform | Suggerimenti indirizzi e calcolo della distanza, dopo attivazione esplicita. |
| Microsoft 365 | Posta della casella info@easy-batt.it. |
| WhatsApp | Contatto esterno scelto dall'utente; il riepilogo viene trasmesso al servizio aprendo il collegamento. |
| Serverplan | Registrazione del dominio; non ospita la casella Microsoft 365. |

Nel controllo tecnico del 6 ottobre non sono stati rilevati Google Analytics
o pixel Meta nei percorsi provati. Le risposte delle immagini Supabase inviavano
il cookie `__cf_bm`: nel browser di prova non veniva salvato, con motivo di rifiuto
`InvalidDomain`. La documentazione del fornitore lo descrive come cookie di
protezione dagli accessi automatizzati; va incluso nella verifica, senza
concludere che il sito sia privo di cookie.
[Riferimento Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/).

Il futuro modulo imposta il cookie `easybatt-project-receipt` dopo un invio
riuscito, per 30 minuti e soltanto sulla pagina di conferma: contiene un
identificativo firmato, non i recapiti. Questo percorso non e' stato provato
con invii reali online. I controlli del browser non verificano log, backup,
accessi interni dei fornitori o ogni possibile dispositivo.

## Sei verifiche richieste

1. **Informativa e basi del trattamento.** Finalizzare i testi per sito,
   preventivatore e richieste, distinguendo privati, referenti aziendali,
   sicurezza e provenienza delle richieste. Confermare se il telefono debba
   restare obbligatorio insieme all'email e l'eventuale presenza di un DPO.
2. **Google e cookie.** Verificare la versione pubblicata dopo la modifica,
   classificare gli strumenti effettivi e indicare se servono ulteriori
   controlli di consenso, rifiuto e revoca. Non presumere sufficiente il
   pulsante Google, ne' necessario un banner per qualunque cookie.
   [Linee guida del Garante](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/9677876).
3. **Fornitori.** Confermare soggetti contrattuali, ruoli, accordi di trattamento,
   subfornitori, localizzazioni ed eventuali trasferimenti fuori dallo Spazio
   economico europeo. Esaminare le configurazioni effettive, non soltanto il sito.
4. **Tempi e copie.** Validare i 12 mesi e definire conservazione di email,
   WhatsApp, lavori acquisiti, log e backup, compresa la gestione dei ripristini.
5. **Organizzazione.** Definire accessi e istruzioni per la persona incaricata,
   chi controlla le scadenze e come gestire accesso ai dati, rettifiche ed
   eliminazioni richieste dagli interessati prima dei 12 mesi.
6. **Via libera operativo.** Restituire i testi revisionati, un elenco degli
   interventi necessari e una distinzione tra cio' che serve prima di aprire
   il modulo e cio' che puo' attendere la futura fase account e marketing.

Il riferimento per i contenuti dell'informativa e' l'
[articolo 13 del GDPR](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32016R0679).
La verifica richiesta deve riguardare anche le procedure reali, non solo il testo.

## Materiale disponibile

Sono disponibili la [bozza tecnica EasyBatt](privacy-policy-draft.md) e le
informative Word del sito Falegnameria Spini. Queste ultime riguardano un sito
diverso, con plugin WordPress, e non vanno trasferite senza adattamento.
Per documentare le configurazioni si possono fornire schermate prive di segreti;
non condividere password, chiavi API o il file `.env.local`.

## Messaggio di accompagnamento

Oggetto: Revisione Privacy e Cookie del sito EasyBatt

Buongiorno, stiamo preparando EasyBatt, marchio della Falegnameria Spini, per
l'avvio a inizio 2027. Il sito e il preventivatore sono gia' online; prima di
aprire il modulo di richiesta progetto desideriamo completare la revisione
Privacy e Cookie. Allego il riepilogo del funzionamento e delle scelte gia'
definite. Potete indicarci tempi e costo della revisione, i documenti che vi
servono e gli eventuali interventi necessari? Account e marketing sono rinviati.
Grazie, Gianluca Spini.

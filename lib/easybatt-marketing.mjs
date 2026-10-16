export const marketingNavigation = [
  { label: "Come funziona", href: "/come-funziona" },
  { label: "Per i professionisti", href: "/per-professionisti" },
  { label: "Il sistema", href: "/il-sistema" },
  { label: "Chi siamo", href: "/chi-siamo" },
];
export const marketingMedia = {
  // `position` places the photo inside the hero: the white veil covers the
  // left (desktop) or the top (mobile), so the subject must sit right/bottom.
  hero: {
    src: "/marketing/originali/pezzi-codificati-apertura.webp",
    alt: "Battiscopa in legno già tagliati, ognuno con l'etichetta del suo codice, accanto alla planimetria di posa",
    caption: "Pezzi codificati e planimetria di posa",
    width: 1600, height: 720,
    position: "80% bottom",
  },
  kit: {
    src: "/marketing/originali/kit-codificato-v2.webp",
    alt: "Battiscopa in legno con etichette e planimetria: i codici dei pezzi corrispondono a quelli sulla pianta",
    caption: "Pezzi codificati e planimetria di posa, pronti insieme.",
    width: 1600, height: 1200,
  },
  rilievo: {
    src: "/marketing/originali/rilievo-laser.webp",
    alt: "Tecnico durante il rilievo di una stanza con misuratore laser su treppiede",
    caption: "Il rilievo parte dalle misure reali della stanza.",
    width: 1600, height: 900,
    position: "right bottom",
    mobileAspectRatio: "5 / 4",
  },
  rilievoStanza: {
    src: "/marketing/originali/rilievo-stanza.webp",
    alt: "Misuratore laser robotico su treppiede al centro di una stanza vuota, con il tablet appoggiato a terra",
    caption: "Il laser misura la stanza com'è davvero, angoli compresi.",
    width: 1600, height: 790,
  },
  rilievoIngresso: {
    src: "/marketing/originali/rilievo-ingresso.webp",
    alt: "Misuratore laser robotico su treppiede durante il rilievo di un ingresso con pareti verdi, porte e rientranze",
    caption: "Il rilievo laser segue la forma reale degli ambienti, anche nei passaggi e nelle rientranze.",
    width: 1600, height: 1200,
  },
  calcolo: {
    src: "/marketing/originali/software-calcolo-stanza-f.webp",
    alt: "Pianta di una stanza irregolare con rientranze: il software identifica i pezzi di battiscopa con i codici da F01 a F15",
    caption: "Il software calcola i pezzi seguendo la forma reale della stanza.",
    width: 960, height: 720,
  },
  software: {
    src: "/marketing/originali/software-planimetria-v2.webp",
    alt: "Schermata di lavoro: pianta della stanza con i battiscopa contrassegnati dai codici da C01 a C09",
    caption: "Le misure diventano pezzi, ciascuno con la sua posizione.",
    width: 1440, height: 750,
  },
  lavorazione: {
    src: "/marketing/originali/lavorazione-battiscopa-v2.webp",
    alt: "Battiscopa in legno etichettato O03 posizionato nella macchina in laboratorio",
    caption: "La preparazione del battiscopa in laboratorio.",
    width: 1600, height: 901,
  },
  troncatrice: {
    src: "/marketing/originali/troncatrice-angolo.webp",
    alt: "Il pezzo F07 sulla troncatrice: l'etichetta indica 42,5 gradi e il display della macchina è impostato a 42,5",
    caption: "Pezzo F07: l'angolo sull'etichetta e quello sulla troncatrice sono gli stessi, 42,5°.",
    width: 1600, height: 1160,
  },
  codifica: {
    src: "/marketing/originali/etichetta-pezzo-v2.webp",
    alt: "Dettaglio dell'etichetta D02 su un battiscopa: codice del pezzo, lunghezza e angoli di taglio",
    caption: "Il codice identifica il pezzo. Misure e angoli accompagnano la lavorazione.",
    width: 1050, height: 640,
  },
  planimetria: {
    src: "/marketing/originali/software-dettaglio-codici-v2.webp",
    alt: "Dettaglio della pianta con i codici L06, L07, L08 e L09 collegati ai rispettivi tratti di battiscopa",
    caption: "Ogni codice indica un punto preciso sulla pianta.",
    width: 1490, height: 777,
  },
  consegna: {
    src: "/marketing/originali/consegna-cantiere.webp",
    alt: "Battiscopa già tagliati, imballati ed etichettati, appoggiati sul parquet del cantiere prima della posa",
    caption: "Un lavoro EasyBatt arrivato in cantiere: i pezzi sono pronti da posare.",
    width: 1333, height: 811,
  },
  ambiente: {
    src: "/marketing/originali/ambiente-battiscopa-bianco-v2.webp",
    alt: "Battiscopa bianco posato lungo un mobile a muro, su pavimento in legno a spina di pesce",
    caption: "Il battiscopa nell'ambiente finito.",
    width: 900, height: 550,
  },
};
export const projectEmail = "info@easy-batt.it";
export const projectEmailHref = `mailto:${projectEmail}?subject=${encodeURIComponent("Valutazione progetto EasyBatt")}`;
export const processSteps = [
  {
    id: "rilievo",
    media: "rilievoIngresso",
    icon: "scan",
    title: "Rilievo",
    subtitle: "Misuriamo ogni stanza.",
    text: "Veniamo sul posto e misuriamo tutta la casa, stanza per stanza, con un misuratore laser robotico. Angoli compresi.",
  },
  {
    id: "elaborazione",
    media: "calcolo",
    icon: "workflow",
    title: "Calcolo",
    subtitle: "Il software calcola i tagli.",
    text: "Il nostro software usa le misure per calcolare ogni taglio, al decimo di grado, e la posizione di ogni pezzo.",
  },
  {
    id: "lavorazione",
    media: "lavorazione",
    icon: "settings",
    title: "Taglio",
    subtitle: "In laboratorio, non in cantiere.",
    text: "Una troncatrice a controllo numerico taglia ogni pezzo con le misure calcolate dal software.",
  },
  {
    id: "codifica",
    media: "codifica",
    icon: "tag",
    title: "Codifica",
    subtitle: "Ogni pezzo ha il suo codice.",
    text: "Su ogni pezzo mettiamo un'etichetta con il suo codice.",
  },
  {
    id: "planimetria",
    media: "planimetria",
    icon: "map",
    title: "Planimetria",
    subtitle: "Sai dove va ogni pezzo.",
    text: "Sulla planimetria di posa, su carta, ogni codice è nel punto dove va il pezzo.",
  },
  {
    id: "posa",
    media: "consegna",
    icon: "package",
    title: "Pronti da posare",
    subtitle: "Tu pensi al montaggio.",
    text: "Ricevi i battiscopa già tagliati, codificati e accompagnati dalla planimetria. Tu ti occupi della posa.",
  },
];
export const homeFaqs = [
  {
    question: "Chi prende le misure?",
    answer:
      "Le prendiamo noi. Veniamo sul posto e rileviamo la planimetria di ogni stanza con un misuratore laser robotico.",
  },
  {
    question: "Come so dove va ogni pezzo?",
    answer:
      "Ogni pezzo ha un codice. Lo stesso codice è sulla planimetria di posa, nel punto dove va montato.",
  },
  {
    question: "E se gli angoli non sono a 90°?",
    answer:
      "Va bene lo stesso. Il laser misura ogni angolo com'è davvero, per esempio 87° o 93°, e il software calcola il taglio al decimo di grado. Se c'è qualcosa di particolare, lo vediamo insieme prima di tagliare.",
  },
  {
    question: "Cosa ricevo?",
    answer:
      "I pezzi già tagliati e codificati. Con i pezzi ricevi la planimetria di posa, su carta.",
  },
  {
    question: "Devo comprare anche il battiscopa?",
    answer:
      "No. Puoi comprarlo da noi oppure usare il tuo. Se usi il tuo, prima controlliamo insieme che vada bene e come farlo arrivare da noi.",
  },
  {
    question: "Come posso provare EasyBatt?",
    answer:
      "Raccontaci il lavoro nella pagina Prova EasyBatt: dov'è il cantiere, che lavoro è e quando vuoi posare. Non servono le misure. Poi ti ricontattiamo.",
  },
];
export const methodFaqs = [
  {
    question: "A cosa serve il software?",
    answer:
      "Dalle misure delle stanze calcola come tagliare ogni pezzo. Poi dà a ogni pezzo il suo codice e prepara la planimetria di posa.",
  },
  {
    question: "Come vengono preparati i battiscopa?",
    answer:
      "Prima misuriamo le stanze con il laser. Il software calcola i tagli. Poi una troncatrice a controllo numerico taglia ogni pezzo su quelle misure.",
  },
  {
    question: "Devo tagliare i battiscopa in cantiere?",
    answer:
      "I pezzi arrivano già tagliati sulle misure di ogni stanza. Può servire un piccolo adattamento sul posto.",
  },
  {
    question: "EasyBatt fa il lavoro del posatore?",
    answer:
      "No. Noi prepariamo i pezzi. La posa la fai tu, con la tua esperienza.",
  },
  {
    question: "Va bene anche per una ristrutturazione?",
    answer:
      "Sì. È utile soprattutto nelle case abitate: i pezzi arrivano già tagliati, quindi meno polvere e meno rumore durante la posa.",
  },
];

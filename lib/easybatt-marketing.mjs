export const marketingNavigation = [
  { label: "Come funziona", href: "/come-funziona" },
  { label: "Per i professionisti", href: "/per-professionisti" },
  { label: "Il sistema", href: "/il-sistema" },
  { label: "Chi siamo", href: "/chi-siamo" },
];
export const marketingMedia = {
  hero: {
    src: "/marketing/battiscopa-ambientazione.webp",
    alt: "Ambientazione illustrativa: battiscopa bianco lungo una parete, su pavimento in legno chiaro",
    caption: "Ambientazione illustrativa generata con AI",
  },
};
export const projectEmail = "info@easy-batt.it";
export const projectEmailHref = `mailto:${projectEmail}?subject=${encodeURIComponent("Valutazione progetto EasyBatt")}`;
export const processSteps = [
  {
    id: "rilievo",
    icon: "scan",
    title: "Rilievo",
    subtitle: "Misuriamo la stanza.",
    text: "Veniamo sul posto e misuriamo la stanza con un misuratore laser robotico, angoli compresi.",
  },
  {
    id: "elaborazione",
    icon: "workflow",
    title: "Calcolo",
    subtitle: "Il software calcola i tagli.",
    text: "Il nostro software usa le misure per calcolare ogni taglio, al decimo di grado, e la posizione di ogni pezzo.",
  },
  {
    id: "lavorazione",
    icon: "settings",
    title: "Taglio",
    subtitle: "In laboratorio, non in cantiere.",
    text: "Una troncatrice a controllo numerico taglia ogni pezzo con le misure calcolate dal software.",
  },
  {
    id: "codifica",
    icon: "tag",
    title: "Codifica",
    subtitle: "Ogni pezzo ha il suo codice.",
    text: "Su ogni pezzo mettiamo un'etichetta con il suo codice.",
  },
  {
    id: "planimetria",
    icon: "map",
    title: "Planimetria",
    subtitle: "Sai dove va ogni pezzo.",
    text: "Sulla planimetria di posa, su carta, ogni codice è nel punto dove va il pezzo.",
  },
  {
    id: "posa",
    icon: "package",
    title: "Pronti da posare",
    subtitle: "Tu pensi al montaggio.",
    text: "Ricevi i battiscopa già tagliati, codificati e accompagnati dalla planimetria. In cantiere non devi più misurare e tagliare. Monti e basta.",
  },
];
export const homeFaqs = [
  {
    question: "Chi prende le misure?",
    answer:
      "Le prendiamo noi. Veniamo sul posto e rileviamo la planimetria della stanza con un misuratore laser robotico.",
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
      "Dalle misure della stanza calcola come tagliare ogni pezzo. Poi dà a ogni pezzo il suo codice e prepara la planimetria di posa.",
  },
  {
    question: "Come vengono preparati i battiscopa?",
    answer:
      "Prima misuriamo la stanza con il laser. Il software calcola i tagli. Poi una troncatrice a controllo numerico taglia ogni pezzo su quelle misure.",
  },
  {
    question: "Devo tagliare i battiscopa in cantiere?",
    answer:
      "No. I pezzi arrivano già tagliati sulle misure della stanza. Può capitare qualche piccolo ritocco, ma è raro.",
  },
  {
    question: "EasyBatt fa il lavoro del posatore?",
    answer:
      "No. Noi prepariamo i pezzi. La posa la fai tu, con la tua esperienza.",
  },
  {
    question: "Va bene anche per una ristrutturazione?",
    answer:
      "Sì. È utile soprattutto nelle case abitate: non tagli dentro casa, quindi meno polvere e meno rumore.",
  },
];

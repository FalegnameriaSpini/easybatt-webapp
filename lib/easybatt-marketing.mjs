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
    subtitle: "Partiamo dal tuo ambiente.",
    text: "Rileviamo l'ambiente con tecnologia laser e raccogliamo le informazioni necessarie per preparare i singoli elementi.",
  },
  {
    id: "elaborazione",
    icon: "workflow",
    title: "Elaborazione",
    subtitle: "Le misure diventano progetto.",
    text: "Il software proprietario EasyBatt elabora i dati del rilievo e organizza le informazioni per la lavorazione e la posizione dei pezzi.",
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
    subtitle: "Ogni pezzo ha un riferimento.",
    text: "Identifichiamo i singoli elementi per collegarli alla posizione prevista e rendere più semplice l'organizzazione del montaggio.",
  },
  {
    id: "planimetria",
    icon: "map",
    title: "Planimetria",
    subtitle: "Sai dove va ogni elemento.",
    text: "Una planimetria di posa associa i codici dei pezzi alla loro posizione nell'ambiente: un riferimento da consultare durante il lavoro.",
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
    question: "E se i muri non sono dritti?",
    answer:
      "Il laser misura muri e angoli come sono davvero, anche se non sono dritti. Se c'è qualcosa di particolare, lo vediamo insieme prima di tagliare.",
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

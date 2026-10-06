import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  FaqSection,
  ProjectContact,
} from "@/components/marketing/site-sections";
import styles from "@/components/marketing/marketing.module.css";

export const metadata = {
  title: "Chi siamo | EasyBatt e Falegnameria Spini a Gussago",
  description:
    "EasyBatt nasce dall'esperienza di Falegnameria Spini a Gussago, Brescia. Tecnologia e conoscenza del lavoro su misura per preparare il battiscopa prima della posa.",
};
const values = [
  [
    "Onestà",
    "Dire le cose come stanno.",
    "Essere chiari su ciò che possiamo fare, sui limiti e su ciò che è realmente utile al cliente. Una relazione di fiducia viene prima di una promessa fatta soltanto per vendere.",
  ],
  [
    "Miglioramento continuo",
    "Chiederci se esiste un modo migliore.",
    "Osservare, provare, imparare e migliorare. Anche un mestiere tradizionale può evolvere senza perdere la propria esperienza.",
  ],
  [
    "Collaborazione",
    "Il valore deve essere reciproco.",
    "EasyBatt non nasce per sostituire il professionista, ma per lavorare insieme a lui. Competenze diverse possono aiutarsi e migliorare il risultato finale.",
  ],
  [
    "Rispetto",
    "Per il lavoro, le persone e gli ambienti.",
    "Attenzione per chi lavora, per chi vive gli spazi e per chi ci affida il progetto. Anche ridurre le lavorazioni evitabili è una forma di rispetto.",
  ],
  [
    "Responsabilità",
    "Mantenere gli impegni presi.",
    "Ogni elemento preparato entra nel lavoro di un altro professionista. Precisione, organizzazione e affidabilità sono una responsabilità verso chi viene dopo di noi.",
  ],
];
const faqs = [
  {
    question: "Chi è EasyBatt?",
    answer:
      "EasyBatt è un marchio specializzato nella preparazione di battiscopa su misura, già tagliati, codificati e organizzati per la posa tramite un processo dedicato.",
  },
  {
    question: "Qual è il legame con Falegnameria Spini?",
    answer:
      "EasyBatt è un marchio di Falegnameria Spini Gianluca e Marco snc. Nasce dall'esperienza della falegnameria nella progettazione e nelle lavorazioni su misura.",
  },
  {
    question: "Dove nasce il progetto?",
    answer:
      "A Gussago, in provincia di Brescia. La sede di Falegnameria Spini è in Via Benedetto Castelli 40/42, 25064 Gussago (BS).",
  },
  {
    question: "Perché è nato EasyBatt?",
    answer:
      "Dall'osservazione delle attività che precedono la posa e dalla volontà di preparare prima ciò che normalmente viene eseguito sul posto.",
  },
  {
    question: "EasyBatt è una falegnameria?",
    answer:
      "Nasce dall'esperienza di una falegnameria, ma ha una specializzazione precisa: preparare battiscopa su misura e organizzati per la posa attraverso un sistema dedicato.",
  },
  {
    question: "In quale territorio opera?",
    answer:
      "Nella fase iniziale il servizio è rivolto prioritariamente ai professionisti di Brescia e provincia. Le condizioni del singolo progetto vengono valutate insieme.",
  },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <MarketingHero
        content={{
          eyebrow: "Falegnameria Spini / Gussago, Brescia",
          title: "Chi siamo",
          statement: "EasyBatt nasce dal lavoro su misura.",
          description:
            "Un marchio nuovo. L'esperienza concreta di chi progetta, produce e risolve problemi ogni giorno.",
          href: "#origine",
          action: "Scopri le nostre origini",
        }}
      />

      <section id="origine" className={styles.section}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Prima di EasyBatt"
            title="Una cultura del su misura costruita sul lavoro reale."
          />
          <div className={styles.storyBody}>
            <p>
              EasyBatt è un marchio di{" "}
              <strong>Falegnameria Spini Gianluca e Marco snc</strong>, a
              Gussago, in provincia di Brescia.
            </p>
            <p>
              Progettazione, produzione e installazione fanno parte di un
              percorso che parte dall&apos;ambiente e arriva al risultato
              finito. Alla competenza artigianale si affiancano misurazione
              professionale, progettazione digitale e tecnologia applicata alla
              produzione.
            </p>
            <p>
              È all&apos;interno di questa cultura che prende forma EasyBatt.
            </p>
            <a
              href="https://www.falegnameriaspini.it"
              className={styles.sectionLink}
            >
              Scopri Falegnameria Spini{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="La domanda iniziale"
            title="Perché fare sul posto ciò che possiamo preparare prima?"
          >
            EasyBatt nasce osservando il lavoro. Dalla passione per cercare un
            modo migliore di organizzarlo e dalla volontà di non fermarsi a come
            è sempre stato fatto.
          </SectionHeading>
          <p>
            Rilievo laser, software proprietario, lavorazione CNC, codifica e
            planimetria diventano parti di un unico sistema: portare in cantiere
            un battiscopa già preparato per la posa.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Dall'esperienza al metodo"
            title="Una specializzazione che nasce da competenze concrete."
          />
          <div className={styles.comparison}>
            <div>
              <h3>Falegnameria Spini</h3>
              <ul className={styles.plainList}>
                <li>Lavorazioni su misura e conoscenza degli ambienti.</li>
                <li>Progettazione prima della produzione.</li>
                <li>Tecnologia applicata al lavoro.</li>
                <li>Attenzione alla fase di installazione.</li>
              </ul>
            </div>
            <div>
              <h3>EasyBatt</h3>
              <ul className={styles.plainList}>
                <li>Rilievo laser dello specifico ambiente.</li>
                <li>Elaborazione e preparazione CNC.</li>
                <li>Codifica e planimetria.</li>
                <li>Battiscopa pronti da posare.</li>
              </ul>
            </div>
          </div>
          <Link href="/il-sistema" className={styles.sectionLink}>
            Scopri il sistema EasyBatt{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="La nostra idea di innovazione"
            title="Innovare non significa complicare."
          >
            La tecnologia ha valore quando evita un&apos;attività ripetitiva,
            permette di preparare prima e lascia al professionista più tempo per
            il lavoro in cui conta la sua competenza.
          </SectionHeading>
          <p>
            Non la utilizziamo per rendere il battiscopa più complesso. La
            utilizziamo per renderne più semplice la posa.
          </p>
        </div>
      </section>

      <section id="valori" className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="I nostri valori"
            title="I principi con cui vogliamo costruire EasyBatt."
          />
          <div className={styles.valuesList}>
            {values.map(([title, statement, text], index) => (
              <article key={title}>
                <span className={styles.valueNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <div>
                  <p>
                    <strong>{statement}</strong>
                  </p>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il nostro scopo"
            title="Rendere più semplice il lavoro che può essere preparato meglio."
          >
            Mettere tecnologia, esperienza e organizzazione al servizio del
            lavoro reale. Togliere complessità dove è possibile, per lasciare ai
            professionisti tempo ed energie per la propria competenza.
          </SectionHeading>
          <p>
            Non vogliamo cambiare il mestiere. Vogliamo migliorare ciò che può
            essere migliorato.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Le persone"
            title="Prima del sistema, ci sono le persone."
          />
          <div className={styles.storyBody}>
            <p>
              EasyBatt nasce da persone abituate a progettare, produrre,
              risolvere problemi e confrontarsi con ambienti reali.
            </p>
            <p>
              Dietro il rilievo, il software e ogni decisione rimane{" "}
              <strong>
                la responsabilità di chi mette il proprio nome sul lavoro
              </strong>
              .
            </p>
            <p>
              Nella fase iniziale, le richieste vengono seguite direttamente dal
              titolare per valutare il progetto con chi conosce il sistema e le
              lavorazioni.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Il nostro territorio"
            title="A Gussago, nel cuore della provincia di Brescia."
          >
            Da qui parte la prima fase di EasyBatt, dedicata ai professionisti
            di Brescia e provincia.
          </SectionHeading>
          <div>
            <MapPin size={28} aria-hidden="true" />
            <h3>Falegnameria Spini</h3>
            <address className={styles.address}>
              Via Benedetto Castelli 40/42
              <br />
              25064 Gussago (BS)
            </address>
            <Link href="/per-professionisti" className={styles.sectionLink}>
              EasyBatt per il tuo lavoro{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} title="Conosciamo meglio EasyBatt." />
      <ProjectContact />
    </MarketingShell>
  );
}

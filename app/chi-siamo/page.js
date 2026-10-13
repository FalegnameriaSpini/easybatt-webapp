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
    "Ti diciamo cosa possiamo fare e cosa no. Preferiamo la tua fiducia a una vendita in più.",
  ],
  [
    "Miglioramento continuo",
    "Chiederci se esiste un modo migliore.",
    "Guardiamo, proviamo, impariamo. Anche un mestiere tradizionale può crescere.",
  ],
  [
    "Collaborazione",
    "Lavorare insieme.",
    "EasyBatt non sostituisce il professionista: lavora con lui. Ognuno fa la parte che sa fare meglio.",
  ],
  [
    "Rispetto",
    "Per il lavoro, le persone e le case.",
    "Rispettiamo chi lavora e chi vive in casa. Togliere fatica, ma anche polvere e rumore, è una forma di rispetto.",
  ],
  [
    "Responsabilità",
    "Mantenere gli impegni presi.",
    "Ogni pezzo che prepariamo entra nel lavoro di un altro professionista. Per questo, per noi, la precisione è una responsabilità.",
  ],
];
const faqs = [
  {
    question: "Chi è EasyBatt?",
    answer:
      "È un marchio che prepara battiscopa su misura: già tagliati, codificati e pronti da posare.",
  },
  {
    question: "Qual è il legame con Falegnameria Spini?",
    answer:
      "EasyBatt è un marchio di Falegnameria Spini Gianluca e Marco snc. Nasce dall'esperienza della falegnameria nella progettazione e nelle lavorazioni su misura, e da quella maturata nell'uso delle tecnologie digitali.",
  },
  {
    question: "Dove nasce il progetto?",
    answer:
      "A Gussago, in provincia di Brescia. La sede di Falegnameria Spini è in Via Benedetto Castelli 40/42, 25064 Gussago (BS).",
  },
  {
    question: "Perché è nato EasyBatt?",
    answer:
      "Dall'idea di usare tecnologie moderne in un lavoro tradizionale come la posa del battiscopa, per renderlo più efficiente e meno faticoso. Per questo abbiamo creato una filiera digitale: laser, software, troncatrice a controllo numerico, codici e planimetria di posa.",
  },
  {
    question: "EasyBatt è una falegnameria?",
    answer:
      "Nasce dall'esperienza di una falegnameria, ma ha una specializzazione precisa: il battiscopa. Dal rilievo dell'ambiente ai pezzi già tagliati e codificati, pronti da posare.",
  },
  {
    question: "In quali zone lavorate?",
    answer:
      "Siamo a Gussago, in provincia di Brescia. Lavoriamo soprattutto in zona, ma per i lavori più grandi andiamo volentieri anche più lontano: scrivici e vediamo insieme.",
  },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <MarketingHero
        content={{
          eyebrow: "Chi siamo / Falegnameria Spini, Gussago (BS)",
          title: "EasyBatt nasce da un'esperienza reale nel lavoro su misura.",
          description:
            "Un marchio nuovo, nato dall'esperienza di chi progetta e produce su misura ogni giorno. E da una convinzione: anche in un mestiere tradizionale c'è sempre un modo per lavorare meglio.",
          href: "#origine",
          action: "Scopri da dove nasce EasyBatt",
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
              In falegnameria progettiamo e produciamo arredamenti su misura:
              dalle misure al lavoro finito. Al lavoro artigiano abbiamo unito
              misure digitali, progettazione al computer e macchine moderne.
            </p>
            <p>Da qui nasce EasyBatt.</p>
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
            title="Perché fare in cantiere quello che possiamo preparare prima?"
          >
            EasyBatt nasce guardando il lavoro di tutti i giorni, e dalla voglia
            di non fermarsi a &quot;si è sempre fatto così&quot;.
          </SectionHeading>
          <p className={styles.keyLine}>
            Non guardare il lavoro solo per quello che è oggi, ma alzare lo
            sguardo e chiedersi: possiamo farlo meglio?
          </p>
          <p>
            Da questa domanda è nato EasyBatt: laser, software, troncatrice a
            controllo numerico, codici e planimetria di posa, per portare in
            cantiere il battiscopa già pronto.
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
                <li>Arredamenti su misura.</li>
                <li>Prima si progetta, poi si produce.</li>
                <li>Misure digitali e macchine moderne.</li>
                <li>Cura del montaggio.</li>
              </ul>
            </div>
            <div>
              <h3>EasyBatt</h3>
              <ul className={styles.plainList}>
                <li>Rilievo laser di ogni stanza.</li>
                <li>Software proprietario e troncatrice a controllo numerico.</li>
                <li>Pezzi codificati e planimetria di posa.</li>
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
            La tecnologia serve quando toglie la fatica di un lavoro ripetitivo
            e lascia più tempo per quello che conta: la posa.
          </SectionHeading>
          <p>
            Non la usiamo per complicare il battiscopa. La usiamo per
            semplificarti il lavoro.
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
            title="Migliorare il modo di lavorare delle persone."
          >
            Mettiamo tecnologia ed esperienza al servizio di chi lavora.
            Togliamo fatica dove si può, per lasciare tempo ed energie al tuo
            mestiere.
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
              Dietro EasyBatt ci sono persone che ogni giorno progettano,
              producono e risolvono problemi nei cantieri.
            </p>
            <p>
              Dietro il laser, il software e ogni scelta c&apos;è sempre{" "}
              <strong>una persona che risponde del lavoro</strong>.
            </p>
            <p>
              Per ora le richieste le segue direttamente{" "}
              <strong>Gianluca Spini</strong>, titolare di Falegnameria Spini:
              parli con chi conosce il sistema e il lavoro.
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
            Da qui partiamo per i tuoi cantieri: in provincia di Brescia e, per
            i lavori più grandi, anche più lontano.
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
      <ProjectContact
        title="L'esperienza ci ha portati fin qui. Ora vogliamo portarla sul tuo prossimo lavoro."
        lead="Hai un lavoro in programma? Scopri cosa cambia quando il battiscopa arriva già preparato."
        text=""
        action="Prova EasyBatt sul tuo prossimo lavoro"
      />
    </MarketingShell>
  );
}

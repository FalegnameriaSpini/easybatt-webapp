import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ScanLine,
  Workflow,
  Settings2,
  Check,
  Tag,
  PackageCheck,
  MapPin,
} from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  ProcessSteps,
  FaqSection,
  ProjectContact,
} from "@/components/marketing/site-sections";
import { homeFaqs, marketingMedia } from "@/lib/easybatt-marketing.mjs";
import styles from "@/components/marketing/marketing.module.css";

export const metadata = {
  title: "EasyBatt | Battiscopa su misura, pronti da posare",
  description:
    "Rilievo, taglio, codifica e planimetria: EasyBatt prepara il battiscopa prima del cantiere. Un servizio per professionisti a Brescia e provincia, con fornitura opzionale.",
};

const professions = [
  [
    "posatori",
    "Posatori e parquetisti",
    "Meno tempo dedicato alla preparazione, più tempo per la posa. La tua esperienza resta al centro del risultato.",
  ],
  [
    "falegnami",
    "Falegnami",
    "Battiscopa preparati sulle misure dell'ambiente e organizzati per il montaggio, anche quando sono solo una parte del tuo lavoro.",
  ],
  [
    "imprese",
    "Imprese e ristrutturatori",
    "Una fase di finitura più organizzata e meno lavorazioni da coordinare all'interno dell'immobile.",
  ],
  [
    "rivenditori",
    "Rivenditori e showroom",
    "Un servizio di preparazione su misura da affiancare alla fornitura del battiscopa. Le modalità di collaborazione si valutano insieme.",
  ],
];

export default function EasyBattHomePage() {
  return (
    <MarketingShell>
      <MarketingHero />
      <div className={styles.promiseStrip}>
        <div className={`${styles.container} ${styles.promiseInner}`}>
          <span>
            <Check size={18} aria-hidden="true" /> Preparati prima del cantiere
          </span>
          <span>
            <Tag size={18} aria-hidden="true" /> Codifica e planimetria di posa
          </span>
          <span>
            <MapPin size={18} aria-hidden="true" /> Brescia e provincia
          </span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <SectionHeading
              eyebrow="Il lavoro prima della posa"
              title="Prima di posare, c'è tutto il lavoro per preparare."
            />
            <div>
              <p className={styles.lead}>
                Misurare. Segnare. Tagliare. Organizzare i pezzi.
              </p>
              <p className={styles.lead}>
                Sono operazioni che conosci bene. Richiedono tempo, attrezzatura
                e lavorazioni sul posto. Con EasyBatt, questa parte del lavoro
                avviene prima del cantiere.
              </p>
              <Link href="#benefici" className={styles.sectionLink}>
                Vedi cosa cambia <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="benefici" className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Il risultato"
            title="Meno tempo a preparare. Più tempo a posare."
          />
          <div className={styles.benefits}>
            <div>
              <PackageCheck size={28} aria-hidden="true" />
              <h3>Pronti da posare</h3>
              <p>
                I battiscopa arrivano già tagliati sulle misure rilevate
                nell&apos;ambiente.
              </p>
            </div>
            <div>
              <Tag size={28} aria-hidden="true" />
              <h3>Tutto al suo posto</h3>
              <p>
                Ogni pezzo è codificato e associato alla planimetria di posa.
              </p>
            </div>
            <div>
              <Check size={28} aria-hidden="true" />
              <h3>Meno lavoro sul posto</h3>
              <p>
                Il taglio del battiscopa avviene prima. Meno attività da gestire
                all&apos;interno dell&apos;immobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Come funziona"
            title="La semplicità in cantiere nasce dal lavoro fatto prima."
          />
          <ProcessSteps />
          <Link className={styles.sectionLink} href="/come-funziona">
            Scopri il metodo, passo dopo passo{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.systemLayout}`}>
          <div>
            <SectionHeading
              eyebrow="Il sistema EasyBatt"
              title="Precisione prima. Semplicità dopo."
            >
              Rilievo laser, software proprietario e lavorazione CNC fanno parte
              di un unico processo. La tecnologia ha uno scopo concreto:
              consegnare un lavoro organizzato.
            </SectionHeading>
            <Link href="/il-sistema" className={styles.sectionLink}>
              Entra nel sistema EasyBatt{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className={styles.systemList}>
            <li>
              <ScanLine aria-hidden="true" />
              <div>
                <h3>Rilievo laser</h3>
                <p>Il punto di partenza è l&apos;ambiente reale.</p>
              </div>
            </li>
            <li>
              <Workflow aria-hidden="true" />
              <div>
                <h3>Software proprietario</h3>
                <p>
                  Le misure diventano informazioni per preparare e organizzare i
                  pezzi.
                </p>
              </div>
            </li>
            <li>
              <Settings2 aria-hidden="true" />
              <div>
                <h3>Lavorazione CNC</h3>
                <p>Il progetto guida la preparazione dei singoli elementi.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="professionisti"
        className={`${styles.section} ${styles.light}`}
      >
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Per i professionisti"
            title="Un sistema. Diversi modi di lavorare meglio."
          >
            Non cambiamo il tuo mestiere. Prepariamo quello che viene prima.
          </SectionHeading>
          <div className={styles.professionGrid}>
            {professions.map(([id, title, text]) => (
              <article key={id} id={id}>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={`/per-professionisti#${id}`}>
                  Scopri cosa cambia per te{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.imageBand}>
        <figure>
          <Image
            src={marketingMedia.hero.src}
            alt={marketingMedia.hero.alt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <figcaption className={styles.mediaCaption}>
            {marketingMedia.hero.caption}
          </figcaption>
        </figure>
        <div className={styles.imageBandText}>
          <p className={styles.eyebrow}>Anche per chi vive gli spazi</p>
          <h2>
            Il taglio resta fuori.
            <br />
            Anche polvere e rumore.
          </h2>
          <p>
            Quando il battiscopa arriva già preparato, non serve eseguire le
            normali operazioni di taglio sul posto. Si evitano così polvere e
            rumore generati da questa lavorazione: un vantaggio per chi posa e
            per il suo cliente.
          </p>
        </div>
      </section>

      <FaqSection items={homeFaqs} />

      <section id="chi-siamo" className={`${styles.section} ${styles.story}`}>
        <div className={`${styles.container} ${styles.sectionIntro}`}>
          <SectionHeading
            eyebrow="Da Falegnameria Spini a EasyBatt"
            title="Un marchio nuovo. Un'esperienza concreta."
          />
          <div className={styles.storyBody}>
            <p>
              <strong>
                Perché continuare a fare sul posto ciò che possiamo preparare
                prima?
              </strong>
            </p>
            <p>
              EasyBatt nasce dall&apos;esperienza di Falegnameria Spini a
              Gussago, dall&apos;osservazione del lavoro e dalla volontà di
              organizzarlo meglio.
            </p>
            <p>
              Non per cambiare il mestiere di chi posa, ma per mettere
              esperienza e tecnologia al servizio della preparazione.
            </p>
            <Link href="/chi-siamo" className={styles.sectionLink}>
              Scopri da dove nasce EasyBatt{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ProjectContact />
    </MarketingShell>
  );
}

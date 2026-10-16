import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Tag, PackageCheck, MapPin } from "lucide-react";
import {
  MarketingShell,
  MarketingHero,
  SectionHeading,
  ProcessSteps,
  AngleSection,
  FaqSection,
  ProjectContact,
} from "@/components/marketing/site-sections";
import { homeFaqs, marketingMedia } from "@/lib/easybatt-marketing.mjs";
import styles from "@/components/marketing/marketing.module.css";

export const metadata = {
  title: "EasyBatt | Battiscopa su misura, pronti da posare",
  description:
    "Rilievo, taglio, codifica e planimetria: EasyBatt prepara il battiscopa prima del cantiere. Un servizio per professionisti con sede a Gussago (Brescia). Fornitura del battiscopa opzionale.",
};

const professions = [
  [
    "posatori",
    "Posatori e parquetisti",
    "Niente misure e tagli pezzo per pezzo: in cantiere pensi solo alla posa.",
    "Scopri EasyBatt per posatori",
  ],
  [
    "falegnami",
    "Falegnami",
    "Il battiscopa è solo una parte del tuo lavoro? Lo prepariamo noi, pronto da montare.",
    "Scopri EasyBatt per falegnami",
  ],
  [
    "imprese",
    "Imprese e ristrutturatori",
    "Una finitura più semplice da organizzare. Meno lavori da fare dentro casa.",
    "Scopri EasyBatt per le imprese",
  ],
  [
    "rivenditori",
    "Rivenditori e showroom",
    "Ai tuoi clienti puoi offrire il battiscopa già tagliato e pronto da posare.",
    "Scopri le opportunità",
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
            <MapPin size={18} aria-hidden="true" /> Sede a Gussago (BS)
          </span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <SectionHeading
              eyebrow="Il metodo tradizionale"
              title="Oggi si lavora un pezzo alla volta. E per ogni pezzo, si ricomincia."
            />
            <div>
              <p className={styles.lead}>
                Misurare. Segnare. Tagliare. Verificare. Ritoccare.
              </p>
              <p className={styles.lead}>
                Sono operazioni che conosci bene e che si ripetono fino
                all&apos;ultimo angolo. Richiedono attrezzatura sul posto, tempo
                e fatica. Con EasyBatt, questa parte del lavoro avviene prima
                del cantiere.
              </p>
              <Link href="#benefici" className={styles.sectionLink}>
                Vedi cosa cambia <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="benefici" className={`${styles.section} ${styles.brand}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Con EasyBatt"
            title="Preparato prima. Pronto da posare."
          />
          <div className={styles.benefits}>
            <div>
              <PackageCheck size={28} aria-hidden="true" />
              <h3>Già tagliati su misura</h3>
              <p>I battiscopa arrivano tagliati sulle misure di ogni stanza.</p>
            </div>
            <div>
              <Tag size={28} aria-hidden="true" />
              <h3>Tutto al suo posto</h3>
              <p>
                Ogni pezzo ha un codice. La planimetria che ti forniamo ti dice dove va posizionato.
              </p>
            </div>
            <div>
              <Check size={28} aria-hidden="true" />
              <h3>Niente taglio sul posto</h3>
              <p>
                Il taglio lo facciamo noi, in laboratorio. Meno attrezzi da
                portare in cantiere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Come funziona"
            title="Sei passaggi, dalle misure alla posa."
          />
          <ProcessSteps />
          <Link className={styles.sectionLink} href="/come-funziona">
            Scopri il metodo, passo dopo passo{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <AngleSection />

      <section
        id="professionisti"
        className={`${styles.section} ${styles.light}`}
      >
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Per i professionisti"
            title="Diverse esigenze. Un solo sistema."
          >
            Non cambiamo il tuo mestiere. Lo semplifichiamo.
          </SectionHeading>
          <div className={styles.professionGrid}>
            {professions.map(([id, title, text, action]) => (
              <article key={id} id={id}>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={`/per-professionisti#${id}`}>
                  {action} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.imageBand}>
        <figure>
          <Image
            src={marketingMedia.ambiente.src}
            alt={marketingMedia.ambiente.alt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <figcaption className={styles.mediaCaption}>
            {marketingMedia.ambiente.caption}
          </figcaption>
        </figure>
        <div className={styles.imageBandText}>
          <p className={styles.eyebrow}>Un vantaggio anche per il tuo cliente</p>
          <h2>
            Il taglio resta fuori.
            <br />
            Anche polvere e rumore.
          </h2>
          <p>
            Il battiscopa arriva già tagliato: in casa del cliente non si
            taglia. Meno polvere e meno rumore, per te e per chi ci vive.
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
                Perché fare in cantiere quello che possiamo preparare prima?
              </strong>
            </p>
            <p>
              EasyBatt nasce da Falegnameria Spini, a Gussago, e dall&apos;idea
              di usare tecnologie moderne in un lavoro tradizionale.
            </p>
            <p>
              Usiamo la nostra esperienza nel su misura per rendere più semplice
              il lavoro di chi posa.
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

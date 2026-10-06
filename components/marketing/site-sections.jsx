import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ScanLine,
  Workflow,
  Settings2,
  Tag,
  Map,
  PackageCheck,
  Plus,
  Mail,
} from "lucide-react";
import {
  marketingMedia,
  processSteps,
  projectEmail,
  projectEmailHref,
} from "@/lib/easybatt-marketing.mjs";
import { SiteHeader } from "./site-header";
import styles from "./marketing.module.css";

const icons = {
  scan: ScanLine,
  workflow: Workflow,
  settings: Settings2,
  tag: Tag,
  map: Map,
  package: PackageCheck,
};
export function MarketingShell({ children, mobileContact = false }) {
  return (
    <div
      className={`${styles.site} ${mobileContact ? styles.withMobileContact : ""}`}
    >
      <SiteHeader mobileContact={mobileContact} />
      <main id="contenuto" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
export function ActionLink({ href, children, secondary = false }) {
  return (
    <Link
      href={href}
      className={secondary ? styles.secondaryButton : styles.primaryButton}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className={styles.sectionHeading}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className={styles.lead}>{children}</p>}
    </div>
  );
}
export function MarketingHero({ method = false, content }) {
  const media = marketingMedia.hero;
  const copy = content ?? {
    eyebrow: method
      ? "Il metodo EasyBatt"
      : "Brescia e provincia / Professionisti e imprese",
    title: method ? "Come funziona EasyBatt" : "EasyBatt",
    statement: method
      ? "Dal rilievo al battiscopa pronto da posare."
      : "Battiscopa su misura, già tagliati e pronti da posare.",
    description: method
      ? "Rileviamo, elaboriamo, prepariamo. Tu arrivi in cantiere e pensi alla posa."
      : "Prepariamo i battiscopa sulle misure del tuo ambiente. Tagliati, codificati e accompagnati dalla planimetria di posa.",
    href: method ? "#metodo" : "/come-funziona",
    action: method ? "Scopri il metodo" : "Scopri come funziona",
  };
  return (
    <section
      className={`${styles.hero} ${method || content ? styles.methodHero : ""}`}
      aria-labelledby="hero-title"
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={`${styles.container} ${styles.heroContent}`}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 id="hero-title">{copy.title}</h1>
        <p className={styles.heroStatement}>{copy.statement}</p>
        <p className={styles.heroDescription}>{copy.description}</p>
        <div className={styles.actions}>
          <ActionLink href={copy.href}>{copy.action}</ActionLink>
          <ActionLink href={content ? "#prova" : "/#prova"} secondary>
            Prova EasyBatt
          </ActionLink>
        </div>
      </div>
      <span className={styles.mediaCaption}>{media.caption}</span>
    </section>
  );
}
export function ProcessSteps({ detailed = false }) {
  return (
    <ol className={detailed ? styles.processDetailed : styles.processGrid}>
      {processSteps.map((step, index) => {
        const Icon = icons[step.icon];
        return (
          <li key={step.id} id={detailed ? step.id : undefined}>
            <div className={styles.stepTop}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3>{step.title}</h3>
            <p className={styles.stepSubtitle}>{step.subtitle}</p>
            {detailed && <p>{step.text}</p>}
          </li>
        );
      })}
    </ol>
  );
}
export function Comparison() {
  return (
    <div className={styles.comparison}>
      <div>
        <p className={styles.eyebrow}>Sul posto, tradizionalmente</p>
        <p className={styles.comparisonFlow}>
          Misurare <ArrowRight aria-hidden="true" /> Preparare{" "}
          <ArrowRight aria-hidden="true" /> Tagliare{" "}
          <ArrowRight aria-hidden="true" /> Organizzare{" "}
          <ArrowRight aria-hidden="true" /> Posare
        </p>
      </div>
      <div>
        <p className={styles.eyebrow}>Sul posto, con EasyBatt</p>
        <p className={styles.comparisonFlow}>
          Identificare <ArrowRight aria-hidden="true" /> Posare
        </p>
        <p>Il lavoro di preparazione avviene prima.</p>
      </div>
    </div>
  );
}
export function FaqSection({
  items,
  title = "Prima di iniziare, le tue domande.",
}) {
  return (
    <section id="domande" className={`${styles.section} ${styles.light}`}>
      <div className={`${styles.container} ${styles.faqLayout}`}>
        <SectionHeading eyebrow="Domande frequenti" title={title}>
          Un metodo nuovo merita risposte chiare.
        </SectionHeading>
        <div className={styles.faqList}>
          {items.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProjectContact() {
  return (
    <section id="prova" className={`${styles.section} ${styles.contact}`}>
      <div className={`${styles.container} ${styles.contactLayout}`}>
        <div>
          <p className={styles.eyebrow}>Prova EasyBatt</p>
          <h2>Hai un lavoro in programma?</h2>
          <p className={styles.lead}>
            Raccontaci il progetto. Verifichiamo insieme se EasyBatt è la
            soluzione adatta al tuo prossimo lavoro.
          </p>
          <p>
            Partiamo da dove si trova il cantiere, dal tipo di intervento e dai
            tempi previsti. Non serve avere già tutte le misure.
          </p>
        </div>
        <div className={styles.contactActions}>
          <a className={styles.primaryButton} href={projectEmailHref}>
            Parlaci del tuo progetto <Mail size={18} aria-hidden="true" />
          </a>
          <a className={styles.textLink} href={`mailto:${projectEmail}`}>
            {projectEmail}
          </a>
          <p>
            Un primo contatto per valutare il lavoro, senza impegno di acquisto.
          </p>
          <Link className={styles.textLink} href="/quanto-mi-costa">
            Vuoi prima una stima? Quanto mi costa{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div>
          <Link href="/" className={styles.footerBrand}>
            Easy<span>Batt</span>
          </Link>
          <p>
            Battiscopa pronti da posare.
            <br />
            Senza tagli sul posto.
          </p>
        </div>
        <div>
          <p className={styles.footerTitle}>Il servizio</p>
          <Link href="/come-funziona">Come funziona</Link>
          <Link href="/per-professionisti">Per i professionisti</Link>
          <Link href="/il-sistema">Il sistema</Link>
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/quanto-mi-costa">Quanto mi costa</Link>
        </div>
        <div>
          <p className={styles.footerTitle}>Parliamone</p>
          <a href={`mailto:${projectEmail}`}>{projectEmail}</a>
          <Link href="/#prova">Prova EasyBatt</Link>
          <p>Gussago, Brescia</p>
        </div>
      </div>
      <div className={`${styles.container} ${styles.footerLegal}`}>
        <p>EasyBatt è un marchio di Falegnameria Spini Gianluca e Marco snc.</p>
        <p>
          Via Benedetto Castelli 40/42, 25064 Gussago (BS) / P. IVA 03098310984
        </p>
      </div>
    </footer>
  );
}

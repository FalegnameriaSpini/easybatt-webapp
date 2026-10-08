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
} from "lucide-react";
import {
  marketingMedia,
  processSteps,
  projectEmail,
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
// The H1 carries the promise of the page; yellow is reserved for the
// conversion action, so the explore link always uses the secondary style.
const homeHero = {
  eyebrow: "Brescia e provincia / Professionisti e imprese",
  title: "Battiscopa su misura, già tagliati e pronti da posare.",
  description: (
    <>
      EasyBatt prepara i battiscopa sulle misure del tuo ambiente, li taglia,
      li codifica e li consegna con la planimetria di posa. In cantiere non
      devi più misurare e tagliare. <strong>Monti e basta.</strong>
    </>
  ),
  href: "/come-funziona",
  action: "Scopri come funziona",
};
export function MarketingHero({ content }) {
  const media = marketingMedia.hero;
  const copy = content ?? homeHero;
  const explore = (
    <ActionLink href={copy.href} secondary>
      {copy.action}
    </ActionLink>
  );
  const cta = (
    <ActionLink href={copy.ctaHref || "/prova-easybatt"}>
      {copy.ctaLabel || "Prova EasyBatt"}
    </ActionLink>
  );
  return (
    <section
      className={`${styles.hero} ${content ? styles.pageHero : ""}`}
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
        <p className={styles.heroDescription}>{copy.description}</p>
        <div className={styles.actions}>
          {copy.ctaFirst ? cta : explore}
          {copy.ctaFirst ? explore : cta}
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
    <div className={`${styles.comparison} ${styles.comparisonSteps}`}>
      <div>
        <p className={styles.eyebrow}>Oggi, per ogni pezzo</p>
        <p className={styles.comparisonFlow}>
          Misurare <ArrowRight aria-hidden="true" /> Segnare{" "}
          <ArrowRight aria-hidden="true" /> Tagliare{" "}
          <ArrowRight aria-hidden="true" /> Verificare{" "}
          <ArrowRight aria-hidden="true" /> Ritoccare{" "}
          <ArrowRight aria-hidden="true" /> Posare
        </p>
        <p>E poi si ricomincia con il pezzo successivo.</p>
      </div>
      <div>
        <p className={styles.eyebrow}>Con EasyBatt, per ogni pezzo</p>
        <p className={styles.comparisonFlow}>
          Identificare <ArrowRight aria-hidden="true" /> Posare
        </p>
        <p>
          Il taglio è già fatto. Codice e planimetria ti dicono dove va.
        </p>
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
export function ProjectContact({
  title = "Hai un lavoro in programma?",
  lead = "Prova EasyBatt sul tuo prossimo battiscopa.",
  text = "Raccontaci il progetto e verifichiamo insieme se EasyBatt è adatto al lavoro che devi realizzare. Non servono già tutte le misure.",
  action = "Parlaci del tuo prossimo lavoro",
}) {
  return (
    <section id="prova" className={`${styles.section} ${styles.contact}`}>
      <div className={`${styles.container} ${styles.contactLayout}`}>
        <div>
          <p className={styles.eyebrow}>Prova EasyBatt</p>
          <h2>{title}</h2>
          <p className={styles.lead}>{lead}</p>
          {text && <p>{text}</p>}
        </div>
        <div className={styles.contactActions}>
          <ActionLink href="/prova-easybatt">{action}</ActionLink>
          <a className={styles.textLink} href={`mailto:${projectEmail}`}>
            {projectEmail}
          </a>
          <p>
            Raccontaci il progetto: non serve aver già deciso e non ti impegni
            ad acquistare.
          </p>
          <Link className={styles.textLink} href="/quanto-mi-costa">
            Cerchi solo una stima? Calcola il prezzo{" "}
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
          <Link href="/quanto-mi-costa">Calcola il prezzo</Link>
        </div>
        <div>
          <p className={styles.footerTitle}>Parliamone</p>
          <a href={`mailto:${projectEmail}`}>{projectEmail}</a>
          <Link href="/prova-easybatt">Prova EasyBatt</Link>
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

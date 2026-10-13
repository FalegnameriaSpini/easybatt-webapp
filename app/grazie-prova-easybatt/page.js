import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  MarketingShell,
  ActionLink,
} from "@/components/marketing/site-sections";
import {
  RECEIPT_COOKIE,
  validProjectReceipt,
} from "@/lib/easybatt-project-security.mjs";
import styles from "@/components/marketing/marketing.module.css";
import formStyles from "@/components/marketing/project-form.module.css";

export const metadata = {
  title: "Richiesta ricevuta | EasyBatt",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function ProjectThanksPage() {
  const jar = await cookies();
  if (
    !validProjectReceipt(
      jar.get(RECEIPT_COOKIE)?.value,
      process.env.EASYBATT_PROJECTS_SECRET,
    )
  )
    redirect("/prova-easybatt#progetto");
  return (
    <MarketingShell>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={formStyles.confirmation}>
            <p className={styles.eyebrow}>Il primo passo è fatto</p>
            <h1>Abbiamo ricevuto il tuo progetto.</h1>
            <p className={styles.lead}>
              Grazie per averci raccontato il tuo prossimo lavoro. Leggiamo
              quello che ci hai scritto e ti ricontattiamo.
            </p>
          </div>
          <ol className={formStyles.steps}>
            <li>
              <span>01</span>
              <h3>Leggiamo la richiesta</h3>
              <p>Partiamo dalle informazioni che ci hai inviato.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Ti ricontattiamo</h3>
              <p>Ti chiediamo quello che serve per capire il lavoro.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Valutiamo il progetto</h3>
              <p>Se il lavoro va bene, decidiamo insieme come procedere.</p>
            </li>
          </ol>
        </div>
      </section>
      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.container}>
          <h2>Nel frattempo, conosci meglio EasyBatt.</h2>
          <div className={styles.actions}>
            <ActionLink href="/il-sistema">Scopri il sistema</ActionLink>
            <ActionLink href="/come-funziona" secondary>
              Il processo passo dopo passo
            </ActionLink>
          </div>
          <p className={styles.lead}>
            A presto. EasyBatt: prepariamo prima, tu pensi alla posa.
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}

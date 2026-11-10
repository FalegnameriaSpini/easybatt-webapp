import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  applicationName: "Easy-Batt",
  appleWebApp: { title: "Easy-Batt" },
  title: "Easy-Batt | Battiscopa pronti da posare",
  description: "Preventivatore Easy-Batt per battiscopa preparati e pronti da posare, senza tagli sul posto.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

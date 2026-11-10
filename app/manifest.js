export default function manifest() {
  return {
    name: "Easy-Batt | Battiscopa pronti da posare",
    short_name: "Easy-Batt",
    lang: "it",
    start_url: "/",
    display: "standalone",
    background_color: "#17191D",
    theme_color: "#0F9EB6",
    icons: [
      { src: "/icons/easybatt-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/easybatt-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

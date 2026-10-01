export default function manifest() {
  return {
    name: "EasyBatt - Battiscopa pronti da posare",
    short_name: "EasyBatt",
    lang: "it",
    start_url: "/",
    display: "standalone",
    background_color: "#17191D",
    theme_color: "#3D938A",
    icons: [
      { src: "/icons/easybatt-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/easybatt-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

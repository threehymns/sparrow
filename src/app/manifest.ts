import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sparrow",
    short_name: "Sparrow",
    description: "A simple and clean task manager built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#27272A",
    theme_color: "#27272A",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

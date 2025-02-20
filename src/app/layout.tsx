import { ScrollArea } from "@/components/ui/scroll-area";
import "@/styles/globals.css";
import { Shantell_Sans } from "next/font/google";
import { type Metadata } from "next";
import { Confirmer } from "@/components/ui/confirmer";

const shantell = Shantell_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sparrow",
  description: "A simple and clean task manager",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${shantell.className} dark`}>
      <body className="dark:bg-black">
        <ScrollArea className="h-screen">{children}</ScrollArea>
        <Confirmer />
      </body>
    </html>
  );
}

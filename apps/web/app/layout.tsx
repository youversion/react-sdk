import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Image from "next/image";
import youbibleLogo from "./assets/youbible.png";

export const metadata: Metadata = {
  title: "YouBible",
  description: "Lightweight Bible Reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/wfn2tts.css" />
      </head>
      <body>
        <header>
          <Image
            src={youbibleLogo}
            alt="YouBible"
            width={120}
            height={40}
            className="mx-6"
          />
        </header>
        <Providers appId={process.env.BIBLE_SDK_APP_ID ?? ""}>{children}</Providers>
      </body>
    </html>
  );
}

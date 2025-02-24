import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import Image from "next/image";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnamPro.variable} font-be-vietnam-pro antialiased  min-h-dvh  text-lightGray bg-dark bg-mobile bg-no-repeat bg-contain sm:bg-desktop`}
      >
        <main className="pb-2">
          <Image
            className="size-auto mx-auto py-[5%] my-5"
            aria-hidden
            src="/resources/Logo.svg"
            alt="Logo"
            height={0}
            width={0}
          />

          {children}
        </main>
      </body>
    </html>
  );
}

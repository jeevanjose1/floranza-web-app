import type { Metadata } from "next";
import { Poppins, Open_Sans, Great_Vibes, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BottomMenu from "@/components/layout/bottom-menu";
import QueryProvider from "@/components/common/query-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const open_sans = Open_Sans({
  variable: "--open-sans",
  subsets: ["latin"],
});
const great_vibes = Great_Vibes({
  variable: "--font-grate-vibes",
  subsets: ["latin"],
  weight: "400",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Floranza Fashion Boutique | The Complete Ladies Fashion Store",
  description: "Floranza Fashion Boutique the Complete Ladies Fashion Store for Hand Picked Best Quality and Trending Dresses at a Very Reasonable Price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TGJ3MGPT');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${poppins.variable} ${open_sans.variable} ${great_vibes.variable} ${lora.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGJ3MGPT"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Script
          src="https://mercury.phonepe.com/web/bundle/checkout.js"
          strategy="beforeInteractive"
        />
        <QueryProvider>
          <Header />
          {children}
          <Footer />
          <BottomMenu />
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              classNames: {
                success: "!bg-white !border-none !shadow-md !text-green-600",
                error: "!bg-white !border-none !shadow-md !text-red-600",
                warning: "!bg-white !border-none !shadow-md !text-yellow-600",
              },
            }}
          />
        </QueryProvider>
      </body>
      <GoogleAnalytics  gaId={process.env.G_ID as string} />
    </html>
  );
}
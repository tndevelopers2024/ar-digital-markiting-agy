import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Preloader } from "@/components/Preloader";
import { LenisProvider } from "@/components/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F8F7F4",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ardigitalmarketing.com"),
  title: "AR Digital Marketing | Strategic Growth & Performance Agency",
  description:
    "We bring strategy, design, and digital marketing together to help your business reach the right people and turn attention into meaningful action.",
  keywords: [
    "Digital Marketing Agency",
    "SEO & Local Search",
    "Social Media Marketing",
    "Paid Advertising",
    "Branding & Graphic Design",
    "Website Development",
    "AR Digital Marketing",
  ],
  authors: [{ name: "AR Digital Marketing" }],
  creator: "AR Digital Marketing",
  publisher: "AR Digital Marketing",
  icons: {
    icon: [
      { url: "/logo/whatsapp-favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/logo/whatsapp-favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ardigitalmarketing.com",
    title: "AR Digital Marketing | Strategic Growth & Performance Agency",
    description:
      "We bring strategy, design, and digital marketing together to help your business reach the right people and turn attention into meaningful action.",
    siteName: "AR Digital Marketing",
    images: [
      {
        url: "/logo/ar-logo-lockup.svg",
        width: 1200,
        height: 630,
        alt: "AR Digital Marketing Lockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AR Digital Marketing | Strategic Growth & Performance Agency",
    description:
      "We bring strategy, design, and digital marketing together to help your business reach the right people and turn attention into meaningful action.",
    images: ["/logo/ar-logo-lockup.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The preloader boot script below stamps `data-preloader="skip"` on this
      // element before hydration; without this React 19 reports a hydration
      // attribute mismatch (and Next.js surfaces it in the dev overlay).
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-warm-white text-ink font-sans selection:bg-brand-blue selection:text-white">
        {/* Boot script: always show preloader on hard refresh; skip only on
            same-session SPA navigations (inline script does NOT re-run on
            client-side route changes, so the attribute persists naturally). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{
  var _nav=performance.getEntriesByType('navigation')[0];
  var _type=_nav?_nav.type:'';
  if(_type==='reload'){
    /* Hard refresh — always play the intro */
    sessionStorage.removeItem('ar-preloader-seen');
  } else if(sessionStorage.getItem('ar-preloader-seen')){
    /* Same-session SPA visit — skip */
    document.documentElement.setAttribute('data-preloader','skip');
  } else {
    sessionStorage.setItem('ar-preloader-seen','1');
  }
}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`.ar-preloader{display:none!important}`}</style>
        </noscript>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Custom cursor — hidden on touch devices automatically */}
          <CustomCursor />

          {/* Preloader splash */}
          <Preloader />

          {/* Lenis smooth scroll wraps all page content */}
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

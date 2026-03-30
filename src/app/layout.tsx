import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chethana Lakthilina Jathunarachchi | Full-Stack Software Engineer",
  description:
    "Portfolio of Chethana Lakthilina Jathunarachchi — Software Engineering graduate from NSBM Green University, Sri Lanka. Full-Stack Developer specializing in React, Node.js, PHP, AI integration, DevOps, and enterprise systems. Ex-CAASL Software Engineer Intern.",
  keywords: [
    "Chethana Lakthilina",
    "Chethana Lakthilina Jathunarachchi",
    "Software Engineer Sri Lanka",
    "Full-Stack Developer",
    "NSBM Green University",
    "CAASL Intern",
    "React Developer",
    "Node.js",
    "PHP Developer",
    "IBM Watson",
    "DevOps Engineer",
    "Docker Kubernetes Jenkins",
  ],
  authors: [{ name: "Chethana Lakthilina Jathunarachchi", url: "https://chethanalakthilina.vercel.app/" }],
  creator: "Chethana Lakthilina Jathunarachchi",
  publisher: "Chethana Lakthilina Jathunarachchi",
  metadataBase: new URL("https://chethanalakthilina.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chethana Lakthilina | Full-Stack Software Engineer · Sri Lanka",
    description:
      "Building mission-critical software for aviation, enterprise inventory, AI applications and more. 26+ certifications. Open to opportunities.",
    type: "website",
    url: "https://chethanalakthilina.vercel.app/",
    siteName: "Chethana Lakthilina Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chethana Lakthilina | Full-Stack Software Engineer",
    description: "Building mission-critical software for aviation, enterprise inventory, AI applications and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chethana Lakthilina Jathunarachchi",
    url: "https://chethanalakthilina.vercel.app/",
    jobTitle: "Full-Stack Software Engineer",
    alumniOf: "NSBM Green University",
    worksFor: {
      "@type": "Organization",
      name: "Civil Aviation Authority of Sri Lanka (CAASL)"
    },
    sameAs: [
      "https://github.com/CLTWINGZ",
      "https://www.linkedin.com/in/chethana-jathunarachchi-2ba45b281/"
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LINKIMPACT — Linked to connect the world",
  description: "사람, 기술, 데이터, 지역과 세계를 연결하여 지속가능한 변화를 만드는 LINKIMPACT",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}

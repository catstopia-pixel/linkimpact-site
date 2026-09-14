import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://linkimpact.or.kr"),
  title: {
    default: "LINKIMPACT | 링크임팩트",
    template: "%s | LINKIMPACT",
  },
  description:
    "링크임팩트는 사회와 환경문제로 삶의 터전을 위협받는 지역사회의 문제를 발견하고, 사람과 자원, 행동을 연결해 지속가능한 변화를 만듭니다.",
  applicationName: "LINKIMPACT",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "LINKIMPACT",
    title: "LINKIMPACT | 링크임팩트",
    description:
      "사람과 자원, 행동을 연결해 지역사회의 지속가능한 변화를 만듭니다.",
    url: "https://linkimpact.or.kr/",
  },
  robots: {
    index: true,
    follow: true,
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

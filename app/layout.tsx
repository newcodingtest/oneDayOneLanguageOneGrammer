import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "하루 한번 영어",
  description: "매일매일 영어 한 문장씩 공부해요!",
  openGraph: {
    title: "나의 오늘의 문장",
    description: "매일매일 영어 한 문장씩 공부해요!",
    url: "https://one-day-one-language-one-grammer-qa.vercel.app/", // 배포된 실제 주소
    siteName: "OneDay-OneGrammar",
    images: [
      {
        url: "/oneDay.png", // public 폴더에 저장한 이미지 경로
        width: 1200,
        height: 630,
        alt: "서비스 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  //SEO 설정
  icons: {
    icon: '/favicon.ico',
    apple: '/oneDay.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1, // 모바일에서 줌 고정 (앱 같은 느낌을 줌)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* 모든 페이지에 공통으로 들어가는 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite", // 이벤트보다는 웹사이트 자체가 더 적절할 수 있습니다
              "name": "하루 한번 영어",
              "url": "https://one-day-one-language-one-grammer-qa.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://one-day-one-language-one-grammer-qa.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}



import { Analytics } from '@vercel/analytics/react';
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
        url: "/oneDayV1.png", // public 폴더에 저장한 이미지 경로
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
    apple: '/oneDayV1.png',
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
        <Analytics />
        {/* 모든 페이지에 공통으로 들어가는 구조화 데이터(SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite", 
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



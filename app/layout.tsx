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
      </body>
    </html>
  );
}

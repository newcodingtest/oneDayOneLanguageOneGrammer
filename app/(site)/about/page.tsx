// app/(site)/about/page.tsx

import InfoPageLayout from "@/components/site/InfoPageLayout";

export const metadata = {
  title: "About | Daily English Sentence",
  description: "Daily English Sentence 사이트 소개",
};

export default function AboutPage() {
  return (
    <InfoPageLayout
      badge="ABOUT"
      title="Daily English Sentence 소개"
      description="하루 5분, 부담 없이 영어 표현을 익히는 데일리 영어 학습 사이트입니다."
      sections={[
        {
          icon: "📚",
          title: "사이트 목적",
          paragraphs: [
            "Daily English Sentence는 한국인 영어 학습자가 매일 짧은 시간 안에 영어 표현을 익힐 수 있도록 만든 영어 학습 사이트입니다.",
            "긴 강의나 복잡한 교재 대신, 하루에 하나씩 부담 없이 확인할 수 있는 문법, 구동사, 슬랭, 자주 틀리는 표현을 제공합니다.",
          ],
        },
        {
          icon: "🎯",
          title: "누구를 위한 사이트인가요?",
          paragraphs: [
            "영어 공부를 꾸준히 하고 싶지만 매일 긴 시간을 내기 어려운 학습자를 위한 사이트입니다.",
            "출근 전, 점심시간, 자기 전처럼 짧은 시간에 오늘의 영어 표현을 확인하고 가볍게 복습할 수 있도록 구성했습니다.",
          ],
        },
        {
          icon: "⏱️",
          title: "하루 5분 학습 컨셉",
          paragraphs: [
            "Daily English Sentence의 핵심 컨셉은 하루 5분 영어 학습입니다.",
            "매일 조금씩 문장을 보고, 표현의 뉘앙스를 이해하고, 예문을 통해 실제 사용 감각을 쌓는 것을 목표로 합니다.",
          ],
        },
      ]}
    />
  );
}
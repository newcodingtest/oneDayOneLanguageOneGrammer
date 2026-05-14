// app/(site)/contact/page.tsx

import InfoPageLayout from "@/components/site/InfoPageLayout";

export const metadata = {
  title: "Contact | Daily English Sentence",
  description: "Daily English Sentence 문의 안내",
};

export default function ContactPage() {
  return (
    <InfoPageLayout
      badge="CONTACT"
      title="문의하기"
      description="콘텐츠 오류, 표현 개선 요청, 사이트 이용 중 발생한 문제를 알려주세요."
      sections={[
        {
          icon: "✉️",
          title: "문의 이메일",
          paragraphs: [
            "Daily English Sentence에 대한 문의, 오류 제보, 개선 의견이 있다면 아래 이메일로 연락해 주세요.",
            "wbdud1234@naver.com",
          ],
        },
        {
          icon: "💬",
          title: "어떤 내용을 보낼 수 있나요?",
          paragraphs: [
            "영어 표현 오류, 어색한 예문, 설명 개선 요청, 페이지 오류, 사이트 이용 중 불편한 점 등을 보내주시면 확인 후 가능한 범위에서 반영하겠습니다.",
          ],
        },
        {
          icon: "⏳",
          title: "답변 안내",
          paragraphs: [
            "문의 내용은 확인 후 필요한 경우 답변드립니다.",
            "개인 프로젝트로 운영되는 사이트 특성상 답변에는 시간이 걸릴 수 있습니다.",
          ],
        },
      ]}
    />
  );
}
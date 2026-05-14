// app/(site)/privacy/page.tsx

import InfoPageLayout from "@/components/site/InfoPageLayout";

export const metadata = {
  title: "Privacy Policy | Daily English Sentence",
  description: "Daily English Sentence 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      badge="PRIVACY POLICY"
      title="개인정보처리방침"
      description="Daily English Sentence는 사용자의 개인정보를 중요하게 생각하며, 사이트 이용 과정에서 발생할 수 있는 정보 처리 방식을 안내합니다."
      sections={[
        {
          icon: "🔒",
          title: "수집하는 정보",
          paragraphs: [
            "본 사이트는 회원가입 기능을 제공하지 않으며, 이름, 전화번호, 주소와 같은 직접적인 개인정보를 별도로 수집하지 않습니다.",
            "다만 서비스 개선, 트래픽 분석, 안정적인 사이트 운영을 위해 방문 기록, 브라우저 정보, 기기 정보, 접속 시간 등의 비식별 정보가 수집될 수 있습니다.",
          ],
        },
        {
          icon: "🍪",
          title: "쿠키 사용",
          paragraphs: [
            "본 사이트는 사용자 경험 개선, 방문 통계 확인, 광고 제공을 위해 쿠키를 사용할 수 있습니다.",
            "쿠키는 사용자의 브라우저에 저장되는 작은 데이터 파일이며, 사용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.",
          ],
        },
        {
          icon: "📢",
          title: "광고 및 제3자 서비스",
          paragraphs: [
            "본 사이트는 Google AdSense와 같은 제3자 광고 서비스를 사용할 수 있습니다.",
            "광고 서비스 제공자는 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키 또는 유사한 기술을 사용할 수 있습니다.",
          ],
        },
        {
          icon: "🛠️",
          title: "정보 이용 목적",
          paragraphs: [
            "수집될 수 있는 비식별 정보는 사이트 이용 현황 분석, 콘텐츠 개선, 서비스 안정성 확보, 광고 운영 및 사용자 경험 개선을 위해 사용될 수 있습니다.",
          ],
        },
        {
          icon: "📌",
          title: "정책 변경",
          paragraphs: [
            "본 개인정보처리방침은 서비스 운영 방향, 관련 법령, 광고 정책 변경에 따라 수정될 수 있습니다.",
            "변경 사항은 본 페이지를 통해 안내됩니다.",
            "최종 업데이트: 2026년 5월 14일",
          ],
        },
      ]}
    />
  );
}
# 하루 영어문법 1개 (Daily English Grammar)

Next.js + TypeScript 기반의 **AI 자동 생성** 영어 문법 학습 웹 애플리케이션
<Br>
주소: https://daliy-english-sentence.vercel.app/

<img width="687" height="387" alt="image" src="https://github.com/user-attachments/assets/754a3cf5-fc40-475d-a25a-9bd4b0862799" />


## 주요 기능

✨ **AI가 매일 새로운 문법을 생성합니다**
- 🤖 Gemini AI API로 콘텐츠 자동 생성
- 📚 긴 한글 문장 예시 제공
- 📖 상세한 문법 설명
- 💬 3-4개의 실제 사용 예시 문장
- 🔊 음성 발음 기능 (Web Speech API)
- 📱 **완전 반응형 디자인** (모바일, 태블릿, 데스크탑)

## 🎯 반응형 디자인

### 지원 디바이스
- 📱 **모바일** (320px ~ 640px)
- 📱 **태블릿** (640px ~ 1024px)
- 💻 **데스크탑** (1024px+)


## 기술 스택

- **Framework**: Next.js 16
- **Language**: TypeScript
- **AI**: Gemini API 
- **Styling**: Tailwind CSS 
- **Icons**: 커스텀 SVG 아이콘
- **TTS**: Web Speech API

## 🚀 빠른 시작

### 1. API 키 발급
API 키를 발급받으세요.

### 2. 환경 변수 설정
```bash
# .env.local 파일 생성
GEMINI_API_KEY=
GEMINI_MODEL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=
DEPLOY_LEVEL=dev # dev, prod
NEXT_PUBLIC_BASE_URL=
```

### 3. 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

<BR><BR><BR>


# 📂 프로젝트 구조

## 폴더 구조

```
daily-grammar-app/
├── app/
│   ├── api/
│   │   └── grammar/
│   │       └── route.ts          # AI API 엔드포인트
│   ├── page.tsx                  # 메인 페이지 (깔끔!)
│   └── globals.css               # 전역 스타일
│
├── components/                   # 재사용 가능한 UI 컴포넌트
│   ├── icons.tsx                 # SVG 아이콘 모음
│   ├── Header.tsx                # 헤더 (로고, 메뉴)
│   ├── Footer.tsx                # 푸터
│   ├── DayCounter.tsx            # Day 표시 & 네비게이션
│   ├── SentenceCard.tsx          # 오늘의 문장 카드
│   ├── GrammarExplanation.tsx    # 문법 설명 섹션
│   ├── ExampleSentences.tsx      # 예시 문장 리스트
│   ├── LoadingSpinner.tsx        # 로딩 상태
│   └── ErrorMessage.tsx          # 에러 메시지
│
├── hooks/                        # 커스텀 React Hooks
│   ├── useGrammarLesson.ts       # 문법 데이터 가져오기
│   └── useAudioPlayer.ts         # 음성 재생 관리
│
├── lib/                          # 유틸리티 & 서비스
│   ├── audioService.ts           # Web Speech API 서비스
│   ├── prompts.ts                # AI 프롬프트
│   └── supabaseServer.ts         # Supabase 연결 정의
│
│
├── mocks/
│   └── grammar.ts                # Sample 문법 데이터 정의
│
├── service/
│   └── databaseService.ts        # DB 서비스
│
│
├── types/                        # TypeScript 타입 정의
│   └── grammar.ts                # GrammarLesson 인터페이스
│
├── .env.local.example            # 환경 변수 예시
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 📝 파일별 역할

### 🎨 Components (UI 컴포넌트)

#### `components/icons.tsx`
- SVG 아이콘 모음
- Volume2, ChevronLeft, ChevronRight, BookOpen, Calendar, Menu
- Props: `className` (스타일링용)

#### `components/Header.tsx`
- 최상단 헤더
- 로고, 제목, 메뉴 버튼
- Sticky 위치 (스크롤해도 고정)

#### `components/Footer.tsx`
- 하단 푸터
- 저작권 정보

#### `components/DayCounter.tsx`
**Props:**
```typescript
{
  date: string;        // 날짜 (예: "2026년 1월 28일")
  day: number;         // Day 번호
  onPrevious: () => void;  // 이전 버튼 핸들러
  onNext: () => void;      // 다음 버튼 핸들러
}
```
**역할:**
- 날짜와 Day 표시
- 이전/다음 네비게이션 버튼

#### `components/SentenceCard.tsx`
**Props:**
```typescript
{
  sentence: string;        // 영어 문장
  translation: string;     // 한글 번역
  isPlaying: boolean;      // 재생 중 여부
  onPlay: () => void;      // 재생 버튼 클릭 핸들러
}
```
**역할:**
- 오늘의 문장 표시
- 발음 듣기 버튼

#### `components/GrammarExplanation.tsx`
**Props:**
```typescript
{
  title: string;           // 문법 제목
  explanation: string;     // 설명
  structure: string;       // 문법 구조
}
```
**역할:**
- 문법 제목, 설명, 구조 표시

#### `components/ExampleSentences.tsx`
**Props:**
```typescript
{
  examples: ExampleSentence[];  // 예시 문장 배열
  playingId: number | null;     // 현재 재생 중인 ID
  onPlay: (text: string, id: number) => void;
}
```
**역할:**
- 4개 예시 문장 리스트
- 각 문장마다 발음 버튼

#### `components/LoadingSpinner.tsx`
- 로딩 중 화면
- 스피너 애니메이션

#### `components/ErrorMessage.tsx`
**Props:**
```typescript
{
  message: string;         // 에러 메시지
  onRetry: () => void;     // 재시도 버튼 핸들러
}
```
**역할:**
- 에러 발생 시 화면
- 재시도 버튼

---

### 🪝 Hooks (비즈니스 로직)

#### `hooks/useGrammarLesson.ts`
**사용법:**
```typescript
const { lesson, loading, error, retry } = useGrammarLesson(day);
```
**반환값:**
- `lesson`: 문법 데이터
- `loading`: 로딩 중 여부
- `error`: 에러 메시지
- `retry`: 재시도 함수

**역할:**
- API에서 문법 데이터 가져오기
- 로딩 & 에러 상태 관리

#### `hooks/useAudioPlayer.ts`
**사용법:**
```typescript
const { playingId, play, stop } = useAudioPlayer();
```
**반환값:**
- `playingId`: 현재 재생 중인 ID
- `play(text, id)`: 재생 함수
- `stop()`: 정지 함수

**역할:**
- 음성 재생 상태 관리
- audioService 호출

---

### 🛠️ Lib (서비스 & 유틸리티)

#### `lib/audioService.ts`
**메서드:**
```typescript
audioService.play(text, options);  // 음성 재생
audioService.stop();               // 재생 중지
audioService.isSupported();        // 브라우저 지원 여부
```
**역할:**
- Web Speech API 래퍼
- 최고 품질 음성 자동 선택
- 에러 처리

---

### 📘 Types (타입 정의)

#### `types/grammar.ts`
```typescript
interface ExampleSentence {
  id: number;
  text: string;
  translation: string;
}

interface GrammarLesson {
  date: string;
  day: number;
  sentence: string;
  sentenceTranslation: string;
  grammarTitle: string;
  grammarExplanation: string;
  structure: string;
  examples: ExampleSentence[];
}
```

---

### 🔌 API Routes

#### `app/api/grammar/route.ts`
**엔드포인트:** `GET /api/grammar?day=1`

**응답:**
```json
{
  "date": "2026년 1월 28일",
  "day": 28,
  "sentence": "...",
  "sentenceTranslation": "...",
  "grammarTitle": "...",
  "grammarExplanation": "...",
  "structure": "...",
  "examples": [...]
}
```

**역할:**
- Claude API 호출
- 문법 콘텐츠 생성
- JSON 반환

---

## 🔄 데이터 흐름

```
사용자 클릭 "다음 문법"
    ↓
page.tsx: setCurrentDay(2)
    ↓
useGrammarLesson(2) 훅 실행
    ↓
fetch('/api/grammar?day=2')
    ↓
API Route: Claude API 호출
    ↓
AI가 문법 생성
    ↓
JSON 반환
    ↓
useGrammarLesson: setLesson(data)
    ↓
page.tsx: 컴포넌트에 props 전달
    ↓
화면 업데이트
```

---

## 🎯 컴포넌트 계층 구조

```
DailyGrammarPage (page.tsx)
├── Header
├── main
│   ├── DayCounter
│   ├── SentenceCard
│   ├── GrammarExplanation
│   ├── ExampleSentences
│   └── Navigation Buttons
└── Footer
```

---

## 💡 설계 원칙

### 1. **단일 책임 원칙**
각 컴포넌트는 하나의 역할만 수행
```typescript
// ✅ Good: 한 가지 역할
<SentenceCard />

// ❌ Bad: 여러 역할
<SentenceCardWithGrammarAndExamples />
```

### 2. **재사용성**
Props를 통해 다양한 상황에 사용 가능
```typescript
<DayCounter 
  day={1} 
  onNext={() => setDay(2)} 
/>
```

### 3. **관심사 분리**
- **UI**: Components
- **상태관리**: Hooks
- **범용도구 및 외부 라이브러리**: Lib,
- **서비스**: Service

### 4. **타입 안정성**
모든 Props와 함수에 TypeScript 타입 정의

---

---

## 📦 Import 경로

### Alias 사용
```typescript
// ✅ Good: Alias 사용
import Header from '@/components/Header';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

// ❌ Bad: 상대 경로
import Header from '../../components/Header';
```

### 설정 (tsconfig.json)
```json
{
  "paths": {
    "@/*": ["./*"],
    "@/components/*": ["./components/*"],
    "@/hooks/*": ["./hooks/*"],
    "@/lib/*": ["./lib/*"],
    "@/types/*": ["./types/*"]
  }
}
```

---

## ✅ 코드 품질

### 1. 컴포넌트는 순수 함수
```typescript
// ✅ Props만 의존
function MyComponent({ data }) {
  return <div>{data}</div>;
}

// ❌ 외부 변수 의존
let globalData;
function MyComponent() {
  return <div>{globalData}</div>;
}
```

### 2. Hook은 최상위에서만
```typescript
// ✅ Good
function MyComponent() {
  const { data } = useData();
  return <div>{data}</div>;
}

// ❌ Bad: 조건문 안에서
function MyComponent() {
  if (condition) {
    const { data } = useData(); // 에러!
  }
}
```

### 3. 이벤트 핸들러 네이밍
```typescript
// ✅ handle + 동사
const handleClick = () => {};
const handleSubmit = () => {};

// ❌ 애매한 이름
const onClick = () => {};
const submit = () => {};
```

---

## 🧪 테스트 (향후)

```typescript
// components/__tests__/SentenceCard.test.tsx
import { render, screen } from '@testing-library/react';
import SentenceCard from '../SentenceCard';

test('renders sentence', () => {
  render(
    <SentenceCard 
      sentence="Hello" 
      translation="안녕" 
      isPlaying={false}
      onPlay={() => {}}
    />
  );
  
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

---

라이선스
MIT

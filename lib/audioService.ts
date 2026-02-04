// lib/audioService.ts

/**
 * 무료 Web Speech API를 사용한 음성 재생 서비스
 */

interface AudioServiceOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private defaultOptions: AudioServiceOptions = {
    lang: 'en', // Google TTS는 'en-US' 대신 'en'을 기본으로 사용 가능
  };

  private getGoogleTTSUrl(text: string, lang: string = 'en'): string{
    const encodedText = encodeURIComponent(text);
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${lang}&client=tw-ob`;
  }

  /**
   * 최고 품질의 음성 선택
   */
  private selectBestVoice(lang: string = 'en-US'): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    
    // 우선순위: Google > Microsoft > Apple > 기타
    return (
      voices.find((v) => v.lang === lang && v.name.includes('Google')) ||
      voices.find((v) => v.lang === lang && v.name.includes('Microsoft')) ||
      voices.find((v) => v.lang === lang && v.name.includes('Apple')) ||
      voices.find((v) => v.lang === lang) ||
      voices[0]
    );
  }

async play(text: string, options?: AudioServiceOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return reject(new Error('지원하지 않는 브라우저입니다.'));
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // 기기 판별
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    // 1. 기기별 엔진 최적화 파라미터
    if (isIOS) {
      utterance.rate = options?.rate || 1.0; 
      utterance.pitch = 1.0; 
    } else if (isAndroid) {
      // 안드로이드는 0.9~1.0 속도에서 가장 선명함
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = 1.0;
    } else {
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = options?.pitch || 1.0;
    }

    utterance.lang = options?.lang || 'en-US';

    // 2. 기기별 보이스 매칭 로직
    let selectedVoice = null;

    if (isIOS) {
      // iOS 전용: Samantha
      selectedVoice = 
        voices.find(v => v.name.includes('Samantha') && v.name.includes('Enhanced')) ||
        voices.find(v => v.name.includes('Samantha'));
    } else if (isAndroid) {
      // 안드로이드 전용: Google 영어 엔진 (퀄리티가 가장 좋음)
      selectedVoice = 
        voices.find(v => v.name.includes('Google') && v.lang.startsWith('en-US')) ||
        voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
        voices.find(v => v.lang.startsWith('en-US'));
    } else {
      // PC: Google 크롬 기본 엔진 우선
      selectedVoice = 
        voices.find(v => v.name.includes('Google') && v.lang === 'en-US') ||
        voices.find(v => v.lang === 'en-US');
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    // iOS 전용 딜레이 (안드로이드/PC는 즉시 실행)
    const playDelay = isIOS ? 100 : 0;
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, playDelay);
  });
}

  /**
   * 재생 중지
   */
  stop(): void {
 if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    // 기존 Web Speech API도 혹시 모르니 중지
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }



  /**
   * 브라우저 지원 여부 확인 (HTML5 Audio 지원 확인)
   */
  isSupported(): boolean {
    return typeof Audio !== 'undefined';
  }

  /**
   * 사용 가능한 음성 목록 가져오기
   */
  async getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
    return [];
  }

  /**
   * 현재 기기가 모바일인지 확인
   */
 private checkIsMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

}

// 싱글톤 인스턴스
export const audioService = new AudioService();
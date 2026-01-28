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

  /**
   * 텍스트를 음성으로 재생
   */
  async play(text: string, options?: AudioServiceOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error('Browser does not support speech synthesis'));
        return;
      }

      const opts = { ...this.defaultOptions, ...options };

      // 이전 재생 중지
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = opts.lang || 'en-US';
      utterance.rate = opts.rate || 0.9;
      utterance.pitch = opts.pitch || 1;

      // 최고 품질 음성 선택
      const voice = this.selectBestVoice(utterance.lang);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        reject(error);
      };

      window.speechSynthesis.speak(utterance);
    });
  }

async playV1(text: string, options?: AudioServiceOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      // 1. 초기화 및 지원 확인
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        return reject(new Error('지원하지 않는 브라우저입니다.'));
      }
      window.speechSynthesis.cancel();

      const opts = { ...this.defaultOptions, ...options };
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = opts.lang || 'en-US';

      const isMobile = this.checkIsMobile();
      if(isMobile){
        // 모바일: 먹먹함을 줄이기 위해 피치를 높이고 속도를 조절
        utterance.rate = options?.rate || 0.85; // 조금 더 천천히
        utterance.pitch = 1.2;  // 음높이를 올려서 선명도 확보
      } else {
        // PC: 기존에 만족하셨던 설정값 유지
        utterance.rate = options?.rate || 0.9;
        utterance.pitch = options?.pitch || 1.0;
      }

      // 2. [핵심] 모바일에서 영어 발음을 강제하기 위한 음성 선택 로직
      const voices = window.speechSynthesis.getVoices();
      // 영어 음성들만 필터링 (en-US, en-GB 등)
      const enVoices = voices.filter(v => v.lang.startsWith('en'));
      
      // 모바일(Android/iOS)에서 품질이 좋은 엔진 순서대로 매칭
      const selectedVoice = 
        enVoices.find(v => v.name.includes('Google') && v.lang === 'en-US') ||
        enVoices.find(v => v.name.includes('Apple') && v.lang === 'en-US') ||
        enVoices.find(v => v.lang === 'en-US') ||
        enVoices[0]; // 영어라면 아무거나

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);

      window.speechSynthesis.speak(utterance);
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
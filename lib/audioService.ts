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
        utterance.rate = options?.rate || 1.0;  // 0.85보다 1.0이 더 선명할 수 있습니다.
        utterance.pitch = 1.0;                 // 피치를 올리지 말고 기본값 유지
        utterance.volume = 1.0;                // 볼륨 강제 최대화
      } else {
        // PC: 기존에 만족하셨던 설정값 유지
        utterance.rate = options?.rate || 0.9;
        utterance.pitch = options?.pitch || 1.0;
      }
      // 2. [iOS 핵심] Samantha 또는 Samantha (Enhanced) 찾기
      // iOS에서 가장 선명한 영어 목소리는 'Samantha'
      const voices = window.speechSynthesis.getVoices();

      let selectedVoice = null;
      if (isMobile) {
        // 1순위: Enhanced(고품질) 사만다, 2순위: 일반 사만다, 3순위: 그외 영어
        selectedVoice = 
          voices.find(v => v.name.includes('Samantha') && v.name.includes('Enhanced')) ||
          voices.find(v => v.name.includes('Samantha')) ||
          voices.find(v => v.lang.startsWith('en-US')) ||
          voices.find(v => v.lang.startsWith('en'));
      } else {
        selectedVoice = 
          voices.find(v => v.name.includes('Google') && v.lang === 'en-US') ||
          voices.find(v => v.lang === 'en-US');
      }

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
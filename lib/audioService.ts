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
  private defaultOptions: AudioServiceOptions = {
    lang: 'en-US',
    rate: 0.9,
    pitch: 1,
  };

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

  /**
   * 재생 중지
   */
  stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * 브라우저 지원 여부 확인
   */
  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  /**
   * 사용 가능한 음성 목록 가져오기
   */
  async getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();

      if (voices.length > 0) {
        resolve(voices);
      } else {
        // 일부 브라우저는 비동기로 로드됨
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          resolve(voices);
        };
      }
    });
  }
}

// 싱글톤 인스턴스
export const audioService = new AudioService();
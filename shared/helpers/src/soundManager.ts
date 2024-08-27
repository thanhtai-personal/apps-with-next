export class SoundManager {
  private static instance: SoundManager;
  private audioElement: HTMLAudioElement;
  private soundSrc: string | undefined;
  private isPlaying: boolean;
  private config: any;

  private constructor() {
    this.isPlaying = false;
    this.config = {
      loop: true,
    }
    this.audioElement = document.getElementById("app-audio") as HTMLAudioElement;
    if (!this.audioElement) {
      console.warn("Audio element was not loaded");
    } else {
      this.audioElement.addEventListener('ended', this.onSoundEnded);
    }
  }

  reloadAudioElement = (audioElement: HTMLAudioElement) => {
    if (!SoundManager.instance) return;
    this.audioElement = audioElement;
    this.audioElement.addEventListener('ended', this.onSoundEnded);
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  loadSound(src: string) {
    if (!this.audioElement) return;
    this.soundSrc = src;
    this.audioElement.src = this.soundSrc;
    // Check if audio can be played, and if not, handle it gracefully
    if (this.audioElement.canPlayType && !this.audioElement.canPlayType('audio/mpeg')) {
      console.error('Browser does not support MP3 audio format.');
    }
  }

  playSound() {
    if (!this.audioElement) return;
    if (!this.isPlaying) {
      this.audioElement.play();
      this.isPlaying = true;
    }
  }

  pauseSound() {
    if (!this.audioElement) return;
    if (this.isPlaying) {
      this.audioElement.pause();
      this.isPlaying = false;
    }
  }

  stopSound() {
    if (!this.audioElement) return;
    if (this.isPlaying) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.isPlaying = false;
    }
  }

  onChangeSound(src: string) {
    if (!this.audioElement) return;
    this.stopSound();
    this.loadSound(src);
    this.playSound();
  }

  setConfig = (config: any) => {
    this.config = {
      ...this.config,
      ...config
    }
  }

  restart = () => {
    if (!this.audioElement) return;
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.audioElement.play();
    this.isPlaying = true;
  }

  private onSoundEnded = () => {
    if (this.config.loop) {
      this.restart();
    } else {
      this.isPlaying = false;
    }
  };
}

export default SoundManager.getInstance();
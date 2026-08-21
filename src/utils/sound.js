// Web Audio API Sound Generator for Thobix Eclou Portfolio
// Synthesizes camera shutter clicks and subtle filter tick sound feedback

class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Camera Shutter Click Sound
  playShutterClick() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Click 1 (Mirror flip)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(80, now + 0.04);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Click 2 (Curtain close)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(450, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(120, now + 0.09);
      gain2.gain.setValueAtTime(0.3, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.09);
    } catch {
      // Ignore audio policy errors
    }
  }

  // Filter tab / button tick sound
  playFilterTick() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.015);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.015);
    } catch {
      // Ignore audio policy errors
    }
  }
}

export const soundFx = new SoundEffects();

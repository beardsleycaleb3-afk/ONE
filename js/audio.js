// Sultan 47 APU - e0-e9 Chiptunes
export class GlyphAudio {
    constructor() {
        this.audioCtx = new AudioContext();
    }
    
    playGlyphSound(glyph) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        const freqs = {
            'o1': 220, 'O9': 440, 'qxb': 330,
            'dxp': 277, '08': 523, '18': 392
        };
        
        osc.frequency.value = freqs[glyph] || 440;
        osc.type = 'square';  // NES style
        
        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.1);
    }
}

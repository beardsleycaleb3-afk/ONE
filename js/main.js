import { ECS } from './js/ecs.js';
import { DBM } from './js/library.js';

class Sultan47RPG {
    constructor() {
        this.ecs = new ECS();
        this.dbm = new DBM(this.ecs);
        this.canvas = document.getElementById('screen');
        this.ctx = this.canvas.getContext('2d');
        this.running = false;
        
        this.loadGlyphGame('x1X1(w0W9(b0(o1O9)))');  // God String boot
        this.gameLoop();
    }
    
    loadGlyphGame(strand) {
        if (SULTAN47.validateStrand(strand)) {
            this.dbm.execute(strand);
            document.getElementById('strand').textContent = strand;
            document.getElementById('sbuf').textContent = S_BUF.length;
        }
    }
    
    gameLoop() {
        if (!this.running) return;
        
        this.ctx.fillStyle = '#0a0a15';
        this.ctx.fillRect(0,0,256,224);
        
        // Render ECS entities via glyph instructions
        this.ecs.entities.forEach(e => {
            if (e.sprite) {
                this.ctx.fillStyle = e.color || '#0f0';
                this.ctx.fillRect(e.x, e.y, 8, 8);
                this.ctx.fillStyle = '#fff';
                this.ctx.font = '8px monospace';
                this.ctx.fillText(e.glyph || 'V', e.x, e.y+6);
            }
        });
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

window.rpg = new Sultan47RPG();

// Sultan 47 Inventory - DBM Loot Compression
export class GlyphInventory {
    constructor() {
        this.items = new Map();
        this.strand = '';
    }
    
    addLoot(glyphStrand) {
        const kernel = new Sultan47Kernel();
        kernel.processStrand(glyphStrand);
        
        const item = {
            glyph: kernel.meta.glyph,
            power: kernel.meta.mirror_index,
            type: glyphStrand.includes('08') ? 'turbo' : 'shield'
        };
        
        this.items.set(item.glyph, item);
        gameState.powerUp = item.type;
    }
    
    // Your glyph loot table
    static LOOT_TABLE = {
        'a1+o1': { name: 'turbo', glyph: '08', power: 2 },
        'A1+o6': { name: 'shield', glyph: '18', power: 3 },
        'b0O9':  { name: 'juke', glyph: 'dxp', power: 1 }
    };
}

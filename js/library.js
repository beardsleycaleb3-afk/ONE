// Sultan 47 DBM - 36 Glyph → 6502 → ECS Co-Processor
// ©eagle_bd March 2026 - Kent City, MI

const SULTAN47 = {
    // 8-Bit Memory Map (Your spec)
    MEMORY_MAP: {
        0x0000: 'ZERO_PAGE',    // o1-o9 accumulator
        0x0100: 'STACK',        // ( ) nesting
        0x2000: 'PPU',          // a1-A9 sprites
        0x4000: 'APU',          // e0-e9 audio
        0x8000: 'PRG_ROM'       // b0,d1 subroutines
    },

    // Glyph → 6502 Opcode → ECS Function
    GLYPH_MAP: {
        // Math/Combat
        'o1': { opcode: 'LDA #$01', ram: 0x00, exec: (ecs) => ecs.acc = 1 },
        'O9': { opcode: 'CMP #$09', ram: 0x09, exec: (ecs) => ecs.acc ^= 9 },
        '0':  { opcode: 'CLC', ram: 0x00, exec: (ecs) => ecs.flags.c = 0 },

        // Graphics
        'a1': { opcode: 'LDX #$01;STX $2003', ppu: 0x2003, exec: (ecs, id) => ecs.sprites.set(id, {x:0,y:0}) },
        'A1': { opcode: 'LDA #$20;STA $2006', ppu: 0x2006, exec: (ecs) => ecs.tilemap.set(0x20, 'grass') },

        // Flow
        'b0': { opcode: 'JSR $C000', rom: 0xC000, exec: (ecs) => ecs.state = 'combat' },
        '(':  { opcode: 'JSR', ram: 0x0100, exec: (ecs) => ecs.stack.push(ecs.pc) },
        ')':  { opcode: 'RTS', ram: 0x0100, exec: (ecs) => ecs.pc = ecs.stack.pop() },
        '+':  { opcode: 'ORA', ram: 0x00, exec: (ecs,a,b) => ecs.acc |= a | b }
    },

    // H6_G Validation (Your exact order)
    validateStrand(strand) {
        return H1_translate(strand) &&
               H2_accept(strand) && 
               H3_convert(strand) &&
               H4_orchestrate(strand) &&
               H5_mirror(strand);
    }
};

// Your exact H-Gates
function H1_translate(strand) { return strand.length >= 8; }
function H2_accept(strand) { 
    try { return parseInt(strand.slice(0,8), 2) < 256; } catch(e) { return false; }
}
function H3_convert(strand) { 
    const glyphs = Object.keys(SULTAN47.GLYPH_MAP);
    return glyphs.some(g => strand.includes(g)); 
}
function H4_orchestrate(strand) { return (parseInt(strand.slice(0,8),2) ^ 0xFF) < 255; }
function H5_mirror(strand) { return strand.match(/[qdx]/); }

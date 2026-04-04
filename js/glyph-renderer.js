// Your exact glyph diamond from screenshot
export function renderGlyphRitual(ctx, strand) {
    const positions = {
        top:    [{x:128,y:20,label:'Is'},{x:100,y:40,label:'Ai'},{x:156,y:40,label:'Dm'}],
        center: {x:128,y:100,label:'00'},
        bottom: [{x:100,y:160,label:'Pd'},{x:156,y:160,label:'In'}]
    };
    
    // Green top diamond (source)
    ctx.fillStyle = '#0f0';
    positions.top.forEach(p => {
        ctx.fillText(p.label, p.x, p.y);
    });
    
    // White center
    ctx.fillStyle = '#fff';
    ctx.fillText(positions.center.label, positions.center.x, positions.center.y);
    
    // Blue bottom (manifest)
    ctx.fillStyle = '#00f';
    positions.bottom.forEach(p => {
        ctx.fillText(p.label, p.x, p.y);
    });
}

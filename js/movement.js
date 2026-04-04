// Sultan 47 Movement - Operator Path Compression
export function glyphMovement(player, inputs, strand) {
    const kernel = new Sultan47Kernel();
    kernel.processStrand(strand);
    
    const dx = inputs.right ? 2 : inputs.left ? -2 : 0;
    const dy = inputs.down ? 1 : inputs.up ? -1 : 0;
    
    player.vx = dx * (gameState.powerUp === 'turbo' ? 1.5 : 1);
    player.vy = dy;
    
    // qxb/dxp operator validation
    if (strand.includes('qxb')) player.juke = true;
    if (strand.includes('dxp')) player.sprint = true;
}

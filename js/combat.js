// Pure glyph combat - no graphics needed
export function glyphCombat(player, enemy) {
    SULTAN47.execute('b0(o1O9)');  // JSR Combat(LDA1,CMP9)
    
    const damage = SULTAN47.acc;
    enemy.hp -= damage;
    
    if (enemy.hp <= 0) {
        SULTAN47.execute('d1(a1+o1)');  // Loot drop
        player.inventory.push('sword');
    }
}

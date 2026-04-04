// Cache glyph strands for offline
const CACHE_NAME = 'sultan47-v1';
const STRANDS = [
    '00011000VAWqxb08',  // Kickoff
    '00110000MIXdxp10',  // Defense
    '01001000POQ18'      // Pass
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => 
            cache.addAll(STRANDS.map(s => `/strands/${s}.json`))
        )
    );
});

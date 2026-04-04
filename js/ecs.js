export class ECS {
    constructor() {
        this.entities = new Map();
        this.components = {
            position: new Map(),
            sprite: new Map(),
            stats: new Map()
        };
        this.acc = 0;
        this.pc = 0x0000;
        this.stack = [];
        this.state = 'title';
    }
    
    createEntity(id) {
        const entity = { id };
        this.entities.set(id, entity);
        return entity;
    }
    
    addComponent(entityId, type, data) {
        if (!this.entities.has(entityId)) return;
        this.components[type].set(entityId, data);
    }
}

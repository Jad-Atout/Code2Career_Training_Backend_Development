export class BaseRepository {
    items;
    constructor(data) {
        this.items = data;
    }
    async getAll() {
        return this.items;
    }
    async getById(id) {
        return this.items.find(item => item.id === id);
    }
    async create(item) {
        this.items.push(item);
        return item;
    }
    async update(id, item) {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1)
            return undefined;
        this.items[index] = { ...this.items[index], ...item };
        return this.items[index];
    }
    async delete(id) {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1)
            return false;
        this.items.splice(index, 1);
        return true;
    }
    async find(filter) {
        return this.items.filter(item => Object.entries(filter).every(([key, value]) => item[key] === value));
    }
}

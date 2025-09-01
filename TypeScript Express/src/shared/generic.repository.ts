export class GenericRepository<T extends { id: string; createdAt: Date; updatedAt: Date }> {
    private items: T[] = [];
    private idCounter = 1;

    findAll(): T[] {
        return this.items;
    }

    findById(id: string): T | undefined {
        return this.items.find(item => item.id === id);
    }

    create(itemData: Omit<T, "id" | "createdAt" | "updatedAt">): T {
        const newItem: T = {
            ...itemData,
            id: this.idCounter.toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        } as T;

        this.items.push(newItem);
        this.idCounter++;
        return newItem;
    }

    update(id: string, updates: Partial<Omit<T, "id" | "createdAt">>): T | null {
        const item = this.findById(id);
        if (!item) return null;

        Object.assign(item, updates, { updatedAt: new Date() });
        return item;
    }

    delete(id: string): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) return false;

        this.items.splice(index, 1);
        return true;
    }
}

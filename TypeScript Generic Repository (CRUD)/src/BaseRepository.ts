import {IRepository} from "./IRepository.js";

export class BaseRepository <T extends {id:string}> implements IRepository <T> {
    protected items: T[]

    constructor(data: T[]) {
        this.items = data
    }

    async getAll(): Promise<T[]>{
        return this.items;
    }

    async getById(id:string): Promise<T|undefined>{
        return this.items.find(item=>item.id === id);
    }

    async create(item:T):Promise<T>{
        this.items.push(item);
        return item;
    }

    async update(id:string, item:Partial<T>): Promise<T | undefined> {
        const index = this.items.findIndex(i => i.id === id);
        if(index === -1) return undefined
        this.items[index] = {...this.items[index],...item}
        return this.items[index];
    }

    async delete(id:string):Promise<boolean> {
        const index = this.items.findIndex(i => i.id === id);
        if(index === -1) return false;
        this.items.splice(index, 1);
        return true;
    }

    async find(filter: Partial<T>): Promise<T[]> {
        return this.items.filter(item =>
            Object.entries(filter).every(([key, value]: [string, unknown]) =>
                item[key as keyof T] === value
            )
        );
    }
}

type RefreshRecord = {
    userId: string;
    jti: string;
    createdAt: number;
};

class InMemoryRefreshStore {
    private byJti = new Map<string, RefreshRecord>();

    add(record: RefreshRecord) {
        this.byJti.set(record.jti, record);
    }

    get(jti: string): RefreshRecord | undefined {
        return this.byJti.get(jti);
    }

    delete(jti: string) {
        this.byJti.delete(jti);
    }

    revokeAllForUser(userId: string) {
        for (const [k, v] of this.byJti.entries()) {
            if (v.userId === userId) this.byJti.delete(k);
        }
    }
}

export const refreshStore = new InMemoryRefreshStore();

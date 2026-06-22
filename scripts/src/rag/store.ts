import { Document, VectorStore } from './VectorStore.js';

const store = new VectorStore<Document>();
let initialized = false;

export async function getStore(name: string): Promise<VectorStore<Document>> {
    if (!initialized) {
        await store.init(name);
        initialized = true;
    }
    return store;
}

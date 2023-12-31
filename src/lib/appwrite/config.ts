import { Client, Account, Databases, Avatars, Storage} from 'appwrite';

export const client = new Client();

export const config = {
    projectId: import.meta.env.VITE_APPWRITE_ID_PROJECT ,
    databaseId: import.meta.env.VITE_APPWRITE_ID_DATABASE,
    storageId: import.meta.env.VITE_APPWRITE_ID_STORAGE,
    saveCollectionId: import.meta.env.VITE_APPWRITE_ID_SAVES_COLLECTION,
    postCollectionId: import.meta.env.VITE_APPWRITE_ID_POSTS_COLLECTION,
    userCollectionId: import.meta.env.VITE_APPWRITE_ID_USERS_COLLECTION,
}

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(config.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);

export { ID } from 'appwrite';

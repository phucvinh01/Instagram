import { Client, Account} from 'appwrite';

export const client = new Client();

const config = {
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
export { ID } from 'appwrite';

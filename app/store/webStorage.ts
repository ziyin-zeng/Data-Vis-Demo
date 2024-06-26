// Work around from : https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

export const storage = typeof window !== "undefined" ? createWebStorage("session") : createNoopStorage();
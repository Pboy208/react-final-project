import { getAuthenStore } from "../database/indexedDB";
import { v4 as uuid } from "uuid";
import md5 from "md5";

export const logIn = async ({ email, password }) => {
    const store = await getAuthenStore();
    const emailPasswordIndex = store.index("email_password");
    const query = emailPasswordIndex.get([email, md5(password)]);

    let resolvePromise;
    const promise = new Promise((resolve) => (resolvePromise = resolve));

    query.onsuccess = async () => {
        const user = query.result;
        if (!user) resolvePromise(null);
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxlbyBOZ3V5ZW4iLCJpYXQiOjE2NDc2MTUzOTksImV4cCI6NzM2NDc2MTUzOTl9.mVRG2x_W8U8fBUjwb1nO7GErmuneTdPv4JSGyUfcaLk";
        resolvePromise(token);
    };
    return promise;
};

export const register = async (registerInfo) => {
    const store = await getAuthenStore();
    const request = store.put({ ...registerInfo, id: uuid() });

    let resolvePromise;
    let rejectPromise;
    const promise = new Promise((resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
    });

    request.onsuccess = async () => {
        resolvePromise();
    };

    request.onerror = async (error) => {
        //email is dupplicate
        rejectPromise();
    };
    return promise;
};

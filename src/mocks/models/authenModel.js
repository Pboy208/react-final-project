import { getAuthenStore } from "../database/indexedDB";
import { v4 as uuid } from "uuid";
import md5 from "md5";
import sign from "jwt-encode";
import decode from "jwt-decode";
export const logIn = async ({ email, password }) => {
    const store = await getAuthenStore();
    const emailPasswordIndex = store.index("email_password");
    const query = emailPasswordIndex.get([email, md5(password)]);

    let resolvePromise;
    const promise = new Promise((resolve) => (resolvePromise = resolve));

    query.onsuccess = async () => {
        const user = query.result;
        if (!user) return resolvePromise(null);
        const token = sign(user.id, "SECRET_KEY");
        return resolvePromise(token);
    };
    return promise;
};

export const register = async (registerInfo) => {
    const store = await getAuthenStore();
    const request = store.put({
        ...registerInfo,
        id: uuid(),
        password: md5(registerInfo.password),
    });

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

export const verifyToken = async (token) => {
    let resolvePromise;
    let userId;
    const promise = new Promise((resolve) => (resolvePromise = resolve));
    try {
        userId = decode(token);
    } catch (error) {
        console.log("error in verify token", error);
        return false;
    }
    const store = await getAuthenStore();
    const query = store.get(userId);
    query.onsuccess = async () => {
        const user = query.result;
        if (!user) return resolvePromise(false);
        return resolvePromise(true);
    };

    return promise;
};

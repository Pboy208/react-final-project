import { setupWorker } from "msw";
import { handlers } from "./handlers";

// This configures a Service Worker with the given request handlers.
console.log("service worker started");
export const worker = setupWorker(...handlers);

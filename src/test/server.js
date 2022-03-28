import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

export const serverOn = server.listen();
export const serverOff = server.close();
export const resetHandlers = server.resetHandlers();

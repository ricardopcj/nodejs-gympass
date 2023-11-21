import { FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", (_, reply) => {
    return reply.status(200).send();
  });
  app.post("/users", register);
  app.post("/sessions", authenticate);
}

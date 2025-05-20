import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";

import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { profile } from "./profile.controller";
import { refresh } from "./refresh.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/", (_, reply) => {
    return reply.status(200).send();
  });
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.patch("/token/refresh", refresh);
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}

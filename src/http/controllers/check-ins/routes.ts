import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

import { create } from "./create.controller";
import { validate } from "./validate.controller";
import { history } from "./history.controller";
import { metrics } from "./metrics.controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate,
  );

  if (process.env.NODE_ENV === "test") {
    app.patch("/users/test/promote-admin", async (request, reply) => {
      const { email } = request.body as { email: string };
      await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
      });

      return reply.status(204).send();
    });
  }
}

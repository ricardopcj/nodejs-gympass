import fs from "node:fs";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

const privateKey = fs.readFileSync("./private-key.pem", "utf8");
const publicKey = fs.readFileSync("./public-key.pem", "utf8");

app.register(fastifyJwt, {
  secret: {
    private: privateKey,
    public: publicKey,
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    algorithm: "RS256",
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError)
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });

  if (env.NODE_ENV !== "prod") console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});

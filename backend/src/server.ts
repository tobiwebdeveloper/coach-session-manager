import Fastify from "fastify"
import cors from "@fastify/cors"
import { pool } from "./db/connection.js"
import { sessionRoutes } from "./routes/sessions.js"

const app = Fastify({
  logger: true
})

await app.register(cors, {
  origin: true
})

app.register(sessionRoutes)

app.get("/", async () => {
  const result = await pool.query("SELECT NOW()")

  return {
    message: "Coach Session Manager API",
    databaseTime: result.rows[0].now
  }
})

app.listen({ port: 3000 })
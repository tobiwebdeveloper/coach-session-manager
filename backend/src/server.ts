import Fastify from "fastify"

const app = Fastify({
    logger: true
})

app.get("/", async () => {
    return {
        message: "Coach Session Manager API"
    }
})

app.listen({ port: 3000})
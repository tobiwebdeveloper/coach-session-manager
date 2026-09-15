import type { FastifyInstance } from "fastify";
import { pool } from "../db/connection.js";
import {
    CreateSessionSchema,
    SessionIdSchema
} from "../schemas/sessions.js";
import { Type } from "@sinclair/typebox";

export async function sessionRoutes(app: FastifyInstance){

    // Get /sessions
    app.get("/sessions", async () => {
        const result = await pool.query(`
            SELECT
                id,
                coach_id,
                date,
                time,
                location,
                age_group
                capacity
            FROM sessions
            ORDER BY date, time
        `)

        return result.rows
    });

    // GET /sessions/:id

    app.get("/sessions/:id",
        { schema: {
            params: SessionIdSchema
        }
    },
    async (request, reply) => {
        const { id } = request.params as { id: string }

        const result = await pool.query(`
            SELECT
            id,
            coach_id,
            date,
            time,
            location,
            age_group,
            capacity
            FROM sessions
            WHERE id = $1
            `,
            [id]
        )

        if (result.rows.length === 0){
            return reply.code(404).send({
                error: "Session not found"
            })
        }

        return result.rows[0]
    }
    )
    // POST /sessions
    app.post(
        "/sessions",
        {
            schema: {
                body: CreateSessionSchema
            }
        },
        async (request, reply) => {
            const body = request.body as {
                coachId: string
                date: string
                time: string
                location: string
                ageGroup: string
                capacity: number
            }

            const result = await pool.query(
                `
                INSERT INTO sessions (
                coach_id,
                date,
                time,
                location,
                age_group,
                capacity
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `,
                [
                    body.coachId,
                    body.date,
                    body.time,
                    body.location,
                    body.ageGroup,
                    body.capacity
                ]
            )
           return reply.code(201).send(result.rows[0])
        });
    // Patch sessions/:id
    app.patch("/sessions/:id",
        {
            schema: {
                params: SessionIdSchema,
                body: CreateSessionSchema
            }
        },
        async (request, reply) => {
            const { id } = request.params as { id: string }

            const body = request.body as {
                coachId: string
                date: string
                time: string
                location: string
                ageGroup: string
                capacity: number
            }

            const result = await pool.query(`
                UPDATE sessions
                SET
                    date = $1,
                    time = $2,
                    location = $3,
                    age_group = $4,
                    capacity = $5
                WHERE id = $6
                    AND coach_id = $7
                RETURNING *
                `,
                [
                    body.date,
                    body.time,
                    body.location,
                    body.ageGroup,
                    body.capacity,
                    id,
                    body.coachId
                ]
            )
            if (result.rows.length === 0){
                return reply.code(404).send({
                    error: "Session not found or you do not own it"
                })
            }
        
            return result.rows[0]
        }
    )

    // DELETE /sessions/:id


    app.delete(
  "/sessions/:id",
  {
    schema: {
      params: SessionIdSchema
    }
  },
  async (request, reply) => {
    const { id } = request.params as { id: string }

    const result = await pool.query(
      `
      DELETE FROM sessions
      WHERE id = $1
      RETURNING id
      `,
      [id]
    )

    if (result.rows.length === 0) {
      return reply.code(404).send({
        error: "Session not found"
      })
    }

    return {
      message: "Session deleted"
    }
  });


    // POST /sessions/:id/book
  app.post("/sessions/:id/book",
    { 
        schema: {
            params: SessionIdSchema,
            body: Type.Object({
                playerId: Type.String({ format: "uuid"})
            })
        }
    },

    async (request, reply) => {
        const { id } = request.params as { id: string }

        const { playerId } = request.body as {
            playerId: string
        }
        const sessionResult = await pool.query(
            `
            SELECT
            id
            capacity
            FROM sessions
            WHERE id = $1
            `,
            [id]
        )
        if (sessionResult.rows.length === 0){
            return reply.code(404).send({
                error: "Session not found"
            })
        }

        const session = sessionResult.rows[0]

        const bookingCountResult = await pool.query(
            `
            SELECT COUNT(*)::int AS count
            FROM bookings
            WHERE session_id = $1
            `,
            [id]
        )
        const bookingCount = bookingCountResult.rows[0].count

        if (bookingCount >= session.capacity) {
        return reply.code(409).send({
            error: "Session is full"
        })
        }

        try {
            const result = await pool.query(
                `
                INSERT INTO bookings (session_id, player_id)
                VALUES ($1, $2)
                RETURNING *
                `,
                [id, playerId]
            )

            return reply.code(201).send(result.rows[0])
        } catch (error: any) {
      if (error.code === "23505") {
        return reply.code(409).send({
          error: "Player is already booked"
        })
      }

      throw error
    }

    });

    app.delete(
  "/sessions/:id/book",
  {
    schema: {
      params: SessionIdSchema,
      body: Type.Object({
        playerId: Type.String({ format: "uuid" })
      })
    }
  },
  async (request, reply) => {
    const { id } = request.params as { id: string }

    const { playerId } = request.body as {
      playerId: string
    }

    const result = await pool.query(
      `
      DELETE FROM bookings
      WHERE session_id = $1
        AND player_id = $2
      RETURNING id
      `,
      [id, playerId]
    )

    if (result.rows.length === 0) {
      return reply.code(404).send({
        error: "Booking not found"
      })
    }

    return {
      message: "Booking cancelled"
    }
  });

  app.get(
  "/sessions/:id/attendance",
  {
    schema: {
      params: SessionIdSchema
    }
  },
  async (request) => {
    const { id } = request.params as { id: string }

    const result = await pool.query(
      `
      SELECT
        bookings.id,
        users.name AS player,
        users.email,
        bookings.attendance
      FROM bookings
      JOIN users
        ON bookings.player_id = users.id
      WHERE bookings.session_id = $1
      ORDER BY users.name
      `,
      [id]
    )

    return result.rows
  });

  app.patch(
  "/bookings/:id/attendance",
  {
    schema: {
      params: Type.Object({
        id: Type.String({ format: "uuid" })
      }),
      body: Type.Object({
        attendance: Type.Boolean()
      })
    }
  },
  async (request, reply) => {
    const { id } = request.params as { id: string }

    const { attendance } = request.body as {
      attendance: boolean
    }

    const result = await pool.query(
      `
      UPDATE bookings
      SET attendance = $1
      WHERE id = $2
      RETURNING *
      `,
      [attendance, id]
    )

    if (result.rows.length === 0) {
      return reply.code(404).send({
        error: "Booking not found"
      })
    }

    return result.rows[0]
  }
)

}
import { Type } from "@sinclair/typebox";

export const CreateSessionSchema = Type.Object({
    coachId: Type.String({ format: "uuid" }),
    date: Type.String(),
    time: Type.String(),
    location: Type.String({ minLength: 1}),
    ageGroup: Type.String({minLength: 1}),
    capacity: Type.Integer({ minimum: 1})
});

export const SessionIdSchema = Type.Object({
    id: Type.String({format: "uuid"})
});
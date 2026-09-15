import type { Session } from "../types/session"
import { API_URL } from "./api"


export async function getSessions(): Promise<Session[]> {
  const response = await fetch(`${API_URL}/sessions`)

  if (!response.ok) {
    throw new Error("Failed to fetch sessions")
  }

  return response.json()
}

export async function createSession(session: {
  coachId: string
  date: string
  time: string
  location: string
  ageGroup: string
  capacity: number
}): Promise<Session> {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(session)
  })

  if (!response.ok) {
    throw new Error("Failed to create session")
  }

  return response.json()
}
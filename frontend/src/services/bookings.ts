import type { Booking } from "../types/booking"

import { API_URL } from "./api"

export async function bookSession(
  sessionId: string,
  playerId: string
): Promise<Booking> {
  const response = await fetch(
    `${API_URL}/sessions/${sessionId}/book`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playerId
      })
    }
  )

  if (!response.ok) {
    const data = await response.json().catch(() => null)

    throw new Error(
      data?.error ?? "Failed to book session"
    )
  }

  return response.json()
}

export async function cancelBooking(
  sessionId: string,
  playerId: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/sessions/${sessionId}/book`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playerId
      })
    }
  )

  if (!response.ok) {
    const data = await response.json().catch(() => null)

    throw new Error(
      data?.error ?? "Failed to cancel booking"
    )
  }
}

export async function getAttendance(
  sessionId: string
): Promise<Booking[]> {
  const response = await fetch(
    `${API_URL}/sessions/${sessionId}/attendance`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch attendance")
  }

  return response.json()
}

export async function updateAttendance(
  bookingId: string,
  attendance: boolean
): Promise<Booking> {
  const response = await fetch(
    `${API_URL}/bookings/${bookingId}/attendance`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        attendance
      })
    }
  )

  if (!response.ok) {
    const data = await response.json().catch(() => null)

    throw new Error(
      data?.error ?? "Failed to update attendance"
    )
  }

  return response.json()
}
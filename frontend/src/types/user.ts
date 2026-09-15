export type UserRole = "coach" | "player"

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
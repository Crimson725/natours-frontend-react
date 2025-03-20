export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  active?: boolean;
} 
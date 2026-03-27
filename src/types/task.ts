export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority?: Priority;
  dueDate?: string;      // ISO date string "YYYY-MM-DD"
  category?: string;
}

export type FilterType = "All" | "Active" | "Completed";

export interface Task {
   id: string;          // Unique identifier  
   text: string;    // Task text
   completed: boolean;  // Status
   createdAt: Date;     // For sorting, optional
}

export type FilterType = "All" | "Active" | "Completed";
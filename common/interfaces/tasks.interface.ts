import { isCompleted } from "common/types/tasks.type";

// Interface for ToDo Item
export interface Task {
    id: number;
    title: string;
    dueDate: string |null;
    description: string | null;
    completed: isCompleted;
    createdAt: string;
    updatedAt: string;
  }

/**
 * Interface for API responses
 */
export interface ApiResponse<T> {
    status: string; // Status of the response, e.g., 'success' or 'error'
    message?: string; // Optional message for additional context
    data?: T; // Optional data payload
}
export interface Todo {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
    status: 'active' | 'inactive' | 'deleted';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
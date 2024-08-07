export interface Todo {
    id?: number;
    title: string;
    description?: string;
    completed: boolean; // Valor padrão é TRUE no banco
    status: 'active' | 'inactive' | 'deleted'; // Adiciona o status
    createdAt?: Date;
    updatedAt?: Date;
  }
  
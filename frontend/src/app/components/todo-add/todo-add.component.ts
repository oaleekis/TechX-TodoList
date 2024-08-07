import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent {
  title: string = '';
  description: string = '';
  status: 'active' | 'inactive' | 'deleted' = 'active';

  constructor(private todoService: TodoService, private router: Router) { }

  addTodo(): void {
    const newTodo: Todo = {
      id: 0,
      title: this.title,
      description: this.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: this.status
    };
    this.todoService.addTodo(newTodo).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
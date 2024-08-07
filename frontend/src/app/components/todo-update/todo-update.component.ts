import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {
  todo: Todo = { id: 0, title: '', description: '', completed: false, createdAt: '', updatedAt: '', status: 'active' };

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.getTodo(+id).subscribe((data: Todo) => {
        this.todo = data;
      });
    } else {
      // Handle the case when id is null (optional)
      console.error('Todo ID is null');
    }
  }

  updateTodo(): void {
    this.todo.updatedAt = new Date().toISOString();
    this.todoService.updateTodo(this.todo.id!, this.todo).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'add', component: TodoAddComponent },
  { path: 'update/:id', component: TodoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
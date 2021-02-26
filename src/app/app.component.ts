import { Component, OnInit } from '@angular/core';
import { strictEqual } from 'assert';
import Swal from 'sweetalert2';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoDataService]
})
export class AppComponent {
  newTodo: Todo = new Todo();

  constructor(
    private todoDataService: TodoDataService,
  ) {}

  ngOnInit() {
    this.getLocalTodos();
    this.todoDataService.lastId = localStorage.Todos.length - 2;
  }

  addTodo() {
    if (this.newTodo.title === '') {
      Swal.fire({
        title: 'Error!',
        text: 'You need to fill the text field',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    } else {
      this.todoDataService.addTodo(this.newTodo);
      this.newTodo = new Todo();
    }
  }

  getLocalTodos() {
    if (localStorage.getItem('Todos') === null) {
      this.todoDataService.todos = [];
    } else {
      this.todoDataService.todos = JSON.parse(
        localStorage.getItem('Todos')
      );
    }
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }


}

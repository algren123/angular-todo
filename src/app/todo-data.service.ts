import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId: number = 0;

  todos: Todo[] = [];

  constructor() { }

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    localStorage.setItem('Todos', JSON.stringify(this.todos));
    return this;
  }

  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    localStorage.setItem('Todos', JSON.stringify(this.todos));
    return this;
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {complete: !todo.complete});
    return updatedTodo;
  }
}

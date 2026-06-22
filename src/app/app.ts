import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Todo_List');
  task = "";
  dueDate = "";
  taskList: { id: number, task: string, completed: boolean, dueDate: string }[] = [];
  showError = false;
  editingId: number | null = null;

  addTask() {
    if (this.task.trim() === "") {
      this.showError = true;
      return;
    }
    this.taskList.push({ id: this.taskList.length + 1, task: this.task, completed: false, dueDate: this.dueDate });
    this.task = "";
    this.dueDate = "";
    this.showError = false;
  }
  
  completeTask(id: number) {
    const taskItem = this.taskList.find(task => task.id === id);
    if (taskItem) {
      taskItem.completed = !taskItem.completed;
    }
  }
  
  editTask(id: number) {
    const taskItem = this.taskList.find(task => task.id === id);
    if (taskItem && this.editingId !== id) {
      this.editingId = id;
      this.task = taskItem.task;
      this.dueDate = taskItem.dueDate;
    } else if (this.editingId === id) {
      if (this.task.trim() === "") {
        this.showError = true;
        return;
      }
      taskItem!.task = this.task;
      taskItem!.dueDate = this.dueDate;
      this.task = "";
      this.dueDate = "";
      this.editingId = null;
      this.showError = false;
    }
  }
  
  deleteTask(id:number) {
    this.taskList = this.taskList.filter(task => task.id !== id);
    this.editingId = null;
}
}
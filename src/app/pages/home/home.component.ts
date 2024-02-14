import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Task} from './../../models/task.models';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks =signal<Task[]>( [
    {
      id: Date.now(),
      title: 'Crear Proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear Componentes',
      completed: false
    },
  ]);

  newTaskCtrl = new FormControl('tarea',{
    nonNullable: true,
    validators: [
      Validators.required,
    ],
  });

  changeHandler(){
    if(this.newTaskCtrl.valid){ //&& !/^\s*$/.test(this.newTaskCtrl.value) opcion para validar que no viene vacio
      const value = this.newTaskCtrl.value.trim();
      if(value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    }
    this.tasks.update((task) => [...task, newTask]);

  }

  deleteTask(index: number){
    this.tasks.update((tasks) =>tasks.filter((task,position) => position !== index));
  }

  /*updateTask(index: number){
    this.tasks.update((tasks) =>
      tasks.map((task, position) => {
        if(position === index){
          task.completed = !task.completed;
        }
        return task;
      })
    );

  }*/

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task,position) => {
        if(position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
    
  }



}

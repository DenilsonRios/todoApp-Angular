import { Component, Injector, computed, effect, inject, signal } from '@angular/core';

import {Task} from './../../models/task.models';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  tasks =signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if(filter == 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;
  }) 

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
    ],
  });

  injector = inject(Injector);

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const storageTasks = JSON.parse(storage);
      this.tasks.set(storageTasks);
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  } 

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

  updateTaskEditingMode(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task,position) => {
        if(position === index){
          return{
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task,position) => {
        if(position === index){
          return{
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }



}

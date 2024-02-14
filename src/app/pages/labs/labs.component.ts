import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicación con Agunlar';
  task =signal( [
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear Componentes'
  ]);
  name = signal('Steven');
  age = 18;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Carlos',
    age: 17,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50,{
    nonNullable: true,
  });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  clickHandler(){
    alert('Diste click')
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);

  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);

  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newAge = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newAge, 10)
      }
    })
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newName = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newName
      }
    })
  }
}

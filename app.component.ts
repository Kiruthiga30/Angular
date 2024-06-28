import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],//import reactive module
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'reactive';
  //formname assigned to formgroup
  reactiveform = new FormGroup({
    //have to define formcontrols
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  ngOnInit(): void { }
  //getter-> to access formcontrol which is to easy to bind in template,instead of getting name in template
  get name() {
    return this.reactiveform.get('name');
  }
  get email() {
    return this.reactiveform.get('email');
  }
  Submit() {
    console.log(this.reactiveform.value);
  }
}


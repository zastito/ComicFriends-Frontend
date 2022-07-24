import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ComicfriendsService } from './../comicfriends.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    email: '',
    user: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private comicfriendsService: ComicfriendsService
  ) { }
  
  ngOnInit() {
  }

  onSubmit(email: string, username: string, password: string): void {
    email = email.trim();
    username = username.trim();
    password = password.trim();
    const userId = '';
    const name = '';
    const sex = '';
    const country = '';
    const description = '';

    if (!email || !username || !password) { return; }

    const newuser = { userId, email, username, password, name, sex, country, description };
    
    this.comicfriendsService.addUser(newuser).subscribe(
      data => {
        if (data != null) {
          window.alert('Se ha registrado correctamente');
          this.checkoutForm.reset();
          this.router.navigateByUrl('/');
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
    }
}
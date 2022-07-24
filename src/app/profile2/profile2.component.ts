import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ComicfriendsService } from '../comicfriends.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit {

  email1 = this.comicfriendsService.data.email;
  username = this.comicfriendsService.data.username;
  name1 = this.comicfriendsService.data.name;
  sex1 = this.comicfriendsService.data.sex;
  country1 = this.comicfriendsService.data.country;
  description1 = this.comicfriendsService.data.description;
  
  checkoutForm = this.formBuilder.group({
    email: '',
    user: '',
    name: '',
    sex: '',
    country: '',
    description: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private comicfriendsService: ComicfriendsService
  ) { }

  ngOnInit() {
  }

  onSubmit(email: string, username: string, name: string, sex: string, country: string, description: string) {
    email = email.trim();
    username = username.trim();
    name = name.trim();
    sex = sex.trim();
    country = country.trim();
    description = description.trim();
    const userId = this.comicfriendsService.data.userId;
    const password = this.comicfriendsService.data.password;

    if (!email || !username ) { 
      return; 
    }

    const newuser = { userId, email, username, name, sex, country, description, password };
    
    this.comicfriendsService.modifyUser(newuser).subscribe(
      data => {
        if (data != null) {
          this.comicfriendsService.data = data;
          window.alert('Perfil modificado');
          this.checkoutForm.reset();
          this.router.navigateByUrl('/profile');
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
    }
    
 }
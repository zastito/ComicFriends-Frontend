import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { ComicfriendsService } from './../comicfriends.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
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

  onSubmit(username: string, password: string): void {
    debugger;
    username = username.trim();
    password = password.trim();

    if (!username || !password) { return; }

    this.comicfriendsService.getUser(username, password).subscribe(
      data => {
        if (data != null) {
          this.comicfriendsService.data = data;
          this.checkoutForm.reset();
          this.router.navigateByUrl('/main');
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
    }

    facebookLogin() {
      this.comicfriendsService.loginbyfacebook().subscribe(
        (text) => {
          if (text != null) {
            debugger;
            this.router.navigateByUrl(text);
            //this.comicfriendsService.data = data;
            //this.checkoutForm.reset();
            //this.router.navigateByUrl('/main');
          }
        },
        (error) => {
          if (error != null) {
            debugger;
            window.location.href = error.error.text;
            //window.alert(error.error.text);
          }
        }
      );
    }
  
    facebookLogin2() {
      this.comicfriendsService.loginbyfacebook2().subscribe(
        (text) => {
          if (text != null) {
            debugger;
  
            this.comicfriendsService.getUserById(text).subscribe(
              (data) => {
                if (data != null) {
                  this.comicfriendsService.data = data;
                  this.checkoutForm.reset();
                  this.router.navigateByUrl('/main');
                }
              },
              (error) => {
                if (error != null) {
                  window.alert(error.error.message);
                }
              }
            );
          }
        },
        (error) => {
          if (error != null) {
            debugger;
            window.location.href = error.error.text;
            //window.alert(error.error.text);
          }
        }
      );
    }
  
}
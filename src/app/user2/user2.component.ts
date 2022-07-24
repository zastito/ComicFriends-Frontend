import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicfriendsService } from '../comicfriends.service';
import { User } from '../user';


@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css']
})
export class User2Component implements OnInit {
  user = User[0];

  constructor(
    private route:ActivatedRoute,
    private comicfriendsService: ComicfriendsService
  ) {     

    let id = this.route.snapshot.paramMap.get('userId');

    if (id != null) {
      this.comicfriendsService.getUserById(id).subscribe(
        data => {
          if (data != null) {
            this.user.email = data.email;
            this.user.username = data.username;
            this.user.name = data.name;
            this.user.sex = data.sex;
            this.user.country = data.country;
            this.user.description = data.description;
            this.user.password = data.password;
        }},
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });
      }
    }

  ngOnInit() {

  }

}
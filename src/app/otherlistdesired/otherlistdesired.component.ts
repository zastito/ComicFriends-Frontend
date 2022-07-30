import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';

@Component({
  selector: 'app-otherlistdesired',
  templateUrl: './otherlistdesired.component.html',
  styleUrls: ['./otherlistdesired.component.css']
})
export class OtherlistdesiredComponent implements OnInit {

  comics = Comic;
  show: boolean = true;
  username3 : string = '';

  constructor(
    private router:Router,
    private comicfriendsService: ComicfriendsService
  ) {     
    
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('userId');

    if (id != null) {
      this.comicfriendsService.getUserById(id).subscribe(
        data => {
          if (data != null) {
            this.username3 = data.username;
        }},
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });

        this.comicfriendsService.getDesiredComics(this.username3).subscribe(
          data => {
            if (data != null) {
              this.comics = data;
            }
          },
          error => {
            if (error != null) {
              window.alert(error.error.message);
            }
          });
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route:ActivatedRoute,
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
            let username = data.username;

            this.comicfriendsService.getDesiredComics(username).subscribe(
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
        }},
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });
    }
  }

}
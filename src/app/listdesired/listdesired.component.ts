import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';

@Component({
  selector: 'app-listdesired',
  templateUrl: './listdesired.component.html',
  styleUrls: ['./listdesired.component.css']
})
export class ListdesiredComponent implements OnInit {

  comics = Comic;
  show: boolean = true;

  constructor(
    private router:Router,
    private comicfriendsService: ComicfriendsService
  ) {     
    this.comicfriendsService.getDesiredComics(this.comicfriendsService.data.username).subscribe(
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

  ngOnInit() {
  }
  delete(comic_num: number) { 
    let user = this.comicfriendsService.data; 
    let n=0;
    let price=0;

    const comicId = this.comics[comic_num].comicId;

    this.comicfriendsService.deleteComicfromList(comicId, user.userId, n, price).subscribe(
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }else {
          window.alert('Cómic eliminado de la lista de deseados');
          this.router.navigateByUrl('/profile');
        }
      });
  }

}
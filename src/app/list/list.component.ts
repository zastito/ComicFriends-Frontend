import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  comics = Comic;
  show: boolean = true;

  checkoutForm = this.formBuilder.group({
    precio: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private comicfriendsService: ComicfriendsService
  ) {     
    let username = this.comicfriendsService.data.username;
    this.comicfriendsService.getOwnedComics(username).subscribe(
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
    
    let comicId = this.comics[comic_num].comicId;
    let title = this.comics[comic_num].title.trim();
    let publisher = this.comics[comic_num].publisher;
    let volume = this.comics[comic_num].volume;
    let issue = this.comics[comic_num].issue;
    let amount = this.comics[comic_num].amount;
    let owner = "";

    let newcomic = {comicId, title, publisher, volume, issue, amount, owner };

    this.comicfriendsService.deleteComic(newcomic, user.userId).subscribe(
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }else {
          window.alert('Comic eliminado');
          this.router.navigateByUrl('/profile');
        }
      });
  }

  sell(comic_num: number, comics: any, precio: string): void  {
    let title0 = comics[comic_num].title;
    let title = title0.replace('%', '%25');
    let user = this.comicfriendsService.data;
    let n=1;
    let price: number= +precio;

    this.comicfriendsService.getComic(title).subscribe(
      data => {
        if (data != null) {
          this.comicfriendsService.addComicToList(data.comicId, user.userId, n, price).subscribe(
            data => {
              if (data != null) { 
                }
              },
            error => {
              if (error != null) {
                window.alert(error.error.message);
              }
            });
            window.alert('Comic puesto a la venta');
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
  }

}
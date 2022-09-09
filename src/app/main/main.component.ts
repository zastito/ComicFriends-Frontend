import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ComicfriendsService } from '../comicfriends.service';
import { ComicPrice } from '../comicPrice';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  comicPrice = ComicPrice[0];
  comicPrices = ComicPrice;
  userId = 0;

  checkoutForm = this.formBuilder.group({
    comic: ''
  });

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private comicfriendsService: ComicfriendsService
  ) { }

  ngOnInit() {
  }

  onSubmit(comic: string): void {
    comic = comic.trim();
    this.comicfriendsService.getComicPrices().subscribe(
      data => {
        if (data != null) {
          let count = 0;
          
          this.comicPrices = [];

          for (let i in data) {

            const result = data[i];    

            let a = result.comic.title.toLowerCase();

            if (a.includes(comic)) {

              this.comicPrices.push(result);

              this.comicPrices[count].comicPriceId = result.id;
              this.comicPrices[count].title = result.comic.title;
              this.comicPrices[count].comicId = result.comic.comicId;
              this.comicPrices[count].userId = result.user.userId;
              this.comicPrices[count].issue = result.comic.issue;
              this.comicPrices[count].owner = result.user.username;
              this.comicPrices[count].price = result.price;
              this.comicPrices[count].publisher = result.comic.publisher;
              this.comicPrices[count].volume = result.comic.volume;

              count++;
            }
          }
      }},
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });

  }

  buy(comicPriceId: string): void {
    this.router.navigateByUrl('/shipping/' + comicPriceId);
  }

  onClick2(comic_num: number, comics: any): void  { //lo quiero
    
    let title0 = comics[comic_num].title;
    let title = title0.replace('%', '%25');
    let user = this.comicfriendsService.data;
    let n=0;
    let price=0;

    this.comicfriendsService.getComic(title).subscribe(
      data => {
        if (data != null) {
          this.comicfriendsService.data2 = data;
          this.comicfriendsService.addComicToList(this.comicfriendsService.data2.comicId, user.userId, n, price).subscribe(
            data => {
              if (data != null) {
                console.log(data);
                }
              },
            error => {
              if (error != null) {
                window.alert(error.error.message);
              }
            });
          window.alert('Comic añadido a la lista de deseados');
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
  }

}
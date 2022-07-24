import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';
import { ComicPrice } from '../comicPrice';

@Component({
  selector: 'app-listsaled',
  templateUrl: './listsaled.component.html',
  styleUrls: ['./listsaled.component.css']
})
export class ListsaledComponent implements OnInit {

  comics = Comic;
  prices: number[] = [];
  sprices: string[] = [];
  show: boolean = true;

  constructor(
    private router:Router,
    private comicfriendsService: ComicfriendsService
  ) {
    debugger;
    let username = this.comicfriendsService.data.username;   
    this.comicfriendsService.getForSaleComics(username).subscribe(
    data => {
      if (data != null) {
        debugger;
        this.comics = data;

        this.comicfriendsService.getComicPrices().subscribe(
          data => {
            if (data != null) {
              debugger;
              let count = 0;
    
              for (let i in data) {
                const result = data[i];    
                let a = result.user.username;
    
                if (a.includes(username)) {
                  this.sprices.push(result.price);
                  count++;
                }
              }
          }},
          error => {
            if (error != null) {
              debugger;
              window.alert(error.error.message);
            }
          });
    
      }
    },
    error => {
      if (error != null) {
        debugger;
        window.alert(error.error.message);
      }
    });
  }

  ngOnInit() {
  }

  delete(comic_num: number) { 
    debugger;
    let user = this.comicfriendsService.data; 
    let n=1;

    //let price: number= +this.comicfriendsService.data4[comic_num].price;
    //let price= price0.toString();

    let comicId = this.comics[comic_num].comicId;
    let title0 = this.comics[comic_num].title;
    let title = title0.replace('%', '%25');
    
    //this.comicfriendsService.getComicPrice(newcomic, price)

    this.comicfriendsService.getComic(title).subscribe(
      data => {
        if (data != null) {
          debugger;
          this.comicfriendsService.data2 = data;

          this.comicfriendsService.getComicPrice(comicId, user.userId).subscribe(
            data => {
              if (data != null) {
                debugger;
                let count = 0;
      
                for (let i in data) {
                  let result: number = data[i].price;
                  this.prices[count] = result;
                  this.sprices[count] = result.toString();
                  count++;
                }

                this.comicfriendsService.deleteComicfromList(this.comicfriendsService.data2.comicId, user.userId, n, this.prices[comic_num]).subscribe(
                  error => {
                    if (error != null) {
                      debugger;
                      window.alert(error.error.message);
                    }else {
                      debugger;
                      window.alert('El cómic ya no está puesto a la venta');
                      this.router.navigateByUrl('/profile');
                    }
                  });
            }},
            error => {
              if (error != null) {
                debugger;
                window.alert(error.error.message);
              }
            });
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });


  }

}
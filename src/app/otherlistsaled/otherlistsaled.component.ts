import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';
import { ComicPrice } from '../comicPrice';

@Component({
  selector: 'app-otherlistsaled',
  templateUrl: './otherlistsaled.component.html',
  styleUrls: ['./otherlistsaled.component.css']
})
export class OtherlistsaledComponent implements OnInit {

  comics = Comic;
  prices: number[] = [];
  sprices: string[] = [];
  show: boolean = true;
  username4 : string = '';

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
            this.username4 = data.username;
        }},
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });

        this.comicfriendsService.getForSaleComics(this.username4).subscribe(
          data => {
            if (data != null) {
              this.comics = data;
      
              this.comicfriendsService.getComicPrices().subscribe(
                data => {
                  if (data != null) {
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
                    window.alert(error.error.message);
                  }
                });
            }    
          }
        },
        error => {
          if (error != null) {
            debugger;
            window.alert(error.error.message);
          }
        });
  }

  }

}
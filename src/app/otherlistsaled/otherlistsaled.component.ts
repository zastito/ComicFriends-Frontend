import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  sprices2: string[] = [];
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

            this.comicfriendsService.getForSaleComics(username).subscribe(
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
                            this.sprices2.push(result.price);
                            count++;
                          }
                        }
                    }},
                    error => {
                      if (error != null) {
                        window.alert(error.error.message);
                      }
                    });
                  }},    
              error => {
                if (error != null) {
                  debugger;
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
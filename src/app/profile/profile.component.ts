import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';
import { ComicPrice } from '../comicPrice';

import { Review } from '../review';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email = this.comicfriendsService.data.email;
  username = this.comicfriendsService.data.username;
  name = this.comicfriendsService.data.name;
  sex = this.comicfriendsService.data.sex;
  country = this.comicfriendsService.data.country;
  description = this.comicfriendsService.data.description;
  comics = Comic;
  reviews = Review;
  receiverComic = Comic[0];
  comic = Comic[0];
  user = User[0];
  users = User;
  comicPrice = ComicPrice[0];
  comicPrices = ComicPrice;
  comictitles: string[];
  usernames: string[];

  checkoutForm = this.formBuilder.group({
    password: '',
  });

  constructor(
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private router:Router,
    private comicfriendsService: ComicfriendsService
  ) {     
    this.user= this.comicfriendsService.data;
    let username = this.comicfriendsService.data.username;
    this.comictitles = [''];
    this.usernames = [''];

    this.comicfriendsService.getComicPrices().subscribe(
      data => {
        if (data != null) {
          let count = 0;
          for (let i in data) {
            const result = data[i];    
              
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
      }},
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });

      this.comicfriendsService.getUsers().subscribe(
        data => {
          if (data != null) {
            let count = 0;
            for (let i in data) {
              const result = data[i];    
                
              this.users[count].email = result.email;
              this.users[count].username = result.username;
              this.users[count].userId = result.userId;
  
              count++;
              }
          }
        },
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });
  
        this.comicfriendsService.getReviews().subscribe(
          data => {
            if (data != null) {
              let count = 0;
              let count1 = 0;
              let count2 = 0;
              for (let i in data) {
                const result = data[i];
                if(result.type === 'COMIC'){
                  for(let comicPrice of this.comicPrices){
                    if(result.receiverComic.title === this.comicPrices[count1].title){
                      if(result.creator.userId == this.comicfriendsService.data.userId){
                        this.comictitles[count]= result.receiverComic.title;
                        this.reviews[count] = result;

                        this.reviews[count].date = this.reviews[count].date.replace(/T/i, " ").substr(0,19);

                        let day = this.reviews[count].date.substr(8,2);
                        let month = this.reviews[count].date.substr(5,2);
                        let year = this.reviews[count].date.substr(0,4);
                        let hour = this.reviews[count].date.substr(11,2);
                        let minute = this.reviews[count].date.substr(14,2);
    
                        this.reviews[count].date = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + 'h';

                        count1++;
                        count++;
                      }
                    }
                  }
                }else if(result.type === 'USER') {
                  for(let user of this.users){
                    if(result.receiverUser.username === this.users[count2].username){
                      if(result.creator.userId == this.comicfriendsService.data.userId){
                        this.usernames[count]= result.receiverUser.username;
                        this.reviews[count] = result;

                        this.reviews[count].date = this.reviews[count].date.replace(/T/i, " ").substr(0,19);

                        let day = this.reviews[count].date.substr(8,2);
                        let month = this.reviews[count].date.substr(5,2);
                        let year = this.reviews[count].date.substr(0,4);
                        let hour = this.reviews[count].date.substr(11,2);
                        let minute = this.reviews[count].date.substr(14,2);
    
                        this.reviews[count].date = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + 'h';
                        
                        count2++;
                        count++;
                      }
                    }  
                  } 
                } else { 
                      this.reviews[count].title = "";
                      this.reviews[count].comment = "";
                      this.reviews[count].date = "";
                      this.reviews[count].score = "";
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

  ngOnInit() { 
  }

  onClick() {
    this.router.navigateByUrl('/profile2');
  }

  deleteReview(id: string) { 
    if (id != null) {
      this.comicfriendsService.getReviewById(id).subscribe(
        data => {
          if (data != null) {
            let reviewId = data.reviewId;
            let title = data.title;
            let comment = data.comment;
            let date = data.date;
            let score = data.score;
            let type = data.type;
            let creator = data.creator;
            let receiverComic = data.receiverComic;
            let receiverUser = data.receiverUser;

            const review = {reviewId, title, comment, date, score, type, creator, receiverComic, receiverUser };

            this.comicfriendsService.deleteReview(review).subscribe(
              error => {
                if (error != null) {
                  window.alert(error.error.message);
                }else {
                  window.alert('Comentario eliminado');
                  this.router.navigateByUrl('/main');
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

  delete() { 
    this.comicfriendsService.deleteUser().subscribe(
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }else {
          window.alert('La cuenta ha sido eliminada');
          this.router.navigateByUrl('/');
        }
      });
  }

  onSubmit(password: string, email: string, username: string, name: string, sex: string, country: string, description: string) {
    password = password.trim();
    const userId = this.comicfriendsService.data.userId;

    if (!password) { 
      return; 
    }

    const newuser = { userId, email, username, name, sex, country, description, password };
    
    this.comicfriendsService.modifyUser(newuser).subscribe(
      data => {
        if (data != null) {
          this.comicfriendsService.data = data;
          window.alert('password cambiada');
          this.checkoutForm.reset();
          this.router.navigateByUrl('/profile');
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
    }
}

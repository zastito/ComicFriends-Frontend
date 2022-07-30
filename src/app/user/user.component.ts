import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicfriendsService } from '../comicfriends.service';
import { Review } from '../review';
import { User } from '../user';
import { Comic } from '../comic';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  reviews = Review;
  review = Review;
  user = User[0];
  creator = User[0];
  creators = User;
  receiverUser = User[0];
  id;

  checkoutForm = this.formBuilder.group({
    title: '',
    description: '',
    score: ''
  });

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private comicfriendsService: ComicfriendsService
  ) {     

    this.id = this.route.snapshot.paramMap.get('userId');

    if (this.id != null) {
      this.comicfriendsService.getUserById(this.id).subscribe(
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

        this.comicfriendsService.getReviews().subscribe(
          data => {
            debugger;
            if (data != null) {
              let count = 0;
              for (let i in data) {
                const result = data[i];
                if(result.type === 'USER') {
                  if(result.receiverUser.username === this.user.username){
                    this.reviews[count] = result;
                    this.reviews[count].date = this.reviews[count].date.replace(/T/i, " ").substr(0,19);

                    let day = this.reviews[count].date.substr(8,2);
                    let month = this.reviews[count].date.substr(5,2);
                    let year = this.reviews[count].date.substr(0,4);
                    let hour = this.reviews[count].date.substr(11,2);
                    let minute = this.reviews[count].date.substr(14,2);

                    this.reviews[count].date = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + 'h';

                    this.creators.push(result.creator);
 
                    count++;
                  }else { 
                    this.reviews[count].title = "";
                    this.reviews[count].comment = "";
                    this.reviews[count].date = "";
                    this.reviews[count].score = "";
                  }
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

  ngOnInit() {
    debugger;
    let id = this.route.snapshot.paramMap.get('userId');

    if (id != null) {
      this.comicfriendsService.getUserById(id).subscribe(
        data => {
          if (data != null) {
            this.receiverUser.country = data.country;
            this.receiverUser.description = data.description;
            this.receiverUser.email = data.email;
            this.receiverUser.name = data.name;
            this.receiverUser.password = data.password;
            this.receiverUser.sex = data.sex;
            this.receiverUser.userId = data.userId;
            this.receiverUser.username = data.username;
        }},
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });
  }}

  onSubmit(title: string, comment: string, score: string): void {
    debugger;
    title = title.trim();
    comment = comment.trim();
    score = score.trim();
    const date = '';
    const type = "USER";

    if (!title || !comment || !score) { return; }

    debugger;
    let creator: User = this.comicfriendsService.data;
    let receiverUser: User = this.receiverUser;
    let receiverComic: Comic = null as unknown as Comic;
    let reviewId = "0";

    const newReview = { reviewId, title, comment, date, score, type, creator, receiverComic, receiverUser };

    this.comicfriendsService.addReview(newReview).subscribe(
      data => {
        if (data != null) {
          window.alert('Comentario añadido');
          this.checkoutForm.reset();
          this.router.navigateByUrl('/main');
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
    }

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';
import { Review, Review2 } from '../review';
import { User } from '../user';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

  comic = Comic[0];
  reviews = Review;
  review = Review;
  reviews2 = Review2;
  creator = User[0];
  creators = User;
  receiverComic = Comic[0];

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

    let id = this.route.snapshot.paramMap.get('comicId');

    if (id != null) {
      this.comicfriendsService.getComicById(id).subscribe(
        data => {
          if (data != null) {
            this.receiverComic.amount = data.amount;
            this.receiverComic.comicId = data.comicId;
            this.receiverComic.issue = data.issue;
            this.receiverComic.publisher = data.publisher;
            this.receiverComic.title = data.title;
            this.receiverComic.volume = data.volume;
        }},
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });
  
        this.comicfriendsService.getReviews().subscribe(
          data => {
            if (data != null) {
              let count = 0;
              for (let i in data) {
                const result = data[i];
                if(result.type === 'COMIC'){
                  if(result.receiverComic.title === this.comic.title){
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
    this.comicfriendsService.getUser(this.comicfriendsService.data.username, this.comicfriendsService.data.password).subscribe(
      data => {
        if (data != null) {
          this.creator.country = data.country;
          this.creator.description = data.description;
          this.creator.email = data.email;
          this.creator.name = data.name;
          this.creator.password = data.password;
          this.creator.sex = data.sex;
          this.creator.userId = data.userId;
          this.creator.username = data.username;
      }},
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
  }

  onSubmit(title: string, comment: string, score: string): void {
    title = title.trim();
    comment = comment.trim();
    score = score.trim();
    const date = '';
    const type = "COMIC";

    if (!title || !comment || !score) { return; }

    let creator: User = this.creator;
    let receiverComic: Comic = this.receiverComic;
    let receiverUser: User = null as unknown as User;
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
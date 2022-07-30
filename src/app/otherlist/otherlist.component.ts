import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';

@Component({
  selector: 'app-otherlist',
  templateUrl: './otherlist.component.html',
  styleUrls: ['./otherlist.component.css']
})
export class OtherlistComponent implements OnInit {

  comics = Comic;
  show: boolean = true;
  username2 : string = '';

  checkoutForm = this.formBuilder.group({
    precio: '',
  });

  constructor(
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
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
            this.username2 = data.username;
        }},
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });

        this.comicfriendsService.getOwnedComics(this.username2).subscribe(
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

 }
}
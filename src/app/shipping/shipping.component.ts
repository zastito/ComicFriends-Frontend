import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { Seller } from '../seller';
import { Comic } from '../comic';
import { ComicPrice, ComicPrice2 } from '../comicPrice';
import { ComicfriendsService } from '../comicfriends.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    direccion: '',
    localidad: '',
    provincia: '',
    pais: ''
  });

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private comicfriendsService: ComicfriendsService
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    debugger;
    let id = this.route.snapshot.paramMap.get('comicPriceId');

    if (id != null){
      let cp_id = id;

      this.comicfriendsService.getComicPriceById(cp_id).subscribe(
        data => {
          if (data != null) {
            debugger;
            let buyerId = this.comicfriendsService.data.userId;
            //let username = laura;
            //let mail = laura@gmail.com;
            let sellerId = data.user.userId;
            let total_price = data.price;
            let comicPriceListId = cp_id;
            let comicId = data.comic.comicId;

            
            let buyer: User = User[0];
            buyer.userId = buyerId;

            let seller: User = Seller[0];
            seller.userId = sellerId;

            debugger;
            
            let comicPrice: ComicPrice2 = ComicPrice2[0];
            comicPrice.id = comicPriceListId;
            comicPrice.comic.comicId = comicId;

            let comicPriceList: ComicPrice2[] = [comicPrice]; 

            //Lista -> NO ComicPrice, Revisar esto y el comicprice.ts
            
  /*
            this.comicfriendsService.getComicById(data.comicId).subscribe(
              data => {
                if (data != null) {
                  let comicPriceList.amount = data.amount;
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
  */
              debugger;
            const transaction = { buyer, comicPriceList, seller, total_price };
        
            this.comicfriendsService.buyComic(transaction).subscribe(
              data => {
                if (data != null) {
                  debugger;
                  console.warn('Pedido realizado', this.checkoutForm.value);
                  window.alert('Pedido realizado');
                  this.checkoutForm.reset();
                  this.router.navigateByUrl('/main');
                }
              },
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
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { Seller } from '../seller';
import { ComicPrice2 } from '../comicPrice';
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
    let id = this.route.snapshot.paramMap.get('comicPriceId');

    if (id != null){
      let cp_id = id;

      this.comicfriendsService.getComicPriceById(cp_id).subscribe(
        data => {
          if (data != null) {
            let buyerId = this.comicfriendsService.data.userId;
            let sellerId = data.user.userId;
            let total_price = data.price;
            let comicPriceListId = cp_id;
            let comicId = data.comic.comicId;

            
            let buyer: User = User[0];
            buyer.userId = buyerId;

            let seller: User = Seller[0];
            seller.userId = sellerId;
            
            let comicPrice: ComicPrice2 = ComicPrice2[0];
            comicPrice.id = comicPriceListId;
            comicPrice.comic.comicId = comicId;

            let comicPriceList: ComicPrice2[] = [comicPrice]; 

            const transaction = { buyer, comicPriceList, seller, total_price };
        
            this.comicfriendsService.buyComic(transaction).subscribe(
              data => {
                if (data != null) {
                  console.warn('Pedido realizado', this.checkoutForm.value);
                  window.alert('Pedido realizado');
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
        },
        error => {
          if (error != null) {
            window.alert(error.error.message);
          }
        });
    }
  }
}
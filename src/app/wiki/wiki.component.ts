import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Comic } from '../comic';
import { ComicfriendsService } from '../comicfriends.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  criteria='';
  resultado='';
/*
  isCollapsed = false;

  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
  }
*/
  valor1: string = 'volumes';
  valor2: string = 'name';

  Categoria = [
    'Cómic',
    'Personaje',
    'Localización',
    'Creador'
  ];

  Filtro = [
    'Editorial',
    'Nombre',
  ];

  json = new Map<string, string>();
  image: any = [];
  origin: any = [];
  publisher: any = [];
  imagen: any = [];
  origen: any = [];
  editorial: any = [];
  keys: any  = [];
  items: any = [];
  comics = Comic;

  checkoutForm = this.formBuilder.group({
    criteria: '',
    scope: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private comicfriendsService: ComicfriendsService
  ) { }

  ngOnInit() {
  }

  /*
  operar() {
    debugger;
    switch (this.valor1) {
      case 'Comic' : 
        switch (this.valor2) {
          case 'Nombre' : 
            this.onSubmit('volumes', 'name', this.criteria);
            break;
          case 'Editorial' : 
            this.onSubmit('volumes', 'publisher', this.criteria);
            break;
          }          
          break;
      case 'Personaje' :         
        switch (this.valor2) {
          case 'Nombre' : 
            this.onSubmit('characters', 'name', this.criteria);
            break;
          case 'Editorial' : 
            this.onSubmit('characters', 'publisher', this.criteria);
            break;
          }          
        break;
      case 'Localización' :         
        switch (this.valor2) {
            case 'Nombre' : 
              this.onSubmit('locations', 'name', this.criteria);
              break;
            case 'Editorial' : 
              this.onSubmit('locations', 'publisher', this.criteria);
              break;
          }
        break;
      case 'Creador' :         
        switch (this.valor2) {
            case 'Nombre' : 
              this.onSubmit('people', 'name', this.criteria);
              break;
            case 'Editorial' : 
              this.onSubmit('people', 'publisher', this.criteria);
              break;
          }        
    }
  }
  */

  operar() {
    switch (this.valor1) {
      case 'Cómic' : 
        this.onSubmit('volumes', 'name', this.criteria);
          break;  
      case 'Personaje' :         
          this.onSubmit('characters', 'name', this.criteria);
          break;
      case 'Localización' :        
          this.onSubmit('locations', 'name', this.criteria);
          break;
      case 'Creador' :          
          this.onSubmit('people', 'name', this.criteria);
          break;
    }
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return 0;
  }

  onSubmit(scope: string, filter: string, criteria: string) { //busqueda en la wiki

    this.json.clear();
    this.image = [];
    this.origin = [];
    this.publisher = [];
    this.imagen = [];
    this.origen = [];
    this.editorial = [];
    this.keys  = [];
    this.items = [];

    this.comicfriendsService.searchComic(scope, filter, criteria).subscribe(
      data => {
        if (data != null) {
          console.log(data);

          const results = data["results"];

          let count = 0;

          for (let i in results){
            const result = results[i];

            this.imagen = result["image"];

            if(this.imagen != null){
              this.image.push(this.imagen["small_url"]);
              this.json.set(i+'._image', this.image[i]);
            } 

            for (let j in result){ 
              if(result[j] != null){
                this.keys[count] = i+'.'+j;
                this.items.push(result[j]);
                this.json.set(this.keys[count], this.items[count]);
                count++;
              }
            }
              
              this.origen = result["origin"];
              this.editorial = result["publisher"];

              if(this.origen != null){
                this.origin.push(this.origen["name"]);
                this.json.set(i+'.origin', this.origin[i]);
              } 

              if(this.editorial != null){
                this.publisher.push(this.editorial["name"]);
                this.json.set(i+'.publisher', this.publisher[i]);
              }

            this.json.set(i, "");
          }

          this.checkoutForm.reset();
        }
      },
      error => {
        if (error != null) {
          window.alert(error.error.message);
        }
      });
  }
  

  onClick(comic_num: number, comics: any): void  { //addCOmic to user
    let user = this.comicfriendsService.data; 
    let tebeo = 0;
    let tebeo2 = 0;

    if (comic_num > 60){
      tebeo = (comic_num / 8);    
    } else {
      tebeo = (comic_num / 7) -1;
    }

    if (tebeo<1) {
      tebeo2 = 0;
    }
    else if (tebeo!=0) {
      tebeo2 = Math.floor(tebeo);
    }

    const comicId = '0';
    const title = comics.get(tebeo2+'.name').trim();
    const publisher = comics.get(tebeo2+'.publisher');
    const volume = '1';
    const issue = comics.get(tebeo2+'.count_of_issues');
    const amount = '';
    const owner = '';
    
    const newcomic = {comicId, title, publisher, volume, issue, amount, owner };

    this.comicfriendsService.addComic(newcomic, user.userId).subscribe(
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
    window.alert('Tienes un nuevo comic');
  }

}
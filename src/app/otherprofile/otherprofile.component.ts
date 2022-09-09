import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Comic } from '../comic';
import { Review } from '../review';

@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.css']
})
export class OtherprofileComponent implements OnInit {

  comics = Comic;
  reviews = Review;

  checkoutForm = this.formBuilder.group({
    title: '',
    description: '',
    score: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
  ) { }

  ngOnInit() { 
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Registro completado', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
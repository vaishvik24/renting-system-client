import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { Alert } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment-done',
  templateUrl: './payment-done.component.html',
  styleUrls: ['./payment-done.component.css']
})
export class PaymentDoneComponent implements OnInit {
  answer : any;
  nm : any ;
  payment_obj : any;
  sanddox_url = "https://www.sandbox.paypal.com/myaccount/home";
  constructor(private authService : AuthService,
    private router : Router,
    private flashMessages : FlashMessagesService ,
    private Route:  ActivatedRoute) {
      this.Route.params.subscribe((res)=>{
        this.authService.paymentDetails(this.nm).subscribe(res =>{
          this.payment_obj = res.json();
        })
        // console.log("answer "+ this.answer);
      });
     }

  ngOnInit() {
    this.Route.params.subscribe((res)=>{
      this.nm   = this.Route.snapshot.paramMap.get('pid');
      this.authService.paymentDetails(this.nm).subscribe(res =>{
        this.payment_obj = res.json();
      })
    });
  }

}

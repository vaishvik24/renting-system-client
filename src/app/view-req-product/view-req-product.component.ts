import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { Alert } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-req-product',
  templateUrl: './view-req-product.component.html',
  styleUrls: ['./view-req-product.component.css']
})
export class ViewReqProductComponent implements OnInit {
  nm : any;
  current_product : any;
  private spinner1 = true;
  private showBook = false;
  constructor(private authService : AuthService,
    private router : Router,
    private flashMessages : FlashMessagesService ,
    private Route:  ActivatedRoute ) {
      this.Route.params.subscribe((res)=>{
        this.nm   = this.Route.snapshot.paramMap.get('_id');
        this.authService.getReqProducts().subscribe( response =>{
         for(let i=0;i< response.json().length ;i++){
           if(this.nm == response.json()[i]._id){
            var d = new Date(response.json()[i].ini_time);
            var ini_t = this.formatDate(response.json()[i].ini_time);
            var d2 = new Date(response.json()[i].end_time);
            var end_t = this.formatDate(response.json()[i].end_time);
            var timeDiff = Math.abs(d.getTime() - d2.getTime());
            var diffDays_ = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
             this.current_product = {
               _id : response.json()[i]._id,
               product_name: response.json()[i].product_name ,
               city: response.json()[i].location.city,
               state: response.json()[i].location.state,
               owner_name : response.json()[i].owner_name,
               owner_email : response.json()[i].owner_email,
               price: response.json()[i].exp_price,
               discription: response.json()[i].discription,
               category_main : response.json()[i].category.main,
               category_sub : response.json()[i].category.sub,
               ini_time : ini_t,
               days : diffDays_,
               end_time : end_t
             };
             console.log(this.current_product);
           }  
         }
         this.authService.getBookReqProducts().subscribe( response =>{
          for(let i=0;i< response.json().length ;i++){
              if(response.json()[i].product_name == this.current_product.product_name ){
                for(let j=0;j< response.json()[i].bookings.length;j++){
                   if(response.json()[i].bookings[j].buyer_name == this.buyername){
                      // console.log("already booked");
                      // this.flashMessages.show("Product is already booked by you !",{cssClass: 'alert-danger' ,timeout :4000});
                      // document.body.scrollTop = 0; // For Safari
                      // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                      this.showBook = true;
                     
                    //  return false;
                   }
                }
              }
            }  
            this.spinner1 = false;
        });    
       });   
     });

     }
     ngOnInit() {
      this.authService.getProfile().subscribe( profile =>{
        var us = profile.user.username  ;
        this.contactNumber = profile.user.phoneNum;
        this.buyeremail = profile.user.email;
        this.buyername = profile.user.name;
       },err=>{
         console.log(err);
         return false;
       });

      this.nm   = this.Route.snapshot.paramMap.get('_id');
      this.Route.params.subscribe((res)=>{
         this.nm   = this.Route.snapshot.paramMap.get('_id');
         this.authService.getReqProducts().subscribe( response =>{
          for(let i=0;i< response.json().length ;i++){
            if(this.nm == response.json()[i]._id){
              var d = new Date(response.json()[i].ini_time);
              var ini_t = this.formatDate(response.json()[i].ini_time);
              var d2 = new Date(response.json()[i].end_time);
              var end_t = this.formatDate(response.json()[i].end_time);
              var timeDiff = Math.abs(d.getTime() - d2.getTime());
              var diffDays_ = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
              this.current_product = {
                _id : response.json()[i]._id,
                product_name: response.json()[i].product_name ,
                city: response.json()[i].location.city,
                state: response.json()[i].location.state,
                owner_name : response.json()[i].owner_name,
                owner_email : response.json()[i].owner_email,
                price: response.json()[i].exp_price,
                discription: response.json()[i].discription,
                category_main : response.json()[i].category.main,
                category_sub : response.json()[i].category.sub,
                ini_time : ini_t,
                days : diffDays_,
                end_time : end_t
              };
            }  
          }
        });   
      });

    // console.log(this.current_product);  
    }
    private contactNumber : any;
    private buyername : any;
    private buyeremail : any;
    showHistory  = false;
    private count = 0;
    showResult = false;
    result : any;
    bookedProducts = [];
    eday = null;
    dob : any;
    emonth = null;
    coupon = null;
    eyear = null;
    proposedprice : 0;
    bookProduct(){
  
    
        var x = confirm("Make sure Do you want to book *"+ this.current_product.product_name + "* product ?");
        if(x){
          let day = this.dob.split("-",4);
          var d1 = Date.parse(this.dob);
          let split_ = this.current_product.end_time;
          split_ = split_.split("-",4)
          let str_ = split_[2] + "-"+split_[1]+"-"+split_[0];
          var d2 = Date.parse(str_);
          if (d1 > d2) {
              this.flashMessages.show('YOUR APPLIED DATE SHOULD BE BEFORE '+ this.current_product.end_time ,{cssClass: 'alert-danger' ,timeout :4000});
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
              this.dob = null;
              return false;
          }
          let submit_product = {
            id : this.current_product._id,
            buyer_name:this.buyername,
            buyer_email:this.buyeremail,
            owner_name:this.current_product.owner_name,
            owner_email:this.current_product.owner_email,
            product_name:this.current_product.product_name,
            price:this.proposedprice,
            edate: day[2],
            emonth:day[1],
            eyear:day[0]
          }
          console.log(submit_product);
          this.authService.bookReqProduct(submit_product).subscribe( res => {
            if(res.successs){
              this.flashMessages.show('Your reqest for product '+ this.current_product.product_name +' is pending to owner.',{cssClass: 'alert-success' ,timeout :4000});
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }else {
              this.flashMessages.show(res.msg ,{cssClass: 'alert-success' ,timeout :4000});
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }
          });
        
          this.router.navigate(['/']);
          // this.showResult = true;
        }
      
    }
    formatDate(userDate) {
      // format from M/D/YYYY to YYYYMMDD
      return (new Date(userDate).toJSON().slice(0,10).split('-').reverse().join('-'));
    }

}



import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
// import { Alert } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
@Component({
  selector: 'app-book-product',
  templateUrl: './book-product.component.html',
  styleUrls: ['./book-product.component.css']
})
export class BookProductComponent implements OnInit {

  private contactNumber : any;
  private buyername : any;
  private buyeremail : any;
  showHistory  = false;
  private count = 0;
  showResult = false;
  result : any;
  dob : any;
  bookedProducts = [];
  eday = null;
  emonth = null;
  coupon = null;
  eyear = null;
  date_ = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
  // month_ = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  month_ = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  year_ = ["2019","2020","2021","2023","2024","2025","2026"];
  constructor(private authService : AuthService,
    private router : Router,
    private flashMessages : FlashMessagesService ,
    private Route:  ActivatedRoute ) {
      this.showHistory = false;
      this.authService.getProfile().subscribe( profile =>{
        var us = profile.user.username  ;
        this.contactNumber = profile.user.phoneNum;
        this.buyeremail = profile.user.email;
        this.buyername = profile.user.name;
       },err=>{
         console.log(err);
         return false;
       });

      this.Route.params.subscribe((res)=>{
        // console.log(this.nm);
        this.nm   = this.Route.snapshot.paramMap.get('_id');
        this.authService.getProducts().subscribe( response =>{
         // console.log(response.json());
         for(let i=0;i< response.json().length ;i++){
           if(this.nm == response.json()[i]._id){
            var d = new Date(response.json()[i].ini_time);
            var ini_t = d.getDay() + "-"+d.getMonth() + "-"+d.getFullYear();
            var d2 = new Date(response.json()[i].end_time);
            var end_t = d2.getDay() + "-"+d2.getMonth() + "-"+d2.getFullYear();

            var timeDiff = Math.abs(d.getTime() - d2.getTime());
            var diffDays_ = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

             this.current_product = {
               _id : response.json()[i]._id,
               product_name: response.json()[i].product_name ,
               city: response.json()[i].location.city,
               state: response.json()[i].location.state,
               owner_name : response.json()[i].owner_name,
               owner_email : response.json()[i].owner_email,
               price: response.json()[i].price,
               ratting: response.json()[i].ratting,
               discription: response.json()[i].discription,
               url: response.json()[i].url,
               category_main : response.json()[i].category.main,
               category_sub : response.json()[i].category.sub,
               ini_time : ini_t,
               end_time : end_t,
               diffDays : diffDays_,
               phoneNumber : this.contactNumber
             };
            //  console.log(this.current_product.phoneNumber);
           }  
         }
       }); 
       
       this.authService.getBookProducts().subscribe( response =>{
        for(let i=0;i< response.json().length ;i++){
            if(response.json()[i].product_name == this.current_product.product_name ){
              for(let j=0;j< response.json()[i].bookings.length;j++){
                 if(response.json()[i].bookings[j].buyer_name == this.buyername){
                    // console.log("already booked");
                    // this.flashMessages.show("Product is already booked by you !",{cssClass: 'alert-danger' ,timeout :4000});
                    // document.body.scrollTop = 0; // For Safari
                    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    this.showText = true;
                  //  return false;
                 }
              }
            }
          }  
      });    
     });



   }
  private nm : any;
  private current_product : any
  private spinner1 = true; 
  ngOnInit() {
    this.showHistory = false;
    this.nm   = this.Route.snapshot.paramMap.get('_id');
    this.Route.params.subscribe((res)=>{
      //  console.log(this.nm);
       this.nm   = this.Route.snapshot.paramMap.get('_id');
       this.authService.getProducts().subscribe( response =>{
        for(let i=0;i< response.json().length ;i++){
          // console.log(response.json())
          if(this.nm == response.json()[i]._id){
            // console.log(response.json()[i].owner_email);
           
            var d = new Date(response.json()[i].ini_time);
            var ini_t = this.formatDate(response.json()[i].ini_time)
            // var ini_t = d.getDay() + "-"+d.getMonth() + "-"+d.getFullYear();
            var d2 = new Date(response.json()[i].end_time);
            var end_t = this.formatDate(response.json()[i].end_time)
            // var end_t = d2.getDay() + "-"+d2.getMonth() + "-"+d2.getFullYear();
            var timeDiff = Math.abs(d.getTime() - d2.getTime());
            var diffDays_ = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            // console.log
            this.current_product = {
              _id : response.json()[i]._id,
              product_name: response.json()[i].product_name ,
              city: response.json()[i].location.city,
              state: response.json()[i].location.state,
              owner_name : response.json()[i].owner_name,
              owner_email : response.json()[i].owner_email,
              price: response.json()[i].price,
              ratting: response.json()[i].ratting,
              discription: response.json()[i].discription,
              url: response.json()[i].url,
              category_main : response.json()[i].category.main,
              category_sub : response.json()[i].category.sub,
              ini_time : ini_t,
              end_time : end_t,
              diffDays : diffDays_,
              diffMonths : Math.floor(diffDays_/30),
              phoneNumber : this.contactNumber

            };
          }  
        }
      });   

      this.authService.getBookProducts().subscribe( response =>{
        for(let i=0;i< response.json().length ;i++){
            if(response.json()[i].product_name == this.current_product.product_name ){
              for(let j=0;j< response.json()[i].bookings.length;j++){
                 if(response.json()[i].bookings[j].buyer_name == this.buyername){
                    // console.log("already booked");
                    // this.flashMessages.show("Product is already booked by you !",{cssClass: 'alert-danger' ,timeout :4000});
                    // document.body.scrollTop = 0; // For Safari
                    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    this.showText = true;
                    
                  //  return false;
                 }
              }
            }
          }  
          this.spinner1 = false;
      });    
    });
    this.count = 0;

   
  }

  formatDate(userDate) {
    // format from M/D/YYYY to YYYYMMDD
    return (new Date(userDate).toJSON().slice(0,10).split('-').reverse().join('-'));
  }
  Chat_with(){
    this.flashMessages.show('chat with ' + this.current_product.owner_name + ' for product '+ this.current_product.product_name ,{cssClass: 'alert-successs' ,timeout :4000});
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  send_mail(){
    this.flashMessages.show('email to ' + this.current_product.owner_name + ' for product '+ this.current_product.product_name ,{cssClass: 'alert-successs' ,timeout :4000});
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  prevHistory(flag){ 
    if(!flag){
      this.showHistory = true;

    }else {
      this.showHistory = false;
    }
  }

  applyCoupon(){
    if(this.coupon != null){
      this.flashMessages.show('Coupon is applied' ,{cssClass: 'alert-successs' ,timeout :4000});
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }
  private showText  = false;
  bookProduct(){
      var x = confirm("Make sure Do you want to book *"+ this.current_product.product_name + "* product ?");
      if(x){


        let price_ = 0;
        let day = this.dob.split("-",4);
        // console.log("selected day "+ day);
        if(this.coupon != null){
          this.flashMessages.show('Coupon is applied' ,{cssClass: 'alert-successs' ,timeout :4000});
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          price_ = this.current_product.price * 5 / 6;
        }else{
          price_ = this.current_product.price;
        }
        let dt = day[2];
        let mn = day[1];
        let yr = day[0];
        var d1 = Date.parse(this.dob);
        // console.log("end_t " + this.current_product.end_time);
        let split_ = this.current_product.end_time;
        split_ = split_.split("-",4)
        // console.log(split_);
        let str_ = split_[2] + "-"+split_[1]+"-"+split_[0];
        var d2 = Date.parse(str_);
        // console.log("answer " + d1 + "          "+ d2);
        if (d1 > d2) {
            // alert ("Error!");
            // console.log("valid");
            this.flashMessages.show('YOUR APPLIED DATE SHOULD BE BEFORE '+ this.current_product.end_time ,{cssClass: 'alert-danger' ,timeout :4000});
            this.dob = null;
            return false;
        }

        this.authService.getBookProducts().subscribe( response =>{
          for(let i=0;i< response.json().length ;i++){
              if(response.json()[i].product_name == this.current_product.product_name ){
                for(let j=0;j< response.json()[i].bookings.length;j++){
                   if(response.json()[i].bookings[j].buyer_name == this.buyername){
                      console.log("already booked");
                      this.flashMessages.show("Product is already booked by you !",{cssClass: 'alert-danger' ,timeout :4000});
                      document.body.scrollTop = 0; // For Safari
                      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                      this.showText = true;
                     return false;
                   }
                }
              }
            }  

            let submit_product = {
              id : this.current_product._id,
              buyer_name:this.buyername,
              buyer_email:this.buyeremail,
              owner_name:this.current_product.owner_name,
              owner_email:this.current_product.owner_email,
              product_name:this.current_product.product_name,
              price:price_,
              location:{
                city:this.current_product.city,
                state:this.current_product.state
              },
              category:{
                main:this.current_product.category_main,
                sub:this.current_product.category_sub
              },
              edate:day[2],
              emonth:day[1],
              eyear:day[0]
            
            }
            console.log(submit_product);
            this.authService.bookProduct(submit_product).subscribe( res => {
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

        });

      }
    
  }
}

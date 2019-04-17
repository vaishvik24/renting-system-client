import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { Alert } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css','./animation.css','./button.css','./card.css']
})
export class ViewProductComponent implements OnInit {
  private spinner = true;
  private show1 = false;
  private show2 = false;
  private show3 = false;
  constructor(private authService : AuthService,
    private router : Router,
    private flashMessages : FlashMessagesService ,
    private Route:  ActivatedRoute ) {
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
            //  console.log(response.json()[i]._id);
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
               end_time : end_t
             };
           }  
         }
         this.spinner = false;
       });   
     });

   }
   private nm : any;
   private current_product : any
  ngOnInit() {

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
            var ini_t = d.getDay() + "-"+d.getMonth() + "-"+d.getFullYear();
            var d2 = new Date(response.json()[i].end_time);
            var end_t = d2.getDay() + "-"+d2.getMonth() + "-"+d2.getFullYear();
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
              end_time : end_t
            };
            this.loadIMG(this.current_product);
          }  
        }
      });  

    });

   
  }

  bookP(){
    this.router.navigate(['/bookProduct',this.nm]);
  }

  showButton(){
    if(this.show1)this.show1 = false;
    else
    this.show1 = true;
  }
  showButton2(){
    if(this.show2)this.show2 = false;
    else
    this.show2 = true;
  }
  showButton3(){
    if(this.show3)this.show3 = false;
    else
    this.show3 = true;
  }
  src : any;
  loadIMG(product){
    this.authService.getImages().subscribe(res=>{
      // console.log("getting images");
      for(let i=0;i< res.json().length ;i++){
        let filename_ = res.json()[i].filename;
        let ext = filename_.substring(0,filename_.lastIndexOf('.') );
        // console.log(ext);
        ext = ext.toLowerCase();
        // console.log(ext);
        let str_ = product.product_name;
        str_ = str_.replace(/ /g,'');
        str_ = str_.toLowerCase();
        // console.log(str_);
        // let str_ = product.product_name.toLowerCase();
        if(ext == str_){
          // console.log(res.json()[i]);
          this.src = filename_;
        }
      } 
    });
  }
  url_payment : String;
  url_show = false;
  payment(){
    var reqBody = {
      name : this.current_product.product_name,
      price : this.current_product.price ,
      discription : this.current_product.discription
    }
    console.log(reqBody);
    this.authService.paymentRequest(reqBody).subscribe( res =>{
      console.log("res "+ res);
      this.url_show = true;
      this.url_payment = res.url;
    });


  }
}

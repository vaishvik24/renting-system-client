import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { Profile } from 'selenium-webdriver/firefox';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user :Object;
  nm;
  name : String;
  myProdOwn = [];
  myProdReq = [];
  wishListOwn = [];
  wishListReq = [];
  bookedProducts = [];
  bookedReqprodcuts = [];
  OthersProdOwnByMe = [];
  OthersReqProdOwnByMe = [];

  count = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  count5 = 0;
  count6 = 0;
  count7 = 0;
  count8 = 0;
  constructor(private authService : AuthService ,
              private flashMessages : FlashMessagesService ,
              private router : Router,
              private Route: ActivatedRoute) { 

                this.authService.getProfile().subscribe( profile =>{
                 var us = profile.user.username  ;
                  // console.log(us);
                  this.router.navigate(['/Profile',us]);

                },err=>{
                  console.log(err);
                  return false;
                });
            
 }

  ngOnInit() {

    this.nm = this.Route.snapshot.paramMap.get('name');
    if(this.nm == null){
      this.authService.getProfile().subscribe( profile =>{
        var us = profile.user.username  ;
         this.router.navigate(['/Profile',us]);

       },err=>{
         console.log(err);
         return false;
       });
    }
    // console.log("nm: "+ this.nm);

    this.authService.getProfile().subscribe( profile =>{
      this.user = profile.user  ;
      this.name = profile.user.name;
      // console.log(this.user);
    },err=>{
      console.log(err);
      return false;
    });

    this.authService.getBookProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
          if(response.json()[i].owner_name == this.name ){
            for(let j=0;j< response.json()[i].bookings.length;j++){
                this.bookedProducts[this.count++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  final_status : response.json()[i].status,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
            }
          }

        }     
        
        for(let i=0;i< response.json().length ;i++){
            for(let j=0;j< response.json()[i].bookings.length;j++){
              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == false){
                this.wishListOwn[this.count2++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
              } 

              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == true){
                this.OthersProdOwnByMe[this.count3++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                  discription : response.json()[i].discription,
                  price : response.json()[i].price,
                  payment : response.json()[i].payment,
                  payment_type : response.json()[i].payment_type
                };
              } 
            }
          }     
    });

    // console.log(this.bookedProducts);
    
    this.authService.getBookReqProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
          if(response.json()[i].owner_name == this.name){
            for(let j=0;j< response.json()[i].bookings.length;j++){
                this.bookedReqprodcuts[this.count4++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  final_status : response.json()[i].status,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
            }
          }

        }     
        
        for(let i=0;i< response.json().length ;i++){
            for(let j=0;j< response.json()[i].bookings.length;j++){
              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == false){
                this.wishListReq[this.count7++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
              } 

              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == true){
                this.OthersReqProdOwnByMe[this.count8++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                  discription : response.json()[i].discription,
                  price : response.json()[i].price,
                  payment : response.json()[i].payment,
                  payment_type : response.json()[i].payment_type
                };
              } 
            }
          }     
        
          // console.log(this.OthersProdOwnByMe);
          // console.log(this.wishListOwn);
          // console.log(this.bookedProducts);
    });
  
       // product own by me
    this.authService.getProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].owner_name == this.name){
            this.myProdOwn[this.count5] = {
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
              ini_time : response.json()[i].ini_time,
              end_time : response.json()[i].end_time,
              payment : response.json()[i].payment,
              payment_type : response.json()[i].payment_type,
              status : response.json()[i].status
            };
            // this.loadIMG()
            let num = this.count5;
            this.authService.getImages().subscribe(res=>{
              // console.log("getting images");
              for(let j=0;j< res.json().length ;j++){
                let filename_ = res.json()[j].filename;
                let ext = filename_.substring(0,filename_.lastIndexOf('.') );
                ext = ext.toLowerCase();

                let str_ = this.myProdOwn[num].product_name;
                str_ = str_.replace(/ /g,'');
                str_ = str_.toLowerCase();
                // console.log("str_");
                    // s = s.replace(/ /g,'');

                if(ext == str_ ){
                  this.myProdOwn[num].url = "http://localhost:4000/users/image/"+ res.json()[j].filename;
                  // console.log(this.myProdOwn[num].url);
                }
              } 
            });
            this.count5++;  
        }
      }
    });   
    // req product add by me
    this.authService.getReqProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].owner_name == this.name){
            this.myProdReq[this.count6] = {
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
              ini_time : response.json()[i].ini_time,
              end_time : response.json()[i].end_time,
              status : response.json()[i].status

            };
            this.count6++;
          }

      }
    }); 

  }
  addP(){
    this.router.navigate(['/addProduct']);
  }
  addReqP(){
    this.router.navigate(['/addReqProduct']);

  }

  giveProduct(item){
    console.log("give product");
    var object = {
      buyer_name:item.buyer_name,
      owner_name:item.owner_name,
      id:item._id,
      product_name:item.product_name
    };
    console.log(object);
    this.authService.approveProduct(object).subscribe( res =>{
      console.log(res);
      if(res.success){
        this.flashMessages.show("Success fully changed ",{cssClass: 'alert-success' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        console.log("sucess");
        // **********************************************************************************
        let msg = "Congratulations " + object.buyer_name + " , " + object.owner_name+ " has approved your request for product "+ object.product_name + ". Hope you do your payment online or offline quickly.";
        let object_ = {
          sender_email : "jamessathomfox@gmail.com",
          sender_pw : "@asdfghjkl@",
          receiver_email : "vaishvikbrahmbhatt.1998@gmail.com",
          message : msg
        };
        console.log(object_);
        this.authService.sendEmails(object_).subscribe((Response)=>{
          if(Response.success)    this.flashMessages.show('Email is successfully sent ' ,{cssClass: 'alert-success' ,timeout :4000});
          this.refreshData();
        });
      }else {
        this.flashMessages.show("Error !" ,{cssClass: 'alert-danger' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    });
  }

  deleteProd(item){
    var object = {
      buyer_name:item.buyer_name,
      owner_name:item.owner_name,
      id:item._id,
      product_name:item.product_name
    };

    this.authService.unmarkProduct(object).subscribe( res =>{
      if(res.successs){
        this.flashMessages.show(res.messages,{cssClass: 'alert-successs' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }else {
        this.flashMessages.show(res.msg ,{cssClass: 'alert-successs' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    });
    this.refreshData();
  }

  deleteReqProd(item){
    var object = {
      buyer_name:item.buyer_name,
      owner_name:item.owner_name,
      id:item._id,
      product_name:item.product_name
    };
    console.log("delete req prod");
    console.log(object);
    this.authService.unmarkReqProduct(object).subscribe( res =>{
      if(res.successs){
        this.flashMessages.show(res.messages,{cssClass: 'alert-successs' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }else {
        this.flashMessages.show(res.msg ,{cssClass: 'alert-successs' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    });
    this.refreshData();
  }
  
  giveReqProduct(item){
    var object = {
      buyer_name:item.buyer_name,
      owner_name:item.owner_name,
      id:item._id,
      product_name:item.product_name
    };
    console.log("give req prod " + object);
    this.authService.approveReqProduct(object).subscribe( res =>{
      if(res.successs){
        this.flashMessages.show(res.messages,{cssClass: 'alert-successs' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        let msg = "Congratulations ," + object.buyer_name + "has approved your request for product "+ object.product_name + ". Hope you do your payment online or offline quickly.";
        let object_ = {
          sender_email : "jamessathomfox@gmail.com",
          sender_pw : "@asdfghjkl@",
          receiver_email : "vaishvikbrahmbhatt.1998@gmail.com",
          message : msg
        };
        console.log(object_);
        this.authService.sendEmails(object_).subscribe((Response)=>{
          if(Response.success)    this.flashMessages.show('Email is successfully sent ' ,{cssClass: 'alert-success' ,timeout :4000});
          this.refreshData();
        });
      }else {
        this.flashMessages.show(res.msg ,{cssClass: 'alert-successs' ,timeout :4000});
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    });

  }

  navigate2(i){
    this.router.navigate(['/viewProduct',i]);
  }

  wishListOwnFunc(i){
    let pname = i.product_name;
    let id = "";
    this.authService.getProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].product_name == pname){
              id = response.json()[i]._id;
              // console.log(pname);
              this.navigate2(id);
          }
      }
    }); 
    this.router.navigate(['/viewProduct',id]);
  }

  navigate(i){
    this.router.navigate(['/viewReqProduct',i]);
  }
  wishListReqFunc(i){
    let pname = i.product_name;
    let id = "";
    this.authService.getReqProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].product_name == pname){
              // console.log(pname);
              // console.log(response.json()[i]);
              id = response.json()[i]._id;
              this.navigate(id);
              // this.router.navigate(['/viewReqProduct',id]);
          }
      }
    }); 
    // console.log(id);
  }

  myProdReqFunc(i){
    this.router.navigate(['/viewReqProduct',i._id]);
  }

  myProdOwnFunc(i){
    // console.log(i);
    this.router.navigate(['/viewProduct',i._id]);
  }

 
  refreshData(){
    this.count = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count7 = 0;
    this.count8 = 0;
    this.count5 = 0;
    this.count6 = 0;
    console.log("refreshing");
    this.bookedProducts = [];
    this.bookedReqprodcuts = [];
    this.wishListOwn = [];
    this.wishListReq = [];
    this.OthersProdOwnByMe = [];
    this.OthersReqProdOwnByMe = [];
    this.myProdOwn = [];
    this.myProdReq = [];
    
    this.authService.getProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].owner_name == this.name){
            this.myProdOwn[this.count5] = {
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
              ini_time : response.json()[i].ini_time,
              payment : response.json()[i].payment,
              payment_type : response.json()[i].payment_type,
              end_time : response.json()[i].end_time,
              status : response.json()[i].status
            };
            // this.loadIMG()
            let num = this.count5;
            this.authService.getImages().subscribe(res=>{
              // console.log("getting images");
              for(let j=0;j< res.json().length ;j++){
                let filename_ = res.json()[j].filename;
                let ext = filename_.substring(0,filename_.lastIndexOf('.') );
                ext = ext.toLowerCase();

                let str_ = this.myProdOwn[num].product_name;
                str_ = str_.replace(/ /g,'');
                str_ = str_.toLowerCase();
                // console.log("str_");
                    // s = s.replace(/ /g,'');

                if(ext == str_ ){
                  this.myProdOwn[num].url = "http://localhost:4000/users/image/"+ res.json()[j].filename;
                  // console.log(this.myProdOwn[num].url);
                }
              } 
            });
            this.count5++;  
        }
      }
    });   
    // req product add by me
    this.authService.getReqProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].owner_name == this.name){
            this.myProdReq[this.count6] = {
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
              ini_time : response.json()[i].ini_time,
              end_time : response.json()[i].end_time,
              status : response.json()[i].status

            };
            this.count6++;
          }

      }
    }); 
    
    this.authService.getBookProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
          if(response.json()[i].owner_name == this.name ){
            for(let j=0;j< response.json()[i].bookings.length;j++){
                this.bookedProducts[this.count++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  final_status : response.json()[i].status,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
            }
          }

        }     
        
        for(let i=0;i< response.json().length ;i++){
            for(let j=0;j< response.json()[i].bookings.length;j++){
              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == false){
                this.wishListOwn[this.count2++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
              } 

              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == true){
                this.OthersProdOwnByMe[this.count3++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                  discription : response.json()[i].discription,
                  price : response.json()[i].price,
                  payment : response.json()[i].payment,
                  payment_type : response.json()[i].payment_type
                };
              } 
            }
          }     
    });

    
    this.authService.getBookReqProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
          if(response.json()[i].owner_name == this.name){
            for(let j=0;j< response.json()[i].bookings.length;j++){
                this.bookedReqprodcuts[this.count4++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  final_status : response.json()[i].status,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
            }
          }

        }     
        
        for(let i=0;i< response.json().length ;i++){
            for(let j=0;j< response.json()[i].bookings.length;j++){
              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == false){
                this.wishListReq[this.count7++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                };
              } 

              if(response.json()[i].bookings[j].buyer_name == this.name && response.json()[i].bookings[j].Sts == true){
                this.OthersReqProdOwnByMe[this.count8++] = {
                  _id : response.json()[i]._id,
                  product_name: response.json()[i].product_name ,
                  owner_name : response.json()[i].owner_name,
                  buyer_name : response.json()[i].bookings[j].buyer_name,
                  Status : response.json()[i].bookings[j].Sts,
                  duration: Math.floor(response.json()[i].bookings[j].duration / 30),
                  discription : response.json()[i].discription,
                  price : response.json()[i].price
                };
              } 
            }
          }     
        
          // console.log(this.OthersProdOwnByMe);
          // console.log(this.wishListOwn);
          // console.log(this.bookedProducts);
    });
  }
  url_payment : String;
  flag_ = false;

  payment(item){
    console.log(item);
    
    var reqBody = {
      name : item.product_name,
      price : item.price ,
      discription : item.discription
    }
    console.log(reqBody);
    this.authService.paymentRequest(reqBody).subscribe( res =>{
      if(!res.success){
        this.flashMessages.show( res.url ,{cssClass: 'alert-danger' ,timeout :4000});
      }else{
        console.log("res "+ res);
        // this.url_show = true;
        this.url_payment = res.url;
        this.flag_ = true;
      }
    });
    // console.log("payment");
  }

  paymentOffline(){
    console.log("offline");
  }
}

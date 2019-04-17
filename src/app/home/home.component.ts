import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
// import { Alert } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient} from '@angular/common/http';
import { WebService} from '../services/websocket.service';
import { ValidateService} from '../services/validate.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private spinner1 = true;
  private pagination  = [];
  constructor(private authService : AuthService,
              private router : Router,
              private flashMessages : FlashMessagesService ,
              private Route:  ActivatedRoute,
              private http: HttpClient,
              private webService : WebService,
              private validateService : ValidateService
  ) {     
    for(let i=0;i<100;i++){
      this.pagination.push('angular '+i);
    }

    this.Route.queryParamMap.subscribe(params=>{
      this.category = params.get('category');
    });

    this.authService.getProducts()
                    .subscribe(response =>{
                        this.Route.queryParamMap.subscribe(params=>{  
                        this.category = params.get('category');
                        this.filter_product = [];
                        // console.log(this.category);
                        this.filter_product  = (this.category) ? 
                          this.products.filter(p => p.category_main === this.category) :
                          this.products;
                      });
    });
    
    this.authService.getAllUsers().subscribe( res =>{
      for(let i=0;i< res.json().length;i++){
          this.allUsers[i] = {
            name: res.json()[i].name,
            username : res.json()[i].username,
            status: false
          };
      }
    });
    };

  private products =[];
  private reqProducts = [];
  //private mysocket = this.webService.getSocket(); ;
  private allUsers = [];
  private numTrac =0;
  private user = 0;
  private filter_product = [];
  private category = '';
  private cat = String;
  private myprod = [];
  private cat_main = ["Real Estate","Vehicles","Electronics","Sports","Hobby","books","Educational","Clothing","Furniture","Other"];
  count1 = 0;
  count2 = 0;
  user_ : any;
  name : any;
  private mysocket : any;
  numberOfOnline : Number;
  private currentUsername : String;
  private myemail_  : String;

  ngOnInit() { 
    this.authService.getProfile().subscribe( profile =>{
      this.user_ = profile.user  ;
      this.name = profile.user.name;
      this.myemail_ = profile.user.email;
      this.currentUsername = profile.user.username;
      // console.log(this.user);
    },err=>{
      console.log(err);
      return false;
    });  
    this.mysocket = this.webService.getSocket();
    // console.log(this.mysocket);
    this.webService.onlineUserSend();
    this.mysocket.on('onlineUsers',(data)=>{
      this.numberOfOnline = data;
    });
    this.mysocket.on('checkLogout',()=>{
      this.check();
    });
    this.mysocket.on('checkLogIn',()=>{
      this.check();
    });
    this.mysocket.on('onlineUsername',(data)=>{
      /// console.log("doing online index : "+ data);
            this.allUsers[data].status = true;
     });
     //getting all the users 
     this.authService.getAllUsers().subscribe( res =>{
         for(let i=0;i< res.json().length;i++){
             this.allUsers[i] = {
               name: res.json()[i].name,
               username : res.json()[i].username,
               status: false
             };
         }
     });
    // checking tokens whether is null or not
    
    let obj = this.authService.checkToken();
    if(obj ==null ){ 
      //console.log("null return "); 
    }
    else{
        //only check that current socket is loggedIn or not !
      this.authService.getAllUsers().subscribe(res =>{
        for(let i=0;i< res.json().length ; i++){
          if(res.json()[i].name == obj.name){
            this.allUsers[i].status = true;
            this.webService.sendUsername(i);
          }
        }
      });
    }
         //checking other ........
          this.webService.checkOther();
          this.mysocket.on('check',(data)=>{
              //console.log("checking in final");
            
                let obj = this.authService.checkToken();
                //only check that current socket is loggedIn or not !
                this.authService.getAllUsers().subscribe(res =>{
      
                    for(let i=0;i< res.json().length ; i++){
                      if(res.json()[i].name == obj.name){
                        this.allUsers[i].status = true;
                        this.webService.sendUsername(i);
                      }
                    }
                });
          });
      
    this.authService.getProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].owner_name != this.name){
          var d2 = new Date(response.json()[this.count1].end_time);
          var end_t = d2.getDay() + "-"+d2.getMonth() + "-"+d2.getFullYear();
            this.products[this.count1] = {
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
              end_time : end_t,
              status : response.json()[i].status
            };
            this.myprod[this.count1] = {
              product_name: response.json()[i].product_name ,
              price: response.json()[i].price,
              discription: response.json()[i].discription
            }
            // this.loadIMG()
            let num = this.count1;
            this.authService.getImages().subscribe(res=>{
              // console.log("getting images");
              for(let j=0;j< res.json().length ;j++){
                let filename_ = res.json()[j].filename;
                let ext = filename_.substring(0,filename_.lastIndexOf('.') );
                ext = ext.toLowerCase();

                let str_ = this.products[num].product_name;
                str_ = str_.replace(/ /g,'');
                str_ = str_.toLowerCase();
                // console.log("str_");
                    // s = s.replace(/ /g,'');

                if(ext == str_ ){
                  this.products[num].url = "http://localhost:4000/users/image/"+ res.json()[j].filename;
                  // console.log(this.products[num].url);
                }
              } 
            });
            this.count1++;  
        // this.authService.getBookProducts().su
        }
      }
      this.spinner1 = false;
    });   

    this.authService.getReqProducts().subscribe( response =>{
      for(let i=0;i< response.json().length ;i++){
        if(response.json()[i].owner_name != this.name){
          var d2 = new Date(response.json()[this.count2].end_time);
          var end_t = d2.getDay() + "-"+d2.getMonth() + "-"+d2.getFullYear();
            this.reqProducts[this.count2] = {
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
              end_time : end_t,
              status : response.json()[i].status

            };
            this.count2++;
          }

      }
      // this.spinner2 = false;
    });   
    this.authService.getProducts()
                    .subscribe(response =>{                   
                      this.Route.queryParamMap.subscribe(params=>{
                        this.category = params.get('category');
                        this.filter_product  = (this.category) ? 
                        this.products.filter(p => p.category_main === this.category) :
                        this.products;
                      });
                    });             
  }


  viewProduct(i){
    this.flashMessages.show('View product '+ i.product_name +' ! ',{cssClass: 'alert-success' ,timeout :4000});
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // console.log(i);
    this.router.navigate(['/viewProduct',i._id]);

  
  }
  bookProduct(i){
    this.flashMessages.show('book product ' + i.product_name + ' ! ',{cssClass: 'alert-successs' ,timeout :4000});
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.router.navigate(['/bookProduct',i._id]);

  }
  // src : any;
  loadIMG(product){
    this.authService.getImages().subscribe(res=>{
      // console.log("getting images");
      for(let i=0;i< res.json().length ;i++){
        let filename_ = res.json()[i].filename;
        let ext = filename_.substring(0,filename_.lastIndexOf('.') );
        // console.log(ext);
        if(ext == product.product_name){
          console.log(res.json()[i]);

          // this.src = filename_;
        }
      } 
    });
  }

  // Chat_with(i){
  //   // this.flashMessages.show('chat with ' + i.owner_name + ' for product '+ i.product_name ,{cssClass: 'alert-successs' ,timeout :4000});
  //   // document.body.scrollTop = 0; // For Safari
  //   // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  //   let username = i.username;
  //   let chatroom : String;
  //   this.currentUsername < username ? chatroom = this.currentUsername + "-" + username 
  //       : chatroom = username + "-" + this.currentUsername;
  //   // console.log(chatroom);    
  //   this.router.navigate(['/chatRoom',chatroom]);
  // }
  private show  = false;
  private email_of_rec : String;
  private semail : String;
  private spw : String;
  private msg : String;
  private remail : String;
  send_mail(i){
    // this.flashMessages.show('email to ' + i.owner_name + ' for product '+ i.product_name ,{cssClass: 'alert-successs' ,timeout :4000});
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.show = true;
    this.email_of_rec = i.owner_email;
    console.log(this.email_of_rec);
  }

  sendMail(){
    if(this.semail == null || this.msg == null || this.spw == null || this.remail == null){
      this.flashMessages.show('Fields can not be null !!' ,{cssClass: 'alert-danger' ,timeout :4000});
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.semail = null;
      this.msg = null;
      this.spw = null;
      this.remail = null;
    }else{
      if(!this.validateService.validateEmail(this.semail)){
        this.flashMessages.show("Enter Valid Sender Email  !",{cssClass:'alert-danger' , timeout:3000});
        return false;
      }
      if(!this.validateService.validateEmail(this.remail)){
        this.flashMessages.show("Enter Valid Receiver Email  !",{cssClass:'alert-danger' , timeout:3000});
        return false;
      }
    console.log(this.semail + " "+ this.spw + " "+ this.remail + " ");
    console.log(this.msg);
    let object = {
      sender_email : this.semail,
	    sender_pw : this.spw,
	    receiver_email : this.remail,
	    message : this.msg
    }
    console.log(object);
    this.authService.sendEmails(object).subscribe((Response)=>{
      if(Response.success)    this.flashMessages.show('Email is successfully sent to' + this.remail ,{cssClass: 'alert-success' ,timeout :4000});
      else { this.flashMessages.show('Error in sending email to ' + this.remail ,{cssClass: 'alert-danger' ,timeout :4000}); }

      this.semail = null;
      this.msg = null;
      this.spw = null;
      this.remail = null;

    });
  }
  }
  viewReqProduct(i){
    this.flashMessages.show('yes i have this product' ,{cssClass: 'alert-success' ,timeout :4000});
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // console.log("going to "+ i._id + " "+ i.product_name);
    this.router.navigate(['/viewReqProduct',i._id]);

  }

  allProducts(){
    this.filter_product = this.products;
    this.router.navigate(['/']);
  }

  check(){

    for(let i=0 ; i < this.allUsers.length ;i++){
                this.allUsers[i].status = false;
    }
    let obj = this.authService.checkToken();
    if(obj ==null ){
    }
    else{
            this.authService.getAllUsers().subscribe(res =>{
          for(let i=0;i< res.json().length ; i++){
            if(res.json()[i].name == obj.name){
              this.allUsers[i].status = true;
              this.webService.sendUsername(i);
            }
          }
          });
    }
      //checking other ........
  this.webService.checkOther();
  this.mysocket.on('check',(data)=>{
        let obj = this.authService.checkToken();
        //only check that current socket is loggedIn or not !
          this.authService.getAllUsers().subscribe(res =>{
            for(let i=0;i< res.json().length ; i++){
              if(res.json()[i].name == obj.name){
                this.allUsers[i].status = true;
                this.webService.sendUsername(i);
              }
            }
        });


  });


}

chatTOUser(item){
  // console.log(item);
  let username = item.username;
  let chatroom : String;
  this.currentUsername < username ? chatroom = this.currentUsername + "-" + username 
      : chatroom = username + "-" + this.currentUsername;
  // console.log(chatroom);    
  this.router.navigate(['/chatRoom',chatroom]);
}

}

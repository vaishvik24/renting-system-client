// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String ;
  password: String ;
  private socket ;
  private listOnlineUsers = [];
  private onlineUserStatus = [];

  constructor(private authService :AuthService,
              private router:Router,
              private flashMessages : FlashMessagesService
            ) { }

            private counter ;
  ngOnInit() {
  }

  onLoginSubmit(){
    if(this.username == null || this.username == "" ){
      this.flashMessages.show('USERNAME CAN NOT BE NULL !' ,{cssClass: 'alert-danger' ,timeout :5000});
    }else if(this.password == null || this.password == ""){
      this.flashMessages.show('PASSWORD CAN NOT BE NULL !' ,{cssClass: 'alert-danger' ,timeout :5000});
    }
    else{
      const user ={
        username : this.username,
        password : this.password 
      }
      
      
      this.authService.authenticateUser(user).subscribe(data=>{
          if(data.success){
            this.authService.storeUserData(data.token , data.user);
            this.flashMessages.show('now you are logged in' ,{cssClass: 'alert-success' ,timeout :5000});
            this.router.navigate(['Profile',user.username]);
            //this.webService.checkingAtLogIn();
          }
          else {
            this.flashMessages.show(data.msg ,{cssClass: 'alert-danger' ,timeout :5000});
            this.router.navigate(['Login']);
          }
      });
    }
  }

  
}

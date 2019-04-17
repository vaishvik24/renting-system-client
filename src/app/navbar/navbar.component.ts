// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
//import {  FlashMessagesService } from 'angular2-flash-messages';
//import { WebService } from '../services/websocket.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService :AuthService,
  private router:Router
  //private flashMessages : FlashMessagesService
  ) { }
   
  
  private hotelUser : any;
  private usernameOfUser;
  private navbarOpen = false;
  ngOnInit() {
   
    // this.authService.getProfile().subscribe(
    //   profile =>{
    //     this.hotelUser = profile.user  ;
    //     this.usernameOfUser = this.hotelUser.username;
    //     //console.log(this.usernameOfUser + " form navbar");
    //     //console.log(this.hotelUser);
    //   },err=>{
    //     console.log("error is from here");
    //     console.log(err);
    //     return false;
    //   }
    //  )

  }

  onLogout = () => {
    //console.log('Logout clicked');
    //this.flashMessages.show('Logged out', { cssClass: "alert-danger", timeout: 5000 });
    this.authService.logout();
    this.router.navigate(['/']);
    //this.webService.checkingAtLogout();
  }
  toggleNav(){
    console.log("toggling navbar");
    this.navbarOpen = !this.navbarOpen;
  }
}

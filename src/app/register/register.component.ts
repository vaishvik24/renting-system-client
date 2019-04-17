import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FormsModule, EmailValidator } from '@angular/forms';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { PhoneNumberValidator } from './phoneNo.validators';
import { EmailValidators } from './email.validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // name: string ;
  // email: String;
  // username: String;
  // password: String ;
  // url: String;
  // phoneNum: Number;

  constructor(private validateService :ValidateService ,
              private flashMessagesService : FlashMessagesService,
              private authService : AuthService ,
              private router : Router ,
              private formsModle : FormsModule,
              private emailValidatorTs : EmailValidators,
              private usernameValidators : UsernameValidators
            ) { }
  

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),

    username: new FormControl('', [
      Validators.required   
    ],
    this.usernameValidators.notAUniqueUsername
    ),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.emailValidatorTs.validEmailEnter,
    ], 
    this.emailValidatorTs.notAUniqueEmail
    ),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    phoneNumber: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      PhoneNumberValidator.isNotANum
    ]),
    url : new FormControl('',[Validators.required])
    
    });          
  ngOnInit() {
  }

  onSubmit() {
    let obj = this.form.value;
    const user = {
        name : obj.firstName,
        email : obj.email,
        password : obj.password,
        username : obj.username,
        url: obj.url,
        phoneNum: obj.phoneNumber
    }
    // console.log(user);
    // console.log(this.form.value);
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show("enter all the fields ....",{cssClass:'alert-danger' , timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show("Enter Valid Email  !",{cssClass:'alert-danger' , timeout:3000});
      return false;
    }

    
    console.log(user);
      this.authService.registerUser(user).subscribe(data=>{
        if(data.success){
          this.flashMessagesService.show("Registred user ... ",{cssClass:'alert-success' , timeout:3000});
          this.router.navigate(['/Login']);
        }
        else{
           this.flashMessagesService.show("something went wrong ... ",{cssClass:'alert-danger' , timeout:3000});
        this.router.navigate(['/Register']);}
      })
    console.log("done");
  }
  get username() {
    return this.form.get('username');
  }
  

}

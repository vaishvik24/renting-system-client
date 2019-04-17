import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompileSummaryKind } from '@angular/compiler';
import { empty } from 'rxjs';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from '../register/username.validators';
import { PhoneNumberValidator } from '../register/phoneNo.validators';
import { EmailValidators } from '../register/email.validators';
@Component({
  selector: 'app-add-req-product',
  templateUrl: './add-req-product.component.html',
  styleUrls: ['./add-req-product.component.css']
})
export class AddReqProductComponent implements OnInit {
  name: String;
  price: Number;
  dis: String;
  city: String;
  state: String;
  cat_main = ["Real Estate","Vehicles","Electronics","Sports","Hobby","Books","Educational","Clothing","Furniture","Other"];
  cmain: String;
  cat_sub = [];
  csub: String;
  // date_ = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
  // eday: String;
  // month_ = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  // emonth: String;
  // year_ = ["2019","2020","2021","2023","2024","2025","2026"];
  // eyear: String;
  user:  Object;
  owner_name: String;
  owner_email: String;
  username : String;
  dob : any;
  flag = false;
  constructor(private validateService :ValidateService ,
    private flashMessagesService : FlashMessagesService,
    private authService : AuthService ,
    private router : Router ,
    private formsModle : FormsModule,
    private emailValidatorTs : EmailValidators,
  ) {
    this.flag = false;
   }
  ngOnInit() {
    this.flag= false;
    this.authService.getProfile().subscribe( profile =>{
      this.user = profile.user;
      // console.log(profile.user.name);
      this.owner_email = profile.user.email;
      this.owner_name = profile.user.name;
      // console.log(this.owner_email+" & "+this.owner_name);
    },err=>{
      console.log(err);
      return false;
    });
    // console.log(this.user);
    this.logNameChange();
  }

  logNameChange() {
    const nameControl = this.form.get('cat');
    nameControl.valueChanges.forEach(
      (value: string) => {
        console.log(value);
        this.form.controls['sub_cat'].setValue('');
        this.findSUB(value);
      
    });
  }

  form = new FormGroup({
    name_: new FormControl('', Validators.required),
    price_: new FormControl('',Validators.required),
    discription_: new FormControl('', Validators.required),
    city_: new FormControl('', Validators.required),
    state_: new FormControl('', Validators.required),
    date_ : new FormControl('',Validators.required),
    cat : new FormControl('',Validators.required),
    sub_cat : new FormControl('',Validators.required),
    // image_ : new FormControl('',Validators.required)
    });      

  findSUB(value){
    if(value == "Vehicles")this.cat_sub = ["2-wheeler-Luxury","2-wheeler-Regular","4-wheeler-SUV","4-wheeler-Sedan","4-wheeler-HatchBack","Other"];
    if(value == "Real Estate")this.cat_sub = ["Residential","Commercial","Other"];
    if(value == "Electronics")this.cat_sub = ["Laptop","Pendrives/hard-disks","Computer accessories","Home entertainment","Televisions","camera accessories","projecters","Security cameras","Cameras","Printers and scanners","Other"];
    if(value == "Sports")this.cat_sub = ["Indoor","Outdoor","Gymnasium","Other"];
    if(value == "Hobby")this.cat_sub = ["Singing equipment","Dance equipment","Others"];
    if(value == "Books")this.cat_sub = ["Love stories","NCRT books","Horror","History","Others"];
    if(value == "Educational")this.cat_sub = ["Reference Books","Journals","Magazines","Notebooks","CDs","Other"];
    if(value == "Clothing")this.cat_sub = ["Men","Women","Children","Other"];    
    if(value == "Furniture")this.cat_sub = ["Beds and wardrobes","Sofa and dining","Home Decor","Other"];
    // this.flag= true;
  }
  // addProductDB(){
  //   this.authService.getProfile().subscribe( profile =>{
  //     this.user = profile.user;
  //     // console.log(profile.user.name);
  //     this.owner_email = profile.user.email;
  //     this.owner_name = profile.user.name;
  //     this.username = profile.user.username;
  //     // console.log(this.owner_email+" & "+this.owner_name);
  //   },err=>{
  //     console.log(err);
  //     return false;
  //   });
  //     // console.log("add product db called");
  //     let day = this.dob.split("-",4);
  //     console.log(day);
  //     const newProduct =  {
  //     owner_name: this.owner_name,
  //     owner_email: this.owner_email,
  //     name: this.name,
  //     price: this.price,
  //     discription: this.dis,
  //     location: {
  //         city: this.city,
  //         state: this.state
  //     },
  //     category: {
  //         main: this.cmain,
  //         sub: this.csub
  //     },
  //     edate: day[2],
  //     emonth: day[1],
  //     eyear: day[0]

  // };
  // console.log(newProduct);
  // this.authService.addReqProduct(newProduct).subscribe(data=>{
  //   if(data.success){
  //     this.flashMessagesService.show("Product has been successfully added",{cssClass:'alert-success' , timeout:3000});
  //     this.router.navigate(['/']);
  //   }
  //   else{
  //      this.flashMessagesService.show("something went wrong in adding ... ",{cssClass:'alert-danger' , timeout:3000});
  //   this.router.navigate(['/addReqProduct']);}
  // })
  // }

  onSubmit(){
    console.log(this.form.value);
    this.authService.getProfile().subscribe( profile =>{
      this.user = profile.user;
      this.owner_email = profile.user.email;
      this.owner_name = profile.user.name;
      this.username = profile.user.username;
    },err=>{
      console.log(err);
      return false;
    });
      let day = this.form.value.date_.split("-",4);
      const newProduct =  {
      owner_name: this.owner_name,
      owner_email: this.owner_email,
      name: this.form.value.name_,
      price: this.form.value.price_,
      discription: this.form.value.discription_,
      ratting: 0,
      location: {
          city: this.form.value.city_,
          state: this.form.value.state_
      },
      url: "",
      category: {
          main: this.form.value.cat,
          sub: this.form.value.sub_cat
      },
      edate: day[2],
      emonth: day[1],
      eyear: day[0]

      };
      console.log(newProduct);
      // console.log("done");
      this.authService.addReqProduct(newProduct).subscribe(data=>{
      if(data.success){
          this.flashMessagesService.show("Product has been successfully added",{cssClass:'alert-success' , timeout:3000});
          this.router.navigate(['/']);
      }
      else{
          this.flashMessagesService.show("something went wrong in adding ... ",{cssClass:'alert-danger' , timeout:3000});
        this.router.navigate(['/addReqProduct']);}
      })
  }

}
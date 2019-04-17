import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {FilterPipe } from './filter.pipe';
import {FilterPricePipe} from  './filter.price.pipe';
import {WebService} from './services/websocket.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
// import { WebsocketService} from './services/websocket.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AddProductComponent } from './add-product/add-product.component';
import { AddReqProductComponent } from './add-req-product/add-req-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { BookProductComponent } from './book-product/book-product.component';
import { ViewReqProductComponent } from './view-req-product/view-req-product.component';
import { HttpClientModule} from '@angular/common/http';
import { PaymentDoneComponent } from './payment-done/payment-done.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailValidators } from './register/email.validators';
import { PhoneNumberValidator } from './register/phoneNo.validators';
import { UsernameValidators } from './register/username.validators';

// import { ChatRoomComponent } from './chat-room/chat-room.component';
const appRoute : Routes = [
  { path:'' ,component: HomeComponent},
  { path:'Navbar' ,component: NavbarComponent},
  { path:'Login' ,component: LoginComponent},
  { path:'Register' ,component: RegisterComponent},
  { path:'Profile/:username' ,component: ProfileComponent , canActivate:[AuthGuard]},
  {path:'addProduct',component: AddProductComponent, canActivate: [AuthGuard]},
  {path:'addReqProduct',component: AddReqProductComponent, canActivate: [AuthGuard]},
  {path:'viewProduct/:_id',component: ViewProductComponent},
  {path:'bookProduct/:_id',component: BookProductComponent, canActivate: [AuthGuard]},
  {path:'viewReqProduct/:_id',component: ViewReqProductComponent},
  {path:'payment/:pid',component: PaymentDoneComponent},
  {path:'spinner',component: SpinnerComponent},
  {path:'chatRoom/:cid',component: ChatRoomComponent},


]; 
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe,
    FilterPricePipe,
    NavbarComponent,
    HomeComponent,
    AddProductComponent,
    AddReqProductComponent,
    ViewProductComponent,
    BookProductComponent,
    ViewReqProductComponent,
    FileSelectDirective,
    PaymentDoneComponent,
    SpinnerComponent,
    ChatRoomComponent,
    // ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule.forRoot(appRoute),
    NgxPaginationModule,
    FormsModule,
    FlashMessagesModule,
    AngularFileUploaderModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [ValidateService,AuthService,AuthGuard, FlashMessagesService,WebService,EmailValidators,PhoneNumberValidator,UsernameValidators],
  bootstrap: [AppComponent]
})
export class AppModule { }



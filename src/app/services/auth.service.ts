import { Injectable } from '@angular/core';
import { Http , Headers, ResponseContentType } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  product: any;
  reqProduct : any;
  getset: any;
  

  constructor(private http : Http) { }

  paymentRequest(payment){
    let headers = new Headers();
    // console.log("register");
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/pay',payment , {headers:headers}).map(res=>res.json());
  }

  paymentDetails(id){
    return this.http.get('http://localhost:4000/users/paymentDetails/'+ id);
  }
  paymentSuccess(){
    return this.http.get('http://localhost:4000/users/success');
  }
  registerUser(user){
    let headers = new Headers();
    // console.log("register");
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/register',user , {headers:headers}).map(res=>res.json());
  }

  getImages(){
    return this.http.get('http://localhost:4000/users/files');
  } 

  findImageById(id){
    return this.http.get('http://localhost:4000/users/image'+id);
  }

  getChatRoomsChat(room){
    return this.http.get('http://localhost:4000/users/chatroom/' + room);
  }

  
  sendEmails(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/email', email , {headers:headers}).map(res=>res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/authentication', user , {headers:headers}).map(res=>res.json());
  }

  addProduct(product){
    // console.log("adding is under process");
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/addProduct', product , {headers:headers}).map(res=>res.json());
  } 

  bookProduct(bookProduct_){
    console.log("booking form auth "+ bookProduct_)
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/bookingProduct', bookProduct_ , {headers:headers}).map(res=>res.json());  
  }

  bookReqProduct(bookProduct_){
    console.log("bboking req prod " + bookProduct_);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/bookingReqProduct', bookProduct_ , {headers:headers}).map(res=>res.json());  
  }

  approveProduct(product){
    console.log(product);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/updateBookedProduct', product , {headers:headers}).map(res=>res.json());  
  }

  approveReqProduct(product){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/updateBookingReqProduct', product , {headers:headers}).map(res=>res.json());  
  }
  addReqProduct(reqProduct){
    console.log("adding is under process");
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/addReqProduct', reqProduct , {headers:headers}).map(res=>res.json());
  } 

  getBookProducts(){
    // return this.http.get('http://localhost:4000/users/getBookProduct');
    return this.http.get('http://localhost:4000/users/getProduct'); 
  }
  unmarkProduct(prod){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/cancelBookedProduct', prod , {headers:headers}).map(res=>res.json());
  }

  unmarkReqProduct(prod){
    console.log(prod);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/cancelBookingReqProduct', prod , {headers:headers}).map(res=>res.json());

  }

  getBookReqProducts(){
    return this.http.get('http://localhost:4000/users/getReqProduct');
    // http://localhost:4000/users/getBookReqProduct
  }
  getProducts(){
    return this.http.get('http://localhost:4000/users/getProduct');
  }

  getAllUsers(){
    return this.http.get('http://localhost:4000/users/getUsers');
  }

  getReqProducts(){
    return this.http.get('http://localhost:4000/users/getReqProduct');
  }

  offlinePayment(product){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/paymentRecived', product , {headers:headers}).map(res=>res.json());  
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    //headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:4000/users/profile' , {headers:headers}).map(res=>res.json());
    
  }

 
  storeUserData(token ,user){

    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken= token;
    this.user = user;
  }

loadToken(){
  const token = localStorage.getItem('id_token');
  // console.log("token "+ token);
  // console.log("token 2 : "+ localStorage.getItem('user'));
  this.authToken = token;
}

checkToken(){
  if(localStorage.getItem('user') == null){ 
    //console.log("returning null..."); 
    return null;}
  else{
  let user1 = localStorage.getItem('user').toString();
  var obj = JSON.parse(user1);
  //console.log(obj + " "+ obj.name);
  return obj ;
  }
}

loggedIn() {
    //console.log("logged in");
    return tokenNotExpired('id_token');
}

  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
    //console.log("clear memory !!");
  }
}

// import { AngularFireDatabase } from 'angularfire2/database';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';
import { AuthService} from '../services/auth.service';

@Injectable()
export class UsernameValidators {
    
    constructor(
        // private db: AngularFireDatabase
        private authService : AuthService
    ) {
    }

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace: true };

        return null;
    }

    public notAUniqueUsername = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log("Validator: " + control.value as string);
                let count = 0;
                this.authService.getAllUsers().subscribe(res=>{
                    // console.log(control.value);
                    for(let i=0;i< res.json().length ; i++){
                        if(res.json()[i].username == (control.value as string)){
                            resolve({ notAUniqueUsername: true });
                            // console.log("same " + res.json()[i].username);
                            count++;
                        }
                    }
                    if(count == 0) resolve(null);
                });
                // resolve({ notAUniqueUsername: true });
            }, 1000);
        });
    }
    
    public notAUniqueName = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log("Validator: " + control.value as string);
                let count = 0;
                this.authService.getAllUsers().subscribe(res=>{
                    // console.log(control.value);
                    for(let i=0;i< res.json().length ; i++){
                        if(res.json()[i].name == (control.value as string)){
                            resolve({ notAUniqueName: true });
                            // console.log("same " + res.json()[i].name);
                            count++;
                        }
                    }
                    if(count == 0) resolve(null);
                });
                // resolve({ notAUniqueUsername: true });
            }, 1000);
        });
    }

    public notAUniqueProduct = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log("Validator: " + control.value as string);
                let count = 0;
                this.authService.getProducts().subscribe(res=>{
                    // console.log(control.value);
                    for(let i=0;i< res.json().length ; i++){
                        let str1 = res.json()[i].product_name;
                        str1 = str1.replace(/ /g,'');
                        str1 = str1.toLowerCase();
                        let str2 = control.value as string ;
                        str2 = str2.replace(/ /g,'');
                        str2 = str2.toLowerCase();
                        // console.log(str1 + "    "  + str2);
                        if(str1 == str2){
                            resolve({ notAUniqueProduct: true });
                            // console.log("same " + res.json()[i].product_name);
                            count++;
                        }
                    }
                    if(count == 0) resolve(null);
                });
                // resolve({ notAUniqueUsername: true });
            }, 1000);
        });
    }
}
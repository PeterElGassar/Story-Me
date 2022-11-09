import { Directive, Input } from "@angular/core";
import { AbstractControl, ControlContainer, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


// @Directive({
//     selector:'[appConfirmPasswordValidator]',
//     providers:[{
//         provide:NG_VALIDATORS,
//         useExisting:ConfirmPasswordValidator,
//         multi:true
//     }]
// })
export class ConfirmPasswordValidator {


   static validateConfirmpassword(control: AbstractControl): ValidationErrors | null {
        // debugger;
        // const controleToCompare = control.parent.get("password");

        // if(controleToCompare && controleToCompare.value !== control.value){
        //     return {'noEqual':true};
        // }

        if(control.value != null){
            console.log(control.value);        
        }
        return {'noEqual':true};
    }



} 
import { ICourse, ICourseForBasket } from "./Course";
import {v4 as uuidv4}  from "uuid";
import { IDiploma } from "./Diploma";

export interface IBasket{
    id:string,
    basketItems:ICourseForBasket[];
    diplomaItems: IDiploma[];
}
// export class Basket3{
//     basketItems:ICourseForBasket[];
// }

// export class Basket2{
//     id:string;
//     basketItems:ICourseForBasket[];
// }

export class Basket implements IBasket{
    id= uuidv4();
    basketItems: ICourseForBasket[]=[];
    diplomaItems: IDiploma[]=[];
}

export class BasketToSend{
    id:string;
    basketItems:number[]=[];
    diplomaItems:number[]=[];
}
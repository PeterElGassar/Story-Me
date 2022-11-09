import {v4 as uuidv4}  from "uuid";
import { ICourseForBasket } from "./Course";

export interface IWishlist{
    id:string,
    basketItems:ICourseForBasket[];
    diplomaItems:ICourseForBasket[];
}


export class WishList implements IWishlist{
    id= uuidv4();
    basketItems: ICourseForBasket[]=[];
    diplomaItems: ICourseForBasket[]=[];

}

export class WhishlistToSend{
    id:string;
    basketItems:number[]=[];
    diplomaItems:number[]=[];
}
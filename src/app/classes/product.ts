import { Category } from './category';
export class Product {

    public constructor(public code:number,public name:string,public currentPrice:number,
                       public isPromotion:boolean,public isSelected:boolean,
                       public isAvailable:boolean,public photoName:string,public category:Category){

    }
}

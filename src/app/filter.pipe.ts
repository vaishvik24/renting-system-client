import  {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform{
    transform(items:any[],searchtext: String):any[]{
        if(!items){
            // console.log("No items");
            return [];
        }
        if(!searchtext){
            // console.log("st");
            return items;}
        searchtext = searchtext.toLocaleLowerCase();
        return items.filter( it=>{
            return it.product_name.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase());
        });
    }
}

import {Pipe,PipeTransform} from '@angular/core';
import { Drugs } from 'src/Models/drugs';
@Pipe({
    name:'drugName'
})
export class drugName implements PipeTransform{
    transform(customer:Drugs[],drugName:string)
    {
      console.log(customer.length);
      if(!customer || !drugName)
      {
          return customer;
      }
      return customer.filter((x=>x.name==drugName));
    }
  }
  @Pipe({
    name:'drugRegion'
  })
  export class drugRegion implements PipeTransform{
    transform(customer:Drugs[],drugRegion:string)
    {
        if(!customer || !drugRegion)
        {
            return customer;
        }
        console.log("inside filter");
      return customer.filter((x=>x.region==drugRegion));   
    }
  }
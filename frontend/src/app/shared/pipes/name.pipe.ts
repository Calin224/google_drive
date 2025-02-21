import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../models/user';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: User | null, ...args: unknown[]): unknown {
    if(value){
      return `${value.firstName.toUpperCase()} ${value.lastName.toUpperCase()}`
    }
    return "Unknown user";
  }

}

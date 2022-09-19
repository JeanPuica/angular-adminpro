import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myImage',
})
export class MyImagePipe implements PipeTransform {
  transform(value: string, argType: 'users' | 'medics' | 'hospitals'): any {
    if (value && value.length > 0) {
      return `/api/upload/${argType}/${value}`;
    }
    return `/api/upload/${argType}/no-image`;
  }
}

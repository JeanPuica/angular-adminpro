import { NgModule } from '@angular/core';
import { MyImagePipe } from '../pipes/my-image.pipe';

@NgModule({
  declarations: [MyImagePipe],
  exports: [MyImagePipe],
})
export class MyCommonsModule {}
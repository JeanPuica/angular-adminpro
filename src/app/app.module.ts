import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './providers/auth-interceptor.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  declarations: [AppComponent, NopagefoundComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { MyRsvpsComponent } from './pages/my-rsvps/my-rsvps.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OffersComponent } from './pages/offers/offers.component';
import { BasketComponent } from './pages/basket/basket.component';
import { SearchComponent } from './pages/search/search.component';

import { MatButtonModule ,
         MatListModule ,
         MatDividerModule,
         MatTreeModule,
         MatIconModule,
         MatCardModule
        } from '@angular/material';
import { ProductComponent } from './pages/product-list/product-list.component';
import { ProductItemComponent } from './pages/product-list/product-item/product-item.component';
import { BasketItemComponent } from './pages/basket/basket-item/basket-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    MyRsvpsComponent,
    CategoriesComponent,
    OffersComponent,
    BasketComponent,
    SearchComponent,
    ProductComponent,
    ProductItemComponent,
    BasketItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    AuthModule.forRoot(),
    CoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

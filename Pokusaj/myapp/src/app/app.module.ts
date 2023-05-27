import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthAdminGuard } from './guards/auth-admin.guard';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DetailComponent } from './detail/detail.component';
import { ProductsComponent } from './products/products.component';
import { CartSecondComponent } from './cart-second/cart-second.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoadingInterceptor } from './loading.interceptor';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ModalCheckoutComponent } from './modal-checkout/modal-checkout.component';
import { UsersComponent } from './users/users.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { ContactComponent } from './contact/contact.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { MessagesComponent } from './messages/messages.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    CartSecondComponent,
    AccountComponent,
         CheckoutComponent,
         OrderComponent,
         ModalComponent,
         SearchComponent,
         WishlistComponent,
    AppComponent,
    ModalCheckoutComponent,
    UsersComponent,
    OrderAdminComponent,
    ContactComponent,
    ReturnPolicyComponent,
    ShippingPolicyComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DetailComponent,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    HomeComponent,
    AdminComponent,
    MatSlideToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    ProductsComponent,
    MatInputModule,
    NgbModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[ ],
  providers: [AuthGuard, AuthAdminGuard, {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }, 
 
],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],

}) 
export class AppModule {
}

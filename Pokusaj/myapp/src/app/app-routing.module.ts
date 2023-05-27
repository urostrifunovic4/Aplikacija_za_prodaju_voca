import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DetailComponent } from './detail/detail.component';
import { ProductsComponent } from './products/products.component';
import { CartSecondComponent } from './cart-second/cart-second.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UsersComponent } from './users/users.component';
import { ContactComponent } from './contact/contact.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' }, 
   { path:'home', component: HomeComponent }, 
  { path:'admin-fruits', component: AdminComponent,canActivate : [AuthAdminGuard] },
  { path:'shipping-policy', component:ShippingPolicyComponent },
  { path:'return-policy', component:ReturnPolicyComponent },
  { path:'contact', component:ContactComponent },
  { path:'admin_login', component: AdminLoginComponent },
   { path:'user_login', component: UserLoginComponent },
  { path:'user_register', component: UserRegistrationComponent },
  { path:'detail', component: DetailComponent },
  { path:'detail/:id', component:DetailComponent },
  { path:'products', component:ProductsComponent},
  { path:'products/:id', component:ProductsComponent},
  { path:'cart-second', component:CartSecondComponent },
  { path:'checkout', component:CheckoutComponent },
   { path:'dashboard', component:AccountComponent, canActivate : [AuthGuard]  },
   {path:'order',component:OrderComponent},
   {path:'search/:query', component: SearchComponent},
   {path:'wishlist', component: WishlistComponent},
   { path:'admin-users', component: UsersComponent },
   { path:'admin-orders', component: OrderAdminComponent },
   { path:'admin-messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };


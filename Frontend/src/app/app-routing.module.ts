import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardClientService } from './services/auth-guard-client.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'shop', component: ProductsComponent
  },
  {
    path: 'your-cart', component: CartComponent, canActivate: [AuthGuardClientService] 
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdminService] 
  },
  {
    path: 'login', component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

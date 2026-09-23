import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { HorecaComponent } from './pages/horeca/horeca.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Trio 95' },
  { path: 'about', component: AboutComponent, title: 'About — Trio 95' },
  { path: 'products', component: ProductsComponent, title: 'Products — Trio 95' },
  { path: 'horeca', component: HorecaComponent, title: 'HoReCa — Trio 95' },
  { path: 'contact', component: ContactComponent, title: 'Contact — Trio 95' },
  { path: '**', redirectTo: '' }
];

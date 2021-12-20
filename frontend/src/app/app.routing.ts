import { UsersPageComponent } from './pages/users-page/users-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ExamplePageComponent } from './pages/example-page/example-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SalesmanComponent } from './pages/salesman/salesman.component';
import { SocialrecordComponent } from './pages/socialrecord/socialrecord.component';
import { BonussalaryComponent } from './pages/bonussalary/bonussalary.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OpenBonussalariesComponent } from './pages/open-bonussalaries/open-bonussalaries.component';
import { ClosedBonussalariesComponent } from './pages/closed-bonussalaries/closed-bonussalaries.component';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersPageComponent } from './pages/customers-page/customers-page.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';

/*
  This array holds the relation of paths and components which angular router should resolve.

  If you want add a new page with a separate path/subdirectory you should register it here.
  It is also possible to read parameters from the path they have to be specified with ':' in the path.

  If a new page should also show up in the menu bar, you need to add it there too.
  Look at: frontend/src/app/components/menu-bar/menu-bar.component.ts
 */
const routes: Routes = [
	{ path: 'login', component: LoginPageComponent },
	{ path: 'example', component: ExamplePageComponent, canActivate: [ AuthGuardService ] },
	{ path: 'products', component: ProductsComponent, canActivate: [ AuthGuardService ] },
	{ path: 'customers', component: CustomersPageComponent, canActivate: [ AuthGuardService ] },
	{ path: 'sales', component: SalesPageComponent, canActivate: [ AuthGuardService ] },
	{ path: 'salesman', component: SalesmanComponent, canActivate: [ AuthGuardService ] },
	{ path: 'users', component: UsersPageComponent, canActivate: [ AuthGuardService ] },
	{ path: 'socialrecord/:sid', component: SocialrecordComponent, canActivate: [ AuthGuardService ] },
	{ path: 'bonussalary/:sid', component: BonussalaryComponent, canActivate: [ AuthGuardService ] },
	{ path: 'opensalaries', component: OpenBonussalariesComponent, canActivate: [ AuthGuardService ] },
	{ path: 'mysalaries', component: ClosedBonussalariesComponent, canActivate: [ AuthGuardService ] },
	{ path: 'profile', component: ProfileComponent, canActivate: [ AuthGuardService ] },
	{ path: '', component: LandingPageComponent, canActivate: [ AuthGuardService ] },
	{ path: '**', component: NotFoundPageComponent } // these entries are matched from top to bottom => not found should be the last entry
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRouting {
}

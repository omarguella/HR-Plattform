import { UsersPageComponent } from './pages/users-page/users-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox'; 

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ExamplePageComponent } from './pages/example-page/example-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SalesmanComponent } from './pages/salesman/salesman.component';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SocialrecordComponent } from './pages/socialrecord/socialrecord.component';
import { BonussalaryComponent } from './pages/bonussalary/bonussalary.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OpenBonussalariesComponent } from './pages/open-bonussalaries/open-bonussalaries.component';
import { ClosedBonussalariesComponent } from './pages/closed-bonussalaries/closed-bonussalaries.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    LandingPageComponent,
    MenuBarComponent,
    ExamplePageComponent,
    NotFoundPageComponent,
    SalesmanComponent,
    UsersPageComponent,
    SidebarComponent,
    SocialrecordComponent,
    BonussalaryComponent,
    ProfileComponent,
    OpenBonussalariesComponent,
    ClosedBonussalariesComponent
  ],
    imports: [
        BrowserModule,
        AppRouting,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatTableModule,
        MatDividerModule,
        MatCheckboxModule
    ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

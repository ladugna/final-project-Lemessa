import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { TokenInterceptor } from './token.interceptor';
import { SignupComponent } from './signup/signup.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { NgImageSliderModule } from 'ng-image-slider';

function initializeAppFunction(authService: AuthenticationService): () => void {
  return () => {
    const localStorage_state = localStorage.getItem('currentUser');
    if (localStorage_state) {
      authService.setUserState(JSON.parse(localStorage_state));
    }
  };
}
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'myOffers', component: OffersListComponent },
  {
    path: 'properties',
    loadChildren: () =>
      import('./property/properties.module').then(
        (module) => module.PropertiesModule
      ),
    canActivate: [
      () => {
        const excludedComponents = [
          'PropertyDetailsComponent',
          'PropertiesListComponent',
        ];
        const currentRoute = inject(ActivatedRoute);
        const component = currentRoute.snapshot.firstChild?.component;
        if (
          (component &&
            excludedComponents.includes('PropertiesListComponent')) ||
          excludedComponents.includes('PropertyDetailsComponent')
        ) {
          return true;
        }
        return inject(AuthenticationService).currentUserState.value.accessToken
          ? true
          : false;
      },
    ],
  },
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    OffersListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFunction,
      deps: [AuthenticationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

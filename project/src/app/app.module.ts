import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { TestsComponent } from './tests/tests.component';
import { RegisterComponent } from './register/register.component';

import { AuthenticationService } from './authentification.service';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { CreateTestComponent } from './create-test/create-test.component';
import { TestComponent } from './test/test.component';
import { ResultsComponent } from './results/results.component';
import { PietreeComponent } from './pietree/pietree.component';
import { AdminComponent } from './admin/admin.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from './translate.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CreateCardSortComponent } from './create-card-sort/create-card-sort.component';
import { CardSortTestComponent } from './card-sort-test/card-sort-test.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent},
  { path: 'create-test', component: CreateTestComponent},
  { path: 'create-test/:id', component: CreateTestComponent},
  { path: 'test/:id', component: TestComponent},
  { path: 'results/:id', component: ResultsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tests', component: TestsComponent},
  { path: 'pie-tree/:id/:index', component: PietreeComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TestsComponent,
    RegisterComponent,
    CreateTestComponent,
    TestComponent,
    ResultsComponent,
    PietreeComponent,
    AdminComponent,
    CreateCardSortComponent,
    CardSortTestComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule],
  providers: [
    AuthenticationService,
    AlertService,
    UserService,
    {provide:LocationStrategy, useClass:HashLocationStrategy},
    TranslationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
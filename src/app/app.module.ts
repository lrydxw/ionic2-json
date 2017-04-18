import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuotesPage } from "../pages/quotes/quotes";
import { QuotePage } from "../pages/quote/quote";
import { LiuPage } from "../pages/liu/liu";
import { RegisterPage } from "../pages/register/register";
import { SelectPage } from "../pages/select/select";
import { TestListPage } from "../pages/test-list/test-list";
import { TestPage } from "../pages/test/test";
import { QuotesService } from "../services/quotes";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShoppingListService } from "../services/shopping-list";
import { RecipesService } from "../services/recipes";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuotesPage,
    QuotePage,
    LiuPage,
    RegisterPage,
    SelectPage,
    TestListPage,
    TestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage ,
    QuotesPage,
    QuotePage,
    LiuPage,
    RegisterPage,
    SelectPage,
    TestListPage,
    TestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuotesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService
  ]
})
export class AppModule {}

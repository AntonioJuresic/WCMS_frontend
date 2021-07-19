import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StylingComponent } from "./styling/styling.component";
import { HttpClientModule } from '@angular/common/http';
import { ArticlesTestComponent } from './components/articles-test/articles-test.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    StylingComponent,
    ArticlesTestComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

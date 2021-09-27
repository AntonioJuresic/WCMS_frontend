import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { StylingComponent } from "./styling/styling.component";
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdministrationComponent } from './components/administration-components/administration/administration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdministrationPostsComponent } from './components/administration-components/administration-posts/administration-posts.component';
import { AdministrationCategoriesComponent } from './components/administration-components/administration-categories/administration-categories.component';
import { AuthenticationInterceptor } from "./shared/services/authentication.interceptor";
import { EditorCategoryComponent } from './components/editors/editor-category/editor-category.component';
import { EditorPostComponent } from './components/editors/editor-post/editor-post.component';
import { FilterByStringPipe } from './shared/utilities/filter-by-string.pipe';
import { RegistrationComponent } from './components/registration/registration.component';
import { ServerDownComponent } from './components/server-down/server-down.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    StylingComponent,
    PostDetailComponent,
    PostsComponent,
    LoginComponent, 
    NavigationComponent,
    AdministrationComponent,
    MainPageComponent,
    CategoriesComponent,
    AdministrationPostsComponent,
    AdministrationCategoriesComponent,
    EditorCategoryComponent,
    EditorPostComponent,
    FilterByStringPipe,
    RegistrationComponent,
    ServerDownComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

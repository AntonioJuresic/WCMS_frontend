import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { PostDetailComponent } from './components/posts-components/post-detail/post-detail.component';
import { StylingComponent } from "./styling/styling.component";
import { PostsComponent } from './components/posts-components/posts/posts.component';
import { LoginComponent } from './components/users-components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdministrationComponent } from './components/administration-components/administration/administration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdministrationPostsComponent } from './components/administration-components/administration-posts/administration-posts.component';
import { AdministrationCategoriesComponent } from './components/administration-components/administration-categories/administration-categories.component';
import { AuthenticationInterceptor } from "./shared/services/authentication.interceptor";
import { EditorCategoryComponent } from './components/editor-components/editor-category/editor-category.component';
import { EditorPostComponent } from './components/editor-components/editor-post/editor-post.component';
import { FilterByStringPipe } from './shared/utilities/filter-by-string.pipe';
import { RegistrationComponent } from './components/users-components/registration/registration.component';
import { ServerDownComponent } from './components/error-components/server-down/server-down.component';
import { NotFoundComponent } from './components/error-components/not-found/not-found.component';
import { PostsByCategoryComponent } from './components/posts-components/posts-by-category/posts-by-category.component';
import { WebsiteInfoComponent } from './components/website-info/website-info.component';
import { EditorWebsiteInfoComponent } from './components/editor-components/editor-website-info/editor-website-info.component';
import { AdministrationWebsiteInfoComponent } from './components/administration-components/administration-website-info/administration-website-info.component';
import { EditorUserComponent } from './components/editor-components/editor-user/editor-user.component';
import { AdministrationUsersComponent } from './components/administration-components/administration-users/administration-users.component';
import { AdministrationCommentsComponent } from './components/administration-components/administration-comments/administration-comments.component';
import { PostCommentsComponent } from './components/posts-components/post-comments/post-comments.component';
import { UserProfileComponent } from './components/users-components/user-profile/user-profile.component';
import { UserCommentsComponent } from './components/users-components/user-comments/user-comments.component';
import { AdministrationInvitationsComponent } from './components/administration-components/administration-invitations/administration-invitations.component';
import { EditorInvitationComponent } from './components/editor-components/editor-invitation/editor-invitation.component';
import { EditorUserAuthorityComponent } from './components/editor-components/editor-user-authority/editor-user-authority.component';
import { AdministrationAuthoritiesComponent } from './components/administration-components/administration-authorities/administration-authorities.component';
import { EditorAuthorityComponent } from './components/editor-components/editor-authority/editor-authority.component';
import { ShortenTextPipe } from './shared/utilities/shorten-text.pipe';
import { ArticleShortComponent } from './components/posts-components/article-short/article-short.component';
import { ArticleLongComponent } from './components/posts-components/article-long/article-long.component';
import { UserDetailComponent } from './components/users-components/user-detail/user-detail.component';
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";


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
    NotFoundComponent,
    PostsByCategoryComponent,
    WebsiteInfoComponent,
    EditorWebsiteInfoComponent,
    AdministrationWebsiteInfoComponent,
    EditorUserComponent,
    AdministrationUsersComponent,
    AdministrationCommentsComponent,
    PostCommentsComponent,
    UserProfileComponent,
    UserCommentsComponent,
    AdministrationInvitationsComponent,
    EditorInvitationComponent,
    EditorUserAuthorityComponent,
    AdministrationAuthoritiesComponent,
    EditorAuthorityComponent,
    ShortenTextPipe,
    ArticleShortComponent,
    ArticleLongComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

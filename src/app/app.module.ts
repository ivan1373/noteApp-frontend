import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MdbootstrapModule} from './mdbootstrap/mdbootstrap.module';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './auth.interceptor';
import { NotesComponent } from './notes/notes.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { AuthGuard } from './auth.guard';
import { FooterComponent } from './footer/footer.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuard]},
  { path: 'notes/new', component: CreateNoteComponent, canActivate: [AuthGuard]},
  { path: 'notes/:id/edit', component: EditNoteComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotesComponent,
    CreateNoteComponent,
    FooterComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    MdbootstrapModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

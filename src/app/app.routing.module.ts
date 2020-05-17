import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { PhotosListComponent } from './photos/photos-list/photos-list.component';
import { PhotosFormComponent } from './photos/photos-form/photos-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photos-list/photo-list.resolver';
import { SignInComponent } from './home/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SignUpComponent } from './home/signup/signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: SignInComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'signup',
                component: SignUpComponent,
            },
        ]
    },
    {
        path: 'user/:userName',
        component: PhotosListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { path: 'p/add', component: PhotosFormComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true}) // questão de compatibilidade com servidores que não disparem para o index.html
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
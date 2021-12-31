import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/item/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/item/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/item/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/user/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./pages/item/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
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
    path: 'show-all',
    loadChildren: () => import('./pages/item/show-all/show-all.module').then( m => m.ShowAllPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

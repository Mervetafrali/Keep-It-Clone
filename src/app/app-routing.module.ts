import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }*/
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'portal',
    loadChildren: './portal/portal.module#PortalModule'
  },
  {
    path: 'player',
    loadChildren: './player/player.module#PlayerModule'
  },
 //{ path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: '', loadChildren: './login/login.module#LoginPageModule' },
 { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forget', loadChildren: './forget/forget.module#ForgetPageModule' },  { path: 'account', loadChildren: './account/account.module#AccountPageModule' }


  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

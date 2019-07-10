import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'add-bus', loadChildren: './add-bus/add-bus.module#AddBusPageModule' },
  { path: 'add-person', loadChildren: './add-user/add-user.module#AddUserPageModule' },
  { path: 'add-bus-route', loadChildren: './add-bus-route/add-bus-route.module#AddBusRoutePageModule' },
  
  // { path: 'edit-bus/:id', loadChildren: './edit-bus/edit-bus.module#EditBusPageModule' },
  // { path: 'bus-details/:id', loadChildren: './bus-details/bus-details.module#BusDetailsPageModule' },
  // { path: 'delete-bus', loadChildren: './delete-bus/delete-bus.module#DeleteBusPageModule' },
  // { path: 'edit-user/:id', loadChildren: './edit-user/edit-user.module#EditUserPageModule' },
  // { path: 'user-details/:id', loadChildren: './user-details/user-details.module#UserDetailsPageModule' },
  // { path: 'delete-user', loadChildren: './delete-user/delete-user.module#DeleteUserPageModule' },
  // { path: 'bus-routes', loadChildren: './bus-routes/bus-routes.module#BusRoutesPageModule' },
  // { path: 'add-bus-route', loadChildren: './add-bus-route/add-bus-route.module#AddBusRoutePageModule' },
  { path: 'b', loadChildren: './menu/menu.module#MenuPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

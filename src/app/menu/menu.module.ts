import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'dashboard', loadChildren: './../dashboard/dashboard.module#DashboardPageModule' },
      { path: 'person', loadChildren: './../user/user.module#UserPageModule' },
      { path: 'bus', loadChildren: './../bus/bus.module#BusPageModule' },
      { path: 'routes', loadChildren: './../bus-routes/bus-routes.module#BusRoutesPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  pages = [
    {
      title: "Dashboard",
      url: "/b/dashboard"
    },
    {
      title: "Bus Routes",
      url: "/b/routes"
    },
    {
      title: "Buses",
      url: "/b/bus"
    },
    {
      title: "Persons",
      url: "/b/person"
    }
  ];
  selectedPath = '';
  constructor(private menu: MenuController, private router: Router) { 
    this.router.events.subscribe((event:RouterEvent)=>{
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {

  }
}
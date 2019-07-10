import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.page.html',
  styleUrls: ['./bus-details.page.scss'],
})
export class BusDetailsPage implements OnInit {
 busId : string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.busId = this.route.snapshot.paramMap.get("id");
    console.log("bus details id "+this.busId);
  }

}

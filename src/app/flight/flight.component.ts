import { Component } from '@angular/core';
import {FlightModel} from "../models/flight.model";
import {WebService} from "../web.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {JsonPipe, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [JsonPipe, HttpClientModule, RouterLink, NgIf],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent {

  public webService: WebService;
  public flight: FlightModel | null = null;

  constructor(private route: ActivatedRoute) {
    this.webService = new WebService();

    route.params.subscribe(params => {

      // Preuima variable iz putanje
      const id = params['id'];

      // Preuzima JSON objekat leta na osnovu prosledjenog ID !
      this.webService.getFlightById(id)
          .subscribe(rsp=> this.flight = rsp);

    })
  }
}


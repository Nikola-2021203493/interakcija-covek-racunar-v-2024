import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {PageModel} from "../models/page.model";
import {FlightModel} from "../models/flight.model";
import {RouterLink} from "@angular/router";
import {SafePipe} from "../safe.pipe";
import {WebService} from "../web.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports:
    [
      NgIf,
      HttpClientModule,
      NgFor,
      CommonModule,
      SafePipe,
      RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public webService : WebService;
  public flights: PageModel<FlightModel> | undefined = undefined;

  ngOnInit(): void {
    this.webService.getRecommendedFlights().subscribe(res => this.flights = res)
  }

  constructor() {
    this.webService = new WebService();
  }



  public getMapUrl(): string {
    return `https://www.google.com/maps?output=embed&q=${this.flights?.content[0].destination}`;
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString();
  }
}

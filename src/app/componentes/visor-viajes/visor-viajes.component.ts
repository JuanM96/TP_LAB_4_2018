import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor-viajes',
  templateUrl: './visor-viajes.component.html',
  styleUrls: ['./visor-viajes.component.css']
})
export class VisorViajesComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor() { }

  ngOnInit() {
  }

}

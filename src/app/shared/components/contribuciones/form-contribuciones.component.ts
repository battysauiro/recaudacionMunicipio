import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-contribuciones',
  templateUrl: './form-contribuciones.component.html',
  styleUrls: ['./form-contribuciones.component.css']
})
export class FormContribucionesComponent implements OnInit {
  tipoContribuciones=["IMPUESTOS","DERECHOS","APROVECHAMIENTO","OTROS PRODUCTOS"];
  constructor() { }

  ngOnInit(): void {
  }

}

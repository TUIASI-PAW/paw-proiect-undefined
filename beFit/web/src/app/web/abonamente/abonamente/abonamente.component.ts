import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

interface Categorie {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-abonamente',
  templateUrl: './abonamente.component.html',
  styleUrls: ['./abonamente.component.css']
})
export class AbonamenteComponent implements OnInit {
  categorii: Categorie[] = [
    {value: '0', viewValue: 'Sală de forță'},
    {value: '1', viewValue: 'Inot'},
    {value: '2', viewValue: 'Cardio'},
    {value: '3', viewValue: 'Tenis'},
  ];

  constructor(private readonly router:Router) { 
  }

  goTo(id: string) {
    this.router.navigate([`/detalii/${id}`]);
  }

  ngOnInit(): void {
  }

}

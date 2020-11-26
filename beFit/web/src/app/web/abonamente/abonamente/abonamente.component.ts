import { Component, Inject, OnInit } from '@angular/core';
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
    {value: 'steak-0', viewValue: 'Sală de forță'},
    {value: 'pizza-1', viewValue: 'Inot'},
    {value: 'tacos-2', viewValue: 'Cardio'},
    {value: 'tacos-2', viewValue: 'Tenis'},
  ];

  constructor(private readonly router:Router) { 
  }

  goTo(id: string) {
    this.router.navigate([`/detalii/${id}`]);
  }

  ngOnInit(): void {
  }

}

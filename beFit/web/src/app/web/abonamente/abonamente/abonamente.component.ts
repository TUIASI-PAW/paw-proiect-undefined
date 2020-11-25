import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-abonamente',
  templateUrl: './abonamente.component.html',
  styleUrls: ['./abonamente.component.css']
})
export class AbonamenteComponent implements OnInit {

  constructor(private readonly router:Router) { 
  }

  goTo(id: string) {
    this.router.navigate([`/detalii/${id}`]);
  }

  ngOnInit(): void {
  }

}

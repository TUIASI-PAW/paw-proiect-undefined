import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalii',
  templateUrl: './detalii.component.html',
  styleUrls: ['./detalii.component.css']
})
export class DetaliiComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

}

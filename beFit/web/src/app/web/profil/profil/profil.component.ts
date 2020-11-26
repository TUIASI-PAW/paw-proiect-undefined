import { Component, OnInit } from '@angular/core';

export interface TableData {
  name: string;
  valability: string;
}

const ELEMENT_DATA: TableData[] = [
  {name: 'Abonament 1', valability: 'dd/mm/yyyy'},
  {name: 'Abonament 2', valability: 'dd/mm/yyyy'},
  {name: 'Abonament 3', valability: 'dd/mm/yyyy'},
  {name: 'Abonament 4', valability: 'dd/mm/yyyy'},
];

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  displayedColumns: string[] = ['name', 'valability'];
  
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

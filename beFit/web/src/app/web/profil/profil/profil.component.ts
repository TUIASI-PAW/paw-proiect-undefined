import { Component, OnInit } from '@angular/core';

export interface TableData {
  name: string;
  valability: string;
  position: number;
}

const ELEMENT_DATA: TableData[] = [
  {position: 1, name: 'Abonament 1', valability: 'dd/mm/yyyy'},
  {position: 2, name: 'Abonament 2', valability: 'dd/mm/yyyy'},
  {position: 3, name: 'Abonament 3', valability: 'dd/mm/yyyy'},
  {position: 4, name: 'Abonament 4', valability: 'dd/mm/yyyy'},
];

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'valability'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

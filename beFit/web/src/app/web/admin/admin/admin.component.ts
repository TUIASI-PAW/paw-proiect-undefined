import { Component, OnInit } from '@angular/core';

export interface Abonament {
  id: number;
  title: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  abonamente:Abonament[] =[
    {
      title: "Abonament_1",
      id:1      
    },
    {
      title: "Abonament_2",
      id:2    
    },
    {
      title: "Abonament_3",
      id:3      
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

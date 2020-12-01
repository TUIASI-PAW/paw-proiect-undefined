import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

interface Categorie {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modificare',
  templateUrl: './modificare.component.html',
  styleUrls: ['./modificare.component.css']
})
export class ModificareComponent implements OnInit {

  categorii: Categorie[] = [
    {value: '0', viewValue: 'Sală de forță'},
    {value: '1', viewValue: 'Inot'},
    {value: '2', viewValue: 'Cardio'},
    {value: '3', viewValue: 'Tenis'},
    {value: '4', viewValue: 'Golf'},
    {value: '5', viewValue: 'Aerobic'},
    {value: '6', viewValue: 'Baschet'},
    {value: '7', viewValue: 'Biliard'},
    {value: '8', viewValue: 'Volei'},
    {value: '9', viewValue: 'Fotbal'},
  ];

  constructor(private _ngZone: NgZone) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
  }

  url: any;
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result?.toString();
      }
    }
  }

}

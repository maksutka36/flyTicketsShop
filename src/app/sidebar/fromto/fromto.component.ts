import { Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-fromto',
  templateUrl: './fromto.component.html',
  styleUrls: ['./fromto.component.css']
})
export class FromToComponent implements OnInit {

  fromControl = new FormControl();
  toControl= new FormControl();
  fromOptions: string[] = ['London', 'Vienna', 'Kiev', 'Prague', 'Berlin','Warsaw'];
  toOptions: string[] = ['London', 'Vienna', 'Kiev', 'Prague', 'Berlin','Warsaw'];
  fromFilteredOptions?: Observable<string[]>;
  toFilteredOptions?: Observable<string[]>;
   

  constructor(){
    
  }



  ngOnInit() {
    this.fromFilteredOptions = this.fromControl.valueChanges.pipe(
      startWith(''),
      map(value => this._fromFilter(value))
    );
    this.toFilteredOptions = this.toControl.valueChanges.pipe(
      startWith(''),
      map(value => this._toFilter(value))
    );
    }

  private _fromFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fromOptions.filter(fromoption => fromoption.toLowerCase().includes(filterValue));
  }

  private _toFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.toOptions.filter(tooption => tooption.toLowerCase().includes(filterValue));
  }


  onSwap(){
    console.log(this.fromControl.value);
    [this.fromControl, this.toControl] = [this.toControl, this.fromControl]
  }


  


}

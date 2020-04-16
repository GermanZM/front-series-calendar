import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter<string>();

  constructor() { }

  value = '';

  search = new FormControl('');

  ngOnInit() {
    this.search.valueChanges
    .subscribe(value => this.searchEmitter.emit(value));
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{

  offset: number = 0;
  searchTerm: string = "";
  constructor(private dataService: DataService){ }

  ngOnInit(): void {
    
  }
  
  search(e:Event, searchTerm: string){
    if(searchTerm !== ''){
      this.searchTerm = searchTerm
      this.dataService.searching(searchTerm);
    }
  }
}

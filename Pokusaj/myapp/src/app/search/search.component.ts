import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FruitsService } from '../fruits.service';
import { VockaVrsta } from '../models/vockavrsta';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult:undefined|VockaVrsta[]
  constructor(private activeRoute: ActivatedRoute, private fruitsService:FruitsService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.fruitsService.searchProduct(query).subscribe((result)=>{
      this.searchResult=result;
      
    })
    

  }

}

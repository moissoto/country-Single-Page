import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  public countries:Country[]=[];
  public regions: Region[] = ['Africa','Americas','Europe','Asia','Oceania']
  public selectedRegion?: Region;


    constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

    searchByRegion(region:Region){
      this.selectedRegion = region;
      this.countriesService.searchRegion(region)
      .subscribe(countries =>
      {
        this.countries = countries;
      }
      );
      console.log('Desde ByRegionPage');
      console.log(region);
    }

}

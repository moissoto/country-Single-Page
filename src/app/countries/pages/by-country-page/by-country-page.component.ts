import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{
public countries:Country[]=[];
public initialValue:string='';

  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCapital(term:string){
    this.countriesService.searchCountry(term).subscribe(countries =>
    {
      this.countries = countries;
    }
    );
    console.log('Desde ByCountryPage');
    console.log(term);
  }
}

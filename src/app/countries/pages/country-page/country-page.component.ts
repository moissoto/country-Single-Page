import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private countriesService: CountriesService,
    private activatedRoute:ActivatedRoute,
    private router:Router ){}


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.countriesService.searchCountryByAlphaCode(id)),
    )
    .subscribe(country =>{

      if(!country){
        return this.router.navigateByUrl('');
      }

      this.country = country;
      return;
    });
  }


}

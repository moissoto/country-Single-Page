import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('Destruido');
  }


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder:string='';

  @Input()
  public initialValue:string='';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncerSubscription= this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value =>{
      this.onDebounce.emit(value);
    })
  }

   emitValue(value:string):void{
      this.debouncerSubscription?.unsubscribe();
    }


    onKeyPress(searchTerm:string){
      this.debouncer.next(searchTerm);
    }
}


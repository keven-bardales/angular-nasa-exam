import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { NasaApod } from 'src/app/interfaces/nasa-images-interfaces';
import { NasaListService } from 'src/app/services/nasa-images/nasa-list.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit, OnDestroy {
  // Subscriptions
  public $unSuscribeAll = new ReplaySubject<void>();
  public $nasaImagesList = new Observable<NasaApod[]>();

  //locals
  public nasaImages: NasaApod[] = [];

  // Form
  public filterForm: FormGroup;

  constructor(private nasaService: NasaListService, private fb: FormBuilder) {
    // Dentro del constructor
    this.filterForm = this.fb.group({
      filterType: [''],
      startDate: [''],
      endDate: [''],
      count: [''],
    });
  }

  ngOnInit(): void {
    this.nasaService.nasaImagesList$.subscribe({
      next: (nasaImages) => {
        this.nasaImages = nasaImages as NasaApod[];
        console.log(this.nasaImages);
      },
    });
    this.filterForm.valueChanges
      .pipe(takeUntil(this.$unSuscribeAll))
      .subscribe((value) => {
        const filterType = value.filterType;
        if (filterType === 'dateRange') {
          const startDate = value.startDate;
          const endDate = value.endDate;
          if (startDate && endDate) {
            this.nasaService
              .getNasaImagesList({ start_date: startDate, end_date: endDate })
              .subscribe();
          }
        } else if (filterType === 'count') {
          const count = value.count;
          if (count) {
            this.nasaService.getNasaImagesList({ count }).subscribe();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.$unSuscribeAll.next();
    this.$unSuscribeAll.complete();
  }
}

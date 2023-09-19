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
    this.filterForm = this.fb.group({
      date: [''],
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
        const date = value.date;
        console.log(date);
        if (date) {
          this.nasaService.getNasaImagesList({ date }).subscribe();
        } else {
          // Puedes implementar aquí un caso por defecto si el filtro se limpia
        }
      });
  }

  ngOnDestroy(): void {
    this.$unSuscribeAll.next();
    this.$unSuscribeAll.complete();
  }
}

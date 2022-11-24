import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchsService } from 'src/app/services/searchs.service';
import { Hospital } from 'src/app/interfaces/hospital';
import { Medic } from 'src/app/interfaces/medic';
import { UserI } from '../../models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  private srch$ = new Subscription();

  users: UserI[] = [];
  medics: Medic[] = [];
  hospitals: Hospital[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchService: SearchsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.globalSearch(term);
    });
  }

  openMedic(medic: Medic) {
    this.router.navigate([`/manteinment/medicos/${medic._id}`]);
  }

  globalSearch(term: string) {
    this.srch$ = this.searchService.globalSearch(term).subscribe({
      next: (resp) => {
        this.users = resp.users;
        this.medics = resp.medics;
        this.hospitals = resp.hospitals;
      },
    });
  }

  ngOnDestroy(): void {
    this.srch$.unsubscribe();
  }
}

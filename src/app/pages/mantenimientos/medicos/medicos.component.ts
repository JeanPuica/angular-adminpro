import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medic } from 'src/app/interfaces/medic';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  med$ = new Subscription();
  img$ = new Subscription();

  medics: Medic[] = [];
  totalMedics = 0;
  loading = true;
  offset = 0;

  constructor(
    private medicService: MedicService,
    private modalImageService: ModalImageService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.loadMedics();

    this.img$ = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadMedics());
  }

  loadMedics() {
    this.loading = true;

    this.med$ = this.medicService
      .loadMedics(this.offset)
      .subscribe(({ medics, total }) => {
        this.medics = medics;
        this.totalMedics = total;
        this.loading = false;
      });
  }

  search(value: string) {
    if (value.length === 0) {
      this.loadMedics();
      return;
    }

    this.med$ = this.searchService
      .search('medics', value)
      .subscribe(({ results }) => (this.medics = results));
  }

  deleteMedic(medic: Medic) {
    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta a punto de borrar a ${medic.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.med$ = this.medicService
          .deleteMedic(medic._id)
          .subscribe(() => {
            this.loadMedics();
            Swal.fire(
              'Médico borrado',
              `${medic.name} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  openModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic._id, medic.img);
  }

  ngOnDestroy(): void {
    this.med$.unsubscribe();
    this.img$.unsubscribe();
  }
}

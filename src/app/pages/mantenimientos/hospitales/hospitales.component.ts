import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalsService } from 'src/app/services/hospitals.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/interfaces/hospital';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  private hosp$ = new Subscription();
  private img$ = new Subscription();
  hospitals: Hospital[] = [];
  totalHospitals = 0;
  offset = 0;
  loading = true;

  constructor(
    private hospitalService: HospitalsService,
    private modalImageService: ModalImageService,
    private searchServie: SearchsService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.img$ = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadHospitals());
  }

  loadHospitals() {
    this.loading = true;

    this.hosp$ = this.hospitalService
      .loadHospitals(this.offset)
      .subscribe(({ hospitals, total }) => {
        this.loading = false;
        this.hospitals = hospitals;
        this.totalHospitals = total;
      });
  }

  searchHospitals(value: string) {
    if (value.length === 0) {
      this.loadHospitals();
      return;
    }

    this.hosp$ = this.searchServie
      .search('hospitals', value)
      .subscribe(({ results }) => (this.hospitals = results));
  }

  changePage(value: number) {
    this.offset += value;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset > this.totalHospitals) {
      this.offset -= value;
    }

    this.loadHospitals();
  }

  onNameChange({ target }: any, index: number) {
    this.hospitals[index].name = target.value;
  }

  save(hospital: Hospital) {
    if (!hospital.name) return;

    this.hosp$ = this.hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe({
        next: () => {
          Swal.fire('Actualizado', hospital.name, 'success');
        },
        error: ({ error }) => {
          Swal.fire('Error', error.message, 'error');
        },
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hosp$ = this.hospitalService.deleteHospital(hospital._id).subscribe({
      next: () => {
        Swal.fire('Actualizado', hospital.name, 'success');
        this.loadHospitals();
      },
      error: ({ error }) => {
        Swal.fire('Error', error.message, 'error');
      },
    });
  }

  async openSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Nombre del Hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre';
        }

        return null;
      },
    });

    if (value && value.trim().length > 0) {
      this.hosp$ = this.hospitalService
        .createHospital(value!)
        .subscribe(({ hospital }) => {
          this.hospitals.push(hospital);
        });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img);
  }

  ngOnDestroy(): void {
    this.hosp$.unsubscribe();
    this.img$.unsubscribe();
  }
}

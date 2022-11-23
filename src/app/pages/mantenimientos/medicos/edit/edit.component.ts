import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/interfaces/hospital';
import { Medic } from 'src/app/interfaces/medic';
import { HospitalsService } from 'src/app/services/hospitals.service';
import { MedicService } from 'src/app/services/medic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medic-edit',
  templateUrl: './edit.component.html',
  styles: [],
})
export class MedicEditComponent implements OnInit, OnDestroy {
  private hosp$ = new Subscription();
  private medic$ = new Subscription();

  hospitals: Hospital[] = [];
  selectedHospital?: Hospital;
  selectedMedic?: Medic;

  medicoForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    hospital_id: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalsService,
    private medicService: MedicService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'nuevo') {
        this.loadMedic(id);
      }
    });
  }

  ngOnInit(): void {
    this.loadHospitals();

    this.medicoForm.get('hospital_id')?.valueChanges.subscribe((hospId) => {
      this.selectedHospital = this.hospitals.find((o) => o._id === hospId);
    });
  }

  loadHospitals() {
    this.hosp$ = this.hospitalService.loadHospitals().subscribe({
      next: ({ hospitals }) => {
        this.hospitals = hospitals;
      },
    });
  }

  loadMedic(id: string) {
    this.medic$ = this.medicService.getMedicById(id).pipe(delay(100)).subscribe({
      next: (resp) => {
        if (resp) {
          const { name, hospital } = resp;
          this.selectedMedic = resp;

          this.medicoForm.controls['name'].setValue(name);
          this.medicoForm.controls['hospital_id'].setValue(hospital?._id);
        } else {
          this.router.navigate(['/manteinment/medicos']);
        }
      }
    });
  }

  save() {
    if (this.selectedMedic) {
      const data = {
        ...this.medicoForm.value,
        _id: this.selectedMedic._id,
      };

      this.medicService.updateMedic(data).subscribe({
        next: () => {
          Swal.fire('Actualizado', `${data.name} actualizado correctamente`, 'success');
        }
      });
    } else {
      const formData = this.medicoForm.value;
      this.medicService.createMedic(formData).subscribe({
        next: (resp: any) => {
          Swal.fire('Creado', `${formData.name} creado correctamente`, 'success');
          this.router.navigate([`/manteinment/medicos/${resp.medic._id}`]);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.hosp$.unsubscribe();
    this.medic$.unsubscribe();
  }
}

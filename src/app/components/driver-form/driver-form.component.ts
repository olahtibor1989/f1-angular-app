import { Component } from '@angular/core';
import { Driver } from '../../_model/driver';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverService } from '../../_services/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-driver-form',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.css'
})
export class DriverFormComponent {
  form!: FormGroup;
  isEdit = false;
  driverId?: string;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      team: ['', Validators.required],
      number: ['',Validators.required],
      nationality: ['', Validators.required],
      age: ['', Validators.required],
      googleUrl: [''],
      description: ['']
    });

    this.driverId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.driverId) {
      const driver = this.driverService.getDriverById(this.driverId);
      if (driver) {
        this.isEdit = true;
        this.form.patchValue(driver);
      } else {
        alert('A pilóta nem található.');
        this.router.navigate(['/']);
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.isEdit && this.driverId) {
      const updatedDriver: Driver = { id: this.driverId, ...formValue };
      this.driverService.updateDriver(updatedDriver);
    } else {
      const newDriver: Driver = { id: uuidv4(), ...formValue };
      this.driverService.addDriver(newDriver);
    }

    this.router.navigate(['/']);
  }
}



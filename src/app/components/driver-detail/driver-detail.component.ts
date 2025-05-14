import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../_services/driver.service';
import { Driver } from '../../_model/driver';

@Component({
  selector: 'app-driver-detail',
  imports: [],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.css'
})
export class DriverDetailComponent {
  driver!: Driver;

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
   public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.driverService.getDriverById(id);
      console.log(found);
      if (!found) {
        alert('A pilóta nem található.');
        this.router.navigate(['/']);
        return;
      }
      this.driver = found;
    }
  }
}

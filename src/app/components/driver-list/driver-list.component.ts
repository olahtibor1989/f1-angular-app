import { Component, inject } from '@angular/core';
import { DriverService } from '../../_services/driver.service';
import { Router } from '@angular/router';
import { Driver } from '../../_model/driver';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-list',
  imports: [FormsModule],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css'
})
export class DriverListComponent {
  drivers: Driver[] = [];

  searchTerm: string = '';

  selectedNumber: number = 0;
  selectedNationality: string = '';

  driverService = inject(DriverService);
  router = inject(Router);

  ngOnInit(): void {
    this.driverService.loadDrivers().subscribe((drivers) => {
      this.drivers = drivers;
      console.log('Betöltött pilóták:', this.drivers);
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/edit-driver', id]);
  }

  onView(id: string) {
    this.router.navigate(['/driver', id]);
  }

  onDelete(id: string) {
    if (confirm('Biztosan törlöd ezt a pilótát?')) {
      this.driverService.deleteDriver(id);
      this.drivers = this.driverService.getAllDrivers();
    }
  }


  get filteredDrivers(): Driver[] {
      return this.drivers.filter(driver => 
        (driver.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        driver.team.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (this.selectedNumber ? driver.number === this.selectedNumber : true) &&
        (this.selectedNationality ? driver.nationality === this.selectedNationality : true)
      );
  }
}
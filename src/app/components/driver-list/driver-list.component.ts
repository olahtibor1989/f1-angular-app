import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DriverService } from '../../_services/driver.service';
import { Driver } from '../../_model/driver';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🟢 FONTOS! CommonModule kell az *ngFor-hoz
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css',
})
export class DriverListComponent {
  drivers: Driver[] = [];

  searchTerm: string = '';
  selectedNumber: number = 0;
  selectedNationality: string = '';

  constructor(private driverService: DriverService, private router: Router) {}

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
    return this.drivers.filter(
      (driver) =>
        (driver.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          driver.team.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (this.selectedNumber ? driver.number === this.selectedNumber : true) &&
        (this.selectedNationality
          ? driver.nationality === this.selectedNationality
          : true)
    );
  }

  get uniqueNationalities(): string[] {
    return [
      ...new Set(
        this.drivers.map((d) => d.nationality).filter((n): n is string => !!n)
      ),
    ];
  }
}

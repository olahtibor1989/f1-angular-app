import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-circuit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './circuit-list.component.html',
  styleUrl: './circuit-list.component.css',
})
export class CircuitListComponent {
  circuits: any[] = [];
  filteredCircuits: any[] = [];
  selectedCountry: string = '';
  countries: string[] = [];

  // 🔽 Modalhoz
  showModal: boolean = false;
  modalTitle: string = '';
  modalUrl?: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://ergast.com/api/f1/2024/circuits.json')
      .subscribe((res) => {
        this.circuits = res.MRData.CircuitTable.Circuits;
        this.filteredCircuits = this.circuits;
        this.countries = [
          ...new Set(this.circuits.map((c) => c.Location.country)),
        ];
      });
  }

  onFilterChange() {
    if (this.selectedCountry) {
      this.filteredCircuits = this.circuits.filter(
        (c) => c.Location.country === this.selectedCountry
      );
    } else {
      this.filteredCircuits = this.circuits;
    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // 🔍 Modal megnyitása
  openModal(circuit: any): void {
    this.modalTitle = circuit.circuitName;
    this.modalUrl = this.sanitizeUrl(circuit.url);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}

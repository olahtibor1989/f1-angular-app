// services/driver.service.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Driver } from '../_model/driver';
import { HttpClient } from '@angular/common/http';


const STORAGE_KEY = 'my-drivers';

@Injectable({ providedIn: 'root' })
export class DriverService {

    http = inject(HttpClient);

    private drivers: Driver[] = [];
    private readonly localStorageKey = 'drivers';
    loadInitialDrivers(): Observable<Driver[]> {
      return this.http.get<Driver[]>('drivers.json').pipe(
        tap((data: Driver[]) => this.drivers = data)
      );
    }

    loadDrivers(): Observable<Driver[]> {
    const storedDrivers = localStorage.getItem(this.localStorageKey);

    if (storedDrivers) {
        // Ha van adat a localStorage-ban, betöltjük onnan
        this.drivers = JSON.parse(storedDrivers);
        console.log('Pilóták betöltve localStorage-ból:', this.drivers);
        return new BehaviorSubject(this.drivers).asObservable();
    } else {
        // Ha nincs adat a localStorage-ban, betöltjük a JSON-ból
        return this.loadInitialDrivers().pipe(
            tap((drivers) => {
                this.drivers = drivers;
                localStorage.setItem(this.localStorageKey, JSON.stringify(this.drivers));
                console.log('Pilóták betöltve JSON-ból:', drivers);
            })
        );
    }
    }
  
    getAllDrivers(): Driver[] {
      return this.drivers;
    }
  
     getDriverById(id: string): Driver | undefined {
       return this.drivers.find(b => b.id === id);
     }


    addDriver(driver: Driver): void {
      this.drivers.push(driver);
      this.saveDrivers();
    }
  
    updateDriver(updated: Driver): void {
      const index = this.drivers.findIndex(b => b.id === updated.id);
      if (index !== -1) {
        this.drivers[index] = updated;
        this.saveDrivers();
      }
    }
  
    deleteDriver(id: string): void {
      this.drivers = this.drivers.filter(b => b.id !== id);
      this.saveDrivers();
    }

    private saveDrivers(): void {
        // Mentsük a frissített könyveket a localStorage-ba
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.drivers));
        console.log('Pilóták mentve a localStorage-ba:', this.drivers);
      }

}

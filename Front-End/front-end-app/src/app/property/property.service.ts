import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Property } from './property.interface';
import Offer from './Offer.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  getAllProperties() {
    return this.http
      .get<{ success: boolean; result: Property[] }>(
        'http://localhost:3000/api/properties'
      )
      .pipe(map((response) => response.result));
  }
  filterProperties(filterData: any) {
    return this.http
      .post<{ success: boolean; result: Property[] }>(
        'http://localhost:3000/api/properties/filter',
        filterData
      )
      .pipe(map((response) => response.result));
  }

  addProperty(property: any) {
    return this.http.post<{ success: boolean; result: Property }>(
      'http://localhost:3000/api/properties',
      property
    );
  }

  getPropertyById(prop_id: string) {
    return this.http.get<any>(
      `http://localhost:3000/api/properties/${prop_id}`
    );
  }

}

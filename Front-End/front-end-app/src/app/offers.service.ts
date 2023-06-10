import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Offer from './property/Offer.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient) {}

  getOffersByOwnerId(owner_id: string) {
    return this.http
      .get<{ success: boolean; result: any }>(
        `http://localhost:3000/api/offers/${owner_id}`
      )
      .pipe(map((response) => response.result));
  }

  getAllOffers() {
    return this.http
      .get<{ success: boolean; result: any }>(
        `http://localhost:3000/api/offers`
      )
      .pipe(map((response) => response.result));
  }

  sendOffer(offer: any) {
    return this.http.post<{ success: boolean; result: any }>(
      `http://localhost:3000/api/offers`,
      offer
    );
  }
  acceptOfferById(offer: Offer) {
    return this.http.put<{ success: boolean; result: any }>(
      `http://localhost:3000/api/offers/${offer._id}/accept`,
      offer
    );
  }
  rejectOfferById(offer: Offer) {
    return this.http.put<{ success: boolean; result: any }>(
      `http://localhost:3000/api/offers/${offer._id}/reject`,
      offer
    );
  }
  deleteOfferById(offer: Offer) {
    const params = new HttpParams().set(
      'property_id',
      offer.property_id.toString()
    );

    return this.http.delete<{ success: boolean; result: any }>(
      `http://localhost:3000/api/offers/${offer._id}`,
      { params }
    );
  }
}

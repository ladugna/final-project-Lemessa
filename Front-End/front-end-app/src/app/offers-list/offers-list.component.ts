import { Component } from '@angular/core';
import IUserState from '../IUser.interface';
import { OfferService } from '../offers.service';
import Offer from '../property/Offer.interface';
@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css'],
})
export class OffersListComponent {
  offers: any[] = [
    {
      _id: '',
      customer_id: '',
      property_id: '',
      property_status: '',
      price: 0,
      expiration_date: new Date(),
      status: '',
      description: '',
      title: '',
    },
  ];

  currentUser: IUserState = {
    _id: '',
    accessToken: '',
    email: '',
    name: '',
    role: '',
  };

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) this.currentUser = JSON.parse(user);

    this.getOffersByRole();
  }
  getOffersByRole() {
    if (this.currentUser && this.currentUser.role == 'owner') {
      this.getAllOwnerOffers();
    } else if (this.currentUser && this.currentUser.role == 'customer') {
      this.getAllCustomerOffers();
    }
  }
  getAllOwnerOffers() {
    this.offerService
      .getOffersByOwnerId(this.currentUser._id)
      .subscribe((data) => {
        console.log(data);

        if (data && data.length > 0) {
          this.offers.pop();
          for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data[x].offers.length; y++) {
              this.offers.push({
                _id: data[x].offers[y]._id,
                customer_id: data[x].offers[y].customer_id,
                property_id: data[x].offers[y].property_id,
                property_status: data[x].status,
                price: data[x].offers[y].price,
                expiration_date: data[x].offers[y].expiration_date,
                status: data[x].offers[y].status,
                description: data[x].offers[y].description,
                title: data[x].offers[y].title,
                state: data[x].address.state,
                city: data[x].address.city,
                zip: data[x].address.zip,
                street: data[x].address.street,
                originalPrice: data[x].price,
                buyerEmail: data[x].user.email,
              });
            }
          }
        } else this.offers = [];
        console.log(this.offers);
      });
  }

  getAllCustomerOffers() {
    this.offerService.getAllOffers().subscribe((data) => {
      if (data && data.length > 0) {
        this.offers.pop();
        for (let x = 0; x < data.length; x++) {
          for (let y = 0; y < data[x].offers.length; y++) {
            if (data[x].offers[y].customer_id == this.currentUser._id) {
              this.offers.push({
                _id: data[x].offers[y]._id,
                customer_id: data[x].offers[y].customer_id,
                property_id: data[x].offers[y].property_id,
                property_status: data[x].status,
                price: data[x].offers[y].price,
                expiration_date: data[x].offers[y].expiration_date,
                status: data[x].offers[y].status,
                description: data[x].offers[y].description,
                title: data[x].offers[y].title,
                state: data[x].address.state,
                city: data[x].address.city,
                zip: data[x].address.zip,
                street: data[x].address.street,
                originalPrice: data[x].price,
                buyerEmail: data[x].user.email,
              });
            }
          }
        }
      } else this.offers = [];
      console.log(this.offers);
    });
  }

  resetOffers() {
    this.offers = [
      {
        _id: '',
        customer_id: '',
        property_id: '',
        property_status: '',
        price: 0,
        expiration_date: new Date(),
        status: '',
        description: '',
        title: '',
      },
    ];
  }
  acceptOffer(offer: Offer) {
    this.offerService.acceptOfferById(offer).subscribe((data) => {
      this.resetOffers();
      this.getOffersByRole();
    });
  }

  rejectOffer(offer: Offer) {
    this.offerService.acceptOfferById(offer).subscribe((data) => {
      this.resetOffers();
      this.getOffersByRole();
    });
  }
  deleteOffer(offer: Offer) {
    this.offerService.deleteOfferById(offer).subscribe((data) => {
      this.resetOffers();
      this.getOffersByRole();
    });
  }
}

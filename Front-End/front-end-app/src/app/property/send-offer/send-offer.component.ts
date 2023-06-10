import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../property.service';
import Offer from '../Offer.interface';
import IUserState from 'src/app/IUser.interface';
import { OfferService } from 'src/app/offers.service';
@Component({
  selector: 'app-send-offer',
  templateUrl: './send-offer.component.html',
  styleUrls: ['./send-offer.component.css'],
})
export class SendOfferComponent {
  offer: Offer = {
    _id: '',
    customer_id: '',
    property_status: '',
    property_id: '',
    price: 0,
    expiration_date: new Date(),
    status: 'Pending',
    description: '',
    title: '',
  };
  currentUser: IUserState = {
    _id: '',
    accessToken: '',
    email: '',
    name: '',
    role: '',
  };
  propId: any = '';

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) this.currentUser = JSON.parse(user);
    this.propId = this.route.snapshot.paramMap.get('propertyId');
  }

  onSubmit() {
    this.offer.customer_id = this.currentUser._id;
    this.offer.status = 'Pending';
    this.offer.expiration_date = new Date();
    this.offer.property_id = this.propId;
    console.log(this.offer);

    this.offerService.sendOffer(this.offer).subscribe((data) => {
      console.log(data.result);
    });
  }
  OnCancel() {
    this.router.navigate([`properties/${this.propId}`]);
  }
}

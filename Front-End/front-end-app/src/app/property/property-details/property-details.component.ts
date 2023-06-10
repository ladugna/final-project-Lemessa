import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../property.service';
import { Property } from '../property.interface';
import IUserState from 'src/app/IUser.interface';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent {
  propertyDetails!: Property;
  propId: any = '';
  currentUser: IUserState = {
    _id: '',
    accessToken: '',
    email: '',
    name: '',
    role: '',
  };
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  imgCollection: Array<object> = [];
  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) this.currentUser = JSON.parse(user);
    this.propId = this.route.snapshot.paramMap.get('propertyId');
    console.log(this.propId);

    if (this.propId) {
      this.propertyService.getPropertyById(this.propId).subscribe((data) => {
        console.log(data.result);
        this.propertyDetails = data.result;
        this.propertyDetails.images.map((image) => {
          this.imgCollection.push({
            image: image,
            thumbImage: image,
            alt: '',
            title: '',
          });
        });
      });
    }
  }

  showPopup(): void {
    this.router.navigate([`properties/${this.propId}/sendOffer`]);
  }
}

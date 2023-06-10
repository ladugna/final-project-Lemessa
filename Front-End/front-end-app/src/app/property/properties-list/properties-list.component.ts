import { Component, inject, Input } from '@angular/core';
import { PropertyService } from '../property.service';
import { Router } from '@angular/router';
import { Property } from '../property.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css'],
})
export class PropertiesListComponent {
  @Input()
  properties: Property[] = [
    {
      _id: '',
      owner_id: '',
      description: '',
      address: {
        state: '',
        city: '',
        street: '',
        zip: '',
        longitude: '',
        latitude: '',
      },
      type: '',
      price: 0,
      number_of_bedrooms: 0,
      number_of_bathrooms: 0,
      status: '',
      user: {
        _id: '',
        email: '',
        name: '',
      },
      images: [],
      offers: [
        {
          user_id: '',
          price: 0,
          expiration_date: new Date(),
          status: '',
          description: '',
          title: '',
        },
      ],
    },
  ];
  propertyService = inject(PropertyService);
  imgCollection: Array<object> = [];

  filterForm = inject(FormBuilder).nonNullable.group({
    price: [0],
    number_of_bathrooms: [0],
    number_of_bedrooms: [0],
    // street: [''],
    city: [''],
    state: [''],
    zip: [''],
    status: [''],
    latitude: [''],
    longitude: [''],
  });
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe((data) => {
      this.properties = data;

      this.properties.map((prop) => {
        prop.images.map((image) => {
          this.imgCollection.push({
            image: image,
            thumbImage: image,
            alt: '',
            title: '',
          });
        });
      });

    });
  }

  goToPropertyDetails(propertyId: any) {
    this.router.navigate(['/properties', propertyId]);
  }

  filterProperties() {
    const filterData = {
      price: this.filterForm.value.price || 0,
      number_of_bathrooms: this.filterForm.value.number_of_bathrooms || 0,
      number_of_bedrooms: this.filterForm.value.number_of_bedrooms || 0,
      city: this.filterForm.value.city || '',
      state: this.filterForm.value.state || '',
      zip: this.filterForm.value.zip || '',
      status: this.filterForm.value.status || '',
    };
    this.propertyService.filterProperties(filterData).subscribe((data) => {
      console.log(data);
      this.properties = data;
      this.properties.map((prop) => {
        prop.images.map((image) => {
          this.imgCollection.push({
            image: image,
            thumbImage: image,
            alt: '',
            title: '',
          });
        });
      });
    });
  }
}

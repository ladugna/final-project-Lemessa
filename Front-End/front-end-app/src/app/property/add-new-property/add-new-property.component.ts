import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from '../property.service';
import { Property } from '../property.interface';
import IUserState from 'src/app/IUser.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-new-property.component.html',
  styleUrls: ['./add-new-property.component.css'],
})
export class AddPropertyComponent {
  propertyService = inject(PropertyService);
  router = inject(Router);
  currentUser!: IUserState;
  multiImages!: FileList;
  multipleImages = [];

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
  }
  propertyForm = inject(FormBuilder).nonNullable.group({
    description: ['', Validators.required],
    type: ['', Validators.required],
    price: [0, Validators.required],
    number_of_bathrooms: [0, Validators.required],
    number_of_bedrooms: [0, Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    images: [[''], Validators.required],
  });

  handleFileInput(event: Event) {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      this.multiImages = event.target.files;
    }
  }

  onSubmit() {
    const formData = new FormData();
    const newProperty: Property = {
      _id: '',
      description: this.propertyForm.value.description || '',
      owner_id: this.currentUser._id,
      address: {
        state: this.propertyForm.value.state || '',
        city: this.propertyForm.value.city || '',
        street: this.propertyForm.value.street || '',
        zip: this.propertyForm.value.zip || '',
        longitude: this.propertyForm.value.longitude || '',
        latitude: this.propertyForm.value.latitude || '',
      },
      type: this.propertyForm.value.type || '',
      price: this.propertyForm.value.price || 0,
      number_of_bedrooms: this.propertyForm.value.number_of_bedrooms || 0,
      number_of_bathrooms: this.propertyForm.value.number_of_bathrooms || 0,
      status: 'Available',
      images: this.propertyForm.value.images || [],
      user: {
        _id: this.currentUser._id || '',
        email: this.currentUser.email || '',
        name: this.currentUser.email || '',
      },
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
    };
    console.log('this.multiImages', this.multiImages);
    if (this.multiImages) {
      for (let x = 0; x < this.multiImages.length; x++) {
        formData.append('images', this.multiImages[x]);
      }
    }
    formData.append('description', newProperty.description);
    formData.append('state', newProperty.address.state);
    formData.append('city', newProperty.address.city);
    formData.append('street', newProperty.address.street);
    formData.append('zip', newProperty.address.zip);
    formData.append('email', newProperty.user.email);
    formData.append('user_id', newProperty.user._id);
    formData.append('name', newProperty.user.name);
    formData.append('owner_id', newProperty.owner_id);
    formData.append('type', newProperty.type);
    formData.append('price', newProperty.price + '');
    formData.append('number_of_bedrooms', newProperty.number_of_bedrooms + '');
    formData.append(
      'number_of_bathrooms',
      newProperty.number_of_bathrooms + ''
    );
    formData.append('status', newProperty.status);
    this.propertyService.addProperty(formData).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['properties']);
      }
    });
  }
}

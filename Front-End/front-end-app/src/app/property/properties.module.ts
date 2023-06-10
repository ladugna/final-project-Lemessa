import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-new-property/add-new-property.component';
import { PropertiesListComponent } from '../property/properties-list/properties-list.component';
import { PropertyDetailsComponent } from '../property/property-details/property-details.component';
import { SendOfferComponent } from '../property/send-offer/send-offer.component';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';

const routes: Routes = [
  { path: '', component: PropertiesListComponent },
  { path: 'addProperty', component: AddPropertyComponent },
  { path: ':propertyId', component: PropertyDetailsComponent },
  { path: ':propertyId/sendOffer', component: SendOfferComponent },
];
@NgModule({
  declarations: [
    AddPropertyComponent,
    PropertiesListComponent,
    PropertyDetailsComponent,
    SendOfferComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    RouterModule.forChild(routes),
  ],

})
export class PropertiesModule {}

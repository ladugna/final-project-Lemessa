export interface Property {
  _id: string;
  owner_id: string;
  description: string;
  address: {
    state: string;
    city: string;
    street: string;
    zip: string;
    longitude: string;
    latitude: string;
  };
  type: string;
  price: number;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  status: string;
  images: string[];
  user: {
    _id: string;
    email: string;
    name: string;
  };
  offers: [
    {
      user_id: string;
      price: Number;
      expiration_date: Date;
      status: String;
      description: String;
      title: String;
    }
  ];
}

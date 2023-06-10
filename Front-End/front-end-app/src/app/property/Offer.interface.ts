export default interface Offer {
  _id: string;
  property_id: String,
  customer_id: string;
  property_status: string;
  price: number;
  expiration_date: Date;
  status: string;
  description: string;
  title: string;
}

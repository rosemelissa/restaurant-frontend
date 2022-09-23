export default interface IBookingsData {
  booking_id: number;
  customer_id: number;
  table_id: number;
  date: string;
  time: string;
  covers: number;
  firstname: string;
  surname: string;
  email: string;
  mailing_list: boolean;
}

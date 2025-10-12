import BookingSuccess from "./BookingSuccessClient";

const BookingSuccessPage = () => {
  return <BookingSuccess />;
};

export default BookingSuccessPage;

export async function generateMetadata() {
  return {
    title: "BookingXpart | Booking Success",
    description: "Booking success page",
  };
}

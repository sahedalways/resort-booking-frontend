import BookingFailed from "./BookingFailedClient";

const page = () => {
  return (
    <>
      <BookingFailed />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "BookingXpert | Booking Failed",
    description: "Booking failed page",
  };
}

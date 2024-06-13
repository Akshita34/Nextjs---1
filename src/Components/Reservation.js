import MyDaySelector from "@/Components/MyDaySelector";
import ReservationForm from "@/Components/ReservationForm";
import { auth } from "@/lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const settings = await getSettings();
  const bookingDates = await getBookedDatesByCabinId(cabin.id);

  // const [settings, bookingDates] = await Promise.all([
  //   getSettings(),
  //   getBookedDatesByCabinId(cabin.id),
  // ]);

  const session = await auth();
  console.log(session);
  return (
    <div className="grid grid-cols-2 mt-10 border border-primary-800">
      <MyDaySelector
        settings={settings}
        bookedDates={bookingDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user.name} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;

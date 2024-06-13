import SubmitButton from "@/Components/SubmitButton";
import { updateBooking } from "@/lib/actions";
import { getBooking, getCabin } from "@/lib/data-service";

async function Page({ params }) {
  // CHANGE
  const id = params.editId;
  console.log(params.editId);
  const booking = await getBooking(params.editId);
  console.log("BOOKING");
  console.log(booking);

  const cabin = await getCabin(booking.cabinID);
  console.log(cabin);
  const reservationId = id;
  const maxCapacity = cabin.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateBooking}
      >
        <input type="hidden" value={reservationId} name="bookingId" />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

export default Page;

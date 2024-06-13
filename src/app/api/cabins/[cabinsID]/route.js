import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { cabinsID } = params;
  try {
    const cabin = await getCabin(cabinsID);
    console.log(cabin);
    const bookedDates = await getBookedDatesByCabinId(cabinsID);
    return NextResponse.json({ cabin, bookedDates });
  } catch {
    return NextResponse.json({ message: "Error in loading data", status: 500 });
  }
}

// try {
//     const cabin = await getCabin(cabinID);
//     return NextResponse.json({ test: cabin });
//   } catch {
//     NextResponse.json({ message: "Error in loading data" });
//   }

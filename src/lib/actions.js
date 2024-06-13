"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

export async function updateGuest(formData) {
  console.log("Server action"); ////To access the formData we need to give names to all the inputs and select options in form.....This function will be activated once we submit the form
  console.log(formData);

  /// we treat every data as unsafe and we need to check for authorization in server actions

  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const nationality = formData.get("nationality");
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please give correct national ID");

  const updateData = { nationalID, nationality };
  console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Please login to access the field");

  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("Please sign in to perform this action");

  console.log(formData);

  const bookingId = formData.get("bookingId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  // console.log(numGuests, observations);

  const updatedData = { numGuests, observations };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
}

export async function createBooking(bookingData, formData) {
  // console.log(formData);

  const session = await auth();
  if (!session) throw new Error("Please sign in to perform this action");

  const newBooking = {
    ...bookingData,
    guestID: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    hasBreakfast: false,
    status: "unconfirmed",
    isPaid: false,
  };

  const { data, error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  await revalidatePath(`/cabins/${bookingData.cabinID}`);
  redirect("/");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

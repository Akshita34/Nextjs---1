import Header from "@/Components/Header";

/////IMPORTING GOOGLE FONTS/////

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

console.log(josefin);

import "@/styles/globals.css";
import { ReservationProvider } from "@/Components/ReservationContext";

export const metadata = {
  title: {
    template: "%s: The Wild Oasis ",
    default: "The Wild Oasis",
  }, //name of metadata is constant to get the title of page
};

function Rootlayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} bg-primary-950 text-primary-50 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="mx-auto max-w-7xl w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default Rootlayout;

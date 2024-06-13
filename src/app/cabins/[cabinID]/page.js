import TextExpander from "@/Components/TextExpander";
import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "@/lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Reservation from "@/Components/Reservation";
import { Suspense } from "react";
import Spinner from "@/Components/Spinner";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinID);
  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinID: String(cabin.id),
  }));

  console.log(ids);
  return ids;
  // console.log(cabins);
}

export default async function Page({ params }) {
  console.log(params); // [cabinID: 1]
  const cabin = await getCabin(params.cabinID);

  // const settings = await getSettings();
  // const bookingDates = await getBookedDatesByCabinId(params.cabinID);

  ////In this case jabtak cabins nhi load hoga tab tak neeche ke 2 bache rahenge, thus blocking it. Hum aisa nhi chahte ha, hence we'll go for calling the function in different conmponents itself

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3 grid-1">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

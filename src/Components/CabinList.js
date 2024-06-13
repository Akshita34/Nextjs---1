import { getCabins } from "@/lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  console.log("Starting....");
  const cabins = await getCabins();
  console.log(cabins);

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );

  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity > 7);

  //
  return (
    <div>
      {displayedCabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displayedCabins.map((cabin) => (
            <CabinCard key={cabin.id} cabin={cabin} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CabinList;

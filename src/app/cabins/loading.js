import Spinner from "@/Components/Spinner";

export default function Page() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p>Cabins are loading</p>
    </div>
  );
}

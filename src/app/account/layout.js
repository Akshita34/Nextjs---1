import SideNavigation from "@/Components/SideNavigation";

export default function Page({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full">
      <SideNavigation />
      <div className="px-8">{children}</div>
    </div>
  );
}

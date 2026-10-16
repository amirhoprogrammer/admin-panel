import DashbordBody from "./DashbordBody";
import DashbordSidebar from "./DashbordSidebar";

export default function DashbordMain() {
  return (
    <section className="flex w-full">
      <div className="w-[20%]">
        <DashbordSidebar />
      </div>
      <div className="w-[80%]">
        <DashbordBody />
      </div>
    </section>
  );
}

import DashbordBody from "./DashbordBody";
import DashbordSidebar from "./DashbordSidebar";

export default function DashbordMain() {
  return (
    <section className="flex flex-col w-full lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <DashbordSidebar />
      </div>
      <div className="w-full lg:w-[80%]">
        <DashbordBody />
      </div>
    </section>
  );
}

import DashbordBody from "./DashbordBody";
import DashbordSidebar from "./DashbordSidebar";

export default function DashbordMain({ activeSlug }: { activeSlug: string }) {
  return (
    <section className="flex flex-col w-full h-screen lg:flex-row">
      <div className="flex w-full lg:w-[20%]">
        <DashbordSidebar activeSlug={activeSlug} />
      </div>
      <div className="w-full lg:w-[80%]">
        <DashbordBody activeSlug={activeSlug} />
      </div>
    </section>
  );
}

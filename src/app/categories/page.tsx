import CategoryList from "@/components/Category/CategoryList";
import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";

export default function page() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <DashbordHeader items={DashbordBodyItems[2]} />
      {/* 500px = 125 ,400px */}
      <div className="flex-1 min-h-0 overflow-hidden  px-6 py-4">
        <CategoryList />
      </div>
    </main>
  );
}

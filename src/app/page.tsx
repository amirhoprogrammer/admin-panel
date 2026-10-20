import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";
const page = () => {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <DashbordHeader items={DashbordBodyItems[0]} />
    </main>
  );
};

export default page;

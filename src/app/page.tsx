import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";
const page = () => {
  return (
    //<div>page</div>
    <div className="w-full">
      <DashbordHeader items={DashbordBodyItems[0]} />
    </div>
  );
};

export default page;

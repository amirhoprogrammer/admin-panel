import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";

export default function page() {
  return (
    <div>
      <DashbordHeader items={DashbordBodyItems[2]} />
    </div>
  );
}

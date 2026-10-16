import { redirect } from "next/navigation";
import Dashbord from "./(dashbord)/page";

export default function Home() {
  //redirect("/login");
  //<>
  //  <Dashbord />
  //</>
  return (
    <>
      <Dashbord />
    </>
  );
}

import DashbordHeader from '@/components/Dashbord/DashbordHeader'
import { DashbordBodyItems } from '@/data/dashbord';
import React from 'react'

export default function page() {
  return (
    <div>
      <DashbordHeader items={DashbordBodyItems[3]} />
    </div>
  );
}

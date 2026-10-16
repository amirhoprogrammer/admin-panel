import { Dashbordlayouts } from '@/data/dashbord';
import React from 'react'
import DashbordLayout from './DashbordLayout';

export default function DashbordSidebar() {
  return (
    <section className="w-[15%]">
      <div className="w90">
        <div className="border-b border-border p-4">
          <h2 className="text-xl font-semibold">آرکان مدیریت</h2>
          <p className="text-base font-normal">پنل مدیریت</p>
        </div>
        {Dashbordlayouts.map((lay,id) => (<DashbordLayout items={lay} key={id} />))}
      </div>
    </section>
  );
}

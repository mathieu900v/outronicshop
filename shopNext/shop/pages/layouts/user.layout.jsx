import React, { useState } from "react";
import TopBar from '../components/topbar.component';

export default function UserLayout({ children }) {
  return (<>
        <TopBar/>
        <div className="flex-grow">
          {children}
        </div>
  </>)
}

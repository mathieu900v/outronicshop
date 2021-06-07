import React, { useState } from "react";
import TopBar from '../components/topbar.component';
import NavBar from '../components/navbar.component';

export default function UserLayout({ children }) {
  return (<>
        <TopBar/>
        <div className="flex-grow">
          {children}
        </div>
  </>)
}

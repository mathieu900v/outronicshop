import React, { useState } from "react";
import NavBar from '../components/navbar.component';

export default function AdminLayout({ children }) {
  return (
      <div className="flex flex-row">
        <NavBar/>
        <div className="flex-grow">
          {children}
        </div>
      </div>
  )
}

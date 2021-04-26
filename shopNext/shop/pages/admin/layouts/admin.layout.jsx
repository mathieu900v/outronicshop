import React, { useState } from "react";
import NavBar from '../components/navbar.component';

export default function AdminLayout({ children }) {
  return (
      <div class="flex-col">
        <NavBar/>
        {children}
      </div>
  )
}

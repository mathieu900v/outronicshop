import React, { useState } from "react";
import Header from '../components/header.component';

export default function HomeLayout({ children }) {
  return (
      <div className="flex-row">
        <Header/>
        {children}
      </div>
  )
}

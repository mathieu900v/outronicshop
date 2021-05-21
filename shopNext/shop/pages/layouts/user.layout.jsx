import React, { useState } from "react";

export default function UserLayout({ children }) {
  return (
        <div className="flex-grow">
          {children}
        </div>
  )
}

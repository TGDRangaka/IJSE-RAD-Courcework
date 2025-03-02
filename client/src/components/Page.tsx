import React from "react";

export default function Page({ children }) {
  return (
    <div className="w-screen flex-grow min-h-screen flex flex-col items-center mt-12">
      {children}
    </div>
  );
}

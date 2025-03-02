import React from "react";

type Props = {
  children: React.ReactNode
}

export default function Page({ children }: Props) {
  return (
    <div className="w-screen flex-grow min-h-screen flex flex-col items-center mt-12">
      {children}
    </div>
  );
}

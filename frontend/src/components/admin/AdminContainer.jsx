import React from "react";

const AdminContainer = ({ children }) => {
  return (
    <main className="mb-5 flex flex-col w-full items-center gap-4">
      {children}
    </main>
  );
};

export default AdminContainer;

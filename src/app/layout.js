import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Rootlayout({ children }) {
    return (
      <html lang="en">
        <body>
          <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar ชิดซ้าย */}
            <Sidebar />
  
            {/* เนื้อหาฝั่งขวา */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Header อยู่ตรงกลาง */}
              <Header />
              <main style={{ flex: 1 }}>{children}</main>
            </div>
          </div>
        </body>
      </html>
    );
  }
  

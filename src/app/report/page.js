"use client";

import { useState } from "react";
import styles from "./report.module.css"; // ตรวจสอบว่า path ถูกต้อง

// สมมติว่านี่คือข้อมูลรายงานของคุณ (ควรดึงมาจาก API หรือ State Management)
const reportData = [
  { id: "01", name: "รายงานข้อมูลการรักษาผู้ป่วย" },
  { id: "02", name: "รายงานการนัดหมาย" },
  { id: "03", name: "รายงานผู้ป่วยเข้ารับการรักษา" },
  { id: "04", name: "รายงานผู้ป่วยเสียชีวิต" },
  { id: "05", name: "รายงานการเบิกและ/คืน" },
  { id: "06", name: "รายงานประวัติการออกรายงาน" },
  // เพิ่มข้อมูลรายงานอื่นๆ ตามต้องการ
];

// สมมติว่านี่คือข้อมูล pagination (ควรมาจาก state หรือการคำนวณ)
const paginationInfo = {
  currentPage: 1,
  totalPages: 5, // ตัวอย่างจำนวนหน้าทั้งหมด
};

export default function ReportPage() { // เปลี่ยนชื่อ Component ให้สื่อความหมายมากขึ้น (Optional)
  const [filter, setFilter] = useState("");
  // const [category, setCategory] = useState(""); // ไม่ได้ใช้ใน UI นี้
  // const [unit, setUnit] = useState("");       // ไม่ได้ใช้ใน UI นี้
  // const [storage, setStorage] = useState("");    // ไม่ได้ใช้ใน UI นี้

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    // เพิ่ม logic การกรองข้อมูล reportData ตาม filter ที่นี่
  };

  // ฟังก์ชันสำหรับจัดการการคลิกไอคอน (ตัวอย่าง)
  const handlePdfClick = (reportId) => {
    console.log(`Generate PDF for report: ${reportId}`);
    // เพิ่ม logic การสร้าง PDF
  };

  const handleExcelClick = (reportId) => {
    console.log(`Generate Excel for report: ${reportId}`);
    // เพิ่ม logic การสร้าง Excel
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนหน้า (ตัวอย่าง)
  const handlePageChange = (newPage) => {
      console.log(`Go to page: ${newPage}`);
      // เพิ่ม logic การเปลี่ยนหน้า ดึงข้อมูลใหม่ ฯลฯ
      // setPaginationInfo({...paginationInfo, currentPage: newPage}); // อัปเดต state
  }

  // กรองข้อมูล (ตัวอย่างง่ายๆ) - ควรปรับปรุงให้ซับซ้อนขึ้นตามต้องการ
  const filteredData = reportData.filter(report =>
    report.name.toLowerCase().includes(filter.toLowerCase()) ||
    report.id.includes(filter)
  );

  return (
    <div className={styles.mainContainer}> {/* อาจเปลี่ยนชื่อ class ให้สื่อถึงหน้า */}
      {/* แถบบน (Header) */}
      <div className={styles.headerBar}>
        <h1>ออกรายงาน</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            id="filter"
            className={styles.searchInput}
            value={filter}
            onChange={handleFilterChange}
            placeholder="ค้นหา..." // เปลี่ยน placeholder ให้ตรง UI
          />
          {/* เพิ่มไอคอนค้นหาที่นี่ (อาจใช้ <img>, SVG, หรือ Icon Component) */}
          <span className={styles.searchIcon}>🔍</span> {/* ตัวอย่างไอคอนค้นหา */}
        </div>
      </div>

      {/* ส่วนเนื้อหาหลัก (ตารางรายงาน) */}
      <div className={styles.reportTableContainer}>
        {/* แถบหัวข้อตาราง */}
        <div className={styles.tableHeader}>
          <div className={`${styles.headerItem} ${styles.colSequence}`}>ลำดับ</div>
          <div className={`${styles.headerItem} ${styles.colReportName}`}>รายงาน</div>
          <div className={`${styles.headerItem} ${styles.colManage}`}>จัดการ</div>
        </div>

        {/* เนื้อหาตาราง (รายการรายงาน) */}
        <div className={styles.tableBody}>
          {filteredData.length > 0 ? (
            filteredData.map((report) => (
              <div className={styles.tableRow} key={report.id}>
                <div className={`${styles.tableCell} ${styles.colSequence}`}>{report.id}</div>
                <div className={`${styles.tableCell} ${styles.colReportName}`}>{report.name}</div>
                <div className={`${styles.tableCell} ${styles.colManage}`}>
                  {/* แทนที่ด้วย Icon Components จริง */}
                  <button onClick={() => handlePdfClick(report.id)} className={styles.iconButton}>
                    {/* <PdfIcon /> หรือ */} [P] {/* ไอคอน PDF */}
                  </button>
                  <button onClick={() => handleExcelClick(report.id)} className={styles.iconButton}>
                    {/* <ExcelIcon /> หรือ */} [E] {/* ไอคอน Excel */}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>ไม่พบข้อมูลรายงาน</div>
          )}
        </div>
      </div>

      {/* ส่วน Pagination */}
      <div className={styles.paginationContainer}>
          <button
            onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
            disabled={paginationInfo.currentPage === 1}
            className={styles.pageButton}
          >
            {"<"}
          </button>
          {/* อาจจะแสดงเลขหน้าหลายหน้า หรือแค่หน้าปัจจุบัน */}
          <button className={`${styles.pageButton} ${styles.activePage}`}>
            {paginationInfo.currentPage}
          </button>
          {/* ตัวอย่าง: ถ้ามีหน้าถัดไป */}
          {paginationInfo.currentPage < paginationInfo.totalPages && (
             <button onClick={() => handlePageChange(paginationInfo.currentPage + 1)} className={styles.pageButton}>
               {paginationInfo.currentPage + 1}
             </button>
          )}
           {/* อาจมี ... ถ้ามีหน้าเยอะๆ */}
          <button
            onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
            disabled={paginationInfo.currentPage === paginationInfo.totalPages}
            className={styles.pageButton}
          >
            {">"}
          </button>
      </div>

    </div>
  );
}
"use client";

import { useState } from 'react';
import styles from './treatment.module.css';
import { FaEye, FaTrashAlt, FaTimes, FaSearch } from 'react-icons/fa'; // เพิ่ม FaTimes สำหรับปุ่มปิด Modal

const treatmentData = [
  {
    id: 1,
    hn: 'HN00001',
    name: 'นาย ภัทรดนัย เกียรตินิธิกุล',
    treatmentDate: '1/1/2025',
    treatmentType: 'ปวดท้องเฉียบพลัน',
  },
  {
    id: 2,
    hn: 'HN00001',
    name: 'นาย ภัทรดนัย เกียรตินิธิกุล',
    treatmentDate: '2/4/2025',
    treatmentType: 'ติดตามอาการ',
  },
  {
    id: 3,
    hn: 'HN00001',
    name: 'นาย ภัทรดนัย เกียรตินิธิกุล',
    treatmentDate: '6/7/2025',
    treatmentType: 'รักษาต่อเนื่อง',
  },
];

export default function Treatment() {
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);

  const openTreatmentModal = () => {
    setIsTreatmentModalOpen(true);
  };

  const closeTreatmentModal = () => {
    setIsTreatmentModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.centerTitle}>
            <h2 className={styles.headerTitle}>ข้อมูลการรักษาผู้ป่วย</h2>
          </div>
          <div className={styles.searchBox}>
            <input type="text" placeholder="ค้นหา..." />
            <FaSearch className={styles.searchIcon} />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>รหัสประจำตัว</th>
                <th>ชื่อจริง-นามสกุล</th>
                <th>วันที่เข้ารับการรักษา</th>
                <th>รูปแบบการรักษา</th>
                <th></th> {/* สำหรับปุ่ม View/Delete */}
              </tr>
            </thead>
            <tbody>
              {treatmentData.map((treatment) => (
                <tr key={treatment.id}>
                  <td>{treatment.hn}</td>
                  <td>{treatment.name}</td>
                  <td>{treatment.treatmentDate}</td>
                  <td>{treatment.treatmentType}</td>
                  <td className={styles.actions}>
                    <button className={styles.viewButton}><FaEye /></button>
                    <button className={styles.deleteButton}><FaTrashAlt /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ปุ่มเพิ่มข้อมูลการรักษาลอยมุมขวาล่าง */}
      <div className={styles.floatingButtonContainer}>
        <button className={styles.addButton} onClick={openTreatmentModal}>เพิ่มข้อมูลการรักษา</button>
      </div>

      {/* Modal เพิ่มข้อมูลการรักษา */}
      {isTreatmentModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>เพิ่มข้อมูลการรักษา</h2>
              <button className={styles.closeButton} onClick={closeTreatmentModal}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label htmlFor="patientId">กรุณากรอกรหัสประจำตัวผู้ป่วย:</label>
                <input type="text" id="patientId" placeholder="พิมพ์ HN00000" />
                <button className={styles.checkButton}>ตรวจสอบ</button>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">ชื่อ:</label>
                <input type="text" id="name" disabled />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastname">นามสกุล:</label>
                <input type="text" id="lastname" disabled />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="idCard">เลขบัตรประชาชน:</label>
                <input type="text" id="idCard" disabled />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">อายุ:</label>
                <input type="text" id="age" disabled />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">เพศ:</label>
                <input type="text" id="gender" disabled />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="bloodType">หมู่เลือด:</label>
                <input type="text" id="bloodType" disabled />
              </div>

              <h3 className={styles.modalSubTitle}>ข้อมูลการรักษา</h3>
              <div className={styles.formGroup}>
                <label htmlFor="treatmentDetail">กรุณากรอกข้อมูลการรักษา:</label>
                <textarea id="treatmentDetail" rows="5" placeholder="กรุณากรอกข้อมูลการรักษา"></textarea>
              </div>
              {/* เพิ่มฟิลด์ข้อมูลการรักษาอื่นๆ ตามต้องการ */}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={closeTreatmentModal}>ยกเลิก</button>
              <button className={styles.saveButton}>บันทึกข้อมูล</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
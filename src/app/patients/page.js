"use client";

import React, { useState } from 'react';
import styles from './patients.module.css';
import { FaEye, FaEdit, FaSearch, FaTimes } from 'react-icons/fa'; // เพิ่ม FaTimes สำหรับปุ่มปิด
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const adlItems = [
  { id: 1, name: 'การอาบน้ำ', tooltip: '0 คะแนน ต้องช่วยอาบให้\n1 คะแนน อาบน้ำเองได้' },
  { id: 2, name: 'การสวมเสื้อผ้า หวีผม แปรงฟัน โกนหนวด', tooltip: '0 คะแนน ต้องช่วยทั้งหมด\n1 คะแนน ทำเองบางส่วนได้' },
  { id: 3, name: 'การขับถ่าย', tooltip: 'รายละเอียดคะแนน' },
  { id: 4, name: 'การรับประทานอาหาร', tooltip: 'รายละเอียดคะแนน' },
  { id: 5, name: 'การใช้ห้องน้ำ', tooltip: 'รายละเอียดคะแนน' },
  { id: 6, name: 'การเคลื่อนไหว', tooltip: 'รายละเอียดคะแนน' },
  { id: 7, name: 'การลุกขึ้นยืน', tooltip: 'รายละเอียดคะแนน' },
  { id: 8, name: 'การเดินเองในบ้าน', tooltip: 'รายละเอียดคะแนน' },
  { id: 9, name: 'การลุกจากที่นอน หรือจากเตียงไปนั่งที่อื่น', tooltip: 'รายละเอียดคะแนน' },
  { id: 10, name: 'การขึ้น/ลงบันได หรือเดินในบ้าน', tooltip: 'รายละเอียดคะแนน' },
];

export default function Patients() {
  const [adlScores, setAdlScores] = useState({});
  const [activePatient, setActivePatient] = useState(null); // สำหรับ dropdown ADL
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะการเปิด/ปิด Modal

  const handleScoreChange = (id, value) => {
    setAdlScores({ ...adlScores, [id]: value });
  };

  const toggleAdlDropdown = (index) => {
    setActivePatient(index === activePatient ? null : index);
  };

  const totalScore = Object.values(adlScores).reduce((sum, val) => sum + Number(val || 0), 0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.centerTitle}>
            <h2 className={styles.headerTitle}>ข้อมูลผู้ป่วยในแผนก</h2>
          </div>
          <div className={styles.searchBox}>
            <input type="text" placeholder="ค้นหา..." />
            <FaSearch className={styles.searchIcon} />
          </div>
        </div>

        {/* Patient Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr><th>รหัสประจำตัว</th><th>ชื่อจริง-นามสกุล</th><th>อายุ</th><th>วันที่เข้ารับการรักษา</th><th>โรคประจำตัว</th><th>กิจวัตรประจำวัน</th></tr>
            </thead>
            <tbody>{[1, 2, 3].map((i, index) => (
                <React.Fragment key={i}>
                  <tr>
                    <td>HN0000{i}</td>
                    <td>นาย ภัทรดนัย เกียรตินิธิกุล</td>
                    <td>80 ปี</td><td>20 ตุลาคม 2560</td>
                    <td>สมองเสื่อม</td>
                    <td className={styles.actions}>
                      <button onClick={() => toggleAdlDropdown(index)} title="ตารางADL">{activePatient === index ? <FaChevronUp /> : <FaChevronDown />}</button>
                      <button className={styles.viewButton} title="ดูรายละเอียด"><FaEye /></button>
                      <button className={styles.editButton} title="แก้ไขข้อมูล"><FaEdit /></button>
                    </td>
                  </tr>
                  {activePatient === index && (
                    <tr><td colSpan={6}>
                      {/* ADL Table */}
                      <div className={styles.adlTableWrapper}>
                        <table className={styles.table}>
                          <thead>
                            <tr><th>หัวข้อที่</th><th>การประเมินกิจวัตรประจำวัน</th><th colSpan="4">คะแนน</th></tr>
                          </thead>
                          <tbody>{adlItems.map((item) => (
                              <tr key={item.id}>
                                <td>{adlItems.indexOf(item) + 1}</td>
                                <td className={styles.descriptionCell}>{item.name}
                                  <div className={styles.tooltipWrapper}>
                                    <span className={styles.tooltipIcon}>ⓘ</span>
                                      <div className={styles.tooltipText}>{item.tooltip}</div>
                                  </div>
                                </td>{[0, 1, 2, 3].map(score => (<td key={score}><input type="radio" name={`adl-${index}-${item.id}`} value={score} checked={adlScores[item.id] === score} onChange={() => handleScoreChange(item.id, score)} /></td>))}</tr>
                          ))}</tbody>
                        </table>
                        <div className={styles.resultRow}>
                          <span>คะแนนรวม : <strong>{totalScore}</strong></span>
                          <span>แปลผล :</span>
                        </div>
                        <div className={styles.adlButtons}>
                          <button>ยกเลิก</button>
                          <button className={styles.saveButton}>บันทึกข้อมูล</button>
                        </div>
                      </div>
                    </td></tr>
                  )}
                </React.Fragment>
            ))}</tbody>
             {/* ***** END OF CHANGES in Patient Table ***** */}
          </table>
        </div>
      </div>

      {/* ปุ่มเพิ่มรายชื่อลอยมุมขวาล่าง */}
      <div className={styles.floatingButtonContainer}>
        <button className={styles.addButton} onClick={openModal}>เพิ่มรายชื่อ</button>
      </div>

      {/* Modal เพิ่มข้อมูลผู้ป่วย */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>เพิ่มข้อมูลผู้ป่วย</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* ... Modal form groups ... */}
              <div className={styles.formGroup}>
                <label htmlFor="name">ชื่อ:</label>
                <input type="text" id="name" placeholder="ระบุชื่อ" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastname">นามสกุล:</label>
                <input type="text" id="lastname" placeholder="ระบุนามสกุล" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="idCard">เลขบัตรประชาชน:</label>
                <input type="text" id="idCard" placeholder="ระบุเลขบัตรประชาชน" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">อายุ:</label>
                <input type="number" id="age" placeholder="ระบุอายุ" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">เพศ:</label>
                <input type="text" id="gender" placeholder="ระบุเพศ" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="congenitalDisease">โรคประจำตัว:</label>
                <input type="text" id="congenitalDisease" placeholder="ระบุโรคประจำตัว" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="admissionDate">วันที่เข้ารับการรักษา:</label>
                <input type="date" id="admissionDate" />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={closeModal}>ยกเลิก</button>
              <button className={styles.saveButton}>บันทึกข้อมูล</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import React, { useState } from 'react';
// สมมติว่าคุณมี CSS module ที่เหมาะสม อาจจะต้องปรับ class name ใน CSS ด้วย
import styles from './death.module.css';
import { FaEye, FaTrashAlt, FaTimes, FaSearch, FaEdit } from 'react-icons/fa';

// Component สำหรับ Date Input (เหมือนเดิม)
const CalendarPlaceholder = ({ selectedDate, onChange }) => {
  return (
    <input
      type="date"
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      onChange={(e) => {
        // Handle potential invalid date string from input type="date"
        const dateValue = e.target.value;
        if (dateValue) {
          onChange(new Date(dateValue));
        } else {
          onChange(null); // Or handle empty date as needed
        }
      }}
      className={styles.dateInput} // ใช้ class จาก CSS module
    />
  );
};

// *** Dummy data ควรเปลี่ยนให้สอดคล้องกับข้อมูลเสียชีวิตถ้าต้องการแสดงในตาราง ***
const deathDataExample = [
  {
    id: 1,
    hn: 'HN00001',
    name: 'นาย ภัทรดนัย เกียรตินิธิกุล',
    deathDate: '15/04/2025', // ตัวอย่าง
    deathTime: '08:30',    // ตัวอย่าง
    causeOfDeath: "หัวใจล้มเหลว", // ตัวอย่าง
  },
  // ... ข้อมูลอื่นๆ ...
];


// *** เปลี่ยนชื่อ Component ***
export default function DeathInfo() {
  // *** เปลี่ยนชื่อ State ***
  const [isDeathModalOpen, setIsDeathModalOpen] = useState(false);

  // State สำหรับเก็บข้อมูลในฟอร์ม Modal
  const [patientId, setPatientId] = useState('');
  const [patientInfo, setPatientInfo] = useState({ // ข้อมูลที่จะได้หลังกด "ตรวจสอบ"
    name: '',
    lastname: '',
    idCard: '',
    age: '',
    gender: '',
    nationality: ''
  });
  // *** State ใหม่สำหรับข้อมูลการเสียชีวิต ***
  const [deathDate, setDeathDate] = useState(new Date()); // State สำหรับวันที่เสียชีวิต
  const [deathHour, setDeathHour] = useState('08');      // State สำหรับชั่วโมงที่เสียชีวิต
  const [deathMinute, setDeathMinute] = useState('30');  // State สำหรับนาทีที่เสียชีวิต
  const [deathDetails, setDeathDetails] = useState('');  // State สำหรับรายละเอียด

  // *** เปลี่ยนชื่อ Function ***
  const openDeathModal = () => {
    setIsDeathModalOpen(true);
    handleClearDeathForm(); // ล้างฟอร์มเมื่อเปิด Modal
  };

  // *** เปลี่ยนชื่อ Function ***
  const closeDeathModal = () => {
    setIsDeathModalOpen(false);
  };

  const handleCheckPatient = () => {
    // Logic การตรวจสอบ HN และดึงข้อมูลผู้ป่วย (เหมือนเดิม)
    console.log("Checking patient HN:", patientId);
    // สมมติว่าดึงข้อมูลสำเร็จ
    setPatientInfo({
      name: 'ภัทรดนัย',
      lastname: 'เกียรตินิธิกุล',
      idCard: '1234567890123',
      age: '75',
      gender: 'ชาย',
      nationality: 'ไทย'
    });
  };

  // *** เปลี่ยนชื่อ Function และ Logic การบันทึก ***
  const handleSaveDeathInfo = () => {
    const deathRecord = {
      patientId,
      ...patientInfo,
      deathDate: deathDate ? deathDate.toLocaleDateString('th-TH') : 'N/A', // Format วันที่ตามต้องการ
      deathTime: `${deathHour.padStart(2, '0')}:${deathMinute.padStart(2, '0')}`, // Format เวลา
      deathDetails
    };
    console.log("Saving death info:", deathRecord);
    // เพิ่ม Logic การส่งข้อมูลไปยัง Backend ที่นี่
    closeDeathModal(); // ปิด Modal หลังบันทึก
  };

  // *** เปลี่ยนชื่อ Function และ Logic การล้างค่า ***
  const handleClearDeathForm = () => {
    setPatientId('');
    setPatientInfo({ name: '', lastname: '', idCard: '', age: '', gender: '', nationality: '' });
    setDeathDate(new Date());
    setDeathHour('08');
    setDeathMinute('30');
    setDeathDetails('');
    console.log("Death form cleared");
  };


  return (
    <>
      <div className={styles.container}>
        {/* Header - เหมือนเดิม แต่เปลี่ยน Title */}
        <div className={styles.header}>
          <div className={styles.centerTitle}>
            {/* *** เปลี่ยน Title หลักของหน้า *** */}
            <h2 className={styles.headerTitle}>ข้อมูลการเสียชีวิต</h2>
          </div>
          <div className={styles.searchBox}>
            <input type="text" placeholder="ค้นหา..." />
            <FaSearch className={styles.searchIcon} />
          </div>
        </div>

        {/* Table - ควรปรับปรุง Header และ Data ให้สอดคล้อง */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              {/* *** ควรปรับ Header ตารางให้ตรงกับข้อมูลเสียชีวิต *** */}
              <tr>
                <th>รหัสประจำตัว</th>
                <th>ชื่อจริง-นามสกุล</th>
                <th>วันที่เสียชีวิต</th>
                <th>เวลาเสียชีวิต</th>
                <th>สาเหตุ</th>
                <td></td>
            </tr>
            </thead>
            <tbody>{deathDataExample.map((death) => ( // *** ใช้ข้อมูลตัวอย่างใหม่ ***
              <tr key={death.id}>
                <td>{death.hn}</td>
                <td>{death.name}</td>
                <td>{death.deathDate}</td>
                <td>{death.deathTime}</td>
                <td>{death.causeOfDeath}</td>
                <td className={styles.actions}>
                  <button className={styles.viewButton} title="ดูรายละเอียด"><FaEye /></button>
                  <button className={styles.editButton} title="แก้ไขข้อมูล"><FaEdit /></button>
                  <button className={styles.deleteButton} title="ลบข้อมูล"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* ปุ่มเพิ่มข้อมูล - เปลี่ยน Text */}
      <div className={styles.floatingButtonContainer}>
        {/* *** เปลี่ยนข้อความปุ่ม และ Function ที่เรียก *** */}
        <button className={styles.addButton} onClick={openDeathModal}>เพิ่มข้อมูลการเสียชีวิต</button>
      </div>

      {/* Modal เพิ่มข้อมูลการเสียชีวิต */}
      {/* *** เปลี่ยน State ที่ใช้ควบคุม *** */}
      {isDeathModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              {/* *** เปลี่ยน Title ของ Modal *** */}
              <h2 className={styles.modalTitle}>เพิ่มข้อมูลการเสียชีวิต</h2>
              {/* *** เปลี่ยน Function ที่เรียก *** */}
              <button className={styles.closeButton} onClick={closeDeathModal}>
                <FaTimes />
              </button>
            </div>

            {/* ***** START OF MODIFIED MODAL BODY ***** */}
            <div className={styles.modalBody}>
              {/* --- แถวบนสุด: HN (เหมือนเดิม) --- */}
              <div className={`${styles.formGroup} ${styles.hnInputGroup}`}>
                <label htmlFor="patientId">กรุณากรอกรหัสประจำตัวผู้ป่วย:</label>
                <input
                  type="text"
                  id="patientId"
                  placeholder="พิมพ์ HN00000"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
                <button className={styles.checkButton} onClick={handleCheckPatient}>ตรวจสอบ</button>
              </div>

              {/* --- แถวข้อมูลผู้ป่วย (Grid Layout - เหมือนเดิม) --- */}
              <div className={styles.infoGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">ชื่อ:</label>
                  <input type="text" id="name" value={patientInfo.name} disabled />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastname">นามสกุล:</label>
                  <input type="text" id="lastname" value={patientInfo.lastname} disabled />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="idCard">เลขบัตรประชาชน:</label>
                  <input type="text" id="idCard" value={patientInfo.idCard} disabled />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age">อายุ:</label>
                  <input type="text" id="age" value={patientInfo.age} disabled />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="gender">เพศ:</label>
                  <input type="text" id="gender" value={patientInfo.gender} disabled />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="nationality">สัญชาติ:</label>
                  <input type="text" id="nationality" value={patientInfo.nationality} disabled />
                </div>
              </div>

              {/* --- ส่วนข้อมูลการเสียชีวิต --- */}
              {/* จัด Layout ส่วนนี้ตามต้องการ อาจใช้ Grid หรือ Flexbox */}
              <div className={styles.deathDateTimeGrid}> {/* สมมติว่ามี class นี้ใน CSS */}
                 <div className={styles.formGroup}>
                   <label htmlFor="deathDate">วันที่เสียชีวิต:</label>
                   {/* ใช้ Component ปฏิทิน */}
                   <CalendarPlaceholder selectedDate={deathDate} onChange={setDeathDate} />
                 </div>

                 <div className={styles.formGroup}>
                   <label>เวลาที่เสียชีวิต:</label>
                   <div className={styles.timeInputs}> {/* อาจจะต้องสร้าง class นี้ใน CSS */}
                     <input
                       type="number"
                       id="deathHour"
                       min="0" max="23"
                       value={deathHour}
                       onChange={e => setDeathHour(e.target.value.padStart(2, '0'))}
                       className={styles.hourInput} // เพิ่ม class ถ้าต้องการ style แยก
                      /> :
                     <input
                       type="number"
                       id="deathMinute"
                       min="0" max="59" step="1" // step=1 สำหรับนาที
                       value={deathMinute}
                       onChange={e => setDeathMinute(e.target.value.padStart(2, '0'))}
                       className={styles.minuteInput} // เพิ่ม class ถ้าต้องการ style แยก
                      />
                   </div>
                 </div>
              </div>


              {/* --- รายละเอียดการเสียชีวิต --- */}
              <div className={styles.formGroup}>
                {/* *** เปลี่ยน Label และ State *** */}
                <label htmlFor="deathDetails">รายละเอียดการเสียชีวิต:</label>
                <textarea
                  id="deathDetails"
                  rows="6" // ปรับจำนวนแถวตาม UI
                  placeholder="กรอกรายละเอียดการเสียชีวิตเพิ่มเติม"
                  value={deathDetails}
                  onChange={(e) => setDeathDetails(e.target.value)}
                ></textarea>
              </div>

            </div>
            {/* ***** END OF MODIFIED MODAL BODY ***** */}

            {/* ***** START OF MODIFIED MODAL FOOTER ***** */}
            <div className={styles.modalFooter}>
              {/* เอาปุ่ม "ล้างค่า" ออก */}
              {/* <button className={styles.clearButton} onClick={handleClearDeathForm}>ล้างค่า</button> */}

              {/* *** เปลี่ยน Function ที่เรียก *** */}
              <button className={styles.saveButton} onClick={handleSaveDeathInfo}>บันทึกข้อมูล</button>
            </div>
            {/* ***** END OF MODIFIED MODAL FOOTER ***** */}

          </div>
        </div>
      )}
    </>
  );
}
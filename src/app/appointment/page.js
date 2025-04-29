"use client";

// เพิ่ม React เข้าไปก่อน (หากยังไม่มี)
import React, { useState } from 'react';
import styles from './appointment.module.css';
import { FaEye, FaTrashAlt, FaTimes, FaSearch } from 'react-icons/fa';

// --- Calendar Component Placeholder ---
// คุณอาจจะต้องติดตั้ง library เพิ่มเติม เช่น react-datepicker
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// หรือสร้าง component ปฏิทินของคุณเอง
const CalendarPlaceholder = ({ selectedDate, onChange }) => {
  // นี่คือตัวอย่างง่ายๆ สามารถแทนที่ด้วย component ปฏิทินจริง
  return (
    <input
      type="date"
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(new Date(e.target.value))}
      className={styles.dateInput} // เพิ่ม class สำหรับ styling ถ้าต้องการ
    />
  );
};


const treatmentData = [
  {
    id: 1,
    hn: 'HN00001',
    name: 'นาย ภัทรดนัย เกียรตินิธิกุล',
    appointmentDate: '2/4/2025',
    appointmentTime: 'ติดตามอาการ',
    hospitalName: "โรงพยาบาลเชียงราย",
    department: "x-ray"
  },
  // ... ข้อมูลอื่นๆ ...
];

export default function Treatment() {
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  // State สำหรับเก็บข้อมูลในฟอร์ม Modal
  const [patientId, setPatientId] = useState('');
  const [patientInfo, setPatientInfo] = useState({ // ข้อมูลที่จะได้หลังกด "ตรวจสอบ"
    name: '',
    lastname: '',
    idCard: '',
    age: '',
    gender: '',
    nationality: '' // เพิ่มสัญชาติ
  });
  const [appointmentDate, setAppointmentDate] = useState(new Date()); // State สำหรับวันที่
  const [apptHourStart, setApptHourStart] = useState('08');
  const [apptMinStart, setApptMinStart] = useState('30');
  const [apptHourEnd, setApptHourEnd] = useState('10');
  const [apptMinEnd, setApptMinEnd] = useState('30');
  const [hospitalName, setHospitalName] = useState('');
  const [department, setDepartment] = useState('');
  const [physicianName, setPhysicianName] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [remarks, setRemarks] = useState('');


  const openTreatmentModal = () => {
    setIsTreatmentModalOpen(true);
    // อาจจะ reset ค่า form ที่นี่ถ้าต้องการ
    handleClearForm();
  };

  const closeTreatmentModal = () => {
    setIsTreatmentModalOpen(false);
  };

  const handleCheckPatient = () => {
    // Logic การตรวจสอบ HN และดึงข้อมูลผู้ป่วย
    console.log("Checking patient HN:", patientId);
    // สมมติว่าดึงข้อมูลสำเร็จ
    setPatientInfo({
       name: 'ภัทรดนัย', // ตัวอย่าง
       lastname: 'เกียรตินิธิกุล', // ตัวอย่าง
       idCard: '1234567890123', // ตัวอย่าง
       age: '30', // ตัวอย่าง
       gender: 'ชาย', // ตัวอย่าง
       nationality: 'ไทย' // ตัวอย่าง
    });
  };

  const handleSaveAppointment = () => {
      // Logic การบันทึกข้อมูลการนัดหมาย
      const appointmentData = {
          patientId,
          ...patientInfo,
          appointmentDate: appointmentDate.toLocaleDateString('th-TH'), // หรือ format ที่ต้องการ
          timeStart: `${apptHourStart}:${apptMinStart}`,
          timeEnd: `${apptHourEnd}:${apptMinEnd}`,
          hospitalName,
          department,
          physicianName,
          appointmentType,
          remarks
      };
      console.log("Saving appointment:", appointmentData);
      closeTreatmentModal(); // ปิด Modal หลังบันทึก
  };

   const handleClearForm = () => {
      // Logic การล้างค่าฟอร์ม
      setPatientId('');
      setPatientInfo({ name: '', lastname: '', idCard: '', age: '', gender: '', nationality: '' });
      setAppointmentDate(new Date());
      setApptHourStart('08');
      setApptMinStart('30');
      setApptHourEnd('10');
      setApptMinEnd('30');
      setHospitalName('');
      setDepartment('');
      setPhysicianName('');
      setAppointmentType('');
      setRemarks('');
      console.log("Form cleared");
  };


  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.centerTitle}>
            <h2 className={styles.headerTitle}>ข้อมูลการนัดหมาย</h2>
          </div>
          <div className={styles.searchBox}>
            <input type="text" placeholder="ค้นหา..." />
            <FaSearch className={styles.searchIcon} />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            {/* Removed extra whitespace within thead and tr */}
            <thead>
              <tr><th>รหัสประจำตัว</th><th>ชื่อจริง-นามสกุล</th><th>วันที่นัดหมาย</th><th>เวลานัดหมาย</th><th>สถานพยาบาล</th><th>แผนก</th><th></th></tr>
            </thead>
            {/* Removed extra whitespace within tbody, tr, and between td elements */}
            <tbody>{treatmentData.map((treatment) => (
                <tr key={treatment.id}><td>{treatment.hn}</td><td>{treatment.name}</td><td>{treatment.appointmentDate}</td><td>{treatment.appointmentTime}</td><td>{treatment.hospitalName}</td><td>{treatment.department}</td><td className={styles.actions}><button className={styles.viewButton}><FaEye /></button><button className={styles.deleteButton}><FaTrashAlt /></button></td></tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* ปุ่มเพิ่มข้อมูลการนัดหมายลอยมุมขวาล่าง */}
      <div className={styles.floatingButtonContainer}>
        <button className={styles.addButton} onClick={openTreatmentModal}>เพิ่มข้อมูลการนัดหมาย</button>
      </div>

      {/* Modal เพิ่มข้อมูลการนัดหมาย */}
      {isTreatmentModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>เพิ่มข้อมูลการนัดหมาย</h2>
              <button className={styles.closeButton} onClick={closeTreatmentModal}>
                <FaTimes />
              </button>
            </div>

            {/* ***** START OF MODAL BODY CHANGES ***** */}
            <div className={styles.modalBody}>
              {/* --- แถวบนสุด: HN --- */}
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

              {/* --- แถวข้อมูลผู้ป่วย (Grid Layout) --- */}
              <div className={styles.infoGrid}> {/* ใช้ CSS Grid หรือ Flexbox */}
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
                  <label htmlFor="nationality">สัญชาติ:</label> {/* เพิ่มใหม่ */}
                  <input type="text" id="nationality" value={patientInfo.nationality} disabled />
                </div>
              </div>

              {/* --- ส่วนรายละเอียดการนัดหมาย (Grid Layout) --- */}
              <div className={styles.appointmentDetailsGrid}> {/* ใช้ CSS Grid หรือ Flexbox */}
                 {/* --- ด้านซ้าย: ปฏิทิน --- */}
                 <div className={styles.calendarSection}>
                    <label>เลือกวันที่นัดหมาย:</label>
                    {/* ใส่ Component ปฏิทินจริงที่นี่ */}
                    <CalendarPlaceholder selectedDate={appointmentDate} onChange={setAppointmentDate} />
                 </div>

                 {/* --- ด้านขวา: เวลา, สถานพยาบาล, แผนก etc. --- */}
                 <div className={styles.detailsSection}>
                    {/* เวลานัดหมาย */}
                    <div className={styles.formGroup}>
                        <label>เวลานัดหมาย:</label>
                        <div className={styles.timeInputs}>
                           <input type="number" id="apptHourStart" min="0" max="23" value={apptHourStart} onChange={e => setApptHourStart(e.target.value.padStart(2, '0'))} /> :
                           <input type="number" id="apptMinStart" min="0" max="59" step="5" value={apptMinStart} onChange={e => setApptMinStart(e.target.value.padStart(2, '0'))} />
                           <span>&nbsp;ถึง&nbsp;</span>
                           <input type="number" id="apptHourEnd" min="0" max="23" value={apptHourEnd} onChange={e => setApptHourEnd(e.target.value.padStart(2, '0'))} /> :
                           <input type="number" id="apptMinEnd" min="0" max="59" step="5" value={apptMinEnd} onChange={e => setApptMinEnd(e.target.value.padStart(2, '0'))} />
                        </div>
                    </div>
                     {/* สถานพยาบาล */}
                    <div className={styles.formGroup}>
                        <label htmlFor="hospitalName">สถานพยาบาล:</label>
                        <input
                            type="text"
                            id="hospitalName"
                            placeholder="กรอกชื่อสถานพยาบาล"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                         />
                    </div>
                    {/* แผนก */}
                    <div className={styles.formGroup}>
                        <label htmlFor="department">แผนก:</label>
                        <input
                            type="text"
                            id="department"
                            placeholder="กรอกชื่อแผนก"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                         />
                    </div>
                    {/* ชื่อแพทย์ผู้ดูแล */}
                    <div className={styles.formGroup}>
                        <label htmlFor="physicianName">ชื่อแพทย์ผู้ดูแล:</label>
                        <input
                             type="text"
                             id="physicianName"
                             placeholder="กรอกชื่อแพทย์"
                             value={physicianName}
                             onChange={(e) => setPhysicianName(e.target.value)}
                         />
                    </div>
                    {/* ประเภทการนัดหมาย */}
                     <div className={styles.formGroup}>
                        <label htmlFor="appointmentType">ประเภทการนัดหมาย:</label>
                        <input
                            type="text"
                            id="appointmentType"
                            placeholder="เช่น ติดตามอาการ, ตรวจสุขภาพ"
                            value={appointmentType}
                            onChange={(e) => setAppointmentType(e.target.value)}
                         />
                    </div>
                 </div>
              </div>

              {/* --- หมายเหตุ --- */}
               <div className={styles.formGroup}>
                  <label htmlFor="remarks">หมายเหตุ:</label>
                  <textarea
                      id="remarks"
                      rows="4" // ลดขนาดลงหน่อยตาม UI
                      placeholder="กรอกข้อมูลเพิ่มเติม"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>
                </div>

            </div>
             {/* ***** END OF MODAL BODY CHANGES ***** */}

            {/* ***** START OF MODAL FOOTER CHANGES ***** */}
            <div className={styles.modalFooter}>
              {/* เปลี่ยน Cancel เป็น ล้างค่า */}
              <button className={styles.clearButton} onClick={handleClearForm}>ล้างค่า</button>
              {/* ปุ่มบันทึก */}
              <button className={styles.saveButton} onClick={handleSaveAppointment}>บันทึกข้อมูล</button>
            </div>
             {/* ***** END OF MODAL FOOTER CHANGES ***** */}

          </div>
        </div>
      )}
    </>
  );
}
"use client";

import React, { useState } from 'react';
import styles from './treatment.module.css';
import { FaEye, FaTrashAlt, FaTimes, FaSearch, FaEdit} from 'react-icons/fa';

// --- Sample Data (Keep or replace with actual data fetching) ---
const treatmentData = [
  { id: 1, hn: 'HN00001', name: 'นาย ภัทรดนัย เกียรตินิธิกุล', treatmentDate: '1/1/2025', treatmentType: 'ปวดท้องเฉียบพลัน' },
  { id: 2, hn: 'HN00001', name: 'นาย ภัทรดนัย เกียรตินิธิกุล', treatmentDate: '2/4/2025', treatmentType: 'ติดตามอาการ' },
  { id: 3, hn: 'HN00001', name: 'นาย ภัทรดนัย เกียรตินิธิกุล', treatmentDate: '6/7/2025', treatmentType: 'รักษาต่อเนื่อง' },
];

// --- Treatment Type Options ---
const treatmentTypeOptions = [
    { id: 'refer', label: 'นำส่งต่อเมื่อ' }, // อาจจะต้องแก้ value ตามความหมายจริง
    { id: 'repeat', label: 'รักษาเรื่องเดิม' },
    { id: 'follow-up', label: 'ติดตามอาการ' },
    { id: 'single-treatment', label: 'รักษาครั้งเดียว' },
    { id: 'single-screening', label: 'คัดกรองครั้งเดียว' },
];


export default function Treatment() {
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);

  // --- State for Modal Form ---
  const [patientId, setPatientId] = useState('');
  const [patientInfo, setPatientInfo] = useState({
      name: '',
      lastname: '',
      idCard: '',
      age: '',
      gender: '',
      nationality: '' // Changed from bloodType to nationality based on UI
  });
  const [selectedTreatmentType, setSelectedTreatmentType] = useState(''); // State for radio buttons
  const [treatmentDetail, setTreatmentDetail] = useState(''); // State for textarea


  const openTreatmentModal = () => {
    setIsTreatmentModalOpen(true);
    // Optional: Reset form on open
    handleClearForm();
  };

  const closeTreatmentModal = () => {
    setIsTreatmentModalOpen(false);
  };

  const handleCheckPatient = () => {
    // --- Mock Patient Data Fetching ---
    console.log("Checking patient:", patientId);
     if (patientId === 'HN00001') { // Example check
        setPatientInfo({
            name: 'ภัทรดนัย',
            lastname: 'เกียรตินิธิกุล',
            idCard: '1234567890123', // Example
            age: '35',             // Example
            gender: 'ชาย',         // Example
            nationality: 'ไทย'      // Example
        });
     } else {
         // Clear info if patient not found or handle error
         setPatientInfo({ name: '', lastname: '', idCard: '', age: '', gender: '', nationality: ''});
         alert('ไม่พบข้อมูลผู้ป่วย');
     }
  };

  const handleSaveTreatment = () => {
      // --- Logic to Save Treatment Data ---
      if (!selectedTreatmentType) {
          alert('กรุณาเลือกรูปแบบการรักษา');
          return;
      }
      const formData = {
          patientId,
          ...patientInfo,
          treatmentType: selectedTreatmentType,
          treatmentDetail
      };
      console.log("Saving treatment data:", formData);
      // Add API call logic here...
      closeTreatmentModal(); // Close modal after save attempt
  };

  const handleClearForm = () => {
      // --- Logic to Clear Form ---
      setPatientId('');
      setPatientInfo({ name: '', lastname: '', idCard: '', age: '', gender: '', nationality: '' });
      setSelectedTreatmentType('');
      setTreatmentDetail('');
      console.log("Form Cleared");
  };


  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
            <h2 className={styles.headerTitle}>ข้อมูลการรักษาผู้ป่วย</h2>
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
                <td></td> {/* Actions */}
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
                    <button className={styles.viewButton} title="ดูรายละเอียด"><FaEye /></button>
                    <button className={styles.editButton} title="แก้ไขข้อมูล"><FaEdit /></button>
                    <button className={styles.deleteButton} title="ลบข้อมูล"><FaTrashAlt /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Add Button */}
      <div className={styles.floatingButtonContainer}>
        <button className={styles.addButton} onClick={openTreatmentModal}>เพิ่มข้อมูลการรักษา</button>
      </div>

      {/* Treatment Modal */}
      {isTreatmentModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>เพิ่มข้อมูลการรักษา</h2>
              <button className={styles.closeButton} onClick={closeTreatmentModal} title="ปิด">
                <FaTimes />
              </button>
            </div>

            {/* ================== MODAL BODY START ================== */}
            <div className={styles.modalBody}>

              {/* --- HN Input Group --- */}
              <div className={styles.hnInputGroup}>
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

              {/* --- Patient Info Grid --- */}
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
                        {/* Changed from Blood Type to Nationality */}
                        <label htmlFor="nationality">สัญชาติ:</label>
                        <input type="text" id="nationality" value={patientInfo.nationality} disabled />
                    </div>
               </div>

               {/* --- Treatment Type Radio Buttons --- */}
               <div className={styles.treatmentTypeOptions}>
                 {/* Optional: Add an overall label if needed */}
                 {/* <label className={styles.radioGroupLabel}>รูปแบบการรักษา:</label> */}
                 <div className={styles.radioGroup}>
                    {treatmentTypeOptions.map(option => (
                        <div className={styles.radioOption} key={option.id}>
                            <input
                                type="radio"
                                id={`type-${option.id}`}
                                name="treatmentType" // Same name groups them
                                value={option.id} // Use a unique value
                                checked={selectedTreatmentType === option.id}
                                onChange={(e) => setSelectedTreatmentType(e.target.value)}
                            />
                            <label htmlFor={`type-${option.id}`}>{option.label}</label>
                        </div>
                    ))}
                 </div>
               </div>


              {/* --- Treatment Details Section --- */}
              <h3 className={styles.modalSubTitle}>ข้อมูลการรักษา</h3>
              <div className={styles.formGroup}>
                {/* Label is now part of the h3, so maybe remove this label */}
                {/* <label htmlFor="treatmentDetail">กรุณากรอกข้อมูลการรักษา:</label> */}
                <textarea
                    id="treatmentDetail"
                    rows="6" // Adjust rows as needed
                    placeholder="กรุณากรอกข้อมูลการรักษา"
                    value={treatmentDetail}
                    onChange={(e) => setTreatmentDetail(e.target.value)}
                ></textarea>
              </div>

            </div>
            {/* ================== MODAL BODY END ================== */}

            {/* ================== MODAL FOOTER START ================ */}
            <div className={styles.modalFooter}>
              {/* Changed Cancel button text to "ล้างค่า" */}
              <button className={styles.clearButton} onClick={handleClearForm}>ล้างค่า</button>
              <button className={styles.saveButton} onClick={handleSaveTreatment}>บันทึกข้อมูล</button>
            </div>
            {/* ================== MODAL FOOTER END ================== */}

          </div>
        </div>
      )}
    </>
  );
}
import styles from './Patients.module.css';
import { FaEye, FaEdit, FaSearch } from 'react-icons/fa';

export default function Patients() {
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

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>รหัสประจำตัว</th>
                <th>ชื่อจริง-นามสกุล</th>
                <th>อายุ</th>
                <th>วันที่เข้ารับการรักษา</th>
                <th>โรคประจำตัว</th>
                <th>กิจวัตรประจำวัน</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td>HN00001</td>
                  <td>นาย ภัทรดนัย เกียรตินิธิกุล</td>
                  <td>80 ปี</td>
                  <td>20 ตุลาคม 2560</td>
                  <td>สมองเสื่อม</td>
                  <td className={styles.actions}>
                    <select>
                      <option>▼</option>
                    </select>
                    <button><FaEye /></button>
                    <button><FaEdit /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ปุ่มเพิ่มรายชื่อลอยมุมขวาล่าง */}
      <div className={styles.floatingButtonContainer}>
        <button className={styles.addButton}>เพิ่มรายชื่อ</button>
      </div>
    </>
  );
}

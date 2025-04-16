import styles from './Header.module.css';

export default function Header(){
    return(
        <header className={styles.header}> 
            <h1 className={styles.headerTitle}>ชีวาภิบาล</h1> 
        </header>
    )
}
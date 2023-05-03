import styles from './MainPage.module.css';
import FoodForm from '../components/FoodForm';

const MainPage = () => {
  return (
    <main className={styles.mainPage}>
      <FoodForm />
    </main>
  );
};

export default MainPage;

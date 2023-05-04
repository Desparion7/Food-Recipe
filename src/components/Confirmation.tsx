import styles from './Confirmation.module.css';
import { FormValues } from '../interface/form-interface';

interface PropsType {
  data: FormValues;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Confirmation = ({ data, setSuccess }: PropsType) => {
  return (
    <div className={styles.recipe}>
      <h3>Recipe successfully added.</h3>
      <div>
        <p>
          Name: <span>{data.name}</span>
        </p>
        <p>
          Type: <span>{data.type}</span>
        </p>

        <p>
          Preparation time: <span>{data.preparation_time}</span>
        </p>
        {data.no_of_slices && (
          <p>
            Number of slices: <span>{data.no_of_slices}</span>
          </p>
        )}
        {data.diameter && (
          <p>
            Diameter: <span>{data.diameter}cm</span>
          </p>
        )}
        {data.slices_of_bread && (
          <p>
            Slices of bread: <span>{data.slices_of_bread}</span>
          </p>
        )}
        {data.spiciness_scale && (
          <p>
            Spiciness scale from (1-10): <span>{data.spiciness_scale}</span>
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setSuccess(false);
        }}
      >
        Add more
      </button>
    </div>
  );
};

export default Confirmation;

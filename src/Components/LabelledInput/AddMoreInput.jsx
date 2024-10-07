import React, { useEffect, useState } from 'react';
import classes from './LabelledInput.module.css';

const AddMoreInput = (props) => {
  const { data, minCount, maxCount, errors, register, unregister } = props;
  const [count, setCount] = useState(0);

  // Initialize array to create input fields
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push('');
  }

  // Set initial count based on minCount
  useEffect(() => {
    setCount(minCount);
  }, [minCount]);

  // Add a new field
  const addField = () => {
    setCount((prev) => prev + 1);
  };

  // Remove a field and unregister it from react-hook-form
  const removeField = (index) => {
    unregister(`${data.id}.${index}`); // Unregister from react-hook-form
    setCount((prev) => prev - 1); // Decrease the count
  };

  // Function to handle error messages
  const errorMsg = (id) => {
    if (!id?.includes('.')) {
      return errors[id]?.message;
    }
    const newArr = id?.split('.');
    let [a, b] = newArr;
    return errors[a] ? errors[a][b]?.message : '';
  };
  const errMsg = errors && errorMsg(data.id);

  return (
    <div className={`${classes.input_div} ${props.cls}`}>
      {data.label && <label htmlFor={data.id}>{data.label}</label>}

      {/* Create input fields dynamically */}
      {arr.map((_, index) => (
        <input
          {...register(`${data.id}.${index}`)}
          min={props?.new_d}
          className={classes.add_more_input}
          type={data.type || 'text'}
          id={data.id + index}
          placeholder={data.ph}
        />
      ))}

      {errMsg && <p className={classes.errors}>{errMsg}</p>}

      {/* Buttons to add/remove fields */}
      <div className={`${classes.bottom_btns} ${props.cls2}`}>
        {count > minCount && (
          <button
            className={classes.remove_btn}
            onClick={() => removeField(count - 1)}
            type="button"
          >
            Remove
          </button>
        )}
        {count < maxCount && (
          <button className={classes.add_btn} onClick={addField} type="button">
            {props?.name || 'Add more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddMoreInput;

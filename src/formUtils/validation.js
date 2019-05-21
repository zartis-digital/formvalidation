import React from 'react';

const evalFns = {
  required:
    txt => (!txt || txt.length === 0) && 'This field is required',
  email:
    txt => {
      const re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
      if (!txt || txt.length === 0) {
        return false;
      }
      return !re.test(String(txt).toLowerCase()) && 'This field must be an e-mail address';
    }
};

const useValidation = (validation, initialState = {}, cb) => {
  const [data, setData] = React.useState(initialState);
  const [touched, setTouched] = React.useState([]);
  const [canSubmit, setCanSubmit] = React.useState();
  const [errors, setErrors] = React.useState({});

  const validate = React.useCallback(
    () => Object.entries(validation)
      .reduce(
        (acc, cur) => {
          const [key, value] = cur;
          if (!touched.includes(key)) {
            return acc;
          }
          try {
            value
            .split(" ")
            .forEach(
              valItem => {
                const result = evalFns[valItem](data[key]);
                if (result) throw result;
              }
            );
          } catch (error) {
            acc[key] = error;
          }
          return acc;
        }, {}
    ), [validation, touched, data]
  );

  React.useEffect(
    () => {
      setCanSubmit(Object.keys(errors).length === 0);
    }, [errors]
  );

  React.useEffect(
    () => {
      setErrors(validate());
    }, [data, validate]
  );

  const clearFields = () => {
    setData(initialState);
  };

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = e => {
    const { name } = e.target;
    if (touched.includes(name)) {
      return;
    }
    setTouched([
      ...touched,
      name,
    ]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    cb(data);
  };

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    clearFields,
    canSubmit,
    handleBlur,
  };
};

export default useValidation;

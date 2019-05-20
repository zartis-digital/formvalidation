/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';

const evalFns = {
  required:
    txt => (!txt || txt.length === 0) && 'This field is required',
  email:
    txt => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(String(txt).toLowerCase()) && 'This field must be an e-mail address';
    }
}

const useValidation = (validation, initialState = {}) => {
  const [data, setData] = React.useState(initialState)
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
console.log(data)
  React.useEffect(() => {
    if (!isSubmitting) return;
    setErrors(
      Object.entries(validation).reduce(
        (acc, cur) => {
          const [key, value] = cur;
          try {
            const evaluatedArr = value
            .split(" ")
            .forEach(
              valItem => {
                const result = evalFns[valItem](data[key]);
                if (result) throw result;
              }
            )
          } catch (error) {
            acc[key] = error
          }
          return acc;
        }, {}
      )
    )
  }, [data, isSubmitting])

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleFocus = () => {

  }
  const handleBlur = () => {}

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
  }

  const clearFields = () => {
    setData(initialState);
    setIsSubmitting(false);
  }

  return {
    data,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    clearFields,
    handleFocus
  }
}

export default useValidation;
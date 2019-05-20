/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';

const evalFns = {
  required:
    txt => (!txt || txt.length === 0) && 'This field is required',
  email:
    txt => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!txt || txt.length === 0) return false;
      return !re.test(String(txt).toLowerCase()) && 'This field must be an e-mail address';
    }
}

const useValidation = (validation, initialState = {}, cb) => {
  const [data, setData] = React.useState(initialState)
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const validate = () => Object.entries(validation).reduce(
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

  React.useEffect(() => {
    if (isSubmitting) {
      setErrors(validate());
    }
  }, [data])

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        cb(data);
        setData(initialState);
      }
      setIsSubmitting(false);
    }
  }, [errors])

  const clearFields = () => {
    setData(initialState);
    setIsSubmitting(false);
  }

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  }

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    clearFields,
  }
}

export default useValidation;
import React from 'react';

const FormRow = ({ label, children }) => (
  <div className="form-row">
    <label>{label}</label>
    {children}
  </div>
);

export default FormRow;

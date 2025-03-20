import { InputHTMLAttributes } from "react";

interface FormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormGroup = ({ label, error, id, ...inputProps }: FormGroupProps) => {
  return (
    <div className="form__group">
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className={`form__input ${error ? "form__input--error" : ""}`}
      />
      {error && <span className="form__error">{error}</span>}
    </div>
  );
};

export default FormGroup;

import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../ui/FormGroup";
import { userSignup } from "../../api/auth";
import User from "../../contexts/UserContext";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const { setUserInfo } = User();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Password confirmation validation
    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "Please confirm your password";
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("passwordConfirm", formData.passwordConfirm);

      const user = await userSignup(formDataToSend);
      if (user) {
        setUserInfo(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
      <FormGroup
        label="Full Name"
        type="text"
        id="name"
        name="name"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <FormGroup
        label="Email address"
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <FormGroup
        label="Password"
        type="password"
        id="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        minLength={8}
      />
      <FormGroup
        label="Confirm Password"
        type="password"
        id="passwordConfirm"
        name="passwordConfirm"
        placeholder="••••••••"
        value={formData.passwordConfirm}
        onChange={handleChange}
        error={errors.passwordConfirm}
        required
        minLength={8}
      />
      <div className="form__group">
        <button type="submit" className="btn btn--green" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </div>
      <div className="form__group">
        <p className="form__text">
          Already have an account?{" "}
          <Link to="/" className="btn-text">
            Log in now
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;

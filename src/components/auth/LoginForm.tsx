import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../ui/FormGroup";
import { userLogin } from "../../api/auth";
import User from "../../contexts/userContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUserInfo } = User();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const user = await userLogin(formData.email, formData.password);
      if (user) {
        setUserInfo(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
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
      <div className="form__group">
        <button type="submit" className="btn btn--green" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
      <div className="form__group">
        <p className="form__text">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="btn-text">
            Sign up now
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

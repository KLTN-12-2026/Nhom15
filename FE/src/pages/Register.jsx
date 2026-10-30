
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    birthday: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    const patients = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );

    const email = form.email.trim().toLowerCase();

    const existingPatient = patients.find(
      (patient) => patient.email === email
    );

    if (existingPatient) {
      setMessage("Email này đã được đăng ký!");
      return;
    }

    const newPatient = {
      fullName: form.fullName.trim(),
      birthday: form.birthday,
      gender: form.gender,
      phone: form.phone.trim(),
      email: email,
      password: form.password
    };

    patients.push(newPatient);

    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );

    alert("Đăng ký tài khoản thành công!");

    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box register-box">

        <div className="auth-logo">
          <h1>✚ MEDICARE</h1>
          <p>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</p>
        </div>

        <h2>Đăng ký tài khoản bệnh nhân</h2>

        <p className="auth-description">
          Vui lòng cung cấp thông tin để tạo tài khoản.
        </p>

        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày sinh</label>
              <input
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Giới tính</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10,11}"
              title="Số điện thoại gồm 10 hoặc 11 chữ số"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập địa chỉ email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {message && (
            <p className="error-message">{message}</p>
          )}

          <button type="submit" className="auth-button">
            Tạo tài khoản
          </button>

        </form>

        <p className="auth-switch">
          Bạn đã có tài khoản?
          {" "}
          <Link to="/login">Đăng nhập</Link>
        </p>

        <Link to="/" className="back-home">
          ← Quay lại trang chủ
        </Link>

      </div>
    </div>
  );
}

export default Register;

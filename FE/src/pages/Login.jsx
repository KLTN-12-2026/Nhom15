
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Lấy danh sách tài khoản đã đăng ký
    const patients = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );

    // Kiểm tra tài khoản
    const patient = patients.find(
      (item) =>
        item.email === email.trim().toLowerCase() &&
        item.password === password
    );

    if (patient) {
      localStorage.setItem(
        "currentPatient",
        JSON.stringify({
          fullName: patient.fullName,
          email: patient.email
        })
      );

      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      setMessage("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <div className="auth-logo">
          <h1>✚ MEDICARE</h1>
          <p>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</p>
        </div>

        <h2>Đăng nhập bệnh nhân</h2>

        <p className="auth-description">
          Chào mừng bạn quay trở lại với Medicare!
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <p className="error-message">{message}</p>
          )}

          <div className="forgot-password">
            <a href="#forgot">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="auth-button">
            Đăng nhập
          </button>

        </form>

        <p className="auth-switch">
          Bạn chưa có tài khoản?
          {" "}
          <Link to="/register">Đăng ký ngay</Link>
        </p>

        <Link to="/" className="back-home">
          ← Quay lại trang chủ
        </Link>

      </div>
    </div>
  );
}

export default Login;

import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>✚ MEDICARE</h2>
        <span>CHĂM SÓC SỨC KHỎE</span>
      </div>

      <nav className="menu">
        <a href="/">Trang chủ</a>
        <a href="#about">Giới thiệu</a>
        <a href="#services">Dịch vụ</a>
        <a href="#contact">Liên hệ</a>
      </nav>

      <div className="header-buttons">
  <Link to="/login" className="btn-login">
    Đăng nhập
  </Link>

  <Link to="/register" className="btn-register">
    Đăng ký
  </Link>
</div>
    </header>
  );
}

export default Header;

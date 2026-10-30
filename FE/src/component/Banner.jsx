
function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <span className="subtitle">
          CHĂM SÓC SỨC KHỎE TOÀN DIỆN
        </span>

        <h1>
          Sức khỏe của bạn
          <br />
          là ưu tiên của chúng tôi
        </h1>

        <p>
          Medicare luôn đồng hành cùng bạn trong hành trình
          chăm sóc sức khỏe. Chúng tôi mang đến dịch vụ y tế
          chuyên nghiệp, tận tâm và hiện đại.
        </p>

        <button>Đăng ký tài khoản</button>
      </div>

      <div className="banner-image">
        <img src="/src/assets/doctor.png" alt="Bệnh viện Medicare" />
      </div>
    </section>
  );
}

export default Banner;

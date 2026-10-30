
function Services() {
  return (
    <section className="services" id="services">
      <h2>Dịch vụ y tế của chúng tôi</h2>

      <div className="service-list">
        <div className="service-card">
          <span>🩺</span>
          <h3>Khám bệnh</h3>
          <p>Hỗ trợ chăm sóc và kiểm tra sức khỏe.</p>
        </div>

        <div className="service-card">
          <span>📋</span>
          <h3>Hồ sơ bệnh nhân</h3>
          <p>Quản lý thông tin sức khỏe tiện lợi.</p>
        </div>

        <div className="service-card">
          <span>📅</span>
          <h3>Đặt lịch khám</h3>
          <p>Đăng ký lịch khám nhanh chóng.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;

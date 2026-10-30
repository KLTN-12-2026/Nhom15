
import Header from "../components/Header";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <Banner />

      <section className="about" id="about">
        <h2>Chào mừng đến với Medicare</h2>
        <p>
          Chúng tôi luôn đặt sức khỏe và sự hài lòng
          của bệnh nhân lên hàng đầu.
        </p>
      </section>

      <Services />
      <Footer />
    </>
  );
}

export default Home;

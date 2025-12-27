// src/components/layout/Footer.jsx

export default function Footer() {
  return (
    <footer className="footer">
      {/* Back to top */}
      <div className="footer-top">
        <button
          className="back-to-top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          Back to top
        </button>
      </div>

      {/* Main links */}
      <div className="footer-links">
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <ul>
            <li>About VK Mart</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>VK Science</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Connect with Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell on VK Mart</li>
            <li>Affiliate Program</li>
            <li>Advertise Your Products</li>
            <li>Fulfilment by VK Mart</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>100% Purchase Protection</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} VK Mart. All rights reserved.</p>
      </div>
    </footer>
  );
}

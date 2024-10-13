import { useTranslation } from "react-i18next";
import contactUs from "../assets/contactUs.png";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { t } = useTranslation();
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="form-container">
          <h2 className="contact-head">{t("contact.Contactus")}</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="icon icon-email"></i>
              <input type="text" placeholder="Name" required />
            </div>

            <div className="input-group">
              <i className="icon icon-email"></i>
              <input type="email" placeholder="Email" required />
            </div>

            <div className="input-group">
              <i className="icon icon-message"></i>
              <textarea placeholder="Message" required></textarea>
            </div>

            <button className="contact-btn" type="submit">
              {t("contact.sendMessage")}
            </button>
          </form>
        </div>

        <img className="contact-img" src={contactUs} alt="contact us" />
      </div>
    </div>
  );
};

export default Contact;

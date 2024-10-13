


import { useTranslation } from "react-i18next";

const Success = () => {
  const { t } = useTranslation();

  return (
    <div className="success-container">
      <h1>{t("payment.success")}</h1>
      <p>{t("payment.thankYouMessage")}</p>
      <p>{t("payment.orderDetails")}</p>
    </div>
  );
};

export default Success;



import { useTranslation } from "react-i18next";

const Cancel = () => {
  const { t } = useTranslation();

  return (
    <div className="cancel-container">
      <h1>{t("payment.cancelled")}</h1>
      <p>{t("payment.cancelMessage")}</p>
    </div>
  );
};

export default Cancel;


import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        products: "Products",
        cart: "Cart",
        totalItems: "Total: {{count}} items",
        checkout: "Checkout",
        contact: "Contact",
      },
      cart: {
        empty: "Cart is Empty 😟😞💔",
        clear: "Clear Cart",
        total: "Total: ${{price}}",
        checkout: "Checkout",
      },
      products: {
        header: "Products",
        noProducts: "No products found",
      },
      contact: {
        Contactus: "Contact us",
        sendMessage: "Send Message",
      },
      payment: {
        success: "Payment Successful!",
        thankYouMessage: "Thank you for your order.",
        orderDetails:
          "You will receive an email with your order details shortly.",
      },
    },
  },
  fr: {
    translation: {
      navbar: {
        products: "Produits",
        cart: "Panier",
        totalItems: "Total: {{count}} articles",
        checkout: "Payer",
        contact: "Contact",
      },
      cart: {
        empty: "Le panier est vide 😟😞💔",
        clear: "Vider le panier",
        total: "Total: ${{price}}",
        checkout: "Payer",
      },
      products: {
        header: "Produits",
        noProducts: "Aucun produit trouvé",
      },

      contact: {
        Contactus: "Contactez nous",
        sendMessage: "Envoyer un message",
      },
      payment: {
        success: "Paiement réussi !",
        thankYouMessage: "Merci pour votre commande.",
        orderDetails:
          "Vous recevrez bientôt un e-mail avec les détails de votre commande.",
      },
    },
  },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;




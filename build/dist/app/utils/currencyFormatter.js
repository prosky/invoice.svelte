import {writable} from "../../../web_modules/svelte/store.js";
function createFormatter() {
  let locale, currency;
  const {subscribe, set} = writable(void 0);
  return {
    subscribe,
    set(val) {
      console.log(val);
    },
    setInvoice: (invoice) => {
      if (invoice.locale !== locale || invoice.currency !== currency) {
        locale = invoice.locale;
        currency = invoice.currency;
        let formatter = new Intl.NumberFormat(locale, {style: "currency", currency});
        set((number, sign = false) => {
          if (sign)
            return formatter.format(number);
          return number.toLocaleString(locale, {minimumFractionDigits: 2});
        });
      }
    }
  };
}
export default createFormatter();

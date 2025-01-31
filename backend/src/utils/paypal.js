import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "AfXmnA6g0BQ2VDwzt_6E1pbpbFHXArknMFyLZ3B5Vt4-IkSoc3W7rDUIOR61ghUEWbVF4jlzibhEAmH5",
  client_secret:
    "EP2h89xEItdLxPi5duy6lztgAnJBfF_lkEFx6flbUM0np5qCseWlebY-nP_0-7i_pQs41x7rUxSYvWUu",
});

export { paypal };

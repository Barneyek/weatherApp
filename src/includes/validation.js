import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("email", email);
    defineRule("password_mismatch", confirmed);
    defineRule("excluded", excluded);

    configure({
      generateMessage: (context) => {
        const messages = {
          required: `The  ${context.field} is required`,
          min: `The ${context.field} it's too short`,
          max: `The ${context.field} it's too long`,
          alpha_spaces: `The ${context.field} it can only contain letters or spaces`,
          email: `${context.field} must be a valid email address`,
          excluded: `You cannot use the selected value for this field ${context.field}. Enter another one.`,
          password_mismatch: "The passwords do not match.",
        };
        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : `The ${context.field} it is filled wrong data.`;

        return message;
      },
    });
  },
};

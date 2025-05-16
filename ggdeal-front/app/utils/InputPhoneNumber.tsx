import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/build/css/intlTelInput.css";


export default function InputPhoneNumber() {
    return(
        <IntlTelInput
                inputProps={{
                  className:
                    "w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                    name: "phone",
                }}
                initOptions={{
                  initialCountry: "es",
                  loadUtils: () =>
                    import(
                      "./intl-tel-input.js"
                    ),
                }}
              />
    );
}
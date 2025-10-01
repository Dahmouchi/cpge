"use client";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneNumberProps {
  onPhoneChange: (phone: string) => void;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({ onPhoneChange }) => {
  return (
    <PhoneInput
      defaultCountry="ma"
      name="phone"
      preferredCountries={["ma", "fr"]}
      countrySelectorStyleProps={{
        className: "w-16 flex justify-center items-center",
      }}
      inputProps={{
        className: "border-2 border-emerald-700 text-zinc-900 p-2 rounded-md w-full",
      }}
      onChange={onPhoneChange}
    />
  );
};

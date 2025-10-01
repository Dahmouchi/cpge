"use client";
import { useState } from "react";
import { SendForm } from "@/actions/sendForm";
import { PhoneNumber } from "./phone-input";
import { toast } from "react-toastify";

const FormHero = () => {
  // Initialize form state
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone:"",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      //await SendForm(formData);
      toast.success(
        "Merci de vous avoir inscrit, nous vous contacterons bientôt."
      );
      // Clear form inputs after successful submit
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        phone:"",
      });
    } catch (error) {
      console.error("Error submitting form:");
    }
  };
  const handlePhoneChange = (phone: string) => {
    setFormValues({
      ...formValues,
      phone, // Update phone number in form data
    });
  };
  return (
    <div className="bg-white rounded-xl min-h-[70vh] w-full mt-10 md:mt-0 text-black p-6 flex flex-col justify-evenly shadow-lg">
      <div className="space-y-2">
        <h1 className="text-lg md:text-3xl font-semibold text-emerald-700">
          Formulaire de pré-inscription
        </h1>
        <p className="text-zinc-700 text-md md:text-lg">
          Après remplissage du formulaire, nous vous contacterons pour confirmer
          votre inscription.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          autoComplete="given-name"
          name="firstName"
          placeholder="Prénom"
          value={formValues.firstName}
          onChange={handleChange}
          className="border-2 border-emerald-700 text-zinc-900 w-full p-2 rounded-md"
        />
        <input
          type="text"
          autoComplete="family-name"
          name="lastName"
          placeholder="Nom"
          value={formValues.lastName}
          onChange={handleChange}
          className="border-2 border-emerald-700 text-zinc-900 w-full p-2 rounded-md"
        />
        <input
          type="email"
          autoComplete="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
          className="border-2 border-emerald-700 text-zinc-900 w-full p-2 rounded-md"
        />
        <PhoneNumber onPhoneChange={handlePhoneChange}/>
        <button
          type="submit"
          className="bg-emerald-700 text-white w-full p-2 rounded-md hover:bg-emerald-500 cursor-pointer"
        >
          Inscrivez-vous
        </button>
      </form>
    </div>
  );
};

export default FormHero;

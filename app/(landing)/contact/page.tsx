"use client"
import { useState } from "react";
import { PhoneNumber } from "../components/body/form/phone-input";
import SharedHeroSection from "../shared-layout/hero";
import axios from "axios";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", // Add phone field to form data
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (phone: string) => {
    setFormData({
      ...formData,
      phone, // Update phone number in form data
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.success("Form submitted successfully");
      {/*const response = await axios.post("/api/contact", formData);
  
      if (response.status === 200) {
       
      } else {
        console.error("Form submission failed");
      }*/}
    } catch (error) {
      console.error("An error occurred:", error);
    }
    
  };
  

  return (
    <>
      <div className="space-y-10">
        <SharedHeroSection
          image="/studentsInLibrary.jpg"
          title="CONTACT"
          description="Nous sommes à votre disposition pour répondre à toutes vos questions et vous offrir le soutien dont vous avez besoin. Que vous ayez des interrogations sur nos programmes, besoin d'aide pour le processus d'admission, ou simplement envie d'en savoir plus sur notre établissement, n'hésitez pas à nous contacter."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 px-12">
          <div className="flex flex-col justify-center items-start md:pr-20 gap-4 md:gap-8 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-700">
              Contactez-nous
            </h1>
            <p className="md:text-xl text-zinc-700 text-justify mb-4 md:mb-0">
              Nous sommes à votre disposition pour répondre à toutes vos
              questions et vous fournir les informations dont vous avez besoin.
            </p>
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                name="fullName"
                placeholder="Votre nom complet"
                className="border-2 border-emerald-700 rounded-lg p-2 w-full"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Votre e-mail"
                className="border-2 border-emerald-700 rounded-lg p-2 w-full mt-4 mb-4"
                value={formData.email}
                onChange={handleChange}
              />
              <PhoneNumber onPhoneChange={handlePhoneChange} /> {/* Pass handler to PhoneNumber */}
              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                className="border-2 border-emerald-700 rounded-lg p-2 w-full mt-4"
                value={formData.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                className="border-2 border-emerald-700 rounded-lg p-2 w-full mt-4"
                value={formData.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-emerald-700 text-white text-lg font-medium rounded-lg p-2 mt-4 w-full"
              >
                Envoyer
              </button>
            </form>
          </div>
          <div className="space-y-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26456.15846448353!2d-6.861228092077467!3d34.017702500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76bdb233a118b%3A0x8087e29a5898d189!2sCPGE%20Ibn%20El%20Khatib!5e0!3m2!1sfr!2sma!4v1715628888494!5m2!1sfr!2sma"
              width="800"
              height="fit"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

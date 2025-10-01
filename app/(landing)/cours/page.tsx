"use client";
import { useState } from "react";
import { sendInvite } from "@/actions/invite";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import SharedHeroSection from "../shared-layout/hero";
const InviteForm = () => {
  const [email, setEmail] = useState("");
  const [name,setName]=useState("")
  const [formData, setFormData] = useState({ email: '' });
  const [token,setToken] = useState("")
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Send invite to the entered email
      //await sendInvite(email,name);
      toast.success("Invitation envoyée! Veuillez vérifier votre boîte mail.");
      
      // Clear the input after submit
      setEmail("");
    } catch (error) {
      console.error("Error sending invite:", error);
      toast.error("Une erreur est survenue, veuillez réessayer.");
    }
  };
  const accederAucour = async () => {
    try {
      toast.success("Attends un peu");
      {/*const res = await axios.get(`/api/verifyToken/${formData.email}`);
      
      if (res.status === 200) {
        setToken(res.data.token);
       
  
        window.location.href = `/cours/${res.data.token}`;
      } */}
    } catch (err) {
      toast.error("Email non inscrit");
    }
  };
  return (
    <div className="bg-white rounded-xl min-h-[50vh] w-full mt-10 md:mt-0 text-black flex flex-col justify-center items-center shadow-lg ">
        <SharedHeroSection
          image="/studentsInLibrary.jpg"
          title="COURS"
          description="Découvrez notre sélection de cours conçus pour vous préparer aux défis des grandes écoles d'ingénieur. Que vous souhaitiez approfondir vos connaissances, développer de nouvelles compétences, ou vous préparer aux concours, nos cours sont adaptés à vos besoins."
        />
       <img
          className="lg:h-auto w-full blur-md mb-4"
          src="/blurCours.png"
          alt="logo"
        />
      <div className="lg:w-1/2 flex flex-col items-center p-5">
      <div className="space-y-2 text-center">
        <h1 className="text-lg md:text-3xl font-semibold text-emerald-700 mt-5">
          Demander une invitation pour accéder aux cours
        </h1>
        <p className="text-zinc-700 text-md md:text-lg">
          Entrez votre email pour recevoir un lien d'invitation.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
      <form onSubmit={handleSubmit} className="space-y-4 lg:w-96">
      <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrer votre Nom"
          className="border-2 border-emerald-700 text-zinc-900 w-full p-2 rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-2 border-emerald-700 text-zinc-900 w-full p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-emerald-700 text-white w-full p-2 rounded-md hover:bg-emerald-500 cursor-pointer"
        >
          Recevoir l'invitation
        </button>
      </form>
      <Dialog >
            <DialogTrigger asChild>
            <button
          className="border-2 lg:w-96 border-emerald-700 text-emerald-700 w-full p-2 rounded-md hover:bg-emerald-100 cursor-pointer mt-3"
        >
          Je suis déjà inscrit
        </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Accéder au cours gratuit</DialogTitle>
                <DialogDescription>Entrer votre email pour accéder au cour </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <Label htmlFor="id" className="text-left">
                    Email
                  </Label>
                  <Input
                    id="Email"
                    name="Email"
                    placeholder="entrer votre email"
                    className="col-span-3"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
              </div>
              <DialogFooter>
                <Button className="bg-emerald-800 hover:bg-emerald-600" onClick={accederAucour}>Accéder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
      </div>
    </div>
  );
};

export default InviteForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios"
import { toast } from "react-toastify";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom utilisateur est incorrect",
  }),
  password: z.string().min(6, {
    message: "Le mot de pass n'est pas valide",
  }),
});

const LoginEtudiant=()=> {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      const response = await axios.post('/api/auth/login', values)
      if (response.status === 200) {
        router.refresh()
      }
     }catch(err){
      toast.error("votre mot de pass ou email et incorrecte")
     }
  }
  return (
    <div className="w-full h-full">
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover"
        style={{
          backgroundImage: `url('/teacher.jpg')`,
        }}
      ></div>
        <div className="w-full p-8 lg:w-1/2">
          <div className="w-full flex flex-row justify-center items-center">
            <img src="/LogoVertical.png" alt="logo" className="w-[250px] h-auto"/>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-gray-600 text-center">Bienvenue dans l'espace Professeur</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-gray-700 text-sm font-bold mb-2">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                      className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      placeholder="Votre Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-gray-700 text-sm font-bold mb-2">mot de pass</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="password"
                        placeholder="Votre mot de pass"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</Button>
            </form>
          </Form>
           
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <div className="text-xs text-gray-500 uppercase cursor-pointer" onClick={() => router.push("/")}>
              retour au siteweb
            </div>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default LoginEtudiant;
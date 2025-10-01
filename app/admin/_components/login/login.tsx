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
import { useState } from "react";
import Loading from "@/components/loading";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom utilisateur est incorrect",
  }),
  password: z.string().min(6, {
    message: "Le mot de pass n'est pas valide",
  }),
});

export function LoginComponent() {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try{
     const response = await axios.post('/api/auth/login', values)
     if (response.status === 200) {
       router.refresh()
       setLoading(false)
     }else{
      toast.error("votre mot de pass ou email et incorrecte")
     }
    }catch(err){
     toast.error("votre mot de pass ou email et incorrecte")
     setLoading(false)
    }
   }

   if(loading){
    return <Loading/>
   }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-main">
      <Card>
        <CardHeader>
          <CardTitle>Connectez-vous</CardTitle>
          <CardDescription>
            Seuls les utilisateurs avec un accès administrateur peuvent y
            accéder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d&apos;utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
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
                    <FormLabel>mot de pass</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="mot de pass"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="mr-auto"
          >
            Retour au site
          </Button>
          <h1 className="text-xs">Copyright BetterBeuz 2024</h1>
        </CardFooter>
      </Card>
    </div>
  );
}

// components/StudentForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const studentSchema = z.object({
  lastName: z.string().min(1, "Nom de famille est requis"),
  firstName: z.string().min(1, "Prénom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  address: z.string().optional(),
  studentClass: z.string().min(1, "Classe est requise"),
});

export const StudentForm = ({
  onSubmit,
  defaultValues,
  classes,
}: {
  onSubmit: (data: any) => void;
  defaultValues: any;
  classes: any[];
}) => {
  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = studentForm;

  return (
    <Form {...studentForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-8 w-full">
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de famille</FormLabel>
              <FormControl>
                <Input placeholder="Nom de famille" {...field} disabled/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} disabled/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} disabled/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de téléphone" {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="Adresse" {...field} disabled/>
              </FormControl>
            </FormItem>
          )}
        /><div>
        <label>Les Classe :</label>
        
        {classes.map((cls)=>
        <div
            key={cls.id}
            className="cursor-pointer bg-white hover:bg-slate-100 transition-colors ease-out w-full h-10 flex items-center px-2 border-y"
          >
            {cls.id}
          </div>
        )}</div>
      </form>
    </Form>
  );
};

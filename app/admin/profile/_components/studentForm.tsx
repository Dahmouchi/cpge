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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const studentSchema = z.object({
  lastName: z.string().min(1, "Nom de famille est requis"),
  firstName: z.string().min(1, "Prénom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const StudentForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: any) => void;
  defaultValues: any;
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
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-8">
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de famille</FormLabel>
              <FormControl>
                <Input placeholder="Nom de famille" {...field} />
              </FormControl>
              <FormMessage>{errors.lastName?.message?.toString()}</FormMessage>
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
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage>{errors.firstName?.message?.toString()}</FormMessage>
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
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage>{errors.email?.message?.toString()}</FormMessage>
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
                <Input placeholder="Numéro de téléphone" {...field} />
              </FormControl>
              <FormMessage>{errors.phone?.message?.toString()}</FormMessage>
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
                <Input placeholder="Adresse" {...field} />
              </FormControl>
              <FormMessage>{errors.address?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />      
        <Button type="submit" className="mt-8">Sauvegarder</Button>
      </form>
    </Form>
  );
};

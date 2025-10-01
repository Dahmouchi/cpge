// components/ParentForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const parentSchema = z.object({
  lastName: z.string().min(1, "Nom de famille est requis"),
  firstName: z.string().min(1, "Prénom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  studentId: z.number().min(1, "Étudiant est requis"),
});

export const ParentForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: any) => void;
  defaultValues: any;
  isEditing: boolean;
}) => {
  const parentForm = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = parentForm;

  return (
    <Form {...parentForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de famille</FormLabel>
              <FormControl>
                <Input placeholder="Nom de famille" {...field} disabled/>
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
                <Input placeholder="Prénom" {...field} disabled/>
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
                <Input placeholder="Email" {...field} disabled/>
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
                <Input placeholder="Numéro de téléphone" {...field} disabled/>
              </FormControl>
              <FormMessage>{errors.phone?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Étudiant</FormLabel>
              <FormControl>
                <Input placeholder="ID de l&apos;étudiant" {...field} disabled />
              </FormControl>
              <FormMessage>{errors.studentId?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

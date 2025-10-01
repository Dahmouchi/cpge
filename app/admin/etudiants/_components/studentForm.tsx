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
  studentClass: z.string().min(1, "Classe est requise"),
  group: z.any(),
});

export const StudentForm = ({
  onSubmit,
  defaultValues,
  classes,
  groups,
}: {
  onSubmit: (data: any) => void;
  defaultValues: any;
  classes: any[];
  groups:any[];
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
       <FormField
          control={control}
          name="studentClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value} // Set the value to the field's value
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Séléctionnez une classe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classes.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{errors.studentClass?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groupe</FormLabel>
              <select
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="input flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              >
                <option value="">Séléctionnez un groupe</option>
                {groups.map((item) => (
                  <option key={item.id} value={item.id.toString()}>
                    {item.name}
                  </option>
                ))}
              </select>
              <FormMessage>{errors.groupId?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Sauvegarder les informations de l&apos;étudiant</Button>
      </form>
    </Form>
  );
};

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

const studentSchema = z.object({
  oldPassword: z.string().min(1, "Nom de famille est requis"),
  newPassword: z.string().min(1, "Nom de famille est requis"),
});

export const PasswordForm = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) => {
  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
   
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = studentForm;

  return (
    <div className="w-full">
    <Form {...studentForm} >
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5">
        <FormField
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ancien mot de pass</FormLabel>
              <FormControl>
                <Input placeholder="votre ancien mot de pass" {...field} />
              </FormControl>
              <FormMessage>{errors.oldPassword?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de pass</FormLabel>
              <FormControl>
                <Input placeholder="votre nouveau mot de pass" {...field} />
              </FormControl>
              <FormMessage>{errors.oldPassword?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />
        
        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
    </div>
  );
};

// components/PaymentForm.tsx
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

const paymentSchema = z.object({
  total: z.string().min(1, "Le montant est requis"),
  avance: z.string().min(1, "Le montant est requis"),
});

export const AgreeForm = ({ onSubmits }: { onSubmits: (data: any) => void; }) => {
  const PaymentForms = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      total: '',  // Initialize with an empty string
      avance: '', // Initialize with an empty string
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = PaymentForms;

  return (
    <Form {...PaymentForms}>
      <form onSubmit={handleSubmit(onSubmits)} className="space-y-4">
        <FormField
          control={control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Le Prix ​​convenu</FormLabel>
              <FormControl>
                <Input placeholder="Montant ​​convenu" {...field} />
              </FormControl>
              <FormMessage>{errors.total?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="avance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Le montant d'avance</FormLabel>
              <FormControl>
                <Input placeholder="Montant d'avance" {...field} />
              </FormControl>
              <FormMessage>{errors.avance?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={PaymentForms.formState.isSubmitting}>
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

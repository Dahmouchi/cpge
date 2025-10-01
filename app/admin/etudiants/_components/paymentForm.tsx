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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from "@/components/ui/select";

const paymentShema = z.object({
  montant: z.string().min(1, "le montant  est requis"),
  type: z.string().min(1,"le type et requis"),
});
const type=[
  {"id":1, "item":"Cash"},
  {"id":2, "item":"Espece"},
  {"id":3, "item":"Virement"},

]
export const PaymentForm = ({onSubmit}: { onSubmit: (data: any) => void;}) => {
  
  const PaymentForm = useForm({
    resolver: zodResolver(paymentShema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = PaymentForm;

  return (
    <Form {...PaymentForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
            control={control}
            name="type"
            render={({ field }) => (
            <FormItem>
              <FormLabel>type de paiement</FormLabel>
                <Select
                  onValueChange={field.onChange}
                   defaultValue={field.value}
                 >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {type.map((item: any) => (
                              <SelectItem key={item.id} value={item.item}>
                                {item.item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                       
                      </FormItem>
                    )}
                  />
        <FormField
          control={control}
          name="montant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Le montant ajouter</FormLabel>
              <FormControl>
                <Input placeholder="montant" {...field} />
              </FormControl>
            </FormItem>
          )}
        />  
        <Button type="submit">Ajouter Montant</Button>
      </form>
    </Form>
  );
};

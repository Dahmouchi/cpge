"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export type Forms = {
  id: number;
  status: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  notes: string;
};

export const columns: ColumnDef<Forms>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const form = row.original;
      return form.status === "pending" ? "En attente" : form.status;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Nom de Famille",
  },
  {
    accessorKey: "phone",
    header: "Numéro de téléphone",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const form = row.original;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <DialogTrigger className="w-full text-left">
                  Afficher
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(form.email)}
              >
                Copier l&apos;email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(form.phone)}
              >
                Copier le numéro de téléphone
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fiche de pré-inscription</DialogTitle>
                <DialogDescription>
                  Voici la fiche d&apos;information des utilisateurs qui ont
                  rempli le formulaire
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <div className="">Nom</div>
                <div className="font-semibold">{form.lastName}</div>
                <Separator />
                <div>Prénom</div>
                <div className="font-semibold">{form.firstName}</div>
                <Separator />
                <div>E-mail</div>
                <div className="font-semibold">{form.email}</div>
                <Separator />
                <div>Numéro de téléphone</div>
                <div className="font-semibold">{form.phone}</div>
                <Separator />
                <Button>Modifier</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fermer
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
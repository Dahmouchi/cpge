"use server";
import prisma from "@/lib/prisma";

const updateFormStatus = async (formId: number) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
    },
  });
  if (!form) {
    return "Ce formulaire n'existe pas.";
  } else {
    const statut = form.status === "pending" ? "contacted" : "pending";
    const updatedForm = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        status: statut,
      },
    });
    return updatedForm;
  }
};

export default updateFormStatus;

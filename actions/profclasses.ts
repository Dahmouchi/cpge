"use server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation/validaterequest";

const getProfClasses = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return;
  }
  const classes = await prisma.classes.findMany({
    where: {
      teachers: {
        some: {
          userId: user.id,
        },
      },
    },
  })
  return classes;
};

export default getProfClasses;

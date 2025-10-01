'use server'
import prisma from "@/lib/prisma";

export const getUserData = async (id:string) => {
    const thisUser = await prisma.student.findUnique({
      where: {
        userId: id,
      },
      include: {
        class: {
          include: {
            subjects: {
              include: {
                contents: {
                  include: {
                    teacher: {
                      include: {
                        user: true,
                      },
                    },
                    document: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {subjects: thisUser?.class?.subjects};
  };
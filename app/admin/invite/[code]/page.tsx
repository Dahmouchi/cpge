import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { lucia } from "@/auth";
import { cookies } from "next/headers";


const InviteTeacherPage = async ({ params }: { params: { code: string } }) => {
  const code = params.code;
  const exists = await prisma.invite.findFirst({ where: { code: code } });

  if (!exists || !exists.userId) {
    return (
      <>
        <h1>Code invalide ou utilisateur introuvable</h1>
      </>
    );
  }

  const submitForm = async (formData: FormData) => {
    "use server";
    const password = formData.get("password")?.toString();
    const confirmation = formData.get("confirmation")?.toString();

    if (password !== confirmation) {
      return (
        <>
          <h1>Mots de passe non identiques</h1>
        </>
      );
    }

    if (!exists.userId) {
      return (
        <>
          <h1>Utilisateur introuvable</h1>
        </>
      );
    }

    const response = await prisma.user.update({
      where: { id: exists.userId },
      data: { password: password!, statut: true },
    });

    const session = await lucia.createSession(response.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    await prisma.invite.delete({ where: { id: exists.id } });
    redirect("/admin/profile");
  };

  const user = await prisma.user.findFirst({
    where: { id: exists.userId },
  });

  return (
    <div className="flex justify-center items-center w-full p-24">
      <Card>
        <CardHeader>
          <CardTitle>Invitation</CardTitle>
          <CardDescription>
            <p>
              Bienvenue Pr. <strong>{user?.lastName} </strong>
              {user?.firstName}, veuillez changer votre mot de pass avant de
              commencer.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submitForm} className="space-y-4">
            <Label>Veuillez saisir un mot de pass sécurisé :</Label>
            <Input
              placeholder="mot de pass"
              name="password"
              type="password"
            />
            <Label>Veuillez confirmer le mot de pass :</Label>
            <Input
              placeholder="Confirmez le mot de pass"
              name="confirmation"
              type="password"
            />
            <Button type="submit">Continuer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteTeacherPage;



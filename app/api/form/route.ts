import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const formId = searchParams.get('formId');

  if (formId) {
    const form = await prisma.form.findUnique({
      where: { id: Number(formId) },
    });

    if (!form) {
      return NextResponse.json({ error: "Ce formulaire n'existe pas." }, { status: 404 });
    }

    return NextResponse.json(form, { status: 200 });
  } else {
    const forms = await prisma.form.findMany(
      {
        orderBy:{
          id:"desc",
        }
      }
    );

    return NextResponse.json(forms, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const { formId } = await req.json();

  if (!formId) {
    return NextResponse.json({ error: 'Form ID is required' }, { status: 400 });
  }

  const form = await prisma.form.findFirst({
    where: { id: formId },
  });

  if (!form) {
    return NextResponse.json({ error: "Ce formulaire n'existe pas." }, { status: 404 });
  }

  const statut = form.status === 'pending' ? 'contacted' : 'pending';

  const updatedForm = await prisma.form.update({
    where: { id: formId },
    data: { status: statut },
  });

  return NextResponse.json(updatedForm, { status: 200 });
}

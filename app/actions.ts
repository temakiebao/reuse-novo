'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function criarAnuncio(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const category = formData.get('category') as string
  const image = formData.get('image') as string

  await prisma.item.create({
    data: {
      title,
      description,
      price: `R$ ${price}`,
      category,
      image: image || null,
    },
  })

  revalidatePath('/')
  redirect('/')
}
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import styles from './cadastro.module.css'

export default function Cadastro() {
  async function criarAnuncio(formData: FormData) {
    'use server'
    
    try {
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const price = formData.get('price') as string
      const category = formData.get('category') as string
      
      const file = formData.get('image') as File
      let imagePath = ''

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const uploadDir = path.join(process.cwd(), 'public/uploads')
        try {
          await mkdir(uploadDir, { recursive: true })
        } catch (error) {
          console.log('Diretório já existe:', error)
        }

        const fileName = `${Date.now()}-${file.name.replaceAll(' ', '_')}`
        const filePath = path.join(uploadDir, fileName)

        await writeFile(filePath, buffer)
        imagePath = `/uploads/${fileName}`
      } else {
        imagePath = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
      }

      await prisma.item.create({
        data: {
          title,
          description,
          price,
          category,
          image: imagePath,
          rating: '5.0',
        },
      })
    } catch (error) {
      console.error('Erro ao cadastrar anúncio:', error)
    }

    redirect('/')
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className={styles.logo}>RE <span className={styles.logoTextDark}>USE</span></span>
          </Link>
          <Link href="/" className={styles.btnVoltar}>
            Voltar para Home
          </Link>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>Novo Anúncio</h1>
          <p className={styles.subtitle}>Cadastre uma peça ou componente para doação ou venda sustentável.</p>

          <form action={criarAnuncio} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Título do Anúncio</label>
              <input type="text" name="title" required placeholder="Ex: Placa Mãe LGA 1200" className={styles.input} />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Preço</label>
                <input type="text" name="price" required placeholder="Ex: R$ 350,00" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Categoria</label>
                <select name="category" className={styles.select}>
                  <option value="Placas de Vídeo">Placas de Vídeo</option>
                  <option value="Computadores">Computadores</option>
                  <option value="Video Games">Video Games</option>
                  <option value="Processadores">Processadores</option>
                  <option value="Periféricos">Celulares</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Envie suas fotos</label>
              <input type="file" name="image" accept="image/*" className={styles.inputFile} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descrição</label>
              <textarea name="description" rows={4} required placeholder="Detalhes sobre o estado do item..." className={styles.textarea}></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Publicar Anúncio
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Header from '../../components/Header'
import styles from '../../page.module.css'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProdutoDetalhes({ params }: PageProps) {
  const { id } = await params

  // Busca o item no banco de dados pelo ID
  const item = await prisma.item.findUnique({
    where: { id },
  })

  if (!item) {
    return (
      <main className={styles.mainContainer}>
        <Header />
        <div className={styles.contentWrapper} style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Item não encontrado</h2>
          <Link href="/" className={styles.btnDetails} style={{ display: 'inline-block', marginTop: '1rem' }}>Voltar ao Início</Link>
        </div>
      </main>
    )
  }

  // Server Action para excluir o anúncio do banco
  async function excluirAnuncio() {
    'use server'
    await prisma.item.delete({
      where: { id },
    })
    redirect('/')
  }

  // Server Action para atualizar o anúncio no banco
  async function editarAnuncio(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const category = formData.get('category') as string

    await prisma.item.update({
      where: { id },
      data: { title, description, price, category },
    })

    redirect('/')
  }

  return (
    <main className={styles.mainContainer}>
      <Header />

      <div className={styles.contentWrapper} style={{ maxWidth: '50rem' }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: '1.5rem', color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
          ← Voltar para a página inicial
        </Link>

        {/* Bloco principal de visualização e edição */}
        <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e5e7eb', overflow: 'hidden', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ width: '100%', height: '22rem', background: '#f9fafb', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {item.image ? (
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '3rem' }}>🖼️</span>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className={styles.cardCategory}>{item.category}</span>
            <span style={{ fontWeight: 700, color: '#f59e0b' }}>⭐ {item.rating}</span>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>{item.title}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2563eb', marginBottom: '1.5rem' }}>{item.price}</p>
          
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>Descrição do Vendedor</h3>
            <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.6' }}>{item.description}</p>
          </div>

          {/* Botão de Excluir Anúncio */}
          <form action={excluirAnuncio} style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <button 
              type="submit" 
              style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              🗑️ Excluir este Anúncio
            </button>
          </form>
        </div>

        {/* Seção de Formulário para Editar Anúncio */}
          <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e5e7eb', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>✏️ Editar Informações do Anúncio</h2>
            
            <form action={editarAnuncio} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem', color: '#374151' }}>Título</label>
                <input type="text" name="title" defaultValue={item.title} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontSize: '1rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem', color: '#374151' }}>Preço</label>
                  <input type="text" name="price" defaultValue={item.price} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem', color: '#374151' }}>Categoria</label>
                  <select name="category" defaultValue={item.category} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontSize: '1rem', background: '#fff' }}>
                    <option value="Placas de Vídeo">Placas de Vídeo</option>
                    <option value="Computadores">Computadores</option>
                    <option value="Video Games">Video Games</option>
                    <option value="Processadores">Processadores</option>
                    <option value="Periféricos">Periféricos</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem', color: '#374151' }}>Descrição</label>
                <textarea name="description" rows={4} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontSize: '1rem' }}>{item.description}</textarea>
              </div>

              <button type="submit" className={styles.btnDetails} style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                Salvar Alterações
              </button>
            </form>
          </div>
      </div>
    </main>
  )
}
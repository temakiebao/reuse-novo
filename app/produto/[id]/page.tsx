import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Header from '../../components/Header'
import styles from './produto.module.css'

interface PageProps {
  params: Promise<{ id: string }>
}

const PRODUTOS_MOCK: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Placa de Vídeo RTX 3060 12GB',
    category: 'Placas de Vídeo',
    rating: '4.9',
    price: 'R$ 1.650,00',
    description: 'Placa de vídeo em excelente estado de conservação, pouco tempo de uso voltado para jogos leves e estudos. Acompanha caixa original e nota fiscal. Nunca utilizada para mineração.',
    image: 'https://photos.enjoei.com.br/placa-de-video-gainward-geforce-rtx-3060-12gb-gddr6-ghost-series/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy80Njk3Mjg4LzI3Yjg0NGE0MmIyYjRkODgzOThiMGQ5NzVlMTY5YTNlLmpwZw'
  },
  '2': {
    id: '2',
    title: 'Console PlayStation 5 Slim 1TB',
    category: 'Video Games',
    rating: '5.0',
    price: 'R$ 1.500,00',
    description: 'Console impecável com 1TB de armazenamento SSD ultra veloz. Acompanha dois controles DualSense originais e 3 jogos físicos inclusos.',
    image: 'https://cdn.awsli.com.br/2500x2500/2598/2598981/produto/401307175/51638419443819ed04838d8be97dced0-7m1u5yz5oi.jpg'
  },
  '3': {
    id: '3',
    title: 'Kit Memória RAM 16GB (2x8GB) DDR4',
    category: 'Memórias e Armazenamento',
    rating: '4.8',
    price: 'R$ 320,00',
    description: 'Kit dual channel de memórias 3200MHz com dissipador RGB impecável. Funcionando perfeitamente.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWMoFBTpgpn_Tp-HQ17SS5s2el9aZ42Q6Hl1f0GvuEneFZXnYGyxoYXM&s=10'
  },
  '4': {
    id: '4',
    title: 'Processador AMD Ryzen 5 5600X',
    category: 'Processadores',
    rating: '5.0',
    price: 'R$ 850,00',
    description: 'Acompanha cooler Wraith Stealth original nunca usado.',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80'
  },
  '5': {
    id: '5',
    title: 'Notebook Gamer Core i7 RTX 3050',
    category: 'Computadores',
    rating: '4.7',
    price: 'R$ 4.200,00',
    description: 'Tela de 144Hz, 16GB RAM e SSD NVMe de 512GB.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0DuK1UtqFrnUXUmZVSbFoAenqm9q4mhDGoDKjAislpXWt8CKoi_Xhhdw&s=10'
  },
  '6': {
    id: '6',
    title: 'Headset Gamer Havit H2015D',
    category: 'Periféricos',
    rating: '4.9',
    price: 'R$ 180,00',
    description: 'Som surround 5.1, microfone com cancelamento de ruído.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6YCUHkCxpGMtpQ4Bl4aaCRUUEhs2r5Dm_90C08B4_ug&s'
  }
}

export default async function ProdutoDetalhes({ params }: PageProps) {
  const { id } = await params

  let itemBanco = null
  try {
    itemBanco = await prisma.item.findUnique({
      where: { id },
    })
  } catch (e) {
    itemBanco = null
  }

  const item = itemBanco || PRODUTOS_MOCK[id]

  if (!item) {
    return (
      <main className={styles.mainContainer}>
        <Header />
        <div className={styles.notFoundWrapper}>
          <h2 className={styles.notFoundTitle}>Item não encontrado</h2>
          <Link href="/" className={styles.btnVoltarInicio}>
            Voltar ao Início
          </Link>
        </div>
      </main>
    )
  }

  async function excluirAnuncio() {
    'use server'
    try {
      await prisma.item.delete({
        where: { id },
      })
    } catch (e) {}
    redirect('/')
  }

  async function editarAnuncio(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const category = formData.get('category') as string

    try {
      await prisma.item.update({
        where: { id },
        data: { title, description, price, category },
      })
    } catch (e) {}

    redirect('/')
  }

  return (
    <main className={styles.mainContainer}>
      <Header />

      <div className={styles.contentWrapper}>
        
        {/* BARRA SUPERIOR DE NAVEGAÇÃO / VOLTAR */}
        <div className={styles.topNavRow}>
          <Link href="/" className={styles.btnNavVoltar}>
            ← Voltar para a página inicial
          </Link>
        </div>

        {/* BLOCO PRINCIPAL DO ANÚNCIO */}
        <div className={styles.cardPrincipal}>
          <div className={styles.imagemContainer}>
            {item.image ? (
              <img src={item.image} alt={item.title} className={styles.imagemProduto} />
            ) : (
              <span className={styles.placeholderIcon}>🖼️</span>
            )}
          </div>

          <div className={styles.infoRow}>
            <span className={styles.cardCategory}>{item.category}</span>
            <span className={styles.cardRating}>⭐ {item.rating || '5.0'}</span>
          </div>

          <h1 className={styles.tituloProduto}>{item.title}</h1>
          <p className={styles.precoProduto}>{item.price}</p>
          
          <div className={styles.descricaoSection}>
            <h3 className={styles.secaoTitulo}>Descrição do Vendedor</h3>
            <p className={styles.descricaoTexto}>{item.description}</p>
          </div>

          {/* ÁREA DE AÇÕES: TROCAR + COMPRAR (SEM VALOR NO BOTÃO) */}
          <div className={styles.botoesAcaoGrid}>
            <Link href={`/trocas/${item.id}`} className={styles.btnProporTroca}>
              🔄 Propor Troca deste Hardware
            </Link>

            <button className={styles.btnComprar}>
              🛒 Comprar
            </button>
          </div>

          {/* FORMULÁRIO DE EXCLUSÃO */}
          <form action={excluirAnuncio} className={styles.excluirForm}>
            <button type="submit" className={styles.btnExcluir}>
              🗑️ Excluir este Anúncio
            </button>
          </form>
        </div>

        {/* BLOCO DE EDIÇÃO DO ANÚNCIO */}
        <div className={styles.cardEdicao}>
          <h2 className={styles.tituloEdicao}>✏️ Editar Informações do Anúncio</h2>
          
          <form action={editarAnuncio} className={styles.formEdicao}>
            <div className={styles.campoForm}>
              <label className={styles.labelForm}>Título</label>
              <input 
                type="text" 
                name="title" 
                defaultValue={item.title} 
                required 
                className={styles.inputForm} 
              />
            </div>

            <div className={styles.formRowDoisCampos}>
              <div className={styles.campoForm}>
                <label className={styles.labelForm}>Preço</label>
                <input 
                  type="text" 
                  name="price" 
                  defaultValue={item.price} 
                  required 
                  className={styles.inputForm} 
                />
              </div>
              <div className={styles.campoForm}>
                <label className={styles.labelForm}>Categoria</label>
                <select 
                  name="category" 
                  defaultValue={item.category} 
                  className={styles.selectForm}
                >
                  <option value="Placas de Vídeo">Placas de Vídeo</option>
                  <option value="Computadores">Computadores</option>
                  <option value="Video Games">Video Games</option>
                  <option value="Processadores">Processadores</option>
                  <option value="Periféricos">Periféricos</option>
                </select>
              </div>
            </div>

            <div className={styles.campoForm}>
              <label className={styles.labelForm}>Descrição</label>
              <textarea 
                name="description" 
                rows={4} 
                defaultValue={item.description} 
                required 
                className={styles.textareaForm} 
              />
            </div>

            <button type="submit" className={styles.btnSalvarAlteracoes}>
              Salvar Alterações
            </button>
          </form>
        </div>

      </div>
    </main>
  )
}
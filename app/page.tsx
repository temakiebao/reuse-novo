import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Header from './components/Header'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

// Catálogo simulado para preencher as abas sem sobrecarregar o banco de dados
const produtosDeEnfeite = [
  {
    id: '1',
    title: 'Placa de Vídeo RTX 3060 12GB',
    description: 'Placa em excelente estado, pouco uso em jogos, com caixa original.',
    price: 'R$ 1.650,00',
    category: 'Placas de Vídeo',
    rating: '4.9',
    image: 'https://photos.enjoei.com.br/placa-de-video-gainward-geforce-rtx-3060-12gb-gddr6-ghost-series/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy80Njk3Mjg4LzI3Yjg0NGE0MmIyYjRkODgzOThiMGQ5NzVlMTY5YTNlLmpwZw',
    tag: 'Destaque'
  },
  {
    id: '2',
    title: 'Console PlayStation 5 Slim 1TB',
    description: 'Acompanha dois controles originais e 3 jogos físicos inclusos.',
    price: 'R$ 1.500,00',
    category: 'Video Games',
    rating: '5.0',
    image: 'https://cdn.awsli.com.br/2500x2500/2598/2598981/produto/401307175/51638419443819ed04838d8be97dced0-7m1u5yz5oi.jpg',
    tag: 'Destaque'
  },
  {
    id: '3',
    title: 'Kit Memória RAM 16GB (2x8GB) DDR4',
    description: 'Memórias de 3200MHz com dissipador RGB impecável.',
    price: 'R$ 320,00',
    category: 'Memórias e Armazenamento',
    rating: '4.8',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWMoFBTpgpn_Tp-HQ17SS5s2el9aZ42Q6Hl1f0GvuEneFZXnYGyxoYXM&s=10',
    tag: 'Destaque'
  },
  {
    id: '4',
    title: 'Processador AMD Ryzen 5 5600X',
    description: 'Acompanha cooler Wraith Stealth original nunca usado.',
    price: 'R$ 850,00',
    category: 'Processadores',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
    tag: 'Geral'
  },
  {
    id: '5',
    title: 'Notebook Gamer Core i7 RTX 3050',
    description: 'Tela de 144Hz, 16GB RAM e SSD NVMe de 512GB.',
    price: 'R$ 4.200,00',
    category: 'Computadores',
    rating: '4.7',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0DuK1UtqFrnUXUmZVSbFoAenqm9q4mhDGoDKjAislpXWt8CKoi_Xhhdw&s=10',
    tag: 'Geral'
  },
  {
    id: '6',
    title: 'Headset Gamer Havit H2015D',
    description: 'Som surround 5.1, microfone com cancelamento de ruído.',
    price: 'R$ 180,00',
    category: 'Periféricos',
    rating: '4.9',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6YCUHkCxpGMtpQ4Bl4aaCRUUEhs2r5Dm_90C08B4_ug&s',
    tag: 'Geral'
  }
]

export default async function Home() {
  // Busca apenas os itens reais cadastrados pelo usuário no banco PostgreSQL via Prisma
  let meusItensBanco: any[] = [];
  try {
    meusItensBanco = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    meusItensBanco = [];
  }

  const destaques = produtosDeEnfeite.filter(p => p.tag === 'Destaque')

  return (
    <main className={styles.mainContainer}>
      {/* Cabeçalho interativo com perfil e menu hambúrguer */}
      <Header />

      {/* Navegação por categorias */}
      <nav className={styles.categoryNav}>
        <div className={styles.categoryNavContent}>
          <button className={`${styles.categoryTab} ${styles.categoryTabActive}`}>Todos</button>
          <button className={styles.categoryTab}>Computadores</button>
          <button className={styles.categoryTab}>Placas de Vídeo</button>
          <button className={styles.categoryTab}>Video Games</button>
          <button className={styles.categoryTab}>Memórias e Armazenamento</button>
          <button className={styles.categoryTab}>Processadores</button>
          <button className={styles.categoryTab}>Periféricos</button>
        </div>
      </nav>

      <div className={styles.contentWrapper}>
        {/* Banner de boas-vindas com GIF animado */}
        <div className={styles.customBannerContainer}>
          <img 
            src="/seja_bem_vindo.gif" 
            alt="Seja bem-vindo ao ReUse" 
            className={styles.customBannerImg} 
          />
        </div>

        {/* Seção: Meus Anúncios (Persistência real via banco de dados) */}
        <section className={styles.highlightSection}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Meus Anúncios</h2>
            <span className={styles.sectionSub}>Seus itens cadastrados na plataforma</span>
          </div>

          {meusItensBanco.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Nenhum anúncio pessoal cadastrado ainda.</p>
              <Link href="/cadastro" className={styles.btnAnunciar} style={{ display: 'inline-flex', marginTop: '1rem' }}>
                Criar Meu Primeiro Anúncio
              </Link>
            </div>
          ) : (
            <div className={styles.gridCards}>
              {meusItensBanco.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div>
                    <div className={styles.cardImageWrapper}>
                      {item.image ? (
                        <img src={item.image} alt={item.title} className={styles.cardImg} />
                      ) : (
                        <span className={styles.placeholderIcon}>🖼️</span>
                      )}
                    </div>

                    <div className={styles.cardHeader}>
                      <span className={styles.cardCategory}>{item.category}</span>
                      <span className={styles.cardRating}>⭐ {item.rating || '5.0'}</span>
                    </div>
                    
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>{item.price}</span>
                    <Link href={`/produto/${item.id}`} className={styles.btnDetails}>
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seção: Itens em Destaque */}
        <section style={{ marginTop: '2.5rem' }}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Itens em Destaque</h2>
            <span className={styles.sectionSub}>Oportunidades selecionadas na plataforma</span>
          </div>
          <div className={styles.gridCards}>
            {destaques.map((item) => (
              <div key={item.id} className={styles.card}>
                <div>
                  <div className={styles.cardImageWrapper}>
                    <img src={item.image} alt={item.title} className={styles.cardImg} />
                  </div>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <span className={styles.cardRating}>⭐ {item.rating}</span>
                  </div>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>{item.price}</span>
                  <Link 
                    href={`/produto/${item.id}`} 
                    className={styles.btnDetails} 
                    style={{ textAlign: 'center', background: '#f3f4f6', color: '#374151' }}
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção: Outras Ofertas da Comunidade */}
        <section style={{ marginTop: '2.5rem' }}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Outras Ofertas na Comunidade</h2>
            <span className={styles.sectionSub}>Anúncios populares da rede ReUse</span>
          </div>

          <div className={styles.gridCards}>
            {produtosDeEnfeite.map((item) => (
              <div key={`geral-${item.id}`} className={styles.card}>
                <div>
                  <div className={styles.cardImageWrapper}>
                    <img src={item.image} alt={item.title} className={styles.cardImg} />
                  </div>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <span className={styles.cardRating}>⭐ {item.rating}</span>
                  </div>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>{item.price}</span>
                  <Link 
                    href={`/produto/${item.id}`} 
                    className={styles.btnDetails} 
                    style={{ textAlign: 'center', background: '#f3f4f6', color: '#374151' }}
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
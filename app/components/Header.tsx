'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo do projeto */}
        <div className={styles.logoContainer}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className={styles.logo}>RE <span className={styles.logoTextDark}>USE</span></span>
          </Link>
        </div>

        {/* Barra de pesquisa */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="Pesquisar peças, placas, consoles..." className={styles.searchInput} />
        </div>

        {/* Ações da direita */}
        <div className={styles.rightHeaderActions}>
          <Link href="/cadastro" className={styles.btnAnunciar}>
            <span>+</span> ANUNCIAR
          </Link>

          <div className={styles.userProfileSection}>
            <div className={styles.userAvatarName}>
              <div className={styles.avatarPlaceholder}>G</div>
              <div className={styles.userInfoText}>
                <span className={styles.userGreeting}>Olá,</span>
                <span className={styles.userName}>Gustavo</span>
              </div>
            </div>
            
            {/* Botão do menu hambúrguer interativo */}
            <button className={styles.hamburgerMenu} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu dropdown do perfil */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownHeader}>
            <strong>Gustavo Faria Galvão</strong>
            <span>Gerenciar conta</span>
          </div>
          <div className={styles.dropdownDivider}></div>
          <Link href="#" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>⚙️ Configuração de Perfil</Link>
          <Link href="/cadastro" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>📦 Meus Anúncios</Link>
          <div className={styles.dropdownDivider}></div>
          <button className={styles.dropdownLogout} onClick={() => setMenuOpen(false)}>Sair da Conta</button>
        </div>
      )}
    </header>
  )
}
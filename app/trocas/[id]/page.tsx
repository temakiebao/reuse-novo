'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './salaTroca.module.css';

interface Mensagem {
  id: string;
  autor: string;
  texto: string;
  horario: string;
}

export default function SalaTrocaPage() {
  const router = useRouter();

  // Formulário do Usuário (Lado Esquerdo)
  const [tipoHardware, setTipoHardware] = useState('Placa de Vídeo');
  const [condicao, setCondicao] = useState('Seminovo (Pouco Uso)');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState<File[]>([]);
  const [erroFoto, setErroFoto] = useState('');

  // Item Oferecido pelo Parceiro (Lado Direito)
  const itemParceiro = {
    nome: 'Placa de Vídeo RTX 3060 12GB',
    tipo: 'Placa de Vídeo',
    condicao: 'Seminovo (Pouco Uso)',
    fotoUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    descricao: 'Placa em excelente estado, utilizada apenas para jogos e estudo. Acompanha caixa original e nota fiscal.'
  };

  // Chat
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { id: '1', autor: 'Gustavo G.', texto: 'Olá! Subi a foto da RTX 3060 que quero trocar. O que acha de negociarmos?', horario: '14:30' }
  ]);
  const [novaMensagem, setNovaMensagem] = useState('');

  // Upload de imagem com limite de 10MB
  const handleUploadFotos = (e: ChangeEvent<HTMLInputElement>) => {
    setErroFoto('');
    if (!e.target.files) return;

    const arquivos = Array.from(e.target.files);
    const arquivosValidos: File[] = [];

    for (const file of arquivos) {
      if (file.size > 10 * 1024 * 1024) {
        setErroFoto(`O arquivo "${file.name}" excede o limite de 10MB.`);
        return;
      }
      arquivosValidos.push(file);
    }

    setFotos(prev => [...prev, ...arquivosValidos]);
  };

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    const msg: Mensagem = {
      id: Date.now().toString(),
      autor: 'Você',
      texto: novaMensagem,
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensagens(prev => [...prev, msg]);
    setNovaMensagem('');
  };

  const handleIniciarProcessoEnvio = () => {
    router.push('/trocas/1/processo');
  };

  return (
    <div className={styles.paginaBg}>
      <div className={styles.container}>
        
        {/* BARRA SUPERIOR DE NAVEGAÇÃO / VOLTAR */}
        <div className={styles.topBar}>
          <button 
            onClick={() => router.back()} 
            className={styles.btnNavVoltar}
          >
            ← Voltar para a Tela Anterior
          </button>

          <button 
            onClick={() => router.push('/')} 
            className={styles.btnNavInicio}
          >
            🏠 Ir para o Início
          </button>
        </div>

        {/* CABEÇALHO COM AVATARES */}
        <header className={styles.headerProposta}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>G</div>
            <div>
              <span className={styles.userRole}>Proponente</span>
              <h2 className={styles.userName}>Gustavo G.</h2>
            </div>
          </div>

          <div className={styles.trocaIcone}>
            <span>🔄</span>
            <span className={styles.badgeStatus}>Em Negociação</span>
          </div>

          <div className={styles.userInfo}>
            <div className={`${styles.avatar} ${styles.avatarParceiro}`}>U</div>
            <div>
              <span className={styles.userRole}>Parceiro</span>
              <h2 className={styles.userName}>Usuário ReUse</h2>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <div className={styles.gridTroca}>
          
          {/* LADO ESQUERDO: SEU HARDWARE */}
          <section className={styles.cardSection}>
            <h3 className={styles.cardTitulo}>1. Seu Item para Troca</h3>
            
            <form className={styles.formGroup}>
              <div className={styles.campo}>
                <label className={styles.label}>Tipo de Hardware</label>
                <select 
                  value={tipoHardware} 
                  onChange={(e) => setTipoHardware(e.target.value)}
                  className={styles.select}
                >
                  <option value="Placa de Vídeo">Placa de Vídeo</option>
                  <option value="Processador">Processador</option>
                  <option value="Memória RAM">Memória RAM</option>
                  <option value="Armazenamento (SSD/HD)">Armazenamento (SSD/HD)</option>
                  <option value="Placa-Mãe">Placa-Mãe</option>
                  <option value="Fonte de Alimentação">Fonte de Alimentação</option>
                  <option value="Periférico">Periférico</option>
                </select>
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>Condição de Uso</label>
                <select 
                  value={condicao} 
                  onChange={(e) => setCondicao(e.target.value)}
                  className={styles.select}
                >
                  <option value="Novo (Na Caixa)">Novo (Na Caixa)</option>
                  <option value="Seminovo (Pouco Uso)">Seminovo (Pouco Uso)</option>
                  <option value="Usado (Bom Estado)">Usado (Bom Estado)</option>
                  <option value="Com Marcas de Uso">Com Marcas de Uso</option>
                </select>
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>Descrição do Componente</label>
                <textarea 
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Informe tempo de uso, especificações técnicas..."
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>Fotos do Componente (Máx. 10MB/foto)</label>
                <div className={styles.uploadBox}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleUploadFotos} 
                    id="foto-upload"
                    className={styles.fileInput}
                  />
                  <label htmlFor="foto-upload" className={styles.uploadBtn}>
                    📁 Importar Fotos do Computador
                  </label>
                </div>

                {erroFoto && <p className={styles.erroText}>{erroFoto}</p>}

                {fotos.length > 0 && (
                  <div className={styles.fotosLista}>
                    {fotos.map((foto, i) => (
                      <div key={i} className={styles.fotoItem}>
                        🖼️ {foto.name} ({(foto.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </section>

          {/* LADO DIREITO: ITEM DO PARCEIRO + CHAT DE NEGOCIAÇÃO */}
          <section className={styles.cardSection}>
            <h3 className={styles.cardTitulo}>2. Item Oferecido por Gustavo G.</h3>
            
            {/* CARD COM A FOTO DO PARCEIRO */}
            <div className={styles.itemParceiroCard}>
              <div className={styles.imagemWrapper}>
                <img 
                  src={itemParceiro.fotoUrl} 
                  alt={itemParceiro.nome} 
                  className={styles.itemFoto}
                />
                <span className={styles.badgeTipo}>{itemParceiro.tipo}</span>
              </div>
              <div className={styles.itemDetalhes}>
                <h4 className={styles.itemNome}>{itemParceiro.nome}</h4>
                <span className={styles.itemCondicao}>Condição: {itemParceiro.condicao}</span>
                <p className={styles.itemDescricao}>{itemParceiro.descricao}</p>
              </div>
            </div>

            <h3 className={styles.cardTituloSub}>Negociação em Tempo Real</h3>
            
            {/* CHAT */}
            <div className={styles.chatBox}>
              <div className={styles.mensagensLista}>
                {mensagens.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`${styles.msgBubble} ${msg.autor === 'Você' ? styles.minhaMsg : styles.parceiroMsg}`}
                  >
                    <div className={styles.msgHeader}>
                      <strong>{msg.autor}</strong>
                      <span>{msg.horario}</span>
                    </div>
                    <p>{msg.texto}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleEnviarMensagem} className={styles.chatForm}>
                <input 
                  type="text" 
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  placeholder="Escreva uma mensagem..."
                  className={styles.chatInput}
                />
                <button type="submit" className={styles.chatSendBtn}>
                  Enviar
                </button>
              </form>
            </div>

            <div className={styles.actionFooter}>
              <button 
                onClick={handleIniciarProcessoEnvio}
                className={styles.btnConfirmar}
              >
                Aceitar Troca e Ir para Empacotamento / Envio →
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './processoTroca.module.css';

export default function ProcessoTrocaPage() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3 | 4>(1);
  const [modalidade, setModalidade] = useState<'CORREIOS' | 'PRESENCIAL'>('CORREIOS');

  // Dados do parceiro de troca
  const parceiro = {
    nome: 'Gustavo Faria Galvão',
    cpf: '***.458.988-**',
    endereco: 'Rua das Palmeiras, 120 - Bloco B, Apto 42',
    cidade: 'Osasco - SP',
    cep: '06010-000',
    agenciaProxima: 'Agência Correios Central Osasco - Rua Primitiva Vianco, 250'
  };

  // Upload de fotos com limite de 10MB
  const [fotosEmbalagem, setFotosEmbalagem] = useState<File[]>([]);
  const [erroFoto, setErroFoto] = useState('');

  // Dados para encontro presencial
  const [pontoEncontro, setPontoEncontro] = useState('Shopping União de Osasco - Praça de Alimentação');
  const [dataHoraEncontro, setDataHoraEncontro] = useState('');

  const handleUploadFotos = (e: ChangeEvent<HTMLInputElement>) => {
    setErroFoto('');
    if (!e.target.files) return;

    const arquivos = Array.from(e.target.files);
    const arquivosValidos: File[] = [];

    for (const file of arquivos) {
      if (file.size > 10 * 1024 * 1024) {
        setErroFoto(`A imagem "${file.name}" ultrapassa o limite de 10MB.`);
        return;
      }
      arquivosValidos.push(file);
    }

    setFotosEmbalagem(prev => [...prev, ...arquivosValidos]);
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

        {/* TIMELINE DE PROGRESSO */}
        <header className={styles.timelineHeader}>
          <div className={`${styles.etapaItem} ${etapaAtual >= 1 ? styles.etapaAtiva : ''}`}>
            <span className={styles.etapaNumero}>1</span>
            <span className={styles.etapaLabel}>Modalidade</span>
          </div>
          <div className={styles.linhaConexao} />
          
          <div className={`${styles.etapaItem} ${etapaAtual >= 2 ? styles.etapaAtiva : ''}`}>
            <span className={styles.etapaNumero}>2</span>
            <span className={styles.etapaLabel}>Dados do Destino</span>
          </div>
          <div className={styles.linhaConexao} />

          <div className={`${styles.etapaItem} ${etapaAtual >= 3 ? styles.etapaAtiva : ''}`}>
            <span className={styles.etapaNumero}>3</span>
            <span className={styles.etapaLabel}>Fotos da Embalagem</span>
          </div>
          <div className={styles.linhaConexao} />

          <div className={`${styles.etapaItem} ${etapaAtual >= 4 ? styles.etapaAtiva : ''}`}>
            <span className={styles.etapaNumero}>4</span>
            <span className={styles.etapaLabel}>Código & Envio</span>
          </div>
        </header>

        {/* CONTEÚDO DAS ETAPAS */}
        <main className={styles.cardMain}>

          {/* ETAPA 1: MODALIDADE */}
          {etapaAtual === 1 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.tituloEtapa}>Como será realizada a entrega dos itens?</h2>
              <p className={styles.subtituloEtapa}>Escolha o método mais conveniente para ambos os lados.</p>

              <div className={styles.opcoesGrid}>
                <div 
                  className={`${styles.opcaoCard} ${modalidade === 'CORREIOS' ? styles.opcaoSelecionada : ''}`}
                  onClick={() => setModalidade('CORREIOS')}
                >
                  <span className={styles.opcaoIcone}>📦</span>
                  <h3>Envio via Correios / Transportadora</h3>
                  <p>Geração de etiqueta automatizada com envio rastreado até o endereço do destinatário.</p>
                </div>

                <div 
                  className={`${styles.opcaoCard} ${modalidade === 'PRESENCIAL' ? styles.opcaoSelecionada : ''}`}
                  onClick={() => setModalidade('PRESENCIAL')}
                >
                  <span className={styles.opcaoIcone}>🤝</span>
                  <h3>Encontro em Local Público</h3>
                  <p>Combine a entrega em um local seguro (shoppings, estações de metrô, etc.).</p>
                </div>
              </div>

              <div className={styles.botoesNavegacao}>
                <button className={styles.btnVoltar} onClick={() => router.back()}>
                  ← Voltar
                </button>
                <button className={styles.btnAvancar} onClick={() => setEtapaAtual(2)}>
                  Confirmar Modalidade e Continuar →
                </button>
              </div>
            </div>
          )}

          {/* ETAPA 2: DADOS DO DESTINO */}
          {etapaAtual === 2 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.tituloEtapa}>Dados de Envio Puxados da Plataforma</h2>
              <p className={styles.subtituloEtapa}>Confira as informações do parceiro registradas no ReUse.</p>

              {modalidade === 'CORREIOS' ? (
                <div className={styles.infoBox}>
                  <div className={styles.infoLinha}><strong>Destinatário:</strong> {parceiro.nome}</div>
                  <div className={styles.infoLinha}><strong>Documento:</strong> {parceiro.cpf}</div>
                  <div className={styles.infoLinha}><strong>Endereço de Entrega:</strong> {parceiro.endereco}</div>
                  <div className={styles.infoLinha}><strong>Cidade / CEP:</strong> {parceiro.cidade} - CEP: {parceiro.cep}</div>
                  <div className={styles.agenciaDestaque}>
                    📍 <strong>Agência Recomendada para Postagem:</strong><br />
                    {parceiro.agenciaProxima}
                  </div>
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <div className={styles.campo}>
                    <label className={styles.label}>Local Público Combinado</label>
                    <input 
                      type="text" 
                      value={pontoEncontro} 
                      onChange={(e) => setPontoEncontro(e.target.value)}
                      className={styles.input} 
                    />
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Data e Horário</label>
                    <input 
                      type="datetime-local" 
                      value={dataHoraEncontro} 
                      onChange={(e) => setDataHoraEncontro(e.target.value)}
                      className={styles.input} 
                    />
                  </div>
                </div>
              )}

              <div className={styles.botoesNavegacao}>
                <button className={styles.btnVoltar} onClick={() => setEtapaAtual(1)}>← Etapa Anterior</button>
                <button className={styles.btnAvancar} onClick={() => setEtapaAtual(3)}>Confirmar Dados →</button>
              </div>
            </div>
          )}

          {/* ETAPA 3: REGISTRO FOTOGRÁFICO */}
          {etapaAtual === 3 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.tituloEtapa}>Comprovação de Empacotamento Seguro</h2>
              <p className={styles.subtituloEtapa}>
                Suba fotos do componente dentro da caixa protegida antes de selar para garantir total segurança ao processo.
              </p>

              <div className={styles.uploadBox}>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  id="upload-embalagem" 
                  onChange={handleUploadFotos}
                  className={styles.fileInput} 
                />
                <label htmlFor="upload-embalagem" className={styles.uploadBtn}>
                  📸 Anexar Fotos da Embalagem (Máx 10MB por foto)
                </label>
              </div>

              {erroFoto && <p className={styles.erroText}>{erroFoto}</p>}

              {fotosEmbalagem.length > 0 && (
                <div className={styles.fotosGrid}>
                  {fotosEmbalagem.map((f, i) => (
                    <div key={i} className={styles.fotoCard}>
                      📦 {f.name} ({(f.size / (1024 * 1024)).toFixed(2)} MB)
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.botoesNavegacao}>
                <button className={styles.btnVoltar} onClick={() => setEtapaAtual(2)}>← Etapa Anterior</button>
                <button 
                  className={styles.btnAvancar} 
                  onClick={() => {
                    if (fotosEmbalagem.length === 0) {
                      alert('Por favor, anexe pelo menos 1 foto do produto embalado para garantir a segurança da troca.');
                      return;
                    }
                    setEtapaAtual(4);
                  }}
                >
                  Finalizar Empacotamento →
                </button>
              </div>
            </div>
          )}

          {/* ETAPA 4: CONCLUÍDO + VOLTAR PARA O COMEÇO */}
          {etapaAtual === 4 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.tituloEtapa}>🎉 Processo Concluído com Sucesso!</h2>
              <p className={styles.subtituloEtapa}>A etiqueta de envio e o protocolo de segurança foram gerados.</p>

              {modalidade === 'CORREIOS' ? (
                <div className={styles.codigoBox}>
                  <span className={styles.codigoLabel}>Código de Postagem ReUse / Correios:</span>
                  <div className={styles.codigoValor}>RU-8849-2026-SP</div>
                  <p className={styles.codigoInstrucao}>
                    Apresente este código na agência <strong>{parceiro.agenciaProxima}</strong>. Não é necessário pagar taxa de envio (já coberta pelo programa ReUse Circula).
                  </p>
                </div>
              ) : (
                <div className={styles.codigoBox}>
                  <span className={styles.codigoLabel}>Protocolo de Encontro Presencial:</span>
                  <div className={styles.codigoValor}>REUSE-PRESENCIAL-9912</div>
                  <p className={styles.codigoInstrucao}>
                    Encontro agendado em: <strong>{pontoEncontro}</strong>.<br />
                    Apresente o código ao parceiro durante a entrega do hardware.
                  </p>
                </div>
              )}

              {/* BOTÃO PARA VOLTAR AO COMEÇO (HOME) */}
              <button className={styles.btnFinalizar} onClick={() => router.push('/')}>
                🏠 Voltar para a Página Inicial
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
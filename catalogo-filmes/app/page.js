"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css'; // Ajuste o caminho do CSS conforme necessário
import Image from 'next/image';

export default function HomePage() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const res = await fetch('/api/filmes');
        if (!res.ok) throw new Error('Erro ao buscar filmes');
        const data = await res.json();
        setFilmes(data);
      } catch (error) {
        setError('Não foi possível carregar os filmes.');
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilmes();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
          <p>Filmes Loctor</p>
        </div>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Pesquisar" />
          <button className={styles.searchButton}>Pesquisar</button>
        </div>
        <div className={styles.navLinks}>
          <a href="/categoria">Categoria</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/login">Entrar</a>
          <a href="/register">Cadastrar</a>
        </div>
      </header>
      
      {/* Main Content */}
      <main className={styles.mainContent}>
        <h1>Filmes Adicionados</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : filmes.length > 0 ? (
          <div className={styles.movieList}>
            {filmes.map((filme) => (
              <div key={filme._id} className={styles.movieItem}>
                <Image
                  src={filme.imagem || '/movie-placeholder.jpg'}
                  alt={filme.titulo || 'Filme'}
                  width={100}
                  height={150}
                />
                <div className={styles.movieDetails}>
                  <h2>{filme.titulo}</h2>
                  <p>{filme.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum filme disponível.</p>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
        </div>
        <div className={styles.footerSlogan}>
          <p>Encontre, Alugue e Divirta-se – Filmes Incríveis ao Seu Alcance.</p>
        </div>
      </footer>
    </div>
  );
}

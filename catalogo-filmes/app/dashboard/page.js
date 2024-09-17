"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'; // Ajuste o caminho do CSS conforme necessário
import Image from 'next/image';

export default function Dashboard() {
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avaliacao, setAvaliacao] = useState(0); // Estado para a nota de avaliação
  const [filmeSelecionado, setFilmeSelecionado] = useState(null); // Armazena o filme a ser avaliado
  const [popupVisible, setPopupVisible] = useState(false); // Estado para exibir o popup
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setNomeUsuario({ nomeUsuario: 'Usuário Exemplo' });
    }
  }, [router]);

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

  const handleAvaliar = (filme) => {
    setFilmeSelecionado(filme);
    setPopupVisible(true); // Exibe o popup
  };

  const submitAvaliacao = async () => {
    try {
      const res = await fetch(`/api/filmes/${filmeSelecionado._id}/avaliar`, {
        method: 'PATCH', // Usar PATCH para atualizar a avaliação
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nota: avaliacao }), // Enviar a avaliação correta
      });
      if (!res.ok) throw new Error('Erro ao enviar avaliação');
      setPopupVisible(false); // Fecha o popup após a avaliação
      alert('Avaliação enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao avaliar o filme:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Olá, {nomeUsuario?.nomeUsuario || 'Usuário'}</p>
      </header>

      <main className={styles.mainContent}>
        <h2>Filmes Adicionados</h2>
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
                  <h3>{filme.titulo}</h3>
                  <p>{filme.descricao}</p>
                  <button onClick={() => handleAvaliar(filme)}>Avaliar</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum filme disponível.</p>
        )}

        {popupVisible && (
          <div className={styles.popup}>
            <h2>Aliavar {filmeSelecionado?.titulo}</h2>
            <input
              type="number"
              min="0"
              max="5"
              value={avaliacao}
              onChange={(e) => setAvaliacao(e.target.value)}
            />
            <button onClick={submitAvaliacao}>Enviar Avaliação</button>
            <button onClick={() => setPopupVisible(false)}>Cancelar</button>
          </div>
        )}
      </main>
    </div>
  );
}

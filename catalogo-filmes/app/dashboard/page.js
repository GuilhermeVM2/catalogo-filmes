"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'; // Ajuste o caminho do CSS conforme necessário

export default function Dashboard() {
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login'); // Redireciona para a página de login se não estiver autenticado
    } else {
      // Você pode adicionar uma lógica aqui para buscar dados do usuário
      setNomeUsuario({ nomeUsuario: '' }); // Exemplo de dados do usuário
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Olá, {nomeUsuario?.nomeUsuario || 'Usuário'}</p>
        {/* Aqui você pode adicionar mais informações e funcionalidades do dashboard */}
      </header>
      <main className={styles.mainContent}>
        <p>Conteúdo do Dashboard</p>
        {/* Adicione mais conteúdo e funcionalidades conforme necessário */}
      </main>
      
    </div>
    
  );

  

}


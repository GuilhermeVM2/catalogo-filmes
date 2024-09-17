'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FilmesPage() {
  const [filmes, setFilmes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFilmes = async () => {
      const response = await fetch('/api/filmes');
      if (response.ok) {
        const data = await response.json();
        setFilmes(data.filmes);
      } else {
        router.push('/login');
      }
    };

    fetchFilmes();
  }, [router]);

  return (
    <div>
      <h1>Lista de Filmes</h1>
      <ul>
        {filmes.map((filme) => (
          <li key={filme._id}>
            {filme.titulo}
            <button onClick={() => router.push(`/filmes/${filme._id}`)}>Ver Detalhes</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

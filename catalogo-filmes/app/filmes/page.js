'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function FilmeDetalhes() {
  const [filme, setFilme] = useState(null);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchFilme = async () => {
      const response = await fetch(`/api/filmes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFilme(data.filme);
        setComentarios(data.comentarios);
      } else {
        router.push('/login');
      }
    };

    fetchFilme();
  }, [id, router]);

  const addComentario = async () => {
    const response = await fetch(`/api/filmes/${id}/comentarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comentario }),
    });

    if (response.ok) {
      const data = await response.json();
      setComentarios([...comentarios, data.comentario]);
      setComentario('');
    }
  };

  return (
    <div>
      {filme ? (
        <>
          <h1>{filme.titulo}</h1>
          <p>{filme.descricao}</p>

          <h2>Comentários</h2>
          <ul>
            {comentarios.map((coment, index) => (
              <li key={index}>{coment.texto}</li>
            ))}
          </ul>

          <input
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Deixe um comentário"
          />
          <button onClick={addComentario}>Enviar</button>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

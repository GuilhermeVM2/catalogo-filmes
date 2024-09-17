import { jwtMiddleware } from "@/utils/middleware";
import { listarFilmes, adicionarFilme, comentarFilme } from "@/controllers/FilmeController";
import Filme from '@/models/Filme'; // Ajuste o caminho conforme necessário
import connectMongo from '@/utils/dbConnect'; // Ajuste o caminho conforme necessário

export async function GET() {
  try {
    await connectMongo(); // Conectar ao MongoDB

    const filmes = await Filme.find(); // Buscar todos os filmes

    return new Response(JSON.stringify(filmes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return new Response(
      JSON.stringify({ message: 'Erro ao buscar filmes' }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongo(); // Conectar ao MongoDB

    const { titulo, descricao, comentarios } = await request.json(); // Extrair dados do corpo da requisição

    if (!titulo || !descricao || !comentarios) {
      return new Response(
        JSON.stringify({ message: 'Todos os campos são obrigatórios' }),
        { status: 400 }
      );
    }

    const novoFilme = new Filme({
      titulo,
      descricao,
      comentarios,
    });

    await novoFilme.save(); // Salvar o novo filme no banco de dados

    return new Response(JSON.stringify({ message: 'Filme criado com sucesso', filme: novoFilme }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    return new Response(
      JSON.stringify({ message: 'Erro ao criar filme' }),
      { status: 500 }
    );
  }
}

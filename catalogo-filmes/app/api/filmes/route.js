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
      avaliacoes: [], // Inicializa o array de avaliações
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

export async function PUT(request) {
  try {
    await connectMongo(); // Conectar ao MongoDB

    const { id, avaliacao } = await request.json(); // Recebe o ID do filme e a nova avaliação individual

    if (!id || !avaliacao) {
      return new Response(
        JSON.stringify({ message: 'ID do filme e avaliação são obrigatórios' }),
        { status: 400 }
      );
    }

    // Buscar o filme pelo ID
    const filme = await Filme.findById(id);

    if (!filme) {
      return new Response(
        JSON.stringify({ message: 'Filme não encontrado' }),
        { status: 404 }
      );
    }

    // Adicionar a nova avaliação ao array de avaliações
    filme.avaliacoes.push(avaliacao);

    // Salvar as alterações no banco de dados
    await filme.save();

    return new Response(
      JSON.stringify({ message: 'Avaliação adicionada com sucesso', filme }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error);
    return new Response(
      JSON.stringify({ message: 'Erro ao adicionar avaliação' }),
      { status: 500 }
    );
  }
}

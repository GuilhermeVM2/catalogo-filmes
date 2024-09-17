import Usuario from '@/models/Usuario'; // Certifique-se de que o caminho está correto
import connectMongo from '@/utils/dbConnect'; // Certifique-se de que o caminho está correto
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Exportação nomeada para o método POST
export async function POST(req) {
  const { nomeUsuario, senha } = await req.json(); // Adicione o `await` para obter os dados do corpo da requisição

  if (!nomeUsuario || !senha) {
    return new Response(
      JSON.stringify({ message: 'Preencha todos os campos' }),
      { status: 400 }
    );
  }

  try {
    await connectMongo(); // Conectando ao MongoDB

    const user = await Usuario.findOne({ nomeUsuario: nomeUsuario });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Usuário não encontrado' }),
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: 'Senha incorreta' }),
        { status: 400 }
      );
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user._id, nomeUsuario: user.nomeUsuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(
      JSON.stringify({ message: 'Login bem-sucedido', token }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao realizar o login:', error);
    return new Response(
      JSON.stringify({ message: 'Erro no servidor. Tente novamente mais tarde.' }),
      { status: 500 }
    );
  }
}

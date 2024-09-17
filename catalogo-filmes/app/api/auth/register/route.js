import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Usuario from '@/models/Usuario'; // Certifique-se de que o caminho está correto
import connectMongo from '@/utils/dbConnect'; // Certifique-se de que o caminho está correto

export async function POST(request) {
  const { nomeUsuario, senha } = await request.json();

  if (!nomeUsuario || !senha) {
    return NextResponse.json({ message: 'Preencha todos os campos' }, { status: 400 });
  }

  try {
    await connectMongo(); // Conectando ao MongoDB

    const newUser = new Usuario({
      nomeUsuario,
      senha
    });

    await newUser.save();

    return NextResponse.json({ message: 'Usuário registrado com sucesso' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    return NextResponse.json({ message: 'Erro no servidor. Tente novamente mais tarde.' }, { status: 500 });
  }
}

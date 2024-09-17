import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new mongoose.Schema({
  nomeUsuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

// Hash da senha antes de salvar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para comparar senhas
UsuarioSchema.methods.compararSenha = function (senhaCandidata) {
  return bcrypt.compare(senhaCandidata, this.senha);
};

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);
export default Usuario;

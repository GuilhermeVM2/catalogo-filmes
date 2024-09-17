import mongoose from "mongoose";

const FilmeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    comentarios: [{ type: String }]
});

const Filme = mongoose.models.Filme || mongoose.model('Filme', FilmeSchema);
export default Filme;


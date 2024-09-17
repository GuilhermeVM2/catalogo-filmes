import mongoose from "mongoose";

const FilmeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    comentarios: [{ type: String }],
    avaliacoes: [{ 
        type: Number, 
        required: true, 
        min: 0, 
        max: 5 
    }] // Array de notas entre 0 e 5
});

const Filme = mongoose.models.Filme || mongoose.model('Filme', FilmeSchema);
export default Filme;

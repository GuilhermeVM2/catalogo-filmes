import Filme from "@/models/Filme";
import connectMongo from "@/utils/dbConnect";

export const listarFilmes = async (req, res) => {
    await connectMongo();
    try {
        const filmes = await Filme.find();
        res.status(200).json({ filmes });
    } catch (erro) {
        res.status(500).json({ erro });
    }
};

export const adicionarFilme = async (req, res) => {
    const { titulo, descricao } = req.body;
    await connectMongo();
    try {
        const novoFilme = new Filme({
            titulo,
            descricao,
            usuarioId: req.usuario.usuarioId
        });
        await novoFilme.save();
        res.status(201).json({ filme: novoFilme });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao adicionar filme' });
    }
};

export const comentarFilme = async (req, res) => {
    const { id } = req.query;
    const { comentario } = req.body;
    await connectMongo();
    try {
        const filme = await Filme.findById(id);
        if (!filme) return res.status(404).json({ mensagem: 'Filme não encontrado' });
        filme.comentarios.push(comentario);
        await filme.save();
        res.status(200).json({ filme });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao comentar' });
    }
};

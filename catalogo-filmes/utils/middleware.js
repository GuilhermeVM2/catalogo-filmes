import jwt from 'jsonwebtoken';

export const jwtMiddleware = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensagem: 'Token ausente ou inválido' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
};

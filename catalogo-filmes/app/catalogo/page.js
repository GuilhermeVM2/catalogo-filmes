import Image from 'next/image';
import styles from '../page.module.css'; // Ajuste o caminho conforme necessário
import Link from 'next/link'; // Importar Link do Next.js para navegação

export default function CatalogoPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
          <p>Filmes Loctor</p>
        </div>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Pesquisar" />
          <button className={styles.searchButton}>Pesquisar</button>
        </div>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link> {/* Link para a página inicial */}
          <Link href="/categoria">Categoria</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/login">Entrar</Link>
          <Link href="/register">Cadastrar</Link>
        </div>
      </header>
      
      <main className={styles.mainContent}>
        <h1>Catálogo de Filmes</h1>
        <ul>
          <li><a href="/filme/1">Filme 1</a></li>
          <li><a href="/filme/2">Filme 2</a></li>
          <li><a href="/filme/3">Filme 3</a></li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
        </div>
        <div className={styles.footerSlogan}>
          <p>Encontre, Alugue e Divirta-se – Filmes Incríveis ao Seu Alcance.</p>
        </div>
      </footer>
    </div>
  );
}

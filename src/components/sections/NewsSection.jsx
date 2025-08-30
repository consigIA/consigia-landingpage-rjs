import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

// Mantido igual - início
class NewsService {
  constructor() {
    this.newsApiKey = import.meta.env.VITE_NEWSAPI_KEY;
    this.newsDataApiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
  }

  async fetchTechNews() {
    try {
      const newsDataUrl = `https://newsdata.io/api/1/news?apikey=${this.newsDataApiKey}&q=chatbots&language=pt`;
      const newsDataResponse = await fetch(newsDataUrl);
      const newsData = await newsDataResponse.json();
      
      if (newsData.results?.length > 0) {
        return this.formatNewsDataResults(newsData.results);
      }
    } catch (error) {
      console.error("Erro na NewsData.io:", error);
    }

    try {
      const newsApiUrl = `https://newsapi.org/v2/top-headlines?q=chatbots&language=pt&apiKey=${this.newsApiKey}`;
      const newsApiResponse = await fetch(newsApiUrl);
      const newsApiData = await newsApiResponse.json();
      
      if (newsApiData.articles?.length > 0) {
        return this.formatNewsApiResults(newsApiData.articles);
      }
    } catch (error) {
      console.error("Erro na NewsAPI:", error);
    }

    return [];
  }

  formatNewsApiResults(articles) {
    return articles.slice(0, 6).map((article, index) => ({
      id: `newsapi-${index}-${Date.now()}`,
      title: article.title,
      summary: article.description || "Clique para ler mais...",
      date: this.formatDate(article.publishedAt),
      source: article.source?.name || "Fonte desconhecida",
      url: article.url,
      category: this.detectCategory(article),
      isNew: this.isRecent(article.publishedAt)
    }));
  }

  formatNewsDataResults(results) {
    return results.slice(0, 6).map((item, index) => ({
      id: `newsdata-${index}-${Date.now()}`,
      title: item.title,
      summary: item.description || "Clique para ler mais...",
      date: this.formatDate(item.pubDate),
      source: item.source_id || "Fonte desconhecida",
      url: item.link || "#",
      category: this.detectCategory(item),
      isNew: this.isRecent(item.pubDate)
    }));
  }

  detectCategory(item) {
    const content = `${item.title} ${item.description || ''}`.toLowerCase();
    if (content.includes('mercado')) return 'Mercado';
    if (content.includes('inovação') || content.includes('inovacao')) return 'Inovação';
    if (content.includes('pesquisa')) return 'Pesquisa';
    if (content.includes('investimento')) return 'Investimentos';
    return 'Tecnologia';
  }

  formatDate(dateString) {
    if (!dateString) return "Data desconhecida";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return "Data desconhecida";
    }
  }

  isRecent(dateString) {
    if (!dateString) return false;
    try {
      return new Date(dateString) > new Date(Date.now() - 48 * 60 * 60 * 1000);
    } catch {
      return false;
    }
  }
}

const newsService = new NewsService();
// Mantido igual - fim

const NewsCard = ({ news }) => {
  const categoryColors = {
    'Mercado': 'category-mercado',
    'Inovação': 'category-inovacao',
    'Pesquisa': 'category-pesquisa',
    'Investimentos': 'category-investimentos',
    'Tecnologia': 'category-tecnologia'
  };

  return (
    <div className="news-card">
      <div className="news-card-content">
        <div className="news-card-header">
          <span className={`category-tag ${categoryColors[news.category] || categoryColors['Tecnologia']}`}>
            {news.category}
          </span>
          {news.isNew && (
            <span className="recent-badge">
              Recente
            </span>
          )}
        </div>
        
        <h3 className="news-title">
          {news.title}
        </h3>
        
        <p className="news-summary">
          {news.summary}
        </p>
        
        <div className="news-footer">
          <span className="news-date">{news.date}</span>
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="news-source-link"
          >
            {news.source} <ExternalLink className="external-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await newsService.fetchTechNews();
      if (data.length === 0) {
        setError("Nenhuma notícia encontrada nas fontes disponíveis.");
      } else {
        setNews(data);
      }
    } catch (err) {
      setError(err.message || "Erro ao buscar notícias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

   if (loading) {
    return (
      <section className="news-section">
        <div className="news-container">
          <div className="news-header">
            <h2 className="news-title-main">
              Acompanhe as novidades
            </h2>
          </div>

          <div className="loading-container">
            <div className="loading-dots">
              <div className="loading-dot loading-dot-1"></div>
              <div className="loading-dot loading-dot-2"></div>
              <div className="loading-dot loading-dot-3"></div>
            </div>
            <p className="loading-text">Carregando últimas notícias...</p>
          </div>

          <div className="refresh-container">
            <button
              onClick={fetchNews}
              className="refresh-button"
              disabled
            >
              <RefreshCw className="refresh-icon loading-spin" />
              Carregando...
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    const isNotFound = error.includes("Nenhuma notícia encontrada");
    return (
      <section className="news-section">
        <div className="news-container">
          <div className="news-header">
            <h2 className="news-title-main">
              Acompanhe as novidades
            </h2>
          </div>

          <div className="error-container-main">
            <div className={`error-container ${isNotFound ? 'error-container--warning' : 'error-container--error'}`}>
              <AlertCircle className={`error-icon ${isNotFound ? 'error-icon--warning' : 'error-icon--error'}`} />
              <h3 className={`error-title ${isNotFound ? 'error-title--warning' : 'error-title--error'}`}>
                {isNotFound ? 'Nenhuma notícia encontrada' : 'Erro ao carregar notícias'}
              </h3>
              <p className={`error-message ${isNotFound ? 'error-message--warning' : 'error-message--error'}`}>
                {error}
              </p>
            </div>
          </div>

          <div className="refresh-container">
            <button
              onClick={fetchNews}
              className={`refresh-button ${isNotFound ? 'refresh-button--warning' : 'refresh-button--error'}`}
            >
              <RefreshCw className="refresh-icon" />
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="news-section">
        <div className="news-container">
          <div className="news-header">
            <h2 className="news-title-main">
              Acompanhe as novidades
            </h2>
          </div>

          <div className="news-grid">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          <div className="refresh-container">
            <button
              onClick={fetchNews}
              className="refresh-button"
            >
              <RefreshCw className="refresh-icon" />
              Atualizar notícias
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .news-section {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #3b82f6 100%);
          padding: 60px 0px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .loading-container, 
        .error-container-main {
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 64px;
        }

        .news-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at top left, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .news-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 60px;
          position: relative;
          z-index: 1;
        }

        .news-section-space {
          max-width: 1280px;
          padding: 1280px 60px;
          z-index: 1;
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #3b82f6 100%);
          padding: 60px 0px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .news-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .news-title-main {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .news-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(6, 182, 212, 0.1);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          height: 100%;
        }

        .news-card:hover {
          border-color: rgba(6, 182, 212, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(6, 182, 212, 0.15);
        }

        .news-card-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .news-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .category-tag {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .category-mercado {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }

        .category-inovacao {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .category-pesquisa {
          background: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
        }

        .category-investimentos {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }

        .category-tecnologia {
          background: rgba(6, 182, 212, 0.15);
          color: #06b6d4;
        }

        .recent-badge {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .news-title {
          font-size: 18px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .news-summary {
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 16px;
          flex-grow: 1;
          line-height: 1.5;
        }

        .news-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #64748b;
          margin-top: auto;
        }

        .news-date {
          font-weight: 600;
        }

        .news-source-link {
          display: flex;
          align-items: center;
          color: #06b6d4;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .news-source-link:hover {
          color: #0891b2;
        }

        .external-icon {
          width: 14px;
          height: 14px;
          margin-left: 4px;
        }

        /* Loading States - mesma altura que news-grid */
        .loading-container {
          text-align: center;
          margin-bottom: 1280px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loading-dots {
          display: inline-flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .loading-dot {
          width: 12px;
          height: 12px;
          background: #22d3ee;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .loading-dot-1 {
          animation-delay: -0.32s;
        }

        .loading-dot-2 {
          animation-delay: -0.16s;
        }

        .loading-dot-3 {
          animation-delay: 0s;
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          font-weight: 600;
        }

        .loading-spin {
          animation: spin 1s linear infinite;
        }

        /* Error States - mesma altura que news-grid */
        .error-container-main {
          margin-bottom: 64px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-container {
          max-width: 500px;
          text-align: center;
          padding: 48px;
          border-radius: 24px;
          border: 1px solid;
          backdrop-filter: blur(12px);
        }

        .error-container--warning {
          background: rgba(251, 191, 36, 0.1);
          border-color: rgba(251, 191, 36, 0.3);
        }

        .error-container--error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .error-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
        }

        .error-icon--warning {
          color: #fbbf24;
        }

        .error-icon--error {
          color: #ef4444;
        }

        .error-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .error-title--warning {
          color: #fcd34d;
        }

        .error-title--error {
          color: #fca5a5;
        }

        .error-message {
          font-size: 16px;
          margin-bottom: 0;
          line-height: 1.5;
        }

        .error-message--warning {
          color: rgba(251, 191, 36, 0.9);
        }

        .error-message--error {
          color: rgba(239, 68, 68, 0.9);
        }

        .refresh-container {
          display: flex;
          justify-content: center;
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(12px);
        }

        .refresh-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }

        .refresh-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .refresh-button--warning {
          background: rgba(251, 191, 36, 0.2);
          border-color: rgba(251, 191, 36, 0.4);
        }

        .refresh-button--warning:hover {
          background: rgba(251, 191, 36, 0.3);
          border-color: rgba(251, 191, 36, 0.6);
        }

        .refresh-button--error {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
        }

        .refresh-button--error:hover {
          background: rgba(239, 68, 68, 0.3);
          border-color: rgba(239, 68, 68, 0.6);
        }

        .refresh-icon {
          width: 16px;
          height: 16px;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .news-section {
            padding: 60px 0;
          }
          
            .loading-container, 
            .error-container-main {
              min-height: 300px;
              margin-bottom: 48px;
            }

          .news-container {
            padding: 0 16px;
          }

          .news-header {
            margin-bottom: 48px;
          }

          .news-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 48px;
          }

          .loading-container {
            margin-bottom: 48px;
            min-height: 300px;
          }

          .error-container-main {
            margin-bottom: 48px;
            min-height: 300px;
          }

          .news-card {
            padding: 20px;
          }

          .news-title {
            font-size: 16px;
          }

          .news-summary {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .news-grid {
            gap: 20px;
          }

          .news-card {
            padding: 18px;
          }

          .error-container {
            padding: 32px 24px;
          }
        }
      `}</style>
    </>
  );
};

export default NewsSection;
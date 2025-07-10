import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

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
    'Mercado': 'bg-blue-500/20 text-blue-400',
    'Inovação': 'bg-green-500/20 text-green-400',
    'Pesquisa': 'bg-purple-500/20 text-purple-400',
    'Investimentos': 'bg-yellow-500/20 text-yellow-400',
    'Tecnologia': 'bg-cyan-500/20 text-cyan-400'
  };

  return (
    <div className="flex-shrink-0 w-80 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all duration-300 hover:transform hover:scale-95">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[news.category] || categoryColors['Tecnologia']}`}>
            {news.category}
          </span>
          {news.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full">
              Recente
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
          {news.summary}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{news.date}</span>
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {news.source} <ExternalLink className="ml-1 h-4 w-4" />
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

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

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= news.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? news.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <section className="pb-90 pt-79 py-20 relative overflow-hidden bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="mt-4 text-gray-400">Carregando últimas notícias...</p>
        </div>
      </section>
    );
  }

  if (error) {
    const isNotFound = error.includes("Nenhuma notícia encontrada");
    return (
      <section className="pt-50 py-55 relative overflow-hidden bg-slate-900">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className={`${isNotFound ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'} border rounded-2xl p-6 backdrop-blur-sm`}>
            <AlertCircle className={`h-10 w-10 mx-auto mb-3 ${isNotFound ? 'text-yellow-400' : 'text-red-400'}`} />
            <h3 className={`text-lg font-medium mb-2 ${isNotFound ? 'text-yellow-300' : 'text-red-300'}`}>
              {isNotFound ? 'Nenhuma notícia encontrada' : 'Erro ao carregar notícias'}
            </h3>
            <p className={`mb-4 ${isNotFound ? 'text-yellow-400/80' : 'text-red-400/80'}`}>{error}</p>
            <button
              onClick={fetchNews}
              className={`${isNotFound ? 'bg-yellow-500/90 hover:bg-yellow-500' : 'bg-red-500/90 hover:bg-red-500'} text-white px-4 py-2 rounded-lg transition-colors`}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-30 py-20 relative overflow-hidden bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-cyan-400/80 text-lg font-semibold tracking-wider uppercase">
              Notícias
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Acompanhe as{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              novidades
            </span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative px-14">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 p-3 rounded-full shadow-md hover:bg-slate-800 hover:border-cyan-400/50 transition-colors"
            aria-label="Notícia anterior"
          >
            <ChevronLeft className="h-5 w-5 text-cyan-400" />
          </button>

          <div className="overflow-hidden relative">
            <div className="mx-auto"> {/* Ajuste a largura conforme necessário */}
              <div
                ref={carouselRef}
                className="flex transition-transform duration-300 gap-8 px-8" /* Adicionei px-4 para padding */
                style={{ transform: `translateX(-${currentIndex * (320 + 32)}px)` }}
              >
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 p-3 rounded-full shadow-md hover:bg-slate-800 hover:border-cyan-400/50 transition-colors"
            aria-label="Próxima notícia"
          >
            <ChevronRight className="h-5 w-5 text-cyan-400" />
          </button>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={fetchNews}
            className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar notícias
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
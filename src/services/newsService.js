const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

const MOCK_DATA = {
  featured: {
    id: 1,
    title: "Singapore's Economy Shows Resilient Growth",
    excerpt: "GDP expanded by 3.2% year-on-year, beating economists' expectations.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    date: "2h ago",
    author: "Sarah Tan",
    content: `Singapore's economy demonstrated robust resilience in the fourth quarter of 2024, with GDP expanding by 3.2% year-on-year, surpassing market expectations. The positive performance reflects the city-state's strong fundamentals and diversified economic base.

The Ministry of Trade and Industry reported that growth was broad-based, with particular strength in manufacturing and services sectors. The electronics manufacturing cluster showed signs of recovery, while financial services continued steady expansion.

Key sectors driving growth included information and communications, finance and insurance, and wholesale trade. The manufacturing sector grew by 4.1%, marking a significant turnaround from the previous quarter's contraction.

Looking ahead to 2025, MTI maintains a cautiously optimistic outlook, with GDP growth projected at 2-4%. However, uncertainties remain regarding global monetary policy trajectories and geopolitical tensions.`
  },
  articles: [
    {
      id: 2,
      title: "ASEAN Leaders Meet in Jakarta",
      excerpt: "Southeast Asian leaders convene for crucial talks on maritime security and economic cooperation.",
      category: "World",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80",
      date: "3h ago",
      author: "Michael Chen",
      content: "ASEAN leaders gathered in Jakarta for a special summit focused on regional security and economic cooperation."
    },
    {
      id: 3,
      title: "New MRT Line Extension Opens",
      excerpt: "The Thomson-East Coast Line extension provides better connectivity for commuters.",
      category: "Singapore",
      image: "https://images.unsplash.com/photo-1554672723-d42a16e533db?w=800&q=80",
      date: "5h ago",
      author: "Rachel Wong",
      content: "The Land Transport Authority officially opened the latest extension of the Thomson-East Coast Line."
    },
    {
      id: 4,
      title: "Tech Startups Attract Record Funding",
      excerpt: "Venture capital investments reach new heights as the regional tech ecosystem matures.",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      date: "6h ago",
      author: "David Lim",
      content: "Southeast Asian technology startups attracted record venture capital funding this year."
    },
    {
      id: 5,
      title: "Climate Summit: Nations Commit to Net Zero",
      excerpt: "Asia-Pacific leaders announce ambitious carbon reduction targets.",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80",
      date: "8h ago",
      author: "Emma Ng",
      content: "Representatives concluded a landmark climate summit with ambitious net-zero commitments."
    },
    {
      id: 6,
      title: "Innovation in Battery Technology",
      excerpt: "Breakthrough research promises revolutionary advances in energy storage.",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      date: "10h ago",
      author: "James Lee",
      content: "Researchers announced a breakthrough in battery technology for improved energy storage."
    }
  ]
};

class NewsService {
  constructor() {
    this.useMockData = true;
  }

  async simulateDelay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getFeaturedArticle() {
    if (this.useMockData) {
      await this.simulateDelay();
      return MOCK_DATA.featured;
    }
    const response = await fetch(`${API_BASE_URL}/articles/featured`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  }

  async getArticles(filters = {}) {
    if (this.useMockData) {
      await this.simulateDelay();
      let articles = [...MOCK_DATA.articles];
      if (filters.category && filters.category !== 'All') {
        articles = articles.filter(a => a.category === filters.category);
      }
      return articles;
    }
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/articles?${params}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  }

  async subscribeNewsletter(email) {
    if (this.useMockData) {
      await this.simulateDelay();
      return { success: true, message: 'Subscribed!' };
    }
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Failed to subscribe');
    return await response.json();
  }
}

export default new NewsService();

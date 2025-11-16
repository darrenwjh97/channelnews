import React, { useState } from 'react';
import { ChevronRight, Sparkles, Menu, X } from 'lucide-react';
import { useFeaturedArticle, useArticles, useNewsletter } from './hooks/useNews';
import { LoadingSpinner, ErrorMessage, ArticleCard, NewsletterForm } from './components/LoadingSpinner';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { article: featuredArticle, loading: featuredLoading, error: featuredError } = useFeaturedArticle();
  const { articles, loading: articlesLoading, error: articlesError } = useArticles({ category: selectedCategory });
  const { subscribe, loading: newsletterLoading, error: newsletterError, success: newsletterSuccess } = useNewsletter();

  const categories = ['All', 'Singapore', 'World', 'Business', 'Tech', 'Environment'];

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMobileMenuOpen(false);
  };

  const handleNewsletterSubmit = async (email) => {
    await subscribe(email);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer hover:opacity-70 transition-opacity" onClick={handleBackToHome}>
            <Sparkles className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-xl font-semibold">NewsAsia</span>
          </div>
          
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {categories.map(category => (
              <button key={category} onClick={() => handleCategoryClick(category)} className={`text-sm transition-opacity font-medium ${selectedCategory === category ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4">
            {categories.map(category => (
              <button key={category} onClick={() => handleCategoryClick(category)} className={`block w-full text-left py-3 text-sm font-medium ${selectedCategory === category ? 'text-black' : 'text-gray-600'}`}>
                {category}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-16">
        {currentView === 'home' ? (
          <div>
            <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
              {featuredLoading ? (
                <LoadingSpinner size="large" />
              ) : featuredError ? (
                <ErrorMessage message={featuredError} />
              ) : featuredArticle ? (
                <div className="w-full h-full cursor-pointer group" onClick={() => handleArticleClick(featuredArticle)}>
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center h-full flex flex-col justify-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20 mx-auto">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">Featured Story</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">{featuredArticle.title}</h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">{featuredArticle.excerpt}</p>
                    <button className="inline-flex items-center bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 mx-auto">
                      Read the story
                      <ChevronRight className="w-5 h-5 ml-2" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">
                {selectedCategory === 'All' ? 'Latest Stories' : `${selectedCategory} News`}
              </h2>
              
              {articlesLoading ? (
                <LoadingSpinner size="large" />
              ) : articlesError ? (
                <ErrorMessage message={articlesError} />
              ) : articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No articles found in this category.</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {articles.slice(0, 3).map((article) => (
                      <ArticleCard key={article.id} article={article} onClick={() => handleArticleClick(article)} />
                    ))}
                  </div>

                  {articles.length > 3 && (
                    <div className="grid md:grid-cols-2 gap-8">
                      {articles.slice(3, 5).map((article) => (
                        <ArticleCard key={article.id} article={article} onClick={() => handleArticleClick(article)} variant="large" />
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-32">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-16 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Informed Daily</h2>
                  <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Get the latest news and insights delivered to your inbox every morning.</p>
                  <NewsletterForm onSubmit={handleNewsletterSubmit} loading={newsletterLoading} success={newsletterSuccess} error={newsletterError} />
                </div>
              </div>
            </section>
          </div>
        ) : (
          <article className="max-w-3xl mx-auto px-6 py-20">
            <button onClick={handleBackToHome} className="flex items-center text-blue-600 hover:text-blue-700 mb-12 font-semibold group">
              <ChevronRight className="w-5 h-5 rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
              Back to Home
            </button>
            
            {selectedArticle && (
              <>
                <div className="mb-10">
                  <span className="inline-block bg-gray-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide mb-6">{selectedArticle.category}</span>
                  <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{selectedArticle.title}</h1>
                  <div className="flex items-center text-gray-500 mb-10 pb-10 border-b border-gray-200">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{selectedArticle.date}</span>
                    {selectedArticle.author && (
                      <>
                        <span className="mx-3">•</span>
                        <span className="font-medium">{selectedArticle.author}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl mb-12">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-auto" />
                </div>

                <div className="prose prose-xl max-w-none">
                  <p className="text-2xl text-gray-900 leading-relaxed mb-10 font-medium">{selectedArticle.excerpt}</p>
                  {selectedArticle.content && (
                    <div className="text-gray-800 leading-[1.8] space-y-6 text-lg">
                      {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-20 pt-20 border-t border-gray-200">
                  <h2 className="text-3xl font-bold mb-8">Continue Reading</h2>
                  {articlesLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="space-y-6">
                      {articles.slice(0, 2).map(article => (
                        <div key={article.id} className="group cursor-pointer flex gap-6 p-6 rounded-3xl hover:bg-gray-50 transition-all" onClick={() => handleArticleClick(article)}>
                          <div className="relative overflow-hidden rounded-2xl flex-shrink-0 w-40 h-40">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div className="flex-1">
                            <span className="inline-block text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">{article.category}</span>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors leading-tight">{article.title}</h3>
                            <p className="text-gray-600 text-sm">{article.excerpt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </article>
        )}
      </div>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6" strokeWidth={2.5} />
                <span className="text-2xl font-semibold">NewsAsia</span>
              </div>
              <p className="text-gray-600 leading-relaxed">Your trusted source for news and insights across the Asia-Pacific region.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Sections</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                {categories.filter(c => c !== 'All').map(category => (
                  <li key={category} onClick={() => { handleCategoryClick(category); handleBackToHome(); }} className="hover:text-black cursor-pointer transition-colors">{category}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="hover:text-black cursor-pointer transition-colors">About</li>
                <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-black cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="hover:text-black cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-black cursor-pointer transition-colors">Terms</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-300 text-center">
            <p className="text-gray-500 text-sm">Copyright © 2024 NewsAsia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

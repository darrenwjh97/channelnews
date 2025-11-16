import React from 'react';

export const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = { small: 'w-6 h-6', medium: 'w-12 h-12', large: 'w-16 h-16' };
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`} />
    </div>
  );
};

export const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl">
      <p className="font-semibold mb-2">Oops! Something went wrong</p>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export const ArticleCard = ({ article, onClick, variant = 'default' }) => {
  if (variant === 'large') {
    return (
      <div className="group cursor-pointer bg-gray-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" onClick={onClick}>
        <div className="relative overflow-hidden aspect-[16/9]">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1000ms]" loading="lazy" />
        </div>
        <div className="p-8">
          <span className="inline-block bg-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-4">{article.category}</span>
          <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-blue-600 transition-colors">{article.title}</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">{article.excerpt}</p>
          <div className="flex items-center text-sm text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden rounded-3xl mb-5 aspect-[4/5]">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1000ms]" loading="lazy" />
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">{article.category}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors">{article.title}</h3>
      <p className="text-gray-600 mb-3 leading-relaxed">{article.excerpt}</p>
      <div className="flex items-center text-sm text-gray-400">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{article.date}</span>
      </div>
    </div>
  );
};

export const NewsletterForm = ({ onSubmit, loading, success, error }) => {
  const [email, setEmail] = React.useState('');
  const handleSubmit = (e) => { e.preventDefault(); if (email && onSubmit) onSubmit(email); };

  if (success) {
    return <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-full text-white">✓ Thanks for subscribing!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required disabled={loading} className="flex-1 px-6 py-4 rounded-full text-black text-lg focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50" />
        <button type="submit" disabled={loading} className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all whitespace-nowrap text-lg disabled:opacity-50">
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {error && <p className="mt-4 text-red-300 text-sm">{error}</p>}
    </form>
  );
};

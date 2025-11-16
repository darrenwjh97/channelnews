# NewsAsia - Modern News Platform

A modern, responsive news platform built with React and Tailwind CSS, featuring a clean Apple-inspired design and API-ready architecture.

![NewsAsia](https://img.shields.io/badge/React-18.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff)

## 🚀 Features

- **Apple-Inspired Design** - Clean, minimalist interface with smooth animations
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Category Filtering** - Browse news by Singapore, World, Business, Tech, and Environment
- **API-Ready Architecture** - Easy integration with any news API
- **Loading States** - Professional loading spinners and error handling
- **Newsletter Subscription** - Built-in email subscription functionality
- **Performance Optimized** - Fast loading with lazy-loaded images

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Custom Hooks** - Clean state management

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/darrenwjh97/channelnews.git

# Navigate to project directory
cd channelnews

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure
```
channelnews/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── LoadingSpinner.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useNews.js
│   ├── services/        # API service layer
│   │   └── newsService.js
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── public/
└── index.html
```

## 🔌 API Integration

The app currently uses mock data for development. To connect to a real API:

1. Update `src/services/newsService.js`:
```javascript
constructor() {
  this.useMockData = false; // Change to false
}
```

2. Set your API endpoint in `.env`:
```env
VITE_API_URL=https://your-api-domain.com/api
```

### Expected API Endpoints

- `GET /articles/featured` - Get featured article
- `GET /articles?category={category}` - Get articles by category
- `POST /newsletter/subscribe` - Newsletter subscription

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

## 📝 Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_URL=https://your-api-domain.com/api
```

## 🎨 Customization

### Update Categories
Edit categories in `src/App.jsx`:
```javascript
const categories = ['All', 'Singapore', 'World', 'Business', 'Tech', 'Your Category'];
```

### Change Styling
Modify Tailwind classes in components or extend `tailwind.config.js`

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👤 Author

**Darren Wong**
- GitHub: [@darrenwjh97](https://github.com/darrenwjh97)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and Tailwind CSS

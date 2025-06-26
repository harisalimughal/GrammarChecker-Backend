const allowedOrigins = [
  'http://localhost:3000',
  'https://grammar-checker-frontend.vercel.app',
  'https://grammar-checker-frontend-git-main-harisalimughals-projects.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

module.exports = corsOptions; 
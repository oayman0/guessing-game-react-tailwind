import './App.css'
import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Smartphone, Trophy, Shuffle, Eye, Plus, Minus, RotateCcw } from 'lucide-react';

// Game data - we'll expand this incrementally
const GAME_CATEGORIES = [
  { id: 'football-players', name: 'Football Players', icon: '⚽', color: 'bg-green-500' },
  { id: 'countries', name: 'Countries', icon: '🌍', color: 'bg-blue-500' },
  { id: 'movies', name: 'Movies', icon: '🎬', color: 'bg-purple-500' },
  { id: 'famous-people', name: 'Famous People', icon: '⭐', color: 'bg-yellow-500' },
  { id: 'fruits-veggies', name: 'Fruits & Veggies', icon: '🍎', color: 'bg-red-500' },
  { id: 'video-games', name: 'Video Games', icon: '🎮', color: 'bg-indigo-500' },
  { id: 'supermarket', name: 'Supermarket Items', icon: '🛒', color: 'bg-orange-500' },
  { id: 'capitals', name: 'World Capitals', icon: '🏛️', color: 'bg-gray-500' },
  { id: 'tv-series', name: 'TV Series', icon: '📺', color: 'bg-pink-500' },
  { id: 'football-teams', name: 'Football Teams', icon: '🏆', color: 'bg-emerald-500' },
];

// Sample data for each category (10 items each)
const CATEGORY_DATA = {
  'football-players': [
    { id: 1, name: 'Lionel Messi', details: 'Argentine forward, 8-time Ballon d\'Or winner', image: 'https://via.placeholder.com/300x400/0084FF/FFFFFF?text=Messi' },
    { id: 2, name: 'Cristiano Ronaldo', details: 'Portuguese forward, 5-time Ballon d\'Or winner', image: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Ronaldo' },
    { id: 3, name: 'Kylian Mbappé', details: 'French forward, Paris Saint-Germain', image: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Mbappe' },
    { id: 4, name: 'Erling Haaland', details: 'Norwegian striker, Manchester City', image: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Haaland' },
    { id: 5, name: 'Kevin De Bruyne', details: 'Belgian midfielder, Manchester City', image: 'https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=De+Bruyne' },
    { id: 6, name: 'Neymar Jr', details: 'Brazilian forward, Al-Hilal', image: 'https://via.placeholder.com/300x400/FFEAA7/000000?text=Neymar' },
    { id: 7, name: 'Mohamed Salah', details: 'Egyptian winger, Liverpool FC', image: 'https://via.placeholder.com/300x400/FD79A8/FFFFFF?text=Salah' },
    { id: 8, name: 'Virgil van Dijk', details: 'Dutch defender, Liverpool FC', image: 'https://via.placeholder.com/300x400/6C5CE7/FFFFFF?text=Van+Dijk' },
    { id: 9, name: 'Luka Modrić', details: 'Croatian midfielder, Real Madrid', image: 'https://via.placeholder.com/300x400/A29BFE/FFFFFF?text=Modric' },
    { id: 10, name: 'Robert Lewandowski', details: 'Polish striker, FC Barcelona', image: 'https://via.placeholder.com/300x400/E17055/FFFFFF?text=Lewandowski' },
  ],
  'countries': [
    { id: 1, name: 'Japan', details: 'Island nation in East Asia, known for technology and culture', image: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Japan' },
    { id: 2, name: 'Brazil', details: 'Largest country in South America, famous for football and Amazon', image: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Brazil' },
    { id: 3, name: 'Norway', details: 'Scandinavian country known for fjords and northern lights', image: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Norway' },
    { id: 4, name: 'Egypt', details: 'Ancient civilization, home to pyramids and the Nile River', image: 'https://via.placeholder.com/300x400/FFEAA7/000000?text=Egypt' },
    { id: 5, name: 'Australia', details: 'Continent country, known for unique wildlife and outback', image: 'https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=Australia' },
    { id: 6, name: 'Canada', details: 'Second largest country by area, known for maple syrup', image: 'https://via.placeholder.com/300x400/FD79A8/FFFFFF?text=Canada' },
    { id: 7, name: 'India', details: 'Most populous country, birthplace of yoga and curry', image: 'https://via.placeholder.com/300x400/6C5CE7/FFFFFF?text=India' },
    { id: 8, name: 'Iceland', details: 'Nordic island nation known for geysers and glaciers', image: 'https://via.placeholder.com/300x400/A29BFE/FFFFFF?text=Iceland' },
    { id: 9, name: 'Morocco', details: 'North African country, gateway between Africa and Europe', image: 'https://via.placeholder.com/300x400/E17055/FFFFFF?text=Morocco' },
    { id: 10, name: 'South Korea', details: 'East Asian country, global leader in technology and K-pop', image: 'https://via.placeholder.com/300x400/00B894/FFFFFF?text=S.Korea' },
  ],
  'movies': [
    { id: 1, name: 'The Godfather', details: '1972 crime epic directed by Francis Ford Coppola', image: 'https://via.placeholder.com/300x400/2D3436/FFFFFF?text=Godfather' },
    { id: 2, name: 'Titanic', details: '1997 romantic disaster film starring Leonardo DiCaprio', image: 'https://via.placeholder.com/300x400/0984e3/FFFFFF?text=Titanic' },
    { id: 3, name: 'Avatar', details: '2009 sci-fi epic set on alien world Pandora', image: 'https://via.placeholder.com/300x400/00cec9/FFFFFF?text=Avatar' },
    { id: 4, name: 'The Dark Knight', details: '2008 Batman film featuring Heath Ledger as Joker', image: 'https://via.placeholder.com/300x400/2d3436/FFFFFF?text=Dark+Knight' },
    { id: 5, name: 'Forrest Gump', details: '1994 drama starring Tom Hanks as unlikely hero', image: 'https://via.placeholder.com/300x400/6c5ce7/FFFFFF?text=Forrest+Gump' },
    { id: 6, name: 'Inception', details: '2010 mind-bending thriller about dreams within dreams', image: 'https://via.placeholder.com/300x400/a29bfe/FFFFFF?text=Inception' },
    { id: 7, name: 'The Lion King', details: '1994 Disney animated classic about young lion Simba', image: 'https://via.placeholder.com/300x400/fdcb6e/000000?text=Lion+King' },
    { id: 8, name: 'Pulp Fiction', details: '1994 Tarantino crime film with non-linear narrative', image: 'https://via.placeholder.com/300x400/e17055/FFFFFF?text=Pulp+Fiction' },
    { id: 9, name: 'The Matrix', details: '1999 sci-fi action film about simulated reality', image: 'https://via.placeholder.com/300x400/00b894/FFFFFF?text=Matrix' },
    { id: 10, name: 'Star Wars', details: '1977 space opera that launched iconic franchise', image: 'https://via.placeholder.com/300x400/fd79a8/FFFFFF?text=Star+Wars' },
  ],
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [gameCode, setGameCode] = useState('PLAY123');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [players, setPlayers] = useState({ player1: 'Player 1', player2: 'Player 2' });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  // Load saved data on mount
  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('guessing-game-players') || '{}');
    const savedScores = JSON.parse(localStorage.getItem('guessing-game-scores') || '{}');
    
    if (Object.keys(savedPlayers).length > 0) setPlayers(savedPlayers);
    if (Object.keys(savedScores).length > 0) setScores(savedScores);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('guessing-game-players', JSON.stringify(players));
    localStorage.setItem('guessing-game-scores', JSON.stringify(scores));
  }, [players, scores]);

  const shuffleCard = () => {
    if (!selectedCategory) return;
    const categoryData = CATEGORY_DATA[selectedCategory.id] || [];
    const randomCard = categoryData[Math.floor(Math.random() * categoryData.length)];
    setCurrentCard(randomCard);
    setCardRevealed(false);
  };

  const updateScore = (player, delta) => {
    setScores(prev => ({
      ...prev,
      [player]: Math.max(0, prev[player] + delta)
    }));
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0 });
  };

  const updatePlayerName = (player, name) => {
    setPlayers(prev => ({
      ...prev,
      [player]: name || `Player ${player === 'player1' ? '1' : '2'}`
    }));
  };

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col">
        {/* Navbar */}
        <nav className="w-full p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => setCurrentPage('landing')}>
              🎯 GuessIt
            </h1>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to GuessIt!</h2>
            <p className="text-white/80 mb-8">The ultimate social guessing game</p>
            
            {/* Game Modes */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-white/90">
                <Users className="w-5 h-5" />
                <span className="text-sm">Single device party mode</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm">Dual phone competitive mode</span>
              </div>
            </div>

            {/* Game Code Input */}
            <div className="mb-6">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="Enter game code"
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Enter Game Button */}
            <button
              onClick={() => setCurrentPage('categories')}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              <span>Start Playing</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 text-center text-white/60 text-sm">
          Made with ❤️ for fun social gaming
        </footer>
      </div>
    );
  }

  // Categories Page
  if (currentPage === 'categories') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="w-full p-4 bg-white shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => setCurrentPage('landing')}>
              🎯 GuessIt
            </h1>
          </div>
        </nav>

        {/* Categories Grid */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose a Category</h2>
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {GAME_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage('game');
                  // Set initial card
                  const categoryData = CATEGORY_DATA[category.id] || [];
                  if (categoryData.length > 0) {
                    const randomCard = categoryData[Math.floor(Math.random() * categoryData.length)];
                    setCurrentCard(randomCard);
                    setCardRevealed(false);
                  }
                }}
                className={`${category.color} text-white p-6 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-between`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game Page
  if (currentPage === 'game' && selectedCategory && currentCard) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="w-full p-4 bg-white shadow-sm">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => setCurrentPage('landing')}>
              🎯 GuessIt
            </h1>
            <p className="text-sm text-gray-600">{selectedCategory.name}</p>
          </div>
        </nav>

        <div className="p-4 max-w-md mx-auto">
          {/* Scoreboard */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 relative">
            <button
              onClick={resetScores}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Player 1 */}
              <div className="text-center">
                <input
                  type="text"
                  value={players.player1}
                  onChange={(e) => updatePlayerName('player1', e.target.value)}
                  className="w-full text-center font-semibold text-gray-800 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                />
                <div className="text-3xl font-bold text-blue-600 mb-2">{scores.player1}</div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updateScore('player1', 1)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore('player1', -1)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Player 2 */}
              <div className="text-center">
                <input
                  type="text"
                  value={players.player2}
                  onChange={(e) => updatePlayerName('player2', e.target.value)}
                  className="w-full text-center font-semibold text-gray-800 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                />
                <div className="text-3xl font-bold text-purple-600 mb-2">{scores.player2}</div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updateScore('player2', 1)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore('player2', -1)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Image Container */}
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={currentCard.image}
                alt={cardRevealed ? currentCard.name : 'Mystery item'}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card Info */}
            <div className="p-4">
              {cardRevealed ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentCard.name}</h3>
                  <p className="text-gray-600">{currentCard.details}</p>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">???</h3>
                  <p className="text-gray-400">Ask questions to guess!</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={shuffleCard}
              className="bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
            >
              <Shuffle className="w-5 h-5" />
              <span>New Card</span>
            </button>
            
            <button
              onClick={() => setCardRevealed(!cardRevealed)}
              className="bg-purple-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>{cardRevealed ? 'Hide' : 'Reveal'}</span>
            </button>
          </div>

          {/* Back to Categories */}
          <button
            onClick={() => setCurrentPage('categories')}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}

export default App;
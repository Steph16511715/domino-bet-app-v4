
import React, { useState, useEffect } from 'react';
import { User, Phone, DollarSign, Users, Trophy, Settings, Globe, MessageCircle, UserPlus, UserX, Play, Home } from 'lucide-react';

const DominoBetApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('fr');
  const [gameMode, setGameMode] = useState(null);
  const [balance, setBalance] = useState(100);
  const [currentBet, setCurrentBet] = useState(10);
  const [gameState, setGameState] = useState('waiting');
  const [players, setPlayers] = useState([]);

  // Translations
  const translations = {
    fr: {
      appName: "Domino Bet",
      login: "Connexion",
      register: "S'inscrire",
      name: "Nom",
      phone: "Téléphone",
      confirm: "Confirmer",
      balance: "Solde",
      bet: "Mise",
      commission: "Commission (5%)",
      gameMode: "Mode de Jeu",
      faceToFace: "Face à Face",
      dogEatDog: "Chien Mange Chien",
      partnerDomino: "Domino Associé",
      joinGame: "Rejoindre",
      waiting: "En attente...",
      playing: "En cours",
      addFriend: "Ajouter ami",
      blockUser: "Bloquer",
      settings: "Paramètres",
      language: "Langue",
      increaseBet: "Augmenter mise x10",
      currentBet: "Mise actuelle",
      logout: "Déconnexion",
      save: "Sauvegarder"
    },
    ht: {
      appName: "Domino Bet",
      login: "Konekte",
      register: "Enskri",
      name: "Non",
      phone: "Telefòn",
      confirm: "Konfime",
      balance: "Balans",
      bet: "Miz",
      commission: "Komisyon (5%)",
      gameMode: "Mòd Jwèt",
      faceToFace: "Fas a Fas",
      dogEatDog: "Chyen Manje Chyen",
      partnerDomino: "Domino Asosye",
      joinGame: "Antre",
      waiting: "N ap tann...",
      playing: "N ap jwe",
      addFriend: "Ajoute zanmi",
      blockUser: "Bloke",
      settings: "Paramèt",
      language: "Lang",
      increaseBet: "Ogmante miz x10",
      currentBet: "Miz kounye a",
      logout: "Dekonekte",
      save: "Sove"
    },
    en: {
      appName: "Domino Bet",
      login: "Login",
      register: "Register",
      name: "Name",
      phone: "Phone",
      confirm: "Confirm",
      balance: "Balance",
      bet: "Bet",
      commission: "Commission (5%)",
      gameMode: "Game Mode",
      faceToFace: "Face to Face",
      dogEatDog: "Dog Eat Dog",
      partnerDomino: "Partner Domino",
      joinGame: "Join",
      waiting: "Waiting...",
      playing: "Playing",
      addFriend: "Add Friend",
      blockUser: "Block",
      settings: "Settings",
      language: "Language",
      increaseBet: "Increase bet x10",
      currentBet: "Current bet",
      logout: "Logout",
      save: "Save"
    },
    es: {
      appName: "Domino Bet",
      login: "Iniciar sesión",
      register: "Registrarse",
      name: "Nombre",
      phone: "Teléfono",
      confirm: "Confirmar",
      balance: "Saldo",
      bet: "Apuesta",
      commission: "Comisión (5%)",
      gameMode: "Modo de Juego",
      faceToFace: "Cara a Cara",
      dogEatDog: "Perro Come Perro",
      partnerDomino: "Dominó Asociado",
      joinGame: "Unirse",
      waiting: "Esperando...",
      playing: "Jugando",
      addFriend: "Agregar amigo",
      blockUser: "Bloquear",
      settings: "Configuración",
      language: "Idioma",
      increaseBet: "Aumentar apuesta x10",
      currentBet: "Apuesta actual",
      logout: "Cerrar sesión",
      save: "Guardar"
    },
    pt: {
      appName: "Domino Bet",
      login: "Entrar",
      register: "Registrar",
      name: "Nome",
      phone: "Telefone",
      confirm: "Confirmar",
      balance: "Saldo",
      bet: "Aposta",
      commission: "Comissão (5%)",
      gameMode: "Modo de Jogo",
      faceToFace: "Cara a Cara",
      dogEatDog: "Cão Come Cão",
      partnerDomino: "Dominó Associado",
      joinGame: "Entrar",
      waiting: "Aguardando...",
      playing: "Jogando",
      addFriend: "Adicionar amigo",
      blockUser: "Bloquear",
      settings: "Configurações",
      language: "Idioma",
      increaseBet: "Aumentar aposta x10",
      currentBet: "Aposta atual",
      logout: "Sair",
      save: "Salvar"
    }
  };

  const t = translations[language];

  // Domino pieces
  const createDominoPieces = () => {
    const pieces = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        pieces.push([i, j]);
      }
    }
    return pieces;
  };

  const [dominoPieces] = useState(createDominoPieces());

  const DominoPiece = ({ piece, size = "small" }) => {
    const sizeClass = size === "large" ? "w-20 h-10" : "w-12 h-6";
    const dotSize = size === "large" ? "w-2 h-2" : "w-1 h-1";
    const renderDots = (number) => {
      const dots = [];
      const positions = {
        0: [],
        1: [[1, 1]],
        2: [[0, 0], [2, 2]],
        3: [[0, 0], [1, 1], [2, 2]],
        4: [[0, 0], [0, 2], [2, 0], [2, 2]],
        5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
        6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]]
      };
      positions[number].forEach((pos, i) => {
        dots.push(
          <div
            key={i}
            className={`${dotSize} bg-gray-800 rounded-full absolute`}
            style={{
              left: `${pos[1] * 33 + 16}%`,
              top: `${pos[0] * 33 + 16}%`
            }}
          />
        );
      });
      return dots;
    };
    return (
      <div className={`${sizeClass} bg-white border-2 border-gray-400 rounded flex relative shadow-md`}>
        <div className="w-1/2 h-full relative border-r border-gray-400">
          {renderDots(piece[0])}
        </div>
        <div className="w-1/2 h-full relative">
          {renderDots(piece[1])}
        </div>
      </div>
    );
  };

  // Login Screen
  const LoginScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = () => {
      if (name && phone) {
        setUser({ name, phone, id: Date.now() });
        setCurrentScreen('home');
      }
    };
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{t.appName}</h1>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                placeholder={t.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition duration-200"
            >
              {t.confirm}
            </button>
          </div>
          {/* Language Selector */}
          <div className="mt-6 text-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="fr">Français</option>
              <option value="ht">Kreyòl</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  // Home Screen
  const HomeScreen = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{t.appName}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">${balance}</span>
              </div>
              <button
                onClick={() => setCurrentScreen('settings')}
                className="p-2 hover:bg-white/20 rounded-full"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {/* User Info */}
        <div className="bg-white m-4 p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>
        {/* Game Modes */}
        <div className="m-4 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">{t.gameMode}</h3>
          {/* Face to Face */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">{t.faceToFace}</h4>
                <p className="text-gray-600">2 joueurs - Gagnant emporte tout</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-gray-500">{t.currentBet}: ${currentBet}</span>
                  <span className="text-sm text-red-500">{t.commission}: ${(currentBet * 0.05).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setGameMode('faceToFace');
                  setCurrentScreen('game');
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {t.joinGame}
              </button>
            </div>
          </div>
          {/* Dog Eat Dog */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">{t.dogEatDog}</h4>
                <p className="text-gray-600">2-4 joueurs - Gagnant emporte tout</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-gray-500">{t.currentBet}: ${currentBet}</span>
                  <span className="text-sm text-red-500">{t.commission}: ${(currentBet * 0.05).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setGameMode('dogEatDog');
                  setCurrentScreen('game');
                }}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                {t.joinGame}
              </button>
            </div>
          </div>
          {/* Partner Domino */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">{t.partnerDomino}</h4>
                <p className="text-gray-600">4 joueurs - 2v2 équipes</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-gray-500">{t.currentBet}: ${currentBet}</span>
                  <span className="text-sm text-red-500">{t.commission}: ${(currentBet * 0.05).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setGameMode('partnerDomino');
                  setCurrentScreen('game');
                }}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                {t.joinGame}
              </button>
            </div>
          </div>
        </div>
        {/* Bet Controls */}
        <div className="m-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Contrôles de Mise</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{t.currentBet}: <span className="font-semibold">${currentBet}</span></p>
              <p className="text-sm text-red-600">{t.commission}: <span className="font-semibold">${(currentBet * 0.05).toFixed(2)}</span></p>
            </div>
            <button
              onClick={() => setCurrentBet(currentBet * 10)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              {t.increaseBet}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Game Screen
  const GameScreen = () => {
    const [playerHand, setPlayerHand] = useState(dominoPieces.slice(0, 7));
    const [tableCenter, setTableCenter] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    useEffect(() => {
      // Simulate other players
      const gamePlayers = [];
      const playerCount = gameMode === 'faceToFace' ? 2 : gameMode === 'partnerDomino' ? 4 : Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < playerCount; i++) {
        gamePlayers.push({
          id: i,
          name: i === 0 ? user.name : `Joueur ${i + 1}`,
          hand: dominoPieces.slice(i * 7, (i + 1) * 7),
          isUser: i === 0
        });
      }
      setPlayers(gamePlayers);
      setGameState('playing');
    }, [gameMode, user.name, dominoPieces]);

    const playPiece = (piece) => {
      if (currentPlayer === 0) { // User's turn
        setTableCenter([...tableCenter, piece]);
        setPlayerHand(playerHand.filter(p => p !== piece));
        setCurrentPlayer((currentPlayer + 1) % players.length);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 to-blue-800 p-4">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentScreen('home')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <Home className="h-4 w-4 inline mr-2" />
              Retour
            </button>
            <h2 className="text-xl font-bold">
              {gameMode === 'faceToFace' ? t.faceToFace :
                gameMode === 'dogEatDog' ? t.dogEatDog : t.partnerDomino}
            </h2>
            <div className="text-sm">
              <div>Mise: ${currentBet}</div>
              <div>Commission: ${(currentBet * 0.05).toFixed(2)}</div>
            </div>
          </div>
        </div>
        {/* Players */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {players.map((player, index) => (
            <div key={player.id} className={`bg-white/90 backdrop-blur rounded-lg p-3 ${currentPlayer === index ? 'ring-2 ring-yellow-400' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold">{player.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {!player.isUser && (
                    <>
                      <button className="p-1 bg-green-100 hover:bg-green-200 rounded">
                        <UserPlus className="h-3 w-3 text-green-600" />
                      </button>
                      <button className="p-1 bg-red-100 hover:bg-red-200 rounded">
                        <UserX className="h-3 w-3 text-red-600" />
                      </button>
                    </>
                  )}
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {player.hand?.length || 0} domino
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Game Table */}
        <div className="bg-green-900/50 backdrop-blur rounded-lg p-6 mb-6 min-h-40">
          <h3 className="text-white font-semibold mb-4 text-center">Table de Jeu</h3>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {tableCenter.length === 0 ? (
              <div className="text-white/60 text-center py-8">
                Placez votre premier domino pour commencer
              </div>
            ) : (
              tableCenter.map((piece, index) => (
                <DominoPiece key={index} piece={piece} size="large" />
              ))
            )}
          </div>
        </div>
        {/* Player Hand */}
        <div className="bg-white/90 backdrop-blur rounded-lg p-4">
          <h3 className="font-semibold mb-4">Votre Main</h3>
          <div className="flex flex-wrap gap-2">
            {playerHand.map((piece, index) => (
              <button
                key={index}
                onClick={() => playPiece(piece)}
                className="hover:scale-105 transition-transform"
                disabled={currentPlayer !== 0}
              >
                <DominoPiece piece={piece} />
              </button>
            ))}
          </div>
          {currentPlayer === 0 && (
            <p className="text-green-600 font-semibold mt-2">À votre tour!</p>
          )}
          {currentPlayer !== 0 && (
            <p className="text-gray-500 mt-2">Tour de {players[currentPlayer]?.name}</p>
          )}
        </div>
      </div>
    );
  };

  // Settings Screen
  const SettingsScreen = () => {
    const [newLanguage, setNewLanguage] = useState(language);
    const handleSave = () => {
      setLanguage(newLanguage);
      setCurrentScreen('home');
    };
    const handleLogout = () => {
      setUser(null);
      setCurrentScreen('login');
    };
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentScreen('home')}
              className="p-2 hover:bg-white/20 rounded-full"
            >
              <Home className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">{t.settings}</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t.settings}</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t.language}</label>
            <select
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="fr">Français</option>
              <option value="ht">Kreyòl</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-4"
          >
            {t.save}
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
          >
            {t.logout}
          </button>
        </div>
      </div>
    );
  };

  // Render app
  if (!user || currentScreen === 'login') {
    return <LoginScreen />;
  }
  if (currentScreen === 'home') {
    return <HomeScreen />;
  }
  if (currentScreen === 'settings') {
    return <SettingsScreen />;
  }
  if (currentScreen === 'game') {
    return <GameScreen />;
  }
  return null;
};

export default DominoBetApp;

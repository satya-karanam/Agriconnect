const { useState, useEffect, useRef } = React;

// Image Error Fallback SVG Placeholder
const IMAGE_FALLBACK_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="%2316a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';

/* =========================================================================
   AUTHENTICATION & LOGIN MODAL (SIMULATED OTP & USER PROFILE)
   ========================================================================= */
function AuthModal({ 
  show, 
  onClose, 
  authStep, 
  setAuthStep, 
  inputFullName, 
  setInputFullName, 
  inputPhone, 
  setInputPhone, 
  selectedRole, 
  setSelectedRole, 
  otpDigits, 
  setOtpDigits, 
  onCompleteLogin 
}) {
  if (!show) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!inputFullName.trim()) {
      setInputFullName("Ramesh Reddy");
    }
    setAuthStep("otp");
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const finalName = inputFullName.trim() || "Ramesh Reddy";
    onCompleteLogin(finalName, selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>

        {authStep === "details" ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div className="text-center space-y-1">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                🔐 Login or Register
              </span>
              <h2 className="font-display font-extrabold text-2xl text-slate-900 pt-1">
                AgriConnect Identity
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Enter your details for verified direct farm trading.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Full Name
                </label>
                <input 
                  type="text"
                  value={inputFullName}
                  onChange={(e) => setInputFullName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-700 font-bold text-xs flex items-center">
                    +91
                  </span>
                  <input 
                    type="tel"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    placeholder="98490 88214"
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Select User Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("Farmer")}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      selectedRole === "Farmer"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>🌾</span> Farmer / FPO
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("Buyer")}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      selectedRole === "Buyer"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>🛒</span> Customer / Buyer
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-colors uppercase tracking-wider"
            >
              Send OTP Verification →
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-center space-y-1">
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                💬 Mobile OTP Verification
              </span>
              <h2 className="font-display font-extrabold text-2xl text-slate-900 pt-1">
                Enter 4-Digit OTP
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Sent to +91 {inputPhone || '98490 88214'}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center space-y-1">
              <p className="text-xs font-bold text-emerald-800">✨ Demo OTP Code: <span className="underline decoration-wavy font-extrabold">1234</span></p>
              <p className="text-[10px] text-emerald-600">Enter code below or click verify to complete login</p>
            </div>

            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map(idx => (
                <input
                  key={idx}
                  id={`otp-digit-${idx}`}
                  type="text"
                  maxLength={1}
                  value={otpDigits[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center font-extrabold text-xl text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              ))}
            </div>

            <div className="space-y-2">
              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-colors uppercase tracking-wider"
              >
                ✓ Verify & Complete Login
              </button>

              <button
                type="button"
                onClick={() => setAuthStep("details")}
                className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                ← Back to User Details
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Main AgriConnect Application Component
function App() {
  // Global State
  const [lang, setLang] = useState(localStorage.getItem('agri_lang') || 'en');
  const [userName, setUserName] = useState(
    () => localStorage.getItem("agri_user_name") || "Ramesh Reddy"
  );
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("agri_user_role") || localStorage.getItem("agri_role") || "farmer"
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authStep, setAuthStep] = useState("details"); // "details" | "otp"
  const [inputFullName, setInputFullName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState("Farmer"); // "Farmer" | "Buyer"
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("agri_logged_in") !== "false"
  );
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'farmer_dashboard', 'buyer_dashboard', 'marketplace', 'sell_produce', 'my_listings', 'find_buyers', 'price_intel', 'market_demand', 'logistics', 'rythu_bazaar', 'wishlist', 'orders', 'farmer_register', 'buyer_register', 'farmer_login', 'buyer_login', 'profile', 'role_select'
  
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(['prod-1', 'prod-17']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "FreshMart Wholesale offered ₹29/kg for your 500 kg Tomatoes!", time: "10 mins ago", unread: true },
    { id: 2, text: "Order #AGC1024 is currently In Transit. ETA: 4:30 PM", time: "30 mins ago", unread: true },
    { id: 3, text: "SETU Market Alert: High demand predicted for Chilli in Guntur", time: "2 hours ago", unread: false }
  ]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Verification States (Demo)
  const [farmerVerified, setFarmerVerified] = useState(true);
  const [farmerPending, setFarmerPending] = useState(false);
  const [buyerVerified, setBuyerVerified] = useState(true);

  // Marketplace & Filter States
  const [products, setProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState('nearest');
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  // Listing Form & Buyer Offer State
  const [listedSuccessMsg, setListedSuccessMsg] = useState(false);
  const [myListings, setMyListings] = useState([
    {
      id: "my-1",
      cropName: "Fresh Farm Red Tomato (Tamata)",
      category: "fruiting",
      quantity: 500,
      expectedPrice: 28,
      qualityGrade: "Grade A",
      location: "Kankipadu, Krishna District",
      harvestDate: "2026-08-28",
      status: "Active",
      buyerMatches: 3
    },
    {
      id: "my-2",
      cropName: "Colocasia / Taro Root (Chamadumpa)",
      category: "root",
      quantity: 400,
      expectedPrice: 45,
      qualityGrade: "Grade A",
      location: "Penamaluru, Krishna District",
      harvestDate: "2026-08-27",
      status: "Active",
      buyerMatches: 3
    },
    {
      id: "my-3",
      cropName: "Fresh Ridge Gourd (Beerakaya)",
      category: "seasonal",
      quantity: 190,
      expectedPrice: 38,
      qualityGrade: "Grade A",
      location: "Gannavaram, Krishna District",
      harvestDate: "2026-08-29",
      status: "Active",
      buyerMatches: 3
    }
  ]);
  const [selectedListingForBuyers, setSelectedListingForBuyers] = useState(null);

  // Order Tracking State
  const [activeOrderTrack, setActiveOrderTrack] = useState(mockOrders[0]);

  // Modals & Notifications State
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [ratingModalOrder, setRatingModalOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Invalidate stale localStorage product cache & force sync fresh mockProducts with hyper-local distances
  useEffect(() => {
    try {
      const keysToClear = ['agri_products', 'products', 'agri_catalog', 'mockProducts', 'agri_produce_cache'];
      keysToClear.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.warn('localStorage cache invalidation:', e);
    }
    if (typeof mockProducts !== 'undefined') {
      setProducts(mockProducts);
    }
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // SETU AI Assistant State
  const [isSetuOpen, setIsSetuOpen] = useState(false);
  const [setuMessages, setSetuMessages] = useState([]);
  const [setuInput, setSetuInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Current Translation Dictionary
  const t = translations[lang] || translations.en;

  // Language Change Handler
  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('agri_lang', newLang);
  };

  // Role Change Handler
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('agri_role', newRole);
    localStorage.setItem('agri_user_role', newRole);
    setSelectedRole(newRole === 'farmer' ? 'Farmer' : 'Buyer');
    setIsSetuOpen(false);
    if (newRole === 'farmer') {
      setActiveTab('farmer_dashboard');
    } else {
      setActiveTab('marketplace');
    }
  };

  // Authentication Login Handler
  const handleCompleteLogin = (name, roleStr) => {
    const roleKey = roleStr.toLowerCase() === 'buyer' ? 'buyer' : 'farmer';
    setUserName(name);
    setUserRole(roleKey);
    setIsLoggedIn(true);
    localStorage.setItem("agri_user_name", name);
    localStorage.setItem("agri_user_role", roleKey);
    localStorage.setItem("agri_role", roleKey);
    localStorage.setItem("agri_logged_in", "true");
    setShowAuthModal(false);
    setAuthStep("details");
    setOtpDigits(["", "", "", ""]);
    setToastMessage(`Welcome back, ${name}! Logged in as ${roleStr}.`);
    if (roleKey === 'buyer') {
      setActiveTab('marketplace');
    } else {
      setActiveTab('farmer_dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("agri_logged_in", "false");
    setIsProfileMenuOpen(false);
    setShowAuthModal(true);
    setToastMessage("Logged out successfully. Please log in to continue.");
  };

  // Route Security Guard
  useEffect(() => {
    const farmerOnlyTabs = ['farmer_dashboard', 'sell_produce', 'my_listings', 'find_buyers', 'setu_portal', 'market_demand'];
    const buyerOnlyTabs = ['buyer_dashboard', 'cart', 'checkout'];

    if (userRole === 'farmer' && buyerOnlyTabs.includes(activeTab)) {
      setActiveTab('farmer_dashboard');
    } else if (userRole === 'buyer' && farmerOnlyTabs.includes(activeTab)) {
      setActiveTab('marketplace');
    }
  }, [userRole, activeTab]);

  // Initial SETU welcome message on language change
  useEffect(() => {
    let welcome = t.setu.greeting;
    setSetuMessages([
      { id: 1, sender: 'setu', text: welcome }
    ]);
  }, [lang]);

  // Add to Cart
  const handleAddToCart = (product, e, addQty = 1) => {
    if (e) e.stopPropagation();
    const qtyToAdd = typeof addQty === 'number' && addQty > 0 ? addQty : 1;
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item);
      }
      return [...prev, { product, quantity: qtyToAdd }];
    });
    setIsCartOpen(true);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // SETU Chat Handler
  const handleSendSetuMessage = async (customText = null) => {
    const textToSend = customText || setuInput;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setSetuMessages((prev) => [...prev, userMsg]);
    if (!customText) setSetuInput('');

    try {
      const res = await fetch('/api/setu/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: lang,
          role: userRole,
          context: { activeTab }
        })
      });
      const data = await res.json();
      const setuReply = { id: Date.now() + 1, sender: 'setu', text: data.reply || "I am here to assist you on AgriConnect." };
      setSetuMessages((prev) => [...prev, setuReply]);
    } catch (err) {
      let fallbackText = "I am processing your request. You can check Price Intelligence or Find Buyers for live market updates.";
      if (lang === 'te') fallbackText = "మీ ప్రశ్నను పరిశీలిస్తున్నాను. తాజా ధరలు మరియు కొనుగోలుదారుల కోసం చూడుము.";
      if (lang === 'hi') fallbackText = "मैं आपके प्रश्न पर कार्य कर रहा हूँ। मंडी भाव और खरीदारों की जानकारी के लिए 'Find Buyers' देखें।";
      setSetuMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'setu', text: fallbackText }]);
    }
  };

  // Voice Input Handler (Web Speech API)
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in your browser. You can type your message.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleSendSetuMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // Filtered Products Calculation
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      p.name.toLowerCase().includes(q) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(q)) ||
      (p.nameTe && p.nameTe.toLowerCase().includes(q)) ||
      (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
      (p.cropItem && p.cropItem.toLowerCase().includes(q)) ||
      p.location.toLowerCase().includes(q) ||
      p.farmerName.toLowerCase().includes(q);

    const matchesGrade = selectedGrade === 'all' || p.qualityGrade === selectedGrade;
    const matchesVerified = !verifiedOnly || p.verified;
    return matchesCat && matchesSearch && matchesGrade && matchesVerified;
  }).sort((a, b) => {
    if (sortOption === 'price_low') return a.price - b.price;
    if (sortOption === 'price_high') return b.price - a.price;
    if (sortOption === 'nearest') return a.distanceKm - b.distanceKm;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Re-render Lucide icons after state change
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* UNIFIED LIGHT DEMO ROLE BANNER */}
      <div className="bg-emerald-50 text-emerald-900 border-b border-emerald-200 px-4 py-2 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-slate-700 font-medium">Active Mode: <strong className="text-emerald-800 font-bold">{userRole === 'farmer' ? 'Farmer / FPO' : 'Buyer'}</strong></span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-600 hidden md:inline">Switch Role for Prototype Evaluation:</span>
          <button 
            onClick={() => handleRoleChange('farmer')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
              userRole === 'farmer' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            🌾 Farmer / FPO
          </button>
          <button 
            onClick={() => handleRoleChange('buyer')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
              userRole === 'buyer' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            🛒 Customer / Buyer
          </button>
        </div>
      </div>

      {/* UNIFIED LIGHT GLOBAL NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white text-slate-800 shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* BRAND LOGO */}
            <div 
              onClick={() => setActiveTab(userRole === 'farmer' ? 'farmer_dashboard' : 'home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <span className="text-xl">🌱</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                  {t.brandName}
                </span>
                <p className="text-[10px] text-emerald-600 font-semibold tracking-wide hidden sm:block">
                  {t.secondaryTagline}
                </p>
              </div>
            </div>

            {/* ROLE-BASED NAVIGATION LINKS (LIGHT STYLING) */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              
              {userRole === 'farmer' ? (
                // FARMER / FPO NAVIGATION
                <>
                  <button 
                    onClick={() => setActiveTab('farmer_dashboard')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'farmer_dashboard' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    📊 {t.nav.dashboard}
                  </button>
                  <button 
                    onClick={() => setActiveTab('sell_produce')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'sell_produce' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    🌱 {t.nav.sellProduce}
                  </button>
                  <button 
                    onClick={() => setActiveTab('my_listings')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'my_listings' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    📋 {t.nav.myListings}
                  </button>
                  <button 
                    onClick={() => setActiveTab('find_buyers')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'find_buyers' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    🤝 {t.nav.findBuyers}
                  </button>
                  <button 
                    onClick={() => setActiveTab('logistics')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'logistics' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    🚚 {t.nav.logistics}
                  </button>
                  <button 
                    onClick={() => setActiveTab('setu_portal')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'setu_portal'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    🌱 SETU Crop Advisor
                  </button>
                </>
              ) : (
                // CUSTOMER / BUYER NAVIGATION
                <>
                  <button 
                    onClick={() => setActiveTab('home')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'home' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    🏠 {t.nav.home}
                  </button>
                  <button 
                    onClick={() => setActiveTab('marketplace')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'marketplace' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    🛒 Marketplace (27 Crops)
                  </button>
                  <button 
                    onClick={() => setActiveTab('price_intel')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'price_intel' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    💰 Price Intelligence
                  </button>
                  <button 
                    onClick={() => setActiveTab('logistics')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'logistics' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    📦 {t.nav.myOrders}
                  </button>
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    🛍️ {t.nav.cart}
                  </button>
                  <button 
                    onClick={() => setIsSetuOpen(true)}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-all flex items-center gap-1.5"
                  >
                    ✨ Ask SETU
                  </button>
                </>
              )}
            </div>

            {/* RIGHT UTILITIES: LANGUAGE, NOTIFICATIONS, CART, PROFILE */}
            <div className="flex items-center space-x-3">
              
              {/* GLOBAL LANGUAGE SWITCHER */}
              <div className="relative">
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700">
                  <span className="mr-1">🌐</span>
                  <button 
                    onClick={() => handleLangChange('en')}
                    className={`px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    EN
                  </button>
                  <span className="text-slate-300 mx-0.5">|</span>
                  <button 
                    onClick={() => handleLangChange('te')}
                    className={`px-1.5 py-0.5 rounded ${lang === 'te' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    తెలుగు
                  </button>
                  <span className="text-slate-300 mx-0.5">|</span>
                  <button 
                    onClick={() => handleLangChange('hi')}
                    className={`px-1.5 py-0.5 rounded ${lang === 'hi' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* NOTIFICATION BELL */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
                >
                  <i data-lucide="bell" className="w-5 h-5"></i>
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                  )}
                </button>

                {/* NOTIFICATIONS DROPDOWN */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 p-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        🔔 Notifications
                      </h4>
                      <button 
                        onClick={() => setIsNotifOpen(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs"
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-2.5 max-h-64 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                          <p className="text-slate-800 font-medium">{n.text}</p>
                          <span className="text-[10px] text-emerald-600 mt-1 block font-semibold">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CART DRAWER BUTTON */}
              {userRole === 'buyer' && (
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white relative transition-all flex items-center gap-1.5 px-3"
                >
                  <i data-lucide="shopping-cart" className="w-4 h-4"></i>
                  <span className="text-xs font-bold hidden sm:inline">{t.nav.cart}</span>
                  {cart.length > 0 && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ml-1 shadow">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </button>
              )}

              {/* PROFILE PILL & DROPDOWN MENU */}
              <div className="relative">
                {isLoggedIn ? (
                  <div>
                    <button 
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center space-x-2 p-1.5 px-3 rounded-xl bg-slate-100 border border-slate-200 hover:border-emerald-500 hover:bg-slate-200 transition-colors shadow-sm cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {userRole === 'farmer' ? '🌾' : '🛒'}
                      </div>
                      <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                        {userName} ({userRole === 'farmer' ? 'Farmer' : 'Buyer'})
                      </span>
                      <span className="text-xs text-slate-500 font-bold ml-0.5">▾</span>
                    </button>

                    {/* PROFILE DROPDOWN MENU */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs font-semibold animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-slate-900 font-extrabold truncate">{userName}</p>
                          <p className="text-[10px] text-emerald-700 font-bold capitalize">Role: {userRole === 'farmer' ? 'Farmer / FPO' : 'Customer / Buyer'}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setActiveTab('profile');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          👤 Profile Details
                        </button>
                        <button 
                          onClick={() => {
                            handleRoleChange(userRole === 'farmer' ? 'buyer' : 'farmer');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          🔄 Switch Role ({userRole === 'farmer' ? 'Buyer' : 'Farmer'})
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 border-t border-slate-100 flex items-center gap-2 font-bold"
                        >
                          🚪 Logout / Switch User
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setInputFullName(userName);
                      setSelectedRole(userRole === 'farmer' ? 'Farmer' : 'Buyer');
                      setAuthStep('details');
                      setShowAuthModal(true);
                    }}
                    className="flex items-center space-x-2 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <span>🔑</span>
                    <span>Login / Register</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE SECONDARY NAV BAR */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-around text-xs font-semibold text-slate-700">
        {userRole === 'farmer' ? (
          <>
            <button onClick={() => setActiveTab('farmer_dashboard')} className="flex flex-col items-center">
              <span>📊</span> Dashboard
            </button>
            <button onClick={() => setActiveTab('sell_produce')} className="flex flex-col items-center">
              <span>🌱</span> Sell
            </button>
            <button onClick={() => setActiveTab('find_buyers')} className="flex flex-col items-center">
              <span>🤝</span> Buyers
            </button>
            <button onClick={() => setActiveTab('logistics')} className="flex flex-col items-center">
              <span>🚚</span> Logistics
            </button>
            <button onClick={() => setActiveTab('setu_portal')} className="flex flex-col items-center text-emerald-700 font-bold">
              <span>🌱</span> Advisor
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setActiveTab('home')} className="flex flex-col items-center">
              <span>🏠</span> Home
            </button>
            <button onClick={() => setActiveTab('marketplace')} className="flex flex-col items-center">
              <span>🛒</span> Market
            </button>
            <button onClick={() => setActiveTab('price_intel')} className="flex flex-col items-center">
              <span>💰</span> Prices
            </button>
            <button onClick={() => setActiveTab('logistics')} className="flex flex-col items-center">
              <span>📦</span> Orders
            </button>
            <button onClick={() => setIsSetuOpen(true)} className="flex flex-col items-center text-emerald-700 font-bold">
              <span>✨</span> SETU
            </button>
          </>
        )}
      </div>

      {/* BODY CONTENT ROUTING */}
      <main className="flex-grow bg-slate-50 text-slate-900">
        {activeTab === 'home' && (
          <HomeView 
            t={t} 
            setActiveTab={setActiveTab} 
            setUserRole={setUserRole} 
          />
        )}

        {activeTab === 'farmer_dashboard' && (
          <FarmerDashboardView 
            t={t} 
            setActiveTab={setActiveTab} 
            farmerVerified={farmerVerified}
            setFarmerVerified={setFarmerVerified}
            setIsSetuOpen={setIsSetuOpen}
            userName={userName}
          />
        )}

        {activeTab === 'buyer_dashboard' && (
          <BuyerDashboardView 
            t={t} 
            setActiveTab={setActiveTab} 
            products={products}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={(p) => setSelectedProductDetail(p)}
            userName={userName}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView 
            t={t}
            products={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            sortOption={sortOption}
            setSortOption={setSortOption}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProductDetail(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistView 
            t={t}
            products={products.filter(p => wishlist.includes(p.id))}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProductDetail(p)}
            onToggleWishlist={handleToggleWishlist}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'sell_produce' && (
          <SellProduceView 
            t={t}
            setActiveTab={setActiveTab}
            setListedSuccessMsg={setListedSuccessMsg}
            listedSuccessMsg={listedSuccessMsg}
            myListings={myListings}
            setMyListings={setMyListings}
            setSelectedListingForBuyers={setSelectedListingForBuyers}
          />
        )}

        {activeTab === 'my_listings' && (
          <MyListingsView 
            t={t}
            setActiveTab={setActiveTab}
            myListings={myListings}
            setSelectedListingForBuyers={setSelectedListingForBuyers}
          />
        )}

        {activeTab === 'find_buyers' && (
          <FindBuyersView 
            t={t}
            setActiveTab={setActiveTab}
            setIsSetuOpen={setIsSetuOpen}
            handleSendSetuMessage={handleSendSetuMessage}
            selectedListingForBuyers={selectedListingForBuyers}
            setSelectedListingForBuyers={setSelectedListingForBuyers}
            myListings={myListings}
            setActiveOrderTrack={setActiveOrderTrack}
            setToastMessage={setToastMessage}
          />
        )}

        {activeTab === 'price_intel' && (
          <PriceIntelligenceView 
            t={t}
          />
        )}

        {userRole === 'farmer' && activeTab === 'setu_portal' && (
          <SetuPortalView 
            t={t}
            setActiveTab={setActiveTab}
            setIsSetuOpen={setIsSetuOpen}
            userRole={userRole}
            userName={userName}
            setuMessages={setuMessages}
            setSetuMessages={setSetuMessages}
            setuInput={setuInput}
            setSetuInput={setSetuInput}
            onSendMessage={handleSendSetuMessage}
            isListening={isListening}
            onVoiceInput={handleVoiceInput}
            initialSubTab="advisor"
          />
        )}

        {userRole === 'farmer' && activeTab === 'market_demand' && (
          <SetuPortalView 
            t={t}
            setActiveTab={setActiveTab}
            setIsSetuOpen={setIsSetuOpen}
            userRole={userRole}
            userName={userName}
            setuMessages={setuMessages}
            setSetuMessages={setSetuMessages}
            setuInput={setuInput}
            setSetuInput={setSetuInput}
            onSendMessage={handleSendSetuMessage}
            isListening={isListening}
            onVoiceInput={handleVoiceInput}
            initialSubTab="demand_trends"
          />
        )}

        {activeTab === 'logistics' && (
          <SmartLogisticsView 
            t={t}
            order={activeOrderTrack}
            userRole={userRole}
            setRatingModalOrder={setRatingModalOrder}
            setShowEscrowModal={setShowEscrowModal}
            setToastMessage={setToastMessage}
          />
        )}

        {activeTab === 'rythu_bazaar' && (
          <RythuBazaarView 
            t={t}
          />
        )}

        {activeTab === 'role_select' && (
          <RoleSelectionView 
            t={t}
            setActiveTab={setActiveTab}
            setUserRole={setUserRole}
          />
        )}

        {activeTab === 'farmer_register' && (
          <FarmerRegisterView 
            t={t}
            setActiveTab={setActiveTab}
            farmerVerified={farmerVerified}
            setFarmerVerified={setFarmerVerified}
            farmerPending={farmerPending}
            setFarmerPending={setFarmerPending}
          />
        )}

        {activeTab === 'buyer_register' && (
          <BuyerRegisterView 
            t={t}
            setActiveTab={setActiveTab}
            buyerVerified={buyerVerified}
            setBuyerVerified={setBuyerVerified}
          />
        )}

        {activeTab === 'farmer_login' && (
          <FarmerLoginView 
            t={t} 
            setActiveTab={setActiveTab} 
            setUserRole={setUserRole} 
          />
        )}

        {activeTab === 'buyer_login' && (
          <BuyerLoginView 
            t={t} 
            setActiveTab={setActiveTab} 
            setUserRole={setUserRole} 
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView 
            t={t}
            userRole={userRole}
            setUserRole={setUserRole}
            farmerVerified={farmerVerified}
            buyerVerified={buyerVerified}
            setActiveTab={setActiveTab}
            userName={userName}
            setShowAuthModal={setShowAuthModal}
            setInputFullName={setInputFullName}
            setSelectedRole={setSelectedRole}
            setAuthStep={setAuthStep}
          />
        )}
      </main>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProductDetail && (
        <ProductDetailModal 
          product={selectedProductDetail}
          t={t}
          onClose={() => setSelectedProductDetail(null)}
          onAddToCart={handleAddToCart}
          setIsSetuOpen={setIsSetuOpen}
          handleSendSetuMessage={handleSendSetuMessage}
          userRole={userRole}
        />
      )}

      {/* CART & CHECKOUT DRAWER */}
      {isCartOpen && (
        <CartDrawer 
          cart={cart}
          setCart={setCart}
          t={t}
          onClose={() => setIsCartOpen(false)}
          setActiveTab={setActiveTab}
        />
      )}

      {/* ESCROW MODAL (FARMER PAYOUT DETAILS) */}
      {showEscrowModal && (
        <EscrowModal 
          order={activeOrderTrack}
          onClose={() => setShowEscrowModal(false)}
          setToastMessage={setToastMessage}
        />
      )}

      {/* RATING MODAL (BUYER HARVEST EXPERIENCE) */}
      {ratingModalOrder && (
        <RatingModal 
          order={ratingModalOrder}
          t={t}
          onClose={() => setRatingModalOrder(null)}
          setToastMessage={setToastMessage}
        />
      )}

      {/* GLOBAL TOAST BANNER */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <span>🔔</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2 font-bold">✕</button>
        </div>
      )}

      {/* FLOATING SETU AI ASSISTANT WIDGET */}
      <SetuAiWidget 
        t={t}
        isOpen={isSetuOpen}
        setIsOpen={setIsSetuOpen}
        messages={setuMessages}
        input={setuInput}
        setInput={setSetuInput}
        onSendMessage={handleSendSetuMessage}
        isListening={isListening}
        onVoiceInput={handleVoiceInput}
        userRole={userRole}
        userName={userName}
      />

      {/* AUTHENTICATION & LOGIN MODAL */}
      <AuthModal 
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        authStep={authStep}
        setAuthStep={setAuthStep}
        inputFullName={inputFullName}
        setInputFullName={setInputFullName}
        inputPhone={inputPhone}
        setInputPhone={setInputPhone}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        otpDigits={otpDigits}
        setOtpDigits={setOtpDigits}
        onCompleteLogin={handleCompleteLogin}
      />

      {/* GLOBAL UNIFIED LIGHT FOOTER */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🌱</span>
                <span className="font-display font-bold text-xl text-slate-900">AgriConnect</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                "{t.tagline}"
              </p>
              <p className="text-xs text-emerald-600 font-semibold">
                Direct Farm-to-Market Platform
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">27 Produce Items</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedCategory('leafy'); setActiveTab('marketplace'); setUserRole('buyer'); }} className="hover:text-emerald-600">🥬 Leafy Vegetables (4)</button></li>
                <li><button onClick={() => { setSelectedCategory('root'); setActiveTab('marketplace'); setUserRole('buyer'); }} className="hover:text-emerald-600">🥕 Root Vegetables (7)</button></li>
                <li><button onClick={() => { setSelectedCategory('seasonal'); setActiveTab('marketplace'); setUserRole('buyer'); }} className="hover:text-emerald-600">🎃 Seasonal Vegetables (5)</button></li>
                <li><button onClick={() => { setSelectedCategory('spices'); setActiveTab('marketplace'); setUserRole('buyer'); }} className="hover:text-emerald-600">🌶️ Indian Spices (4)</button></li>
                <li><button onClick={() => { setSelectedCategory('fruiting'); setActiveTab('marketplace'); setUserRole('buyer'); }} className="hover:text-emerald-600">🍅 Fruiting Vegetables (7)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">Farmer & FPO Portal</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setUserRole('farmer'); setActiveTab('farmer_dashboard'); }} className="hover:text-emerald-600">Farmer Dashboard</button></li>
                <li><button onClick={() => { setUserRole('farmer'); setActiveTab('sell_produce'); }} className="hover:text-emerald-600">List Produce</button></li>
                <li><button onClick={() => { setUserRole('farmer'); setActiveTab('find_buyers'); }} className="hover:text-emerald-600">Find Smart Buyers</button></li>
                <li><button onClick={() => setActiveTab('farmer_register')} className="hover:text-emerald-600">Farmer Verification</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">Technology & AI</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setIsSetuOpen(true)} className="hover:text-emerald-600">SETU AI Assistant</button></li>
                <li><button onClick={() => setActiveTab('price_intel')} className="hover:text-emerald-600">Price Intelligence Engine</button></li>
                <li><button onClick={() => setActiveTab('market_demand')} className="hover:text-emerald-600">Demand Forecasting</button></li>
                <li><button onClick={() => setActiveTab('logistics')} className="hover:text-emerald-600">Smart Logistics Tracking</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 AgriConnect. All rights reserved. Connecting Farmers to Markets, Intelligently.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <span className="hover:text-slate-700 cursor-pointer">Verification Protocol</span>
              <span className="hover:text-slate-700 cursor-pointer">Fair Trade Policy</span>
              <span className="hover:text-slate-700 cursor-pointer">Logistics Network</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* =========================================================================
   VIEW 1: PUBLIC HOMEPAGE (UNIFIED LIGHT THEME)
   ========================================================================= */
function HomeView({ t, setActiveTab, setUserRole }) {
  return (
    <div className="bg-slate-50 space-y-16 pb-16">
      
      {/* PUBLIC HERO SECTION */}
      <section className="relative bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO LEFT TEXT */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-slate-900">
                {t.hero.title} <br />
                <span className="text-emerald-600">
                  {t.hero.titleAccent}
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => {
                    setUserRole('buyer');
                    setActiveTab('marketplace');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
                >
                  <span>🛒</span> {t.hero.ctaShopping}
                </button>

                <button 
                  onClick={() => {
                    setUserRole('farmer');
                    setActiveTab('farmer_dashboard');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-800 font-bold transition-all flex items-center gap-2"
                >
                  <span>👨🌾</span> {t.hero.ctaSell}
                </button>
              </div>

              {/* METRICS STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs">
                <div>
                  <p className="font-display font-extrabold text-2xl text-emerald-600">12,400+</p>
                  <p className="text-slate-500 font-medium">{t.hero.verifiedFarmersCount}</p>
                </div>
                <div>
                  <p className="font-display font-extrabold text-2xl text-emerald-600">27 Varieties</p>
                  <p className="text-slate-500 font-medium">{t.hero.freshProduceCount}</p>
                </div>
                <div>
                  <p className="font-display font-extrabold text-2xl text-emerald-600">94% Match</p>
                  <p className="text-slate-500 font-medium">AI Buyer Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* HERO RIGHT VISUAL */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
                <img 
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80" 
                  alt="Indian Farmer Fresh Produce Harvest" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = IMAGE_FALLBACK_SVG;
                  }}
                  className="w-full h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                {/* DEMO PREVIEW CARD */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur border border-slate-200 text-slate-900 shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      🟢 Direct Farm Linkage Demo
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      Grade A Fresh
                    </span>
                  </div>
                  <p className="font-bold text-sm text-slate-900">Direct Farm Produce Sourcing</p>
                  <p className="text-xs text-slate-600">Connecting verified farmers directly with wholesale & retail buyers.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRANSPARENT SUPPLY CHAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 text-slate-900 shadow-sm space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {t.sihSection.badge}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              {t.sihSection.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t.sihSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* PROBLEM DIAGRAM */}
            <div className="bg-red-50/60 border border-red-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-red-700 font-bold text-sm">
                <span>❌</span>
                <h3>{t.sihSection.problemTitle}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                "{t.sihSection.problemDesc}"
              </p>

              <div className="space-y-2 pt-2">
                {t.sihSection.problemChain.map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-red-200 text-xs">
                    <span className="text-slate-800 font-semibold">{step}</span>
                    {idx < t.sihSection.problemChain.length - 1 && (
                      <span className="text-red-600 font-bold">↓ Margin Leakage</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-red-700 italic text-center pt-2 font-medium">
                Result: Farmers receive only ~30% of end-consumer price due to 4-5 middle layers.
              </p>
            </div>

            {/* SOLUTION DIAGRAM */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                <span>✅</span>
                <h3>{t.sihSection.solutionTitle}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.sihSection.solutionDesc}
              </p>

              <div className="space-y-3 pt-2">
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center font-bold text-sm text-slate-900 shadow-sm">
                  👨🌾 FARMER / FPO
                </div>
                <div className="text-center text-emerald-700 font-bold text-xs py-0.5">
                  ↓ Direct Smart Linkage
                </div>
                <div className="bg-emerald-600 p-4 rounded-xl text-center font-extrabold text-base text-white shadow-md flex items-center justify-center gap-2">
                  <span>🌱</span> AGRICONNECT PLATFORM
                </div>
                <div className="text-center text-emerald-700 font-bold text-xs py-0.5">
                  ↓ Platform Managed Delivery
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center font-bold text-sm text-slate-900 shadow-sm">
                  🛒 DIRECT BUYER / CONSUMER
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-200 space-y-2">
                {t.sihSection.benefits.map((b, i) => (
                  <p key={i} className="text-xs text-emerald-900 font-medium flex items-center gap-2">
                    {b}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
            {t.valueProps.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            AgriConnect bridges the gap between farm gates and consumer tables with transparency, verification, and AI intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ValueCard icon="🌱" title={t.valueProps.farmFreshTitle} desc={t.valueProps.farmFreshDesc} />
          <ValueCard icon="💰" title={t.valueProps.fairPricesTitle} desc={t.valueProps.fairPricesDesc} />
          <ValueCard icon="🛡️" title={t.valueProps.verifiedTitle} desc={t.valueProps.verifiedDesc} />
          <ValueCard icon="🚚" title={t.valueProps.smartDeliveryTitle} desc={t.valueProps.smartDeliveryDesc} />
          <ValueCard icon="🤖" title={t.valueProps.aiPoweredTitle} desc={t.valueProps.aiPoweredDesc} />
          <ValueCard icon="🔗" title={t.valueProps.directLinkageTitle} desc={t.valueProps.directLinkageDesc} />
        </div>
      </section>

      {/* WORKFLOW STORY SECTION */}
      <section className="bg-slate-100 py-16 border-t border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-slate-900 mb-2">
              {t.workflow.title}
            </h2>
            <p className="text-slate-600 text-sm">
              {t.workflow.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            <WorkflowStep num="1" title={t.workflow.step1} icon="🌾" />
            <WorkflowStep num="2" title={t.workflow.step2} icon="🤖" />
            <WorkflowStep num="3" title={t.workflow.step3} icon="🎯" />
            <WorkflowStep num="4" title={t.workflow.step4} icon="🏪" />
            <WorkflowStep num="5" title={t.workflow.step5} icon="💰" />
            <WorkflowStep num="6" title={t.workflow.step6} icon="🚚" />
            <WorkflowStep num="7" title={t.workflow.step7} icon="💳" />
          </div>
        </div>
      </section>

    </div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>
      <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function WorkflowStep({ num, title, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center relative">
      <span className="absolute top-2 left-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
        #{num}
      </span>
      <span className="text-3xl my-2">{icon}</span>
      <p className="text-xs font-semibold text-slate-800 mt-1">{title}</p>
    </div>
  );
}

/* =========================================================================
   VIEW 2: FARMER DASHBOARD (UNIFIED LIGHT THEME)
   ========================================================================= */
function FarmerDashboardView({ t, setActiveTab, farmerVerified, setFarmerVerified, setIsSetuOpen, userName }) {
  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* FARMER HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                {t.farmerDashboard.greeting}, {userName || "Ramesh Reddy"} 👋
              </h1>
              {farmerVerified ? (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  🛡️ {t.farmerDashboard.verifiedBadge}
                </span>
              ) : (
                <span className="bg-amber-50 text-amber-700 border border-amber-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  🟡 {t.farmerDashboard.pendingBadge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1 font-medium">
              📍 Kankipadu Village, Krishna District, AP
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSetuOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2"
            >
              🎤 {t.farmerDashboard.speakSetu}
            </button>
            <button 
              onClick={() => setActiveTab('farmer_register')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200"
            >
              Verification Details
            </button>
          </div>
        </div>

        {/* PROMPT ACTION CARDS */}
        <div>
          <h2 className="font-display font-bold text-xl text-slate-900 mb-4">
            {t.farmerDashboard.promptTitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* CARD 1: SELL PRODUCE */}
            <div 
              onClick={() => setActiveTab('sell_produce')}
              className="bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🌱
              </div>
              <h3 className="font-bold text-sm text-slate-900">{t.farmerDashboard.cardSell}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{t.farmerDashboard.cardSellSub}</p>
            </div>

            {/* CARD 2: TODAY'S PRICE */}
            <div 
              onClick={() => setActiveTab('price_intel')}
              className="bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                💰
              </div>
              <h3 className="font-bold text-sm text-slate-900">{t.farmerDashboard.cardPrice}</h3>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">{t.farmerDashboard.cardPriceSub}</p>
            </div>

            {/* CARD 3: FIND BUYERS */}
            <div 
              onClick={() => setActiveTab('find_buyers')}
              className="bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="font-bold text-sm text-slate-900">{t.farmerDashboard.cardBuyers}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{t.farmerDashboard.cardBuyersSub}</p>
            </div>

            {/* CARD 4: MARKET DEMAND */}
            <div 
              onClick={() => setActiveTab('market_demand')}
              className="bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                📈
              </div>
              <h3 className="font-bold text-sm text-slate-900">{t.farmerDashboard.cardDemand}</h3>
              <p className="text-[11px] text-red-600 font-bold mt-1">{t.farmerDashboard.cardDemandSub}</p>
            </div>

            {/* CARD 5: TRACK DELIVERY */}
            <div 
              onClick={() => setActiveTab('logistics')}
              className="bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🚚
              </div>
              <h3 className="font-bold text-sm text-slate-900">{t.farmerDashboard.cardTrack}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{t.farmerDashboard.cardTrackSub}</p>
            </div>

            {/* CARD 6: ASK SETU */}
            <div 
              onClick={() => setIsSetuOpen(true)}
              className="bg-white border border-emerald-300 hover:border-emerald-500 shadow-sm hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform shadow-sm">
                🤖
              </div>
              <h3 className="font-bold text-sm text-slate-900">{t.farmerDashboard.cardSetu}</h3>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">{t.farmerDashboard.cardSetuSub}</p>
            </div>

          </div>
        </div>

        {/* FARMER METRICS & IMPACT CARDS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900">{t.farmerDashboard.impactTitle}</h3>
              <p className="text-xs text-slate-500">{t.farmerDashboard.impactSub}</p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
              35% Direct Linkage Gain
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium">{t.farmerDashboard.addIncome}</p>
              <p className="font-display font-extrabold text-2xl text-emerald-600 mt-1">+₹42,500</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium">{t.farmerDashboard.wasteReduced}</p>
              <p className="font-display font-extrabold text-2xl text-emerald-600 mt-1">18% Reduced</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium">{t.farmerDashboard.logisticsSaved}</p>
              <p className="font-display font-extrabold text-2xl text-emerald-600 mt-1">₹6,800</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium">{t.farmerDashboard.buyersReached}</p>
              <p className="font-display font-extrabold text-2xl text-emerald-600 mt-1">28 Buyers</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   VIEW 3: BUYER DASHBOARD (UNIFIED LIGHT THEME)
   ========================================================================= */
function BuyerDashboardView({ t, setActiveTab, products, setSelectedCategory, onSelectProduct, userName }) {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* BUYER HERO BANNER */}
      <div className="bg-white text-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              🛒 Verified Direct Buyer Portal
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              Welcome back, {userName || "Valued Buyer"} 👋
            </h1>
            <p className="text-slate-600 text-sm max-w-xl">
              Order fresh farm harvests with zero middlemen — available in 1 kg retail packs and flexible wholesale quantities.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setActiveTab('marketplace')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2"
            >
              🛒 {t.buyerDashboard.quickActionMarketplace}
            </button>
            <button 
              onClick={() => setActiveTab('logistics')}
              className="px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 font-bold text-sm"
            >
              📦 {t.buyerDashboard.quickActionOrders}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* CATEGORIES QUICK SHORTCUTS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-2xl text-slate-900">
              {t.buyerDashboard.categoriesTitle}
            </h2>
            <button 
              onClick={() => { setSelectedCategory('all'); setActiveTab('marketplace'); }}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              View All 27 Products →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {mockCategories.map(cat => (
              <div 
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveTab('marketplace');
                }}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <h3 className="font-bold text-sm text-slate-900">{t.categories[cat.id]}</h3>
                <span className="text-[11px] text-slate-500 mt-1 font-medium">{cat.items.length} Products</span>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDED PRODUCE */}
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-4">
            {t.buyerDashboard.recommendedTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group flex flex-col"
              >
                <div className="relative h-[180px] w-full overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = IMAGE_FALLBACK_SVG;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow">
                    🟢 FRESH
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-full shadow">
                    {product.qualityGrade}
                  </span>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
                      🌾 {product.farmerName} • 📍 {product.location} ({product.distanceKm} km)
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="font-display font-extrabold text-xl text-emerald-600">₹{product.price}</span>
                      <span className="text-xs text-slate-500">/{product.unit}</span>
                    </div>
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg">
                      Qty: {product.availableQty} kg
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   VIEW 4: MARKETPLACE VIEW (UNIFIED LIGHT THEME - 27 PRODUCTS)
   ========================================================================= */
function MarketplaceView({ 
  t, 
  products, 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery,
  selectedGrade,
  setSelectedGrade,
  verifiedOnly,
  setVerifiedOnly,
  sortOption,
  setSortOption,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist
}) {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* MARKETPLACE HEADER & SEARCH BAR */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-2xl text-slate-900">
                {t.marketplace.title}
              </h1>
              <p className="text-xs text-slate-500">
                {t.marketplace.subtitle}
              </p>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative w-full md:w-96">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.marketplace.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
              />
              <span className="absolute left-3 top-3 text-slate-400 text-sm">🔍</span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* CATEGORY BAR WITH COUNTS */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.marketplace.allCategories}
            </button>

            {mockCategories.map(cat => {
              const count = mockProducts.filter(p => p.category === cat.id).length;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{t.categories[cat.id]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    selectedCategory === cat.id ? 'bg-white text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* FILTER & SORT BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-slate-200 text-xs shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              ⚙️ {t.marketplace.filterTitle}:
            </span>

            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold outline-none focus:border-emerald-500"
            >
              <option value="all">{t.marketplace.gradeAll}</option>
              <option value="Grade A">{t.marketplace.gradeA}</option>
              <option value="Grade B">{t.marketplace.gradeB}</option>
            </select>

            <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
              <input 
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>🛡️ {t.marketplace.verifiedOnly}</span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-semibold">{t.marketplace.sortTitle}:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold outline-none focus:border-emerald-500"
            >
              <option value="nearest">{t.marketplace.sortNearest}</option>
              <option value="price_low">{t.marketplace.sortPriceLowHigh}</option>
              <option value="price_high">{t.marketplace.sortPriceHighLow}</option>
              <option value="rating">{t.marketplace.sortRating}</option>
            </select>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-8 shadow-sm">
            <span className="text-5xl">🥬</span>
            <h3 className="font-bold text-lg text-slate-900 mt-3">No products match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or searching for products like Tomato, Spinach, Onion, Chilli, or Carrot.</p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedGrade('all'); setVerifiedOnly(false); }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                t={t}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* PRODUCT CARD COMPONENT */
function ProductCard({ product, t, onAddToCart, onSelectProduct, isWishlisted, onToggleWishlist }) {
  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col justify-between"
    >
      <div className="relative h-[180px] w-full overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = IMAGE_FALLBACK_SVG;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow">
            🟢 FRESH
          </span>
          {product.verified && (
            <span className="bg-white text-emerald-800 border border-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              ✓ Verified Farmer
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button 
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow transition-colors ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-600 hover:text-red-500'
          }`}
        >
          {isWishlisted ? '❤️' : '♡'}
        </button>

        <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur">
          {product.qualityGrade}
        </span>
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span>📍</span> {product.location} ({product.distanceKm} km)
          </p>
          <p className="text-[11px] text-slate-600 mt-0.5">
            🌾 Farmer: <strong className="text-slate-800">{product.farmerName}</strong>
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display font-extrabold text-xl text-emerald-600">₹{product.price}</span>
              <span className="text-xs text-slate-500">/{product.unit}</span>
              {product.oldPrice && (
                <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.oldPrice}</span>
              )}
            </div>
            <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
              Available: {product.availableQty} kg
            </span>
          </div>

          <button 
            onClick={(e) => onAddToCart(product, e)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>🛒</span> {t.marketplace.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}

/* WISHLIST VIEW */
function WishlistView({ t, products, onAddToCart, onSelectProduct, onToggleWishlist, setActiveTab }) {
  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            ❤️ My Wishlist ({products.length})
          </h1>
          <button 
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-emerald-600 hover:underline"
          >
            ← Back to Marketplace
          </button>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <span className="text-5xl">♡</span>
            <h3 className="font-bold text-lg text-slate-900 mt-3">Your wishlist is empty</h3>
            <p className="text-xs text-slate-500 mt-1">Click the heart icon on any product to save it to your wishlist.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                t={t}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   VIEW 5: PRODUCT DETAIL MODAL
   ========================================================================= */
function ProductDetailModal({ product, t, onClose, onAddToCart, setIsSetuOpen, handleSendSetuMessage, userRole }) {
  const [selectedQty, setSelectedQty] = useState(1);
  const maxQty = product.availableQty || 500;
  const itemTotal = selectedQty * product.price;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 text-white font-bold flex items-center justify-center hover:bg-slate-900 text-sm shadow transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* PRODUCT IMAGE */}
          <div className="relative h-64 md:h-full bg-slate-100">
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = IMAGE_FALLBACK_SVG;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow">
                🟢 {product.freshness}
              </span>
              <p className="font-bold text-lg mt-1">{product.name}</p>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Category: {t.categories[product.category] || product.category}
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-emerald-200">
                  {product.qualityGrade}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
                {product.name}
              </h2>
            </div>

            {/* PRICE & AVAILABILITY */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Fair Farm Rate</p>
                <div className="flex items-baseline space-x-1">
                  <span className="font-display font-extrabold text-2xl text-emerald-600">₹{product.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">/{product.unit || 'kg'}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Available Stock</p>
                <p className="font-bold text-slate-900 text-sm">{product.availableQty} kg</p>
              </div>
            </div>

            {/* FARMER INFO */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-bold text-slate-900">{product.farmerName}</p>
                  <p className="text-slate-500">{product.farmerType} • 📍 {product.location} ({product.distanceKm} km)</p>
                </div>
                {product.verified && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-1 rounded-md">
                    ✓ Verified
                  </span>
                )}
              </div>

              <p className="text-slate-600 leading-relaxed text-[11px]">
                {product.description}
              </p>
            </div>

            {/* QUANTITY SELECTOR (RETAIL 1KG TO BULK) */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Select Quantity:</span>
                <span className="text-xs font-medium text-slate-600">
                  Total: <strong className="text-emerald-600 font-extrabold text-sm">₹{itemTotal.toLocaleString('en-IN')}</strong>
                </span>
              </div>

              {/* STEPPER CONTROLS */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-slate-300 bg-white rounded-xl shadow-sm overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => setSelectedQty(prev => Math.max(1, prev - 1))}
                    disabled={selectedQty <= 1}
                    className="w-8 h-8 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-base transition-colors"
                  >
                    -
                  </button>
                  <div className="px-3 py-1 font-bold text-xs text-slate-900 min-w-[65px] text-center bg-slate-50 border-x border-slate-200">
                    {selectedQty} kg
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSelectedQty(prev => Math.min(maxQty, prev + 1))}
                    disabled={selectedQty >= maxQty}
                    className="w-8 h-8 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-base transition-colors"
                  >
                    +
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 font-medium">
                  {selectedQty >= 25 ? "⚡ Bulk Tier" : "🌾 Retail Pack"}
                </span>
              </div>

              {/* QUICK SELECTOR CHIPS */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {[1, 2, 5, 10, 25].map(qtyVal => {
                  const label = qtyVal === 25 ? '25 kg+ Bulk' : `${qtyVal} kg`;
                  const isSelected = selectedQty === qtyVal;
                  return (
                    <button
                      key={qtyVal}
                      type="button"
                      onClick={() => setSelectedQty(Math.min(maxQty, qtyVal))}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-bold transition-all ${
                        isSelected 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2.5 pt-1">
              <button 
                onClick={(e) => { onAddToCart(product, e, selectedQty); onClose(); }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>🛒</span> {t.marketplace.addToCart} ({selectedQty} kg • ₹{itemTotal.toLocaleString('en-IN')})
              </button>
              <button 
                onClick={() => {
                  onClose();
                  setIsSetuOpen(true);
                  handleSendSetuMessage(`Tell me more about ${product.name} listed by ${product.farmerName}`);
                }}
                className="px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs"
              >
                ✨ Ask SETU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   VIEW 6: SELL PRODUCE VIEW (UNIFIED LIGHT THEME)
   ========================================================================= */
function SellProduceView({ t, setActiveTab, setListedSuccessMsg, listedSuccessMsg, myListings, setMyListings, setSelectedListingForBuyers }) {
  const [formData, setFormData] = useState({
    cropName: 'Tomato',
    category: 'fruiting',
    quantity: '500',
    qualityGrade: 'Grade A',
    expectedPrice: '28',
    minPrice: '26',
    harvestDate: '2026-08-30',
    location: 'Kankipadu, Krishna District'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      id: "my-" + Date.now(),
      cropName: formData.cropName,
      category: formData.category,
      quantity: Number(formData.quantity),
      expectedPrice: Number(formData.expectedPrice),
      qualityGrade: formData.qualityGrade,
      location: formData.location,
      harvestDate: formData.harvestDate,
      status: "Active",
      buyerMatches: 3
    };
    setMyListings([newListing, ...myListings]);
    if (setSelectedListingForBuyers) {
      setSelectedListingForBuyers(newListing);
    }
    setListedSuccessMsg(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase">
            🌱 Farmer Direct Listing
          </span>
          <h1 className="font-display font-extrabold text-3xl text-slate-900">
            {t.sellProduce.title}
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            {t.sellProduce.subtitle}
          </p>
        </div>

        {listedSuccessMsg ? (
          <div className="bg-white border border-emerald-300 rounded-3xl p-8 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-sm">
              ✓
            </div>
            <div>
              <h2 className="font-bold text-2xl text-slate-900">{t.sellProduce.successTitle}</h2>
              <p className="text-xs text-slate-600 mt-2">
                Your produce listing is live! Verified buyers near you are being notified immediately.
              </p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-1">
              <p className="font-bold text-emerald-800 flex items-center gap-1">
                ✨ SETU Buyer Match Alert:
              </p>
              <p className="text-emerald-900 font-medium">
                {t.sellProduce.setuSuggestion}
              </p>
            </div>

            <div className="flex gap-4 justify-center pt-2">
              <button 
                onClick={() => {
                  if (myListings && myListings.length > 0 && setSelectedListingForBuyers) {
                    setSelectedListingForBuyers(myListings[0]);
                  }
                  setActiveTab('find_buyers');
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-md shadow-emerald-600/20"
              >
                🤝 Find Buyers Now
              </button>
              <button 
                onClick={() => setListedSuccessMsg(false)}
                className="px-5 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                List Another Crop
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Crop Name</label>
                <input 
                  type="text" 
                  value={formData.cropName} 
                  onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Category</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value="leafy">Leafy Vegetables</option>
                  <option value="root">Root Vegetables</option>
                  <option value="seasonal">Seasonal Vegetables</option>
                  <option value="spices">Spices & Condiments</option>
                  <option value="fruiting">Fruiting Vegetables</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Quantity (kg)</label>
                <input 
                  type="number" 
                  value={formData.quantity} 
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Quality Grade</label>
                <select 
                  value={formData.qualityGrade} 
                  onChange={(e) => setFormData({...formData, qualityGrade: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value="Grade A">Grade A (Premium)</option>
                  <option value="Grade B">Grade B (Standard)</option>
                  <option value="Grade C">Grade C (Processing)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Expected Price (₹/kg)</label>
                <input 
                  type="number" 
                  value={formData.expectedPrice} 
                  onChange={(e) => setFormData({...formData, expectedPrice: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Farm Location</label>
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 transition-colors uppercase tracking-wider"
            >
              🚀 Publish Listing & Find Verified Buyers
            </button>

          </form>
        )}

      </div>
    </div>
  );
}

/* MY LISTINGS VIEW */
function MyListingsView({ t, setActiveTab, myListings, setSelectedListingForBuyers }) {
  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900">📋 {t.nav.myListings}</h1>
            <p className="text-xs text-slate-500">Your active crop listings visible to verified buyers.</p>
          </div>
          <button 
            onClick={() => setActiveTab('sell_produce')}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-500"
          >
            + List New Produce
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map(item => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  {item.qualityGrade || "Grade A"}
                </span>
                <span className="text-xs text-slate-500">Harvest: {item.harvestDate}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">{item.cropName}</h3>
                <p className="text-xs text-slate-500 mt-1">Quantity: {item.quantity} kg • Location: {item.location}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-display font-bold text-xl text-emerald-600">₹{item.expectedPrice}/kg</span>
                <button 
                  onClick={() => {
                    if (setSelectedListingForBuyers) setSelectedListingForBuyers(item);
                    setActiveTab('find_buyers');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  View {item.buyerMatches || 3} Matching Buyers
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   VIEW 7: FIND BUYERS VIEW (DYNAMIC MATCHING FOR SELECTED LISTING)
   ========================================================================= */
function FindBuyersView({ t, setActiveTab, selectedListingForBuyers, setSelectedListingForBuyers, myListings, setActiveOrderTrack, setToastMessage }) {
  const currentListing = selectedListingForBuyers || (myListings && myListings[0]) || {
    id: "my-1",
    cropName: "Fresh Farm Red Tomato (Tamata)",
    category: "fruiting",
    quantity: 500,
    expectedPrice: 28,
    qualityGrade: "Grade A",
    location: "Kankipadu, Krishna District"
  };

  const crop = currentListing.cropName || currentListing.name || "Tomato";
  const qty = Number(currentListing.quantity) || 500;
  const price = Number(currentListing.expectedPrice || currentListing.price) || 28;
  const grade = currentListing.qualityGrade || currentListing.grade || "Grade A";
  const loc = currentListing.location || "Krishna District";

  // Dynamic Buyer Offers tailored to the selected crop listing
  const offers = [
    {
      id: "b-1",
      name: "FreshMart Wholesale",
      type: "Wholesaler / Bulk Buyer",
      wantsQty: Math.round(qty * 0.75),
      offerPrice: price + 1,
      matchScore: 94,
      distanceKm: 18,
      rating: 4.8,
      matchReason: `Needs ${Math.round(qty * 0.75)} kg ${crop} for retail distribution. Verified top buyer.`
    },
    {
      id: "b-2",
      name: "Delta Agro Processors",
      type: "Processor / Industry",
      wantsQty: qty,
      offerPrice: price + 0.5,
      matchScore: 89,
      distanceKm: 25,
      rating: 4.7,
      matchReason: `Requires full batch of ${qty} kg ${crop} for processing.`
    },
    {
      id: "b-3",
      name: "Coastal Retailers Co-op",
      type: "Retailer",
      wantsQty: Math.round(qty * 0.5),
      offerPrice: price,
      matchScore: 82,
      distanceKm: 12,
      rating: 4.9,
      matchReason: `Daily procurement for local markets within 15 km.`
    }
  ];

  const [acceptedOfferId, setAcceptedOfferId] = useState(null);

  const handleAccept = (buyer) => {
    setAcceptedOfferId(buyer.id);

    const newOrder = {
      id: "AGC" + Math.floor(1000 + Math.random() * 9000),
      productName: crop,
      category: currentListing.category || "fruiting",
      quantity: buyer.wantsQty,
      unit: "kg",
      unitPrice: buyer.offerPrice,
      totalAmount: buyer.wantsQty * buyer.offerPrice,
      deliveryFee: 65,
      grandTotal: (buyer.wantsQty * buyer.offerPrice) + 65,
      farmerName: "Ramesh Reddy",
      buyerName: buyer.name,
      buyerType: buyer.type,
      status: "in_transit",
      deliveryStatus: "In Transit",
      estimatedArrival: "4:30 PM",
      distanceKm: buyer.distanceKm,
      routeEfficiency: 94,
      orderDate: "2026-08-30",
      timeline: [
        { step: "Order Placed", time: "Just Now", completed: true },
        { step: "Farmer Confirmed", time: "Just Now", completed: true },
        { step: "Produce Collected", time: "Processing", completed: true },
        { step: "In Transit", time: "Est 04:30 PM", completed: true, active: true },
        { step: "Delivered", time: "Est 04:30 PM", completed: false },
        { step: "Payment Settled", time: "Pending Verification", completed: false }
      ]
    };

    if (setActiveOrderTrack) {
      setActiveOrderTrack(newOrder);
    }
    if (setToastMessage) {
      setToastMessage(`Offer accepted from ${buyer.name} for ${buyer.wantsQty} kg ${crop} at ₹${buyer.offerPrice}/kg! Navigating to delivery tracking...`);
    }
    setTimeout(() => {
      setActiveTab('logistics');
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER & DYNAMIC SELECTED PRODUCE BADGE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase">
              🎯 AI Smart Matching Engine
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-2">
              {t.findBuyers.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {t.findBuyers.subtitle}
            </p>
          </div>

          <div className="bg-emerald-50/90 border border-emerald-200 p-4 rounded-xl text-xs space-y-2 max-w-md w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-600 font-semibold">{t.findBuyers.selectedCrop}:</span>
              {myListings && myListings.length > 1 && (
                <select 
                  value={currentListing.id} 
                  onChange={(e) => {
                    const found = myListings.find(l => l.id === e.target.value);
                    if (found && setSelectedListingForBuyers) {
                      setSelectedListingForBuyers(found);
                      setAcceptedOfferId(null);
                    }
                  }}
                  className="bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-lg px-2 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {myListings.map(l => (
                    <option key={l.id} value={l.id}>{l.cropName} ({l.quantity} kg)</option>
                  ))}
                </select>
              )}
            </div>
            <p className="text-emerald-900 font-extrabold text-sm">
              Selected Produce: {qty} kg {grade} {crop} (₹{price}/kg)
            </p>
            <p className="text-[11px] text-slate-500">📍 Location: {loc}</p>
          </div>
        </div>

        {/* BUYERS LIST */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-slate-900">
            Top Verified Buyer Matches for {crop} ({offers.length} Matches Found)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map(buyer => (
              <div 
                key={buyer.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 relative flex flex-col justify-between hover:border-emerald-500 transition-colors shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{buyer.type}</span>
                    <span className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2.5 py-1 rounded-full border border-emerald-200">
                      {buyer.matchScore}% {t.findBuyers.matchScore}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{buyer.name}</h3>
                    <p className="text-xs text-slate-500">📍 {buyer.distanceKm} km away • Rating: ★ {buyer.rating}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.findBuyers.wants}:</span>
                      <span className="text-slate-900 font-bold">{buyer.wantsQty} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.findBuyers.offers}:</span>
                      <span className="text-emerald-600 font-extrabold text-sm">₹{buyer.offerPrice}/kg</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic leading-relaxed">
                    "{buyer.matchReason}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {acceptedOfferId === buyer.id ? (
                    <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-center space-y-2">
                      <p className="text-xs font-bold text-emerald-800">✓ Offer Accepted & Delivery Pipeline Active!</p>
                      <button 
                        onClick={() => setActiveTab('logistics')}
                        className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-colors"
                      >
                        Track Delivery Pipeline →
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAccept(buyer)}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-colors"
                    >
                      {t.findBuyers.acceptOffer} (₹{buyer.offerPrice}/kg)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   VIEW 8: PRICE INTELLIGENCE VIEW (CHART.JS PRICE HISTORY FIX)
   ========================================================================= */
function PriceIntelligenceView({ t }) {
  const [selectedCropTrend, setSelectedCropTrend] = useState('Tomato');
  const cropData = mockPriceTrends[selectedCropTrend] || mockPriceTrends.Tomato;
  
  const chartCanvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Initialize & Update Chart.js Instance
  useEffect(() => {
    if (!chartCanvasRef.current) return;
    
    // Check if Chart object exists globally
    if (typeof window.Chart === 'undefined') {
      console.warn('Chart.js library is not loaded');
      return;
    }

    // Destroy existing chart if present
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    
    // Create soft gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(22, 163, 74, 0.25)');
    gradient.addColorStop(1, 'rgba(22, 163, 74, 0.01)');

    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: cropData.labels,
        datasets: [{
          label: `${selectedCropTrend} Benchmark Price (₹/kg)`,
          data: cropData.history,
          borderColor: '#16a34a',
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointBackgroundColor: '#16a34a',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#334155',
              font: {
                family: 'Inter',
                weight: '600',
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#ffffff',
            bodyColor: '#34d399',
            bodyFont: { weight: 'bold' },
            callbacks: {
              label: (context) => ` Price: ₹${context.raw}/kg`
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#f1f5f9' },
            ticks: { color: '#64748b', font: { weight: '600' } }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: { 
              color: '#64748b', 
              font: { weight: '600' },
              callback: (value) => '₹' + value 
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedCropTrend]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase">
            📊 Mandi Price Intelligence Engine
          </span>
          <h1 className="font-display font-extrabold text-3xl text-slate-900 mt-2">
            {t.priceIntel.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {t.priceIntel.subtitle}
          </p>
        </div>

        {/* CROP SELECTOR */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Object.keys(mockPriceTrends).map(crop => (
            <button 
              key={crop}
              onClick={() => setSelectedCropTrend(crop)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedCropTrend === crop 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {crop} Benchmark
            </button>
          ))}
        </div>

        {/* PRICE STATS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
            <p className="text-xs text-slate-500 font-medium">{t.priceIntel.todayPrice}</p>
            <p className="font-display font-extrabold text-3xl text-emerald-600 mt-1">₹{cropData.today}/kg</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
            <p className="text-xs text-slate-500 font-medium">{t.priceIntel.yesterdayPrice}</p>
            <p className="font-display font-bold text-2xl text-slate-800 mt-1">₹{cropData.yesterday}/kg</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
            <p className="text-xs text-slate-500 font-medium">{t.priceIntel.avg7Day}</p>
            <p className="font-display font-bold text-2xl text-slate-800 mt-1">₹{cropData.avg7Day}/kg</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-amber-300 text-center shadow-sm">
            <p className="text-xs text-amber-700 font-bold">{t.priceIntel.predictedTomorrow}</p>
            <p className="font-display font-extrabold text-3xl text-amber-600 mt-1">₹{cropData.predictedTomorrow}/kg</p>
          </div>
        </div>

        {/* CHART.JS PRICE HISTORY CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">{t.priceIntel.chartTitle} — {selectedCropTrend}</h3>
            <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-600 border border-slate-200 font-semibold">
              {t.priceIntel.demoNotice}
            </span>
          </div>

          {/* CHART CANVAS CONTAINER WITH EXPLICIT 280px HEIGHT */}
          <div style={{ position: 'relative', width: '100%', height: '280px' }}>
            <canvas id="priceChart" ref={chartCanvasRef}></canvas>
          </div>
        </div>

        {/* SETU ADVICE */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-2">
          <h3 className="font-bold text-sm text-emerald-800 flex items-center gap-1.5">
            ✨ SETU Price Intelligence Recommendation:
          </h3>
          <p className="text-xs text-emerald-900 font-medium leading-relaxed">
            {t.priceIntel.setuFarmerAdvice}
          </p>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   VIEW 9: MARKET DEMAND VIEW (UNIFIED LIGHT THEME)
   ========================================================================= */
/* =========================================================================
   SETU AI AGRICULTURAL DECISION SUPPORT & DEMAND FORECASTING PORTAL
   ========================================================================= */
function SetuPortalView({ 
  t, 
  setActiveTab, 
  setIsSetuOpen,
  userRole, 
  userName,
  setuMessages,
  setSetuMessages,
  setuInput,
  setSetuInput,
  onSendMessage,
  isListening,
  onVoiceInput,
  initialSubTab = 'advisor'
}) {
  const [subTab, setSubTab] = useState(initialSubTab); // 'advisor', 'demand_trends', 'chat'

  // Tab 1 Filters
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Visakhapatnam');
  const [selectedSeason, setSelectedSeason] = useState('Kharif 2027');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [explainOpen, setExplainOpen] = useState(true);
  const [faqOpen, setFaqOpen] = useState(true);

  // Tab 2 Filters
  const [selectedCommodity, setSelectedCommodity] = useState('Tomato');
  const [timeHorizon, setTimeHorizon] = useState('7day'); // '7day' or '30day'

  // Chart ref for Tab 2
  const demandChartRef = useRef(null);
  const demandChartInstance = useRef(null);

  // Handle Analyze Action
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  // Get current forecast matrix items
  const districtData = (typeof mockSetuForecastMatrix !== 'undefined' && mockSetuForecastMatrix[selectedDistrict]) 
    ? mockSetuForecastMatrix[selectedDistrict] 
    : (typeof mockSetuForecastMatrix !== 'undefined' ? mockSetuForecastMatrix['Visakhapatnam'] : {});
  
  const matrixItems = (districtData && districtData[selectedSeason]) 
    ? districtData[selectedSeason] 
    : (districtData && districtData['Kharif 2027']) 
    ? districtData['Kharif 2027'] 
    : [
        { crop: "Tomato", icon: "🍅", demandPct: 92, demandLevel: "HIGH", priceTrend: "↑ (+18%)", priceTrendType: "up", score: 88, bestFit: "High Volume Buyers Nearby" },
        { crop: "Onion", icon: "🧅", demandPct: 85, demandLevel: "HIGH", priceTrend: "→ (+4%)", priceTrendType: "flat", score: 82, bestFit: "Urban Retail Hubs" },
        { crop: "Hot Chilli", icon: "🌶️", demandPct: 68, demandLevel: "MEDIUM", priceTrend: "↑ (+12%)", priceTrendType: "up", score: 74, bestFit: "Spice Exporters" },
        { crop: "Potato", icon: "🥔", demandPct: 42, demandLevel: "LOW", priceTrend: "↓ (-6%)", priceTrendType: "down", score: 52, bestFit: "Cold Storage Hold" }
      ];

  // Tab 2 Chart.js render
  const commodityTrend = (typeof mockSetuDemandTrends !== 'undefined' && mockSetuDemandTrends[selectedCommodity])
    ? mockSetuDemandTrends[selectedCommodity]
    : {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        demand: [320, 350, 410, 480, 520, 490, 440],
        supply: [280, 290, 310, 330, 340, 350, 360],
        peakDays: "Day 4 - Day 5 (Thu-Fri)",
        deficitWindow: "Day 3 to Day 5 (Deficit: ~180 Tons)",
        avgPrice: "₹28 - ₹34/kg"
      };

  useEffect(() => {
    if (subTab !== 'demand_trends') return;
    if (!demandChartRef.current) return;
    if (typeof window.Chart === 'undefined') return;

    if (demandChartInstance.current) {
      demandChartInstance.current.destroy();
    }

    const ctx = demandChartRef.current.getContext('2d');
    
    const gradientDemand = ctx.createLinearGradient(0, 0, 0, 300);
    gradientDemand.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
    gradientDemand.addColorStop(1, 'rgba(239, 68, 68, 0.01)');

    const gradientSupply = ctx.createLinearGradient(0, 0, 0, 300);
    gradientSupply.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
    gradientSupply.addColorStop(1, 'rgba(16, 185, 129, 0.01)');

    const labels = timeHorizon === '30day' 
      ? ["Week 1", "Week 2", "Week 3", "Week 4"] 
      : commodityTrend.labels;
    
    const demandValues = timeHorizon === '30day' 
      ? [2400, 3100, 3800, 3200] 
      : commodityTrend.demand;
    
    const supplyValues = timeHorizon === '30day' 
      ? [2100, 2300, 2500, 2600] 
      : commodityTrend.supply;

    demandChartInstance.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: `Forecasted Local Demand (${selectedCommodity})`,
            data: demandValues,
            borderColor: '#ef4444',
            backgroundColor: gradientDemand,
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#ef4444',
            pointRadius: 5
          },
          {
            label: `Expected Local Supply (${selectedCommodity})`,
            data: supplyValues,
            borderColor: '#10b981',
            backgroundColor: gradientSupply,
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#10b981',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#334155',
              font: { family: 'Inter', weight: '600', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#ffffff',
            bodyFont: { weight: 'bold' }
          }
        },
        scales: {
          x: { grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { weight: '600' } } },
          y: { grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { weight: '600' } } }
        }
      }
    });

    return () => {
      if (demandChartInstance.current) {
        demandChartInstance.current.destroy();
      }
    };
  }, [subTab, selectedCommodity, timeHorizon]);

  // Chat message list
  const chatMessagesList = (setuMessages && setuMessages.length > 0) 
    ? setuMessages 
    : [
        { id: 1, sender: 'setu', text: "Hello! I am SETU, your AI Agricultural Advisor. How can I assist your crop planning or market demand queries today?" }
      ];

  const quickPrompts = [
    "🌾 What is the expected price for Tomato next month?",
    "🚜 Which fertilizer is optimal for Kharif season?",
    "📦 How do I join a bulk buyer procurement pool?"
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* PORTAL HEADER & TITLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>✨ SETU AI Intelligence Portal</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 pt-1">
                Agricultural Decision Support & Demand Forecasting
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Probabilistic demand forecasting &amp; strategic crop advisory to assist farmgate planning.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs space-y-1 text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">CONFIDENCE SCORE</p>
              <p className="text-emerald-700 font-extrabold text-base">88% Advisory</p>
              <p className="text-[10px] text-slate-400 font-medium">Continuously recalibrated</p>
            </div>
          </div>

          {/* 3 TOP PILL TABS */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSubTab('advisor')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                subTab === 'advisor'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>🌱</span> Next Season Crop Advisor
            </button>

            <button
              onClick={() => setSubTab('demand_trends')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                subTab === 'demand_trends'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>📈</span> Market Demand Trends
            </button>

            <button
              onClick={() => setSubTab('chat')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                subTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>💬</span> Interactive SETU Advisor Chat
            </button>
          </div>

          {/* ADVISORY DISCLAIMER PILL */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5 font-medium shadow-xs">
            <span className="text-base leading-none">🛡️</span>
            <p>
              <strong className="font-bold text-amber-900">AI Advisory Notice:</strong> Predictions represent probabilistic market guidance based on historical APMC mandi data and active procurement contracts. Cultivation plans should factor in local micro-climate and diversified buyer channels.
            </p>
          </div>
        </div>

        {/* SUB-VIEW 1: 🌱 NEXT SEASON CROP ADVISOR */}
        {subTab === 'advisor' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* REGION & SEASON FILTER CONTROLS */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <span>⚙️</span> Region & Season Target Selector
                </h3>
                <span className="text-xs text-slate-500 font-medium">Real-time Demand Model v2.4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* State (Pre-selected) */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">State</label>
                  <select 
                    value={selectedState} 
                    disabled 
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-700 cursor-not-allowed"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh ▼</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">District</label>
                  <select 
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-white border border-slate-300 hover:border-emerald-500 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option value="Visakhapatnam">Visakhapatnam ▼</option>
                    <option value="Krishna">Krishna ▼</option>
                    <option value="Guntur">Guntur ▼</option>
                    <option value="East Godavari">East Godavari ▼</option>
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Season</label>
                  <select 
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="w-full bg-white border border-slate-300 hover:border-emerald-500 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option value="Kharif 2027">Kharif 2027 ▼</option>
                    <option value="Rabi 2026-27">Rabi 2026-27 ▼</option>
                    <option value="Zaid 2027">Zaid 2027 ▼</option>
                  </select>
                </div>

                {/* Action Button */}
                <div className="flex items-end">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>🔍</span>
                        <span>Analyze Next Season Demand</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* FORECASTED DEMAND MATRIX */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-slate-900">
                    Forecasted Demand Matrix ({selectedDistrict} — {selectedSeason})
                  </h2>
                  <p className="text-xs text-slate-500">Predicted procurement volume & recommendation scoring based on regional buyer commitments.</p>
                </div>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full hidden sm:inline-block">
                  4 Crops Forecasted
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {matrixItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Crop & Icon Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-3xl">{item.icon}</span>
                          <div>
                            <h3 className="font-extrabold text-lg text-slate-900">{item.crop}</h3>
                            <span className="text-[10px] text-slate-500 font-semibold">Recommended Fit</span>
                          </div>
                        </div>
                        <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                          item.demandLevel === 'HIGH' || item.demandLevel === 'VERY HIGH'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : item.demandLevel === 'MEDIUM'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {item.demandLevel}
                        </span>
                      </div>

                      {/* Demand Progress Bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-600">Expected Demand:</span>
                          <span className="text-slate-900">{item.demandPct}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.demandPct >= 80 ? 'bg-emerald-500' : item.demandPct >= 60 ? 'bg-amber-500' : 'bg-slate-400'
                            }`}
                            style={{ width: `${item.demandPct}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Expected Price Trend */}
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Price Trend:</span>
                          <span className={`font-extrabold text-sm ${
                            item.priceTrendType === 'up' ? 'text-emerald-600' : item.priceTrendType === 'down' ? 'text-red-600' : 'text-slate-700'
                          }`}>
                            {item.priceTrend}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                          <span className="text-slate-500 font-medium">Recommendation Score:</span>
                          <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            {item.score}/100
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Best Fit Badge */}
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl block text-center truncate">
                        🎯 Best Fit: {item.bestFit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPLAINABLE DECISION SUPPORT CARD */}
            <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-600/20">
                  🤖
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900">
                    🤖 SETU Strategic Crop Recommendation (Decision Support)
                  </h3>
                  <p className="text-xs text-emerald-700 font-bold">Probabilistic Advisory for {selectedDistrict} — {selectedSeason}</p>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200 italic">
                "Consider allocating a moderate portion of available acreage toward Tomato and Onion for Kharif 2027 based on projected urban retail deficits. We advise maintaining diversified crop allocations to hedge against localized price volatility."
              </p>

              {/* Expandable Explainability Accordion */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExplainOpen(!explainOpen)}
                  className="w-full bg-slate-50 hover:bg-slate-100 p-4 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>💡</span> Why this recommendation &amp; Risk Safeguards
                  </span>
                  <span className="text-slate-500 font-extrabold">{explainOpen ? '▲ Hide' : '▼ Expand'}</span>
                </button>

                {explainOpen && (
                  <div className="p-4 sm:p-5 bg-white space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-200 animate-in fade-in duration-150">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                      <span className="text-emerald-600 font-bold text-base">✔</span>
                      <p className="font-semibold text-emerald-950">Demand Trend: Regional mandi arrivals projected 18% below anticipated urban demand.</p>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                      <span className="text-emerald-600 font-bold text-base">✔</span>
                      <p className="font-semibold text-emerald-950">Channel Diversification: 3 local processing units + 8 retail co-ops actively seeking forward contracts.</p>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                      <span className="text-emerald-600 font-bold text-base">✔</span>
                      <p className="font-semibold text-emerald-950">Risk Mitigation: Multi-buyer matching on AgriConnect provides alternative off-take channels if localized spot prices fluctuate.</p>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                      <span className="text-emerald-600 font-bold text-base">✔</span>
                      <p className="font-semibold text-emerald-950">Dynamic Recalibration: Forecasts automatically update every 14 days as new acreage and planting data become available.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Action Plan (Step-by-Step) */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span>📋</span> Suggested Action Plan (Step-by-Step Execution)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-2xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                      1
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-900">Reserve Seed Procurement</h5>
                    <p className="text-xs text-slate-600 font-medium">Reserve nursery seeds by March 15 to ensure high-germination variety access.</p>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-2xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                      2
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-900">Pre-list Planned Acreage</h5>
                    <p className="text-xs text-slate-600 font-medium">Pre-list planned acreage on AgriConnect to match pre-harvest bulk demand.</p>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-2xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                      3
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-900">Lock Floor Price</h5>
                    <p className="text-xs text-slate-600 font-medium">Lock minimum floor price via Smart Escrow pre-orders before harvesting.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* QUICK FAQ / JURY DEFENSE CARD */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <button
                onClick={() => setFaqOpen(!faqOpen)}
                className="w-full text-left flex items-center justify-between font-display font-extrabold text-lg text-slate-900 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>❓</span> How AgriConnect Protects Farmers if Market Demand Shifts
                </span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  {faqOpen ? '▲ Hide Defense Details' : '▼ View Safeguards'}
                </span>
              </button>

              {faqOpen && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-xs animate-in fade-in duration-150">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <h5 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>⚡</span> Dynamic Adjustments
                    </h5>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Real-time demand updates before planting cycles conclude.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <h5 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>🏬</span> Multi-Channel Off-Take
                    </h5>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Automatic routing to institutional processors if spot retail demand softens.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <h5 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>🔒</span> Pre-Harvest Escrow Matching
                    </h5>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Option to lock minimum floor price commitments with verified bulk buyers early.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* SUB-VIEW 2: 📈 MARKET DEMAND TRENDS */}
        {subTab === 'demand_trends' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* COMMODITY SELECTOR PILLS & HORIZON TOGGLE */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-slate-900">
                    Market Demand Trends & Procurement Curve
                  </h2>
                  <p className="text-xs text-slate-500">Track 7-Day & Monthly regional demand vs. supply curves to identify deficit windows.</p>
                </div>

                {/* Horizon Selector */}
                <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setTimeHorizon('7day')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      timeHorizon === '7day' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    7-Day Forecast
                  </button>
                  <button
                    onClick={() => setTimeHorizon('30day')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      timeHorizon === '30day' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Monthly Forecast
                  </button>
                </div>
              </div>

              {/* Commodity Selector Pills */}
              <div className="flex gap-2.5 overflow-x-auto pb-1 pt-2">
                {['Tomato', 'Onion', 'Brinjal', 'Capsicum', 'Ginger'].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCommodity(crop)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCommodity === crop
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {crop === 'Tomato' ? '🍅' : crop === 'Onion' ? '🧅' : crop === 'Brinjal' ? '🍆' : crop === 'Capsicum' ? '🫑' : '🫚'} {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* DEMAND VS SUPPLY CURVE CHART CARD */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span>📊</span> {selectedCommodity} Demand vs. Supply Projection ({timeHorizon === '7day' ? '7-Day View' : 'Monthly View'})
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-3 py-1 rounded-full">
                  Avg Benchmark: {commodityTrend.avgPrice}
                </span>
              </div>

              {/* Chart Canvas */}
              <div style={{ position: 'relative', width: '100%', height: '320px' }}>
                <canvas id="demandChart" ref={demandChartRef}></canvas>
              </div>

              {/* Callout Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-red-50/70 border border-red-200 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center space-x-2 text-red-800 font-extrabold text-xs">
                    <span>🔥</span>
                    <h4>Peak Procurement Days</h4>
                  </div>
                  <p className="text-xs text-red-950 font-bold">{commodityTrend.peakDays}</p>
                  <p className="text-[11px] text-slate-500">Highest wholesale buyer activity expected during this timeframe.</p>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-xs">
                    <span>⚠️</span>
                    <h4>Expected Local Retail Deficit Window</h4>
                  </div>
                  <p className="text-xs text-amber-950 font-bold">{commodityTrend.deficitWindow}</p>
                  <p className="text-[11px] text-slate-500">Favorable selling window with premium floor price potential.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SUB-VIEW 3: 💬 INTERACTIVE SETU ADVISOR CHAT */}
        {subTab === 'chat' && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[650px] animate-in fade-in duration-200">
            
            {/* EMBEDDED CHAT HEADER */}
            <div className="bg-emerald-600 p-5 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h3 className="font-extrabold text-base flex items-center gap-2">
                    SETU AI Advisor Chat <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                  </h3>
                  <p className="text-xs text-emerald-100 font-medium">Powered by Gemini • Real-time Agronomic & Market Intelligence</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-emerald-700/60 px-3 py-1 rounded-full border border-emerald-400/30">
                Online • {userName || 'Ramesh Reddy'} ({userRole.toUpperCase()})
              </span>
            </div>

            {/* QUICK PROMPTS CHIPS */}
            <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
              <span className="text-slate-500 font-bold whitespace-nowrap text-[11px] uppercase tracking-wider pl-1">Quick Prompts:</span>
              {quickPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(promptText)}
                  className="px-3.5 py-1.5 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-slate-800 font-semibold rounded-xl border border-slate-200 whitespace-nowrap shadow-xs transition-colors cursor-pointer"
                >
                  {promptText}
                </button>
              ))}
            </div>

            {/* MESSAGES BODY */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-50">
              {chatMessagesList.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-3xl shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none font-medium'
                  }`}>
                    {msg.sender === 'setu' && (
                      <div className="text-[10px] font-bold text-emerald-600 mb-1 flex items-center gap-1">
                        <span>✨ SETU AI Advisor</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CHAT INPUT BAR */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center space-x-3">
              <button 
                onClick={onVoiceInput}
                className={`p-3 rounded-2xl border transition-colors ${
                  isListening ? 'bg-red-600 border-red-500 text-white animate-pulse' : 'bg-slate-100 border-slate-200 text-emerald-600 hover:bg-emerald-50'
                }`}
                title="Voice Input"
              >
                🎤
              </button>
              <input 
                type="text"
                value={setuInput}
                onChange={(e) => setSetuInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                placeholder="Ask SETU about crop advice, market trends, or buyer connections..."
                className="flex-grow bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
              <button 
                onClick={() => onSendMessage()}
                className="p-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-colors"
              >
                Send ➤
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}


/* =========================================================================
   VIEW 10: SMART LOGISTICS VIEW (UNIFIED LIGHT THEME)
   ========================================================================= */
function SmartLogisticsView({ t, order, userRole, setRatingModalOrder, setShowEscrowModal, setToastMessage }) {
  const isFarmer = userRole === 'farmer';

  // Role-differentiated pipeline step 6
  const roleTimeline = order.timeline.map((step, idx) => {
    if (idx === 5) {
      return {
        ...step,
        step: isFarmer ? "Payment Settled" : "Delivered & Verified",
        time: isFarmer ? "Pending Delivery Verification" : "Pending OTP Handover"
      };
    }
    return step;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold px-3 py-1 rounded-full uppercase">
            🚚 AgriConnect Platform Logistics
          </span>
          <h1 className="font-display font-extrabold text-3xl text-slate-900 mt-2">
            {t.smartLogistics.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {t.smartLogistics.subtitle}
          </p>
        </div>

        {/* ACTIVE ORDER CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8 shadow-sm">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{order.id}</span>
              <h2 className="font-bold text-2xl text-slate-900 mt-1">{order.productName} ({order.quantity} kg)</h2>
              <p className="text-xs text-slate-500">Farmer: {order.farmerName} • Buyer: {order.buyerName}</p>
              
              {/* ROLE SPECIFIC SECURITY BADGE */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mt-3 shadow-xs">
                <span>🛡️</span>
                <span>
                  {isFarmer 
                    ? "Settlement Mode: Smart Escrow Protected (₹2,800)" 
                    : "OTP for Delivery Confirmation: 4892"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full inline-block">
                🚚 Status: {order.deliveryStatus}
              </span>
              <p className="text-xs text-slate-600 mt-2">ETA: <strong className="text-slate-900">{order.estimatedArrival}</strong></p>
            </div>
          </div>

          {/* VISUAL TIMELINE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Logistics Progress Pipeline</h3>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Mode: <strong className="text-emerald-700 uppercase font-extrabold">{isFarmer ? '🌾 Farmer View' : '🛒 Buyer View'}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center">
              {roleTimeline.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border text-xs flex flex-col items-center justify-center space-y-2 ${
                    step.active 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/30 shadow-sm' 
                      : step.completed 
                      ? 'bg-slate-100 border-slate-200 text-slate-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.completed || step.active ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </span>
                  <p className="font-bold leading-tight">{step.step}</p>
                  <span className="text-[10px] text-slate-500">{step.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ROUTE METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">Distance Remaining</p>
              <p className="font-bold text-lg text-slate-900 mt-1">{order.distanceKm} km</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">Route Efficiency</p>
              <p className="font-bold text-lg text-emerald-600 mt-1">{order.routeEfficiency}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">Platform Delivery Charge</p>
              <p className="font-bold text-lg text-slate-900 mt-1">₹{order.deliveryFee}</p>
            </div>
          </div>

          {/* ACTION BUTTONS DIFFERENTIATED BY ACTIVE ROLE */}
          <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100">
            {isFarmer ? (
              <>
                <button 
                  onClick={() => setToastMessage("Calling Transport Hub Dispatcher (+91 98765 43210)...")}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
                >
                  📞 Call Transport Hub
                </button>
                <button 
                  onClick={() => setShowEscrowModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  💳 Escrow & Payout Details
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setToastMessage("Connecting to Hub Driver Ramesh (+91 98765 12345)...")}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
                >
                  📞 Contact Hub / Driver
                </button>
                <button 
                  onClick={() => setRatingModalOrder(order)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  ⭐ Rate Farmer & Produce Quality
                </button>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

/* RYTHU BAZAAR VIEW */
function RythuBazaarView({ t }) {
  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase">
            🏛️ Physical Market Network Integration
          </span>
          <h1 className="font-display font-extrabold text-3xl text-slate-900 mt-2">
            {t.rythuBazaar.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {t.rythuBazaar.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRythuBazaars.map(bazaar => (
            <div key={bazaar.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-slate-900">{bazaar.name}</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  📍 {bazaar.distanceKm} km away
                </span>
              </div>
              <p className="text-xs text-slate-600">📍 {bazaar.location}</p>
              <p className="text-xs text-slate-500">🕒 {t.rythuBazaar.openHours}: {bazaar.openHours}</p>
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex justify-between">
                <span className="text-slate-500 font-medium">{t.rythuBazaar.availableStalls}:</span>
                <span className="text-emerald-700 font-bold">{bazaar.activeStalls} Stalls</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ROLE SELECTION & REGISTRATION VIEWS (UNIFIED LIGHT THEME)
   ========================================================================= */
function RoleSelectionView({ t, setActiveTab, setUserRole }) {
  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center text-slate-900">
      <div className="max-w-xl w-full mx-4 bg-white border border-slate-200 rounded-3xl p-8 space-y-8 shadow-xl text-center">
        
        <div>
          <span className="text-4xl">🌱</span>
          <h1 className="font-display font-extrabold text-3xl text-slate-900 mt-3">
            {t.verification.accountTypeTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Select your account type to proceed with registration or login.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div 
            onClick={() => {
              setUserRole('farmer');
              setActiveTab('farmer_register');
            }}
            className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer transition-all transform hover:-translate-y-0.5 text-center space-y-3 group"
          >
            <span className="text-5xl block group-hover:scale-110 transition-transform">👨🌾</span>
            <h3 className="font-bold text-lg text-slate-900">{t.verification.farmerOption}</h3>
            <p className="text-xs text-slate-500">Sell crop produce directly, check mandi prices, and find buyers.</p>
          </div>

          <div 
            onClick={() => {
              setUserRole('buyer');
              setActiveTab('buyer_register');
            }}
            className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer transition-all transform hover:-translate-y-0.5 text-center space-y-3 group"
          >
            <span className="text-5xl block group-hover:scale-110 transition-transform">🛒</span>
            <h3 className="font-bold text-lg text-slate-900">{t.verification.buyerOption}</h3>
            <p className="text-xs text-slate-500">Source farm-fresh vegetables, fruits, and spices from verified farmers.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function FarmerRegisterView({ t, setActiveTab, farmerVerified, setFarmerVerified, farmerPending, setFarmerPending }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFarmerPending(true);
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-900">
      <div className="max-w-2xl mx-auto px-4 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-1">
          <span className="text-3xl">👨🌾</span>
          <h1 className="font-display font-extrabold text-2xl text-slate-900">{t.verification.farmerTitle}</h1>
          <p className="text-xs text-slate-500 font-medium">Complete verification to receive direct buyer offers and the Verified badge.</p>
        </div>

        {submitted ? (
          <div className="bg-slate-50 p-6 rounded-2xl border border-emerald-300 text-center space-y-4">
            <span className="text-4xl text-emerald-600 block">✓</span>
            <h2 className="font-bold text-xl text-slate-900">{t.verification.submitSuccessTitle}</h2>
            <span className="inline-block bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
              {t.verification.statusPending}
            </span>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2 text-left">
              <p className="font-bold text-amber-700">Notice:</p>
              <p>{t.verification.demoApprovedNotice}</p>
            </div>

            <button 
              onClick={() => {
                setFarmerVerified(true);
                setFarmerPending(false);
                setActiveTab('farmer_dashboard');
              }}
              className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 shadow-md shadow-emerald-600/20"
            >
              {t.verification.demoApprovedBtn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.fullName}</label>
                <input type="text" required defaultValue="Ramesh Reddy" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.mobile}</label>
                <input type="tel" required defaultValue="+91 98480 12345" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.state}</label>
                <input type="text" required defaultValue="Andhra Pradesh" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.district}</label>
                <input type="text" required defaultValue="Krishna District" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.farmName}</label>
                <input type="text" defaultValue="Reddy Organic Greens Farm" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.farmerType}</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900">
                  <option>{t.verification.individualFarmer}</option>
                  <option>{t.verification.fpoOrg}</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.govProofType}</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900">
                  <option>{t.verification.aadhaar}</option>
                  <option>{t.verification.voterId}</option>
                  <option>{t.verification.pan}</option>
                  <option>{t.verification.otherId}</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.verification.docNumber}</label>
                <input type="text" required defaultValue="XXXX-XXXX-8421" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.verification.uploadProof}</label>
              <input type="file" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-600 text-xs" />
            </div>

            <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white rounded-xl text-sm mt-4 shadow-md shadow-emerald-600/20">
              {t.verification.submitFarmer}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function BuyerRegisterView({ t, setActiveTab, buyerVerified, setBuyerVerified }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setBuyerVerified(true);
    setActiveTab('buyer_dashboard');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-900">
      <div className="max-w-2xl mx-auto px-4 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-1">
          <span className="text-3xl">🛒</span>
          <h1 className="font-display font-extrabold text-2xl text-slate-900">{t.verification.buyerTitle}</h1>
          <p className="text-xs text-slate-500 font-medium">Create your buyer account to source produce directly from verified farmers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.verification.fullName}</label>
              <input type="text" required defaultValue="FreshMart Wholesale Co." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.verification.mobile}</label>
              <input type="tel" required defaultValue="+91 94400 11223" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.verification.buyerType}</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900">
                <option>{t.verification.wholesaler}</option>
                <option>{t.verification.retailer}</option>
                <option>{t.verification.processor}</option>
                <option>{t.verification.bulkBuyer}</option>
                <option>{t.verification.exporter}</option>
                <option>{t.verification.consumer}</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.verification.state}</label>
              <input type="text" required defaultValue="Andhra Pradesh" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900" />
            </div>
          </div>

          <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white rounded-xl text-sm mt-4 shadow-md shadow-emerald-600/20">
            {t.verification.submitBuyer}
          </button>
        </form>
      </div>
    </div>
  );
}

function FarmerLoginView({ t, setActiveTab, setUserRole }) {
  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center text-slate-900">
      <div className="max-w-md w-full mx-4 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
        <h2 className="font-bold text-2xl text-center text-slate-900">👨🌾 {t.nav.loginFarmer}</h2>
        <input type="tel" defaultValue="+91 98480 12345" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900" />
        <input type="password" defaultValue="••••••••" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900" />
        <button 
          onClick={() => { setUserRole('farmer'); setActiveTab('farmer_dashboard'); }}
          className="w-full py-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20"
        >
          Login as Farmer
        </button>
      </div>
    </div>
  );
}

function BuyerLoginView({ t, setActiveTab, setUserRole }) {
  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center text-slate-900">
      <div className="max-w-md w-full mx-4 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
        <h2 className="font-bold text-2xl text-center text-slate-900">🛒 {t.nav.loginBuyer}</h2>
        <input type="tel" defaultValue="+91 94400 11223" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900" />
        <input type="password" defaultValue="••••••••" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900" />
        <button 
          onClick={() => { setUserRole('buyer'); setActiveTab('buyer_dashboard'); }}
          className="w-full py-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20"
        >
          Login as Buyer
        </button>
      </div>
    </div>
  );
}

function ProfileView({ t, userRole, setUserRole, farmerVerified, buyerVerified, setActiveTab, userName, setShowAuthModal, setInputFullName, setSelectedRole, setAuthStep }) {
  return (
    <div className="bg-slate-50 min-h-screen py-12 text-slate-900">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {userRole === 'farmer' ? '👨🌾' : '🛒'}
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-900">{userName || (userRole === 'farmer' ? 'Ramesh Reddy' : 'Coastal Wholesale Account')}</h2>
                <p className="text-xs text-slate-500 font-semibold">Role: <strong className="text-emerald-700 capitalize font-bold">{userRole}</strong></p>
                <p className="text-xs text-slate-500 font-medium">Location: Kankipadu, Krishna District, AP</p>
              </div>
            </div>

            <button 
              onClick={() => {
                if (setInputFullName) setInputFullName(userName || "");
                if (setSelectedRole) setSelectedRole(userRole === 'farmer' ? 'Farmer' : 'Buyer');
                if (setAuthStep) setAuthStep('details');
                if (setShowAuthModal) setShowAuthModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-colors"
            >
              🔑 Login / Switch Identity
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between text-xs font-semibold">
            <span className="text-slate-500">Verification Status:</span>
            <span className="font-bold text-emerald-700">🟢 Verified Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CART DRAWER & CHECKOUT
   ========================================================================= */
function CartDrawer({ cart, setCart, t, onClose, setActiveTab }) {
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryCharge = cart.length > 0 ? 65 : 0;
  const total = subtotal + deliveryCharge;

  const handleUpdateQuantity = (productId, delta) => {
    setCart((prev) => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const handlePlaceOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setCart([]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto border-l border-slate-200">
        
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              🛒 {t.cart.title}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
          </div>

          {orderConfirmed ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-sm">
                ✓
              </div>
              <h3 className="font-bold text-xl text-slate-900">{t.checkout.orderSuccess}</h3>
              <p className="text-xs text-slate-600">{t.checkout.orderConfirmed}</p>
              <button 
                onClick={() => { onClose(); setActiveTab('logistics'); }}
                className="mt-4 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20"
              >
                Track Order Logistics →
              </button>
            </div>
          ) : checkoutStep ? (
            <div className="py-6 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900">{t.checkout.title}</h3>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.checkout.recipientName}</label>
                <input type="text" defaultValue="Vijayawada Fresh Mart" className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 bg-slate-50" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.checkout.deliveryAddress}</label>
                <input type="text" defaultValue="Store #4, Commercial Complex, Benz Circle, Vijayawada" className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 bg-slate-50" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.checkout.paymentMethod}</label>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl font-bold text-emerald-800">
                  💳 {t.checkout.demoPayment}
                </div>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs">
              <span className="text-4xl block mb-2">🛒</span>
              {t.cart.emptyCart}
            </div>
          ) : (
            <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 text-xs bg-slate-50 shadow-sm gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-slate-500 font-medium text-[11px]">₹{item.product.price}/kg</p>
                  </div>

                  {/* QUANTITY STEPPER */}
                  <div className="flex items-center border border-slate-300 bg-white rounded-lg overflow-hidden shadow-sm">
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(item.product.id, -1)}
                      className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 text-xs transition-colors"
                    >
                      -
                    </button>
                    <span className="px-2 py-0.5 text-xs font-bold text-slate-900 min-w-[42px] text-center bg-slate-50 border-x border-slate-200">
                      {item.quantity} kg
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(item.product.id, 1)}
                      className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 text-xs transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* SUBTOTAL & REMOVE */}
                  <div className="text-right pl-1">
                    <span className="font-extrabold text-emerald-600 block text-xs">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-[10px] text-rose-500 hover:text-rose-700 font-medium"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!orderConfirmed && cart.length > 0 && (
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}:</span>
                <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.cart.deliveryCharge}:</span>
                <span className="font-bold text-slate-900">₹{deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>{t.cart.total}:</span>
                <span className="text-emerald-600 font-extrabold">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {checkoutStep ? (
              <button 
                onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-500 transition-all"
              >
                {t.checkout.placeOrder} (₹{total.toLocaleString('en-IN')})
              </button>
            ) : (
              <button 
                onClick={() => setCheckoutStep(true)}
                className="w-full py-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-500 transition-all"
              >
                {t.cart.proceedCheckout}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

/* =========================================================================
   ESCROW & PAYOUT DETAILS MODAL (FARMER VIEW)
   ========================================================================= */
function EscrowModal({ order, onClose, setToastMessage }) {
  // ESC Key dismissal handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200 relative my-8 text-slate-900">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-extrabold px-2.5 py-1 rounded-full">
            🔒 Protected by AgriConnect Trust Protocol
          </div>
          <h3 className="font-display font-extrabold text-2xl text-slate-900">
            Smart Escrow Settlement Breakdown
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Order Reference: <strong className="text-slate-800">#{order?.id || 'AGC1024'}</strong> — {order?.productName || 'Fresh Farm Red Tomato'} ({order?.quantity || 100} kg)
          </p>
        </div>

        {/* FINANCIAL SUMMARY CONTAINER */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Financial Breakdown</h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Produce Value (100 kg × ₹28/kg):</span>
              <span className="font-bold text-slate-900">₹2,800.00</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Direct Logistics Fee:</span>
              <span className="font-bold text-slate-900">- ₹65.00</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Intermediary / Mandi Commission (0%):</span>
              <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                Zero Commission
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-900">Net Farmer Payout:</span>
              <span className="font-extrabold text-xl text-emerald-600">₹2,735.00</span>
            </div>
          </div>
        </div>

        {/* MILESTONE CHECKPOINTS */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Release Milestone Checkpoints</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50/60 border border-emerald-200 p-2.5 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>1. Digital weighing & Hub QC passed</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50/60 border border-emerald-200 p-2.5 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>2. Dispatched in transit</span>
            </div>
            <div className="flex items-center gap-2 text-amber-800 font-semibold bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">⏳</span>
              <span>3. Final OTP verification upon buyer handover (Pending Release)</span>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-2 flex gap-3">
          <button 
            type="button"
            onClick={() => {
              if (setToastMessage) {
                setToastMessage(`Downloading settlement receipt for #${order?.id || 'AGC1024'}...`);
              } else {
                alert(`Downloaded Settlement Receipt for #${order?.id || 'AGC1024'}`);
              }
            }}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl transition-colors"
          >
            📥 Download Settlement Receipt
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   CUSTOMER / BUYER RATING & HARVEST EXPERIENCE MODAL
   ========================================================================= */
function RatingModal({ order, t, onClose, setToastMessage }) {
  const [freshnessStars, setFreshnessStars] = useState(5);
  const [deliveryStars, setDeliveryStars] = useState(5);
  const [selectedChips, setSelectedChips] = useState(["Super Fresh 🌱"]);
  const [comment, setComment] = useState("");

  const quickChips = ["Super Fresh 🌱", "Crisp Quality", "Accurate Weight", "Direct Farmgate Speed"];

  // ESC Key dismissal handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleChip = (chip) => {
    setSelectedChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Verified rating submitted for order #${order?.id || 'AGC1024'}! Thank you for supporting farmer ${order?.farmerName || 'Ramesh Reddy'}.`;
    if (setToastMessage) {
      setToastMessage(message);
    } else {
      alert(message);
    }
    onClose();
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 relative my-8 text-slate-900">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="space-y-1 pr-8">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            ⭐ Verified Customer Review
          </span>
          <h3 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
            Rate Your Harvest Experience
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Order: <strong className="text-slate-800">#{order?.id || 'AGC1024'}</strong> • Farmer: <strong className="text-slate-800">{order?.farmerName || 'Ramesh Reddy'}</strong>
          </p>
        </div>

        {/* DUAL RATING DIMENSIONS */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
          
          {/* DIMENSION 1: PRODUCE FRESHNESS */}
          <div className="space-y-1">
            <div className="flex justify-between font-bold text-slate-800">
              <span>1. Produce Freshness & Quality</span>
              <span className="text-amber-500 font-extrabold">{freshnessStars}/5 ★</span>
            </div>
            <div className="flex gap-1.5 text-xl cursor-pointer">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFreshnessStars(star)}
                  className="hover:scale-110 transition-transform focus:outline-none"
                >
                  {star <= freshnessStars ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </div>

          {/* DIMENSION 2: DELIVERY & PACKAGING */}
          <div className="space-y-1 pt-2 border-t border-slate-200">
            <div className="flex justify-between font-bold text-slate-800">
              <span>2. Delivery & Packaging Condition</span>
              <span className="text-amber-500 font-extrabold">{deliveryStars}/5 ★</span>
            </div>
            <div className="flex gap-1.5 text-xl cursor-pointer">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setDeliveryStars(star)}
                  className="hover:scale-110 transition-transform focus:outline-none"
                >
                  {star <= deliveryStars ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* QUICK FEEDBACK CHIPS */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800">Quick Highlight Chips:</label>
          <div className="flex flex-wrap gap-1.5">
            {quickChips.map(chip => {
              const isSelected = selectedChips.includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => toggleChip(chip)}
                  className={`text-xs px-2.5 py-1 rounded-xl border font-bold transition-all ${
                    isSelected 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* FEEDBACK TEXTAREA */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-800">Your Harvest Review:</label>
          <textarea 
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share notes on harvest quality..."
            className="w-full border border-slate-300 bg-slate-50 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 focus:bg-white text-slate-900 transition-all resize-none"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          onClick={handleSubmit} 
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all"
        >
          Submit Verified Rating
        </button>

      </div>
    </div>
  );
}

/* =========================================================================
   SETU AI ASSISTANT FLOATING WIDGET (UNIFIED LIGHT THEME)
   ========================================================================= */
function SetuAiWidget({ t, isOpen, setIsOpen, messages, input, setInput, onSendMessage, isListening, onVoiceInput, userRole, userName }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-emerald-600 text-white shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 border-2 border-emerald-400"
        >
          <span className="text-2xl">✨</span>
          <span className="font-bold text-xs pr-1">SETU AI</span>
        </button>
      )}

      {/* CHAT MODAL PANEL */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in zoom-in-95 duration-200">
          
          {/* HEADER */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">
                ✨
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  {t.setu.name} <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                </h3>
                <p className="text-[10px] text-emerald-100 font-semibold">{t.setu.role} ({userRole.toUpperCase()}) • {userName || "Ramesh Reddy"}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-emerald-100 font-bold text-sm">
              ✕
            </button>
          </div>

          {/* QUICK PROMPTS BAR */}
          <div className="bg-slate-50 p-2 border-b border-slate-200 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {userRole === 'farmer' ? (
              <>
                <button onClick={() => onSendMessage(t.setu.quickSell)} className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 whitespace-nowrap shadow-xs">
                  {t.setu.quickSell}
                </button>
                <button onClick={() => onSendMessage(t.setu.quickPrices)} className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 whitespace-nowrap shadow-xs">
                  {t.setu.quickPrices}
                </button>
                <button onClick={() => onSendMessage(t.setu.quickBuyers)} className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 whitespace-nowrap shadow-xs">
                  {t.setu.quickBuyers}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onSendMessage("🥦 Check local vegetable freshness & seasonal availability")} className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 whitespace-nowrap shadow-xs">
                  🥦 Freshness &amp; Seasons
                </button>
                <button onClick={() => onSendMessage("💰 How much money goes directly to the farmer?")} className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 whitespace-nowrap shadow-xs">
                  💰 Direct Farmer Payouts
                </button>
                <button onClick={() => onSendMessage("📍 Show farm locations and produce quality grades")} className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 whitespace-nowrap shadow-xs">
                  📍 Farms &amp; Quality Grades
                </button>
              </>
            )}
          </div>

          {/* MESSAGES BODY */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 text-xs bg-slate-50">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[82%] p-3 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm font-medium'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* CHAT INPUT AREA */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <button 
              onClick={onVoiceInput}
              className={`p-2.5 rounded-xl border transition-colors ${
                isListening ? 'bg-red-600 border-red-500 text-white animate-pulse' : 'bg-slate-100 border-slate-200 text-emerald-600 hover:bg-emerald-50'
              }`}
              title="Voice Input"
            >
              🎤
            </button>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
              placeholder={t.setu.placeholder}
              className="flex-grow bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
            />
            <button 
              onClick={() => onSendMessage()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
            >
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  );
}

// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  FileText, 
  TrendingUp, 
  MessageCircle, 
  Upload, 
  Download, 
  Check, 
  X, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  Home,
  Briefcase,
  Users,
  Bitcoin,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Camera,
  Eye,
  Send,
  Filter,
  Search,
  Plus,
  ChevronRight,
  Star
} from 'lucide-react';

const EBridgeCapitalApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [showRegistration, setShowRegistration] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [documents, setDocuments] = useState({
    passport: null,
    proofOfAddress: null,
    sourceOfFunds: null
  });

  // Mock data
  const mockUsers = {
    'admin@ebridge.ee': {
      id: 1,
      email: 'admin@ebridge.ee',
      password: 'demo123',
      role: 'admin',
      name: 'Admin User'
    },
    'cliente@ebridge.ee': {
      id: 2,
      email: 'cliente@ebridge.ee',
      password: 'demo123',
      role: 'client',
      name: 'John Doe',
      kycStatus: 'pending',
      portfolio: {
        bitcoin: { amount: 0.5, value: 32500, change: 5.2 },
        strf: { amount: 1000, value: 15000, change: -2.1 },
        strk: { amount: 500, value: 8500, change: 8.7 }
      }
    }
  };

  const mockProposals = [
    {
      id: 1,
      title: 'Purchase 0.5 BTC',
      details: 'Buy 0.5 Bitcoin at current market price',
      amount: '$32,500',
      date: '2024-12-10',
      status: 'pending',
      type: 'buy'
    },
    {
      id: 2,
      title: 'Sell STRK Position',
      details: 'Sell 200 STRK tokens for profit taking',
      amount: '$3,400',
      date: '2024-12-09',
      status: 'pending',
      type: 'sell'
    }
  ];

  const mockClients = [
    {
      id: 2,
      name: 'John Doe',
      email: 'cliente@ebridge.ee',
      kycStatus: 'pending',
      joinDate: '2024-12-01',
      totalInvestment: '$56,500'
    },
    {
      id: 3,
      name: 'Alice Smith',
      email: 'alice@example.com',
      kycStatus: 'approved',
      joinDate: '2024-11-15',
      totalInvestment: '$125,000'
    }
  ];

  useEffect(() => {
    // Initialize with some mock chat messages
    setChatMessages([
      {
        id: 1,
        sender: 'admin',
        message: 'Welcome to E-Bridge Capital! Please complete your KYC verification.',
        timestamp: '2024-12-10 10:30'
      },
      {
        id: 2,
        sender: 'client',
        message: 'Thank you! I will upload my documents shortly.',
        timestamp: '2024-12-10 10:35'
      }
    ]);
  }, []);

  const handleLogin = (email, password) => {
    const user = mockUsers[email];
    if (user && user.password === password) {
      setCurrentUser(user);
      setCurrentView(user.role === 'admin' ? 'admin-dashboard' : 'client-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegistration = (email, password) => {
    alert('Registration successful! Please check your email for verification.');
    setShowRegistration(false);
  };

  const handleGoogleLogin = () => {
    // Mock Google login - in real app would use OAuth
    setCurrentUser(mockUsers['cliente@ebridge.ee']);
    setCurrentView('client-dashboard');
  };

  const handleProposalAction = (proposalId, action, confirmed = false) => {
    if (action === 'accept' && !confirmed) {
      setSelectedProposal(proposalId);
      setShowProposalModal(true);
    } else {
      // Process the proposal action
      const actionText = action === 'accept' ? 'accepted' : 'rejected';
      alert(`Proposal ${actionText} successfully!`);
      setShowProposalModal(false);
      setSelectedProposal(null);
    }
  };

  const handleDocumentUpload = (docType, file) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: file
    }));
    alert('Document uploaded successfully!');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: currentUser.role,
        message: newMessage,
        timestamp: new Date().toLocaleString()
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">E-Bridge Capital</h1>
          <p className="text-gray-600 mt-2">Professional Investment Management</p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Demo Accounts</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div>👔 Admin: admin@ebridge.ee / demo123</div>
              <div>👤 Client: cliente@ebridge.ee / demo123</div>
            </div>
          </div>

          <LoginForm onLogin={handleLogin} />
          
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="mr-2">🔗</span>
            Continue with Google
          </button>

          <div className="text-center">
            <button
              onClick={() => setShowRegistration(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Don't have an account? Register
            </button>
          </div>
        </div>
      </div>

      {showRegistration && (
        <RegistrationModal 
          onClose={() => setShowRegistration(false)}
          onRegister={handleRegistration}
        />
      )}
    </div>
  );

  const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(email, password);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Login
        </button>
      </form>
    );
  };

  const RegistrationModal = ({ onClose, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      onRegister(email, password);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Create Account</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };

  const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
      switch (activeTab) {
        case 'dashboard':
          return <DashboardContent />;
        case 'portfolio':
          return <PortfolioContent />;
        case 'documents':
          return <DocumentsContent />;
        case 'proposals':
          return <ProposalsContent />;
        case 'support':
          return <SupportContent />;
        default:
          return <DashboardContent />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <ClientHeader />
        <div className="flex">
          <ClientSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  };

  const ClientHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">E-Bridge Capital</h1>
            <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => { setCurrentUser(null); setCurrentView('login'); }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );

  const ClientSidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'proposals', label: 'Proposals', icon: TrendingUp },
      { id: 'support', label: 'Support', icon: MessageCircle }
    ];

    return (
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
        <nav className="p-4 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  };

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">KYC Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentUser.kycStatus === 'approved' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {currentUser.kycStatus === 'approved' ? 'Approved' : 'Pending'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Portfolio</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">$56,500</div>
          <div className="text-sm text-green-600">+5.2% this month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Positions</h3>
            <Briefcase className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
          <div className="text-sm text-gray-600">BTC, STRF, STRK</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Proposals</h3>
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
          <div className="text-sm text-gray-600">Awaiting your response</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">New investment proposal received</p>
              <p className="text-sm text-gray-600">Purchase 0.5 BTC - $32,500</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Document verification completed</p>
              <p className="text-sm text-gray-600">Passport verification approved</p>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const PortfolioContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Portfolio Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Bitcoin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Bitcoin</h3>
                <p className="text-sm text-gray-600">BTC</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="font-medium">0.5 BTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Value:</span>
              <span className="font-medium">$32,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">24h Change:</span>
              <span className="font-medium text-green-600">+5.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">STRF Token</h3>
                <p className="text-sm text-gray-600">STRF</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="font-medium">1,000 STRF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Value:</span>
              <span className="font-medium">$15,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">24h Change:</span>
              <span className="font-medium text-red-600">-2.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">STRK Token</h3>
                <p className="text-sm text-gray-600">STRK</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="font-medium">500 STRK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Value:</span>
              <span className="font-medium">$8,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">24h Change:</span>
              <span className="font-medium text-green-600">+8.7%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Performance chart would be displayed here</p>
        </div>
      </div>
    </div>
  );

  const DocumentsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DocumentUploadCard
          title="Passport"
          description="Upload a clear photo of your passport"
          icon={<User className="w-6 h-6" />}
          status={documents.passport ? 'uploaded' : 'pending'}
          onUpload={(file) => handleDocumentUpload('passport', file)}
        />
        
        <DocumentUploadCard
          title="Proof of Address"
          description="Utility bill or bank statement (max 3 months old)"
          icon={<Home className="w-6 h-6" />}
          status={documents.proofOfAddress ? 'uploaded' : 'pending'}
          onUpload={(file) => handleDocumentUpload('proofOfAddress', file)}
        />
        
        <DocumentUploadCard
          title="Source of Funds"
          description="Documentation showing source of investment funds"
          icon={<DollarSign className="w-6 h-6" />}
          status={documents.sourceOfFunds ? 'uploaded' : 'pending'}
          onUpload={(file) => handleDocumentUpload('sourceOfFunds', file)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload History</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">Passport.pdf</p>
                <p className="text-sm text-gray-600">Uploaded on Dec 10, 2024</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentUploadCard = ({ title, description, icon, status, onUpload }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          status === 'uploaded' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {status === 'uploaded' ? (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Document uploaded</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-orange-600">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Upload required</span>
          </div>
        )}
        
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.jpg,.jpeg,.png';
            input.onchange = (e) => onUpload(e.target.files[0]);
            input.click();
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <Upload className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600">Upload Document</span>
        </button>
      </div>
    </div>
  );

  const ProposalsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Investment Proposals</h2>
      
      <div className="grid gap-6">
        {mockProposals.map(proposal => (
          <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  proposal.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <TrendingUp className={`w-6 h-6 ${
                    proposal.type === 'buy' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                  <p className="text-gray-600">{proposal.details}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Amount: {proposal.amount}</span>
                    <span>Date: {proposal.date}</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Pending
              </span>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => handleProposalAction(proposal.id, 'accept')}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Accept Proposal
              </button>
              <button
                onClick={() => handleProposalAction(proposal.id, 'reject')}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Reject Proposal
              </button>
            </div>
          </div>
        ))}
      </div>

      {showProposalModal && (
        <ProposalConfirmationModal 
          proposal={mockProposals.find(p => p.id === selectedProposal)}
          onConfirm={() => handleProposalAction(selectedProposal, 'accept', true)}
          onCancel={() => setShowProposalModal(false)}
        />
      )}
    </div>
  );

  const ProposalConfirmationModal = ({ proposal, onConfirm, onCancel }) => {
    const [confirmed, setConfirmed] = useState(false);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Confirm Investment</h2>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{proposal?.title}</h3>
              <p className="text-gray-600 mb-2">{proposal?.details}</p>
              <p className="font-medium text-gray-900">Amount: {proposal?.amount}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Notice</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    By accepting this proposal, you are entering into a legally binding investment agreement. 
                    Please ensure you understand all terms and conditions.
                  </p>
                </div>
              </div>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                I confirm that I fully understand the investment proposal and accept all terms and conditions. 
                This confirmation is legally binding.
              </span>
            </label>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!confirmed}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${
                confirmed
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirm & Accept
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SupportContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Support & Communication</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Chat with Support</h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'client'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'client' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">support@ebridge.ee</span>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">+372 123 4567</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Hours</h3>
          <div className="space-y-2 text-gray-700">
            <p>Monday - Friday: 9:00 AM - 6:00 PM EET</p>
            <p>Saturday: 10:00 AM - 4:00 PM EET</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboardContent />;
        case 'clients':
          return <ClientsManagement />;
        case 'proposals':
          return <ProposalsManagement />;
        case 'documents':
          return <DocumentsManagement />;
        default:
          return <AdminDashboardContent />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  };

  const AdminHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">E-Bridge Capital Admin</h1>
            <p className="text-sm text-gray-600">Administrative Dashboard</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => { setCurrentUser(null); setCurrentView('login'); }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );

  const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'clients', label: 'Clients', icon: Users },
      { id: 'proposals', label: 'Proposals', icon: TrendingUp },
      { id: 'documents', label: 'Documents', icon: FileText }
    ];

    return (
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
        <nav className="p-4 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  };

  const AdminDashboardContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Clients</h3>
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">24</div>
          <div className="text-sm text-green-600">+3 this month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Proposals</h3>
            <TrendingUp className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
          <div className="text-sm text-gray-600">Awaiting response</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">KYC Pending</h3>
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
          <div className="text-sm text-yellow-600">Require review</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total AUM</h3>
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">$2.4M</div>
          <div className="text-sm text-green-600">+12.5% YTD</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Client Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">John Doe accepted BTC proposal</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Alice Smith uploaded documents</p>
                <p className="text-sm text-gray-600">4 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Portfolio chart would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ClientsManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredClients = mockClients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || client.kycStatus === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Client</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">KYC Pending</option>
              <option value="approved">KYC Approved</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">KYC Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Investment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Join Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        client.kycStatus === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.kycStatus === 'approved' ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {client.totalInvestment}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {client.joinDate}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const ProposalsManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Proposals Management</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Create Proposal</span>
        </button>
      </div>

      <div className="grid gap-6">
        {mockProposals.map(proposal => (
          <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  proposal.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <TrendingUp className={`w-6 h-6 ${
                    proposal.type === 'buy' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                  <p className="text-gray-600">{proposal.details}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Client: John Doe</span>
                    <span>Amount: {proposal.amount}</span>
                    <span>Date: {proposal.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Pending
                </span>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DocumentsManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Documents Management</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Document Uploads</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Passport - John Doe</p>
                <p className="text-sm text-gray-600">Uploaded 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                Approve
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Proof of Address - Alice Smith</p>
                <p className="text-sm text-gray-600">Uploaded 1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Approved
              </span>
              <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (!currentUser) {
    return <LoginScreen />;
  }

  if (currentUser.role === 'admin') {
    return <AdminDashboard />;
  }

  return <ClientDashboard />;
};

export default EBridgeCapitalApp;
                
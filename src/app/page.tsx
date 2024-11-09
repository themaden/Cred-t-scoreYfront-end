'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Slider } from "@/app/components/ui/slider"
import { Switch } from "@/app/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { Wallet, TrendingUp, Activity, History, Filter, PieChart as PieChartIcon, BarChart as BarChartIcon, AlertTriangle, Info, Bell, Brain, Star, Link, RefreshCw, Download } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_URL = 'http://localhost:5000/api'; // Backend API URL'sini burada tanımlayın

// Define the Transaction type
type Transaction = {
  date: string;
  type: string; // Add other properties as needed
  amount: number;
  status: string;
  aiInsight: string;
};

export default function Dashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [creditScore, setCreditScore] = useState(75)
  const [reputationScore, setReputationScore] = useState(80)
  const [selectedTimeRange, setSelectedTimeRange] = useState('1A')
  const [selectedTransactionType, setSelectedTransactionType] = useState('Tümü')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(true)
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (isWalletConnected) {
      fetchUserData();
      fetchTransactions();
    }
  }, [isWalletConnected]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${walletAddress}`);
      if (!response.ok) {
        throw new Error('Kullanıcı verisi alınamadı');
      }
      const userData = await response.json();
      setCreditScore(userData.creditScore);
      setReputationScore(userData.reputationScore);
      setRiskTolerance(userData.riskTolerance);
      setNotifications(userData.notifications);
      setAiAnalysisEnabled(userData.aiAnalysisEnabled);
      setUserId(userData._id);
    } catch (error) {
      console.error('Kullanıcı verisi çekme hatası:', error);
      setError('Kullanıcı verisi yüklenirken bir hata oluştu.');
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/user/${userId}`);
      if (!response.ok) {
        throw new Error('İşlem verileri alınamadı');
      }
      const transactionData = await response.json();
      setTransactions(transactionData);
    } catch (error) {
      console.error('İşlem verisi çekme hatası:', error);
      setError('İşlem verileri yüklenirken bir hata oluştu.');
    }
  };

  const connectWallet = async () => {
    try {
      // Gerçek bir cüzdan bağlantısı yerine simüle ediyoruz
      const simulatedWalletAddress = 'Sola...x123';
      setWalletAddress(simulatedWalletAddress);
      
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: simulatedWalletAddress }),
      });
      
      if (response.ok) {
        setIsWalletConnected(true);
        toast.success("Cüzdan başarıyla bağlandı!");
      } else {
        throw new Error('Cüzdan bağlantısı başarısız oldu.');
      }
    } catch (error) {
      console.error('Cüzdan bağlantı hatası:', error);
      setError('Cüzdan bağlanırken bir hata oluştu. Lütfen tekrar deneyin.');
      toast.error("Cüzdan bağlantısı başarısız oldu.");
    }
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    try {
      await fetchUserData();
      await fetchTransactions();
      toast.success("Veriler başarıyla güncellendi!")
    } catch (error) {
      toast.error("Veri yenileme başarısız oldu. Lütfen tekrar deneyin.")
    } finally {
      setIsRefreshing(false)
    }
  }

  const downloadReport = () => {
    // Rapor indirme işlemini simüle ediyoruz
    toast.info("Raporunuz hazırlanıyor...")
    setTimeout(() => {
      toast.success("Raporunuz indirildi!")
    }, 2000)
  }

  // Örnek veri - gerçek bir uygulamada bu veriler API'den gelecektir
  const activityData = [
    { month: 'Oca', score: 65, transactions: 10, volume: 500, reputation: 70 },
    { month: 'Şub', score: 68, transactions: 15, volume: 750, reputation: 72 },
    { month: 'Mar', score: 72, transactions: 20, volume: 1000, reputation: 75 },
    { month: 'Nis', score: 75, transactions: 25, volume: 1250, reputation: 78 },
    { month: 'May', score: 78, transactions: 30, volume: 1500, reputation: 80 },
    { month: 'Haz', score: 80, transactions: 35, volume: 1750, reputation: 82 },
  ]

  const transactionTypes = ['DeFi Kredi Ödemesi', 'NFT Alımı', 'Stake', 'Token Takası']
  
  const pieChartData = [
    { name: 'DeFi', value: 400 },
    { name: 'NFT', value: 300 },
    { name: 'Stake', value: 200 },
    { name: 'Takas', value: 100 },
  ]

  const radarChartData = [
    { subject: 'DeFi Aktivitesi', A: 120, B: 110, fullMark: 150 },
    { subject: 'NFT İşlemleri', A: 98, B: 130, fullMark: 150 },
    { subject: 'Stake Miktarı', A: 86, B: 130, fullMark: 150 },
    { subject: 'İşlem Hacmi', A: 99, B: 100, fullMark: 150 },
    { subject: 'Hesap Yaşı', A: 85, B: 90, fullMark: 150 },
    { subject: 'Ödeme Geçmişi', A: 65, B: 85, fullMark: 150 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const filteredTransactions = transactions.filter(tx => 
    selectedTransactionType === 'Tümü' || tx.type === selectedTransactionType
  )

  const improvementSuggestions = [
    "DeFi aktivitelerinizi artırarak kredi puanınızı yükseltebilirsiniz",
    "Tutarlı bir stake geçmişi oluşturarak kredi değerliliğinizi artırabilirsiniz",
    "İşlem türlerinizi çeşitlendirerek daha güçlü bir kredi profili oluşturabilirsiniz",
    "Ortalama işlem değerinizi artırarak puanınızı iyileştirebilirsiniz"
  ]

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      try {
        if (isWalletConnected) {
          await fetchUserData();
          await fetchTransactions();
        }
        setLoading(false)
      } catch (err) {
        setError('Veri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [isWalletConnected])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="text-white text-2xl">Yükleniyor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Hata</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Solana Kredi Puanlama Paneli</h1>
          <div className="flex items-center space-x-4">
            {isWalletConnected ? (
              <div className="flex items-center space-x-2">
                <Wallet className="h-6 w-6 text-white" />
                <span className="font-medium text-white">Cüzdan: {walletAddress}</span>
              </div>
            ) : (
              <Button onClick={connectWallet} className="bg-white text-blue-600 hover:bg-blue-100">
                Cüzdan Bağla
              </Button>
            )}
            <Button
              onClick={refreshData}
              disabled={isRefreshing}
              className="bg-white text-blue-600 hover:bg-blue-100"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Yenileniyor...' : 'Verileri Yenile'}
            </Button>
            <Button
              onClick={downloadReport}
              className="bg-white text-blue-600 hover:bg-blue-100"
            >
              <Download className="h-4 w-4 mr-2" />
              Rapor İndir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2 bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-600">Kredi Puanı</CardTitle>
              <CardDescription>Mevcut kredi puanınız ve son değişiklikler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-5xl font-bold text-blue-600">{creditScore}</span>
                  <span className="text-green-500 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Son ayda +5 puan
                  </span>
                </div>
                <Progress value={creditScore} className="h-3 bg-blue-300" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Düşük</span>
                  <span>Orta</span>
                  <span>Yüksek</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-600">İtibar Puanı</CardTitle>
              <CardDescription>Geçmiş işlemlerinize dayalı itibar puanınız</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-5xl font-bold text-purple-600">{reputationScore}</span>
                  <span className="text-green-500 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Son ayda +2 puan
                  </span>
                </div>
                <Progress value={reputationScore} className="h-3 bg-purple-300" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Yeni</span>
                  <span>Gelişiyor</span>
                  <span>Saygın</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-600">Ayarlar ve  Tercihler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Risk Toleransı</span>
                <Slider
                  value={[riskTolerance]}
                  onValueChange={(value) => setRiskTolerance(value[0])}
                  max={100}
                  step={1}
                  className="w-[200px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Bildirimler</span>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>AI Analizi</span>
                <Switch
                  checked={aiAnalysisEnabled}
                  onCheckedChange={setAiAnalysisEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList>
            <TabsTrigger value="activity" className="bg-blue-600 text-white">
              <Activity className="h-4 w-4 mr-2" />
              Aktivite Geçmişi
            </TabsTrigger>
            <TabsTrigger value="transactions" className="bg-blue-600 text-white">
              <History className="h-4 w-4 mr-2" />
              Son İşlemler
            </TabsTrigger>
            <TabsTrigger value="analysis" className="bg-blue-600 text-white">
              <BarChartIcon className="h-4 w-4 mr-2" />
              Detaylı Analiz
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="bg-blue-600 text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              İyileştirme Önerileri
            </TabsTrigger>
            <TabsTrigger value="defi" className="bg-blue-600 text-white">
              <Link className="h-4 w-4 mr-2" />
              DeFi Protokolleri
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Aktivite Geçmişi</CardTitle>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Zaman Aralığı" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1A">Son 1 Ay</SelectItem>
                    <SelectItem value="3A">Son 3 Ay</SelectItem>
                    <SelectItem value="6A">Son 6 Ay</SelectItem>
                    <SelectItem value="1Y">Son 1 Yıl</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="score" stroke="#8884d8" name="Kredi Puanı" />
                    <Line yAxisId="right" type="monotone" dataKey="reputation" stroke="#82ca9d" name="İtibar Puanı" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Son İşlemler</CardTitle>
                <div className="flex space-x-2">
                  <Select value={selectedTransactionType} onValueChange={setSelectedTransactionType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="İşlem Türü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tümü">Tümü</SelectItem>
                      {transactionTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input type="date" className="w-[180px]" placeholder="Tarih Seçin" />
                </div>
              </CardHeader>
              <CardContent>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Tarih</th>
                      <th className="text-left py-2">Tür</th>
                      <th className="text-left py-2">Miktar</th>
                      <th className="text-left py-2">Durum</th>
                      <th className="text-left py-2">AI Görüşü</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((tx, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{tx.date}</td>
                        <td className="py-2">{tx.type}</td>
                        <td className="py-2">{tx.amount}</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-2">
                          <div className="flex items-center">
                            <Brain className="h-4 w-4 mr-2 text-purple-500" />
                            <span className="text-sm text-gray-600">{tx.aiInsight}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle>İşlem Analizi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="transactions" fill="#8884d8" name="İşlem Sayısı" />
                      <Bar dataKey="volume" fill="#82ca9d" name="İşlem Hacmi" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle>İşlem Dağılımı</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-white shadow-lg rounded-lg mt-6">
              <CardHeader>
                <CardTitle>Kredi Profili Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Mevcut" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Hedef" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>İyileştirme Önerileri</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {improvementSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start bg-blue-50 p-4 rounded-lg">
                      <Info className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-700">{suggestion}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          Bu öneriyi uygulamak, kredi puanınızı yaklaşık 5-10 puan artırabilir.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defi">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>DeFi Protokolleri Entegrasyonu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <img src="/placeholder.svg?height=40&width=40" alt="Aave Logo" className="w-10 h-10 mr-4" />
                      <div>
                        <h3 className="font-semibold">Aave</h3>
                        <p className="text-sm text-gray-600">Borç verme ve alma platformu</p>
                      </div>
                    </div>
                    <Button variant="outline">Bağlan</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <img src="/placeholder.svg?height=40&width=40" alt="Uniswap Logo" className="w-10 h-10 mr-4" />
                      <div>
                        <h3 className="font-semibold">Uniswap</h3>
                        <p className="text-sm text-gray-600">Merkeziyetsiz token takası</p>
                      </div>
                    </div>
                    <Button variant="outline">Bağlan</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <img src="/placeholder.svg?height=40&width=40" alt="Compound Logo" className="w-10 h-10 mr-4" />
                      <div>
                        <h3 className="font-semibold">Compound</h3>
                        <p className="text-sm text-gray-600">Algoritmik para piyasası protokolü</p>
                      </div>
                    </div>
                    <Button variant="outline">Bağlan</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-600">Bildirimler</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>Kredi puanınız son 30 günde %5 arttı!</span>
                </div>
                <Button variant="outline" size="sm">Detaylar</Button>
              </li>
              <li className="flex items-center justify-between p-2 bg-green-50 rounded">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 text-green-500 mr-2" />
                  <span>Yeni DeFi fırsatı mevcut</span>
                </div>
                <Button variant="outline" size="sm">Görüntüle</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}
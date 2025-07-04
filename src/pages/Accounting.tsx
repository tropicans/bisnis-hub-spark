
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"

const Accounting = () => {
  const transactions = [
    { id: "ACC-001", date: "2025-01-04", description: "Penjualan Kemeja Batik", type: "income", amount: 250000, category: "Penjualan" },
    { id: "ACC-002", date: "2025-01-04", description: "Pembelian Bahan Baku", type: "expense", amount: -150000, category: "Pembelian" },
    { id: "ACC-003", date: "2025-01-03", description: "Penjualan Tas Kulit", type: "income", amount: 450000, category: "Penjualan" },
    { id: "ACC-004", date: "2025-01-03", description: "Bayar Listrik Toko", type: "expense", amount: -120000, category: "Operasional" },
    { id: "ACC-005", date: "2025-01-02", description: "Penjualan Sepatu Sport", type: "income", amount: 350000, category: "Penjualan" },
    { id: "ACC-006", date: "2025-01-02", description: "Gaji Karyawan", type: "expense", amount: -500000, category: "Gaji" },
  ]

  const monthlyStats = {
    totalIncome: 2850000,
    totalExpense: 1520000,
    netProfit: 1330000,
    transactions: 156
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(Math.abs(amount))
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">Accounting</h1>
          <p className="text-muted-foreground font-poppins">Pantau keuangan dan laporan bisnis Anda</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="font-poppins font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            Laporan Bulanan
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-poppins font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Transaksi Baru
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Total Pemasukan
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-green-600">
              {formatCurrency(monthlyStats.totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground font-poppins">Bulan ini</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Total Pengeluaran
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-red-600">
              {formatCurrency(monthlyStats.totalExpense)}
            </div>
            <p className="text-xs text-muted-foreground font-poppins">Bulan ini</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Laba Bersih
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-blue-600">
              {formatCurrency(monthlyStats.netProfit)}
            </div>
            <p className="text-xs text-muted-foreground font-poppins">Bulan ini</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Total Transaksi
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-purple-600">
              {monthlyStats.transactions}
            </div>
            <p className="text-xs text-muted-foreground font-poppins">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart Placeholder */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="font-poppins font-semibold text-xl">Arus Kas Bulanan</CardTitle>
          <CardDescription className="font-poppins">
            Grafik pemasukan vs pengeluaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="font-poppins text-muted-foreground">Grafik arus kas akan ditampilkan di sini</p>
              <p className="font-poppins text-sm text-muted-foreground mt-1">Integrasi dengan chart library dalam development</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-poppins font-semibold text-xl">Transaksi Terbaru</CardTitle>
              <CardDescription className="font-poppins">
                Catatan keuangan terkini
              </CardDescription>
            </div>
            
            <Button variant="outline" size="sm" className="font-poppins">
              Lihat Semua
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {transaction.type === "income" ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-poppins font-medium text-sm">{transaction.description}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-poppins font-semibold ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "income" ? "+" : ""}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="font-poppins font-semibold text-lg text-green-600">Tambah Pemasukan</CardTitle>
            <CardDescription className="font-poppins">
              Catat transaksi pemasukan baru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-poppins">
              + Pemasukan dari Penjualan
            </Button>
            <Button variant="outline" className="w-full font-poppins">
              + Pemasukan Lainnya
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="font-poppins font-semibold text-lg text-red-600">Tambah Pengeluaran</CardTitle>
            <CardDescription className="font-poppins">
              Catat transaksi pengeluaran baru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-poppins">
              + Pengeluaran Operasional
            </Button>
            <Button variant="outline" className="w-full font-poppins">
              + Pengeluaran Lainnya
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Accounting

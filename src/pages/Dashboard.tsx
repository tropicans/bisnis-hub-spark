
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Penjualan",
      value: "Rp 45.680.000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Produk Terjual",
      value: "1,234",
      change: "+8.2%",
      trend: "up", 
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Stok Produk",
      value: "456",
      change: "-3.1%",
      trend: "down",
      icon: Package,
      color: "text-orange-600"
    },
    {
      title: "Pelanggan Aktif",
      value: "89",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    }
  ]

  const recentSales = [
    { id: "001", customer: "Budi Santoso", product: "Kemeja Batik", amount: "Rp 250.000", date: "2025-01-04" },
    { id: "002", customer: "Siti Aminah", product: "Tas Kulit", amount: "Rp 450.000", date: "2025-01-04" },
    { id: "003", customer: "Ahmad Rahman", product: "Sepatu Sport", amount: "Rp 350.000", date: "2025-01-03" },
    { id: "004", customer: "Maya Sari", product: "Dress Casual", amount: "Rp 180.000", date: "2025-01-03" },
    { id: "005", customer: "Rizky Pratama", product: "Jaket Denim", amount: "Rp 320.000", date: "2025-01-02" }
  ]

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-poppins font-bold text-3xl text-primary">Dashboard</h1>
        <p className="text-muted-foreground font-poppins">Selamat datang kembali! Berikut ringkasan bisnis Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-poppins font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-xs font-poppins font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Sales and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="font-poppins font-semibold text-xl">Penjualan Terbaru</CardTitle>
            <CardDescription className="font-poppins">
              5 transaksi terakhir hari ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col">
                    <p className="font-poppins font-medium text-sm">{sale.customer}</p>
                    <p className="text-xs text-muted-foreground">{sale.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-poppins font-semibold text-sm text-green-600">{sale.amount}</p>
                    <p className="text-xs text-muted-foreground">{sale.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="font-poppins font-semibold text-xl">Aksi Cepat</CardTitle>
            <CardDescription className="font-poppins">
              Fitur yang sering digunakan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-poppins font-medium transition-colors">
              + Tambah Penjualan
            </button>
            <button className="w-full p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-poppins font-medium transition-colors">
              + Tambah Produk
            </button>
            <button className="w-full p-3 bg-warning hover:bg-warning/90 text-warning-foreground rounded-lg font-poppins font-medium transition-colors">
              📊 Lihat Laporan
            </button>
            <button className="w-full p-3 border border-border hover:bg-muted/30 rounded-lg font-poppins font-medium transition-colors">
              ⚙️ Pengaturan
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

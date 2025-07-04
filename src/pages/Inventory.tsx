import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Pastikan ini ada
import { Plus, Search, Filter, AlertTriangle, Package, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom" // Pastikan ini ada

const Inventory = () => {
  const navigate = useNavigate(); // Pastikan ini ada

  const inventoryData = [
    { id: "PRD-001", name: "Kemeja Batik Premium", category: "Pakaian", stock: 25, minStock: 10, price: "Rp 250.000", status: "normal" },
    { id: "PRD-002", name: "Tas Kulit Asli", category: "Aksesoris", stock: 8, minStock: 15, price: "Rp 450.000", status: "low" },
    { id: "PRD-003", name: "Sepatu Sport Running", category: "Sepatu", stock: 45, minStock: 20, price: "Rp 350.000", status: "normal" },
    { id: "PRD-004", name: "Dress Casual Wanita", category: "Pakaian", stock: 3, minStock: 10, price: "Rp 180.000", status: "critical" },
    { id: "PRD-005", name: "Jaket Denim Premium", category: "Pakaian", stock: 18, minStock: 12, price: "Rp 320.000", status: "normal" },
    { id: "PRD-006", name: "Celana Jeans Slim", category: "Pakaian", stock: 32, minStock: 15, price: "Rp 220.000", status: "normal" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800"
      case "low": return "bg-yellow-100 text-yellow-800"
      case "critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal": return "Normal"
      case "low": return "Stok Rendah"
      case "critical": return "Stok Kritis"
      default: return "Normal"
    }
  }

  const lowStockItems = inventoryData.filter(item => item.status === "low" || item.status === "critical")

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">Inventory</h1>
          <p className="text-muted-foreground font-poppins">Kelola stok dan produk Anda</p>
        </div>

        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-poppins font-medium" onClick={() => navigate('/inventory/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Total Produk
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-blue-600">456</div>
            <p className="text-xs text-muted-foreground font-poppins">Di 12 kategori</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Nilai Stok
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-green-600">Rp 125.5M</div>
            <p className="text-xs text-muted-foreground font-poppins">Total nilai inventory</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Stok Rendah
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-yellow-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground font-poppins">Perlu restock</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Produk Terlaris
            </CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-purple-600">25</div>
            <p className="text-xs text-muted-foreground font-poppins">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50/50">
          <CardHeader>
            <CardTitle className="font-poppins font-semibold text-lg text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Peringatan Stok
            </CardTitle>
            <CardDescription className="font-poppins text-red-700">
              {lowStockItems.length} produk memerlukan restok segera
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-poppins font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Stok: {item.stock} (Min: {item.minStock})</p>
                  </div>
                  <Button size="sm" variant="outline" className="font-poppins text-xs">
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-poppins font-semibold text-xl">Daftar Produk</CardTitle>
              <CardDescription className="font-poppins">
                Semua produk dalam inventory Anda
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="font-poppins">
                <Search className="w-4 h-4 mr-2" />
                Cari
              </Button>
              <Button variant="outline" size="sm" className="font-poppins">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Kode Produk</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Nama Produk</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Kategori</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Stok</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Harga</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-poppins font-medium text-sm">{item.id}</td>
                    <td className="py-3 px-2 font-poppins text-sm">{item.name}</td>
                    <td className="py-3 px-2 font-poppins text-sm text-muted-foreground">{item.category}</td>
                    <td className="py-3 px-2 font-poppins text-sm text-center">
                      <span className={item.stock <= item.minStock ? "text-red-600 font-semibold" : ""}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-poppins font-semibold text-sm text-green-600">{item.price}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-poppins font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inventory
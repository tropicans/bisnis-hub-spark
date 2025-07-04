import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Pastikan ini ada
import { Plus, Search, Filter, Download } from "lucide-react"
import { useNavigate } from "react-router-dom" // Pastikan ini ada

const Sales = () => {
  const navigate = useNavigate(); // Pastikan ini ada

  const salesData = [
    { id: "TXN-001", date: "2025-01-04", customer: "Budi Santoso", items: 3, total: "Rp 750.000", status: "Selesai" },
    { id: "TXN-002", date: "2025-01-04", customer: "Siti Aminah", items: 1, total: "Rp 450.000", status: "Selesai" },
    { id: "TXN-003", date: "2025-01-03", customer: "Ahmad Rahman", items: 2, total: "Rp 680.000", status: "Pending" },
    { id: "TXN-004", date: "2025-01-03", customer: "Maya Sari", items: 1, total: "Rp 180.000", status: "Selesai" },
    { id: "TXN-005", date: "2025-01-02", customer: "Rizky Pratama", items: 4, total: "Rp 920.000", status: "Selesai" },
    { id: "TXN-006", date: "2025-01-02", customer: "Linda Wati", items: 2, total: "Rp 340.000", status: "Dibatalkan" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai": return "bg-green-100 text-green-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Dibatalkan": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">Sales</h1>
          <p className="text-muted-foreground font-poppins">Kelola dan pantau semua transaksi penjualan</p>
        </div>

        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-poppins font-medium" onClick={() => navigate('/sales/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Transaksi Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Penjualan Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-green-600">Rp 1.200.000</div>
            <p className="text-xs text-muted-foreground font-poppins">3 transaksi selesai</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Penjualan Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-blue-600">Rp 45.680.000</div>
            <p className="text-xs text-muted-foreground font-poppins">156 transaksi selesai</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-poppins font-medium text-muted-foreground">
              Transaksi Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-poppins font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground font-poppins">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-poppins font-semibold text-xl">Daftar Transaksi</CardTitle>
              <CardDescription className="font-poppins">
                Semua transaksi penjualan terbaru
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
              <Button variant="outline" size="sm" className="font-poppins">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">ID Transaksi</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Tanggal</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Pelanggan</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Items</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-poppins font-medium text-sm">{sale.id}</td>
                    <td className="py-3 px-2 font-poppins text-sm text-muted-foreground">{sale.date}</td>
                    <td className="py-3 px-2 font-poppins text-sm">{sale.customer}</td>
                    <td className="py-3 px-2 font-poppins text-sm text-center">{sale.items}</td>
                    <td className="py-3 px-2 font-poppins font-semibold text-sm text-green-600">{sale.total}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-poppins font-medium ${getStatusColor(sale.status)}`}>
                        {sale.status}
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

export default Sales
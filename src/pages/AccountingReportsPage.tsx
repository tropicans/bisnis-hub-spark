import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, startOfMonth, endOfMonth, isSameMonth } from "date-fns";
import { id } from "date-fns/locale"; // Import locale for Indonesian month names
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"; // <-- PERBAIKAN DI SINI

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AccountingReportsPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(startOfMonth(new Date()));

  const allTransactions = [
    { id: "ACC-001", date: "2025-01-04", description: "Penjualan Kemeja Batik", type: "income", amount: 250000, category: "Penjualan" },
    { id: "ACC-002", date: "2025-01-04", description: "Pembelian Bahan Baku", type: "expense", amount: -150000, category: "Pembelian" },
    { id: "ACC-003", date: "2025-01-03", description: "Penjualan Tas Kulit", type: "income", amount: 450000, category: "Penjualan" },
    { id: "ACC-004", date: "2025-01-03", description: "Bayar Listrik Toko", type: "expense", amount: -120000, category: "Operasional" },
    { id: "ACC-005", date: "2025-01-02", description: "Penjualan Sepatu Sport", type: "income", amount: 350000, category: "Penjualan" },
    { id: "ACC-006", date: "2025-01-02", description: "Gaji Karyawan", type: "expense", amount: -500000, category: "Gaji" },
    { id: "ACC-007", date: "2025-02-10", description: "Penjualan Kaos", type: "income", amount: 100000, category: "Penjualan" },
    { id: "ACC-008", date: "2025-02-15", description: "Sewa Toko", type: "expense", amount: -200000, category: "Operasional" },
  ];

  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);
  const [monthlyStats, setMonthlyStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0,
    transactionsCount: 0
  });

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i),
    label: format(new Date(2000, i, 1), "MMMM", { locale: id }),
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => String(currentYear - 5 + i));

  useEffect(() => {
    const transactionsInMonth = allTransactions.filter(tx => {
      const txDate = new Date(tx.date);
      return isSameMonth(txDate, selectedDate);
    });

    const income = transactionsInMonth
      .filter(tx => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expense = transactionsInMonth
      .filter(tx => tx.type === "expense")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    setFilteredTransactions(transactionsInMonth);
    setMonthlyStats({
      totalIncome: income,
      totalExpense: expense,
      netProfit: income - expense,
      transactionsCount: transactionsInMonth.length
    });
    console.log("Laporan diperbarui untuk bulan:", format(selectedDate, "MMMM", { locale: id }));
  }, [selectedDate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const handleMonthChange = (monthIndex: string) => {
    const newMonth = Number(monthIndex);
    const currentYearInSelectedDate = selectedDate.getFullYear();
    setSelectedDate(new Date(currentYearInSelectedDate, newMonth, 1));
  };

  const handleYearChange = (yearString: string) => {
    const newYear = Number(yearString);
    const currentMonthInSelectedDate = selectedDate.getMonth();
    setSelectedDate(new Date(newYear, currentMonthInSelectedDate, 1));
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">Laporan Bulanan</h1>
          <p className="text-muted-foreground font-poppins">Tinjau ringkasan keuangan dan transaksi per bulan.</p>
        </div>
        <div className="flex gap-2 items-center">
          {/* Month Selector */}
          <Select
            onValueChange={handleMonthChange}
            defaultValue={String(selectedDate.getMonth())}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Selector */}
          <Select
            onValueChange={handleYearChange}
            defaultValue={String(selectedDate.getFullYear())}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => navigate(-1)}>
            Kembali
          </Button>
        </div>
      </div>

      {/* Monthly Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <p className="text-xs text-muted-foreground font-poppins">{format(selectedDate, "MMMM yyyy", { locale: id })}</p>
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
            <p className="text-xs text-muted-foreground font-poppins">{format(selectedDate, "MMMM yyyy", { locale: id })}</p>
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
            <p className="text-xs text-muted-foreground font-poppins">{format(selectedDate, "MMMM yyyy", { locale: id })}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="font-poppins font-semibold text-xl">
            Transaksi Bulan {format(selectedDate, "MMMM yyyy", { locale: id })}
          </CardTitle>
          <CardDescription className="font-poppins">
            {filteredTransactions.length} transaksi ditemukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">ID</TableHead>
                  <TableHead className="py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Tanggal</TableHead>
                  <TableHead className="py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Deskripsi</TableHead>
                  <TableHead className="py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Kategori</TableHead>
                  <TableHead className="text-right py-3 px-2 font-poppins font-semibold text-sm text-muted-foreground">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    transaction && (
                      <TableRow key={transaction.id}>
                        <TableCell className="py-3 px-2 font-poppins font-medium text-sm">{transaction.id}</TableCell>
                        <TableCell className="py-3 px-2 font-poppins text-sm text-muted-foreground">{transaction.date}</TableCell>
                        <TableCell className="py-3 px-2 font-poppins text-sm">{transaction.description}</TableCell>
                        <TableCell className="py-3 px-2 font-poppins text-sm">{transaction.category}</TableCell>
                        <TableCell className={`text-right py-3 px-2 font-poppins font-semibold text-sm ${
                            transaction.type === "income" ? "text-green-600" : "text-red-600"
                          }`}>
                          {transaction.type === "income" ? "+" : ""}{formatCurrency(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    )
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Tidak ada transaksi untuk bulan ini.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountingReportsPage;
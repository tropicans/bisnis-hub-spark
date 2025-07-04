import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useLocation } from "react-router-dom"; // Tambahkan useLocation
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; // Digunakan lagi untuk date picker
import { Textarea } from "@/components/ui/textarea";

// 1. Definisikan skema formulir menggunakan Zod
const formSchema = z.object({
  transactionDate: z.date({
    required_error: "Tanggal transaksi wajib diisi.",
  }),
  transactionType: z.enum(["income", "expense"], {
    required_error: "Jenis transaksi wajib dipilih.",
  }),
  description: z.string().min(3, {
    message: "Deskripsi harus memiliki setidaknya 3 karakter.",
  }),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(0.01, {
      message: "Jumlah harus lebih besar dari 0.",
    })
  ),
  category: z.string().min(1, {
    message: "Kategori wajib dipilih.",
  }),
  account: z.string().min(1, {
    message: "Akun wajib dipilih.",
  }),
});

const NewAccountingTransactionPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Inisialisasi useLocation
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type"); // Dapatkan 'type' dari URL

  // Tentukan jenis transaksi berdasarkan query param
  const defaultTransactionType = initialType?.includes("income") ? "income" : initialType?.includes("expense") ? "expense" : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionDate: new Date(),
      transactionType: defaultTransactionType as "income" | "expense" || "expense", // Default ke expense jika tidak ada di URL
      description: "",
      amount: 0,
      category: "",
      account: "Kas", // Default akun
    },
  });

  const watchTransactionType = form.watch("transactionType");

  // Kategori dinamis berdasarkan jenis transaksi
  const getCategories = (type: "income" | "expense") => {
    if (type === "income") {
      return [
        { value: "Penjualan", label: "Penjualan" },
        { value: "Pendapatan Lain", label: "Pendapatan Lain" },
      ];
    } else {
      return [
        { value: "Gaji", label: "Gaji" },
        { value: "Sewa", label: "Sewa" },
        { value: "Pembelian Bahan Baku", label: "Pembelian Bahan Baku" },
        { value: "Operasional", label: "Operasional" },
        { value: "Beban Lain", label: "Beban Lain" },
      ];
    }
  };

  const categories = getCategories(watchTransactionType);

  // Set default category saat jenis transaksi berubah
  useEffect(() => {
    if (categories.length > 0) {
      form.setValue("category", categories[0].value);
    }
  }, [watchTransactionType, categories, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Data Transaksi Akuntansi Baru:", values);
    // Di sini Anda bisa mengirim data ke API backend
    alert("Transaksi akuntansi berhasil disimpan!");
    navigate("/accounting"); // Kembali ke halaman Accounting setelah submit
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">
            Transaksi Akuntansi Baru
          </h1>
          <p className="text-muted-foreground font-poppins">
            Catat {watchTransactionType === "income" ? "pemasukan" : "pengeluaran"} baru Anda di sini.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Batal
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-poppins font-semibold text-xl">Detail Transaksi</CardTitle>
          <CardDescription className="font-poppins">
            Isi semua kolom yang diperlukan untuk transaksi ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Transaksi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Transaksi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis transaksi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="income">Pemasukan</SelectItem>
                        <SelectItem value="expense">Pengeluaran</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Jenis transaksi ini dapat ditentukan dari tombol yang Anda klik.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Transaksi</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Contoh: Pembelian alat tulis kantor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah (Rp)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Contoh: 150000" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Akun</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih akun" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kas">Kas</SelectItem>
                        <SelectItem value="Bank">Bank</SelectItem>
                        <SelectItem value="E-wallet">E-wallet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Batal
                </Button>
                <Button type="submit">
                  Simpan Transaksi
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAccountingTransactionPage;
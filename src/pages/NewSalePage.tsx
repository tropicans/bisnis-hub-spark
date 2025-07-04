import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
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
  FormDescription, // BARIS INI DITAMBAHKAN/DIPERBAIKI
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// 1. Definisikan skema formulir menggunakan Zod
const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Nama pelanggan harus memiliki setidaknya 2 karakter.",
  }),
  productName: z.string().min(2, {
    message: "Nama produk harus memiliki setidaknya 2 karakter.",
  }),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, {
      message: "Kuantitas harus minimal 1.",
    })
  ),
  unitPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, {
      message: "Harga satuan tidak boleh negatif.",
    })
  ),
  transactionDate: z.date({
    required_error: "Tanggal transaksi wajib diisi.",
  }),
  status: z.enum(["Pending", "Selesai", "Dibatalkan"], {
    required_error: "Status transaksi wajib dipilih.",
  }),
  paymentMethod: z.string().min(1, {
    message: "Metode pembayaran wajib dipilih.",
  }),
  totalAmount: z.number().min(0, {
    message: "Total harga tidak boleh negatif.",
  }),
});

const NewSalePage = () => {
  const navigate = useNavigate();

  // 2. Inisialisasi formulir dengan react-hook-form dan zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      transactionDate: new Date(),
      status: "Pending", // Default status
      paymentMethod: "",
      totalAmount: 0,
    },
  });

  const quantity = form.watch("quantity");
  const unitPrice = form.watch("unitPrice");

  // Efek samping untuk menghitung totalAmount secara otomatis
  useEffect(() => {
    const calculatedTotal = (quantity || 0) * (unitPrice || 0);
    form.setValue("totalAmount", calculatedTotal);
  }, [quantity, unitPrice, form]);

  // Fungsi yang dipanggil saat formulir disubmit
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Data Transaksi Baru:", values);
    // Di sini Anda bisa mengirim data ke API backend
    // Contoh: axios.post('/api/sales', values);

    // Setelah submit, bisa arahkan kembali ke halaman Sales atau tampilkan notifikasi
    alert("Transaksi penjualan berhasil disimpan!");
    navigate("/sales"); // Kembali ke halaman Sales setelah submit
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">Tambah Transaksi Penjualan</h1>
          <p className="text-muted-foreground font-poppins">Catat transaksi penjualan baru Anda di sini.</p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Batal
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-poppins font-semibold text-xl">Detail Transaksi</CardTitle>
          <CardDescription className="font-poppins">Isi semua kolom yang diperlukan untuk transaksi ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Pelanggan</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Pelanggan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Produk (misal: Kemeja Batik)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Untuk saat ini, masukkan nama produk secara manual.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kuantitas</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Satuan (Rp)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Harga (Rp)</FormLabel>
                    <FormControl>
                      <Input type="text" readOnly value={new Intl.NumberFormat('id-ID').format(field.value)} className="bg-muted-foreground/10" />
                    </FormControl>
                    <FormDescription>
                      Total harga dihitung otomatis (Kuantitas x Harga Satuan).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Transaksi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Selesai">Selesai</SelectItem>
                        <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metode Pembayaran</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih metode pembayaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                        <SelectItem value="Kartu Kredit/Debit">Kartu Kredit/Debit</SelectItem>
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

export default NewSalePage;
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

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
import { Textarea } from "@/components/ui/textarea";

// 1. Definisikan skema formulir menggunakan Zod
const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Nama produk harus memiliki setidaknya 2 karakter.",
  }),
  category: z.string().min(1, {
    message: "Kategori produk wajib dipilih.",
  }),
  initialStock: z.preprocess(
    (val) => Number(val),
    z.number().int().min(0, {
      message: "Stok awal harus angka bulat dan tidak boleh negatif.",
    })
  ),
  purchasePrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, {
      message: "Harga beli tidak boleh negatif.",
    })
  ),
  sellingPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, {
      message: "Harga jual tidak boleh negatif.",
    })
  ),
  description: z.string().optional(),
  minStock: z.preprocess(
    (val) => Number(val),
    z.number().int().min(0, {
      message: "Minimum stok harus angka bulat dan tidak boleh negatif.",
    })
  ),
});

const NewInventoryPage = () => {
  const navigate = useNavigate();

  // 2. Inisialisasi formulir dengan react-hook-form dan zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      initialStock: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      description: "",
      minStock: 0,
    },
  });

  // Fungsi yang dipanggil saat formulir disubmit
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Data Produk Baru:", values);
    // Di sini Anda bisa mengirim data produk ke API backend
    // Contoh: axios.post('/api/products', values);

    alert("Produk berhasil disimpan!");
    navigate("/inventory"); // Kembali ke halaman Inventory setelah submit
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">Tambah Produk Baru</h1>
          <p className="text-muted-foreground font-poppins">Tambahkan detail produk baru ke dalam inventaris.</p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Batal
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-poppins font-semibold text-xl">Detail Produk</CardTitle>
          <CardDescription className="font-poppins">Isi semua kolom yang diperlukan untuk produk ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Produk" {...field} />
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
                    <FormLabel>Kategori Produk</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pakaian">Pakaian</SelectItem>
                        <SelectItem value="Aksesoris">Aksesoris</SelectItem>
                        <SelectItem value="Sepatu">Sepatu</SelectItem>
                        <SelectItem value="Elektronik">Elektronik</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="initialStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stok Awal</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Stok</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormDescription>
                        Anda akan menerima notifikasi jika stok di bawah angka ini.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Beli (Rp)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Jual (Rp)</FormLabel>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Produk (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Deskripsi lengkap produk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Batal
                </Button>
                <Button type="submit">
                  Simpan Produk
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewInventoryPage;
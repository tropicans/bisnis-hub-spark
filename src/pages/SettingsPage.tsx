import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes"; // Import useTheme

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
import { Separator } from "@/components/ui/separator"; // Import Separator
import { Switch } from "@/components/ui/switch"; // Import Switch
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Definisikan skema formulir menggunakan Zod
const settingsFormSchema = z.object({
  // Pengaturan Umum
  username: z.string().min(3, {
    message: "Nama pengguna harus memiliki setidaknya 3 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  // Pengaturan Aplikasi
  theme: z.enum(["light", "dark", "system"]),
  language: z.string().min(1, {
    message: "Bahasa wajib dipilih.",
  }),
  // Notifikasi
  lowStockNotifications: z.boolean().default(false),
  newTransactionNotifications: z.boolean().default(false),
  // Keamanan (opsional untuk perubahan password)
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
}).refine((data) => {
  // Validasi khusus untuk perubahan password
  if (data.newPassword || data.confirmNewPassword) {
    if (!data.currentPassword) {
      return false; // Harus ada kata sandi lama jika ingin mengubah
    }
    if (data.newPassword !== data.confirmNewPassword) {
      return false; // Kata sandi baru dan konfirmasi harus cocok
    }
  }
  return true;
}, {
  message: "Kata sandi lama wajib diisi jika ingin mengubah kata sandi baru, dan kata sandi baru harus cocok.",
  path: ["newPassword"], // Pesan error akan muncul di newPassword
});

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme(); // Gunakan useTheme

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      username: "Admin BisnisHub", // Contoh default
      email: "admin@bisnishub.com", // Contoh default
      theme: (theme || "system") as "light" | "dark" | "system", // Set default theme dari next-themes
      language: "id", // Default bahasa
      lowStockNotifications: true,
      newTransactionNotifications: true,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Sinkronkan tema dari form ke useTheme
  React.useEffect(() => {
    form.setValue("theme", (theme || "system") as "light" | "dark" | "system");
  }, [theme, form]);

  async function onSubmit(values: z.infer<typeof settingsFormSchema>) {
    console.log("Data Pengaturan Disimpan:", values);
    // Di sini Anda bisa mengirim data pengaturan ke API backend

    // Terapkan perubahan tema
    if (values.theme) {
      setTheme(values.theme);
    }

    alert("Pengaturan berhasil disimpan!");
    // Tidak perlu navigasi, tetap di halaman pengaturan
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-primary">Pengaturan</h1>
          <p className="text-muted-foreground font-poppins">Kelola preferensi dan keamanan akun Anda.</p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-poppins font-semibold text-xl">Profil & Preferensi</CardTitle>
          <CardDescription className="font-poppins">Perbarui informasi pribadi dan pengaturan aplikasi Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Bagian Pengaturan Umum */}
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-lg text-primary">Pengaturan Umum</h3>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Pengguna</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap Anda" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@contoh.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Bagian Pengaturan Aplikasi */}
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-lg text-primary">Pengaturan Aplikasi</h3>
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Tema Aplikasi</FormLabel>
                        <FormDescription>Pilih tema terang, gelap, atau sistem.</FormDescription>
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Pilih tema" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Terang</SelectItem>
                          <SelectItem value="dark">Gelap</SelectItem>
                          <SelectItem value="system">Sistem</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bahasa</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih bahasa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Bagian Notifikasi */}
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-lg text-primary">Notifikasi</h3>
                <FormField
                  control={form.control}
                  name="lowStockNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notifikasi Stok Rendah</FormLabel>
                        <FormDescription>Dapatkan peringatan ketika stok produk menipis.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newTransactionNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notifikasi Transaksi Baru</FormLabel>
                        <FormDescription>Dapatkan pemberitahuan setiap ada transaksi penjualan baru.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Bagian Keamanan */}
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-lg text-primary">Keamanan</h3>
                <FormDescription>Kosongkan kolom kata sandi jika Anda tidak ingin mengubahnya.</FormDescription>
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi Lama</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Kata Sandi Lama Anda" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi Baru</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Kata Sandi Baru" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Ketik ulang Kata Sandi Baru" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Batal
                </Button>
                <Button type="submit">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
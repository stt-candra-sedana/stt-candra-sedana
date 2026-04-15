# Dokumentasi Lengkap Struktur Folder Capstone STT Candra Sedana

Dokumen ini adalah panduan mutlak untuk struktur proyek Next.js lu. Semua penamaan file non-komponen wajib menggunakan camelCase (contoh: `programAction.ts`, `validateUser.ts`). Jangan berani-berani pakai format lain kalau nggak mau kode lu berantakan kayak sampah.

## 1. Penjelasan Direktori (Folder)

| Nama Folder     | Fungsi Utama           | Penjelasan Teknis                                                                                                                               |
| :-------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **actions/**    | Server Actions         | Tempat menyimpan logika mutasi data (POST, PATCH, DELETE) ke Supabase. Lu nggak butuh API routes lagi. Semua fungsi di sini berjalan di server. |
| **app/**        | Routing & Layout       | Jantung utama Next.js App Router. Semua rute halaman dan pengaturan tampilan (layout) ada di sini.                                              |
| **components/** | UI & Features          | Dibagi menjadi `ui/` untuk komponen atomik (button, input) dan sub-folder `admin/` atau `public/` untuk komponen spesifik fitur.                |
| **lib/**        | Configuration          | Pusat pengaturan library pihak ketiga. Isinya konfigurasi Supabase (`client.ts` & `server.ts`) dan skema validasi Zod.                          |
| **types/**      | TypeScript Definitions | Tempat menyimpan interface dan type global, terutama hasil auto-generate dari database Supabase.                                                |
| **utils/**      | Helper Functions       | Kumpulan fungsi kecil yang sering dipanggil (formatting tanggal, manipulasi string, dsb) agar kode di komponen tetap padat.                     |

## 2. Arsitektur Layout (Triple Layout)

Lu punya tiga lapis layout yang fungsinya beda total. Jangan sampai lu salah naruh komponen navigasi di file yang salah.

| File Layout                    | Lingkup Kerja      | Isi Wajib                                                                                             |
| :----------------------------- | :----------------- | :---------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`               | Global             | Tag `<html>`, `<body>`, Font, Metadata SEO Global, dan Provider (jika ada). Ini kerangka paling luar. |
| `app/(public)/layout.tsx`      | Sisi Pengunjung    | Navbar publik, Footer organisasi, dan styling khusus landing page.                                    |
| `app/(admin)/admin/layout.tsx` | Dashboard Internal | Sidebar Admin, Header profil admin, dan Auth Guard (pengecekan login) untuk keamanan.                 |

## 3. Manajemen Data & Keamanan

### Supabase: Client vs Server

Lu harus bedain cara akses Supabase berdasarkan lingkungan eksekusinya. Jangan asal panggil.

| File                | Lingkup     | Penggunaan                                                                                                                             |
| :------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `supabaseClient.ts` | Client Side | Digunakan di komponen yang pakai `use client`. Cocok untuk interaksi real-time atau fungsi login user.                                 |
| `supabaseServer.ts` | Server Side | Digunakan di Server Components dan Server Actions. Ini cara paling aman dan cepat buat ambil data (fetching) atau manipulasi database. |

### Validasi & SEO

- **Validation (Zod):** Semua skema validasi form (misal: `createProgramSchema`) lu taruh di `lib/validations/`. Ini buat mastiin pengurus nggak masukin data sampah ke database.
- **SEO (Metadata API):** Pakai `export const metadata` di tiap `page.tsx`. Jangan pakai tag meta manual. SEO global di root layout, SEO spesifik (judul proker/berita) di tiap halaman masing-masing.

## 4. Aturan Coding Tambahan

1. **Ikon:** Haram menggunakan Lucide. Wajib pakai Heroicons atau Radix Icons.
2. **Komentar:** Minimalkan komentar di dalam kode. Kode lu harus sudah cukup jelas (self-explanatory).
3. **Styling:** Pakai Tailwind CSS secara konsisten. Gunakan library UI seperti Shadcn atau Tremor untuk mempercepat kerja dashboard admin lu.

export type Jabatan = {
  jabatan_id: number;
  nama_jabatan: string;
  tupoksi: string;
};

export type JenisProker = {
  jenis_proker_id: number;
  nama_jenis_proker: string;
  deskripsi_program_kerja: string;
};

export type Event = {
  event_id: number;
  nama_event: string;
  event_date: string;
  deskripsi_acara: string;
  image_url: string;
  url_registrasi: string;
  jenis_proker_id: number | null;
  jenis_proker: { nama_jenis_proker: string } | null;
};

export type Struktur = {
  id: number;
  nama_pengurus: string;
  jabatan_id: number | null;
  jabatan: { jabatan_id: number; nama_jabatan: string } | null;
  foto_url: string | null;
  instagram: string;
  whatsapp: string;
  facebook?: string | null;
  tiktok?: string | null;
  linkedin?: string | null;
};

export type GallerySponsor = {
  id_gallery: number;
  nama_sponsor: string;
  media_url: string;
};

export type VisiMisi = {
  id_visi_misi: number;
  deskripsi: string;
  jenis_visi_atau_misi: "visi" | "misi";
};

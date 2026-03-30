# GeoDuel - Konum Tahmin Düellosu

Akıllı tahtalar için optimize edilmiş, 2 oyunculu konum tahmin yarışması.

## Özellikler

- 🌍 Mapillary OAuth ile 60+ ülkeden gerçek sokak görüntüleri
- 🗺️ Leaflet.js ve OpenStreetMap ile çift harita sistemi
- 👥 2 oyuncu düellosu (5 tur)
- 📊 Mesafe bazlı puanlama (5000 - mesafe*2)
- 📱 Dokunmatik ekran uyumlu
- 🎨 Animasyonlu geçişler
- 🎯 Gerçek koordinat gösterimi

## Kurulum

```bash
npm install
```

## Mapillary OAuth Kurulumu

OAuth zaten yapılandırılmış durumda. Client ID: `26346575774959071`

İlk açılışta "Mapillary ile Giriş Yap" butonuna tıkla ve izin ver.

## Çalıştırma

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

## Vercel'e Deploy

Vercel'e deploy ederken environment variable eklemeye gerek yok, OAuth kullanıyor.

Sadece Vercel dashboard'da **Redirect URI** ayarla:
- Mapillary Developer Dashboard → App Settings → Redirect URIs
- Vercel URL'ini ekle: `https://senin-proje.vercel.app`

## Nasıl Oynanır?

1. Mapillary ile giriş yap (ilk seferinde)
2. Oyuncu isimlerini gir
3. Fotoğraf tam ekran gösterilir
4. "Tahmin Yap" butonuna bas
5. Ekran ikiye bölünür, her oyuncu kendi haritasında tahmin yapar
6. "Sonuçları Göster" - En yakın tahmin yapan kazanır
7. 5 tur sonunda toplam puan yüksek olan kazanır

## Teknolojiler

- React + Vite
- Tailwind CSS
- Framer Motion
- Leaflet.js + React-Leaflet
- Mapillary JS + OAuth
- OpenStreetMap

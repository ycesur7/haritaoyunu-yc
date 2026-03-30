# GeoDuel - Konum Tahmin Oyunu

Akıllı tahtalar için optimize edilmiş, 2 takımlı konum tahmin yarışması.

## Özellikler

- 🌍 Mapillary API ile 60+ ülkeden gerçek sokak görüntüleri
- 🗺️ Leaflet.js ve OpenStreetMap ile tahmin haritası
- 👥 2 takım yarışması (5 tur)
- 📊 Mesafe bazlı puanlama sistemi
- 📱 Dokunmatik ekran uyumlu (Smart Board)
- 🎨 Dark mode tasarım

## Kurulum

```bash
npm install
```

## Mapillary API Token

1. [Mapillary Developer Dashboard](https://www.mapillary.com/dashboard/developers) adresine git
2. Yeni bir uygulama oluştur
3. Client Token'ı kopyala
4. `.env` dosyasındaki `VITE_MAPILLARY_TOKEN` değerini token'ınla değiştir

## Çalıştırma

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

## Vercel'e Deploy

```bash
npm run build
```

Vercel'e deploy etmek için projeyi Vercel dashboard'a yükle. Environment Variables bölümüne `VITE_MAPILLARY_TOKEN` ekle.

## Nasıl Oynanır?

1. Takım isimlerini gir
2. Görüntü dünya genelinde 60+ ülkeden rastgele yüklenir
3. Sıradaki takım haritada tahmin yapar ve "Tahmini Onayla" butonuna basar
4. Mesafeye göre puan kazanılır (5000 - mesafe*2)
5. 5 tur sonunda en yüksek puanlı takım kazanır

## Teknolojiler

- React + Vite
- Tailwind CSS
- Framer Motion
- Leaflet.js + React-Leaflet
- Mapillary JS
- OpenStreetMap

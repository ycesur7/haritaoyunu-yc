// Dünya genelinde ülkelerin geniş koordinat sınırları - Daha fazla kapsama alanı
export const COUNTRIES = [
  { name: 'Türkiye', minLat: 36.0, maxLat: 42.0, minLng: 26.0, maxLng: 45.0 },
  { name: 'Fransa', minLat: 42.0, maxLat: 51.0, minLng: -5.0, maxLng: 8.5 },
  { name: 'Almanya', minLat: 47.3, maxLat: 55.0, minLng: 5.9, maxLng: 15.0 },
  { name: 'İtalya', minLat: 36.6, maxLat: 47.1, minLng: 6.6, maxLng: 18.5 },
  { name: 'İspanya', minLat: 36.0, maxLat: 43.8, minLng: -9.3, maxLng: 3.3 },
  { name: 'İngiltere', minLat: 49.9, maxLat: 58.7, minLng: -8.2, maxLng: 1.8 },
  { name: 'Hollanda', minLat: 50.8, maxLat: 53.5, minLng: 3.4, maxLng: 7.2 },
  { name: 'Belçika', minLat: 49.5, maxLat: 51.5, minLng: 2.5, maxLng: 6.4 },
  { name: 'İsviçre', minLat: 45.8, maxLat: 47.8, minLng: 5.9, maxLng: 10.5 },
  { name: 'Avusturya', minLat: 46.4, maxLat: 49.0, minLng: 9.5, maxLng: 17.2 },
  { name: 'Polonya', minLat: 49.0, maxLat: 54.8, minLng: 14.1, maxLng: 24.1 },
  { name: 'Çek Cumhuriyeti', minLat: 48.5, maxLat: 51.0, minLng: 12.1, maxLng: 18.9 },
  { name: 'Yunanistan', minLat: 34.8, maxLat: 41.7, minLng: 19.4, maxLng: 28.2 },
  { name: 'Portekiz', minLat: 36.9, maxLat: 42.2, minLng: -9.5, maxLng: -6.2 },
  { name: 'İsveç', minLat: 55.3, maxLat: 69.1, minLng: 11.0, maxLng: 24.2 },
  { name: 'Norveç', minLat: 57.9, maxLat: 71.2, minLng: 4.5, maxLng: 31.1 },
  { name: 'Finlandiya', minLat: 59.8, maxLat: 70.1, minLng: 20.5, maxLng: 31.6 },
  { name: 'Danimarka', minLat: 54.5, maxLat: 57.8, minLng: 8.0, maxLng: 15.2 },
  { name: 'ABD', minLat: 25.0, maxLat: 49.0, minLng: -125.0, maxLng: -66.0 },
  { name: 'Kanada', minLat: 42.0, maxLat: 70.0, minLng: -141.0, maxLng: -52.0 },
  { name: 'Japonya', minLat: 30.0, maxLat: 45.5, minLng: 129.0, maxLng: 146.0 },
  { name: 'Güney Kore', minLat: 33.0, maxLat: 38.6, minLng: 125.0, maxLng: 130.0 },
  { name: 'Avustralya', minLat: -43.6, maxLat: -10.0, minLng: 113.0, maxLng: 154.0 },
  { name: 'Yeni Zelanda', minLat: -47.3, maxLat: -34.4, minLng: 166.4, maxLng: 178.6 },
  { name: 'Brezilya', minLat: -33.7, maxLat: 5.3, minLng: -73.9, maxLng: -34.8 },
  { name: 'Arjantin', minLat: -55.0, maxLat: -21.8, minLng: -73.6, maxLng: -53.6 },
  { name: 'Şili', minLat: -56.0, maxLat: -17.5, minLng: -75.6, maxLng: -66.4 },
  { name: 'Meksika', minLat: 14.5, maxLat: 32.7, minLng: -118.4, maxLng: -86.7 },
  { name: 'Güney Afrika', minLat: -34.8, maxLat: -22.1, minLng: 16.5, maxLng: 32.9 },
  { name: 'Rusya (Avrupa)', minLat: 45.0, maxLat: 68.0, minLng: 27.0, maxLng: 60.0 },
  { name: 'Ukrayna', minLat: 44.4, maxLat: 52.4, minLng: 22.1, maxLng: 40.2 },
  { name: 'Romanya', minLat: 43.6, maxLat: 48.3, minLng: 20.3, maxLng: 29.7 },
  { name: 'Bulgaristan', minLat: 41.2, maxLat: 44.2, minLng: 22.4, maxLng: 28.6 },
  { name: 'Hırvatistan', minLat: 42.4, maxLat: 46.5, minLng: 13.5, maxLng: 19.4 },
  { name: 'Slovenya', minLat: 45.4, maxLat: 46.9, minLng: 13.4, maxLng: 16.6 },
  { name: 'Macaristan', minLat: 45.7, maxLat: 48.6, minLng: 16.1, maxLng: 22.9 },
  { name: 'Slovakya', minLat: 47.7, maxLat: 49.6, minLng: 16.8, maxLng: 22.6 },
  { name: 'Estonya', minLat: 57.5, maxLat: 59.7, minLng: 21.8, maxLng: 28.2 },
  { name: 'Letonya', minLat: 55.7, maxLat: 58.1, minLng: 21.0, maxLng: 28.2 },
  { name: 'Litvanya', minLat: 53.9, maxLat: 56.5, minLng: 21.0, maxLng: 26.8 },
  { name: 'İrlanda', minLat: 51.4, maxLat: 55.4, minLng: -10.5, maxLng: -6.0 },
  { name: 'İzlanda', minLat: 63.4, maxLat: 66.5, minLng: -24.5, maxLng: -13.5 },
  { name: 'Tayland', minLat: 5.6, maxLat: 20.5, minLng: 97.3, maxLng: 105.6 },
  { name: 'Endonezya', minLat: -11.0, maxLat: 6.0, minLng: 95.0, maxLng: 141.0 },
  { name: 'Malezya', minLat: 0.9, maxLat: 7.4, minLng: 99.6, maxLng: 119.3 },
  { name: 'Singapur', minLat: 1.15, maxLat: 1.47, minLng: 103.6, maxLng: 104.0 },
  { name: 'Filipinler', minLat: 4.6, maxLat: 21.1, minLng: 116.9, maxLng: 126.6 },
  { name: 'Vietnam', minLat: 8.4, maxLat: 23.4, minLng: 102.1, maxLng: 109.5 },
  { name: 'Hindistan', minLat: 8.0, maxLat: 35.5, minLng: 68.2, maxLng: 97.4 },
  { name: 'İsrail', minLat: 29.5, maxLat: 33.3, minLng: 34.3, maxLng: 35.9 },
  { name: 'BAE', minLat: 22.6, maxLat: 26.1, minLng: 51.5, maxLng: 56.4 },
  { name: 'Katar', minLat: 24.5, maxLat: 26.2, minLng: 50.7, maxLng: 51.7 },
  { name: 'Suudi Arabistan', minLat: 16.0, maxLat: 32.0, minLng: 34.5, maxLng: 55.7 },
  { name: 'Mısır', minLat: 22.0, maxLat: 31.7, minLng: 25.0, maxLng: 35.0 },
  { name: 'Fas', minLat: 27.7, maxLat: 35.9, minLng: -13.2, maxLng: -1.0 },
  { name: 'Tunus', minLat: 30.2, maxLat: 37.5, minLng: 7.5, maxLng: 11.6 },
  { name: 'Cezayir', minLat: 19.0, maxLat: 37.1, minLng: -8.7, maxLng: 12.0 },
  { name: 'Kenya', minLat: -4.7, maxLat: 5.0, minLng: 33.9, maxLng: 41.9 },
  { name: 'Kolombiya', minLat: -4.2, maxLat: 12.5, minLng: -79.0, maxLng: -66.9 },
  { name: 'Peru', minLat: -18.3, maxLat: -0.0, minLng: -81.3, maxLng: -68.7 },
  { name: 'Ekvador', minLat: -5.0, maxLat: 1.5, minLng: -81.0, maxLng: -75.2 }
];

export function getRandomCountry() {
  return COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
}

export function getRandomCoordinate(country) {
  const lat = country.minLat + Math.random() * (country.maxLat - country.minLat);
  const lng = country.minLng + Math.random() * (country.maxLng - country.minLng);
  return { lat, lng };
}

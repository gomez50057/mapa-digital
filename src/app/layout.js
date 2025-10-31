import "@/styles/globals.css";



export const metadata = {
  title: 'Next Maps MVP',
  description: 'Leaflet + GeoJSON, listo para mosaicos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{margin:0}}>{children}</body>
    </html>
  );
}

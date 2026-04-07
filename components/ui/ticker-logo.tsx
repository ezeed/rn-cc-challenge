import { Image, ImageStyle } from 'expo-image';

const logoMap: Record<string, number> = {
  BBAR: require('../../assets/logos/BBAR.webp'),
  BPAT: require('../../assets/logos/BPAT.webp'),
  CAPX: require('../../assets/logos/CAPX.webp'),
  CECO2: require('../../assets/logos/CECO2.webp'),
  CELU: require('../../assets/logos/CELU.webp'),
  CVH: require('../../assets/logos/CVH.webp'),
  DOME: require('../../assets/logos/DOME.webp'),
  DYCA: require('../../assets/logos/DYCA.webp'),
  FERR: require('../../assets/logos/FERR.webp'),
  FIPL: require('../../assets/logos/FIPL.webp'),
  GAMI: require('../../assets/logos/GAMI.webp'),
  GARO: require('../../assets/logos/GARO.webp'),
  HARG: require('../../assets/logos/HARG.webp'),
  INTR: require('../../assets/logos/INTR.webp'),
  IRCP: require('../../assets/logos/IRCP.webp'),
  LEDE: require('../../assets/logos/LEDE.webp'),
  MIRG: require('../../assets/logos/MIRG.webp'),
  MOLA: require('../../assets/logos/MOLA.webp'),
  MTR: require('../../assets/logos/MTR.webp'),
  PATA: require('../../assets/logos/PATA.webp'),
  PGR: require('../../assets/logos/PGR.webp'),
  RIGO: require('../../assets/logos/RIGO.webp'),
  SAMI: require('../../assets/logos/SAMI.webp'),
  SEMI: require('../../assets/logos/SEMI.webp'),
  TECO2: require('../../assets/logos/TECO2.webp'),
} as const;

export function TickerLogo({
  ticker,
  style,
}: {
  ticker: keyof typeof logoMap;
  style?: ImageStyle;
}) {
  const logo = logoMap[ticker.toUpperCase()];
  if (!logo) return null;
  return (
    <Image
      source={logo}
      style={{ width: 40, height: 40, borderRadius: 10, ...style }}
      contentFit="cover"
      transition={1000}
    />
  );
}

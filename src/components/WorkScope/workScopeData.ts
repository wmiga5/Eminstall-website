import {
  Zap,
  Layers,
  Wind,
  Server,
  ShieldCheck,
  Wrench,
  Factory,
  BatteryCharging,
  Snowflake
} from 'lucide-react';
import { WorkScopeItemData } from './types';

// WebP Image imports (full resolution for modal & lightbox)
import silowniaDcImg from '../../assets/images/silownia-dc-baterie-marathon.webp';
import silowniaDcThumb from '../../assets/images/silownia-dc-baterie-marathon-thumb.webp';
import batteryRackImg from '../../assets/images/battery_rack_1783491532019.webp';
import wiezaImg from '../../assets/images/zasilanie-stacja-bazowa-wieza.webp';
import wiezowaRozdzielnicaImg from '../../assets/images/zasilanie-wiezowe-rozdzielnica-terenowa.webp';

import kompensatorSzafaImg from '../../assets/images/kompensator-mocy-biernej-szafa.webp';
import kompensatorModulyImg from '../../assets/images/kompensator-mocy-biernej-moduly.webp';
import bateriaKondensatorowRbkImg from '../../assets/images/automatyczna-bateria-kondensatorow-rbk.webp';
import bateriaKondensatorowStopnieImg from '../../assets/images/bateria-kondensatorow-stopnie.webp';

import freecoolingCzerpniaZewnImg from '../../assets/images/freecooling-kontener-czerpnia-zewnetrzna.webp';
import klimatyzacjaKontenerImg from '../../assets/images/Kilma-Eminstall2.webp';
import freecoolingBoxTelzasImg from '../../assets/images/freecooling-box-telzas-wewnetrzny.webp';
import freecoolingCzerpniaBudynekImg from '../../assets/images/freecooling-czerpnia-budynek.webp';
import kontenerKlimatyzacjaFujitsuImg from '../../assets/images/kontener-telekomunikacyjny-klimatyzacja-fujitsu.webp';
import klimatyzacjaWewnTelecomImg from '../../assets/images/klimatyzacja-wewnetrzna-kontener-telecom.webp';
import serwisChlodniczyProzniowanieImg from '../../assets/images/serwis-chlodniczy-prozniowanie-klimatyzacja.webp';
import montazKlimatyzatoraLgImg from '../../assets/images/montaz-klimatyzatora-lg-agregat-na-elewacji.webp';
import montazKlimatyzatoraLgThumb from '../../assets/images/montaz-klimatyzatora-lg-agregat-na-elewacji-thumb.webp';
import agregatHaierTarasImg from '../../assets/images/agregat-zewnetrzny-haier-na-podstawach-antywibracyjnych-taras.webp';
import montazAgregatuHaierBalkonImg from '../../assets/images/montaz-agregatu-haier-na-balkonie-maskownica-instalacji.webp';
import instalacjaKlimatyzatoraSciennegoImg from '../../assets/images/instalacja-klimatyzatora-sciennego-split-w-pomieszczeniu.webp';
import montazJednostkiWewnBielImg from '../../assets/images/montaz-jednostki-wewnetrznej-split-sciana-biel.webp';
import pomiarTemperaturyNawiewuImg from '../../assets/images/pomiar-temperatury-nawiewu-klimatyzacji-anemometr-testo-410.webp';
import szafaKlimatyzacjiPrecyzyjnejImg from '../../assets/images/budowa-kontenera-szafa-klimatyzacji-precyzyjnej-agregat-sprezarkowy.webp';
import szafaKlimatyzacjiPrecyzyjnejThumb from '../../assets/images/budowa-kontenera-szafa-klimatyzacji-precyzyjnej-agregat-sprezarkowy-thumb.webp';

import prefabrykowanyKontenerImg from '../../assets/images/budowa-kontenera-seria-prefabrykowanych-kontenerow-telekomunikacyjnych.webp';
import prefabrykowanyKontenerThumb from '../../assets/images/budowa-kontenera-seria-prefabrykowanych-kontenerow-telekomunikacyjnych-thumb.webp';
import kontenerPodlogaKorytaImg from '../../assets/images/budowa-kontenera-konstrukcja-podlogi-podniesionej-koryta-kablowe.webp';
import kontenerKorytaSwiatlowodoweImg from '../../assets/images/budowa-kontenera-podwieszane-koryta-swiatlowodowe-szafy-rack.webp';
import kontenerWiertnicaFundamentImg from '../../assets/images/budowa-kontenera-wiertnica-koronowa-przepusty-kablowe-fundament.webp';
import kontenerPvDachImg from '../../assets/images/budowa-kontenera-konstrukcja-wsporcza-paneli-pv-na-dachu.webp';

import rozdzielniaHagerImg from '../../assets/images/Rozdzielnia-Eminstall4.webp';
import rozdzielniaHagerThumb from '../../assets/images/Rozdzielnia-Eminstall4-thumb.webp';
import prefabrykacjaSzafyKasetaImg from '../../assets/images/prefabrykacja-szafy-sterowniczej-kaseta.webp';

// Maintenance & industrial line images
import kompleksowyPrzegladRozdzielnicyImg from '../../assets/images/kompleksowy-przeglad-rozdzielnicy-automatyki.webp';
import kompleksowyPrzegladRozdzielnicyThumb from '../../assets/images/kompleksowy-przeglad-rozdzielnicy-automatyki-thumb.webp';
import przegladSzafyMccbImg from '../../assets/images/przeglad-szafy-rozdzielczej-mccb.webp';
import przegladRozdzielnicyFalownikiImg from '../../assets/images/przeglad-rozdzielnicy-falowniki.webp';
import przegladKlimatyzacjiAgregatImg from '../../assets/images/przeglad-klimatyzacji-serwis-agregatu.webp';
import diagnostykaAgregatuKlimatyzacjiImg from '../../assets/images/diagnostyka-i-serwis-agregatu-klimatyzacji.webp';
import pomiarUziemieniaSonelImg from '../../assets/images/pomiar-rezystancji-uziemienia-miernik-sonel-mpi-540.webp';
import pomiarPrzeplywuTestoImg from '../../assets/images/pomiar-przeplywu-powietrza-i-temperatury-anemometr-testo.webp';
import serwisRozdzielnicyHagerImg from '../../assets/images/serwis-rozdzielnicy-elektrycznej-hager-przez-technika.webp';

import montazLiniiTartacznejImg from '../../assets/images/montaz-nowej-linii-produkcyjnej-tartacznej.webp';
import montazLiniiTartacznejThumb from '../../assets/images/montaz-nowej-linii-produkcyjnej-tartacznej-thumb.webp';
import instalacjaRozdzielnicyRgImg from '../../assets/images/instalacja-rozdzielnicy-glownej-rg.webp';
import montazLiniiTrasyKabloweImg from '../../assets/images/montaz-linii-przemyslowej-trasy-kablowe.webp';
import demontazLiniiWysokoscImg from '../../assets/images/demontaz-linii-przemyslowej-prace-na-wysokosci.webp';
import demontazLiniiTartacznejImg from '../../assets/images/demontaz-linii-tartacznej-przenosniki.webp';
import halaDemontazLiniiImg from '../../assets/images/hala-przemyslowa-demontaz-linii.webp';

// Protocol visualization imports
import protokolBaterieImg from '../../assets/images/protokol-baterie-ups.webp';
import protokolPomiaryImg from '../../assets/images/protokol-pomiary-elektryczne.webp';
import protokolKlimatyzacjaImg from '../../assets/images/protokol-klimatyzacja-vertiv.webp';

// Battery testing & discharge images
import kontrolaBateriiPowersafeImg from '../../assets/images/kontrola-baterii-powersafe-12v101f-ft-czujnik-temperatury.webp';
import rezystorRozladowczyImg from '../../assets/images/rezystor-rozladowczy-do-prob-pojemnosci-baterii-stacyjnych.webp';
import testObciazeniowyBateriiImg from '../../assets/images/test-obciazeniowy-baterii-akumulatorow-ups-fiamm-12fit180.webp';
import testObciazeniowyBateriiThumb from '../../assets/images/test-obciazeniowy-baterii-akumulatorow-ups-fiamm-12fit180-thumb.webp';
import systemAnalizyBateriiImg from '../../assets/images/system-analizy-i-diagnostyki-baterii-wykresy-rozladowania.webp';

export const WORK_SCOPE_ITEMS: WorkScopeItemData[] = [
  {
    id: 'battery-diagnostics',
    categoryKey: 'battery-testing',
    mainImage: testObciazeniowyBateriiImg,
    thumbnail: testObciazeniowyBateriiThumb,
    imagePosition: 'object-[center_25%]',
    gallery: [
      testObciazeniowyBateriiImg,
      rezystorRozladowczyImg,
      systemAnalizyBateriiImg,
      kontrolaBateriiPowersafeImg,
      protokolBaterieImg
    ],
    icon: BatteryCharging,
    tags: ['Próby pojemnościowe', 'Rozładowania baterii', 'Analiza danych & Trendy', 'Pomiary rezystancji']
  },
  {
    id: 'power-systems',
    categoryKey: 'power',
    mainImage: silowniaDcImg,
    thumbnail: silowniaDcThumb,
    imagePosition: 'object-center',
    gallery: [
      silowniaDcImg,
      batteryRackImg,
      protokolBaterieImg,
      wiezowaRozdzielnicaImg,
      wiezaImg
    ],
    icon: Zap,
    tags: ['Siłownie DC 48V', 'Baterie VRLA/AGM', 'UPS AC', 'Pomiary rezystancji']
  },
  {
    id: 'facility-maintenance',
    categoryKey: 'maintenance',
    mainImage: kompleksowyPrzegladRozdzielnicyImg,
    thumbnail: kompleksowyPrzegladRozdzielnicyThumb,
    imagePosition: 'object-[center_20%]',
    gallery: [
      kompleksowyPrzegladRozdzielnicyImg,
      serwisRozdzielnicyHagerImg,
      przegladSzafyMccbImg,
      pomiarUziemieniaSonelImg,
      pomiarPrzeplywuTestoImg,
      przegladRozdzielnicyFalownikiImg,
      przegladKlimatyzacjiAgregatImg,
      diagnostykaAgregatuKlimatyzacjiImg
    ],
    icon: Wrench,
    tags: ['Facility Management', 'Przeglądy okresowe', 'Utrzymanie 24/7', 'Infrastruktura krytyczna']
  },
  {
    id: 'freecooling-hvac',
    categoryKey: 'cooling',
    mainImage: szafaKlimatyzacjiPrecyzyjnejImg,
    thumbnail: szafaKlimatyzacjiPrecyzyjnejThumb,
    imagePosition: 'object-[center_35%]',
    gallery: [
      szafaKlimatyzacjiPrecyzyjnejImg,
      klimatyzacjaWewnTelecomImg,
      freecoolingCzerpniaZewnImg,
      klimatyzacjaKontenerImg,
      serwisChlodniczyProzniowanieImg,
      protokolKlimatyzacjaImg,
      freecoolingBoxTelzasImg,
      freecoolingCzerpniaBudynekImg
    ],
    icon: Wind,
    tags: ['FreeCooling', 'Klimatyzacja precyzyjna', 'F-gazy', 'Wentylacja']
  },
  {
    id: 'residential-ac',
    categoryKey: 'residential-ac',
    mainImage: montazKlimatyzatoraLgImg,
    thumbnail: montazKlimatyzatoraLgThumb,
    imagePosition: 'object-[center_20%]',
    gallery: [
      montazKlimatyzatoraLgImg,
      agregatHaierTarasImg,
      montazAgregatuHaierBalkonImg,
      instalacjaKlimatyzatoraSciennegoImg,
      montazJednostkiWewnBielImg,
      pomiarTemperaturyNawiewuImg,
      protokolKlimatyzacjaImg
    ],
    icon: Snowflake,
    tags: ['Montaż Split / Multi-Split', 'Okresowe przeglądy', 'Odgrzybianie i czyszczenie', 'Certyfikat F-gazy']
  },
  {
    id: 'telecom-containers',
    categoryKey: 'infrastructure',
    mainImage: prefabrykowanyKontenerImg,
    thumbnail: prefabrykowanyKontenerThumb,
    imagePosition: 'object-[center_30%]',
    gallery: [
      prefabrykowanyKontenerImg,
      kontenerPodlogaKorytaImg,
      kontenerKorytaSwiatlowodoweImg,
      kontenerWiertnicaFundamentImg,
      kontenerPvDachImg,
      kontenerKlimatyzacjaFujitsuImg
    ],
    icon: Server,
    tags: ['Węzły POP', 'Kontenery techniczne', 'Podłogi podniesione', 'Korytowanie']
  },
  {
    id: 'switchboards',
    categoryKey: 'switchboards',
    mainImage: rozdzielniaHagerImg,
    thumbnail: rozdzielniaHagerThumb,
    imagePosition: 'object-[center_20%]',
    gallery: [
      rozdzielniaHagerImg,
      przegladSzafyMccbImg,
      prefabrykacjaSzafyKasetaImg,
      protokolPomiaryImg
    ],
    icon: ShieldCheck,
    tags: ['Prefabrykacja rozdzielnic', 'Szafy zasilające', 'Pomiary PN-HD 60364-6', 'Protokoły odbiorcze']
  },
  {
    id: 'other-assembly-works',
    categoryKey: 'other-assembly',
    mainImage: montazLiniiTartacznejImg,
    thumbnail: montazLiniiTartacznejThumb,
    imagePosition: 'object-center',
    gallery: [
      montazLiniiTartacznejImg,
      kompensatorSzafaImg,
      instalacjaRozdzielnicyRgImg,
      bateriaKondensatorowRbkImg,
      montazLiniiTrasyKabloweImg,
      bateriaKondensatorowStopnieImg,
      kompensatorModulyImg,
      demontazLiniiWysokoscImg,
      demontazLiniiTartacznejImg,
      halaDemontazLiniiImg
    ],
    icon: Factory,
    tags: ['Kompensacja mocy biernej', 'Instalacje przemysłowe', 'Okablowanie maszyn', 'Relokacje']
  }
];

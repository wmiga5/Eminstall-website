import {
  Zap,
  Layers,
  Wind,
  Server,
  ShieldCheck,
  Wrench,
  Factory
} from 'lucide-react';
import { WorkScopeItemData } from './types';

// Image imports
import silowniaDcImg from '../../assets/images/silownia-dc-baterie-marathon.jpg';
import batteryRackImg from '../../assets/images/battery_rack_1783491532019.jpg';
import wiezaImg from '../../assets/images/zasilanie-stacja-bazowa-wieza.jpg';
import wiezowaRozdzielnicaImg from '../../assets/images/zasilanie-wiezowe-rozdzielnica-terenowa.jpg';

import kompensatorSzafaImg from '../../assets/images/kompensator-mocy-biernej-szafa.jpg';
import kompensatorModulyImg from '../../assets/images/kompensator-mocy-biernej-moduly.jpg';

import freecoolingCzerpniaZewnImg from '../../assets/images/freecooling-kontener-czerpnia-zewnetrzna.jpg';
import klimatyzacjaKontenerImg from '../../assets/images/Kilma-Eminstall2.jpg';
import freecoolingBoxTelzasImg from '../../assets/images/freecooling-box-telzas-wewnetrzny.jpg';
import freecoolingCzerpniaBudynekImg from '../../assets/images/freecooling-czerpnia-budynek.jpg';

import kontenerPopImg from '../../assets/images/Kontener-Eminstall1.jpg';

import rozdzielniaHagerImg from '../../assets/images/Rozdzielnia-Eminstall4.jpg';
import protokolSepImg from '../../assets/images/Protokol-Eminstall5.png';

export const WORK_SCOPE_ITEMS: WorkScopeItemData[] = [
  {
    id: 'power-systems',
    categoryKey: 'power',
    mainImage: silowniaDcImg,
    gallery: [
      silowniaDcImg,
      batteryRackImg,
      wiezowaRozdzielnicaImg,
      wiezaImg
    ],
    icon: Zap,
    tags: ['Siłownie DC 48V', 'Baterie VRLA/AGM', 'UPS AC', 'Pomiary rezystancji']
  },
  {
    id: 'reactive-power',
    categoryKey: 'compensation',
    mainImage: kompensatorSzafaImg,
    gallery: [
      kompensatorSzafaImg,
      kompensatorModulyImg
    ],
    icon: Layers,
    tags: ['Moc bierna', 'Automatyczna kompensacja', 'Dławiki & Filtry', 'Efektywność']
  },
  {
    id: 'freecooling-hvac',
    categoryKey: 'cooling',
    mainImage: freecoolingCzerpniaZewnImg,
    gallery: [
      freecoolingCzerpniaZewnImg,
      klimatyzacjaKontenerImg,
      freecoolingBoxTelzasImg,
      freecoolingCzerpniaBudynekImg
    ],
    icon: Wind,
    tags: ['FreeCooling', 'Klimatyzacja precyzyjna', 'F-gazy', 'Wentylacja']
  },
  {
    id: 'telecom-containers',
    categoryKey: 'infrastructure',
    mainImage: kontenerPopImg,
    gallery: [
      kontenerPopImg
    ],
    icon: Server,
    tags: ['Węzły POP', 'Kontenery techniczne', 'Podłogi podniesione', 'Korytowanie']
  },
  {
    id: 'switchboards',
    categoryKey: 'switchboards',
    mainImage: rozdzielniaHagerImg,
    gallery: [
      rozdzielniaHagerImg,
      protokolSepImg
    ],
    icon: ShieldCheck,
    tags: ['Prefabrykacja rozdzielnic', 'Szafy zasilające', 'Pomiary SEP', 'Protokoły odbiorcze']
  },
  {
    id: 'facility-maintenance',
    categoryKey: 'maintenance',
    mainImage: null, // Placeholder - awaiting photos
    gallery: [],
    icon: Wrench,
    tags: ['Facility Management', 'Przeglądy okresowe', 'Utrzymanie 24/7', 'Infrastruktura krytyczna']
  },
  {
    id: 'industrial-lines',
    categoryKey: 'industrial',
    mainImage: null, // Placeholder - awaiting photos
    gallery: [],
    icon: Factory,
    tags: ['Instalacje przemysłowe', 'Montaż linii technologicznych', 'Okablowanie maszyn', 'Relokacje']
  }
];

import { WeddingDetails, WeddingEvent } from '../types/wedding';

export const weddingDetails: WeddingDetails = {
  theme: 'theme1',
  auspiciousLine: 'Srirasthu | Subhamasthu | Avighnamasthu',
  displayOrder: 'brideFirst',
  nameFontStyle: 'Cinzel Decorative, serif',
  brideShortName: 'Meghana',
  groomShortName: 'Dinesh',
  brideFullName: 'Meghana',
  brideParents: 'D/o Mandadapu Saibabu & Smt. Sailaja(late)',
  groomFullName: 'Dinesh',
  groomParents: 'S/o Madupuru Venkata Ram Mohana Rao & Smt. Lakshmi',
  coupleDividerText: 'with',
  coupleTagline: 'Two Hearts, One Journey',
  coupleImageUrl: '/assets/couple.jpg',
  coverIcon: 'GanpatiIcon',
  coverText: 'Srirasthu | Subhamasthu | Avighnamasthu',
  weddingDate: '2026-11-26',
  countDownDate: '2026-11-26',
  countDownTime: '20:32',
  blessingMessage:
    'We cordially request your gracious presence to bless the couple with everlasting love & happiness at the auspicious marriage of our Grand Daughter.',
  familiesKicker: 'WITH LOVE & BLESSINGS',
  familiesHeading: 'The Families',
  brideFamilyCard: {
    roleLabel: "BRIDE'S FAMILY",
    parentsNames: 'Sri Mandadapu Sai Babu & Smt. Sailaja (Late)',
    inviteLine: 'Cordially invite you to celebrate the wedding of their only daughter Meghana',
  },
  groomFamilyCard: {
    roleLabel: "GROOM'S FAMILY",
    parentsNames: 'Sri Madupuru Venkata Ram Mohana Rao & Smt. Lakshmi',
    inviteLine: 'Cordially invite you to celebrate the wedding of their younger son Dinesh',
  },
  invitedByLabel: 'Invited by',
  invitedByNames: 'Mandadapu Acthaiah - Smt. Bharathi',
  complimentsLabel: 'With best compliments from:',
  complimentsNames: 'Sri Swarna Venkateswara Rao (Late) - Smt. Rukminamma',
  nearAndDearText: 'Near & Dear',
  music: {
    enabled: true,
    audioUrl: '/assets/wedding-song.mp3',
  },
};

export const weddingEvents: WeddingEvent[] = [
  {
    _id: 'mangala-snanam-haldi',
    eventName: 'Haldi',
    eventDate: '2026-11-25',
    eventTime: '07:30 AM',
    eventAddress: 'Khammam Residence',
  },
  {
    _id: 'pellikuthuru',
    eventName: 'Pellikuthuru',
    eventDate: '2026-11-25',
    eventTime: '11:00 AM',
    eventAddress: 'Khammam Residence',
  },
  {
    _id: 'sumuhurtham-pelli',
    eventName: 'Pelli',
    eventDate: '2026-11-26',
    eventTime: '08:32 PM',
    eventAddress: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    gLocation: {
      mapsQuery: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    },
  },
  {
    _id: 'dinner',
    eventName: 'Dinner',
    eventDate: '2026-11-26',
    eventTime: '07:30 PM Onwards',
    eventAddress: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    gLocation: {
      mapsQuery: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    },
  },
];

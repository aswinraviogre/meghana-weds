import { WeddingDetails, WeddingEvent } from '../types/wedding';

export const weddingDetails: WeddingDetails = {
  theme: 'theme1',
  auspiciousLine: 'Srirasthu | Subhamasthu | Avighnamasthu',
  displayOrder: 'brideFirst',
  nameFontStyle: 'Cinzel Decorative, serif',
  brideShortName: 'Meghana',
  groomShortName: 'Dinesh',
  brideFullName: 'Chi. La. Sow. Meghana',
  brideParents: '(Only D/o Sri Mandadapu Sai Babu - Smt. Sailaja (Late))',
  groomFullName: 'Chi. Dinesh',
  groomParents:
    '(Younger Son of Sri Madhupuru Venkata Rama Mohana Rao - Smt. Lakshmi, Nellore)',
  coupleDividerText: 'with',
  coupleImageUrl: '/assets/couple.jpg',
  coverIcon: 'GanpatiIcon',
  coverText: 'Srirasthu | Subhamasthu | Avighnamasthu',
  weddingDate: '2026-11-26',
  countDownDate: '2026-11-26',
  countDownTime: '20:32',
  blessingMessage:
    'We cordially request your gracious presence to bless the couple with everlasting love & happiness at the auspicious marriage of our Grand Daughter.',
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
    eventName: 'MANGALA SNANAM & HALDI',
    eventDate: '2026-11-25',
    eventTime: '7:30 AM',
    eventAddress: 'Khammam Residence',
  },
  {
    _id: 'pellikuthuru',
    eventName: 'PELLIKUTHURU',
    eventDate: '2026-11-25',
    eventTime: '11:00 AM',
    eventAddress: 'Khammam Residence',
  },
  {
    _id: 'sumuhurtham-pelli',
    eventName: 'SUMUHURTHAM / PELLI',
    eventDate: '2026-11-26',
    eventTime: '8:32 PM',
    eventAddress: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    gLocation: {
      mapsQuery: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    },
  },
  {
    _id: 'dinner',
    eventName: 'DINNER',
    eventDate: '2026-11-26',
    eventTime: 'from 7:30 PM onwards',
    eventAddress: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    gLocation: {
      mapsQuery: 'Sri Lakshmi Gardens, Bonakal Road, Khammam',
    },
  },
];

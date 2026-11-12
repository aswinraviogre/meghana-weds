export interface EventLocation {
  mapsQuery?: string;
}

export interface WeddingEvent {
  _id: string;
  eventName: string;
  eventDate: string; // YYYY-MM-DD
  eventTime: string;
  eventAddress: string;
  gLocation?: EventLocation;
}

export interface WeddingDetails {
  theme: string;
  auspiciousLine: string;
  displayOrder: 'groomFirst' | 'brideFirst';
  nameFontStyle: string;
  brideShortName: string;
  groomShortName: string;
  brideFullName: string;
  brideParents: string;
  groomFullName: string;
  groomParents: string;
  coupleDividerText: string;
  coupleImageUrl: string;
  coverIcon: 'GanpatiIcon';
  coverText: string;
  weddingDate: string; // YYYY-MM-DD
  countDownDate: string; // YYYY-MM-DD
  countDownTime: string; // HH:mm (24h local)
  blessingMessage: string;
  invitedByLabel: string;
  invitedByNames: string;
  complimentsLabel: string;
  complimentsNames: string;
  nearAndDearText: string;
  music: {
    enabled: boolean;
    audioUrl: string;
  };
}

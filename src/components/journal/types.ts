export type JournalLook = {
  imageUrl: string;
  caption: string;
};

export type JournalEvent = {
  id: string;
  lat: number;
  lng: number;
  city: string;
  title: string;
  description: string;
  looks: JournalLook[];
};

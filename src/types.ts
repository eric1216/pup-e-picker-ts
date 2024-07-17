// Add your own custom types in here
export type Tabs = 'favorited' | 'unfavorited' | 'create' | null;

export type Dog = {
  id: number;
  image: string;
  description: string;
  isFavorite: boolean;
  name: string;
};

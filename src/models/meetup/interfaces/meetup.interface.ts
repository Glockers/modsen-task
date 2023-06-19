export interface IMeetupAttributes {
  id: number;
  title: string;
  description?: string;
  tags: string[];
  location: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMeetupInput extends Omit<IMeetupAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

import { AnimalSize } from '../../utils';

export type AnimalSex = 'F' | 'M';

// type AnimalSize = 'Large' | 'Small' | 'Medium';
export interface PetData {
    _id: string;
    name?: string;
    species?: string;
    age?: number;
    breed?: string;
    sex?: AnimalSex;
    size?: AnimalSize;
    color?: string;
    image?: string;
    description?: string;
}

export type FilterKeys = 'color' | 'name' | 'species' | 'age' | 'breed' | 'sex' | 'size';

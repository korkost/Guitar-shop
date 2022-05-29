export interface Comment {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
}

export interface SendComment {
  guitarId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
}

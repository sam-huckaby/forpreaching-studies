// The interface for the DB sermon model
export interface Guide {
    _id: string;
    id: string;
    sermon: string;
    title: string;
    introduction: string;
    instructions: string;
    studies: [any];
    creator: string;
    createdAt: Number;
    updatedAt: Number;
  }
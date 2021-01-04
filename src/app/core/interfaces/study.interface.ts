// The interface for the DB sermon model
export interface Study {
    _id: string;
    id: string;
    caption: string;
    scripture: string;
    passages: [any];
    creator: string;
    createdAt: Number;
    updatedAt: Number;
  }
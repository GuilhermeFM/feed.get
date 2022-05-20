export interface FeedbackCreadteParams {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeebacksRepositories {
  create: (param: FeedbackCreadteParams) => Promise<void>;
}

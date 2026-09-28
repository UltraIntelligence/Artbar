export interface MediaAsset {
  url: string;
  alt?: string;
}

export type PublishedMediaMap = Record<string, MediaAsset>;

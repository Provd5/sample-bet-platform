export interface PointsInterface {
  currentPoints: number;
  currentLivePoints: number,
  currentAccurateScores: number,
  currentLiveAccurateScores: number
}

export interface ResultInterface {
  user_id: string;
  username: string;
  points: PointsInterface;
  currentPosition: number;
  livePositionAdvance: number;
}

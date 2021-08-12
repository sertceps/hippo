interface Ok {
  ok?: number;
  n?: number;
}

interface DelCount {
  deletedCount?: number;
}

export type DelRes = Ok & DelCount;

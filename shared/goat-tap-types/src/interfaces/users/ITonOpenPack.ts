export interface ITonOpenPack {
  id: number;
  hash_id: string;
  source: string;
  destination: string;
  pack_id: number;
  amount: number;
  synced: boolean;
  note: string;
}
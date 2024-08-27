export interface OnChainEvent {
  id: number;
  name: string;
  blockNo: number;
  transactionHash: string;
  logIndex: number;
  data: unknown;
  contract: string;
  refName: string;
  refId: string;
}

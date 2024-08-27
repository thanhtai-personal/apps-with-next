export interface IBlockRef {
  seqno?: number;
  shard?: string;
  workchain?: string;
}

export interface AddressAccountMapper {
  [accountHash: string]: string; // account wallet address
}

export interface IInMsg {
  bounce?: boolean;
  bounced?: boolean;
  createdAt?: Date;
  createdLt?: Date;
  fwdFee?: number | string;
  hash?: string;
  ihrDisabled?: boolean;
  ihrFee?: string;
  importFee?: number | string;
  initState?: string;
  messageContentBody?: string;
  messageContentDecodedComment?: string;
  messageContentDecodedType?: string;
  messageContentHash?: string;
  opcode?: string;
  destination?: string;
  source?: string;
  value?: string | number;
}

export interface IDescription {
  aborted?: boolean;
  computePhSkipReason?: string;
  computePhSkipType?: string;
  creditFirst?: boolean;
  creditPhCredit?: string | number;
  destroyed?: boolean;
  storagePhStatusChange?: string;
  storagePhStorageFeesCollected?: string | number;
  type?: string;
}

export interface IAccountState {
  accountStatus?: string;
  balance?: string | number;
  codeHash?: string;
  dataHash?: string;
  frozenHash?: string;
  hash?: string;
}

export interface ITransaction {
  account: string;
  accountStateAfter?: IAccountState;
  accountStateBefore?: IAccountState;
  blockRef?: IBlockRef;
  description?: IDescription;
  endStatus?: string;
  hash?: string;
  inMsg?: IInMsg;
  lt?: string | number;
  mcBlockSeqno?: number;
  now?: Date;
  origStatus?: string;
  prevTransHash?: string;
  prevTransLt?: string | number;
  totalFees?: number | string;
  destination?: string;
  source?: string;
  value?: string | number;
}
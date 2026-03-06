
export const PayeeType = {
  'ExistingPayee': 'ExistingPayee',
  'NewPayee': 'NewPayee',
  'NewPayNow': 'NewPayNow'
};

export enum payNowType {
  U, M, N
};//U: CmpnyIde, M: Mobile, NF: NIRC

export const payNowProxyTypeLableMap = {
  'U': 'Company identifier',
  'M': 'Mobile number',
  'N': 'NRIC/FIN',
};



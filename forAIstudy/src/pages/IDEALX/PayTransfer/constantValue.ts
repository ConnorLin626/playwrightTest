/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
export const payeeType = {
    ExistingPayee: 'ExistingPayee',
    NewPayee: 'NewPayee',
    NewPayNow: 'NewPayNow'
};

export const payNowTypeCodeMap = {
    U: 'U',
    M: 'M',
    N: 'N'
};

export const payNowProxyTypeLableMap = {
    U: 'Company identifier',
    M: 'Mobile number',
    N: 'NRIC/FIN'
};

export const statusLabelMap = {
    Approved: 'Approved',
    PendingApproval: 'Pending Approval',
    PartialApproved: 'Partial Approved',
    PendingRelease: 'Pending Release',
    PendingVerification: 'Pending Verification',
    PartialCompleted: 'Partial Completed',
    Received: 'Received',
    Completed: 'Completed',
    Saved: 'Saved',
    Submitted: 'Submitted',
    BankRejected: 'Bank Rejected',
    Rejected: 'Rejected',
    Failed: 'Failed',
    Cancelled: 'Cancelled',
}

export const approvalOptionLableMap = {
    byTXN: "By Transaction",
    byFile: "By File"
}

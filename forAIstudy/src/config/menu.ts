/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
export const MOUSE_TYPE =
{
    MOUSEOVER: "mouseover",
    CLICKLEFT: "clickleft"
};

export let Menu =
{
    "Approvals": {
        "PaymentsTransactionsFiles": {
            //"fileName": "Menu.Approvals.Payments.png",
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navApprovalsCentreNText" } }
        },
        "PaymentsITT": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navIncomingTransfersText" } }
        },
        "PaymentTemplates": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navTemplatesCentreNText" } }
        },
        "CustomerSelfAdministration": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navSSMAdminLinkText" } }
        },
        "OfflineApprovals": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navOfflineApprovalText" } }
        },
        "VerificationAndReleases": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navVerifyReleaseCentreText" } }
        },
        "Verifications": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navVerificationNText" } }
        },
        "Releases": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navReleasesNText" } }
        },
        "AccountBalanceReviews": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAccountBalanceReviewsLinkText" } }
        },
        "OfflineApprove": {
          "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
          "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navOfflineApprovalNText" } }
        }
    },
    "Accounts": {
        "Balances": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPThirdAccountsStatementsLinkNText" } }
        },
        "Activities": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPThirdAccountsDetailsLinkNText" } }
        },
        "FixedDeposits": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIsecondfixeddepositNLinkText" } }
        },
        "LMSDashboard": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navLMSDashboardLinkText" } }
        },
        "Loans": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIsecondloanNLinkText" } }
        },
        "ChequeStatus": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdchequeStatusLinkNText" } }
        },
        "CreditMatching": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdcreditMatchingLinkText" } }
        },
        "AccountBalanceReviews": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAccountBalanceReviewsLinkText" } }
        }
    },
    "Payments": {
        "TransferCenter": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navPaymentsCentreNText" } }
        },
        "PaymentsITT": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navIncomingTransfersText" } }
        },
        "PaymentTemplates": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navTemplatesCentreNText" } }
        },
        "Beneficiary": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navBBSecondPaymentsAllThirdPartyListLinkNText" } }
        },
        "TransactionSearch": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdtransactionLinkText" } }
        },
        "PaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGSinglePmtText" } }
        },
        "HKPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateHKSinglePmtText" } }
        },
        "TWPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTWSinglePmtText" } }
        },
        "TelegraphicTransfer": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGTNtText" } }
        },
        "PaymentCreateSGCorpChq": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGCORPChqText" } }
        },
        "PaymentCreateSGStopCheque": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navBBServicesCheckStopPayLinkText" } }
        },
        "PaymentCreateBulkpayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGbGiroNText" } }
        },
        "PaymentCreateSGIntraCompanyTransafer": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTRNIntNText" } }
        },
        "MT101Payment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTRNMT101Text" } }
        },
        "CrossBoarderACH": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTRNCRSBRDText" } }
        },
        "PaymentSGBulkCollection": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGbGiroCollectionNText" } }
        },
        "BillPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateBPText" } }
        },
        "NewBillPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateBPNText" } }
        },
        "INPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateINSinglePmtText" } }
        },
        "ManagePayrollDBS": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGMPYRLNText" } }
        },
        "ManagePayrollAlternateDBS": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGMPYRL2NText" } }
        },
        "PayrollAlternate": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGPYRL2NText" } }
        },
        "PaymentCreateTWBulkPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTWBPAYNText" } }
        },
        "PaymentCreateTWPayroll": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTWPYRLNText" } }
        },
        "PaymentCreateTWCollection": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTWBACNText" } }
        },
        "IDPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateIDSinglePmtText" } }
        },
        "CNPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateCNSinglePmtText" } }
        },
        "PartnerBankPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTRNPTNBNKNText" } }
        },
        "FastCollection": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGG3collText" } }
        },
        "NewFastCollectionPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGG3collNText" } }
        },
        "DemandDraft": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateSGDMDRFTText" } }
        },
        "HKPayroll02": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateHKPYRL2NText" } }
        },
        "IDPayroll": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateIDPYRLNText" } }
        },
        "IDManagePayroll": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateIDMPYRLNText" } }
        },
        "IDPayroll02": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateIDPYRL2NText" } }
        },
        "IDManagePayroll02": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateIDMPYRL2NText" } }
        },
        "IDBulkPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateIDBPAYNText" } }
        },
        "VNBulkPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateVNBPAYNText" } }
        },
        "VNPayroll": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateVNPYRLNText" } }
        },
        "VNManagePayroll": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateVNMPYRLNText" } }
        },
        "VNPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateVNSinglePmtText" } }
        },
        "AUBulkPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateAUBPAYNText" } }
        },
        "AUPayrollPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateAUPYRLNText" } }
        },
        "AUMPayrollPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateAUMPYRLNText" } }
        },
        "AUPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateAUSinglePmtText" } }
        },
        "MOIntraCompanyTransafer": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateTRNIntNText" } }
        },
        "MOPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateMOSinglePmtText" } }
        },
        "FixedDepositPlacement": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondCreateFDPLMTText" } }
        },
        "FixedDepositCenter": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopAccountsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIsecondfixeddepositNLinkText" } }
        },
        "FixedDepositApproval": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopMyApprovalsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navApprovalFixedDepositText" } }
        },
        "UKPaymentLocalOverseasPayee": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateUKSinglePmtText" } }
        },
        "VNeCorporateTax": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateVNCORPTAXText" } }
        },
        "VNCustomPayment": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateVNCMTAXText" } }
        },
        "CNPayrollLimit": {
          "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
          "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCBSecondCreateCNPYRLNText" } }
        },
        "CNPaymentLimit": {
          "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopPaymentsLinkText" } },
          "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navBBSecondPaymentsCnLimitLinkNText" } }
        }
    },
    "Files": {
        "UploadList": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPImportHistoryPaymentsLinkText" } }
        },
        "UploadProfiles": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPImportPaymentsLinkText" } }
        },
        "DownloadList": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPExportHistoryPaymentsLinkText" } }
        },
        "DownloadProfiles": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPExportPaymentsLinkText" } }
        },
        "ManageFiles": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPSecondEFDFileListLinkText" } }
        },
        "ManageDownloadFiles": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPSecondEFDManageDownLoadFilesText" } }
        },
        "UploadFile": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPSecondEFDUploadFileLinkText" } }
        },
        "DownloadFile": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPExportFileProfileLinkText" } }
        },
        "Send": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navBBTopFileXSLinkText" } }
        },
        "FileManagementCenter": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navFMUploadFileLinkText" } }
        },
        "DownloadFileNew": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navFMDownloadFileLinkText" } }
        },
        "FileEnquiry": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopFileLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navPayNowFileEnquiryLinkText" } }
        },
    },
    "Reports": {
        "AccountReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdreportsLinkText" } }
        },
        "NewAccountReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdreportsNLinkText" } }
        },
        "NewPaymentReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPPaymentReportsNLinkText" } }
        },
        "NewFileUploadReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPSecondEFDReportsNLinkText" } }
        },
        "CustomReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdcustomReportsLinkText" } }
        },
        "NewCustomReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdcustomReportsNLinkText" } }
        },
        "ExportDefinition": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirddataExportDefinitionLinkText" } }
        },
        "NewDataExport": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirddataExportDefinitionNLinkText" } }
        },
        "ExportLibrary": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirddataExportLibraryLinkText" } }
        },
        "ScheduleExport": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdscheduleReportExportLinkText" } }
        },

        "PaymentReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPPaymentReportsLinkText" } }
        },
        "AdminReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondreportsLinkText" } }
        },
        "eStatementsReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdEstatementsNLinkText" } }
        },
        "FileUploadReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPSecondEFDReportsLinkText" } }
        },
        "TradeReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAITradeThirdReportsLinkText" } }
        },
        "SFReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navOATSFReportLinkText" } }
        },
        "BFReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navOATBFReportLinkText" } }
        },
        "ARPReports": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navAIThirdReportsLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navOATARPReportLinkText" } }
        },
    },
    "TradeFinance": {
        "TransactionCreate": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBMainTradeFinanceText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondTransactionCreateLinkText" } }
        },
        "TransactionsInProcess": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBMainTradeFinanceText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondTransactionProcessLinkText" } }
        },
        "StandardClause": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBMainTradeFinanceText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIThirdstandardclausesLinkText" } }
        },
        "TransactionParties": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBMainTradeFinanceText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIThirdtransactionPartiesLinkText" } }
        },
        "TransactionReview": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBMainTradeFinanceText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondTransactionReviewLinkText" } }
        },
        "FilesExchange": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBMainTradeFinanceText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondTradeFileXCenterLinkText" } }
        },
    },

    "UserInfoMastHead": {
        "ChangePIN": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-person" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdchangePINLinkText" } }
        },
        "RegisterTokenSecurityDevice": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-person" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAIthirdRegisterSecurityDeviceLinkText" } }
        },
        "StartupScreen": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-person" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPAdminStartupText" } }
        },
        "AlertReminders": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-person" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondAlertRemindersLinkText" } }
        }
    },
    "CompanyInfo": {
        "SwitchToSubsi": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-company" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "viewSubsi" } },
        },

        "SwitchToSubsi2ID": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-company" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "INDIA" } },
            "step3": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "className": "menu-item padding-right-16" } },
            },
    },
    "Dashboard": {
        "Home": {
            "step1": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navBBTopDashLinkText" } }
        }
    },
    "Forex": {
        "FXContracts": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopForexLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondFXContractsNLinkText" } },
        },
        "bookFXDeal": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "navBBTopForexLinkText" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondFXBookingLinkText" } },
        }
    },
    "Alert": {
        "CreateManageAlerts": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-person" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navAISecondAlertRemindersNLinkText" } },
        },
        "AlertNotifications": {
            "step1": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "menu-notifications" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "view-notification" } },

        }
    },
    "Help": {
        "Resources": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "user-help" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPEdgeResourcesLinkText" } },
        },
        "ContactUs": {
            "step1": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "user-help" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPEdgecontactUsLinkText" } },

        }
    },
    "SSM": {
        "UserLibrary": {
            "step1": { "type": MOUSE_TYPE.MOUSEOVER, "ele": { "id": "View and manage users" } },
            "step2": { "type": MOUSE_TYPE.CLICKLEFT, "ele": { "id": "navCPThirdAccountsStatementsLinkNText" } }
        },
    }
}

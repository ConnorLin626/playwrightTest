/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import {
    Page,
    component, log,
    Button,
    TextInput,
    waitForUXLoading
} from "../../../lib";

@log export class AccountReportsListPage extends Page {
    constructor() {
        super();
    }

    // new UI
    @component('//*[@id="nav-item-navAIThirdReportsLinkText"]') public reportMenu: Button;
    @component('//a[contains(@href,"#/reports/cash/account")]') public accountReport: Button;
    @component('//a[contains(@href,"#/reports/cash/payment")]') public paymentReport: Button;
    @component('//a[contains(@href,"#/reports/cash/custom")]') public customReport: Button;
    @component('//a[contains(@href,"#/reports/cash/fileUpload")]') public fileUploadReport: Button;
    @component('//a[contains(@href,"#/reports/admin/enquiry")]') public adminReport: Button;
    @component('//a[contains(@href,"#/reports/cash/dataExport")]') public cashManagementReport: Button;
    @component('//a[contains(@href,"#/reports/eStatements/account")]') public eStatementsReport: Button;
    @component('//a[contains(@href,"#/reports/cash/dataExport")]') public dataExport: Button;
    @component('//*[@id="report-expand-type-0"]')
    public showReportDetailsBtn: Button;
    @component('//label[@id="report-expand-type-0"]')
    public showReportDetailsBtn4NewFileUpload: Button;
    @component('//a[@id="ux-tab-reportTypes"]') public reportTypesButton: Button;
    @component('//a[@id="ux-tab-publishedReports"]')
    public publishedReportsButton: Button;
    @component('//input[@id="reports-filter"]')
    public reportsFilterButton: TextInput;
    @component('//label[@id="icon-shared-0"]') public sharedIcon: Button;
    @component('//button[@id="dialogDelete"]') public dialogDeleteBtn: Button;
    @component('//*[@name="dismiss"]') public dismiss: Button;
    @component('//*[@name="selectAllName"]') public selectAllNameButton: Button;
    @component('//*[@id="fromAccount"]') public organisationList: Button;
    @component('//*[@name="report-organisation"]') public organisationInput: TextInput;
    @component('//p-auto-complete/div/div[2]/ul') public checkOrganisationList: TextInput;
    @component('//p-auto-complete/div/div[2]/ul/li[2]/div/span') public sbuOrg1: Button;
    @component('//p-auto-complete/div/div[2]/ul/li[3]/div/span') public sbuOrg2: Button;
    

    //publish tab
    @component('//button[@id="report-publish-delete"]')
    public publishDeleteButton: Button;
    @component('//span[@id="BNKInOutAd-publish-button"]')
    public BNKInOutAdPublishButton: Button;
    @component('//span[@id="report-published-refresh"]')
    public refreshButton: Button;
    @component('//p[@id="report-type-0"]') public publishType: TextInput;
    @component('//p[@id="report-name-0"]') public publishReportName: TextInput;
    @component('//span[@id="status-0"]') public publishStatus: TextInput;

    //  new UI create button
    @component('//button[@id="BNKPoboRobo-create"]')
    public PoboRoboCreateButton: Button;
    @component('//button[@id="BNKDlyMt940-create"]')
    public DlyMt940CreateButton: Button;
    @component('//button[@id="BNKColRtn-create"]')
    public ColRtnCreateButton: Button;
    @component('//button[@id="BNKColAcct-create"]')
    public ColAcctCreateButton: Button;
    @component('//button[@id="BNKColThru-create"]')
    public ColThruCreateButton: Button;
    @component('//button[@id="BNKLoanDet-create"]')
    public LoanDetCreateButton: Button;
    @component('//button[@id="BNKLoanSum-create"]')
    public LoanSumCreateButton: Button;
    @component('//button[@id="BNKCheDep-create"]')
    public CheDepCreateButton: Button;
    @component('//button[@id="BNKFdDet-create"]')
    public FdDetCreateButton: Button;
    @component('//button[@id="BNKFdSum-create"]')
    public FdSumCreateButton: Button;
    @component('//button[@id="BNKInOutAd-create"]')
    public InOutAdCreateButton: Button;
    @component('//button[@id="BNKInOutSum-create"]')
    public InOutSumCreateButton: Button;
    @component('//button[@id="BNKAcctDet-create"]')
    public AcctDetCreateButton: Button;
    @component('//button[@id="BNKAcctSum-create"]')
    public AcctSumCreateButton: Button;
    @component('//button[@id="bulkCollection-create"]')
    public bulkColCreateButton: Button;
    @component('//button[@id="bulkPayment-create"]')
    public bulkPaymentCreateButton: Button;
    @component('//button[@id="chequesDetailed-create"]')
    public chequeDraftDetailCreateButton: Button;
    @component('//button[@id="chequesSummary-create"]')
    public chequeDraftSummaryCreateButton: Button;
    @component('//button[@id="FASTCollection-create"]')
    public FASTCollectionCreateButton: Button;
    @component('//button[@id="FASTPayment-create"]')
    public FASTPaymentCreateButton: Button;
    @component('//button[@id="GroupDetail-create"]')
    public groupDetCreateButton: Button;
    @component('//button[@id="GroupSummary-create"]')
    public groupSumCreateButton: Button;
    @component('//button[@id="LastModifier-create"]')
    public txnStatusCreateButton: Button;
    @component('//button[@id="PaymentAdvice-create"]')
    public payAdvCreateButton: Button;
    @component('//button[@id="payRoll-create"]')
    public payrollCreateButton: Button;
    @component('//button[@id="payRollSummary-create"]')
    public payrollSumCreateButton: Button;
    @component('//button[@id="stopCheque-create"]')
    public stopCheCreateButton: Button;
    @component('//button[@id="Summary-create"]')
    public payCurCreateButton: Button;
    @component('//button[@id="TaxAdvice-create"]')
    public taxAdvCreateButton: Button;
    @component('//button[@id="TaxDetail-create"]')
    public taxDetCreateButton: Button;
    @component('//button[@id="TaxSummary-create"]')
    public taxSumCreateButton: Button;
    @component('//button[@id="transferDetail-create"]')
    public transferDetCreateButton: Button;
    @component('//button[@id="transferSummary-create"]')
    public transferSumCreateButton: Button;
    @component('//button[@id="TransferSumDetail-create"]')
    public tranSumDetCreateButton: Button;
    @component('//button[@id="ATM-create"]') public atmCreateButton: Button;
    @component('//button[@id="ALTMINSORP-create"]') public ALTMINSORPCreateButton: Button;
    @component('//button[@id="fileDetail-create"]')
    public fileDetailCreateButton: Button;
    @component('//*[@id="fileDetail-standard"]')public fileDetailStandardBtn: Button;
    @component('//button[@id="fileSummary-create"]')
    public fileSumCreateButton: Button;
    @component('//button[@id="transactionDetail-create"]')
    public transactionDetailCreateButton: Button;
    @component('//button[@id="transactionSummary-create"]')
    public transactionSumCreateButton: Button;
    @component('//button[@id="BNKExpAccSum-create"]')
    public industryAcctSumCreateBtn: Button;
    @component('//button[@id="BNKExpAccDet-create"]')
    public industryAcctDetCreateBtn: Button;
    @component('//button[@id="CustomsTaxSummary-create"]') public customsCreateButton: Button;
    @component('//button[@id="EDPayment-create"]') public createEDPReportButton: Button;

    //  new UI delete button
    @component('//*[@id="BNKPoboRobo-detele"]')
    public PoboRoboDeteleButton: Button;
    @component('//*[@id="BNKDlyMt940-detele"]')
    public DlyMt940DeteleButton: Button;
    @component('//*[@id="BNKColRtn-detele"]')
    public ColRtnDeteleButton: Button;
    @component('//*[@id="BNKColAcct-detele"]')
    public ColAcctDeteleButton: Button;
    @component('//button[@id="BNKColThru-detele"]')
    public ColThruDeteleButton: Button;
    @component('//*[@id="BNKLoanDet-detele"]')
    public LoanDetDeteleButton: Button;
    @component('//*[@id="BNKLoanSum-detele"]')
    public LoanSumDeteleButton: Button;
    @component('//*[@id="BNKCheDep-detele"]')
    public CheDepDeteleButton: Button;
    @component('//*[@id="BNKFdDet-detele"]')
    public FdDetDeteleButton: Button;
    @component('//*[@id="BNKFdSum-detele"]')
    public FdSumDeteleButton: Button;
    @component('//*[@id="BNKInOutAd-detele"]')
    public InOutAdDeteleButton: Button;
    @component('//*[@id="BNKInOutSum-detele"]')
    public InOutSumDeteleButton: Button;
    @component('//*[@id="BNKAcctDet-detele"]')
    public AcctDetDeteleButton: Button;
    @component('//*[@id="BNKAcctSum-detele"]')
    public AcctSumDeteleButton: Button;
    @component('//*[@id="ATM-detele"]') public atmDeteleButton: Button;

    //List delete
    @component('//*[@id="report-expand-type-9"]/span')
    public BulkColRepShowSaTem: Button;
    @component('//span[@id="bulkCollection-options-1"]')
    public BulkColRepOptions: Button;
    @component('//*[@id="bulkCollection-delete-1"]')
    public BulkColRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-8"]/span')
    public BulkPayRepShowSaTem: Button;
    @component('//*[@id="report-expand-type-9"]/span')
    public ERPShowSaTem: Button;
    @component('//span[@id="bulkPayment-options-1"]')
    public BulkPayRepOptions: Button;
    @component('//*[@id="bulkPayment-delete-1"]')
    public BulkPayRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-13"]/span')
    public FastCollDetRepShowSaTem: Button;
    @component('//*[@id="FASTCollection-options-1"]')
    public FastCollDetRepOptions: Button;
    @component('//*[@id="FASTCollection-delete-1"]')
    public FastCollDetRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-15"]/span')
    public CheDraDeRepShowSaTem: Button;
    @component('//span[@id="chequesDetailed-options-1"]')
    public CheDraDeRepOptions: Button;
    @component('//*[@id="chequesDetailed-delete-1"]')
    public CheDraDeRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-12"]/span')
    public FastPayDetRepShowSaTem: Button;
    @component('//span[@id="FASTPayment-options-1"]')
    public FastPayDetRepOptions: Button;
    @component('//*[@id="FASTPayment-delete-1"]')
    public FastPayDetRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-7"]/span')
    public GroDetRepShowSaTem: Button;
    @component('//span[@id="GroupDetail-options-1"]')
    public GroDetRepOptions: Button;
    @component('//*[@id="GroupDetail-delete-1"]')
    public GroDetRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-6"]/span')
    public GroSumRepShowSaTem: Button;
    @component('//span[@id="GroupSummary-options-1"]')
    public GroSumRepOptions: Button;
    @component('//*[@id="GroupSummary-delete-1"]')
    public GroSumRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-4"]/span')
    public TraStaRepShowSaTem: Button;
    @component('//span[@id="LastModifier-options-1"]')
    public TraStaRepOptions: Button;
    @component('//*[@id="LastModifier-delete-1"]')
    public TraStaRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-5"]/span')
    public PayAdvRepShowSaTem: Button;
    @component('//span[@id="PaymentAdvice-options-1"]')
    public PayAdvRepOptions: Button;
    @component('//*[@id="PaymentAdvice-delete-1"]')
    public PayAdvRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-11"]/span')
    public PayrollRepShowSaTem: Button;
    @component('//span[@id="payRoll-options-1"]')
    public PayrollOptions: Button;
    @component('//*[@id="payRoll-delete-1"]')
    public PayrollDeleteButton: Button;
    @component('//*[@id="report-expand-type-10"]/span')
    public PayrollSumRepShowSaTem: Button;
    @component('//span[@id="payRollSummary-options-1"]')
    public PayrollSumOptions: Button;
    @component('//*[@id="payRollSummary-delete-1"]')
    public PayrollSumDeleteButton: Button;
    @component('//*[@id="report-expand-type-16"]/span')
    public StoCheRepShowSaTem: Button;
    @component('//span[@id="stopCheque-options-1"]')
    public StoCheRepOptions: Button;
    @component('//*[@id="stopCheque-delete-1"]')
    public StoCheRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-3"]/span')
    public PaySumByCurrRepShowSaTem: Button;
    @component('//span[@id="Summary-options-1"]')
    public PaySumByCurrRepOptions: Button;
    @component('//*[@id="Summary-delete-1"]')
    public PaySumByCurrRepoDeleteButton: Button;
    @component('//*[@id="report-expand-type-19"]/span')
    public TaxPayAdvRepShowSaTem: Button;
    @component('//span[@id="TaxAdvice-options-1"]')
    public TaxPayAdvRepOptions: Button;
    @component('//*[@id="TaxAdvice-delete-1"]')
    public TaxPayAdvRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-18"]/span')
    public TaxPayDetRepShowSaTem: Button;
    @component('//span[@id="TaxDetail-options-1"]')
    public TaxPayDetRepOptions: Button;
    @component('//*[@id="TaxDetail-delete-1"]')
    public TaxPayDetRepDeleteButton: Button;
    @component('//*[@id="report-expand-type-17"]/span')
    public TaxPaySumRepShowSaTem: Button;
    @component('//span[@id="TaxSummary-options-1"]')
    public TaxPaySumRepOptions: Button;
    @component('//*[@id="TaxSummary-delete-1"]')
    public TaxPaySumRepDeteleButton: Button;
    @component('//*[@id="report-expand-type-2"]/span')
    public TranDetaRepShowSaTem: Button;
    @component('//span[@id="transferDetail-options-1"]')
    public TranDetaRepOptions: Button;
    @component('//*[@id="transferDetail-delete-1"]')
    public TranDetaRepDeteleButton: Button;
    @component('//*[@id="report-expand-type-0"]/span')
    public TranSumRepShowSaTem: Button;
    @component('//span[@id="transferSummary-options-1"]')
    public TranSumRepOptions: Button;
    @component('//*[@id="transferSummary-delete-1"]')
    public TranSumRepDeteleButton: Button;
    @component('//*[@id="report-expand-type-1"]/span')
    public TranSumDetRepShowSaTem: Button;
    @component('//span[@id="TransferSumDetail-options-1"]')
    public TranSumDetRepOptions: Button;
    @component('//*[@id="TransferSumDetail-delete-1"]')
    public TranSumDetRepDeteleButton: Button;
    @component('//*[@id="report-expand-type-11"]/span') public customsRepShowSaTem: Button;
    @component('//span[@id="CustomsTaxSummary-options-1"]') public customsRepOptions: Button;
    @component('//*[@id="CustomsTaxSummary-delete-1"]') public customsRepDeleteButton: Button;
    @component('//*[@class="dialog-msg ng-star-inserted"]') public ERPRepDelDialog: Button;


    //  new UI action button
    @component('//span[@id="BNKPoboRobo-options-0"]')
    public PoboRoboActionButton: Button;
    @component('//span[@id="BNKDlyMt940-options-0"]')
    public DlyMt940ActionButton: Button;
    @component('//span[@id="BNKColRtn-options-0"]')
    public ColRtnActionButton: Button;
    @component('//span[@id="BNKColAcct-options-0"]')
    public ColAcctActionButton: Button;
    @component('//span[@id="BNKColThru-options-0"]')
    public ColThruActionButton: Button;
    @component('//span[@id="BNKLoanDet-options-0"]')
    public LoanDetActionButton: Button;
    @component('//span[@id="BNKLoanSum-options-0"]')
    public LoanSumActionButton: Button;
    @component('//span[@id="BNKCheDep-options-0"]')
    public CheDepActionButton: Button;
    @component('//span[@id="BNKFdDet-options-0"]')
    public FdDetActionButton: Button;
    @component('//span[@id="BNKFdSum-options-0"]')
    public FdSumActionButton: Button;
    @component('//span[@id="BNKInOutAd-options-0"]')
    public InOutAdActionButton: Button;
    @component('//span[@id="BNKInOutSum-options-0"]')
    public InOutSumActionButton: Button;
    @component('//span[@id="BNKAcctDet-options-0"]')
    public AcctDetActionButton: Button;
    @component('//span[@id="BNKAcctSum-options-0"]')
    public AcctSumActionButton: Button;
    @component('//span[@id="bulkCollection-options-0"]')
    public bulkColActionButton: Button;
    @component('//span[@id="bulkPayment-options-0"]')
    public bulkPaymentActionButton: Button;
    @component('//span[@id="chequesDetailed-options-0"]')
    public chequeDraftDetailActionButton: Button;
    @component('//span[@id="FASTCollection-options-0"]')
    public fastColActionButton: Button;
    @component('//span[@id="FASTPayment-options-0"]')
    public fastPaymentActionButton: Button;
    @component('//span[@id="GroupDetail-options-0"]')
    public groupDetActionButton: Button;
    @component('//span[@id="GroupSummary-options-0"]')
    public groupSumActionButton: Button;
    @component('//span[@id="LastModifier-options-0"]')
    public txnStatusActionButton: Button;
    @component('//span[@id="PaymentAdvice-options-0"]')
    public payAdvActionButton: Button;
    @component('//span[@id="payRoll-options-0"]')
    public payrollActionButton: Button;
    @component('//span[@id="payRollSummary-options-0"]')
    public payrollSumActionButton: Button;
    @component('//span[@id="stopCheque-options-0"]')
    public stopCheActionButton: Button;
    @component('//span[@id="Summary-options-0"]')
    public payCurActionButton: Button;
    @component('//span[@id="TaxAdvice-options-0"]')
    public taxAdvActionButton: Button;
    @component('//span[@id="TaxDetail-options-0"]')
    public taxDetActionButton: Button;
    @component('//span[@id="TaxSummary-options-0"]')
    public taxSumActionButton: Button;
    @component('//span[@id="transferDetail-options-0"]')
    public transferDetActionButton: Button;
    @component('//span[@id="transferSummary-options-0"]')
    public transferSumActionButton: Button;
    @component('//span[@id="TransferSumDetail-options-0"]')
    public tranSumDetActionButton: Button;
    @component('//span[@id="ATM-options-0"]') public atmActionButton: Button;
    @component('//span[@id="ALTMINSORP-options-0"]') public ALTMINSORPActionButton: Button;
    @component('//span[@id="BNKExpAccSum-options-0"]') public expAccSumActionButton: Button;
    @component('//span[@id="BNKExpAccDet-options-0"]') public expAccDetActionButton: Button;
    @component('//span[@id="CustomsTaxSummary-options-0"]') public CustomsActionButton: Button;
    @component('//span[@id="EDPayment-options-0"]') public EDPActionButton: Button;

    //  new UI action edit button
    @component('//*@id="BNKPoboRobo-edit-0"]')
    public PoboRoboActionEditButton: Button;
    @component('//*[@id="BNKDlyMt940-edit-0"]')
    public DlyMt940ActionEditButton: Button;
    @component('//*[@id="BNKColRtn-edit-0"]')
    public ColRtnActionEditButton: Button;
    @component('//*[@id="BNKColAcct-edit-0"]')
    public ColAcctActionEditButton: Button;
    @component('//*[@id="BNKColThru-edit-0"]')
    public ColThruActionEditButton: Button;
    @component('//*[@id="BNKLoanDet-edit-0"]')
    public LoanDetActionEditButton: Button;
    @component('//*[@id="BNKLoanSum-edit-0"]')
    public LoanSumActionEditButton: Button;
    @component('//*[@id="BNKCheDep-edit-0"]')
    public CheDepActionEditButton: Button;
    @component('//*[@id="BNKFdDet-edit-0"]')
    public FdDetActionEditButton: Button;
    @component('//*[@id="BNKFdSum-edit-0"]')
    public FdSumActionEditButton: Button;
    @component('//*[@id="BNKInOutAd-edit-0"]')
    public InOutAdActionEditButton: Button;
    @component('//*[@id="BNKInOutSum-edit-0"]')
    public InOutSumActionEditButton: Button;
    @component('//*[@id="BNKAcctDet-edit-0"]')
    public AcctDetActionEditButton: Button;
    @component('//*[@id="BNKAcctSum-edit-0"]')
    public AcctSumActionEditButton: Button;
    @component('//*[@id="bulkPayment-edit-0"]')
    public bulkPaymentActionEditButton: Button;
    @component('//*[@id="PaymentAdvice-edit-0"]')
    public payAdvActionEditButton: Button;
    @component('//*[@id="payRoll-edit-0"]')
    public payrollActionEditButton: Button;
    @component('//*[@id="ATM-edit-0"]') public atmEditButton: Button;
    @component('//*[@id="ALTMINSORP-edit-0"]') public ALTMINSORPEditButton: Button;
    @component('//*[@id="BNKExpAccSum-edit-0"]') public expAccSumEditButton: Button;
    @component('//*[@id="BNKExpAccDet-edit-0"]') public expAccDetEditButton: Button;
    @component('//*[@id="GroupDetail-edit-0"]') public groupDetEditButton: Button;
    @component('//*[@id="CustomsTaxSummary-edit-0"]') public customsEditButton: Button;

    //  generate button
    @component('//*[@id="bulkPayment-generate-0"]')
    public bulkPaymentActionGenerateButton: Button;
    @component('//*[@id="chequesDetailed-generate-0"]')
    public chequeDraftDetailActionGenerateButton: Button;
    @component('//*[@id="FASTCollection-generate-0"]')
    public fastColActionGenerateButton: Button;
    @component('//*[@id="FASTPayment-generate-0"]')
    public fastPaymentActionGenerateButton: Button;
    @component('//*[@id="GroupDetail-generate-0"]')
    public groupDetActionGenerateButton: Button;
    @component('//*[@id="GroupSummary-generate-0"]')
    public groupSumActionGenerateButton: Button;
    @component('//*[@id="LastModifier-generate-0"]')
    public txnStatusActionGenerateButton: Button;
    @component('//*[@id="PaymentAdvice-generate-0"]')
    public payAdvActionGenerateButton: Button;
    @component('//*[@id="payRoll-generate-0"]')
    public payrollActionGenerateButton: Button;
    @component('//*[@id="payRollSummary-generate-0"]')
    public payrollSumActionGenerateButton: Button;
    @component('//*[@id="stopCheque-edit-0"]')
    public stopCheActionEditButton: Button;
    @component('//*[@id="stopCheque-generate-0"]')
    public stopCheActionGenerateButton: Button;
    @component('//*[@id="Summary-generate-0"]')
    public payCurActionGenerateButton: Button;
    @component('//*[@id="TaxAdvice-generate-0"]')
    public taxAdvActionGenerateButton: Button;
    @component('//*[@id="TaxDetail-generate-0"]')
    public taxDetActionGenerateButton: Button;
    @component('//*[@id="TaxSummary-generate-0"]')
    public taxSumActionGenerateButton: Button;
    @component('//*[@id="transferDetail-generate-0"]')
    public transferDetActionGenerateButton: Button;
    @component('//*[@id="transferSummary-generate-0"]')
    public transferSumActionGenerateButton: Button;
    @component('//*[@id="TransferSumDetail-generate-0"]')
    public tranSumDetActionGenerateButton: Button;
    @component('//*[@id="CustomsTaxSummary-generate-0"]')
    public customsGenerateButton: Button;

    //  new UI action delete button
    @component('//*[@id="BNKPoboRobo-delete-0"]')
    public PoboRoboActionDeleteButton: Button;
    @component('//*[@id="BNKDlyMt940-delete-0"]')
    public DlyMt940ActionDeleteButton: Button;
    @component('//*[@id="BNKColRtn-delete-0"]')
    public ColRtnActionDeleteButton: Button;
    @component('//*[@id="BNKColAcct-delete-0"]')
    public ColAcctActionDeleteButton: Button;
    @component('//*[@id="BNKColThru-delete-0"]')
    public ColThruActionDeleteButton: Button;
    @component('//*[@id="BNKLoanDet-delete-0"]')
    public LoanDetActionDeleteButton: Button;
    @component('//*[@id="BNKLoanSum-delete-0"]')
    public LoanSumActionDeleteButton: Button;
    @component('//*[@id="BNKCheDep-delete-0"]')
    public CheDepActionDeleteButton: Button;
    @component('//*[@id="BNKFdDet-delete-0"]')
    public FdDetActionDeleteButton: Button;
    @component('//*[@id="BNKFdSum-delete-0"]')
    public FdSumActionDeleteButton: Button;
    @component('//*[@id="BNKInOutAd-delete-0"]')
    public InOutAdActionDeleteButton: Button;
    @component('//*[@id="BNKInOutSum-delete-0"]')
    public InOutSumActionDeleteButton: Button;
    @component('//*[@id="BNKAcctDet-delete-0"]')
    public AcctDetActionDeleteButton: Button;
    @component('//*[@id="BNKAcctSum-delete-0"]')
    public AcctSumActionDeleteButton: Button;
    @component('//*[@id="bulkCollection-delete-0"]')
    public bulkColActionDeleteButton: Button;
    @component('//*[@id="bulkPayment-delete-0"]')
    public bulkPaymentActionDeleteButton: Button;
    @component('//*[@id="chequesDetailed-delete-0"]')
    public chequeDraftDetailActionDeleteButton: Button;
    @component('//*[@id="FASTCollection-delete-0"]')
    public fastColActionDeleteButton: Button;
    @component('//*[@id="FASTPayment-delete-0"]')
    public fastPaymentActionDeleteButton: Button;
    @component('//*[@id="GroupDetail-delete-0"]')
    public groupDetActionDeleteButton: Button;
    @component('//*[@id="GroupSummary-delete-0"]')
    public groupSumActionDeleteButton: Button;
    @component('//*[@id="LastModifier-delete-0"]')
    public txnStatusActionDeleteButton: Button;
    @component('//*[@id="PaymentAdvice-delete-0"]')
    public payAdvActionDeleteButton: Button;
    @component('//*[@id="payRoll-delete-0"]')
    public payrollActionDeleteButton: Button;
    @component('//*[@id="payRollSummary-delete-0"]')
    public payrollSumActionDeleteButton: Button;
    @component('//*[@id="stopCheque-delete-0"]')
    public stopCheActionDeleteButton: Button;
    @component('//*[@id="Summary-delete-0"]')
    public payCurActionDeleteButton: Button;
    @component('//*[@id="TaxAdvice-delete-0"]')
    public taxAdvActionDeleteButton: Button;
    @component('//*[@id="TaxDetail-delete-0"]')
    public taxDetActionDeleteButton: Button;
    @component('//*[@id="TaxSummary-delete-0"]')
    public taxSumActionDeleteButton: Button;
    @component('//*[@id="transferDetail-delete-0"]')
    public transferDetActionDeleteButton: Button;
    @component('//*[@id="transferSummary-delete-0"]')
    public transferSumActionDeleteButton: Button;
    @component('//*[@id="TransferSumDetail-delete-0"]')
    public tranSumDetActionDeleteButton: Button;
    @component('//*[@id="TransferSumDetail-detele"]')
    public tranSumDetActionMultiDeleteButton: Button;
    @component('//*[@id="ATM-delete-0"]') public atmActionDeteleButton: Button;
    @component('//*[@id="ALTMINSORP-delete-0"]') public ALTMINSORPActionDeteleButton: Button;
    @component('//*[@id="CustomsTaxSummary-delete-0"]') public customsActionDeleteButton: Button;
    
    @component('//*[@id="BNKExpAccSum-delete-0"]') public expAccSumActionDeteleButton: Button;
    @component('//*[@id="BNKExpAccDet-delete-0"]') public expAccDetActionDeteleButton: Button;
    @component('//*[@id="EDPayment-delete-0"]') public EDPReportActionDeleteButton: Button;

    //  new UI action publish button
    @component('//*[@id="BNKPoboRobo-publish-0"]')
    public PoboRoboActionPublishButton: Button;
    @component('//*[@id="BNKDlyMt940-publish-0"]')
    public DlyMt940ActionPublishButton: Button;
    @component('//*[@id="BNKColRtn-publish-0"]')
    public ColRtnActionPublishButton: Button;
    @component('//*[@id="BNKColAcct-publish-0"]')
    public ColAcctActionPublishButton: Button;
    @component('//*[@id="BNKColThru-publish-0"]')
    public ColThruActionPublishButton: Button;
    @component('//*[@id="BNKLoanDet-publish-0"]')
    public LoanDetActionPublishButton: Button;
    @component('//*[@id="BNKLoanSum-publish-0"]')
    public LoanSumActionPublishButton: Button;
    @component('//*[@id="BNKCheDep-publish-0"]')
    public CheDepActionPublishButton: Button;
    @component('//button[@id="BNKFdDet-publish-0"]')
    public FdDetActionPublishButton: Button;
    @component('//*[@id="BNKFdSum-publish-0"]')
    public FdSumActionPublishButton: Button;
    @component('//*[@id="BNKInOutAd-publish-0"]')
    public InOutAdActionPublishButton: Button;
    @component('//*[@id="BNKInOutSum-publish-0"]')
    public InOutSumActionPublishButton: Button;
    @component('//*[@id="BNKInOutSum-generate-0"]')
    public InOutSumActionGenerateButton: Button;
    @component('//*[@id="BNKAcctDet-publish-0"]')
    public AcctDetActionPublishButton: Button;
    @component('//*[@id="BNKAcctSum-publish-0"]')
    public AcctSumActionPublishButton: Button;

    //  new UI view account button
    @component('//p[@id="BNKPoboRobo-view-account-0"]/span')
    public PoboRoboViewDetailsButton: Button;
    @component('//p[@id="BNKDlyMt940-view-account-0"]')
    public DlyMt940ViewDetailsButton: Button;
    @component('//p[@id="BNKColRtn-view-account-0"]')
    public ColRtnViewDetailsButton: Button;
    @component('//p[@id="BNKColAcct-view-account-0"]')
    public ColAcctViewDetailsButton: Button;
    @component('//p[@id="BNKColThru-view-account-0"]')
    public ColThruViewDetailsButton: Button;
    @component('//p[@id="BNKLoanDet-view-account-0"]')
    public LoanDetViewDetailsButton: Button;
    @component('//p[@id="BNKLoanSum-view-account-0"]')
    public LoanSumViewDetailsButton: Button;
    @component('//p[@id="BNKCheDep-view-account-0"]')
    public CheDepViewDetailsButton: Button;
    @component('//p[@id="BNKFdDet-view-account-0"]')
    public FdDetViewDetailsButton: Button;
    @component('//p[@id="BNKFdSum-view-account-0"]')
    public FdSumViewDetailsButton: Button;
    @component('//p[@id="BNKInOutAd-view-account-0"]')
    public InOutAdViewDetailsButton: Button;
    @component('//p[@id="BNKInOutSum-view-account-0"]')
    public InOutSumViewDetailsButton: Button;
    @component('//p[@id="BNKAcctDet-view-account-0"]')
    public AcctDetViewDetailsButton: Button;
    @component('//p[@id="BNKAcctSum-view-account-0"]')
    public AcctSumViewDetailsButton: Button;
    @component('//p[@id="bulkCollection-view-account-0"]')
    public bulkColViewDetailsButton: Button;
    @component('//p[@id="bulkPayment-view-account-0"]')
    public bulkPaymentViewDetailsButton: Button;
    @component('//p[@id="chequesDetailed-view-account-0"]')
    public chequeDraftDetailViewDetailsButton: Button;
    @component('//p[@id="FASTCollection-view-account-0"]')
    public fastColViewDetailsButton: Button;
    @component('//p[@id="FASTPayment-view-account-0"]')
    public fastPaymentViewDetailsButton: Button;
    @component('//p[@id="GroupDetail-view-account-0"]')
    public groupDetViewDetailsButton: Button;
    @component('//p[@id="GroupSummary-view-account-0"]')
    public groupSumViewDetailsButton: Button;
    @component('//p[@id="LastModifier-view-account-0"]')
    public txnStatusViewDetailsButton: Button;
    @component('//p[@id="PaymentAdvice-view-account-0"]')
    public payAdvViewDetailsButton: Button;
    @component('//p[@id="payRoll-view-account-0"]')
    public payrollViewDetailsButton: Button;
    @component('//p[@id="payRollSummary-view-account-0"]')
    public payrollSumViewDetailsButton: Button;
    @component('//p[@id="stopCheque-view-account-0"]')
    public stopCheViewDetailsButton: Button;
    @component('//p[@id="Summary-view-account-0"]')
    public payCurViewDetailsButton: Button;
    @component('//p[@id="TaxAdvice-view-account-0"]')
    public taxAdvViewDetailsButton: Button;
    @component('//p[@id="CustomsTaxSummary-view-account-0"]')
    public customsViewDetailsButton: Button;
    @component('//p[@id="TaxDetail-view-account-0"]')
    public taxDetViewDetailsButton: Button;
    @component('//p[@id="TaxSummary-view-account-0"]')
    public taxSumViewDetailsButton: Button;
    @component('//p[@id="transferDetail-view-account-0"]')
    public transferDetViewDetailsButton: Button;
    @component('//p[@id="transferSummary-view-account-0"]')
    public transferSumViewDetailsButton: Button;
    @component('//p[@id="TransferSumDetail-view-account-0"]')
    public tranSumDetViewDetailsButton: Button;

    //new UI details
    @component('//*[@id="BNKInOutAd-publish-button"]')
    public standardInOutAdPublishBtn: Button;
    @component('//*[@id="BNKInOutAd-generate-button"]')
    public standardInOutAdGenerateBtn: Button;
    @component('//*[@id="bulkCollection-generate-button"]')
    public bulkColGenerateBtn: Button;
    @component('//*[@id="chequesSummary-generate-button"]')
    public chequesSummaryGenerateBtn: Button;
    @component('//input[@id="reports-filter"]') public filterInput: TextInput;
    @component('//label[@id="BNKPoboRobo-reportName-0"]')
    public PoboRoboReportName: TextInput;
    @component('//li[@id="BNKPoboRobo-account-0"]')
    public PoboRoboAccount: TextInput;
    @component('//*[@id="BNKPoboRobo-schedule-0"]')
    public PoboRoboReportSchedule: TextInput;
    @component('//*[@id="BNKPoboRobo-paymentDateRange-relative"]')
    public PoboRoboPaymentDateRange: TextInput;
    @component('//*[@id="EDPayment-reportName-0"]')
    public EDPReportDetailName: TextInput;
    @component('//*[@id="EDPayment-account-0"]')
    public EDPReportDetailAccount: TextInput;
    @component('//*[@id="EDPayment-remarks-0"]')
    public EDPReportDetailRemark: TextInput;
    


    // account details
    @component('//*[@id="BNKAcctDet-reportName-0"]')
    public AcctDetReportName: TextInput;
    @component('//*[@id="BNKAcctDet-account-0"]')
    public AcctDetAccount: TextInput;
    @component('//*[@id="BNKAcctDet-schedule-0"]')
    public AcctDetReportSchedule: TextInput;
    @component('//*[@id="BNKAcctDet-paymentDateRange-relative"]')
    public AcctDetPaymentDateRange: TextInput;

    // account summary
    @component('//*[@id="BNKAcctSum-reportName-0"]')
    public AcctSumReportName: TextInput;
    @component('//*[@id="BNKAcctSum-account-0"]')
    public AcctSumAccount: TextInput;
    @component('//*[@id="BNKAcctSum-schedule-0"]')
    public AcctSumReportSchedule: TextInput;
    @component('//*[@id="BNKAcctSum-paymentDateRange-relative"]')
    public AcctSumPaymentDateRange: TextInput;
    @component('//*[@id="BNKAcctSum-emails-0"]')
    public AcctSumSendTo: TextInput;

    // loan detail
    @component('//*[@id="BNKLoanDet-emails-0"]')
    public LoanDetSendTo: TextInput;
    @component('//*[@id="BNKLoanDet-reportName-0"]')
    public LoanDetReportName: TextInput;
    @component('//*[@id="BNKLoanDet-schedule-0"]')
    public LoanDetSchedule: TextInput;
    @component('//*[@id="BNKLoanDet-account-0"]')
    public LoanDetAccount: TextInput;
    @component('//*[@id="BNKLoanDet-paymentDateRange-absolute"]')
    public LoanDetPaymentDateRange: TextInput;
    @component('//*[@id="BNKLoanDet-paymentDateRange-last"]')
    public LoanDetPaymentDateRangeLast: TextInput;

    // loan summary
    @component('//*[@id="BNKLoanSum-emails-0"]')
    public LoanSumSendTo: TextInput;
    @component('//*[@id="BNKLoanSum-reportName-0"]')
    public LoanSumReportName: TextInput;
    @component('//*[@id="BNKLoanSum-schedule-0"]')
    public LoanSumSchedule: TextInput;
    @component('//*[@class="account-list"]')
    public LoanSumAccount: TextInput;
    @component('//*[@id="BNKLoanSum-paymentDateRange-absolute"]')
    public LoanSumPaymentDateRange: TextInput;
    @component('//*[@id="BNKLoanSum-paymentDateRange-last"]')
    public LoanSumPaymentDateRangeLast: TextInput;

    // cheque dep
    @component('//*[@id="BNKCheDep-emails-0"]') public CheDepSendTo: TextInput;
    @component('//*[@id="BNKCheDep-reportName-0"]')public CheDepReportName: TextInput;
    @component('//*[@id="BNKCheDep-date-0"]') public createDate: TextInput;
    @component('//*[@id="BNKCheDep-schedule-0"]')public CheDepSchedule: TextInput;
    @component('//*[@id="BNKCheDep-account-0"]') public CheDepAccount: TextInput;
    @component('//*[@id="BNKCheDep-paymentDateRange-absolute"]')public CheDepPaymentDateRange: TextInput;
    @component('//*[@id="BNKCheDep-AmountRange"]')public CheDepAmountRange: TextInput;
    @component('//*[@id="BNKCheDep-emails-0"]') public sendToValue: TextInput;

    // fd sum
    @component('//*[@id="BNKFdSum-reportName-0"]')
    public FdSumReportName: TextInput;
    @component('//*[@id="BNKFdSum-schedule-0"]')
    public FdSumSchedule: TextInput;
    @component('//*[@id="BNKFdSum-account-0"]') public FdSumAccount: TextInput;
    @component('//*[@id="BNKFdSum-paymentDateRange"]/p')
    public FdSumPaymentDateRange: TextInput;

    // fd det
    @component('//*[@id="BNKFdDet-reportName-0"]')
    public FdDetReportName: TextInput;
    @component('//*[@id="BNKFdDet-schedule-0"]')
    public FdDetSchedule: TextInput;
    @component('//*[@id="BNKFdDet-account-0"]') public FdDetAccount: TextInput;
    @component('//*[@id="BNKFdDet-paymentDateRange"]/p')
    public FdDetPaymentDateRange: TextInput;

    //Bulk Collection
    @component('//*[@id="bulkCollection-reportName-0"]')
    public bulkColViewReportName: TextInput;
    @component('//*[@id="bulkCollection-account-0"]')
    public bulkColViewAcct: TextInput;
    @component('//*[@id="bulkCollection-paymentDateRangeRb"]/p')
    public bulkColViewDateRange: TextInput;
    @component('//*[@id="__bookmark_1"]')
    public birtElement: TextInput;
    @component(
        '//img[contains(@class, "style_") and contains(@src,"/I3BirtReports/preview")]'
    )
    public DBSLogo: TextInput;

    //Bulk Payment
    @component('//*[@id="bulkPayment-reportName-0"]')
    public bulkPaymentViewReportName: TextInput;
    @component('//*[@id="bulkPayment-account-0"]')
    public bulkPaymentViewAcct: TextInput;
    @component('//*[@id="bulkPayment-paymentDateRangeRb"]/p')
    public bulkPaymentViewDateRange: TextInput;
    @component('//*[@id="bulkPayment-emails-0"]')
    public bulkPaymentSendToValue: TextInput;

    //Cheque Draft Detail
    @component('//*[@id="chequesDetailed-reportName-0"]')
    public chequeDraftDetailViewReportName: TextInput;
    @component('//*[@id="chequesDetailed-account-0"]')
    public chequeDraftDetailViewAcct: TextInput;
    @component('//*[@id="chequesDetailed-emails-0"]')
    public chequeDraftDetailSendToValue: TextInput;

    //FAST Collection
    @component('//*[@id="FASTCollection-reportName-0"]')
    public fastColViewReportName: TextInput;
    @component('//*[@id="FASTCollection-account-0"]')
    public fastColViewAcct: TextInput;
    @component('//*[@id="FASTCollection-paymentDateRangeRb"]/p')
    public fastColViewDateRange: TextInput;

    //FAST Payment
    @component('//*[@id="FASTPayment-reportName-0"]')
    public fastPaymentViewReportName: TextInput;
    @component('//*[@id="FASTPayment-account-0"]')
    public fastPaymentViewAcct: TextInput;
    @component('//*[@id="FASTPayment-emails-0"]')
    public fastPaymentSendToValue: TextInput;

    //Group Detail
    @component('//*[@id="GroupDetail-reportName-0"]')
    public groupDetViewReportName: TextInput;
    @component('//*[@id="GroupDetail-account-0"]')
    public groupDetViewAcct: TextInput;
    @component('//*[@id="GroupDetail-paymentDateRangeRb"]/p')
    public groupDetViewDateRange: TextInput;
    @component('//span[@id="GroupDetail-emails-0"]')
    public groupDetSendToValue: TextInput;


    //Group Summary
    @component('//*[@id="GroupSummary-reportName-0"]')
    public groupSumViewReportName: TextInput;
    @component('//*[@id="GroupSummary-account-0"]')
    public groupSumViewAcct: TextInput;
    @component('//*[@id="GroupSummary-emails-0"]')
    public groupSumSendToValue: TextInput;

    //Transaction Status
    @component('//*[@id="LastModifier-reportName-0"]')
    public txnStatusViewReportName: TextInput;
    @component('//*[@id="LastModifier-account-0"]')
    public txnStatusViewAcct: TextInput;
    @component('//*[@id="LastModifier-emails-0"]')
    public txnStatusSendToValue: TextInput;

    //Payment Advice
    @component('//*[@id="PaymentAdvice-reportName-0"]')
    public payAdvViewReportName: TextInput;
    @component('//*[@id="PaymentAdvice-account-0"]')
    public payAdvViewAcct: TextInput;
    @component('//*[@id="PaymentAdvice-paymentDateRangeRb"]/p')
    public payAdvViewDateRange: TextInput;
    @component('//span[@id="PaymentAdvice-emails-0"]')
    public payAdvSendToValue: TextInput;

    //Payroll
    @component('//label[@id="payRoll-reportName-0"]')
    public payrollViewReportName: TextInput;
    @component('//li[@id="payRoll-account-0"]')
    public payrollViewAcct: TextInput;
    @component('//*[@id="payRoll-paymentDateRangeRb"]/p')
    public payrollViewDateRange: TextInput;
    @component('//*[@id="payRoll-emails-0"]')
    public payrollSendToValue: TextInput;

    //Payroll Summary
    @component('//*[@id="payRollSummary-reportName-0"]')
    public payrollSumViewReportName: TextInput;
    @component('//*[@id="payRollSummary-account-0"]')
    public payrollSumViewAcct: TextInput;
    @component('//*[@id="payRollSummary-paymentDateRangeRb"]/p')
    public payrollSumViewDateRange: TextInput;

    //Stop Cheque
    @component('//*[@id="stopCheque-reportName-0"]')
    public stopCheViewReportName: TextInput;
    @component('//*[@id="stopCheque-account-0"]')
    public stopCheViewAcct: TextInput;
    @component('//*[@id="stopCheque-paymentDateRangeRb"]/p')
    public stopCheViewDateRange: TextInput;
    @component('//*[@id="stopCheque-emails-0"]')
    public stopCheSendToValue: TextInput;

    //Stop Cheque
    @component('//*[@id="Summary-reportName-0"]')
    public payCurViewReportName: TextInput;
    @component('//*[@id="Summary-account-0"]')
    public payCurViewAcct: TextInput;
    @component('//*[@id="Summary-paymentDateRangeRb"]/p')
    public payCurViewDateRange: TextInput;

    //Tax Advice
    @component('//*[@id="TaxAdvice-reportName-0"]')
    public taxAdvViewReportName: TextInput;
    @component('//*[@id="TaxAdvice-account-0"]')
    public taxAdvViewAcct: TextInput;
    @component('//*[@id="TaxAdvice-paymentDateRangeRb"]/p')
    public taxAdvViewDateRange: TextInput;

    //Tax Detail
    @component('//*[@id="TaxDetail-reportName-0"]')
    public taxDetViewReportName: TextInput;
    @component('//*[@id="TaxDetail-account-0"]')
    public taxDetViewAcct: TextInput;
    @component('//*[@id="TaxDetail-paymentDateRangeRb"]/p')
    public taxDetViewDateRange: TextInput;

    //Tax Summary
    @component('//*[@id="TaxSummary-reportName-0"]')
    public taxSumViewReportName: TextInput;
    @component('//*[@id="TaxSummary-account-0"]')
    public taxSumViewAcct: TextInput;
    @component('//*[@id="TaxSummary-paymentDateRangeRb"]/p')
    public taxSumViewDateRange: TextInput;

     //Customs Payment
     @component('//*[@id="CustomsTaxSummary-reportName-0"]') public customsViewReportName: TextInput;
     @component('//*[@id="CustomsTaxSummary-account-0"]') public customsViewAcct: TextInput;
     @component('//*[@id="CustomsTaxSummary-paymentDateRangeRb"]/p') public customsViewDateRange: TextInput;

    //Transfer Detail
    @component('//*[@id="transferDetail-reportName-0"]')
    public transferDetViewReportName: TextInput;
    @component('//*[@id="transferDetail-account-0"]')
    public transferDetViewAcct: TextInput;
    @component('//*[@id="transferDetail-emails-0"]')
    public transferDetSendToValue: TextInput;
    @component('//*[@id="transferDetail-paymentDateRangeRb"]/p')
    public transferDetViewDateRange: TextInput;

    //Transfer Summary
    @component('//*[@id="transferSummary-reportName-0"]')
    public transferSumViewReportName: TextInput;
    @component('//*[@id="transferSummary-account-0"]')
    public transferSumViewAcct: TextInput;
    @component('//*[@id="transferSummary-paymentDateRangeRb"]/p')
    public transferSumViewDateRange: TextInput;

    //Transfer Summary Detail
    @component('//*[@id="TransferSumDetail-reportName-0"]')
    public tranSumDetViewReportName: TextInput;
    @component('//*[@id="TransferSumDetail-account-0"]')
    public tranSumDetViewAcct: TextInput;
    @component('//*[@id="TransferSumDetail-paymentDateRangeRb"]/p')
    public tranSumDetViewDateRange: TextInput;

    //Custom Report>ATM Report
    @component('//*[@id="ATM-reportName-0"]') public atmReportViewDetailsBtn: Button;
    @component('//*[@id="ATM-reportName-0"]') public atmReportNameValue: TextInput;
    @component('//*[@id="ALTMINSORP-reportName-0"]') public ALTMINSORPReportNameValue: TextInput;
    @component('//*[@id="ATM-emails-0"]') public atmEmailsValue: TextInput;
    @component('//*[@id="ALTMINSORP-emails-0"]') public ALTMINSORPEmailsValue: TextInput;
    @component('//*[@id="ALTMINSORP-remarks-0"]') public ALTMINSORPRemarkValue: TextInput;
    @component('//*[@id="ATM-deliverySchedule"]') public atmDeliverScheduleValue: TextInput;
    @component('//*[@id="ATM-deliveryTime"]') public atmDeliverTimeValue: TextInput;
    @component('//*[@id="ALTMINSORP-deliveryTime"]') public ALTMINSORPDeliverTimeValue: TextInput;

    @component('//*[@id="ALTMINSORP-reportName-0"]') public atminsorpReportViewDetailsBtn: Button;

    //CVR report
    @component('//*[@id="CVR-reportName-0"]') public cvrReportViewDetailsBtn: Button;
    //Daily Cash Concentration Report for Ultimate Master Account
    @component('//*[@id="LMNGDCUM-reportName-0"]') public lmngdcumReportViewDetailsBtn: Button;

    //File Detail
    @component('//*[@id="fileDetail-personalised"]')
    public fileDetailPersonButton: Button;

    //File Summary
    @component('//*[@id="fileSummary-standard"]')
    public fileDetailStandardButton: Button;

    //Transaction Detail
    @component('//*[@id="transactionDetail-personalised"]')
    public transactionDetailPersonButton: Button;

    //Transaction Summary
    @component('//*[@id="transactionSummary-personalised"]')
    public transactionSumPersonButton: Button;
    @component('//*[@id="transactionSummary-standard"]')
    public transactionSumStandardButton: Button;

    // Data Export
    @component('//*[@id="BNKExpAccSum-view-account-0"]/span') public expAccSumDetails0: Button;
    @component('//*[@id="BNKExpAccSum-reportName-0"]') public expAccSumDetailsValue: TextInput;
    @component('//*[@id="BNKExpAccSum-deliveryFormat"]') public expAccSumDeliveryFormatValue: TextInput;
    @component('//*[@id="BNKExpAccSum-schedule-0"]') public expAccSumScheduleValue: TextInput;

    @component('//*[@id="BNKExpAccDet-reportName-0"]') public expAccDetDetails0: Button;
    @component('//*[@id="BNKExpAccDet-reportName-0"]') public expAccDetDetailsValue: TextInput;
    @component('//*[@id="BNKExpAccDet-deliveryFormat"]') public expAccDetDeliveryFormatValue: TextInput;
    @component('//*[@id="BNKExpAccDet-schedule-0"]') public expAccDetScheduleValue: TextInput;

    //EDP report
    @component('//*[@name="reportName"]') public EDPReportName: TextInput;
    @component('//*[@id="EDP"]') public EDPPaymentType: TextInput;
    @component('//*[@id="362"]') public issuedStatus: TextInput;
    @component('//*[@name="customerReference"]') public customerReference: TextInput;
    @component('//*[@name="remarks"]') public remarks: TextInput;
    
    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.showReportDetailsBtn.element), this.showReportDetailsBtn.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showReportDetailsBtn.element), this.showReportDetailsBtn.getTimeOut());
    }

    public async loadCondition4NewFileUpload() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fileDetailCreateButton.element), this.fileDetailCreateButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fileDetailCreateButton.element), this.fileDetailCreateButton.getTimeOut());
    }

    public async loadConditionCommon() {
        await waitForUXLoading();
    }

    public async loadConditionForPublishTab() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.visibilityOf(this.publishDeleteButton.element),
            this.publishDeleteButton.getTimeOut()
        );
    }

    public async loadDialog() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.dismiss.element),
            this.dismiss.getTimeOut()
        );
    }

    public async loadDeleteDialog() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.dialogDeleteBtn.element),
            this.dialogDeleteBtn.getTimeOut()
        );
    }
    public async loadConditionForDismiss() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.dismiss.element),
            this.dismiss.getTimeOut()
        );
    }
}

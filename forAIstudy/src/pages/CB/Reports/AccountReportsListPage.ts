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
  @component('//label[@id="report-expand-type-0"]')
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
  @component('//button[@id="fileDetail-create"]')
  public fileDetailCreateButton: Button;
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

  //  new UI delete button
  @component('//button[@id="BNKPoboRobo-detele"]')
  public PoboRoboDeteleButton: Button;
  @component('//button[@id="BNKDlyMt940-detele"]')
  public DlyMt940DeteleButton: Button;
  @component('//button[@id="BNKColRtn-detele"]')
  public ColRtnDeteleButton: Button;
  @component('//button[@id="BNKColAcct-detele"]')
  public ColAcctDeteleButton: Button;
  @component('//button[@id="BNKColThru-detele"]')
  public ColThruDeteleButton: Button;
  @component('//button[@id="BNKLoanDet-detele"]')
  public LoanDetDeteleButton: Button;
  @component('//button[@id="BNKLoanSum-detele"]')
  public LoanSumDeteleButton: Button;
  @component('//button[@id="BNKCheDep-detele"]')
  public CheDepDeteleButton: Button;
  @component('//button[@id="BNKFdDet-detele"]')
  public FdDetDeteleButton: Button;
  @component('//button[@id="BNKFdSum-detele"]')
  public FdSumDeteleButton: Button;
  @component('//button[@id="BNKInOutAd-detele"]')
  public InOutAdDeteleButton: Button;
  @component('//button[@id="BNKInOutSum-detele"]')
  public InOutSumDeteleButton: Button;
  @component('//button[@id="BNKAcctDet-detele"]')
  public AcctDetDeteleButton: Button;
  @component('//button[@id="BNKAcctSum-detele"]')
  public AcctSumDeteleButton: Button;
  @component('//button[@id="ATM-detele"]') public atmDeteleButton: Button;

  //List delete
  @component('//*[@id="report-expand-type-9"]/span')
  public BulkColRepShowSaTem: Button;
  @component('//span[@id="bulkCollection-options-1"]')
  public BulkColRepOptions: Button;
  @component('//button[@id="bulkCollection-delete-1"]')
  public BulkColRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-8"]/span')
  public BulkPayRepShowSaTem: Button;
  @component('//span[@id="bulkPayment-options-1"]')
  public BulkPayRepOptions: Button;
  @component('//button[@id="bulkPayment-delete-1"]')
  public BulkPayRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-13"]/span')
  public FastCollDetRepShowSaTem: Button;
  @component('//*[@id="FASTCollection-options-1"]')
  public FastCollDetRepOptions: Button;
  @component('//button[@id="FASTCollection-delete-1"]')
  public FastCollDetRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-15"]/span')
  public CheDraDeRepShowSaTem: Button;
  @component('//span[@id="chequesDetailed-options-1"]')
  public CheDraDeRepOptions: Button;
  @component('//button[@id="chequesDetailed-delete-1"]')
  public CheDraDeRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-12"]/span')
  public FastPayDetRepShowSaTem: Button;
  @component('//span[@id="FASTPayment-options-1"]')
  public FastPayDetRepOptions: Button;
  @component('//button[@id="FASTPayment-delete-1"]')
  public FastPayDetRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-7"]/span')
  public GroDetRepShowSaTem: Button;
  @component('//span[@id="GroupDetail-options-1"]')
  public GroDetRepOptions: Button;
  @component('//button[@id="GroupDetail-delete-1"]')
  public GroDetRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-6"]/span')
  public GroSumRepShowSaTem: Button;
  @component('//span[@id="GroupSummary-options-1"]')
  public GroSumRepOptions: Button;
  @component('//button[@id="GroupSummary-delete-1"]')
  public GroSumRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-4"]/span')
  public TraStaRepShowSaTem: Button;
  @component('//span[@id="LastModifier-options-1"]')
  public TraStaRepOptions: Button;
  @component('//button[@id="LastModifier-delete-1"]')
  public TraStaRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-5"]/span')
  public PayAdvRepShowSaTem: Button;
  @component('//span[@id="PaymentAdvice-options-1"]')
  public PayAdvRepOptions: Button;
  @component('//button[@id="PaymentAdvice-delete-1"]')
  public PayAdvRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-11"]/span')
  public PayrollRepShowSaTem: Button;
  @component('//span[@id="payRoll-options-1"]')
  public PayrollOptions: Button;
  @component('//button[@id="payRoll-delete-1"]')
  public PayrollDeleteButton: Button;
  @component('//*[@id="report-expand-type-10"]/span')
  public PayrollSumRepShowSaTem: Button;
  @component('//span[@id="payRollSummary-options-1"]')
  public PayrollSumOptions: Button;
  @component('//button[@id="payRollSummary-delete-1"]')
  public PayrollSumDeleteButton: Button;
  @component('//*[@id="report-expand-type-16"]/span')
  public StoCheRepShowSaTem: Button;
  @component('//span[@id="stopCheque-options-1"]')
  public StoCheRepOptions: Button;
  @component('//button[@id="stopCheque-delete-1"]')
  public StoCheRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-3"]/span')
  public PaySumByCurrRepShowSaTem: Button;
  @component('//span[@id="Summary-options-1"]')
  public PaySumByCurrRepOptions: Button;
  @component('//button[@id="Summary-delete-1"]')
  public PaySumByCurrRepoDeleteButton: Button;
  @component('//*[@id="report-expand-type-19"]/span')
  public TaxPayAdvRepShowSaTem: Button;
  @component('//span[@id="TaxAdvice-options-1"]')
  public TaxPayAdvRepOptions: Button;
  @component('//button[@id="TaxAdvice-delete-1"]')
  public TaxPayAdvRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-18"]/span')
  public TaxPayDetRepShowSaTem: Button;
  @component('//span[@id="TaxDetail-options-1"]')
  public TaxPayDetRepOptions: Button;
  @component('//button[@id="TaxDetail-delete-1"]')
  public TaxPayDetRepDeleteButton: Button;
  @component('//*[@id="report-expand-type-17"]/span')
  public TaxPaySumRepShowSaTem: Button;
  @component('//span[@id="TaxSummary-options-1"]')
  public TaxPaySumRepOptions: Button;
  @component('//button[@id="TaxSummary-delete-1"]')
  public TaxPaySumRepDeteleButton: Button;
  @component('//*[@id="report-expand-type-2"]/span')
  public TranDetaRepShowSaTem: Button;
  @component('//span[@id="transferDetail-options-1"]')
  public TranDetaRepOptions: Button;
  @component('//button[@id="transferDetail-delete-1"]')
  public TranDetaRepDeteleButton: Button;
  @component('//*[@id="report-expand-type-0"]/span')
  public TranSumRepShowSaTem: Button;
  @component('//span[@id="transferSummary-options-1"]')
  public TranSumRepOptions: Button;
  @component('//button[@id="transferSummary-delete-1"]')
  public TranSumRepDeteleButton: Button;
  @component('//*[@id="report-expand-type-1"]/span')
  public TranSumDetRepShowSaTem: Button;
  @component('//span[@id="TransferSumDetail-options-1"]')
  public TranSumDetRepOptions: Button;
  @component('//button[@id="TransferSumDetail-delete-1"]')
  public TranSumDetRepDeteleButton: Button;



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
  @component('//span[@id="BNKExpAccSum-options-0"]') public expAccSumActionButton: Button;
  @component('//span[@id="BNKExpAccDet-options-0"]') public expAccDetActionButton: Button;

  //  new UI action edit button
  @component('//button[@id="BNKPoboRobo-edit-0"]')
  public PoboRoboActionEditButton: Button;
  @component('//button[@id="BNKDlyMt940-edit-0"]')
  public DlyMt940ActionEditButton: Button;
  @component('//button[@id="BNKColRtn-edit-0"]')
  public ColRtnActionEditButton: Button;
  @component('//button[@id="BNKColAcct-edit-0"]')
  public ColAcctActionEditButton: Button;
  @component('//button[@id="BNKColThru-edit-0"]')
  public ColThruActionEditButton: Button;
  @component('//button[@id="BNKLoanDet-edit-0"]')
  public LoanDetActionEditButton: Button;
  @component('//button[@id="BNKLoanSum-edit-0"]')
  public LoanSumActionEditButton: Button;
  @component('//button[@id="BNKCheDep-edit-0"]')
  public CheDepActionEditButton: Button;
  @component('//button[@id="BNKFdDet-edit-0"]')
  public FdDetActionEditButton: Button;
  @component('//button[@id="BNKFdSum-edit-0"]')
  public FdSumActionEditButton: Button;
  @component('//button[@id="BNKInOutAd-edit-0"]')
  public InOutAdActionEditButton: Button;
  @component('//button[@id="BNKInOutSum-edit-0"]')
  public InOutSumActionEditButton: Button;
  @component('//button[@id="BNKAcctDet-edit-0"]')
  public AcctDetActionEditButton: Button;
  @component('//button[@id="BNKAcctSum-edit-0"]')
  public AcctSumActionEditButton: Button;
  @component('//button[@id="bulkPayment-edit-0"]')
  public bulkPaymentActionEditButton: Button;
  @component('//button[@id="PaymentAdvice-edit-0"]')
  public payAdvActionEditButton: Button;
  @component('//button[@id="payRoll-edit-0"]')
  public payrollActionEditButton: Button;
  @component('//button[@id="ATM-edit-0"]') public atmEditButton: Button;
  @component('//button[@id="BNKExpAccSum-edit-0"]') public expAccSumEditButton: Button;
  @component('//button[@id="BNKExpAccDet-edit-0"]') public expAccDetEditButton: Button;

  //  generate button
  @component('//button[@id="bulkPayment-generate-0"]')
  public bulkPaymentActionGenerateButton: Button;
  @component('//button[@id="chequesDetailed-generate-0"]')
  public chequeDraftDetailActionGenerateButton: Button;
  @component('//button[@id="FASTCollection-generate-0"]')
  public fastColActionGenerateButton: Button;
  @component('//button[@id="FASTPayment-generate-0"]')
  public fastPaymentActionGenerateButton: Button;
  @component('//button[@id="GroupDetail-generate-0"]')
  public groupDetActionGenerateButton: Button;
  @component('//button[@id="GroupSummary-generate-0"]')
  public groupSumActionGenerateButton: Button;
  @component('//button[@id="LastModifier-generate-0"]')
  public txnStatusActionGenerateButton: Button;
  @component('//button[@id="PaymentAdvice-generate-0"]')
  public payAdvActionGenerateButton: Button;
  @component('//button[@id="payRoll-generate-0"]')
  public payrollActionGenerateButton: Button;
  @component('//button[@id="payRollSummary-generate-0"]')
  public payrollSumActionGenerateButton: Button;
  @component('//button[@id="stopCheque-edit-0"]')
  public stopCheActionEditButton: Button;
  @component('//button[@id="stopCheque-generate-0"]')
  public stopCheActionGenerateButton: Button;
  @component('//button[@id="Summary-generate-0"]')
  public payCurActionGenerateButton: Button;
  @component('//button[@id="TaxAdvice-generate-0"]')
  public taxAdvActionGenerateButton: Button;
  @component('//button[@id="TaxDetail-generate-0"]')
  public taxDetActionGenerateButton: Button;
  @component('//button[@id="TaxSummary-generate-0"]')
  public taxSumActionGenerateButton: Button;
  @component('//button[@id="transferDetail-generate-0"]')
  public transferDetActionGenerateButton: Button;
  @component('//button[@id="transferSummary-generate-0"]')
  public transferSumActionGenerateButton: Button;
  @component('//button[@id="TransferSumDetail-generate-0"]')
  public tranSumDetActionGenerateButton: Button;

  //  new UI action delete button
  @component('//button[@id="BNKPoboRobo-delete-0"]')
  public PoboRoboActionDeleteButton: Button;
  @component('//button[@id="BNKDlyMt940-delete-0"]')
  public DlyMt940ActionDeleteButton: Button;
  @component('//button[@id="BNKColRtn-delete-0"]')
  public ColRtnActionDeleteButton: Button;
  @component('//button[@id="BNKColAcct-delete-0"]')
  public ColAcctActionDeleteButton: Button;
  @component('//button[@id="BNKColThru-delete-0"]')
  public ColThruActionDeleteButton: Button;
  @component('//button[@id="BNKLoanDet-delete-0"]')
  public LoanDetActionDeleteButton: Button;
  @component('//button[@id="BNKLoanSum-delete-0"]')
  public LoanSumActionDeleteButton: Button;
  @component('//button[@id="BNKCheDep-delete-0"]')
  public CheDepActionDeleteButton: Button;
  @component('//button[@id="BNKFdDet-delete-0"]')
  public FdDetActionDeleteButton: Button;
  @component('//button[@id="BNKFdSum-delete-0"]')
  public FdSumActionDeleteButton: Button;
  @component('//button[@id="BNKInOutAd-delete-0"]')
  public InOutAdActionDeleteButton: Button;
  @component('//button[@id="BNKInOutSum-delete-0"]')
  public InOutSumActionDeleteButton: Button;
  @component('//button[@id="BNKAcctDet-delete-0"]')
  public AcctDetActionDeleteButton: Button;
  @component('//button[@id="BNKAcctSum-delete-0"]')
  public AcctSumActionDeleteButton: Button;
  @component('//button[@id="bulkCollection-delete-0"]')
  public bulkColActionDeleteButton: Button;
  @component('//button[@id="bulkPayment-delete-0"]')
  public bulkPaymentActionDeleteButton: Button;
  @component('//button[@id="chequesDetailed-delete-0"]')
  public chequeDraftDetailActionDeleteButton: Button;
  @component('//button[@id="FASTCollection-delete-0"]')
  public fastColActionDeleteButton: Button;
  @component('//button[@id="FASTPayment-delete-0"]')
  public fastPaymentActionDeleteButton: Button;
  @component('//button[@id="GroupDetail-delete-0"]')
  public groupDetActionDeleteButton: Button;
  @component('//button[@id="GroupSummary-delete-0"]')
  public groupSumActionDeleteButton: Button;
  @component('//button[@id="LastModifier-delete-0"]')
  public txnStatusActionDeleteButton: Button;
  @component('//button[@id="PaymentAdvice-delete-0"]')
  public payAdvActionDeleteButton: Button;
  @component('//button[@id="payRoll-delete-0"]')
  public payrollActionDeleteButton: Button;
  @component('//button[@id="payRollSummary-delete-0"]')
  public payrollSumActionDeleteButton: Button;
  @component('//button[@id="stopCheque-delete-0"]')
  public stopCheActionDeleteButton: Button;
  @component('//button[@id="Summary-delete-0"]')
  public payCurActionDeleteButton: Button;
  @component('//button[@id="TaxAdvice-delete-0"]')
  public taxAdvActionDeleteButton: Button;
  @component('//button[@id="TaxDetail-delete-0"]')
  public taxDetActionDeleteButton: Button;
  @component('//button[@id="TaxSummary-delete-0"]')
  public taxSumActionDeleteButton: Button;
  @component('//button[@id="transferDetail-delete-0"]')
  public transferDetActionDeleteButton: Button;
  @component('//button[@id="transferSummary-delete-0"]')
  public transferSumActionDeleteButton: Button;
  @component('//button[@id="TransferSumDetail-delete-0"]')
  public tranSumDetActionDeleteButton: Button;
  @component('//button[@id="TransferSumDetail-detele"]')
  public tranSumDetActionMultiDeleteButton: Button;
  @component('//button[@id="ATM-delete-0"]') public atmActionDeteleButton: Button;
  @component('//button[@id="BNKExpAccSum-delete-0"]') public expAccSumActionDeteleButton: Button;
  @component('//button[@id="BNKExpAccDet-delete-0"]') public expAccDetActionDeteleButton: Button;

  //  new UI action publish button
  @component('//button[@id="BNKPoboRobo-publish-0"]')
  public PoboRoboActionPublishButton: Button;
  @component('//button[@id="BNKDlyMt940-publish-0"]')
  public DlyMt940ActionPublishButton: Button;
  @component('//button[@id="BNKColRtn-publish-0"]')
  public ColRtnActionPublishButton: Button;
  @component('//button[@id="BNKColAcct-publish-0"]')
  public ColAcctActionPublishButton: Button;
  @component('//button[@id="BNKColThru-publish-0"]')
  public ColThruActionPublishButton: Button;
  @component('//button[@id="BNKLoanDet-publish-0"]')
  public LoanDetActionPublishButton: Button;
  @component('//button[@id="BNKLoanSum-publish-0"]')
  public LoanSumActionPublishButton: Button;
  @component('//button[@id="BNKCheDep-publish-0"]')
  public CheDepActionPublishButton: Button;
  @component('//button[@id="BNKFdDet-publish-0"]')
  public FdDetActionPublishButton: Button;
  @component('//button[@id="BNKFdSum-publish-0"]')
  public FdSumActionPublishButton: Button;
  @component('//button[@id="BNKInOutAd-publish-0"]')
  public InOutAdActionPublishButton: Button;
  @component('//button[@id="BNKInOutSum-publish-0"]')
  public InOutSumActionPublishButton: Button;
  @component('//button[@id="BNKInOutSum-generate-0"]')
  public InOutSumActionGenerateButton: Button;
  @component('//button[@id="BNKAcctDet-publish-0"]')
  public AcctDetActionPublishButton: Button;
  @component('//button[@id="BNKAcctSum-publish-0"]')
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
  @component('//span[@id="BNKInOutAd-publish-button"]')
  public standardInOutAdPublishBtn: Button;
  @component('//span[@id="BNKInOutAd-generate-button"]')
  public standardInOutAdGenerateBtn: Button;
  @component('//span[@id="bulkCollection-generate-button"]')
  public bulkColGenerateBtn: Button;
  @component('//span[@id="chequesSummary-generate-button"]')
  public chequesSummaryGenerateBtn: Button;
  @component('//input[@id="reports-filter"]') public filterInput: TextInput;
  @component('//label[@id="BNKPoboRobo-reportName-0"]')
  public PoboRoboReportName: TextInput;
  @component('//li[@id="BNKPoboRobo-account-0"]')
  public PoboRoboAccount: TextInput;
  @component('//span[@id="BNKPoboRobo-schedule-0"]')
  public PoboRoboReportSchedule: TextInput;
  @component('//*[@id="BNKPoboRobo-paymentDateRange-relative"]')
  public PoboRoboPaymentDateRange: TextInput;

  // account details
  @component('//label[@id="BNKAcctDet-reportName-0"]')
  public AcctDetReportName: TextInput;
  @component('//li[@id="BNKAcctDet-account-0"]')
  public AcctDetAccount: TextInput;
  @component('//span[@id="BNKAcctDet-schedule-0"]')
  public AcctDetReportSchedule: TextInput;
  @component('//*[@id="BNKAcctDet-paymentDateRange-relative"]')
  public AcctDetPaymentDateRange: TextInput;

  // account summary
  @component('//label[@id="BNKAcctSum-reportName-0"]')
  public AcctSumReportName: TextInput;
  @component('//li[@id="BNKAcctSum-account-0"]')
  public AcctSumAccount: TextInput;
  @component('//span[@id="BNKAcctSum-schedule-0"]')
  public AcctSumReportSchedule: TextInput;
  @component('//*[@id="BNKAcctSum-paymentDateRange-relative"]')
  public AcctSumPaymentDateRange: TextInput;
  @component('//span[@id="BNKAcctSum-emails-0"]')
  public AcctSumSendTo: TextInput;

  // loan detail
  @component('//span[@id="BNKLoanDet-emails-0"]')
  public LoanDetSendTo: TextInput;
  @component('//label[@id="BNKLoanDet-reportName-0"]')
  public LoanDetReportName: TextInput;
  @component('//span[@id="BNKLoanDet-schedule-0"]')
  public LoanDetSchedule: TextInput;
  @component('//li[@id="BNKLoanDet-account-0"]')
  public LoanDetAccount: TextInput;
  @component('//*[@id="BNKLoanDet-paymentDateRange-absolute"]')
  public LoanDetPaymentDateRange: TextInput;

  // loan summary
  @component('//span[@id="BNKLoanSum-emails-0"]')
  public LoanSumSendTo: TextInput;
  @component('//label[@id="BNKLoanSum-reportName-0"]')
  public LoanSumReportName: TextInput;
  @component('//span[@id="BNKLoanSum-schedule-0"]')
  public LoanSumSchedule: TextInput;
  @component('//li[@id="BNKLoanSum-account-0"]')
  public LoanSumAccount: TextInput;
  @component('//*[@id="BNKLoanSum-paymentDateRange-absolute"]')
  public LoanSumPaymentDateRange: TextInput;

  // cheque dep
  @component('//span[@id="BNKCheDep-emails-0"]') public CheDepSendTo: TextInput;
  @component('//label[@id="BNKCheDep-reportName-0"]')
  public CheDepReportName: TextInput;
  @component('//div[@id="BNKCheDep-date-0"]') public createDate: TextInput;
  @component('//span[@id="BNKCheDep-schedule-0"]')
  public CheDepSchedule: TextInput;
  @component('//li[@id="BNKCheDep-account-0"]') public CheDepAccount: TextInput;
  @component('//p[@id="BNKCheDep-paymentDateRange-absolute"]')
  public CheDepPaymentDateRange: TextInput;
  @component('//span[@id="BNKCheDep-emails-0"]') public sendToValue: TextInput;

  // fd sum
  @component('//label[@id="BNKFdSum-reportName-0"]')
  public FdSumReportName: TextInput;
  @component('//span[@id="BNKFdSum-schedule-0"]')
  public FdSumSchedule: TextInput;
  @component('//li[@id="BNKFdSum-account-0"]') public FdSumAccount: TextInput;
  @component('//div[@id="BNKFdSum-paymentDateRange"]/p')
  public FdSumPaymentDateRange: TextInput;

  // fd det
  @component('//label[@id="BNKFdDet-reportName-0"]')
  public FdDetReportName: TextInput;
  @component('//span[@id="BNKFdDet-schedule-0"]')
  public FdDetSchedule: TextInput;
  @component('//li[@id="BNKFdDet-account-0"]') public FdDetAccount: TextInput;
  @component('//div[@id="BNKFdDet-paymentDateRange"]/p')
  public FdDetPaymentDateRange: TextInput;

  //Bulk Collection
  @component('//label[@id="bulkCollection-reportName-0"]')
  public bulkColViewReportName: TextInput;
  @component('//li[@id="bulkCollection-account-0"]')
  public bulkColViewAcct: TextInput;
  @component('//p[@id="bulkCollection-paymentDateRangeAb"]')
  public bulkColViewDateRange: TextInput;
  @component('//*[@id="__bookmark_1"]')
  public birtElement: TextInput;
  @component(
    '//img[contains(@class, "style_") and contains(@src,"/I3BirtReports/preview")]'
  )
  public DBSLogo: TextInput;

  //Bulk Payment
  @component('//label[@id="bulkPayment-reportName-0"]')
  public bulkPaymentViewReportName: TextInput;
  @component('//li[@id="bulkPayment-account-0"]')
  public bulkPaymentViewAcct: TextInput;
  @component('//p[@id="bulkPayment-paymentDateRangeAb"]')
  public bulkPaymentViewDateRange: TextInput;
  @component('//span[@id="bulkPayment-emails-0"]')
  public bulkPaymentSendToValue: TextInput;

  //Cheque Draft Detail
  @component('//label[@id="chequesDetailed-reportName-0"]')
  public chequeDraftDetailViewReportName: TextInput;
  @component('//li[@id="chequesDetailed-account-0"]')
  public chequeDraftDetailViewAcct: TextInput;
  @component('//span[@id="chequesDetailed-emails-0"]')
  public chequeDraftDetailSendToValue: TextInput;

  //FAST Collection
  @component('//label[@id="FASTCollection-reportName-0"]')
  public fastColViewReportName: TextInput;
  @component('//li[@id="FASTCollection-account-0"]')
  public fastColViewAcct: TextInput;
  @component('//p[@id="FASTCollection-paymentDateRangeAb"]')
  public fastColViewDateRange: TextInput;

  //FAST Payment
  @component('//label[@id="FASTPayment-reportName-0"]')
  public fastPaymentViewReportName: TextInput;
  @component('//li[@id="FASTPayment-account-0"]')
  public fastPaymentViewAcct: TextInput;
  @component('//span[@id="FASTPayment-emails-0"]')
  public fastPaymentSendToValue: TextInput;

  //Group Detail
  @component('//label[@id="GroupDetail-reportName-0"]')
  public groupDetViewReportName: TextInput;
  @component('//li[@id="GroupDetail-account-0"]')
  public groupDetViewAcct: TextInput;
  @component('//p[@id="GroupDetail-paymentDateRangeAb"]')
  public groupDetViewDateRange: TextInput;

  //Group Summary
  @component('//label[@id="GroupSummary-reportName-0"]')
  public groupSumViewReportName: TextInput;
  @component('//li[@id="GroupSummary-account-0"]')
  public groupSumViewAcct: TextInput;
  @component('//span[@id="GroupSummary-emails-0"]')
  public groupSumSendToValue: TextInput;

  //Transaction Status
  @component('//label[@id="LastModifier-reportName-0"]')
  public txnStatusViewReportName: TextInput;
  @component('//li[@id="LastModifier-account-0"]')
  public txnStatusViewAcct: TextInput;
  @component('//span[@id="LastModifier-emails-0"]')
  public txnStatusSendToValue: TextInput;

  //Payment Advice
  @component('//label[@id="PaymentAdvice-reportName-0"]')
  public payAdvViewReportName: TextInput;
  @component('//li[@id="PaymentAdvice-account-0"]')
  public payAdvViewAcct: TextInput;
  @component('//p[@id="PaymentAdvice-paymentDateRangeAb"]')
  public payAdvViewDateRange: TextInput;
  @component('//span[@id="PaymentAdvice-emails-0"]')
  public payAdvSendToValue: TextInput;

  //Payroll
  @component('//label[@id="payRoll-reportName-0"]')
  public payrollViewReportName: TextInput;
  @component('//li[@id="payRoll-account-0"]')
  public payrollViewAcct: TextInput;
  @component('//p[@id="payRoll-paymentDateRangeAb"]')
  public payrollViewDateRange: TextInput;
  @component('//span[@id="payRoll-emails-0"]')
  public payrollSendToValue: TextInput;

  //Payroll Summary
  @component('//label[@id="payRollSummary-reportName-0"]')
  public payrollSumViewReportName: TextInput;
  @component('//li[@id="payRollSummary-account-0"]')
  public payrollSumViewAcct: TextInput;
  @component('//p[@id="payRollSummary-paymentDateRangeAb"]')
  public payrollSumViewDateRange: TextInput;

  //Stop Cheque
  @component('//label[@id="stopCheque-reportName-0"]')
  public stopCheViewReportName: TextInput;
  @component('//li[@id="stopCheque-account-0"]')
  public stopCheViewAcct: TextInput;
  @component('//p[@id="stopCheque-paymentDateRangeAb"]')
  public stopCheViewDateRange: TextInput;
  @component('//span[@id="stopCheque-emails-0"]')
  public stopCheSendToValue: TextInput;

  //Stop Cheque
  @component('//label[@id="Summary-reportName-0"]')
  public payCurViewReportName: TextInput;
  @component('//li[@id="Summary-account-0"]')
  public payCurViewAcct: TextInput;
  @component('//p[@id="Summary-paymentDateRangeAb"]')
  public payCurViewDateRange: TextInput;

  //Tax Advice
  @component('//label[@id="TaxAdvice-reportName-0"]')
  public taxAdvViewReportName: TextInput;
  @component('//li[@id="TaxAdvice-account-0"]')
  public taxAdvViewAcct: TextInput;
  @component('//p[@id="TaxAdvice-paymentDateRangeAb"]')
  public taxAdvViewDateRange: TextInput;

  //Tax Detail
  @component('//label[@id="TaxDetail-reportName-0"]')
  public taxDetViewReportName: TextInput;
  @component('//li[@id="TaxDetail-account-0"]')
  public taxDetViewAcct: TextInput;
  @component('//p[@id="TaxDetail-paymentDateRangeAb"]')
  public taxDetViewDateRange: TextInput;

  //Tax Summary
  @component('//label[@id="TaxSummary-reportName-0"]')
  public taxSumViewReportName: TextInput;
  @component('//li[@id="TaxSummary-account-0"]')
  public taxSumViewAcct: TextInput;
  @component('//p[@id="TaxSummary-paymentDateRangeAb"]')
  public taxSumViewDateRange: TextInput;

  //Transfer Detail
  @component('//label[@id="transferDetail-reportName-0"]')
  public transferDetViewReportName: TextInput;
  @component('//li[@id="transferDetail-account-0"]')
  public transferDetViewAcct: TextInput;
  @component('//span[@id="transferDetail-emails-0"]')
  public transferDetSendToValue: TextInput;

  //Transfer Summary
  @component('//label[@id="transferSummary-reportName-0"]')
  public transferSumViewReportName: TextInput;
  @component('//li[@id="transferSummary-account-0"]')
  public transferSumViewAcct: TextInput;
  @component('//p[@id="transferSummary-paymentDateRangeAb"]')
  public transferSumViewDateRange: TextInput;

  //Transfer Summary Detail
  @component('//label[@id="TransferSumDetail-reportName-0"]')
  public tranSumDetViewReportName: TextInput;
  @component('//li[@id="TransferSumDetail-account-0"]')
  public tranSumDetViewAcct: TextInput;
  @component('//p[@id="TransferSumDetail-paymentDateRangeAb"]')
  public tranSumDetViewDateRange: TextInput;

  //Custom Report>ATM Report
  @component('//label[@id="ATM-reportName-0"]') public atmReportViewDetailsBtn: Button;
  @component('//label[@id="ATM-reportName-0"]') public atmReportNameValue: TextInput;
  @component('//span[@id="ATM-emails-0"]') public atmEmailsValue: TextInput;
  @component('//div[@id="ATM-deliverySchedule"]') public atmDeliverScheduleValue: TextInput;
  @component('//div[@id="ATM-deliveryTime"]') public atmDeliverTimeValue: TextInput;
  //File Detail
  @component('//button[@id="fileDetail-personalised"]')
  public fileDetailPersonButton: Button;

  //File Summary
  @component('//button[@id="fileSummary-standard"]')
  public fileDetailStandardButton: Button;

  //Transaction Detail
  @component('//button[@id="transactionDetail-personalised"]')
  public transactionDetailPersonButton: Button;

  //Transaction Summary
  @component('//button[@id="transactionSummary-personalised"]')
  public transactionSumPersonButton: Button;
  @component('//button[@id="transactionSummary-standard"]')
  public transactionSumStandardButton: Button;

  // Data Export
  @component('//label[@id="BNKExpAccSum-reportName-0"]') public expAccSumDetails0: Button;
  @component('//label[@id="BNKExpAccSum-reportName-0"]') public expAccSumDetailsValue: TextInput;
  @component('//div[@id="BNKExpAccSum-deliveryFormat"]') public expAccSumDeliveryFormatValue: TextInput;
  @component('//span[@id="BNKExpAccSum-schedule-0"]') public expAccSumScheduleValue: TextInput;

  @component('//label[@id="BNKExpAccDet-reportName-0"]') public expAccDetDetails0: Button;
  @component('//label[@id="BNKExpAccDet-reportName-0"]') public expAccDetDetailsValue: TextInput;
  @component('//div[@id="BNKExpAccDet-deliveryFormat"]') public expAccDetDeliveryFormatValue: TextInput;
  @component('//span[@id="BNKExpAccDet-schedule-0"]') public expAccDetScheduleValue: TextInput;
  @component('//li[@id="BNKExpAccSum-account-0"]') public sumAccountsDetail: TextInput;
  @component('//li[@id="BNKExpAccDet-account-0"]') public detAccountsDetail: TextInput;

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.visibilityOf(this.showReportDetailsBtn.element),
      this.showReportDetailsBtn.getTimeOut()
    );
    await browser.wait(
      ExpectedConditions.elementToBeClickable(
        this.showReportDetailsBtn.element
      ),
      this.showReportDetailsBtn.getTimeOut()
    );
  }

  public async loadCondition4NewFileUpload() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.visibilityOf(this.fileDetailCreateButton.element),
      this.fileDetailCreateButton.getTimeOut()
    );
    await browser.wait(
      ExpectedConditions.elementToBeClickable(
        this.fileDetailCreateButton.element
      ),
      this.fileDetailCreateButton.getTimeOut()
    );
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
}

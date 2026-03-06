/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { TransferCentersPage } from "./TransferCenterPage";
import { TestPages } from "../../../lib";
import { PaymentPage } from "./PaymentPage";
import { ChequePaymentPage } from "./ChequePaymentPage";
import { StopChequePage } from "./StopChequePage";
import { PaymentLocalOverseasPayeePage } from "./PaymentLocalOverseasPayeePage";
import { IntraCompanyTransferPage } from "./IntraCompanyTransferPage";
import { BulkPaymentpage } from "./BulkPaymentpage";
import { PaymentTemplatesPage } from "./PaymentTemplatesPage";
import { BeneficiaryPage } from "./BeneficiaryPage";
import { VerificationAndReleasesPage } from "../Approvals/VerificationAndReleasesPage";
import { MT101PaymentPage } from "./MT101PaymentPage";
import { CrossBoarderACHPage } from "./CrossBoarderACHPage";
import { BulkCollectionPage } from "./BulkCollectionPage";
import { FastPaymentPage } from "./FastPaymentPage";
import { AccountTransferPage } from "./AccountTransferPage";
import { BillPaymentPage } from "./BillPaymentPage";
import { FPSPaymentPage } from "./FPSPaymentPage";
import { SGPayNowPage } from "./SGPayNowPage";
import { NEFTPaymentPage } from "./NEFTPaymentPage";
import { RTGSPaymentPage } from "./RTGSPaymentPage";
import { PayrollPage } from "./PayrollPage";
import { SKNPaymentPage } from "./SKNPaymentPage";
import { CNAPSPaymentPage } from "./CNAPSPaymentPage";
import { PartnerBankPayment } from "./PartnerBankPaymentPage";
import { MEPSPaymentPage } from "./MEPSPaymentPage";
import { AutoPayPaymentPage } from "./AutoPayPaymentPage";
import { FastCollectionPage } from "./FastCollectionPage";
import { TWFISCPaymentPage } from "./TWFISCPaymentPage";
import { TWACHBulkPaymentPage } from "./TWACHBulkPaymentPage";
import { HKCHATSPaymentPage } from "./HKCHATSPaymentPage";
import { DemandDraftPaymentPage } from "./DemandDraftPaymentPage";
import { VNLvtPage } from "./VNLvtPage";
import { ITTPage } from "./ITTPage";
import { HVTPaymentPage } from "./HVTPaymentPage";
import { NewBillPaymentPage } from "./NewBillPaymentPage";
import { NewFastCollectionPage } from "./NewFastCollectionPage";
import { FixedDepositPlacementPage } from "./FixedDepositPlacementPage";
import { FixedDepositMVP2Page } from "./FixedDepositMVP2Page";
import { CustomPaymentPage } from './CustomPaymentPage';
import { VNTaxPaymentPage } from "./VNTaxPaymentPage";
import { PaymentLimit } from "./PaymentLimit";
import { GiroPaymentPage } from "./GiroPaymentPage";
export {
  TransferCentersPage,
  PaymentPage,
  StopChequePage,
  ChequePaymentPage,
  PaymentLocalOverseasPayeePage,
  IntraCompanyTransferPage,
  BulkPaymentpage,
  PaymentTemplatesPage,
  VerificationAndReleasesPage,
  MT101PaymentPage,
  BulkCollectionPage,
  FastPaymentPage,
  AccountTransferPage,
  BillPaymentPage,
  FPSPaymentPage,
  SGPayNowPage,
  NEFTPaymentPage,
  RTGSPaymentPage,
  PayrollPage,
  SKNPaymentPage,
  CNAPSPaymentPage,
  PartnerBankPayment,
  MEPSPaymentPage,
  AutoPayPaymentPage,
  FastCollectionPage,
  TWFISCPaymentPage,
  TWACHBulkPaymentPage,
  DemandDraftPaymentPage,
  VNLvtPage,
  ITTPage,
  NewBillPaymentPage,
  NewFastCollectionPage,
  FixedDepositPlacementPage,
  FixedDepositMVP2Page,
  VNTaxPaymentPage,
  CustomPaymentPage,
  PaymentLimit,
  GiroPaymentPage
};

export class PaymentsPages extends TestPages {
  public transferCentersPage: TransferCentersPage;
  public paymentPage: PaymentPage;
  public chequePaymentPage: ChequePaymentPage;
  public stopChequePage: StopChequePage;
  public PaymentLocalOverseasPayeePage: PaymentLocalOverseasPayeePage;
  public intraCompanyTransferPage: IntraCompanyTransferPage;
  public BulkPaymentpage: BulkPaymentpage;
  public PaymentTemplatesPage: PaymentTemplatesPage;
  public BeneficiaryPage: BeneficiaryPage;
  public VerificationAndReleasesPage: VerificationAndReleasesPage;
  public mt101PaymentPage: MT101PaymentPage;
  public NewBillPaymentPage: NewBillPaymentPage;
  public crossBoarderACHPage: CrossBoarderACHPage;
  public bulkCollectionPage: BulkCollectionPage;
  public fastPaymentPage: FastPaymentPage;
  public AccountTransferPage: AccountTransferPage;
  public billPaymentPage: BillPaymentPage;
  public FPSPaymentPage: FPSPaymentPage;
  public SGPayNowPage: SGPayNowPage;
  public NEFTPaymentPage: NEFTPaymentPage;
  public RTGSPaymentPage: RTGSPaymentPage;
  public PayrollPage: PayrollPage;
  public SKNPaymentPage: SKNPaymentPage;
  public CNAPSPaymentPage: CNAPSPaymentPage;
  public PartnerBankPayment: PartnerBankPayment;
  public MEPSPaymentPage: MEPSPaymentPage;
  public AutoPayPaymentPage: AutoPayPaymentPage;
  public fastCollectionPage: FastCollectionPage;
  public TWFISCPaymentPage: TWFISCPaymentPage;
  public TWACHPaymentPage: TWACHBulkPaymentPage;
  public HKCHATSPaymentPage: HKCHATSPaymentPage;
  public DDPaymentPage: DemandDraftPaymentPage;
  public VNLvtPage: VNLvtPage;
  public ITTPage: ITTPage;
  public HVTPaymentPage: HVTPaymentPage;
  public NewFastCollectionPage: NewFastCollectionPage;
  public fixedDepositPlacementPage: FixedDepositPlacementPage;
  public FixedDepositMVP2Page: FixedDepositMVP2Page;
  public VNTaxPaymentPage: VNTaxPaymentPage;
  public CustomPaymentPage: CustomPaymentPage;
  public PaymentLimit: PaymentLimit;
  public giroPaymentPage: GiroPaymentPage;

  constructor() {
    super();
    this.transferCentersPage = new TransferCentersPage();
    this.paymentPage = new PaymentPage();
    this.chequePaymentPage = new ChequePaymentPage();
    this.stopChequePage = new StopChequePage();
    this.PaymentLocalOverseasPayeePage = new PaymentLocalOverseasPayeePage();
    this.intraCompanyTransferPage = new IntraCompanyTransferPage();
    this.BulkPaymentpage = new BulkPaymentpage();
    this.PaymentTemplatesPage = new PaymentTemplatesPage();
    this.BeneficiaryPage = new BeneficiaryPage();
    this.VerificationAndReleasesPage = new VerificationAndReleasesPage();
    this.mt101PaymentPage = new MT101PaymentPage();
    this.NewBillPaymentPage = new NewBillPaymentPage();
    this.crossBoarderACHPage = new CrossBoarderACHPage();
    this.bulkCollectionPage = new BulkCollectionPage();
    this.fastPaymentPage = new FastPaymentPage();
    this.AccountTransferPage = new AccountTransferPage();
    this.billPaymentPage = new BillPaymentPage();
    this.FPSPaymentPage = new FPSPaymentPage();
    this.SGPayNowPage = new SGPayNowPage();
    this.NEFTPaymentPage = new NEFTPaymentPage();
    this.RTGSPaymentPage = new RTGSPaymentPage();
    this.PayrollPage = new PayrollPage();
    this.SKNPaymentPage = new SKNPaymentPage();
    this.CNAPSPaymentPage = new CNAPSPaymentPage();
    this.PartnerBankPayment = new PartnerBankPayment();
    this.MEPSPaymentPage = new MEPSPaymentPage();
    this.AutoPayPaymentPage = new AutoPayPaymentPage();
    this.fastCollectionPage = new FastCollectionPage();
    this.TWFISCPaymentPage = new TWFISCPaymentPage();
    this.TWACHPaymentPage = new TWACHBulkPaymentPage();
    this.HKCHATSPaymentPage = new HKCHATSPaymentPage();
    this.DDPaymentPage = new DemandDraftPaymentPage();
    this.VNLvtPage = new VNLvtPage();
    this.ITTPage = new ITTPage();
    this.HVTPaymentPage = new HVTPaymentPage();
    this.NewFastCollectionPage = new NewFastCollectionPage();
    this.fixedDepositPlacementPage = new FixedDepositPlacementPage();
    this.FixedDepositMVP2Page = new FixedDepositMVP2Page();
    this.VNTaxPaymentPage = new VNTaxPaymentPage();
    this.CustomPaymentPage = new CustomPaymentPage();
    this.PaymentLimit = new PaymentLimit();
    this.giroPaymentPage = new GiroPaymentPage();
  }
}

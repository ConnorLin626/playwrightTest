/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ImportLCIssuancePage } from './ImportLCIssuancePage';
import { TestPages } from '../../../lib';
import { TransactionInProcessPage } from './TransactionInProcessPage';
import { TransactionPartiesPage } from './TransactionPartiesPage';
import { PartyDetailsPage } from './PartyDetailsPage';
import { TransactionReviewPage } from './TransactionReviewPage';
import { TradeFinanceARFPage } from './TradeFinanceARFPage';
import { ImportLCAmendmentPage } from './ImportLCAmendmentPage';
import { BankerGuaranteeIssuancePage } from './BankerGuaranteeIssuancePage';
import { TradeFinanceAPFPage } from './TradeFinanceAPFPage';
import { TradeReportPage } from './TradeReportPage';
import { BankerGuaranteeAmendmentPage } from './BankerGuaranteeAmendmentPage';
import { StandbyLettersOfCreditPage } from './StandbyLettersOfCreditPage';
import { ImportBillunderCollectionPage } from './ImportBillunderCollectionPage';
import { TradeApplicationManagerPage } from './TradeApplicationManagerPage';
import { ShippingGuaranteePage } from './ShippingGuaranteePage';
import { ExportLCPage } from './ExportLCPage';
import { ExportBillUnderCollectionPage } from './ExportBillUnderCollectionPage';
import { TradeFinancingPage } from './TradeFinancingPage';
import { PreShipmentFinancingPage } from './PreShipmentFinancingPage';
import { FilesExchangePage } from './FilesExchangePage';
import { SamplingRequestPage } from './SamplingRequestPage';
import { OverViewPage } from './OverViewPage';
import { NewBankerGuaranteeIssuancePage } from './NewBankerGuaranteeIssuancePage';
import { NewImportLCIssuancePage } from './NewImportLCIssuancePage';

export {
  ImportLCIssuancePage, TransactionInProcessPage, TransactionPartiesPage, PartyDetailsPage, TransactionReviewPage, TradeFinanceARFPage,
  ImportLCAmendmentPage, BankerGuaranteeIssuancePage, TradeFinanceAPFPage, BankerGuaranteeAmendmentPage, StandbyLettersOfCreditPage, ImportBillunderCollectionPage,
  TradeApplicationManagerPage, TradeReportPage, ShippingGuaranteePage, ExportLCPage, TradeFinancingPage, ExportBillUnderCollectionPage, PreShipmentFinancingPage, FilesExchangePage,SamplingRequestPage,OverViewPage,NewBankerGuaranteeIssuancePage,NewImportLCIssuancePage
}


export class TradeFinancePages extends TestPages {
  public importLCIssuancePage : ImportLCIssuancePage;
  public transactionInProcessPage : TransactionInProcessPage;
  public transactionPartiesPage : TransactionPartiesPage;
  public partyDetailsPage : PartyDetailsPage;
  public transactionReviewPage : TransactionReviewPage;
  public tradeFinanceARFPage : TradeFinanceARFPage;
  public importLCAmendmentPage : ImportLCAmendmentPage;
  public bankerGuaranteeIssuancePage : BankerGuaranteeIssuancePage;
  public tradeFinanceAPFPage: TradeFinanceAPFPage;
  public TradeFinancingPage: TradeFinancingPage;
  public tradeReportPage : TradeReportPage;
  public bankerGuaranteeAmendmentPage: BankerGuaranteeAmendmentPage;
  public standbyLettersOfCreditPage : StandbyLettersOfCreditPage;
  public importBillunderCollectionPage : ImportBillunderCollectionPage;
  public tradeApplicationManagerPage: TradeApplicationManagerPage;
  public shippingGuaranteePage : ShippingGuaranteePage;
  public exportLCPage : ExportLCPage;
  public exportBillUnderCollectionPage : ExportBillUnderCollectionPage;
  public PreShipmentFinancingPage: PreShipmentFinancingPage;
  public FilesExchangePage : FilesExchangePage;
  public SamplingRequestPage:SamplingRequestPage;
  public OverViewPage : OverViewPage;
  public NewBankerGuaranteeIssuancePage : NewBankerGuaranteeIssuancePage
  public NewImportLCIssuancePage : NewImportLCIssuancePage


  constructor() {
    super();
    this.importLCIssuancePage = new ImportLCIssuancePage();
    this.transactionInProcessPage = new TransactionInProcessPage();
    this.transactionPartiesPage = new TransactionPartiesPage();
    this.partyDetailsPage = new PartyDetailsPage();
    this.transactionReviewPage = new TransactionReviewPage();
    this.tradeFinanceARFPage = new TradeFinanceARFPage();
    this.importLCAmendmentPage = new ImportLCAmendmentPage();
    this.bankerGuaranteeIssuancePage = new BankerGuaranteeIssuancePage();
    this.tradeFinanceAPFPage = new TradeFinanceAPFPage();
    this.TradeFinancingPage = new TradeFinancingPage();
    this.bankerGuaranteeAmendmentPage = new BankerGuaranteeAmendmentPage();
    this.standbyLettersOfCreditPage = new StandbyLettersOfCreditPage();
    this.importBillunderCollectionPage = new ImportBillunderCollectionPage();
    this.tradeApplicationManagerPage = new TradeApplicationManagerPage();
    this.tradeReportPage = new TradeReportPage();
    this.shippingGuaranteePage = new ShippingGuaranteePage();
    this.exportLCPage = new ExportLCPage();
    this.exportBillUnderCollectionPage = new ExportBillUnderCollectionPage();
    this.PreShipmentFinancingPage = new PreShipmentFinancingPage();
    this.FilesExchangePage = new FilesExchangePage();
    this.SamplingRequestPage = new SamplingRequestPage();
    this.OverViewPage = new OverViewPage();
    this.NewBankerGuaranteeIssuancePage = new NewBankerGuaranteeIssuancePage();
    this.TradeFinancingPage = new TradeFinancingPage()
    this.NewImportLCIssuancePage = new NewImportLCIssuancePage();
  }

}

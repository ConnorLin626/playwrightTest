/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsTransactionsFilesPage } from './PaymentsTransactionsFilesPage';
import { MyVerificationAndReleasePage } from './MyVerificationAndReleasePage';
import { TestPages } from '../../../lib';
import { IntraCompanyTransferPage } from '../Payments/IntraCompanyTransferPage';
import { OfflineApprovalPage } from './OfflineApprovalPage';
import { VerificationAndReleasesPage } from './VerificationAndReleasesPage';
import { TransferCentersPage } from '../Payments/TransferCenterPage';
import { UploadFilePage } from '../Files/UploadFilePage';
import { PaymentLocalOverseasPayeePage } from "../Payments/PaymentLocalOverseasPayeePage";
import { AccountTransferPage } from '../Payments/AccountTransferPage';

export {
  PaymentsTransactionsFilesPage, OfflineApprovalPage, VerificationAndReleasesPage, IntraCompanyTransferPage, TransferCentersPage, UploadFilePage,
  PaymentLocalOverseasPayeePage, AccountTransferPage
};

export class ApprovalsPages extends TestPages {
  public paymentsTransactionsFilesPage: PaymentsTransactionsFilesPage;
  public myVerificationAndReleasePage: MyVerificationAndReleasePage;
  public intraCompanyTransferPage: IntraCompanyTransferPage;
  public offlineApprovalPage: OfflineApprovalPage;
  public verificationAndReleasesPage: VerificationAndReleasesPage;
  public transferCentersPage: TransferCentersPage;
  public uploadFilePage: UploadFilePage;
  public paymentLocalOverseasPayeePage: PaymentLocalOverseasPayeePage;
  public AccountTransferPage: AccountTransferPage;
  constructor() {
    super();
    this.paymentsTransactionsFilesPage = new PaymentsTransactionsFilesPage();
    this.intraCompanyTransferPage = new IntraCompanyTransferPage();
    this.offlineApprovalPage = new OfflineApprovalPage();
    this.verificationAndReleasesPage = new VerificationAndReleasesPage();
    this.transferCentersPage = new TransferCentersPage();
    this.uploadFilePage = new UploadFilePage();
    this.paymentLocalOverseasPayeePage = new PaymentLocalOverseasPayeePage();
    this.AccountTransferPage = new AccountTransferPage();
    this.myVerificationAndReleasePage = new MyVerificationAndReleasePage();
  }

}


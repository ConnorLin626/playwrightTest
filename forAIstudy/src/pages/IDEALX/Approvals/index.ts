/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { MyVerificationAndReleasePage } from './MyVerificationAndReleasePage';
import { TestPages } from '../../../lib';
import { IntraCompanyTransferPage } from '../PayTransfer/IntraCompanyTransferPage';
import { TransferCentersPage } from '../PayTransfer/TransferCenterPage';
import { UploadFilePage } from '../Files/UploadFilePage';
import { TelegraphicTransferPage } from "../PayTransfer/TelegraphicTransferPage";
import { AccountTransferPage } from '../PayTransfer/AccountTransferPage';
import { ApprovalPage } from './ApprovalPage'

export {
    IntraCompanyTransferPage, TransferCentersPage, UploadFilePage,
    TelegraphicTransferPage, AccountTransferPage, ApprovalPage
};

export class ApprovalsPages extends TestPages {
    public MyVerificationAndReleasePage: MyVerificationAndReleasePage;
    public IntraCompanyTransferPage: IntraCompanyTransferPage;
    public transferCentersPage: TransferCentersPage;
    public uploadFilePage: UploadFilePage;
    public TelegraphicTransferPage: TelegraphicTransferPage;
    public AccountTransferPage: AccountTransferPage;
    public ApprovalPage: ApprovalPage;
    constructor() {
        super();
        this.IntraCompanyTransferPage = new IntraCompanyTransferPage();
        this.transferCentersPage = new TransferCentersPage();
        this.uploadFilePage = new UploadFilePage();
        this.TelegraphicTransferPage = new TelegraphicTransferPage();
        this.AccountTransferPage = new AccountTransferPage();
        this.MyVerificationAndReleasePage = new MyVerificationAndReleasePage();
        this.ApprovalPage = new ApprovalPage();
    }

}


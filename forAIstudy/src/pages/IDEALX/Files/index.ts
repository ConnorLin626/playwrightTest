/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { UploadFilePage } from './UploadFilePage';
import { TestPages } from '../../../lib';
import { TransferCentersPage } from '../PayTransfer/TransferCenterPage';
import { AccountTransferPage } from '../PayTransfer/AccountTransferPage';
import { DownloadFilePage } from './DownloadFilePage';
import { ViewFilePage } from "./ViewFilePage";
import { FilesExchangePage } from "./FilesExchangePage";

export {
    UploadFilePage, TransferCentersPage, AccountTransferPage, DownloadFilePage, ViewFilePage, FilesExchangePage
};

export class FilesPages extends TestPages {
    public uploadFilePage: UploadFilePage;
    public TransferCentersPage: TransferCentersPage;
    public AccountTransferPage: AccountTransferPage
    public downloadFilePage: DownloadFilePage;
    public ViewFilePage: ViewFilePage;
    public filesExchangePage: FilesExchangePage;
    constructor() {
        super();
        this.uploadFilePage = new UploadFilePage();
        this.TransferCentersPage = new TransferCentersPage();
        this.AccountTransferPage = new AccountTransferPage();
        this.downloadFilePage = new DownloadFilePage();
        this.ViewFilePage = new ViewFilePage();
        this.filesExchangePage = new FilesExchangePage();
    }
}

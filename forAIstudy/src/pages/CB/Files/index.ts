/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { UploadFilePage } from './UploadFilePage';
import { TestPages } from '../../../lib';
import { UploadProfilePage } from './UploadProfilePage';
import { SendPage } from './SendPage';
import { TransferCentersPage } from '../Payments/TransferCenterPage';
import { DownloadFilePage } from './DownloadFilePage';
import { Filemanagement_UploadFile } from './Filemanagement_UploadFilePage';
import { ViewFilePage } from "./ViewFilePage";

export {
  UploadFilePage, UploadProfilePage, TransferCentersPage, SendPage, DownloadFilePage,Filemanagement_UploadFile,ViewFilePage
};

export class FilesPages extends TestPages {
  public uploadFilePage: UploadFilePage;
  public uploadProfilePage: UploadProfilePage;
  public transferCentersPage: TransferCentersPage;
  public sendPage: SendPage;
  public downloadFilePage: DownloadFilePage;
  public filemanagement_UploadFile:Filemanagement_UploadFile;
  public ViewFilePage:ViewFilePage;
  constructor() {
    super();
    this.uploadFilePage = new UploadFilePage();
    this.uploadProfilePage = new UploadProfilePage();
    this.transferCentersPage = new TransferCentersPage();
    this.sendPage = new SendPage();
    this.downloadFilePage = new DownloadFilePage();
    this.filemanagement_UploadFile = new Filemanagement_UploadFile();
    this.ViewFilePage = new ViewFilePage();
  }
}
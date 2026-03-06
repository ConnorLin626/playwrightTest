/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Menu } from "../../../config/menu";
import { FilesPages } from '..';
import { Page, component, log, find, Button, generatedID, TextInput, ensure, waitForUXLoading, HtmlSelect, DateSelect, FileSelect, waitForI3Loading, findAll, OptionSelect } from '../../../lib';
import * as moment from 'moment';


@log export class ViewFilePage extends Page {

    //Upload file
    @component("//input[@type='file']") public browseforfiles: FileSelect;
    @component('//button[@name="upload"]') public UploadButton: Button;
    @component("//multi-level-dropdown[@formcontrolname='typeFormat']") public PaymentType: OptionSelect;
    @component("//p-auto-complete[@formcontrolname='approvalOption']") public ApprovalOption: OptionSelect;
    @component("//date-picker[@formcontrolname='paymentDate']") public amendPaymentDate: DateSelect;
    @component('//input[@id="confidentialFile"]') public ConfidentialFile: Button;
    @component("//button[@name='dismiss']") public ok: Button;
    @component('//input[@id="upload-filter"]') public Filter: TextInput;
    @component("//label[@id='file-list-addition']") public ShowAdditionalFilters: Button;
    @component("//button[@name='search']") public search: Button;
    @component("//span[@id='fileToggleButton-0']") public Showtransactions: Button;
    @component('//div[@id="txnFromAccount-0"]') public FromAccount: TextInput;


    //View file
    @component('//*[@id="upload-filter"]') public Filefilter: TextInput;
    @component('//*[@id="fileNameButton-0"]') public FileNameLink: Button;
    @component('//input[contains(@id,"file-view-select-")]') public SelectTxn: Button;
    @component('//*[@name="view-file-cancel"]') public ViewFileCancel: Button;
    //@component('//*[@id="viewTxnBtn-0"]') public ViewFileTxn1: TextInput;
    @component('//*[@id="viewTxnBtn-1"]') public ViewFileTxn2: TextInput;
    @component('//*[@id="viewTxnBtn-2"]') public ViewFileTxn3: TextInput;
    @component('//*[@id="viewTxnBtn-3"]') public ViewFileTxn4: TextInput;
    @component('//*[@class="btn btn__plain btn--word-break text-red-500"]') public ViewFileTxn1: TextInput;
    @component('//datatable-selection/datatable-scroller/datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[3]/div/div/p[1]/button') public paymentReferenceLink1: Button;
    @component('//span[@class="tip-tag"]') public HighRisk: TextInput;
    @component("//div[@class='alert-msg']") public alertMeaasge: TextInput;
   


    //Group tab
    @component('//a[contains(@href,"#/transfers/transfer-center/groups")]') public GroupTab: Button;
    @component("//*[@type='text']") public GroupFilter: TextInput;
    @component('//*[@id="groupNameButton-0"]') public GroupNamelink: Button;
    @component('//*[@id="CreatePdf"]') public PrintButn: Button;


    //View Group
    @component('//*[@id="view-group-list-reference_0"]') public viewGroupTxn1: TextInput;
    @component('//*[@id="view-group-list-reference_1"]') public viewGroupTxn2: TextInput;
    @component('//input[contains(@id,"group-view-list-")]') public ViewGrouSelectTxn: Button;
    @component('//*[@name="view-group-remove"]') public RemoveButn: TextInput;
    @component('//*[@name="remove-txn-group-remove"]') public RemoveConfButn: TextInput;
    @component('//*[@name="dismiss"]') public DismissButn: TextInput;
    @component('//*[@id="byGroup-view-filter"]') public byGroupFilter: TextInput;
    @component('//dbs-transaction-list/div/div/div[2]/table/tbody/tr[1]/td[7]/div/div[2]/button') public groupNameRef: Button;

    //Create new group
    @component('//*[@name="transferCenter-addReference"]') public GroupName: TextInput;
    @component('//*[@id="groupCreate"]') public CreateGrouButn: Button;
    @component('//*[@name="create-PDF-close"]') public GroupCancelButn: Button;

    //Add to existing group
    @component('//*[@id="AddToExistingGroup"]') public ExistingGroup: Button;
    @component('//*[@id="selectedGroup"]') public SeleExisGroup: OptionSelect;
    @component('//*[@name="Confirm"]') public ConfirmButn: Button;
    @component('//*[@name="dismiss"]') public OKButn: Button;

    //Delete txn
    @component('//*[@id="transactionDelete"]') public TxnDeleButn: Button;

    //Rebatch
    @component('//*[@id="transactionRebatch"]') public RebatchButn: Button;
    @component('//*[@id="ux-radio-1"]') public SeleNewFile: Button;
    @component('//*[@name="new-virtual-file"]') public VirtFileName: TextInput;
    @component('//*[@name="confirm"]') public RebatConfButn: Button;

    //Delete File
    @component('//*[@id="fileDelete"]') public deleteFileButn: Button;
    @component('//*[@id="dialogDelete"]') public deleteButn: Button;
    @component('//*[@id="No information to display"]') public FileResult: TextInput;




    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteFileButn.element), this.deleteFileButn.getTimeOut());
    }
    public async loadConditionForViewFile() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.CreateGrouButn.element), this.CreateGrouButn.getTimeOut());
    }

    public async loadConditionForViewGroup() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.PrintButn.element), this.PrintButn.getTimeOut());
    }

    public async loadConditionUpload() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.UploadButton.element), this.UploadButton.getTimeOut());
    }


}

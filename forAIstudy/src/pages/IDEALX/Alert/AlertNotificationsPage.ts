import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, HtmlSelect, pageSwitchWindow, waitForUXLoading, DateSelect } from '../../../lib';
import moment = require("moment");

@log export class AlertNotificationsPage extends Page {
    constructor() {
        super();
    }
    @component('//*[@id="notification-center"]') public notificationButton: Button;
    @component('//button[@id="create-manage-alerts"]') public createAndManageAlertButton: Button;
    @component('//ng-component/div/div[2]/div[1]/p-scrollable-tabs/section/ul/li[1]/a') public bankingBtn: Button;
    @component('//*[@id="alert-edit-delivery"]') public alertEditDelivery: Button;
    @component('//button[@id="empty-inbox"]') public emptyInbox: Button;
    @component('//div[@id="No information to display"]') public noInformation: Button;
    @component('//div[@id="notification-details-0"]') public AlertDetails: TextInput;
    @component('//input[@id="search-notification"]') public Filter: TextInput;
    @component('//div[@id="message-info-0"]') public MessageInfo: Button;
    @component('//button[@class="btn btn__primary margin-bottom-0"]') public RemoveBtn: Button;
    @component('//*[@name="more-button"]') public MoreBtn: Button;
    @component('//li[@name="notification-center-banking-markRead-all"]') public MakeallReadBtn: Button;
    @component('//li[@name="notification-center-banking-delete-all"]') public DeleteAllBtn: Button;
    @component('//button[@id="dialogDelete"]') public ConfirmDialogBtn: Button;
    @component('//div[@class="no-information ng-star-inserted"]') public Noinformation: Button;
    @component('//span[@class="red-pot ng-star-inserted"]') public RedPot:Button;
    @component('//a[@id="ux-tab-Unread"]') public NoReadBtn:Button;
    @component('//*[@class="dbs-snackbar__message"]') public SuccessSnackbar: Button;


    public async loadConditionCreatePage() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.stalenessOf(this.createAndManageAlertButton.element),
            this.createAndManageAlertButton.getTimeOut()
        );
    }
    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.visibilityOf(this.createAndManageAlertButton.element),
            this.createAndManageAlertButton.getTimeOut()
        );
        await browser.wait(
            ExpectedConditions.elementToBeClickable(
                this.createAndManageAlertButton.element
            ),
            this.createAndManageAlertButton.getTimeOut()
        );
    }

    public async loadDialog() {
        await waitForUXLoading();
        // await browser.wait(
        //     ExpectedConditions.elementToBeClickable(this.dismissButton.element),
        //     this.dismissButton.getTimeOut()
        // );
    }
}

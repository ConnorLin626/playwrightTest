import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, HtmlSelect, pageSwitchWindow, waitForUXLoading, DateSelect } from '../../../lib';
import moment = require("moment");

@log export class AlertNotificationsPage extends Page {
    constructor() {
        super();
    }
    @component('//button[@id="create-manage-alerts"]') public createAndManageAlertButton: Button;
    @component('//div[@id="menu-notifications"]') public menuNotification: Button;
    // @component('//div[@id="notifications-no-info"]') public notificationPopupNoInfo: Button;
    @component('//span[@id="alert-edit-delivery"]') public alertEditDelivery: Button;
    @component('//button[@id="empty-inbox"]') public emptyInbox: Button;
    @component('//div[@id="No information to display"]') public noInformation: Button;
    @component('//*[@id="notification-details-0"]') public AlertDetails: TextInput;
    @component('//input[@id="search-notification"]') public Filter: TextInput;

    public async loadConditionCreatePage() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.stalenessOf(this.createAndManageAlertButton.element),
            this.createAndManageAlertButton.getTimeOut()
        );
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.createAndManageAlertButton.element),this.createAndManageAlertButton.getTimeOut());
        //await browser.wait(ExpectedConditions.visibilityOf(this.AlertDetails.element),this.AlertDetails.getTimeOut());
        await browser.sleep(3500) //wait for alert detail display
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

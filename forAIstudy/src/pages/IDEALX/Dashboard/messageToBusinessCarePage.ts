import { Page, component, log, TextInput, Button, OptionSelect, waitForUXLoading } from "../../../lib";
import { browser, ExpectedConditions } from "protractor";

@log export class messageToBusinessCarePage extends Page {
    
    constructor() {
        super();
    }

    // create page
    @component('//*[@id="navNotificationLinkText"]') public notificationIcon:Button;
    @component('//*[@name="createMessage"]') public createMessageBtn:Button;
    @component('//p-auto-complete[@formcontrolname="messageSubject"]') public messageSubject:OptionSelect;
    @component('//textarea[@name="msgDetail"]') public msgDetail:TextInput;
    @component('//button[@name="submit"]') public submit:Button;

    // list page
    @component('//div[@id="message-info-0"]') public msgInfo1:Button;
    @component('//div[@id="message-info-0"]//*[@class="message-content__title"]') public msgInfo1Title:TextInput;
    @component('//div[@id="message-info-0"]//*[@class="message-content__subs"]') public msgInfo1Msg:TextInput;

    // view page
    @component('//*[@id="mat-mdc-dialog-2"]/div/div/ng-component/div/div[1]/dbs-icon-reg') public deleteBtn:Button;
    @component('//button[@id="dialogDelete"]') public dialogDeleteBtn:Button;
    @component('//dbs-notification-snackbar//*[@class="dbs-snackbar__message"]') public snackbarMsg:TextInput;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.messageSubject.element), this.messageSubject.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteBtn.element), this.deleteBtn.getTimeOut());
    }
}

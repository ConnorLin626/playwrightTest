/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, TextInput, waitForUXLoading, OptionSelect, HtmlSelect, Button, FileSelect } from '../../../lib';

@log export class ContactUsPage extends Page {
  constructor() {
    super();
  }
  
  //message page
  @component('//p-auto-complete[@formcontrolname="messageTo"]') public messageTo: OptionSelect;
  @component('//*[@class="ui-autocomplete-list-item-wrapper"]') public messageToResult: Button;
  @component('//p-auto-complete[@formcontrolname="messageSubject"]') public subjectList: HtmlSelect;
  @component('//*[@name="msgDetail"]') public msgText: TextInput;
  @component('//input[@class="input-hide"]') public attachFile: FileSelect;
  @component('//button[@name="submit"]') public submitBtn: Button;
  @component('//button[@name="dismiss"]') public okBtn: Button;
  @component('//button[@name="cancel"]') public cancelBtn: Button;

  //Inbox page
  @component('//button[@name="link-button_send-message-btn"]') public sendMsgBtn: Button;
  @component('//ng-component/div/ng-component/div/div[1]/h1') public inboxValue: TextInput;
  @component('//input[@id="messages-filter"]') public msgFilter: TextInput;
  @component('//datatable-body-cell[4]/div/div/p[2]') public msgValue: TextInput;
  @component('//button[@id="message-reference-0"]') public subject: Button;
  @component('//*[@name="reply-subject"]') public replySubject: TextInput;

  //View Message
  @component('//ng-component/div/div[3]/div/div[3]/span[2]/p') public viewMsgValue: TextInput;
  @component('//ng-component/div/div[2]/div/div/div[3]/span/label') public backBtn: Button;
  @component('//button[@name="delete"]') public deleteBtn: Button;
  @component('//button[@id="dialogDelete"]') public confirmDelBtn: Button;
  @component('//button[@name="replyAbove"]') public replyBtn: Button;

  

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
  }

  public async loadCondition4Submit() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.okBtn.element), this.okBtn.getTimeOut());
  }

  public async loadCondition4Inbox() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.sendMsgBtn.element), this.sendMsgBtn.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.msgValue.element), this.msgValue.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.subject.element), this.subject.getTimeOut());
  }

  public async loadCondition4ViewMsg() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.backBtn.element), this.backBtn.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.viewMsgValue.element), this.viewMsgValue.getTimeOut());
  }

  public async loadCondition4confirmDel() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmDelBtn.element), this.confirmDelBtn.getTimeOut());
  }

  public async loadConditionForReply() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.replySubject.element), this.replySubject.getTimeOut());
  }

  public async loadCondition4deleteSuccess() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.okBtn.element), this.okBtn.getTimeOut());
  }

}
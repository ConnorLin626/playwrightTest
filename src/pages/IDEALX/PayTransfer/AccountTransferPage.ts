import { Page, Locator } from '@playwright/test';

/**
 * 账户转账页面对象 - 基于 forAIstudy/src/pages/IDEALX/PayTransfer/AccountTransferPage.ts
 * 对应 Protractor 中的 @component 装饰器定义
 */
export class AccountTransferPage {
  private _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  private get page(): Page {
    return this._page;
  }

  // 导航相关 - 对应 forAIstudy 第10行
  get paymentMenu(): Locator { return this.page.locator('//*[@id="nav-item-navBBTopPaymentsLinkText"]'); }
  get pageButton(): Locator { return this.page.locator("//li[@class='page-point ng-star-inserted']"); }
  get makePayment(): Locator { return this.page.locator('//*[@id="icon__make_payment"]'); }

  // 认证对话框相关 - 对应 forAIstudy 第13-15行
  get digiToken(): Locator { return this.page.locator('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button'); }
  get enterCode(): Locator { return this.page.locator('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[2]/input'); }
  get authNow(): Locator { return this.page.locator('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button'); }

  // 付款详情相关 - 对应 forAIstudy 第17-19行
  get fromAccount(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="fromAccount"]'); }
  get amount(): Locator { return this.page.locator('//input[@name="send-amount"]'); }
  get existingPayee(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="payee"]'); }

  // 新收款人标签页相关 - 对应 forAIstudy 第20-25行
  get newPayeeTab(): Locator { return this.page.locator("//a[@id='ux-tab-NEW']"); }
  get newPayeeName(): Locator { return this.page.locator("//*[@name='new-payee-name']"); }
  get newPayeeNickname(): Locator { return this.page.locator("//*[@name='new-payee-nick-name']"); }
  get newPayeeAdd1(): Locator { return this.page.locator("//input[@name='new-payee-add1']"); }
  get newPayeeAdd2(): Locator { return this.page.locator("//input[@name='new-payee-add2']"); }
  get newPayeeAdd3(): Locator { return this.page.locator("//input[@name='new-payee-add3']"); }

  // 银行和账号相关 - 对应 forAIstudy 第26-29行
  get payeeBank(): Locator { return this.page.locator('//dbs-radio-group[@formcontrolname="bankType"]'); }
  get payeeBankRadio(): Locator { return this.page.locator('//*[@for="DBS-bank"]'); }
  get newPayeeAcctNumber(): Locator { return this.page.locator("//input[@name='new-payee-acct-number']"); }
  get newPayeeCountry(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="selectedCountry"]'); }
  get newPayeeCountryInput(): Locator { return this.page.locator('//*[@id="new-payee-country"]'); }
  get newPayeeCountrySelect(): Locator { return this.page.locator('//p-auto-complete/div/div[2]/ul/li[2]/div/span'); }

  // 付款详情和通知相关 - 对应 forAIstudy 第32-39行
  get paymentDetail(): Locator { return this.page.locator('//textarea[@name="paymentDetail"]'); }
  get isBeneAdvising(): Locator { return this.page.locator("//*[@id='isBeneAdvising']"); }
  get emailIdO(): Locator { return this.page.locator("//input[@name='email-id-0']"); }
  get emailId1(): Locator { return this.page.locator("//input[@name='email-id-1']"); }
  get emailId2(): Locator { return this.page.locator("//input[@name='email-id-2']"); }
  get emailId3(): Locator { return this.page.locator("//input[@name='email-id-3']"); }
  get emailId4(): Locator { return this.page.locator("//input[@name='email-id-4']"); }

  // Fax 通知相关 - 对应 forAIstudy 第39-42行
  get faxTab(): Locator { return this.page.locator("//ng-component/dbs-act-step-4/div/dbs-payee-advising/div/div/div[2]/div[2]/tabs-component/ul/li[2]"); }
  get faxAreaCode0(): Locator { return this.page.locator("//input[@name='fax-area-code-0']"); }
  get faxCountryCode0(): Locator { return this.page.locator("//p-auto-complete[@formcontrolname='ctryCode']"); }
  get faxNo0(): Locator { return this.page.locator("//input[@name='fax-no-0']"); }

  // 消息相关 - 对应 forAIstudy 第43-45行
  get message(): Locator { return this.page.locator("//textarea[@name='adviceContent']"); }
  get isTransactionNote(): Locator { return this.page.locator("label[for='isTransactionNote']"); }
  get transactionNote(): Locator { return this.page.locator("//textarea[@name='transactionNote']"); }

  // 按钮相关 - 对应 forAIstudy 第46-55行
  get saveAsDraft(): Locator { return this.page.locator("//button[@name='save-as-draft']"); }
  get nextButton(): Locator { return this.page.locator("//button[@name='next']"); }
  get approvalNowCheckBox(): Locator { return this.page.locator('//input[@name="approveNow"]'); }
  get getChallengeSMS(): Locator { return this.page.locator('//button[@name="get-challenge"]'); }
  get challengeResponse(): Locator { return this.page.locator("//input[@name='responseCode']"); }
  get savaAsTemplateCheckBox(): Locator { return this.page.locator('//input[@name="saveAsTemplate"]'); }
  get templateName(): Locator { return this.page.locator('//input[@name="templateName"]'); }
  get submitButton(): Locator { return this.page.locator("//button[@name='submit']"); }
  get finishedButton(): Locator { return this.page.locator('//button[@name="finish"]'); }
  get dismissButton(): Locator { return this.page.locator('//button[@name="dismiss"]'); }

  // FX 相关 - 对应 forAIstudy 第56-64行
  get payeeCode(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="payeeCode"]'); }
  get useFxCheckBox(): Locator { return this.page.locator('//input[@id="useFX" and @type="checkbox"]'); }
  get FXcontract0(): Locator { return this.page.locator('//input[@id="fx-contract-0" and @type="checkbox"]'); }
  get FXcontract0Amt(): Locator { return this.page.locator('//input[@name="fx-amount-0"]'); }
  get FXcontract1(): Locator { return this.page.locator('//input[@id="fx-contract-1" and @type="checkbox"]'); }
  get paymentDate(): Locator { return this.page.locator('//dbs-calendar[@formcontrolname="paymentDate"]'); }
  get outwardRemit(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="outwardRemit"]'); }
  get purposeCode(): Locator { return this.page.locator('//multi-level-dropdown[@formcontrolname="purposeCode"]'); }
  get subPurposeCode(): Locator { return this.page.locator('//multi-level-dropdown[@formcontrolname="subPurposeCode"]'); }
  get Country(): Locator { return this.page.locator("//p-auto-complete[@formcontrolname='selectedCountry']"); }
  get approveButton(): Locator { return this.page.locator("//button[@name='approve']"); }
  get pushBtnButton(): Locator { return this.page.locator('//*[@id="push-btn"]'); }
  get pushOption(): Locator { return this.page.locator('//*[@class="push-option-label"]'); }

  // FX 金额相关 - 对应 forAIstudy 第69-76行
  get SellCurrencyAmount(): Locator { return this.page.locator('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[5]/div/div'); }
  get BuyCurrencyAmount(): Locator { return this.page.locator('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[6]/div/div'); }
  get approveNowCheckBoxDup(): Locator { return this.page.locator("//input[@name='approveNow']"); }
  get fxContract4(): Locator { return this.page.locator('//dbs-foreign-exchange/div/div/div/div[2]/fx-dol-list/div/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[4]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/input'); }
  get tipMessage(): Locator { return this.page.locator('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/div[2]'); }
  get ViewFXrate(): Locator { return this.page.locator('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[5]/div[2]'); }
  get Booknow(): Locator { return this.page.locator('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[4]/div/span[1]'); }
  get Confirm(): Locator { return this.page.locator('//*[@id="mat-dialog-2"]/dbs-fx-dol-book-dialog/div/div[2]/div/button[2]'); }
  get approverOption(): Locator { return this.page.locator('//p-auto-complete[@id="approverOption"]'); }

  // 错误消息相关 - 对应 forAIstudy 第80-82行
  get complianceCodeErrorMsg(): Locator { return this.page.locator("//dbs-regulatory-advising-act/div/div/div[2]/div[1]/span[2]/span"); }
  get underlyingCodeErrorMsg(): Locator { return this.page.locator("//dbs-regulatory-advising-act/div/div/div[2]/div[2]/span[2]/span"); }
  get continueBtn(): Locator { return this.page.locator("//*[@id='cognitive-continue']"); }

  // 账户名检索相关 - 对应 forAIstudy 第84-87行
  get retireveNameBtn(): Locator { return this.page.locator("//retrieved-account-name-hk/div/div[2]/button"); }
  get createPageRetriveName(): Locator { return this.page.locator("//dbs-single-existing-payee/div/retrieved-account-name-hk/div/div[2]/p"); }
  get createPageRetriveNameNewPayee(): Locator { return this.page.locator("//dbs-single-new-payee/div/div/retrieved-account-name-hk/div/div[2]/p"); }
  get createPageRetrieveNameFailMsg(): Locator { return this.page.locator("//dbs-single-new-payee/div/div/retrieved-account-name-hk/div/div[2]/div/p"); }

  // 摘要部分 - 对应 forAIstudy 第89-91行
  get deductAmt(): Locator { return this.page.locator('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[3]/div'); }
  get AmtToDeduct(): Locator { return this.page.locator('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[4]/div/div[3]'); }
  get TotalAmtDeduct(): Locator { return this.page.locator('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[8]/div'); }

  // Transfer Center 相关 - 对应 forAIstudy 第93-94行
  get tranferCenterFiler(): Locator { return this.page.locator('//*[@id="transferCenter-filter"]'); }
  get refLink(): Locator { return this.page.locator("//*[@id='transaction-list-reference_0']"); }

  // View ACT Payment Page - 对应 forAIstudy 第97-147行
  get headerRef(): Locator { return this.page.locator('//*[@id="act-view-customerReference"]'); }
  get actStatusValue(): Locator { return this.page.locator('//*[@id="act-view-status"]'); }
  get hashValue(): Locator { return this.page.locator('//*[@id="act-view-hashValue"]'); }
  get deductAmountValue(): Locator { return this.page.locator('//*[@id="act-view-deductAmount"]'); }
  get fromAccountValue(): Locator { return this.page.locator('//span[@id="act-view-accountNum"]'); }
  get balanceValue(): Locator { return this.page.locator('//*[@id="view-act-acctBalance"]'); }
  get toExistingPayeeAcctValue(): Locator { return this.page.locator('//*[@id="act-view-existingPayee-acctNum"]'); }
  get toExistingPayeeNameValue(): Locator { return this.page.locator('//strong[@id="act-view-existingPayee-acctName"]'); }
  get toNewPayeeAcctValue(): Locator { return this.page.locator('//*[@id="act-view-newPayee-acctNum"]'); }
  get toNewPayeeNameValue(): Locator { return this.page.locator('//strong[@id="act-view-newPayee-acctName"]'); }
  get payeeAdd1(): Locator { return this.page.locator('//*[@id="act-view-payee-add1"]'); }
  get payeeAdd2(): Locator { return this.page.locator('//*[@id="act-view-payee-add2"]'); }
  get payeeAdd3(): Locator { return this.page.locator('//*[@id="act-view-payee-add3"]'); }
  get paymentDateValue(): Locator { return this.page.locator('//span[@id="act-view-paymentDate"]'); }
  get paymentType(): Locator { return this.page.locator('//*[@id="act-view-paymentType"]'); }
  get amountValue(): Locator { return this.page.locator('//label[@id="act-view-sendAmount"]'); }
  get contractRefValue(): Locator { return this.page.locator('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]'); }
  get AmtToDeductValue(): Locator { return this.page.locator('//dbs-view-section-act/div/section[2]/div[2]/span[2]/dbs-fx-dol-view/div/table/tbody/tr[1]/td[4]/span'); }
  get AmtToDeductValue1(): Locator { return this.page.locator('//dbs-view-section-act/div/section[2]/div[2]/span[2]/dbs-fx-dol-view/div/table/tbody/tr[2]/td[4]/span'); }
  get payeeBankName(): Locator { return this.page.locator('//*[@id="act-view-payee-bankName"]'); }
  get payeeBrchName(): Locator { return this.page.locator('//*[@id="act-view-payee-brchName"]'); }
  get payeeBankAdd1(): Locator { return this.page.locator('//*[@id="act-view-payee-bankAdd1"]'); }
  get payeeBankAdd2(): Locator { return this.page.locator('//*[@id="act-view-payee-bankAdd2"]'); }
  get payeeBankAdd3(): Locator { return this.page.locator('//*[@id="act-view-payee-bankAdd3"]'); }
  get payeeBankCity(): Locator { return this.page.locator('//*[@id="act-view-payee-bankCity"]'); }
  get payeeBankCountry(): Locator { return this.page.locator('//*[@id="act-view-payee-bankCountry"]'); }
  get payeeSwiftBic(): Locator { return this.page.locator('//*[@id="act-view-payee-swiftBic"]'); }
  get payeeBankCode(): Locator { return this.page.locator('//*[@id="act-view-payee-bankCode"]'); }
  get paymentDetailValue(): Locator { return this.page.locator('//*[@id="act-view-paymentDetail"]'); }
  get messageValue(): Locator { return this.page.locator('//*[@id="act-view-adviceContent"]'); }
  get emailList(): Locator { return this.page.locator('//*[@id="act-view-emailList"]'); }
  get totalDeductValue(): Locator { return this.page.locator('//*[@id="act-view-deductTotalAmount"]'); }
  get referenceValue(): Locator { return this.page.locator('//*[@id="act-view-custRef"]'); }
  get messageToApproverValue(): Locator { return this.page.locator('//*[@id="act-view-transactionNote"]'); }
  get purposeCodeView(): Locator { return this.page.locator('//*[@id="act-view-purposeCode"]'); }
  get subPurposeCodeValueView(): Locator { return this.page.locator('//*[@id="act-view-subPurposeCode"]'); }
  get complianceCodeValue(): Locator { return this.page.locator('//*[@id="act-view-regulatoryComplianceCode"]'); }
  get underlyingCodeValue(): Locator { return this.page.locator('//*[@id="act-view-underlyingCode"]'); }
  get payeeInfo(): Locator { return this.page.locator('//dbs-view-section-act/div/section[1]/div[5]/span[2]'); }
  get newPayeeAcctNum(): Locator { return this.page.locator('//*[@id="act-view-newPayee-acctNum"]'); }
  get newPayeeAdd1Value(): Locator { return this.page.locator('//*[@id="act-view-payee-add1"]'); }
  get newPayeeAdd2Value(): Locator { return this.page.locator('//*[@id="act-view-payee-add2"]'); }
  get newPayeeAdd3Value(): Locator { return this.page.locator('//*[@id="act-view-payee-add3"]'); }
  get baseOnExchangeRate(): Locator { return this.page.locator('//*[@id="fxDolViewSection"]'); }
  get nextApprover(): Locator { return this.page.locator("//dbs-approval-requirement/div/section/div[1]/span[2]"); }
  get activityLog(): Locator { return this.page.locator("//*[@class='payment-history']"); }
  get HighRisk(): Locator { return this.page.locator("//*[@class='alert-tag ng-star-inserted']"); }
  get alertMeaasge(): Locator { return this.page.locator("//div[@class='alert-msg']"); }
  get effectAvailabelBalanceLabel(): Locator { return this.page.locator('//*[text()="Effective Available Balance"]'); }
  get viewPageRetireveName(): Locator { return this.page.locator("//dbs-view-section-act/div/section[1]/div[5]/span[2]/strong"); }
  get viewPageRetireveNameUAT(): Locator { return this.page.locator("//dbs-view-section-act/div/section[1]/div[6]/span[2]/strong"); }

  // 拒绝页面 - 对应 forAIstudy 第151-153行
  get rejectButton(): Locator { return this.page.locator("//button[@name='reject']"); }
  get reasonForRejection(): Locator { return this.page.locator("//input[@name='reasonForRejection']"); }
  get rejectDialogButton(): Locator { return this.page.locator("//dbs-reject-dialog/div/div[2]/div[2]/button[2]"); }

  // 编辑页面 - 对应 forAIstudy 第156行
  get editButton(): Locator { return this.page.locator('//*[@id="act-view-edit"]'); }

  // 复制页面 - 对应 forAIstudy 第159行
  get copyButton(): Locator { return this.page.locator('//*[@name="copy"]'); }

  // View ACT Template Page - 对应 forAIstudy 第162-164行
  get templateNameValue(): Locator { return this.page.locator('//*[@id="act-viewTemp-templateName"]'); }
  get editTemplate(): Locator { return this.page.locator('//*[@id="act-viewTemp-edit"]'); }
  get actTmpStatusValue(): Locator { return this.page.locator('//*[@id="act-viewTemp-status"]'); }

  // 删除页面 - 对应 forAIstudy 第167-168行
  get deleteButton(): Locator { return this.page.locator('//button[@name="delete"]'); }
  get deleteDialogButton(): Locator { return this.page.locator('//*[@id="dialogDelete"]'); }

  // SAM>ACT schedule cut off time link - 对应 forAIstudy 第171行
  get twACTScheduleLink(): Locator { return this.page.locator('//a[contains(@href,"/csr/common/schedule/bom") and text()="Taiwan Account Transfer"]'); }

  // AlertOverlay page - 对应 forAIstudy 第174-175行
  get proceedButton(): Locator { return this.page.locator('//button[@class="btn btn__tertiary"]'); }
  get cancelButton(): Locator { return this.page.locator('//button[@class="btn btn__primary"]'); }

  // Push Approve Popup - 对应 forAIstudy 第177行
  get pushApprovePopUp(): Locator { return this.page.locator('//*[@class="mat-mdc-dialog-title mdc-dialog__title"]'); }

  // Third-party Platforms Page - 对应 forAIstudy 第180-188行
  get thirdPartyMenu(): Locator { return this.page.locator('//*[@id="nav-item-navBBTopThirdPartyPlatformsLinkText"]'); }
  get thirdPartyFilter(): Locator { return this.page.locator('//*[@id="third-party-filter"]'); }
  get thirdPartyLink(): Locator { return this.page.locator('//third-party-list/div/table/tbody/tr/td[1]/div/p[2]'); }
  get thirdPartyAmt(): Locator { return this.page.locator('//third-party-section/div[2]/div/div/div/span[2]'); }
  get thirdPartyCcy(): Locator { return this.page.locator('//third-party-section/div[2]/div/div/div/span[1]'); }
  get thirdPartyStatus(): Locator { return this.page.locator('//third-party-section/div[3]/div/div[2]/p'); }
  get thirdPartyRejectReason(): Locator { return this.page.locator('//div[@class="rejectReason ng-star-inserted"]/label[2]'); }
  get thirdPartyRef(): Locator { return this.page.locator('//third-party-section/div[3]/div/div[1]/span'); }
  get thirdPartyReqType(): Locator { return this.page.locator('//third-party-section/div[3]/div/div[3]/span'); }

  // 成功消息和参考编号 - 保留原有定义
  get successMessage(): Locator { return this.page.locator('//dbs-top-panel/div/div[starts-with(@class, "alert alert-info")]'); }
  get referenceNumber(): Locator { return this.page.locator('//*[@id="act-view-custRef"]'); }

  /**
   * 选择下拉框选项 - 基于 forAIstudy 的 OptionSelect 组件
   * @param locator - 定位器
   * @param value - 选项值
   */
  async selectOption(locator: Locator, value: string) {
    // 点击下拉框的 input 元素
    const inputLocator = locator.locator('xpath=.//input').first();
    await inputLocator.click();
    await this.page.waitForTimeout(800).catch(() => {});

    // 等待下拉列表出现
    await this.page.waitForTimeout(1000).catch(() => {});

    // 尝试多种选择器方式
    const selectors = [
      `//div[1]/*/div[contains(@class,'search-result-container')]//div[contains(text(),'${value}') or contains(text(),'${value.substring(0, 15)}')]`,
      `//div[contains(text(),'${value}') or contains(text(),'${value.substring(0, 15)}')]`,
      `//span[contains(text(),'${value}') or contains(text(),'${value.substring(0, 15)}')]`,
      `//li[contains(text(),'${value}') or contains(text(),'${value.substring(0, 15)}')]`,
      `//p-auto-complete//span[contains(text(),'${value}') or contains(text(),'${value.substring(0, 15)}')]`
    ];

    for (const selector of selectors) {
      try {
        const option = this.page.locator(selector).first();
        if (await option.isVisible({ timeout: 2000 }).catch(() => false)) {
          await option.click();
          await this.page.waitForTimeout(500).catch(() => {});
          console.log(`[选择] 成功选择: ${value}`);
          return;
        }
      } catch (e) {
        // 继续尝试下一个选择器
        continue;
      }
    }

    console.log(`[选择] 警告: 未找到选项 "${value}"，尝试直接输入`);
    // 如果找不到选项，尝试直接输入值
    await inputLocator.fill(value);
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(500).catch(() => {});
  }

  /**
   * 选择银行
   * @param bankName - 银行名称
   */
  async selectBank(bankName: string) {
    await this.payeeBank.click();
    await this.page.waitForTimeout(800).catch(() => {});
    const bankOption = this.page.locator(`//dbs-radio//span[contains(text(), '${bankName}') or contains(text(), '${bankName.substring(0, 10)}')]`).first();
    if (await bankOption.isVisible().catch(() => false)) {
      await bankOption.click();
    } else {
      const labelOption = this.page.locator(`//label[contains(text(), '${bankName}') or contains(text(), '${bankName.substring(0, 10)}')]`).first();
      await labelOption.click();
    }
    await this.page.waitForTimeout(500).catch(() => {});
  }

  /**
   * 选择国家
   * @param countryName - 国家名称
   */
  async selectCountry(countryName: string) {
    await this.Country.click();
    await this.page.waitForTimeout(1000).catch(() => {});
    const countryOption = this.page.locator(`//span[contains(text(), '${countryName}') or contains(text(), '${countryName.substring(0, 10)}')]`).first();
    if (await countryOption.isVisible().catch(() => false)) {
      await countryOption.click();
    } else {
      const divOption = this.page.locator(`//div[contains(text(), '${countryName}') or contains(text(), '${countryName.substring(0, 10)}')]`).first();
      await divOption.click();
    }
    await this.page.waitForTimeout(500).catch(() => {});
  }

  /**
   * 等待页面加载完成
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await this.page.waitForTimeout(1000).catch(() => {});
  }
}

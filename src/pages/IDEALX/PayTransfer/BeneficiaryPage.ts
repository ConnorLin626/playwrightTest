import { Page, Locator } from '@playwright/test';

/**
 * 收款人页面对象 - 基于 forAIstudy/src/pages/IDEALX/PayTransfer/BeneficiaryPage.ts
 * 对应 Protractor 中的 @component 装饰器定义
 */
export class BeneficiaryPage {
  private _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  private get page(): Page {
    return this._page;
  }

  // Center 相关 - 对应 forAIstudy 第10-31行
  get payeeMenu(): Locator { return this.page.locator('//a[contains(@href,"#/transfers/manage-payee")]'); }
  get MarketingMessage(): Locator { return this.page.locator('//*[@id="manage-payee-list"]/div[1]/information-banner/div/div/div/div[2]/p'); }
  get createNewPayee(): Locator { return this.page.locator('//button[@name="payee"]'); }
  get centerPayeeName(): Locator { return this.page.locator('//label[@id="payee-view-name"]'); }
  get routingCodeValue(): Locator { return this.page.locator('//dbs-payee-view/div/div/div/section/div[6]/span[2]'); }
  get accountNumValue(): Locator { return this.page.locator('//*[@id="payee-view-acctNum"]'); }
  get centerCardNum(): Locator { return this.page.locator('//*[@id="payee-view-CardNum"]'); }
  get paymentOptions(): Locator { return this.page.locator('//*[@id="manage-payee-list"]/div/dbs-payee-transaction-list/div/div[3]/div[2]/dbs-payee-view/div/div/div/div[6]/span[2]'); }
  get centerPayNowPayeeName(): Locator { return this.page.locator('//label[@id="payee-view-payNowNickName"]'); }
  get centerPayeeNickName(): Locator { return this.page.locator('//*[@id="payee-view-nickName"]'); }
  get centerPayeeViewEmail(): Locator { return this.page.locator('//*[@id="payee-view-email"]'); }
  get editNewPayee(): Locator { return this.page.locator('//button[@id="payee-edit"]'); }
  get deleteNewPayee(): Locator { return this.page.locator('//button[@name="payee-delete"]'); }
  get confirmDelete(): Locator { return this.page.locator('//button[@name="delete"]'); }
  get centerDismiss(): Locator { return this.page.locator('//div[@class="btn-area"]/button[@name="dismiss"]'); }
  get centerAddress1(): Locator { return this.page.locator('//*[@id="payee-view-add1"]'); }
  get centerAddress2(): Locator { return this.page.locator('//*[@id="payee-view-add2"]'); }
  get centerAddress3(): Locator { return this.page.locator('//*[@id="payee-view-add3"]'); }
  get centerEmailProxy(): Locator { return this.page.locator('//*[@id="payee-view-email"]'); }
  get centerMobileProxy(): Locator { return this.page.locator('//*[@id="payee-view-mobNum"]'); }
  get centerFasterIDProxy(): Locator { return this.page.locator('//*[@id="payee-view-fasterId"]'); }
  get payeeFilter(): Locator { return this.page.locator('//input[@name="approve-filter"]'); }
  get beneficiaryResult(): Locator { return this.page.locator('//div[@class="no-information"]'); }
  get payeePendingTable(): Locator { return this.page.locator('//*[@id="ux-tab-PAYEE_PENDING_APPROVAL"]'); }
  get payeePendingTableCount(): Locator { return this.page.locator('//*[@id="dbs-tab-count-PAYEE_PENDING_APPROVAL"]'); }
  get continueBtn(): Locator { return this.page.locator("//*[@id='cognitive-continue']"); }
  get deletePayeeBtn(): Locator { return this.page.locator("//*[@name='payee-delete']"); }
  get addressValue(): Locator { return this.page.locator("//dbs-payee-view/div/div/div/div[4]/span[2]/span"); }
  get updatePayeeIcon(): Locator { return this.page.locator("//*[@data-mat-icon-name='icon__snackbar--warning']"); }
  get updatePayeeInfo(): Locator { return this.page.locator("//*[@class='information-banner__flex-vertical']"); }
  get centerBankNameValue(): Locator { return this.page.locator("//*[@id='manage-payee-list']/div[2]/dbs-payee-transaction-list/div/div[3]/div[2]/dbs-payee-view/div/div/div/section/div[1]/div/span"); }
  get centerBankAdd1Value(): Locator { return this.page.locator('//*[@id="payee-view-bank-add1"]'); }
  get centerBankAdd2Value(): Locator { return this.page.locator('//*[@id="payee-view-bank-add2"]'); }

  // Detail -- payee 相关 - 对应 forAIstudy 第45-92行
  get enterManually(): Locator { return this.page.locator('//*[@id="enterManual"]'); }
  get payeeBankName(): Locator { return this.page.locator('//*[@id="new-payee-bank-name-input"]'); }
  get payeeBankAdd1(): Locator { return this.page.locator('//input[@id="new-payee-bank-add1-input"]'); }
  get payeeBankAdd2(): Locator { return this.page.locator('//input[@id="new-payee-bank-add2-input"]'); }
  get selectedCountry(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="selectedCountry"]'); }
  get newPayeeName(): Locator { return this.page.locator('//*[@name="new-payee-name"]'); }
  get newPayeeNickname(): Locator { return this.page.locator('//input[@name="new-payee-nick-name"]'); }
  get switchFormatButton(): Locator { return this.page.locator('//*[@class="switch-label"]'); }
  get payeeLocation(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="country"]'); }
  get townCity(): Locator { return this.page.locator('//*[@name="townCity"]'); }
  get addAddress(): Locator { return this.page.locator('//*[@class="additional"]'); }
  get checkBtn(): Locator { return this.page.locator('//*[@name="isConfirmPayeeCheck"]'); }
  get newPayeeAdd1(): Locator { return this.page.locator('//input[@name="new-payee-add1"]'); }
  get newPayeeAdd2(): Locator { return this.page.locator('//input[@name="new-payee-add2"]'); }
  get newPayeeAdd3(): Locator { return this.page.locator('//input[@name="new-payee-add3"]'); }
  get streetName(): Locator { return this.page.locator('//*[@name="street-name"]'); }
  get buildingNum(): Locator { return this.page.locator('//*[@name="building-number"]'); }
  get buildingName(): Locator { return this.page.locator('//*[@name="building-name"]'); }
  get floor(): Locator { return this.page.locator('//*[@name="floor"]'); }
  get room(): Locator { return this.page.locator('//*[@name="room"]'); }
  get department(): Locator { return this.page.locator('//*[@name="department"]'); }
  get postalCode(): Locator { return this.page.locator('//*[@name="postal-code"]'); }
  get subDepartment(): Locator { return this.page.locator('//*[@name="sub-department"]'); }
  get countrySubDivsion(): Locator { return this.page.locator('//*[@name="country-sub-division"]'); }
  get townLocationName(): Locator { return this.page.locator('//*[@name="town-location-name"]'); }
  get districtName(): Locator { return this.page.locator('//*[@name="district-ame"]'); }
  get chequeOrDemand(): Locator { return this.page.locator('//input[@name="chequeOrDemand" and @id="chequeOrDemand"]'); }
  get bankCategory(): Locator { return this.page.locator('//dbs-radio-group[@formcontrolname="bankCategoryType"]'); }
  get OtherBankType(): Locator { return this.page.locator('//dbs-radio-group[@formcontrolname="otherBankCategoryType"]'); }
  get newPayeeBankId(): Locator { return this.page.locator('//input[@name="new-payee-bank-id"]'); }
  get newPayeeBankIdButton(): Locator { return this.page.locator('//input[@name="new-payee-bank-id-button"]'); }
  get selectBankId(): Locator { return this.page.locator('//table[contains(@class,"swift-results")]/tbody/tr[1]/td[1]'); }
  get bankSelect(): Locator { return this.page.locator('//dbs-payee-bank/div/div/div[2]/div[1]/div[1]/p-typeahead-window/div/div'); }
  get newPayeeNumber(): Locator { return this.page.locator('//input[@name="new-payee-acct-number"]'); }
  get retriveName(): Locator { return this.page.locator('//*[@class="retrieve-name-title"]'); }
  get retriveNameBtn(): Locator { return this.page.locator('//*[@name="retrieve-name"]'); }
  get retireveNameBtn(): Locator { return this.page.locator("//form/bank-category-details/retrieved-account-name-hk/div/div[2]/button"); }
  get nicknameMsg(): Locator { return this.page.locator("//*[@class='dbs-validation-error ng-star-inserted']"); }
  get topMsg(): Locator { return this.page.locator("//ng-component/div/ng-component/div/dbs-top-panel/div/div[2]/ul/li/span"); }
  get printedName(): Locator { return this.page.locator('//input[@name="printedName"]'); }
  get selectedCategory(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="selectedCategory"]'); }
  get newPayeeNickName(): Locator { return this.page.locator('//input[@name="new-payee-nick-name"]'); }
  get payeeNum(): Locator { return this.page.locator('//ng-component/div/ng-component/div/div[3]/div[1]/span[1]'); }
  get ddPaymentOption(): Locator { return this.page.locator('//input[@name="payment-cd-type-DEMANDDRAFT"]'); }
  get chequePaymentOption(): Locator { return this.page.locator('//input[@name="payment-cd-type-CHEQUE"]'); }
  get payeeRoutingCode(): Locator { return this.page.locator('//input[@name="new-payee-routing-code"]'); }
  get viewPageRoutingCode(): Locator { return this.page.locator('//dbs-payee-view/div/div/div/section/div[6]/span[2]'); }

  // PayNow 相关 - 对应 forAIstudy 第94-104行
  get payNowProxy(): Locator { return this.page.locator('//a[@id="ux-tab-newpaynow"]'); }
  get proxyTypeMobNum(): Locator { return this.page.locator('//input[@name="proxyTypeMobNumInput"]'); }
  get retrievePayNowName(): Locator { return this.page.locator('//button[@name="retrieve-button"]'); }
  get retrievePayNowSpan(): Locator { return this.page.locator('//*[@id="retrieve-name"]'); }
  get newPayNowNickName(): Locator { return this.page.locator('//input[@name="newPayNowNickName"]'); }
  get retrieveNameButton(): Locator { return this.page.locator('//*[@name="retrieve-button"]'); }
  get proxyEmailRadio(): Locator { return this.page.locator('//input[@name="payNowProxyType-email"]'); }
  get proxyEmailText(): Locator { return this.page.locator('//input[@name="proxyTypeEmailInput"]'); }
  get proxyFasterIdRadio(): Locator { return this.page.locator('//input[@name="payNowProxyType-fpsId"]'); }
  get proxyFasterIdText(): Locator { return this.page.locator('//input[@name="proxyTypeFasterIDInput"]'); }

  // VN NAPAS247 相关 - 对应 forAIstudy 第107-112行
  get newNAPAStab(): Locator { return this.page.locator('//*[@id="ux-tab-newnapas"]'); }
  get PaytoCard(): Locator { return this.page.locator('//input[@name="payToType-CARD"]'); }
  get CardNumber(): Locator { return this.page.locator('//input[@name="new-payee-card-number"]'); }
  get VerifyButton(): Locator { return this.page.locator('//button[@name="Verify"]'); }
  get RetrievedPayeeName(): Locator { return this.page.locator('//*[@class="font-medium text-base"]'); }

  // Common 相关 - 对应 forAIstudy 第115-125行
  get next(): Locator { return this.page.locator('//button[@name="next"]'); }
  get submit(): Locator { return this.page.locator('//button[@name="submit"]'); }
  get dismiss(): Locator { return this.page.locator('//button[@name="dismiss"]'); }

  // Download payee 相关 - 对应 forAIstudy 第120-125行
  get downloadPayeeTab(): Locator { return this.page.locator('//button[@name="downloadPayees"]'); }
  get approveStatus(): Locator { return this.page.locator('//*[@id="approvalStatus-0"]'); }
  get approveStatusLabel(): Locator { return this.page.locator('//*[@id="label-multi-dropdown-approvalStatus"]'); }
  get search(): Locator { return this.page.locator('//*[@id="search"]'); }
  get approveStatusSelectAll(): Locator { return this.page.locator('//*[@id="selectAllInput"]'); }

  /**
   * 选择下拉框选项 - 基于 forAIstudy 的 OptionSelect 组件
   * @param locator - 定位器
   * @param value - 选项值
   */
  async selectOption(locator: Locator, value: string) {
    await locator.click();
    await this.page.waitForTimeout(800).catch(() => {});
    const option = this.page.locator(`//div[contains(text(), '${value}') or contains(text(), '${value.substring(0, 15)}')]`).first();
    if (await option.isVisible().catch(() => false)) {
      await option.click();
    } else {
      const spanOption = this.page.locator(`//span[contains(text(), '${value}') or contains(text(), '${value.substring(0, 15)}')]`).first();
      await spanOption.click();
    }
    await this.page.waitForTimeout(500).catch(() => {});
  }
}

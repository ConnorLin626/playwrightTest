import { Page, Locator } from '@playwright/test';

/**
 * 支付模板页面对象 - 基于 forAIstudy/src/pages/IDEALX/PayTransfer/PaymentTemplatesPage.ts
 * 对应 Protractor 中的 @component 装饰器定义
 */
export class PaymentTemplatesPage {
  private _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  private get page(): Page {
    return this._page;
  }

  // Template Center list - 对应 forAIstudy 第9-24行
  get paymentMenu(): Locator { return this.page.locator('//*[@id="nav-item-navBBTopPaymentsLinkText"]'); }
  get templateMenu(): Locator { return this.page.locator('//a[contains(@href,"#/transfers/manage-templates")]'); }
  get showAdditionFilter(): Locator { return this.page.locator("//*[@id='templateFilters']/label"); }
  get transactionStatusList(): Locator { return this.page.locator("//p-auto-complete[@formcontrolname='status']"); }
  get manageTemplateOrganisation(): Locator { return this.page.locator('//input[@name="manageTemplate-organisation"]'); }
  get manageTemplateFilter(): Locator { return this.page.locator('//input[@name="manage-template-filter"]'); }
  get makeAPaymentLink(): Locator { return this.page.locator('//a[@id="template-list-makeAPayment_0"]'); }
  get templateNameLink(): Locator { return this.page.locator('//a[@id="template-list-templateName_0"]'); }
  get FromAccountText(): Locator { return this.page.locator('//ng-component/div/create-templates/div[3]/template-list/div/div/div[2]/table/tbody/tr[1]/td[3]/div[1]'); }
  get showAdditonFilter(): Locator { return this.page.locator('//span[@id="templateFilters"]'); }
  get paymentTypeList(): Locator { return this.page.locator("//p-auto-complete[@formcontrolname='paymentTypeRec']"); }
  get searchButton(): Locator { return this.page.locator("//button[@name='search']"); }
  get createNewTemplateButton(): Locator { return this.page.locator('//*[@name="create-new-template"]'); }

  // 创建单个支付模板按钮 - 对应 forAIstudy 第25-42行
  get createSinglePaymentTemplateButton(): Locator { return this.page.locator('//a[@id="singleTemplate-SG"]'); }
  get createSingleVNPaymentTemplateBtn(): Locator { return this.page.locator('//a[@id="singleTemplate-VN"]'); }
  get createSingleIDPaymentTemplateBtn(): Locator { return this.page.locator('//a[@id="singleTemplate-ID"]'); }
  get createSingleCNPaymentTemplateBtn(): Locator { return this.page.locator('//a[@id="singleTemplate-CN"]'); }
  get createSingleGCPaymentTemplateBtn(): Locator { return this.page.locator('//a[@id="singleTemplate-GC"]'); }
  get createSingleHKPaymentTemplateBtn(): Locator { return this.page.locator('//a[@id="singleTemplate-HK"]'); }
  get createSinglePaymentTemplateTWButton(): Locator { return this.page.locator('//a[@id="singleTemplate-TW"]'); }

  // 创建批量模板按钮 - 对应 forAIstudy 第32-42行
  get createBulkTemplateButton(): Locator { return this.page.locator('//a[@id="payrollTemplate-SG"]'); }
  get createFISCBulkTemplateButton(): Locator { return this.page.locator('//a[@id="bulkTemplate-TW"]'); }
  get createHKBulkTemplateButton(): Locator { return this.page.locator('//a[@id="bulkTemplate-HK"]'); }
  get createMOFPSTemplateButton(): Locator { return this.page.locator('//a[@id="singleTemplate-MO"]'); }
  get createSgBulkTemplateButton(): Locator { return this.page.locator('//a[@id="bulkTemplate-SG"]'); }
  get createSgBulkColTemplateButton(): Locator { return this.page.locator('//a[@id="bulkCollTemplate-SG"]'); }
  get createSgCorChequeTemplateButton(): Locator { return this.page.locator('//a[@id="corporateChequeTemplate-SG"]'); }
  get createSgCDDTemplateButton(): Locator { return this.page.locator('//a[@id="demandDraftTemplate-SG"]'); }
  get createMT101TemplateButton(): Locator { return this.page.locator('//a[@id="manageTemplate-550"]'); }
  get createIDICTPaymentTemplateBtn(): Locator { return this.page.locator('//a[@id="manageTemplate-269"]'); }
  get createCrossBorderPaymentTemBtn(): Locator { return this.page.locator('//a[@id="manageTemplate-583"]'); }

  // 模板管理按钮 - 对应 forAIstudy 第43-50行
  get selectTemCheckBox(): Locator { return this.page.locator('//input[@name="manege-template-select-0"]'); }
  get deleteBtn(): Locator { return this.page.locator('//*[@name="delete"]'); }
  get preDeleteBtn(): Locator { return this.page.locator('//ng-component/div/confirm-templates/div[3]/div/button[2]'); }
  get approveBtn(): Locator { return this.page.locator('//*[@type="submit"]'); }
  get viewApproveBtn(): Locator { return this.page.locator('//*[@name="approve"]'); }
  get confirmApproveBtn(): Locator { return this.page.locator('//*[@name="Approve"]'); }
  get dismissBtn(): Locator { return this.page.locator('//*[@name="dismiss"]'); }
  get addNewPayeeBtn(): Locator { return this.page.locator('//*[@id="ux-tab-NEW"]'); }

  // 新收款人相关 - 对应 forAIstudy 第51-65行
  get selectedCountry(): Locator { return this.page.locator('//*[@formcontrolname="selectedCountry"]'); }
  get enterManually(): Locator { return this.page.locator('//*[@id="enterManual"]'); }
  get payeeBankName(): Locator { return this.page.locator('//*[@id="new-payee-bank-name-input"]'); }
  get payeeBankAdd1(): Locator { return this.page.locator('//input[@id="new-payee-bank-add1-input"]'); }
  get payeeBankAdd2(): Locator { return this.page.locator('//input[@id="new-payee-bank-add2-input"]'); }
  get newPayeeName(): Locator { return this.page.locator("//*[@name='new-payee-name']"); }
  get newPayeeNickName(): Locator { return this.page.locator("//*[@name='new-payee-nick-name']"); }
  get payeeLocation(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="country"]'); }
  get townCity(): Locator { return this.page.locator('//*[@name="townCity"]'); }
  get postalCode(): Locator { return this.page.locator('//*[@name="postal-code"]'); }
  get newPayeeAdd1(): Locator { return this.page.locator("//*[@name='new-payee-add1']"); }
  get newPayeeAdd2(): Locator { return this.page.locator("//*[@name='new-payee-add2']"); }
  get newPayeeAdd3(): Locator { return this.page.locator("//input[@name='new-payee-add3']"); }
  get newPayeeAcctNumber(): Locator { return this.page.locator("//input[@name='new-payee-acct-number']"); }

  // 待审批和编辑 - 对应 forAIstudy 第67-78行
  get pendingTable(): Locator { return this.page.locator('//*[@id="ux-tab-PENDING APPROVAL"]'); }
  get pendingTab(): Locator { return this.page.locator('//*[@id="ux-tab-TEMPLATE_PENDING"]'); }
  get pendingTableCount(): Locator { return this.page.locator('//*[@id="dbs-tab-count-PENDING APPROVAL"]'); }
  get EditTemplate(): Locator { return this.page.locator('//div[@id="bulk-viewTemp-edit"]'); }
  get EditTTTemplate(): Locator { return this.page.locator('//div[@id="ott-viewTemp-edit"]'); }
  get EditDometicTemplate(): Locator { return this.page.locator('//div[@id="domestic-viewTemp-edit"]'); }
  get templateOrganition(): Locator { return this.page.locator('//create-templates/div[2]/div/span[2]/p-auto-complete/div/div[2]/span'); }
  get showAll(): Locator { return this.page.locator('//create-templates/div[2]/div/span[2]/p-auto-complete/div/div[2]/ul/li[1]/div/span'); }
  get editACTTemplate(): Locator { return this.page.locator('//*[@id="act-viewTemp-edit"]'); }
  get dialogDelete(): Locator { return this.page.locator('//*[@id="dialogDelete"]'); }
  get createTempOrgSelect(): Locator { return this.page.locator('//organisation-label/div/div/div/div[2]/p-auto-complete/div/div[2]/span'); }
  get SCOrg(): Locator { return this.page.locator('//organisation-label/div/div/div/div[2]/p-auto-complete/div/div[2]/ul/li[1]/div/span'); }

  // 额外信息字段 - 对应 forAIstudy 第80-86行
  get PurposePaymentFiled(): Locator { return this.page.locator('//*[@formcontrolname="gstPurposeCode"]'); }
  get BeneTypeFiled(): Locator { return this.page.locator('//dbs-dropdown[@id="additionalInfo-drapdown0"]'); }
  get BeneType(): Locator { return this.page.locator('//*[@title="CO"]'); }
  get SourceFundFiled(): Locator { return this.page.locator('//dbs-dropdown[@id="additionalInfo-drapdown1"]'); }
  get SourceFund(): Locator { return this.page.locator('//*[@title="1"]'); }
  get RelationshipBeneFiled(): Locator { return this.page.locator('//dbs-dropdown[@id="additionalInfo-drapdown2"]'); }
  get RelationshipBene(): Locator { return this.page.locator('//*[@title="ContracteeContractor"]'); }

  // View Template page - 对应 forAIstudy 第92-116行
  get ViewTemplateName(): Locator { return this.page.locator('//div[@id="act-viewTemp-templateName"]'); }
  get templateStatus(): Locator { return this.page.locator('//div[@id="domestic-viewTemp-status"]'); }
  get cancelButton(): Locator { return this.page.locator('//button[@name="cancel"]'); }
  get templateTTStatus(): Locator { return this.page.locator('//div[@id="ott-viewTemp-status"]'); }
  get templateACTStatus(): Locator { return this.page.locator('//div[@id="act-viewTemp-status"]'); }
  get templateICTStatus(): Locator { return this.page.locator('//div[@id="ict-viewTemp-status"]'); }
  get templateDomesticStatus(): Locator { return this.page.locator('//div[@id="domestic-viewTemp-status"]'); }
  get PurposeCodeValue(): Locator { return this.page.locator('//*[@id="label-purpose-code"]'); }
  get tempToAccountNumberValue(): Locator { return this.page.locator('//*[@id="view-ott-existingPayee-acctNum"]'); }
  get sendAmountTTValue(): Locator { return this.page.locator('//*[@id="view-ott-sendAmount"]'); }
  get fromAccount(): Locator { return this.page.locator('//*[@id="domestic-view-accountNum"]'); }
  get amount(): Locator { return this.page.locator('//*[@id="domestic-view-sendAmount"]'); }
  get beneficiary(): Locator { return this.page.locator('//*[@id="domestic-view-existingPayee-name"]'); }
  get cardNumValue(): Locator { return this.page.locator('//*[@id="domestic-view-existingPayee-cardNum"]'); }
  get ViewPurposeCode(): Locator { return this.page.locator('//*[@id="label-gst-purpose-code"]'); }
  get ViewOTTaccount(): Locator { return this.page.locator('//*[@id="view-ott-accountNum"]'); }
  get ViewOTTbeneName(): Locator { return this.page.locator('//*[@id="view-ott-existingPayee-name"]'); }
  get ViewAmount(): Locator { return this.page.locator('//*[@id="view-ott-sendAmount"]'); }
  get ViewBeneType(): Locator { return this.page.locator('//*[@id="label-additional-information0"]'); }
  get ViewSourceFund(): Locator { return this.page.locator('//*[@id="label-additional-information1"]'); }
  get ViewRelationshipBene(): Locator { return this.page.locator('//*[@id="label-additional-information2"]'); }
  get ViewOTTPayeeBankName(): Locator { return this.page.locator('//*[@id="ott-view-payee-bankName"]'); }
  get ViewOTTPayeeBankAdd1(): Locator { return this.page.locator('//*[@id="ott-view-payee-bankAdd1"]'); }
  get ViewOTTPayeeBankAdd2(): Locator { return this.page.locator('//*[@id="ott-view-payee-bankAdd2"]'); }
  get toExistingPayeeNameValue(): Locator { return this.page.locator('//strong[@id="view-ott-existingPayee-name"]'); }

  // View Bulk Template - 对应 forAIstudy 第122-134行
  get bulkFromAccount(): Locator { return this.page.locator('//*[@id="bulk-viewTemp-accountNum"]'); }
  get bulkAmount(): Locator { return this.page.locator('//*[@id="bulk-viewTemp-maxAmount"]'); }
  get payeeFilter(): Locator { return this.page.locator('//input[@id="bulk-view-filter"]'); }
  get bulkPayeeAmount(): Locator { return this.page.locator('//*[@id="bulk-view-amount_0"]'); }
  get bulkBeneficiary(): Locator { return this.page.locator('//*[@id="bulk-view-name_0"]'); }
  get bulkBeneficiaryNickName(): Locator { return this.page.locator('//div[@id="bulk-view-nickName_0"]'); }
  get bulkPayNowMobNum(): Locator { return this.page.locator('//div[@id="paynow-proxy-mobNum-0"]'); }
  get bulkTransactionStatus(): Locator { return this.page.locator('//span[@id="bulk-viewTemp-status"]'); }
  get bulkTransactionPaymentType(): Locator { return this.page.locator('//label[@id="bulk-viewTemp-paymentType"]'); }
  get DebitTypeValue(): Locator { return this.page.locator('//ng-component/div/ng-component/div/div[1]/dbs-bulk-view-section/div/dbs-bp-view-summary-section/div[7]/span[2]'); }
  get TransactionCodeValue(): Locator { return this.page.locator('//*[@id="transaction-code-label"]'); }
  get ViewpayeeRef(): Locator { return this.page.locator('//*[@id="reference-for-payee"]'); }
  get ViewPaymentType(): Locator { return this.page.locator('//label[@id="bulk-viewTemp-paymentType"]'); }

  // View I3 Template page - 对应 forAIstudy 第137-140行
  get editI3Button(): Locator { return this.page.locator('//a[@id="editButton_Link"]'); }
  get cancelI3Button(): Locator { return this.page.locator('//a[@id="cancelButton_Link"]'); }
  get templateNameValue(): Locator { return this.page.locator('//span[@id="templateName"]'); }
  get makeAPayment(): Locator { return this.page.locator('//button[@name="make-payment"]'); }

  // View ACT Template - 对应 forAIstudy 第143-147行
  get fromAccountACT(): Locator { return this.page.locator('//span[@id="act-view-accountNum"]'); }
  get amountACT(): Locator { return this.page.locator('//label[@id="act-view-sendAmount"]'); }
  get toExistingPayeeNameACT(): Locator { return this.page.locator('//*[@id="act-view-existingPayee-acctName"]'); }
  get toNewPayeeNameACT(): Locator { return this.page.locator('//*[@id="act-view-newPayee-acctName"]'); }
  get toExistingPayeeAcctNumACT(): Locator { return this.page.locator('//*[@id="act-view-existingPayee-acctNum"]'); }

  // View ICT Template - 对应 forAIstudy 第150-153行
  get fromAccountICT(): Locator { return this.page.locator('//span[@id="ict-view-accountNum"]'); }
  get toAccountICT(): Locator { return this.page.locator('//span[@id="ict-view-payeeNum"]'); }
  get sendAmountValue(): Locator { return this.page.locator('//*[@id="ict-view-temp-sendAmount"]'); }
  get editTempButton(): Locator { return this.page.locator('//*[@id="ict-viewTemp-edit"]'); }

  // create template page - 对应 forAIstudy 第157-195行
  get existingPayeeFilter(): Locator { return this.page.locator('//*[@name="payee-selector"]'); }
  get existingPayee(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="payee"]'); }
  get nextButton(): Locator { return this.page.locator('//*[@name="next"]'); }
  get templateName(): Locator { return this.page.locator('//*[@name="templateName"]'); }
  get accountSelect(): Locator { return this.page.locator('//*[@formcontrolname="fromAccount"]'); }
  get chargeAccounts(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="chargeAccount"]'); }
  get currencySelect(): Locator { return this.page.locator('//*[@formcontrolname="currency"]'); }
  get payeeSelect(): Locator { return this.page.locator('//*[@formcontrolname="payee"]'); }
  get purposeCodeSelect(): Locator { return this.page.locator('//*[@formcontrolname="purposeCode"]'); }
  get filterRppc(): Locator { return this.page.locator('//input[@placeholder="Purpose code number or description"]'); }
  get selectFirstResult(): Locator { return this.page.locator('//*[@class="truncate-searchResult text-sm text-slate-950 flex-1"]'); }
  get purposeCodeInput(): Locator { return this.page.locator('//input[@name="purposeCode"]'); }
  get purposeCodeSelected(): Locator { return this.page.locator('//*[@id="select-item-(P0502) constr. works outside India"]/span'); }
  get IFSCcode(): Locator { return this.page.locator('//input[@name="new-payee-routing-code"]'); }
  get paymentDetail(): Locator { return this.page.locator('//*[@name="paymentDetail"]'); }
  get TxnRemark1(): Locator { return this.page.locator('//*[@name="ott-regulatory-advising-transRemark1"]'); }
  get addButton(): Locator { return this.page.locator('//*[@name="add"]'); }
  get bankCharges(): Locator { return this.page.locator('//input[@id="bank-charge-shared"]'); }
  get addPayeeFilter(): Locator { return this.page.locator('//*[@name="added-payees"]'); }
  get payeeAmount(): Locator { return this.page.locator('//input[@name="payeeAmount"]'); }
  get payeeRef(): Locator { return this.page.locator('//input[@name="payeeRef"]'); }
  get defaultAmount(): Locator { return this.page.locator('//input[@name="send-amount"]'); }
  get maxAmount(): Locator { return this.page.locator('//input[@name="max-amount"]'); }
  get submitButton(): Locator { return this.page.locator('//button[@name="submit"]'); }
  get finishButton(): Locator { return this.page.locator('//button[@name="finish"]'); }
  get newPayNowButton(): Locator { return this.page.locator('//li[@id="tabId_1"]'); }
  get newPayNowMobNum(): Locator { return this.page.locator('//input[@name="proxyTypeMobNumInput"]'); }
  get newPayNowNickName(): Locator { return this.page.locator('//input[@name="newPayNowNickName"]'); }
  get addPayeeButton(): Locator { return this.page.locator('//button[@name="add-payee"]'); }
  get debitTypeSelect(): Locator { return this.page.locator('//p-auto-complete[@formcontrolname="debitType"]'); }
  get TransactionValue(): Locator { return this.page.locator('//multi-level-dropdown[@formcontrolname="transactionCode"]'); }
  get submitBtn(): Locator { return this.page.locator('//button[@name="Submit"]'); }
  get RTGSType(): Locator { return this.page.locator('//*[@id="normal_type"]'); }
  get closBtn(): Locator { return this.page.locator('//*[@type="button"]'); }

  // new NAPAS Payee - 对应 forAIstudy 第192-195行
  get newNAPAS246Payee(): Locator { return this.page.locator('//*[@id="ux-tab-NEWNAPASPAYEE"]'); }
  get payToCardType(): Locator { return this.page.locator('//*[@name="payToType-CARD"]'); }
  get NewCardNum(): Locator { return this.page.locator('//*[@name="new-payee-card-number"]'); }
  get VerifyBtn(): Locator { return this.page.locator('//*[@name="Verify"]'); }

  // make payment page - 对应 forAIstudy 第197行
  get batchReference(): Locator { return this.page.locator('//span[@id="previewReference"]'); }

  // 删除对话框 - 对应 forAIstudy 第199-200行
  get deleteDialogButton(): Locator { return this.page.locator('//*[@id="dialogDelete"]'); }
  get dismissButton(): Locator { return this.page.locator('//button[@name="dismiss"]'); }

  /**
   * 选择下拉框选项 - 模拟用户操作：在输入框输入值后选择第一个结果
   * @param locator - 定位器
   * @param value - 要输入和选择的值
   */
  async selectOption(locator: Locator, value: string) {
    // 点击 input 元素打开下拉框
    const inputLocator = locator.locator('xpath=.//input').first();
    await inputLocator.click();
    await this.page.waitForTimeout(500).catch(() => {});
    
    // 清空输入框
    await inputLocator.clear();
    await this.page.waitForTimeout(200).catch(() => {});
    
    // 输入值
    await inputLocator.fill(value);
    await this.page.waitForTimeout(800).catch(() => {});
    
    // 获取 locator 所在的元素，用于限定搜索范围
    const parentElement = locator.first();
    
    // 定义选项选择器 - 选择第一个可见的选项
    const optionSelectors = [
      // Selector 1: ul/li[1]/div/span - 标准下拉选项的第一个
      `./ancestor::p-auto-complete//ul/li[1]/div/span`,
      // Selector 2: search-result容器中的第一个选项 - Swift Selector
      `./ancestor::p-auto-complete//div[contains(@class,'search-result-container')]//span[1]`,
      // Selector 3: div/div/span - 备选方案
      `./ancestor::p-auto-complete//div/div/span[1]`
    ];

    // 尝试选择第一个可见的选项
    for (const selector of optionSelectors) {
      try {
        const option = parentElement.locator(`xpath=${selector}`).first();
        if (await option.isVisible().catch(() => false)) {
          await option.click();
          await this.page.waitForTimeout(500).catch(() => {});
          console.log(`[PaymentTemplates选择] 成功选择第一个结果: ${value}`);
          return;
        }
      } catch (e) {
        continue;
      }
    }

    console.log(`[PaymentTemplates选择] 警告: 未找到下拉选项 "${value}"`);
  }

  /**
   * 等待页面加载完成
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await this.page.waitForTimeout(1000).catch(() => {});
  }
}

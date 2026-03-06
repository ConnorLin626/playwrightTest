/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../../lib";
import { browser } from "protractor";
let editReference = ""
let verifyReference = ""
let approveReference = ""
let releaseReference = ""
let reference = ""
let gstReference1 = ''
let templateName = ""
let newPayeeName = ""
let singleTemplateName = '';
let newJPYPayeeName = ""
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData_01.json');

//R8.20 IDXP-1835 Globesend
describe('HK Globesend payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create HK Globesend with new payee', async function () {
        this.timeout(420000);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.GlobesendPayment.fromAccount);
        await newPayee();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.HKgsPayment.jsClick();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClick();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.purposeCodeValue);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.informationline1.click();
        await _PaymentsPages.singlePaymentPage.informationline1Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline2.click();
        await _PaymentsPages.singlePaymentPage.informationline2Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline3.click();
        await _PaymentsPages.singlePaymentPage.informationline3Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.GlobesendPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.email.input(testData.GlobesendPayment.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        // await _PaymentsPages.singlePaymentPage.approveLaterBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await browser.sleep(2000);
        await checkViewPageAllField();
    });

    it('Create HK Globesend with Approve Now', async function () {
        await createGlobesend(true, false, false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(gstReference1);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.existingAUDPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.PartialApproved,testData.status.Completed,testData.status.BankRejected)
        ]);
    });

    it('Edit HK Globesend in the submit page', async function () {
        await createGlobesend(false, false, false);
        await _PaymentsPages.singlePaymentPage.editBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.verifyAmount);
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            verifyReference = text.trim();
        });
        console.log("globesend verifyref:"+verifyReference);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.existingAUDPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.verifyAmount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingVerification),
        ]);
    });
    //IDXP-2116
    it('Edit HK Globesend with new INR purpose code in the payment history page', async function () {
        await createGlobesend(false, false, false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await _PaymentsPages.TransferCentersPage.actionBtn.click();
        await _PaymentsPages.TransferCentersPage.actionEditBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingINRPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        //await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.verifyAmount);
        //await browser.sleep(3000);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.RPPClabel).textContains("Purpose of payment (Receiving party purpose code)"),
        ]);
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.INRPPC);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            editReference = text.trim();
        });
        console.log("globesend editref:"+verifyReference);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(editReference);
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.existingINRPayee),
            await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView).textContainsLessOne(testData.GlobesendPayment.INRPPC),
        ]);
    });

    it('Create Payment with save as template', async function () {
        await createGlobesend(false, true, false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        console.log(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.existingAUDPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForViewTTTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.templateNameValue).textIs(templateName),
            await ensure(_PaymentsPages.singlePaymentPage.acctNmValue).textContains(testData.GlobesendPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.amountValue).textContains(testData.GlobesendPayment.amount)
        ]);
    });

    it('Copy HK Globsemd in the view page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK - Globesend Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.copyBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).isNotEmpty(),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
    });
    //add for IDXP-2049
    it('create HK GlobeSend template', async function () {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
    await _PaymentsPages.PaymentTemplatesPage.createSingleHKPaymentTemplateBtn.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
    singleTemplateName = 'GSTPayment' + generatedID();
    await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
    await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(testData.GlobesendPayment.fromAccount);
    await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.GlobesendPayment.amount);
    await _PaymentsPages.PaymentTemplatesPage.currencySelect.select(testData.GlobesendPayment.ccyNew);
    await _PaymentsPages.PaymentTemplatesPage.addNewPayeeBtn.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.selectedCountry.select(testData.GlobesendPayment.payeeLocation);
    await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.GlobesendPayment.bankID); 
    newPayeeName = 'GSTNewPayeeName' + generatedID();
    await _PaymentsPages.PaymentTemplatesPage.newPayeeName.input(newPayeeName);
    await _PaymentsPages.PaymentTemplatesPage.newPayeeNickName.input(newPayeeName);
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd1.input(testData.GlobesendPayment.add1Value);
    await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd2.input(testData.GlobesendPayment.add1Value);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.PaymentTemplatesPage.IFSCcode.input(testData.GlobesendPayment.routingCodeValue),      
    await _PaymentsPages.PaymentTemplatesPage.newPayeeAcctNumber.input(testData.GlobesendPayment.acctNumberValue);
    await _PaymentsPages.AutoPayPaymentPage.chargeAccount.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
    await _PaymentsPages.PaymentTemplatesPage.PurposePaymentFiled.click();
    await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.PurposePaymentFiled);
    await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
    await _PaymentsPages.PaymentTemplatesPage.BeneTypeFiled.click();
    await _PaymentsPages.PaymentTemplatesPage.BeneType.click();
    await _PaymentsPages.PaymentTemplatesPage.SourceFundFiled.click();
    await _PaymentsPages.PaymentTemplatesPage.SourceFund.click();
     await _PaymentsPages.PaymentTemplatesPage.RelationshipBeneFiled.click();
    await _PaymentsPages.PaymentTemplatesPage.RelationshipBene.click();

    await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
    await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
    await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.ViewOTTaccount).textContains(testData.GlobesendPayment.fromAccount),
        await ensure(_PaymentsPages.PaymentTemplatesPage.ViewAmount).textContains(testData.GlobesendPayment.amount),
        await ensure(_PaymentsPages.PaymentTemplatesPage.ViewOTTbeneName).textContains(newPayeeName),
        await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.PaymentTemplatesPage.ViewPurposeCode).textContains(testData.GlobesendPayment.PurposePaymentFiled),
        await ensure(_PaymentsPages.PaymentTemplatesPage.ViewBeneType).textContains(testData.GlobesendPayment.BeneTypeFiled),
        await ensure(_PaymentsPages.PaymentTemplatesPage.ViewSourceFund).textContains(testData.GlobesendPayment.SourceFundFiled),
        await ensure(_PaymentsPages.PaymentTemplatesPage.ViewRelationshipBene).textContains(testData.GlobesendPayment.RelationshipBeneFiled),
        
    ]);    
    });
    //add for IDXP-2275
    it('Create HK Globesend with CNY Payee', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.GlobesendPayment.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccyCNY);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingCNYPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.HKgsPayment.jsClick();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClick();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.purposeCodeValue);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        /*
        await _PaymentsPages.singlePaymentPage.informationline1.click();
        await _PaymentsPages.singlePaymentPage.informationline1Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline2.click();
        await _PaymentsPages.singlePaymentPage.informationline2Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline3.click();
        await _PaymentsPages.singlePaymentPage.informationline3Value.jsClickIfExist();
        */
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.GlobesendPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.email.input(testData.GlobesendPayment.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        // await _PaymentsPages.singlePaymentPage.approveLaterBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
         await Promise.all([
        await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.GlobesendPayment.ccyCNY),
        await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
        await ensure(_PaymentsPages.singlePaymentPage.deductCcy).textContains(testData.GlobesendPayment.deductCcyValue),
        await ensure(_PaymentsPages.singlePaymentPage.deductAmt).textContains(testData.GlobesendPayment.deductAmountValue),
        await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.existingCNYPayee),
        await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.GlobesendPayment.acctNumberValue),
        await ensure(_PaymentsPages.singlePaymentPage.add1View).textContains(testData.GlobesendPayment.add1Value),
        await ensure(_PaymentsPages.singlePaymentPage.add2View).textContains(testData.GlobesendPayment.add2Value),
        await ensure(_PaymentsPages.singlePaymentPage.PaymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.singlePaymentPage.HashView).isNotEmpty(),
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await ensure(_PaymentsPages.singlePaymentPage.bankNameView).textContains(testData.GlobesendPayment.cnyBankValue),
        await ensure(_PaymentsPages.singlePaymentPage.bankLocationValue).textContains(testData.GlobesendPayment.CNPayeeLocation),
        await ensure(_PaymentsPages.singlePaymentPage.bankSWIFTBICView).textContains(testData.GlobesendPayment.CNbankID),
        await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView).textContains(testData.GlobesendPayment.CNpurposeCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.paidByView).textContains(testData.GlobesendPayment.paidByVlue),
        await ensure(_PaymentsPages.singlePaymentPage.chargView).textContains(testData.GlobesendPayment.chargViewValue),
        //await ensure(_PaymentsPages.singlePaymentPage.gstDetailTopayee).textContains(testData.GlobesendPayment.detailsToPayeeValue),
        await ensure(_PaymentsPages.singlePaymentPage.emailValue).textContains(testData.GlobesendPayment.emailValue),
    ]);
    });
    //Add for IDXP-2299
    it('Create HK Globsend with JPY and use existing payee that without routing code', async function () {
        await createJPYNewPayee(true);
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId02 : testData.GlobesendPayment.UAT.loginUserId02, "123123");
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.GlobesendPayment.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.jpyCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(newJPYPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.HKgsPayment.jsClick();
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.RoutingCode.input(testData.GlobesendPayment.routingCodeValueJPY);
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.oldinformationline1.input(testData.GlobesendPayment.oldaddInfor1);
        await _PaymentsPages.singlePaymentPage.oldinformationline2.input(testData.GlobesendPayment.oldaddInfor2);
        await _PaymentsPages.singlePaymentPage.oldinformationline3.input(testData.GlobesendPayment.oldaddInfor3);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        //await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newJPYPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCodeValueJPY),
        ]);
    });

    it('Check payee routing code still empty in view payee page', async function () {
        //go to payee list check
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newJPYPayeeName);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.routingCodeValue).textIs("-"),
        ]);
        });

     it('Create HK Globsend with JPY and use existing payee that account number more than 7 digits', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, "123123"); 
        await createJPYNewPayee(false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.GlobesendPayment.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.jpyCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(newJPYPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.HKgsPayment.jsClick();
        await _PaymentsPages.singlePaymentPage.confirmDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.acctNum.input(testData.GlobesendPayment.newPayeeAcctNumber);
        await _PaymentsPages.singlePaymentPage.saveAction.click();
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.oldinformationline1.input(testData.GlobesendPayment.oldaddInfor1);
        await _PaymentsPages.singlePaymentPage.oldinformationline2.input(testData.GlobesendPayment.oldaddInfor2);
        await _PaymentsPages.singlePaymentPage.oldinformationline3.input(testData.GlobesendPayment.oldaddInfor3);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        //await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newJPYPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.GlobesendPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCodeValueJPY),
        ]);
    });

    it('Check payee account number has been updated in view payee page', async function () {
        //go to payee list check
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newJPYPayeeName);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.accountNumValue).textIs(testData.GlobesendPayment.newPayeeAcctNumber),
            
        ]);
        await deletePayee(newJPYPayeeName);
    });
});

describe('HK Globesend Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.verifyUserId : testData.GlobesendPayment.UAT.verifyUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('View HK Globesend screen do Verify', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);

        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK - Globesend Transfer", testData.status.PendingVerification);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.verifyReleaseBtn.click();
        await _PaymentsPages.singlePaymentPage.verifyReleaseDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            approveReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approveReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval)
        ]);
    });

    it('View HK Globesend screen do Approve', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== approveReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approveReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK- Globesend Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            releaseReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(releaseReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release HK Globesend in the release list page', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewByTx();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(releaseReference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.txnReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

let newPayee = async function () {
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccyNew);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.addNewPayee.click();
    await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.GlobesendPayment.payeeLocation);
    await _PaymentsPages.singlePaymentPage.payeeBankSearch.click();
    await browser.sleep(2000);
    await _PaymentsPages.singlePaymentPage.payeeBankIdInput.input(testData.GlobesendPayment.bankID);
    await _PaymentsPages.singlePaymentPage.bankIdValueSelect.click();
    await _PaymentsPages.singlePaymentPage.RoutingCode.click();
    await _PaymentsPages.singlePaymentPage.RoutingCode.input(testData.GlobesendPayment.routingCodeValue);
    await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.GlobesendPayment.acctNumberValue);
    newPayeeName = 'newPayeeName' + generatedID();
    await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
    await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
    await _PaymentsPages.singlePaymentPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.singlePaymentPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.singlePaymentPage.add1.input(testData.GlobesendPayment.add1Value);
    await _PaymentsPages.singlePaymentPage.add2.input(testData.GlobesendPayment.add2Value);
    await _PaymentsPages.singlePaymentPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
    await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();
};

let existingPayee = async function () {
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingAUDPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
};

let createGlobesend = async function (isApproveNow = false, isSaveAsTemplate = false, createWithVerify = false) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.GlobesendPayment.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccy);
    await existingPayee();
    await _PaymentsPages.singlePaymentPage.amount.input(createWithVerify ? testData.GlobesendPayment.verifyAmount : testData.GlobesendPayment.amount);
    await browser.sleep(3000);
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    if (isApproveNow) {
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            gstReference1 = text.trim();
        });
    } else {
        if (isSaveAsTemplate) {
            await _PaymentsPages.singlePaymentPage.saveAsTemplateBtn.jsClick();
           templateName = 'HKGlobesend' + generatedID();
            await _PaymentsPages.singlePaymentPage.templateName.input(templateName);
            await _PaymentsPages.singlePaymentPage.submitBtn.click();
            await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
            await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
            await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
                reference = text.trim();
                console.log("globesend tempref:"+reference);
            });
        } else {
            await _PaymentsPages.singlePaymentPage.submitBtn.click();
            await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
            await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
            await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
                reference = text.trim();
                console.log("globesend ref:"+reference);
            });
        }
    }
};

let createJPYNewPayee = async function (isCheckRoutingCode : boolean) {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.createNewPayee.jsClick();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BeneficiaryPage.loadConditionForCreateBenePage();
    await _PaymentsPages.BeneficiaryPage.selectedCountry.select(testData.GlobesendPayment.Country);
    await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.GlobesendPayment.newPayeeBankId);
    if(!isCheckRoutingCode){
        await _PaymentsPages.BeneficiaryPage.payeeRoutingCode.input(testData.GlobesendPayment.routingCodeValueJPY);
    }
    await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(isCheckRoutingCode ? testData.GlobesendPayment.newPayeeAcctNumber:testData.GlobesendPayment.newPayeeAcctNumber1);
    newJPYPayeeName = 'JPYnewPayee' + generatedID();
    await _PaymentsPages.BeneficiaryPage.newPayeeName.input(newJPYPayeeName);
    await _PaymentsPages.BeneficiaryPage.newPayeeNickName.input(newJPYPayeeName);
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd1.input(testData.GlobesendPayment.newPayeeAdd1);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.GlobesendPayment.newPayeeAdd2);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.BeneficiaryPage.next.click();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newJPYPayeeName);
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    if(isCheckRoutingCode){
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.routingCodeValue).textIs("-")
            ]);
    }else{
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.accountNumValue).textIs(testData.GlobesendPayment.newPayeeAcctNumber1)  
        ]);
    }    
}

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.GlobesendPayment.ccyNew),
        await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
        await ensure(_PaymentsPages.singlePaymentPage.deductCcy).textContains(testData.GlobesendPayment.deductCcyValue),
        await ensure(_PaymentsPages.singlePaymentPage.deductAmt).textContains(testData.GlobesendPayment.deductAmountValue),
        await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.GlobesendPayment.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
        await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.GlobesendPayment.acctNumberValue),
        await ensure(_PaymentsPages.singlePaymentPage.add1View).textContains(testData.GlobesendPayment.add1Value),
        await ensure(_PaymentsPages.singlePaymentPage.add2View).textContains(testData.GlobesendPayment.add2Value),
        await ensure(_PaymentsPages.singlePaymentPage.PaymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.singlePaymentPage.HashView).isNotEmpty(),
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await ensure(_PaymentsPages.singlePaymentPage.bankNameView).textContains(testData.GlobesendPayment.bankNameValue),
        await ensure(_PaymentsPages.singlePaymentPage.bankLocationValue).textContains(testData.GlobesendPayment.payeeLocation),
        await ensure(_PaymentsPages.singlePaymentPage.bankSWIFTBICView).textContains(testData.GlobesendPayment.bankID),
        await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView).textContains(testData.GlobesendPayment.purposeCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.paidByView).textContains(testData.GlobesendPayment.paidByVlue),
        await ensure(_PaymentsPages.singlePaymentPage.chargView).textContains(testData.GlobesendPayment.chargViewValue),
        await ensure(_PaymentsPages.singlePaymentPage.inforLine1View).textContains(testData.GlobesendPayment.addInfor1),
        await ensure(_PaymentsPages.singlePaymentPage.gstDetailTopayee).textContains(testData.GlobesendPayment.detailsToPayeeValue),
        await ensure(_PaymentsPages.singlePaymentPage.emailValue).textContains(testData.GlobesendPayment.emailValue),
    ]);
}

export async function deletePayee(payeeName : string) {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(payeeName);
        if(!SIT){
            await browser.sleep(2000);
        }
        await _PaymentsPages.BeneficiaryPage.deletePayeeBtn.click();
        // if(!SIT){
        //     await _PaymentsPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        // }
        await _PaymentsPages.BeneficiaryPage.confirmDelete.click();
        // if(!SIT){
        //     await _PaymentsPages.BeneficiaryPage.loadConditionForDismissButton();  
        // }
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
}


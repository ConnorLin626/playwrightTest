import { browser } from 'protractor';
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../../../pages/IDEALX';
import { handlerCase, SIT, PROJECT_TYPE, ensure ,generatedID, devWatch} from '../../../lib';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let uploadTestData = _PaymentsPages.fetchTestData('uploadTestData/IN_uploadTestData.json');

let reference = ""; // Challan 280,  Maharashtra state tax - PTEC， Customs duty
let reference1 = ""; // Karnataka State Tax - KPT
let verifyReference = '';
let approvalReference = '';
let paymentType = "";
let fileName = '';
let referenceEdit='';
let referenceA = '';//Maharashtra state tax - PTRC
let referenceB = '';//Maharashtra state tax - PTRC

describe('IN_ETAX Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ETAXPayment.SIT.loginCompanyId : testData.ETAXPayment.UAT.loginCompanyId, SIT ? testData.ETAXPayment.SIT.loginUserId : testData.ETAXPayment.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Challan 280 with all fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.newIntaxPayment.click();
        await _PaymentsPages.ETAXPaymentPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.TaxType.select(testData.ETAXPayment.TaxType1);
        await _PaymentsPages.ETAXPaymentPage.TaxState.select(testData.ETAXPayment.TaxStateValue);
        await _PaymentsPages.ETAXPaymentPage.CityName.input(testData.ETAXPayment.CityValue);
        await _PaymentsPages.ETAXPaymentPage.TaxPinCode.input(testData.ETAXPayment.PinCodeValue);
        await _PaymentsPages.ETAXPaymentPage.PanNo.input(testData.ETAXPayment.PanNoValue);
        await _PaymentsPages.ETAXPaymentPage.AddPaymentDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.AssessmentYear.select(testData.ETAXPayment.AssessmentYearValue);
        await _PaymentsPages.ETAXPaymentPage.TaxApplicable.select(testData.ETAXPayment.TaxApplicableValue);
        await _PaymentsPages.ETAXPaymentPage.TypeOfPayment.select(testData.ETAXPayment.TypeOfPaymentValue);
        await _PaymentsPages.ETAXPaymentPage.OptionalField1.input(testData.ETAXPayment.OptionalField1Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField2.input(testData.ETAXPayment.OptionalField2Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField3.input(testData.ETAXPayment.OptionalField3Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField4.input(testData.ETAXPayment.OptionalField4Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField5.input(testData.ETAXPayment.OptionalField5Value);
        await _PaymentsPages.ETAXPaymentPage.ShowDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.Tax.input(testData.ETAXPayment.TaxValue);
        await _PaymentsPages.ETAXPaymentPage.Surcharge.input(testData.ETAXPayment.SurchargeValue);
        await _PaymentsPages.ETAXPaymentPage.EducationCess.input(testData.ETAXPayment.EducationCessValue);
        await _PaymentsPages.ETAXPaymentPage.Interest.input(testData.ETAXPayment.InterestValue);
        await _PaymentsPages.ETAXPaymentPage.Penalty.input(testData.ETAXPayment.PenaltyValue);
        await _PaymentsPages.ETAXPaymentPage.FromAccount.select(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount);
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.ETAXPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await checkViewTAXPageAllField(false);//Add for IDXP-812
    });
    
    it('Edit Challan 280',async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - Tax Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.ETAXPaymentPage.loadConditionForViewETAXPaymentPage();
        await _PaymentsPages.ETAXPaymentPage.editButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.TaxPinCode.clean();
        await _PaymentsPages.ETAXPaymentPage.TaxPinCode.input(testData.ETAXPayment.PinCodeValueEdit);
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.ETAXPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, referenceEdit);
        if(referenceEdit==reference){
            await checkViewTAXPageAllField(true);//Add for IDXP-812
        }else{
            await ensure(_PaymentsPages.ETAXPaymentPage.pinCodeValue).textContains(testData.ETAXPayment.PinCodeValueEdit)
        }
    })

    it('Create Challan 281 via upload FS', async function () {
        paymentType = "India e-Tax - Direct tax - ";
        //approvalOption = "By transaction";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload6(_FilesPages, paymentType, SIT ? testData.ETAXPayment.SIT.fileName1 : testData.ETAXPayment.UAT.fileName1).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForViewETAXPaymentPage();
        await checkViewPageAllField(); //IDXP-812
    });

    it('Create Challan 282 via upload FS', async function () {
        paymentType = "India e-Tax - Direct tax - ";
        //approvalOption = "By transaction";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload6(_FilesPages, paymentType, SIT ? testData.ETAXPayment.SIT.fileName2 : testData.ETAXPayment.UAT.fileName2).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.FromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
            await ensure(_FilesPages.uploadFilePage.Amount).textContains(testData.ETAXPayment.amount),
            await ensure(_FilesPages.uploadFilePage.FSviewPaymentType).textContains(testData.ETAXPayment.ViewPaymentType7),
        ]);
    });

    it('Create Challan 283 via upload FS', async function () {
        paymentType = "India e-Tax - Direct tax - ";
        //approvalOption = "By transaction";
        await _FilesPages.uploadFilePage.fsUpload6(_FilesPages, paymentType, SIT ? testData.ETAXPayment.SIT.fileName3 : testData.ETAXPayment.UAT.fileName3).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.FromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
            await ensure(_FilesPages.uploadFilePage.Amount).textContains(testData.ETAXPayment.amount),
            await ensure(_FilesPages.uploadFilePage.FSviewPaymentType).textContains(testData.ETAXPayment.ViewPaymentType8),
        ]);
    });

    it('Create Karnataka State Tax - KPT with all fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.newIntaxPayment.click();
        await _PaymentsPages.ETAXPaymentPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.TaxType.select(testData.ETAXPayment.TaxType2);
        await _PaymentsPages.ETAXPaymentPage.TaxState.select(testData.ETAXPayment.TaxStateValue);
        await _PaymentsPages.ETAXPaymentPage.CityName.input(testData.ETAXPayment.CityValue);
        await _PaymentsPages.ETAXPaymentPage.TaxPinCode.input(testData.ETAXPayment.PinCodeValue);
        await _PaymentsPages.ETAXPaymentPage.AddPaymentDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.DealerType.select(testData.ETAXPayment.DealerTypeValue);
        await _PaymentsPages.ETAXPaymentPage.ECNo.input(testData.ETAXPayment.ECNumberValue);
        await _PaymentsPages.ETAXPaymentPage.Office.input(testData.ETAXPayment.OfficeValue);
        await _PaymentsPages.ETAXPaymentPage.MobileNo.input(testData.ETAXPayment.MobileNoValue);
        await _PaymentsPages.ETAXPaymentPage.Period.select(testData.ETAXPayment.PeriodValue);
        await _PaymentsPages.ETAXPaymentPage.Year.select(testData.ETAXPayment.YearValue);
        await _PaymentsPages.ETAXPaymentPage.OrderNo.input(testData.ETAXPayment.OrderNoValue);
        await _PaymentsPages.ETAXPaymentPage.OrderDate.input(testData.ETAXPayment.OrderDateValue);
        await _PaymentsPages.ETAXPaymentPage.Designation.input(testData.ETAXPayment.DesignationValue);
        await _PaymentsPages.ETAXPaymentPage.OptionalField1.input(testData.ETAXPayment.OptionalField1Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField2.input(testData.ETAXPayment.OptionalField2Value);
        await _PaymentsPages.ETAXPaymentPage.ShowDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.taxAmount.input(testData.ETAXPayment.TaxValue);
        await _PaymentsPages.ETAXPaymentPage.Interest.input(testData.ETAXPayment.InterestValue);
        await _PaymentsPages.ETAXPaymentPage.Penalty.input(testData.ETAXPayment.PenaltyValue);
        await _PaymentsPages.ETAXPaymentPage.OtherAmount.input(testData.ETAXPayment.OtherValue);
        await _PaymentsPages.ETAXPaymentPage.FromAccount.select(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount);
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.ETAXPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
        });
        await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference1);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewfromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewAmount).textContains(testData.ETAXPayment.VerifyAmount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textIs(testData.status.PendingVerification),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewPaymentType).textIs(testData.ETAXPayment.ViewPaymentType2),
        ]);
    });

    it('Create Maharashtra state tax - PTRC with all fields and muti item via approve now - step1', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.newIntaxPayment.click();
        await _PaymentsPages.ETAXPaymentPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.TaxType.select(testData.ETAXPayment.TaxType3);
        await _PaymentsPages.ETAXPaymentPage.TaxState.select(testData.ETAXPayment.TaxStateValue);
        await _PaymentsPages.ETAXPaymentPage.CityName.input(testData.ETAXPayment.CityValue);
        await _PaymentsPages.ETAXPaymentPage.TaxPinCode.input(testData.ETAXPayment.PinCodeValue);
        await _PaymentsPages.ETAXPaymentPage.TinNo.input(testData.ETAXPayment.PTRCTinNo);
        await _PaymentsPages.ETAXPaymentPage.AddPaymentDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.Account.input(testData.ETAXPayment.PTRCAccountValue);
        await _PaymentsPages.ETAXPaymentPage.formId.input(testData.ETAXPayment.formIdValue);
        await _PaymentsPages.ETAXPaymentPage.financialYear.input(testData.ETAXPayment.financialYearValue);
        await _PaymentsPages.ETAXPaymentPage.PeriodMonths.select(testData.ETAXPayment.MonthsValue);
        await _PaymentsPages.ETAXPaymentPage.Year.select(testData.ETAXPayment.Year);
        referenceA = testData.ETAXPayment.PTRCRef + generatedID();
        await _PaymentsPages.ETAXPaymentPage.paymentRef.input(referenceA);
        await _PaymentsPages.ETAXPaymentPage.taxPeriod.select(testData.ETAXPayment.taxPeriodValue);
        await _PaymentsPages.ETAXPaymentPage.period.select(testData.ETAXPayment.periodValue);
        await _PaymentsPages.ETAXPaymentPage.OptionalField1.input(testData.ETAXPayment.OptionalField1Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField2.input(testData.ETAXPayment.OptionalField2Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField3.input(testData.ETAXPayment.OptionalField3Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField4.input(testData.ETAXPayment.OptionalField4Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField5.input(testData.ETAXPayment.OptionalField5Value);
        await _PaymentsPages.ETAXPaymentPage.ShowDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.amountOfTax.input(testData.ETAXPayment.amountOfTaxValue);
        await _PaymentsPages.ETAXPaymentPage.amountOfTds.input(testData.ETAXPayment.amountOfTdsValue);
        await _PaymentsPages.ETAXPaymentPage.Interest.input(testData.ETAXPayment.InterestValue);
        await _PaymentsPages.ETAXPaymentPage.Penalty.input(testData.ETAXPayment.PenaltyValue);
        await _PaymentsPages.ETAXPaymentPage.compositionMoney.input(testData.ETAXPayment.compositionMoneyValue);
        await _PaymentsPages.ETAXPaymentPage.fine.input(testData.ETAXPayment.fineValue);
        await _PaymentsPages.ETAXPaymentPage.fees.input(testData.ETAXPayment.feesValue);
        await _PaymentsPages.ETAXPaymentPage.advancePayment.input(testData.ETAXPayment.advancePaymentValue);
        await _PaymentsPages.ETAXPaymentPage.amountForfeited.input(testData.ETAXPayment.amountForfeitedValue);
        await _PaymentsPages.ETAXPaymentPage.deposit.input(testData.ETAXPayment.depositValue);
        await _PaymentsPages.ETAXPaymentPage.AddPaymentDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.Account.input(testData.ETAXPayment.PTRCAccountValue);
        await _PaymentsPages.ETAXPaymentPage.formId.input(testData.ETAXPayment.formIdValue);
        await _PaymentsPages.ETAXPaymentPage.financialYear.input(testData.ETAXPayment.financialYearValue);
        await _PaymentsPages.ETAXPaymentPage.PeriodMonths.select(testData.ETAXPayment.MonthsValue);
        await _PaymentsPages.ETAXPaymentPage.Year.select(testData.ETAXPayment.Year);
    });

    
    it('Create Maharashtra state tax - PTRC with all fields and muti item via approve now - step2', async function () {
        referenceB = testData.ETAXPayment.PTRCRef + generatedID();
        await _PaymentsPages.ETAXPaymentPage.paymentRef.input(referenceB);
        await _PaymentsPages.ETAXPaymentPage.taxPeriod.select(testData.ETAXPayment.taxPeriodValue);
        await _PaymentsPages.ETAXPaymentPage.period.select(testData.ETAXPayment.periodValue);
        await _PaymentsPages.ETAXPaymentPage.OptionalField1.input(testData.ETAXPayment.OptionalField1Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField2.input(testData.ETAXPayment.OptionalField2Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField3.input(testData.ETAXPayment.OptionalField3Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField4.input(testData.ETAXPayment.OptionalField4Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField5.input(testData.ETAXPayment.OptionalField5Value);
        await _PaymentsPages.ETAXPaymentPage.ShowDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.amountOfTax.input(testData.ETAXPayment.amountOfTaxValue);
        await _PaymentsPages.ETAXPaymentPage.amountOfTds.input(testData.ETAXPayment.amountOfTdsValue);
        await _PaymentsPages.ETAXPaymentPage.Interest.input(testData.ETAXPayment.InterestValue);
        await _PaymentsPages.ETAXPaymentPage.Penalty.input(testData.ETAXPayment.PenaltyValue);
        await _PaymentsPages.ETAXPaymentPage.compositionMoney.input(testData.ETAXPayment.compositionMoneyValue);
        await _PaymentsPages.ETAXPaymentPage.fine.input(testData.ETAXPayment.fineValue);
        await _PaymentsPages.ETAXPaymentPage.fees.input(testData.ETAXPayment.feesValue);
        await _PaymentsPages.ETAXPaymentPage.advancePayment.input(testData.ETAXPayment.advancePaymentValue);
        await _PaymentsPages.ETAXPaymentPage.amountForfeited.input(testData.ETAXPayment.amountForfeitedValue);
        await _PaymentsPages.ETAXPaymentPage.deposit.input(testData.ETAXPayment.depositValue);
        await _PaymentsPages.ETAXPaymentPage.FromAccount.select(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount);
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        //Due to AB-15158 remove approve now when has muti item
        // await _PaymentsPages.ETAXPaymentPage.approveNowCheckbox.jsClick();
        // await _PaymentsPages.ETAXPaymentPage.approveNowBtn.click();
        // await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        // await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceA);
        console.log("referenceA"+referenceA);
        await browser.sleep(3000);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewfromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewAmount).textContains(testData.ETAXPayment.amount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewPaymentType).textIs(testData.ETAXPayment.ViewPaymentType3),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(referenceB);
        await browser.sleep(1000);
        await _PaymentsPages.TransferCentersPage.refLink.jsClick();
        console.log("referenceB"+referenceB);
        await browser.sleep(3000);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewfromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewAmount).textContains(testData.ETAXPayment.amount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewPaymentType).textIs(testData.ETAXPayment.ViewPaymentType3),
        ]);
    });

    it('Create Maharashtra state tax - PTEC with all fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.newIntaxPayment.click();
        await _PaymentsPages.ETAXPaymentPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.TaxType.select(testData.ETAXPayment.TaxType4);
        await _PaymentsPages.ETAXPaymentPage.TaxState.select(testData.ETAXPayment.TaxStateValue);
        await _PaymentsPages.ETAXPaymentPage.CityName.input(testData.ETAXPayment.CityValue);
        await _PaymentsPages.ETAXPaymentPage.TaxPinCode.input(testData.ETAXPayment.PinCodeValue);
        await _PaymentsPages.ETAXPaymentPage.TinNo.input(testData.ETAXPayment.PTECTinNo);
        await _PaymentsPages.ETAXPaymentPage.AddPaymentDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.Account.input(testData.ETAXPayment.PTECAccountValue);
        await _PaymentsPages.ETAXPaymentPage.formId.input(testData.ETAXPayment.formIdValue);
        await _PaymentsPages.ETAXPaymentPage.financialYear.input(testData.ETAXPayment.financialYearValue);
        await _PaymentsPages.ETAXPaymentPage.periodFromMonth.select(testData.ETAXPayment.periodFromMonthValue);
        await _PaymentsPages.ETAXPaymentPage.periodFromYear.input(testData.ETAXPayment.periodFromYearValue);
        await _PaymentsPages.ETAXPaymentPage.periodToMonth.select(testData.ETAXPayment.periodToMonthValue);
        await _PaymentsPages.ETAXPaymentPage.periodToYear.input(testData.ETAXPayment.periodToYearValue);
        await _PaymentsPages.ETAXPaymentPage.taxPeriod.select(testData.ETAXPayment.taxPeriodValue);
        await _PaymentsPages.ETAXPaymentPage.period.select(testData.ETAXPayment.periodValue);
        await _PaymentsPages.ETAXPaymentPage.OptionalField1.input(testData.ETAXPayment.OptionalField1Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField2.input(testData.ETAXPayment.OptionalField2Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField3.input(testData.ETAXPayment.OptionalField3Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField4.input(testData.ETAXPayment.OptionalField4Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField5.input(testData.ETAXPayment.OptionalField5Value);
        await _PaymentsPages.ETAXPaymentPage.ShowDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.amountOfTax.input(testData.ETAXPayment.amountOfTaxValue);
        await _PaymentsPages.ETAXPaymentPage.amountOfTds.input(testData.ETAXPayment.amountOfTdsValue);
        await _PaymentsPages.ETAXPaymentPage.Interest.input(testData.ETAXPayment.InterestValue);
        await _PaymentsPages.ETAXPaymentPage.Penalty.input(testData.ETAXPayment.PenaltyValue);
        await _PaymentsPages.ETAXPaymentPage.compositionMoney.input(testData.ETAXPayment.compositionMoneyValue);
        await _PaymentsPages.ETAXPaymentPage.fine.input(testData.ETAXPayment.fineValue);
        await _PaymentsPages.ETAXPaymentPage.fees.input(testData.ETAXPayment.feesValue);
        await _PaymentsPages.ETAXPaymentPage.advancePayment.input(testData.ETAXPayment.advancePaymentValue);
        await _PaymentsPages.ETAXPaymentPage.amountForfeited.input(testData.ETAXPayment.amountForfeitedValue);
        await _PaymentsPages.ETAXPaymentPage.deposit.input(testData.ETAXPayment.depositValue);
        await _PaymentsPages.ETAXPaymentPage.FromAccount.select(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount);
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.ETAXPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewfromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewAmount).textContains(testData.ETAXPayment.amount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewPaymentType).textIs(testData.ETAXPayment.ViewPaymentType4),
        ]);
    });

    it('Create Customs duty with all fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.newIntaxPayment.click();
        await _PaymentsPages.ETAXPaymentPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.TaxType.select(testData.ETAXPayment.TaxType5);
        await _PaymentsPages.ETAXPaymentPage.TaxState.select(testData.ETAXPayment.TaxStateValue);
        await _PaymentsPages.ETAXPaymentPage.CityName.input(testData.ETAXPayment.CityValue);
        await _PaymentsPages.ETAXPaymentPage.TaxPinCode.input(testData.ETAXPayment.PinCodeValue);
        await _PaymentsPages.ETAXPaymentPage.AddPaymentDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.importExportCode.input(testData.ETAXPayment.importExportCodeValue);
        await _PaymentsPages.ETAXPaymentPage.importExportName.input(testData.ETAXPayment.importExportNameValue);
        await _PaymentsPages.ETAXPaymentPage.portCode.select(testData.ETAXPayment.portCodeValue);
        await _PaymentsPages.ETAXPaymentPage.billOfEntryNumber.input(testData.ETAXPayment.billOfEntryNumberValue);
        await _PaymentsPages.ETAXPaymentPage.billOfEntryDate.select(testData.ETAXPayment.billOfEntryDateValue);
        await _PaymentsPages.ETAXPaymentPage.challanNumber.input(testData.ETAXPayment.challanNumberValue);;
        await _PaymentsPages.ETAXPaymentPage.OptionalField1.input(testData.ETAXPayment.OptionalField1Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField2.input(testData.ETAXPayment.OptionalField2Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField3.input(testData.ETAXPayment.OptionalField3Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField4.input(testData.ETAXPayment.OptionalField4Value);
        await _PaymentsPages.ETAXPaymentPage.OptionalField5.input(testData.ETAXPayment.OptionalField5Value);
        await _PaymentsPages.ETAXPaymentPage.ShowDetail.jsClick();
        await _PaymentsPages.ETAXPaymentPage.amountOfDutyPayable.input(testData.ETAXPayment.amountOfDutyPayableValue);
        await _PaymentsPages.ETAXPaymentPage.FromAccount.select(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount);
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.ETAXPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewfromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewAmount).textContains(testData.ETAXPayment.amount),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewPaymentType).textIs(testData.ETAXPayment.ViewPaymentType5),
        ]);
    });

    it('Reject an ETAX Payment via My Approval', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTxnFilter.click();
        await _ApprovalsPages.ApprovalPage.byTxnFilter.input(reference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.rejectButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.ETAXPayment.RejectReason);
        await ensure(_ApprovalsPages.ApprovalPage.reasonForRejection).textIs(testData.ETAXPayment.RejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        // await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess(); //has success message.
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    });
});

describe('IN_ETAX Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ETAXPayment.SIT.loginCompanyId : testData.ETAXPayment.UAT.loginCompanyId, SIT ? testData.ETAXPayment.SIT.verifyUserId : testData.ETAXPayment.UAT.verifyUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an ETAX Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference1, 'IN - Tax Payment').then(reference => {
            verifyReference = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an ETAX Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - Tax Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.ETAXPaymentPage.loadConditionForViewETAXPaymentPage();
        await _PaymentsPages.ETAXPaymentPage.approveButton.jsClick();
        await _PaymentsPages.ETAXPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.ETAXPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.ETAXPaymentPage.approveButton.click();
        await _PaymentsPages.ETAXPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.ETAXPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.ETAXPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an ETAX Payment via My Release', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "IN - Tax Payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.ETAXPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewAmount).textContains(uploadTestData.eTax.amountValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewfromAccount).textContains(uploadTestData.eTax.fromAccount),
        await ensure(_PaymentsPages.ETAXPaymentPage.toNewPayeeValue).textContains(uploadTestData.eTax.newPayeeName),
        await ensure(_PaymentsPages.ETAXPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewPaymentType).textContains(uploadTestData.eTax.paymentType),
        await ensure(_PaymentsPages.ETAXPaymentPage.companyNameValue).textContains(uploadTestData.eTax.companyNameValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.stateValue).textContains(uploadTestData.eTax.stateValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.cityValue).textContains(uploadTestData.eTax.cityValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.pinCodeValue).textContains(uploadTestData.eTax.pinCodeValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.tanNumValue).textContains(uploadTestData.eTax.tanNumValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.sendAmountValue).textContains(uploadTestData.eTax.amountValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.totalDeductAmt).textContains(uploadTestData.eTax.amountValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.custRefValue).isNotEmpty()
    ]);
}

export async function checkViewTAXPageAllField(isEdit:boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewfromAccount).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewAmount).textContains(testData.ETAXPayment.amount),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewPaymentType).textIs(testData.ETAXPayment.ViewPaymentType1),
        //Add all field
        await ensure(_PaymentsPages.ETAXPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.ETAXPaymentPage.toNewPayeeValue).textContains(testData.ETAXPayment.newPayeeName),
        await ensure(_PaymentsPages.ETAXPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.ETAXPaymentPage.companyNameValue).textContains(testData.ETAXPayment.companyNameValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.stateValue).textContains(testData.ETAXPayment.TaxStateValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.cityValue).textContains(testData.ETAXPayment.CityValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.pinCodeValue).textContains(isEdit ?testData.ETAXPayment.PinCodeValueEdit: testData.ETAXPayment.PinCodeValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.panCodeValue).textContains(testData.ETAXPayment.PanNoValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.sendAmountValue).textContains(testData.ETAXPayment.amount),
        await ensure(_PaymentsPages.ETAXPaymentPage.totalDeductAmt).textContains(testData.ETAXPayment.amount),
        await ensure(_PaymentsPages.ETAXPaymentPage.custRefValue).textContains(reference),
        await ensure(_PaymentsPages.ETAXPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.ETAXPaymentPage.activityLog).isNotEmpty(),
    ]);
}
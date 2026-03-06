// /*
//  * ©Copyright ACI Worldwide, Inc. 2019
// */
// import { NavigatePages, SwitchToSubsiPages } from '../../../pages/CB';
// import { Menu } from '../../../config/menu'
// import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
// import { browser } from 'protractor';

// let _switchToSubsiPages = new SwitchToSubsiPages();
// let testData = _switchToSubsiPages.fetchTestData('SG_testData.json');

// describe('Switch To Subsi', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginCB(SIT ? testData.swicthToSubsi.SIT.loginCompanyId : testData.swicthToSubsi.UAT.loginCompanyId, SIT ? testData.swicthToSubsi.SIT.loginUserId : testData.swicthToSubsi.UAT.loginUserId); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

//     it('Create a transaction', async function () {
//         let reference = '';
//         await _switchToSubsiPages.openMenu(Menu.CompanyInfo.SwitchToSubsi);
//         await _switchToSubsiPages.viewSubsiPage.loadConditionForViewSubsi();
//         await _switchToSubsiPages.viewSubsiPage.switchToButton.click();
//         await _switchToSubsiPages.viewSubsiPage.laterButton.clickIfExist();
//         await _switchToSubsiPages.viewSubsiPage.loadCondition();
//         //  create a transaction
//         await _switchToSubsiPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
//         await _switchToSubsiPages.accountTransferPage.loadCondition();
//         await _switchToSubsiPages.accountTransferPage.fromAccount.select(SIT ? testData.swicthToSubsi.SIT.fromAccount : testData.swicthToSubsi.UAT.fromAccount);
//         await _switchToSubsiPages.accountTransferPage.amount.input(testData.swicthToSubsi.amount);
//         await _switchToSubsiPages.accountTransferPage.loadCondition();
//         await _switchToSubsiPages.accountTransferPage.existingPayee.select(testData.swicthToSubsi.existingPayee);
//         await _switchToSubsiPages.accountTransferPage.paymentDetail.input(testData.swicthToSubsi.paymentDetail);
//         await _switchToSubsiPages.accountTransferPage.isBeneAdvising.jsClick();
//         await _switchToSubsiPages.accountTransferPage.emailIdO.input(testData.swicthToSubsi.emailIdO);
//         await _switchToSubsiPages.accountTransferPage.emailId1.input(testData.swicthToSubsi.emailId1);
//         await _switchToSubsiPages.accountTransferPage.message.input(testData.swicthToSubsi.message);
//         await _switchToSubsiPages.accountTransferPage.isTransactionNote.jsClick();
//         await _switchToSubsiPages.accountTransferPage.transactionNote.input(testData.swicthToSubsi.transactionNote);
//         await _switchToSubsiPages.accountTransferPage.nextButton.click();
//         await _switchToSubsiPages.accountTransferPage.loadConditionForPrevewPage();
//         await _switchToSubsiPages.accountTransferPage.submitButton.click();
//         await _switchToSubsiPages.accountTransferPage.loadConditionForSubmittedPage();
//         await _switchToSubsiPages.accountTransferPage.getInfoReferenceID().then(text => {
//             reference = text;
//         });
//         await ensure(_switchToSubsiPages.accountTransferPage).isUXSuccess();
//         await _switchToSubsiPages.accountTransferPage.finishedButton.click();
//         //go to transfer center
//         await _switchToSubsiPages.openMenu(Menu.Payments.TransferCenter);
//         await _switchToSubsiPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
//         await _switchToSubsiPages.accountTransferPage.loadConditionForViewACTPaymentPage();
//         await Promise.all([
//             await ensure(_switchToSubsiPages.accountTransferPage.fromAccountValue).textContains(SIT ? testData.swicthToSubsi.SIT.fromAccount : testData.swicthToSubsi.UAT.fromAccount),
//             await ensure(_switchToSubsiPages.accountTransferPage.amountValue).textContains(testData.swicthToSubsi.amount),
//             await ensure(_switchToSubsiPages.accountTransferPage.toExistingPayeeValue).textContains(testData.swicthToSubsi.existingPayee),
//             await ensure(_switchToSubsiPages.accountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
//         ]);
//     });
// });

/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE, pageSwitchWindow } from '../../../lib';
import { browser } from 'protractor';

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');+

describe('Operation-BulkEntitlementGrant', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });
    it('Create request to grant Flag', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _OperationsPages.bulkEntitlementGrantPage.topOperationsLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.bulkEntitlementGrantLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.loadCondition();
        await _OperationsPages.bulkEntitlementGrantPage.selectAffiliate.select(testDataSAM.bulkEntitlementGrant.affiliate);
        await _OperationsPages.bulkEntitlementGrantPage.submitAffiliate.click();
        await _OperationsPages.bulkEntitlementGrantPage.newRequestLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.description.input(testDataSAM.bulkEntitlementGrant.description);
        await _OperationsPages.bulkEntitlementGrantPage.entitlementType.input(testDataSAM.bulkEntitlementGrant.entitlementType.Flag);
        await _OperationsPages.bulkEntitlementGrantPage.corporationUpload.select2(testDataSAM.bulkEntitlementGrant.filename);
        await _OperationsPages.bulkEntitlementGrantPage.selectMultiFlag.input(testDataSAM.bulkEntitlementGrant.Flag.selectFlags);
        await _OperationsPages.bulkEntitlementGrantPage.selectDigitalDocumentation.input(testDataSAM.bulkEntitlementGrant.Flag.DigitalDocumentation);
        await _OperationsPages.bulkEntitlementGrantPage.newApprovalButton.click();
        await _OperationsPages.bulkEntitlementGrantPage.reviewButton.click();
        await _OperationsPages.bulkEntitlementGrantPage.submitButton.click();
        await _OperationsPages.bulkEntitlementGrantPage.topRecordLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.loadConditionOnViewBulkEntitlementGrantPage();
        await Promise.all([
            await ensure(_OperationsPages.bulkEntitlementGrantPage.descriptionValue).textContains(testDataSAM.bulkEntitlementGrant.description),
            //await ensure(_OperationsPages.bulkEntitlementGrantPage.corporationsValue).textContains(testDataSAM.bulkEntitlementGrant.companyId),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.selectMultiFlagValue).textContains(testDataSAM.bulkEntitlementGrant.Flag.selectFlags),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.digitalDocumentationValue).textContains(testDataSAM.bulkEntitlementGrant.Flag.DigitalDocumentation),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.newApprovalValue).textContains(testDataSAM.bulkEntitlementGrant.Flag.NewApproval),
        ])
        await _OperationsPages.bulkEntitlementGrantPage.cancelButton.click();
    })

    it('Create request to grant Widget', async function () {
        await _OperationsPages.bulkEntitlementGrantPage.newRequestLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.description.input(testDataSAM.bulkEntitlementGrant.description);
        await _OperationsPages.bulkEntitlementGrantPage.entitlementType.input(testDataSAM.bulkEntitlementGrant.entitlementType.Widget);
        await _OperationsPages.bulkEntitlementGrantPage.corporationUpload.select2(testDataSAM.bulkEntitlementGrant.filename);
        await _OperationsPages.bulkEntitlementGrantPage.selectWidget.input(testDataSAM.bulkEntitlementGrant.Widget.selectWidget);
        await _OperationsPages.bulkEntitlementGrantPage.reviewButton.click();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        await _OperationsPages.bulkEntitlementGrantPage.submitButton.click();   
        await _OperationsPages.bulkEntitlementGrantPage.topRecordLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.loadConditionOnViewBulkEntitlementGrantPage();
        await Promise.all([
            await ensure(_OperationsPages.bulkEntitlementGrantPage.descriptionValue).textContains(testDataSAM.bulkEntitlementGrant.description),
            //await ensure(_OperationsPages.bulkEntitlementGrantPage.corporationsValue).textContains(testDataSAM.bulkEntitlementGrant.companyId),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.selectWidgetValue).textContains(testDataSAM.bulkEntitlementGrant.Widget.selectWidget),
        ])
        await _OperationsPages.bulkEntitlementGrantPage.cancelButton.click();
    })

    it('Create request to grant COS-Account-Panel Auth-Functional Access', async function () {
        await _OperationsPages.bulkEntitlementGrantPage.newRequestLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.description.input(testDataSAM.bulkEntitlementGrant.description);
        await _OperationsPages.bulkEntitlementGrantPage.entitlementType.input(testDataSAM.bulkEntitlementGrant.entitlementType.COS);
        await _OperationsPages.bulkEntitlementGrantPage.corporations.input(testDataSAM.bulkEntitlementGrant.companyId);
        await _OperationsPages.bulkEntitlementGrantPage.ifCustomerHasSelect.input(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.productSection.ifCustomerHas);
        await _OperationsPages.bulkEntitlementGrantPage.thenGrantSelect.input(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.productSection.thenGrant);
        await _OperationsPages.bulkEntitlementGrantPage.cos_userFunction.click();
        await _OperationsPages.bulkEntitlementGrantPage.company_userAccount.click();
        await _OperationsPages.bulkEntitlementGrantPage.panelAuth.click();
        await _OperationsPages.bulkEntitlementGrantPage.userFunctionSelect.input(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.userFunction);
        await _OperationsPages.bulkEntitlementGrantPage.accountProductSelect.input(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.accountSection.product);
        await _OperationsPages.bulkEntitlementGrantPage.accountCcySelect.input(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.accountSection.Ccy);
        
        await _OperationsPages.bulkEntitlementGrantPage.reviewButton.click();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        await _OperationsPages.bulkEntitlementGrantPage.submitButton.click();   
        await _OperationsPages.bulkEntitlementGrantPage.topRecordLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.loadConditionOnViewBulkEntitlementGrantPage();
        await Promise.all([
            await ensure(_OperationsPages.bulkEntitlementGrantPage.descriptionValue).textContains(testDataSAM.bulkEntitlementGrant.description),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.corporationsValue).textContains(testDataSAM.bulkEntitlementGrant.companyId),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.ifCustomerHasValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.productSection.ifCustomerHas),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.thenGrantValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.productSection.thenGrant),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.userFunctionIfHasValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.userFunction),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.userFunctionThenGrantValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.userFunction),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.accountProductValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.accountSection.product),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.accountCcyValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.accountSection.Ccy),
        ])
    })

    it('Edit request', async function () {
        await _OperationsPages.bulkEntitlementGrantPage.editButton.click();
        await _OperationsPages.bulkEntitlementGrantPage.userFunctionSelect.input(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.userFunctionEdit);
        await _OperationsPages.bulkEntitlementGrantPage.reviewButton.click();
        await _OperationsPages.bulkEntitlementGrantPage.editSubmitButton.click();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        await _OperationsPages.bulkEntitlementGrantPage.topRecordLink.click();
        await _OperationsPages.bulkEntitlementGrantPage.loadConditionOnViewBulkEntitlementGrantPage();
        await Promise.all([
            await ensure(_OperationsPages.bulkEntitlementGrantPage.descriptionValue).textContains(testDataSAM.bulkEntitlementGrant.description),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.corporationsValue).textContains(testDataSAM.bulkEntitlementGrant.companyId),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.ifCustomerHasValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.productSection.ifCustomerHas),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.thenGrantValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.productSection.thenGrant),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.userFunctionIfHasValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.userFunctionEdit),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.userFunctionThenGrantValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.userFunctionEdit),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.accountProductValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.accountSection.product),
            await ensure(_OperationsPages.bulkEntitlementGrantPage.accountCcyValue).textContains(testDataSAM.bulkEntitlementGrant.COS_AC_PA_FA.accountSection.Ccy),
        ])
    })

    it('Delete request',async function(){
        let loopTime = 3;
        while(loopTime != 0){
            await _OperationsPages.bulkEntitlementGrantPage.deleteButton.click();
            await Promise.all([
                await ensure(_OperationsPages.bulkEntitlementGrantPage.successMessage).textContains('deleted'),
            ])
            if(loopTime > 1){
                await _OperationsPages.bulkEntitlementGrantPage.topRecordLink.click();
                await _OperationsPages.bulkEntitlementGrantPage.loadConditionOnViewBulkEntitlementGrantPage();
            }
            loopTime --;
        }
    })

});

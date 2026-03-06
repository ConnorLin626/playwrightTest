/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { ConfigurationsPages } from '../../../pages/SamUpgrade';
import { ensure, handlerCase, PROJECT_TYPE, generatedID ,devWatch} from '../../../lib';
import { browser } from 'protractor';

let _ConfigurationsPages = new ConfigurationsPages();
let testDataSAM = _ConfigurationsPages.fetchTestData('SAM_testData.json');
let products = '';
let savingProductName = '';

describe('Configuration-Products', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Edit Products ', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.productsPage.toConfigurationLink.click();
        await _ConfigurationsPages.productsPage.productsLink.click();
        await _ConfigurationsPages.productsPage.loadCondition();
        await _ConfigurationsPages.productsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _ConfigurationsPages.productsPage.submitAffiliate.click();
        await _ConfigurationsPages.productsPage.savingProductLink.getText().then(text => {
            savingProductName = text.trim();
        });
        await _ConfigurationsPages.productsPage.savingProductLink.click();
        await ensure(_ConfigurationsPages.productsPage.productNameLabel).textContains(savingProductName);
        await _ConfigurationsPages.productsPage.previewProductButton.click();
        await _ConfigurationsPages.productsPage.submitProductButton.click();
        await Promise.all([
            await ensure(_ConfigurationsPages.productsPage).isSAMSuccess(),
            await _ConfigurationsPages.productsPage.productStatus.textContains("Pending Modify Approval"),
        ]);
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _ConfigurationsPages.productsPage.toConfigurationLink.click();
        await _ConfigurationsPages.productsPage.productsLink.click();
        await _ConfigurationsPages.productsPage.loadCondition();
        await _ConfigurationsPages.productsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _ConfigurationsPages.productsPage.submitAffiliate.click();
        await _ConfigurationsPages.productsPage.pendingModifyApproval.click();
        await _ConfigurationsPages.productsPage.approveProductButton.click();
        await Promise.all([
            await ensure(_ConfigurationsPages.productsPage).isSAMSuccess(),
            await _ConfigurationsPages.productsPage.productStatus.textContains("Approved"),
        ]);
    });

    //Add for DASB-16469
    it('Create New Products for DUBAI', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.productsPage.toConfigurationLink.click();
        await _ConfigurationsPages.productsPage.productsLink.click();
        await _ConfigurationsPages.productsPage.loadCondition();
        await _ConfigurationsPages.productsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _ConfigurationsPages.productsPage.submitAffiliate.click();
        await _ConfigurationsPages.productsPage.createProductLink.jsClick();
        products="DUBAIProd"+generatedID();
        await _ConfigurationsPages.productsPage.productNameLabel.input(products);
        await _ConfigurationsPages.productsPage.productCode.input(products);
        await _ConfigurationsPages.productsPage.previewProductButton.click();
        await _ConfigurationsPages.productsPage.submitProductButton.click()
        //await ensure(_ConfigurationsPages.productsPage).isSAMSuccess();

        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _ConfigurationsPages.productsPage.toConfigurationLink.click();
        await _ConfigurationsPages.productsPage.productsLink.click();
        await _ConfigurationsPages.productsPage.loadCondition();
        await _ConfigurationsPages.productsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _ConfigurationsPages.productsPage.submitAffiliate.click();
        await _ConfigurationsPages.productsPage.pendingAddApproval.click();
        await _ConfigurationsPages.productsPage.approveProductButton.click();

        //Delete product
        await _ConfigurationsPages.productsPage.productNameLink.click();
        await _ConfigurationsPages.productsPage.deleteProduct.click();
        await _ConfigurationsPages.productsPage.deleteProduct.click();

        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.productsPage.toConfigurationLink.click();
        await _ConfigurationsPages.productsPage.productsLink.click();
        await _ConfigurationsPages.productsPage.loadCondition();
        await _ConfigurationsPages.productsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _ConfigurationsPages.productsPage.submitAffiliate.click();
        await _ConfigurationsPages.productsPage.PendingDeleteApproval.click();
        await _ConfigurationsPages.productsPage.approveProductButton.click();

    });
});


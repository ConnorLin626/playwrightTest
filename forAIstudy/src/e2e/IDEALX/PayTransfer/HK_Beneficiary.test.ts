/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _optPages = new PaymentsPages();
let testData = _optPages.fetchTestData("HK_testData.json");

describe('HK Beneficiary', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Beneficiary.SIT.loginCompanyId : testData.Beneficiary.UAT.loginCompanyId, SIT ? testData.Beneficiary.SIT.loginUserId : testData.Beneficiary.UAT.loginUserId, "1123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let domesticPayeeName = "";
    let TTPayeeName = "";

    it('Create Domestic Beneficiary with details format', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.bankCategory.select("Other bank / DBS BANK LTD., HONG KONG BRANCH");
        // await _optPages.BeneficiaryPage.OtherBankType.select("Foreign currency / overseas payment");
        await _optPages.BeneficiaryPage.newPayeeBankId.input(testData.Beneficiary.newPayeeBankId); 
        await _optPages.BeneficiaryPage.bankSelect.click();
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        await browser.sleep(500);
        domesticPayeeName = 'DomesticPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.switchFormatButton.click();
        await _optPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _optPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _optPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
        await _optPages.BeneficiaryPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _optPages.BeneficiaryPage.buildingName.input(testData.Beneficiary.buildingName);
        await _optPages.BeneficiaryPage.floor.input(testData.Beneficiary.floor);
        await _optPages.BeneficiaryPage.room.input(testData.Beneficiary.room);
        await _optPages.BeneficiaryPage.department.input(testData.Beneficiary.department);
        await _optPages.BeneficiaryPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _optPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _optPages.BeneficiaryPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _optPages.BeneficiaryPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _optPages.BeneficiaryPage.districtName.input(testData.Beneficiary.districtName);
        
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();
    
        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(domesticPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains("HK-CHATS Payment"),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.payeeLocation),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.townCity),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.streetName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.buildingNum),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.buildingName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.floor),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.room),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.department),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.subDepartment),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.postalCode),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.countrySubDivsion),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.townLocationName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.districtName),
        ]);
    });

    it('Edit Domestic Beneficiary with simple format', async function () {
        await _optPages.BeneficiaryPage.editNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForEditBenePage();
        await _optPages.BeneficiaryPage.newPayeeName.clean();
        let editPayeeName = 'EditDomestic' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(editPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(editPayeeName);
        await _optPages.BeneficiaryPage.switchFormatButton.click();
        await _optPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.editPayeeLocation);
        await _optPages.BeneficiaryPage.townCity.input(testData.Beneficiary.editTownCity);
        await _optPages.BeneficiaryPage.postalCode.clean();
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(editPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();
    
        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(editPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains("HK-CHATS Payment"),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.editPayeeLocation),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.editTownCity),
        ]);

        //delete payee 
        await deletePayee(editPayeeName);
    });
    // Add for IDXP-2256
    it('Create TT Beneficiary with manually input max bank name length', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.sgCountry);
        await _optPages.BeneficiaryPage.enterManually.click(); 
        await _optPages.BeneficiaryPage.payeeBankName.input(testData.Beneficiary.newPayeeBankName);
        await _optPages.BeneficiaryPage.payeeBankAdd1.input(testData.Beneficiary.newPayeBankAdd1);
        await _optPages.BeneficiaryPage.payeeBankAdd2.input(testData.Beneficiary.newPayeBankAdd2);
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newTTPayeeAcctNumber);
        await browser.sleep(500);
        TTPayeeName = 'TTPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(TTPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(TTPayeeName);
        await _optPages.BeneficiaryPage.switchFormatButton.click();
        await _optPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _optPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _optPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
        await _optPages.BeneficiaryPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _optPages.BeneficiaryPage.buildingName.input(testData.Beneficiary.buildingName);
        await _optPages.BeneficiaryPage.floor.input(testData.Beneficiary.floor);
        await _optPages.BeneficiaryPage.room.input(testData.Beneficiary.room);
        await _optPages.BeneficiaryPage.department.input(testData.Beneficiary.department);
        await _optPages.BeneficiaryPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _optPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _optPages.BeneficiaryPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _optPages.BeneficiaryPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _optPages.BeneficiaryPage.districtName.input(testData.Beneficiary.districtName);
        
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newTTPayeeAcctNumber);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(TTPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();
    
        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(TTPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains("HK-Telegraphic Transfer"),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.payeeLocation),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.townCity),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.streetName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.buildingNum),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.buildingName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.floor),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.room),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.department),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.subDepartment),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.postalCode),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.countrySubDivsion),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.townLocationName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.districtName),
            await ensure(_optPages.BeneficiaryPage.centerBankNameValue).textContains(testData.Beneficiary.newPayeeBankName),
            await ensure(_optPages.BeneficiaryPage.centerBankAdd1Value).textContains(testData.Beneficiary.newPayeBankAdd1),
            await ensure(_optPages.BeneficiaryPage.centerBankAdd2Value).textContains(testData.Beneficiary.newPayeBankAdd2),
        ]);
        //delete payee 
        await deletePayee(TTPayeeName);
    });

    //Add for DASB-74531
    it('Create Beneficiary with duplicate payee nickName', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        await browser.sleep(500);
        await _optPages.BeneficiaryPage.retireveNameBtn.click();
        domesticPayeeName = 'DomesticPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(testData.Beneficiary.PayeeNickname);
        await _optPages.BeneficiaryPage.next.click();
        await ensure(_optPages.BeneficiaryPage.nicknameMsg).textContains(testData.Beneficiary.Msg)
        await ensure(_optPages.BeneficiaryPage.topMsg).isNotElementPresent();
        
    });
});

export async function deletePayee(payeename : string) {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payeename);
        await _optPages.BeneficiaryPage.deletePayeeBtn.click();
        await _optPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _optPages.BeneficiaryPage.confirmDelete.click();
        await _optPages.BeneficiaryPage.loadConditionForDismissButton();
        await _optPages.BeneficiaryPage.dismiss.click();
}

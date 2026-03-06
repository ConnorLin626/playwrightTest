/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { GateWayJsonApi, ensure } from '../lib';
import { browser } from 'protractor';


describe('Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    it('web services', async function () {

        let getPayeeListApi = new GateWayJsonApi('/mbg-banking/customer/erp/getPayeeList?format=json');
        await getPayeeListApi.post({
            "getPayeeListReq": {
                "rqUID": "1234567890123456789012345678901234567890",
                "channelType": "WEB",
                "qs": "HKP2A01S01@HKP2A01",
                "functionKeys": "hktt/create",
                "paymentOptions": "hktt",
                "countryCode": "BLZ"
            }
        });
        //var jsonString = JSON.stringify(getPayeeListApi.response);
        //var jsonObject = JSON.parse(jsonString)
        //console.log('jsonObject.getPayeeListRes.returnCode==>' + jsonObject.getPayeeListRes.returnCode);
        //console.log('res==>' + jsonString);
        await Promise.all([
            await ensure(getPayeeListApi).isSuccess('getPayeeListRes.returnCode', 'UX0000')
        ]);
    });

});

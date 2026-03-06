import {Button, component, log, ensure, Page, TestPages, TextInput, waitForUXLoading} from "../../../lib";
import {browser, ExpectedConditions} from "protractor";
import {FilesPages} from "../../IDEALX/Files";
import {TradeFinancePages} from "./index";

@log export class FilesExchangePage extends Page {
  constructor() {
    super();
  }

  @component("//label[@id='file-list-addition']")
  public ShowAdditionalFilters: Button;
  @component('//a[contains(@href,"#/file-exchange/send")]')
  public sendFilesTab: Button;
  @component("//div[@id='categoryDiv']/p")
  public categoryValue: TextInput;
  @component('//input[@name="responseCode"]')
  public responseCode: TextInput;
  @component('//button[@name="get-challenge"]')
  public getChallenge: Button;

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(
        ExpectedConditions.elementToBeClickable(
            this.ShowAdditionalFilters.element
        ),
        this.ShowAdditionalFilters.getTimeOut()
    );
  }

  public async fileUpload2(_FilesPages: FilesPages, uploadFileName: string, requestType: string) {
    let fileName = "";
    const testData = _FilesPages.fetchTestData('TradeFinance_testData.json');
    await this.loadCondition();
    await _FilesPages.uploadFilePage.browseforfiles.select3(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await _FilesPages.uploadFilePage.loadConditionUpload();
    await Promise.all([
      await ensure(this.categoryValue).textContains(testData.FileExchange.category),
    ]);
    await _FilesPages.filesExchangePage.requestType.input(requestType);
    await _FilesPages.uploadFilePage.byTxn.jsClick();
    await _FilesPages.uploadFilePage.uploadButton.click();
    await _FilesPages.uploadFilePage.ok.click();
    await this.loadCondition();
    await browser.sleep(8000) //wait for MQ response
    return fileName;
  }

}

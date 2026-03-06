/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ElementFinder, browser, ExpectedConditions, Locator, by, protractor } from "protractor";
import { find, getElementTimeOut, findAll, saveScreen, addTail, getUploadFile, getUploadFile2, getUploadFile3, DATALIST_TYPE, logger, devWatch,SIT } from "./utils";

export class WebComponent {
  constructor(public element: ElementFinder, public selector: string) { }

  public getTimeOut() {
    return getElementTimeOut();
  }

  protected async loading(time: any = parseInt(browser.params.delay.default) * parseInt(browser.params.multiple)) {
    await browser.waitForAngular().then(async () => { browser.sleep(time); });
    await browser.wait(ExpectedConditions.stalenessOf(find("//ng-busy/div")));
  }

  public async elementClick(_element: ElementFinder, timeOut: any = this.getTimeOut()) {
    await browser.wait(ExpectedConditions.elementToBeClickable(_element), timeOut).then(async () => {
      //await browser.executeScript("arguments[0].scrollIntoView();", _element.getWebElement());//scroll to element
      await _element.click();
      try {
        await this.loading(parseInt(browser.params.delay.button));
      } catch (clickErr) {
        console.log("clickErr==>" + clickErr);
      }
    });
  }

  public async jsClick(timeOut: any = this.getTimeOut()) {
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      return await this.elementClick2(this.element, timeOut);
    });
  }

  public async elementClick2(_element: ElementFinder, timeOut: any = this.getTimeOut()) {
    //await browser.executeScript("arguments[0].scrollIntoView();", _element.getWebElement());//scroll to element
    await browser.executeScript("arguments[0].click();", _element.getWebElement());
    await this.loading(parseInt(browser.params.delay.button));

  }

  public async clickElement(_element: ElementFinder, timeOut: any = this.getTimeOut()) {
    try {
      await this.elementClick(_element, timeOut);
    } catch (clickErr) {
      try {
        await this.elementClick2(_element, timeOut);
      } catch (jsErr) {
        console.error("jsErr==>" + jsErr);
        throw clickErr;
      }
    }
  }

  public async clickElement2(_element: ElementFinder, timeOut: any = this.getTimeOut()) {
    try {
      await this.elementClick2(_element, timeOut);
    } catch (jsErr) {
      console.error("jsErr==>" + jsErr);
      throw jsErr;
    }
  }

  public async click(timeOut: any = this.getTimeOut()) {
    return await this.clickElement(this.element, timeOut);
  }

  public async clickIfExist(timeOut: any = this.getTimeOut()) {
    try {
      await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
        return await this.click(timeOut);
      });
    } catch (timeOutError) {
      console.error("element do not exist ==>" + this.selector);
    }
  }

  public async jsClickIfExist(timeOut: any = this.getTimeOut()) {
    try {
      await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
        return await this.jsClick(timeOut);
      });
    } catch (timeOutError) {
      console.error("element do not exist ==>" + this.selector);
    }
  }

  //Check the element is exist
  public async ElementExist(timeOut: any = this.getTimeOut()) {
    let rel = false;
    try {
      await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
        rel = true;
      });
    } catch (timeOutError) {
      console.error("element do exist ==>" + this.selector);
    }
    return rel;
  }

  public async isDisplayed() {
    try {
      return await this.element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  public async getText() {
    let text = await this.element.getText();
    if (0 === text.trim().length) {
      text = await this.getValue();
    }
    return text;
  }

  public async getValue() {
    return await this.element.getAttribute("value");
  }

  public async getId() {
    return await this.element.getId().then(id => {
      return id;
    });
  }

  public async getAttribute(_attrStr: string) {
    return await this.element.getAttribute(_attrStr).then(_attrValue => {
      return _attrValue;
    });
  }

  public async getTagName() {
    return await this.element.getTagName().then(tagName => {
      return tagName;
    });
  }

  public async isSubElementPresent(subLocator: Locator) {
    try {
      return await this.element.isElementPresent(subLocator);
    } catch (ex) {
      return false;
    }
  }

  public async isElementPresent() {
    try {
      return await this.element.isPresent();
    } catch (ex) {
      return false;
    }
  }

  public async isElementSelected() {
    try {
      return await this.element.isSelected();
    } catch (ex) {
      return false;
    }
  }

  public async takeScreenshot(elementName: string) {
    return await saveScreen(elementName);
  }
//干嘛用的？
  public addTail(_tag: string): string {
    return addTail(this.selector, _tag);
  }
}

export class Button extends WebComponent {
  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  public async isDisabled(timeOut: any = this.getTimeOut()) {
    try {
      return (await this.element.getAttribute("disabled")) === "disabled";
    } catch (ex) {
      return false;
    }
  }

  public async click(timeOut: any = this.getTimeOut()) {
    try {
      await this.clickElement(this.element, timeOut)
    } catch (clickErr) {
      throw clickErr;
    }
    //return await this.clickElement(this.element, timeOut);
    // return await this.jsClick(timeOut);
  }

  public async submit(timeOut: any = this.getTimeOut()) {
    try {
      await browser.wait(ExpectedConditions.elementToBeClickable(this.element), timeOut).then(async () => {
        return await this.element.submit();
      });
    } catch (ex) {
      return false;
    }
  }
}

export class RadioButton extends Button {
  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  public async select(radio: string, timeOut: any = this.getTimeOut()) {
    let targetRadio: ElementFinder; //adio-group/div/dbs-radio[1]/div/label/div/span
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      await this.element.$$("dbs-radio").each(async _element => {
        let spanElement = await _element.$("div").$("label").$("div").$("span");
        if (await spanElement.isPresent()) {
          await spanElement.getText().then(async text => {
            if (-1 < text.indexOf(radio)) {
              targetRadio = spanElement;
            }
          });
        }
      });
      if (undefined !== targetRadio) {
        await this.clickElement(targetRadio);
      }
    });
  }
}

export class TextInput extends WebComponent {
  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  public async input(text: string, timeOut: any = this.getTimeOut()) {
    //change from visibilityOf to presenceOf due to ux file upload
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {

      try {
        await this.element.clear();
      } catch(e) {
        console.log('this.element.clear() -> ' + e);
      }

      return await this.element.sendKeys(text);
    });
  }

  public async clean(timeOut: any = this.getTimeOut()) {
    await browser.wait(ExpectedConditions.visibilityOf(this.element), timeOut).then(async () => {
      // await this.element.clear();
      await this.element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
      await this.element.sendKeys(protractor.Key.DELETE);
      await browser.sleep(100);
      return;
    },async ()=>{
      logger.error(this.selector+" not visible during timeout, skip!");
      return ;
    });
  }

  public async valueContains(expected: string, timeOut: any = this.getTimeOut()) {
    let retValue = false;
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      const textValue = await this.getValue();
      if (-1 !== textValue.trim().indexOf(expected.trim())) {
        retValue = true;
      }
    })
    return retValue;
  }

  public async textContains(expected: string, timeOut: any = this.getTimeOut()) {
    let retValue = false;
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      const text = await this.element.getText();
      if (-1 !== text.trim().indexOf(expected.trim())) {
        retValue = true;
      }
    });
    return retValue;
  }
}

export class FileSelect extends TextInput {
  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  private getFileData(fileName: string): string {
    return getUploadFile(fileName);
  }
  private getFileData2(fileName: string): string {
    return getUploadFile2(fileName);
  }
  private getFileData3(fileName: string): string {
    return getUploadFile3(fileName);
  }

  public async select(fileName, timeOut: any = this.getTimeOut()): Promise<string> {
    const _file = this.getFileData(fileName);
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      await this.input(_file, timeOut);
    });
    return await _file;
  }

  public async select2(fileName, timeOut: any = this.getTimeOut()): Promise<string> {
    const _file = this.getFileData2(fileName);
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      await this.input(_file, timeOut);
    });
    return await _file;
  }

  //The string of timestampe between file name and extension name
  //e.g abc.123-20201215162732.txt, used for those invalid extension name
  public async select3(fileName, timeOut: any = this.getTimeOut()): Promise<string> {
    const _file = this.getFileData3(fileName);
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      await this.input(_file, timeOut);
    });
    return await _file;
  }
}

export class HtmlSelect extends TextInput {
  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  private getHtmlOptionSelector(): string {
    return this.addTail("option");
  }

  private getHtmlOptionDisplaySelector(option: string): string {
    return this.addTail(`option[contains(text(),'${option}')]`);
  }

  public async select(optionDisplay: string, timeOut: any = this.getTimeOut()) {
    await this.clickElement(find(this.getHtmlOptionDisplaySelector(optionDisplay)), timeOut);
  }

  public async selectFirst(timeOut: any = this.getTimeOut()) {
    let firstValue: ElementFinder = null;
    await browser.wait(ExpectedConditions.presenceOf(find(this.selector)), timeOut).then(async () => {
      await findAll(this.getHtmlOptionSelector()).each(async _element => {
        if (null === firstValue) {
          await _element.getText().then(async text => {
            if (-1 === text.toLowerCase().indexOf("--")) {
              firstValue = _element;
            }
          });
        }
      });
      await this.clickElement(firstValue);
    });
  }

  private getHtmlOptionValueSelector(value: string): string {
    return this.addTail(`option[@value='${value}']`);
  }

  public async selectByValue(optionValue: string, timeOut: any = this.getTimeOut()) {
    await this.clickElement(find(this.getHtmlOptionValueSelector(optionValue)), timeOut);
  }
}

export class OptionSelect extends TextInput {
  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  private getOpenSelector(): string {
    return this.addTail("div//input");
  }

  private getSelectSelector(): string {
    return this.addTail("div/div/ul/li[1]/div/span");
  }
  private getSelectSelector2(): string {
    // return this.addTail("div[1]/dbs-typeahead-window/div/div/span");
    // for resolve the v2:dbs-typeahead-window  =====>  v8:p-typeahead-window
    return this.addTail("div[1]/*/div[@class='search-result-container']/div/span");
  }

  private getSelectSelector3(): string {
    return this.addTail("div/div/div/span");
  }

  private async open(timeOut: any = this.getTimeOut()) {
    //await this.loading(parseInt(browser.params.delay.optionSelect) * parseInt(browser.params.multiple));
    await this.clickElement(find(this.getOpenSelector()), timeOut);
    await this.loading(parseInt(browser.params.delay.optionSelect));
  }

  private async search(value: string) {
    await find(this.getOpenSelector()).isEnabled().then(async (enable) => {
      if (true === enable) {
        await find(this.getOpenSelector()).sendKeys(value).then(async () => {
          await this.selectValue();
        });
      } else {
        console.error('Can not select components => ' + this.selector);
      }
    });
  }

  private async selectValue() {
    //await this.loading(parseInt(browser.params.delay.optionSelect) * parseInt(browser.params.multiple));
    await this.loading(parseInt(browser.params.delay.optionSelect));
    if (await this.element.$("ul").isPresent()) {
      await this.clickElement(find(this.getSelectSelector()));
    } else if (await this.element.$(".swift-selector").isPresent()) {
      await this.clickElement(find(this.getSelectSelector2()));
    } else {
      await this.clickElement(find(this.getSelectSelector3()));
    }
  }

  public async select(valueDisplay: string, timeOut: any = this.getTimeOut()) {
    await this.open(timeOut);
    await this.search(valueDisplay);
  }

  public async selectFirst(timeOut: any = this.getTimeOut()) {
    await this.select("", timeOut);
  }

  //不确定能不能用
  //判断 multi-level-dropdown有几个 OptionSelect，是否满足需求的Count
  public async selectCount(Count: number){
    await this.loading(parseInt(browser.params.delay.getOpenSelector));
    let index: number = 0;
    await findAll(this.getOpenSelector()).each(async _element => {
      let subElement = _element.$$("div").first().$("span");
      // console.log('subElement=>', subElement);
      console.log('subElement=>', _element.$$("div").first().$("span"));
      if (subElement.isPresent()) {
        index++;
        console.log('index=>', index);
      }
    });
    if(Count !== index) throw new Error(`Element ${this.selector} count is '${index}'. Expected value count is '${Count}'`);
  }

}

export class DateSelect extends OptionSelect {
  private inputDate: string[];

  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  private getBasePath(): string {
    return this.selector;
  }

  private getDatePickerPath(): string {
    return this.getBasePath() + "/div/input";
  }

  private getDatePickerInnerPath(): string {
    return this.getBasePath() + "/div/datepicker-inner";
  }

  private getDayPickerPath(): string {
    return this.getDatePickerInnerPath() + "/div/day-picker";
  }

  private getMonthPickerPath(): string {
    return this.getDatePickerInnerPath() + "/div/month-picker";
  }

  private getYearPickerPath(): string {
    return this.getDatePickerInnerPath() + "/div/year-picker";
  }

  private isValidateDate(dateStr: string) {
    try {
      new Date(Date.parse(dateStr));
      this.inputDate = dateStr.split(" ");
      return true;
    } catch (error) {
      console.log("wrong date => ", error);
      return false;
    }
  }

  private async gotoSelect(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.datePicker) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.datePicker));
    await this.clickElement(find(this.getDatePickerPath()), timeOut); //click datapicker
    await this.clickElement(find(this.getDayPickerPath() + "/table/thead/tr[1]/th[2]/button")); //goto month pickup
    await this.clickElement(find(this.getMonthPickerPath() + "/table/thead/tr[1]/th[2]/button")); //goto year pickup
    let inputDateYyyy = parseInt(this.inputDate[2]);
    let datePickerValueArr;
    await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
      datePickerValueArr = value.split(" - ");
    });
    let datePickerStartYear = datePickerValueArr[0];
    let datePickerEndYear = datePickerValueArr[1];
    let cycleTime = 1; //avoid cycle and cycle
    while (datePickerEndYear < inputDateYyyy || datePickerStartYear > inputDateYyyy) {
      if (cycleTime >= 5) { break; } else { cycleTime++; }
      if (datePickerEndYear < inputDateYyyy) {
        //go to next page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[3]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerEndYear = value.split(" - ")[1];
          });
        });
      } else if (datePickerStartYear > inputDateYyyy) {
        //go to pre page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[1]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerStartYear = value.split(" - ")[0];
          });
        });
      }
    }
  }

  //use for the calendar only can Mon/Year selection
  private async gotoSelect2(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.datePicker) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.datePicker));
    await this.clickElement(find(this.getDatePickerPath()), timeOut); //click datapicker
    await this.clickElement(find(this.getMonthPickerPath() + "/table/thead/tr[1]/th[2]/button")); //goto year pickup
    let inputDateYyyy = parseInt(this.inputDate[2]);
    let datePickerValueArr;
    await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
      datePickerValueArr = value.split(" - ");
    });
    let datePickerStartYear = datePickerValueArr[0];
    let datePickerEndYear = datePickerValueArr[1];
    let cycleTime = 1; //avoid cycle and cycle
    while (datePickerEndYear < inputDateYyyy || datePickerStartYear > inputDateYyyy) {
      if (cycleTime >= 5) { break; } else { cycleTime++; }
      if (datePickerEndYear < inputDateYyyy) {
        //go to next page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[3]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerEndYear = value.split(" - ")[1];
          });
        });
      } else if (datePickerStartYear > inputDateYyyy) {
        //go to pre page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[1]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerStartYear = value.split(" - ")[0];
          });
        });
      }
    }
  }

  private async selectYMD(path: string, _value: string) {
    let selectYMD: ElementFinder;
    await findAll(path + "/table/tbody/*/*/button/span[not(contains(@class,'text-muted'))]").each(async _element => {
      await _element.getText().then(async ymdValue => {
        if (-1 < ymdValue.indexOf(_value)) {
          selectYMD = _element;
        }
      });
    });
    await this.clickElement(selectYMD);
  }

  private async selectYear() {
    await this.selectYMD(this.getYearPickerPath(), this.inputDate[2]);
  }

  private async selectMonth() {
    await this.selectYMD(this.getMonthPickerPath(), this.inputDate[1]);
  }

  private async selectDay() {
    await this.selectYMD(this.getDayPickerPath(), this.inputDate[0]);
  }

  public async select(dateDisplay: string, timeOut: any = this.getTimeOut()) {
    //DD MMM YYYY eg 23 Mar 2016
    if (this.isValidateDate(dateDisplay)) {
      await this.gotoSelect(timeOut);
      await this.selectYear();
      await this.selectMonth();
      await this.selectDay();
    }
  }

  //use for the calendar only can Mon/Year selection
  public async select2(dateDisplay: string, timeOut: any = this.getTimeOut()) {
    //MMM YYYY eg Mar 2016
    if (this.isValidateDate(dateDisplay)) {
      await this.gotoSelect2(timeOut);
      await this.selectYear();
      await this.selectMonth();
    }
  }

  public async isDisable() {
    await this.loading();
    let childInput = this.element.element(by.xpath('div/input'));
    // console.error('-------------------');
    // console.error(await childInput.getAttribute("disabled"));
    // console.error('-------------------');
    return (await childInput.getAttribute("disabled")) === "true";
  }

  public async getDate() {
    let childInput = this.element.element(by.xpath('div/input'));
    return await childInput.getAttribute('value');
  }
}

export class DBSCalendarSelect extends OptionSelect {
  private inputDate: string[];

  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  private getBasePath(): string {
    return this.selector;
  }

  private getDateCalendarPath(): string {
    return this.getBasePath() + "/div/div/dbs-input";
  }

  private getDatePickerInnerPath(): string {
    return this.getBasePath() + "/div/div";
  }

  private getDayCalendarPath(): string {
    return this.getDatePickerInnerPath() + "/div/dbs-day-calendar";
  }

  private getDayCalendarValuePath(): string {
    return this.getDayCalendarPath() + "/div/table/tbody/*/*/button";
  }

  private getMonthCalendarLabelPath(): string {
    return this.getDayCalendarPath() + "/div/table/thead/tr[1]/th/div/div[1]/div/dbs-dropdown/div/label[1]";
  }

  private getMonthCalendarValueArrPath(): string {
    return this.getDayCalendarPath() + "/div/table/thead/tr[1]/th/div/div[1]/div/dbs-dropdown/div/div/ul/li";
  }

  private getYearCalendarLabelPath(): string {
    return this.getDayCalendarPath() + "/div/table/thead/tr[1]/th/div/div[2]/div/dbs-dropdown/div/label[1]";
  }

  private getYearCalendarValueArrPath(): string {
    ////*[@id="day-calendar-element"]/div[1]/table/tbody/tr[2]/td[3]/button
    return this.getDayCalendarPath() + "/div/table/thead/tr[1]/th/div/div[2]/div/dbs-dropdown/div/div/ul/li";
  }

  private isValidateDate(dateStr: string) {
    try {
      new Date(Date.parse(dateStr));
      this.inputDate = dateStr.split(" ");
      return true;
    } catch (error) {
      console.log("wrong date => ", error);
      return false;
    }
  }

  public async select(dateDisplay: string, timeOut: any = this.getTimeOut()) {
    //DD MMM YYYY eg 23 Mar 2016
    if (this.isValidateDate(dateDisplay)) {
      await this.gotoSelect(timeOut);
      await this.selectYear();
      await this.selectMonth();
      await this.selectDay();
    }
  }

  public async select2(dateDisplay: string, timeOut: any = this.getTimeOut()) {
    //MMM YYYY eg Mar 2016
    if (this.isValidateDate(dateDisplay)) {
      await this.gotoSelect2(timeOut);
      await this.selectDay();
    }
  }

  public async select3(dateDisplay: string, timeOut: any = this.getTimeOut()) {
    //DD MMM YYYY eg 23 Mar 2016
    if (this.isValidateDate(dateDisplay)) {
      await this.click();
      // await this.selectYear();
      // await this.selectMonth();
      await this.selectDay();
    }
  }

  private async selectYear() {
    //await new Button(find(this.getYearCalendarLabelPath()), this.getYearCalendarLabelPath()).jsClick();
    await find('//*[@id="day-calendar-element"]/div[1]/table/thead/tr[1]/th/div/div[2]/div/button').click();
    // find('//*[@id="day-calendar-element"]/div[1]/table/thead/tr/th/div/div/div/button').click();
    // await console.log(this.inputDate[2]);
    ////*[@id="day-calendar-element"]/div[1]/table/tbody/tr[2]/td[3]/button
    ////*[@id="day-calendar-element"]/div[1]/table/tbody/tr[3]/td[1]/button
    await this.selectYMD('//*[@id="day-calendar-element"]/div[1]/table/tbody/*/*/button',  this.inputDate[2]);
  }

  private async selectMonth() {
    //await new Button(find(this.getMonthCalendarLabelPath()), this.getMonthCalendarLabelPath()).jsClick();
    await find('//*[@id="day-calendar-element"]/div[1]/table/thead/tr[1]/th/div/div[1]/div/button').click();
    // await console.log(this.inputDate[1]);
    await this.selectYMD('//*[@id="day-calendar-element"]/div[1]/table/tbody/*/*/button',  this.inputDate[1]);
    //await this.selectYMD(this.getMonthCalendarValueArrPath(),  this.inputDate[1]);
  }

  private async selectDay() {
    // await console.log(this.inputDate[0]);
    //await this.selectYMD(this.getDayCalendarValuePath(), this.inputDate[0]);
    //await find('//*[@id="day-calendar-element"]/div[1]/table/tbody/*/*/button').click();
    await this.selectYMD('//*[@id="day-calendar-element"]/div[1]/table/tbody/*/*/button',  this.inputDate[0]);
  }

  private async gotoSelect(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.datePicker) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.datePicker));
    await this.clickElement(find(this.getDateCalendarPath()), timeOut); //click datapicker
  }

  private async gotoSelect2(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.datePicker) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.datePicker));
    await this.clickElement(find(this.getDatePickerInnerPath()), timeOut); //click datapicker
  }

  private async gotoSelect3(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.datePicker) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.datePicker));
    await this.clickElement(find(this.getDatePickerInnerPath()), timeOut); //click datapicker
  }

  private async selectYMD(path: string, _value: string) {
    let selectYMD: ElementFinder;
    await findAll(path).each(async _element => {
      await _element.getText().then(async ymdValue => {
        if (-1 < ymdValue.indexOf(_value)) {
          selectYMD = _element;
        }
      });
    });
    await this.clickElement(selectYMD);
  }
}

export class ListSelect extends OptionSelect {

  private _dataListType = DATALIST_TYPE.DEFAULT;
  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  private getSelectAllPath() {
    let _returnPath: string = null;
    switch (this._dataListType) {
      case DATALIST_TYPE.DEFAULT: _returnPath = this.addTail("/div/div[2]/table/thead/tr/th[1]/div/input"); break;
      case DATALIST_TYPE.PAYNOW: _returnPath = this.addTail("/div/div[1]/table/thead/tr/th[1]/input"); break;
      default: _returnPath = this.addTail("/div/div[2]/table/thead/tr/th[1]/div/input"); break;
    }
    return _returnPath;
  }

  private getSelectListPath() {
    let _returnPath: string = null;
    switch (this._dataListType) {
      case DATALIST_TYPE.DEFAULT: _returnPath = this.addTail("/div/div[2]/table/tbody/tr"); break;
      case DATALIST_TYPE.PAYNOW: _returnPath = this.addTail("/div/div/div[1]/table/tbody/tr"); break;
      default: _returnPath = this.addTail("/div/div[2]/table/tbody/tr"); break;
    }
    return _returnPath;
  }

  public setDataListType(_typeList: DATALIST_TYPE = DATALIST_TYPE.DEFAULT) {
    this._dataListType = _typeList;
    return this;
  }

  public async select(...args) {
    //await this.loading( parseInt(browser.params.delay.listSelect) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.listSelect));
    let that = this;
    let index: number = 1;
    await findAll(this.getSelectListPath()).each(async _element => {
      let subElement = _element.$$("td").first().$("div");
      if (subElement.isPresent()) {
        args.forEach(async (v, i, a) => { //VALUE , INDEX ,ARGS
          if (index === v) {
            await that.clickElement(subElement);
          }
        });
      }
      index++;
    });
  }

  public async selectWithTimeOut(timeOut: any = this.getTimeOut(), ...args) {
    await browser.wait(ExpectedConditions.presenceOf(find(this.getSelectListPath())), timeOut).then(async () => {
      await this.select(args);
    });
  }

  private getSelectListFilePath() {
    return this.addTail("/datatable-row-wrapper");
  }

  public async selectFile(...args) {
    //await this.loading(parseInt(browser.params.delay.listSelect) * parseInt(browser.params.multiple));
    await this.loading(parseInt(browser.params.delay.listSelect));
    let that = this;
    let index: number = 1;
    await findAll(this.getSelectListFilePath()).each(async _element => {
      let subElement = _element.$$("datatable-body-cell").first().$(".checkedBox");
      if (subElement.isPresent()) {
        args.forEach(async (v, i, a) => {
          //VALUE , INDEX ,ARGS
          if (index === v) {
            await that.clickElement(subElement);
          }
        });
      }
      index++;
    });
  }

  public async selectIdealxFile(...args) {
    //await this.loading(parseInt(browser.params.delay.listSelect) * parseInt(browser.params.multiple));
    await this.loading(parseInt(browser.params.delay.listSelect));
    let that = this;
    let index: number = 1;
    await findAll(this.getSelectListFilePath()).each(async _element => {
      let subElement = _element.$$("datatable-body-cell").first().$("input[type=checkbox]");
      if (subElement.isPresent()) {
        args.forEach(async (v, i, a) => {
          //VALUE , INDEX ,ARGS
          if (index === v) {
            //input only can use elementClick2
            await that.clickElement2(subElement);
          }
        });
      }
      index++;
    });
  }
  // by file tab select txn under file show txn
  public async selectFileTxn(...args) {
    //await this.loading(parseInt(browser.params.delay.listSelect) * parseInt(browser.params.multiple));
    await this.loading(parseInt(browser.params.delay.listSelect));
    let that = this;
    let index: number = 1;
    await findAll(this.getSelectListFilePath()).each(async _element => {
      let subElement = _element.$$("datatable-body-cell").first().$("div");
      if (subElement.isPresent()) {
        args.forEach(async (v, i, a) => { //VALUE , INDEX ,ARGS
          if (index === v) {
            await that.clickElement(subElement);
          }
        });
      }
      index++;
    });
  }
  public async selectFileWithTimeOut(timeOut: any = this.getTimeOut(), ...args) {
    await browser.wait(ExpectedConditions.presenceOf(find(this.getSelectListFilePath())), timeOut).then(async () => {
      await this.selectFile(args);
    });
  }

  public async selectAll(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.listSelect) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.listSelect));
    await this.clickElement(find(this.getSelectAllPath()), timeOut);
  }

  public async clickWithColAndText(colNum: number, textContain: string, textPosition: number = 1, timeOut: any = this.getTimeOut()) {
    await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
      let index = 1;
      let elementFinder: ElementFinder;
      await findAll(this.getSelectListPath()).each(async _element => {
        const selecter = await this.getSelectListPath() + `[${index++}]/td[${colNum}]/div/p[${textPosition}]/button`
        await browser.wait(ExpectedConditions.presenceOf(find(selecter)), timeOut).then(async () => {
          await find(selecter).getText().then(async text => {
            if (-1 < text.indexOf(textContain)) {
              elementFinder = find(selecter);
            }
          });
        });
      });
      if (undefined !== elementFinder) {
        await this.clickElement(elementFinder);
      }
    });
  }
  //For AlertReminders check info
  public async selectAlert(_title: string, _value: string) {
    // let selectAlertReminder: ElementFinder;
    let _elementArr = [];
    await findAll('//table[@id="alerts"]/tbody/*/*/a').each(async _element1 => {
      await _element1.getText().then(async titleValue => {
        // console.log('enter element1=>', _title);
        if (-1 < titleValue.indexOf(_title)) {
          await findAll('//table[@id="alerts"]/tbody/*/td[2]').each(async _element2 => {
            await _element2.getText().then(async acctValue => {
              if (-1 < acctValue.indexOf(_value)) {
                // console.log('enter element2=>', _value);
                if (_element1.isPresent()) {
                  _elementArr.push(_element1);
                }
              }
            });
          });
        }
      });
    });
    if (_elementArr.length !== 0) {
      await this.clickElement(_elementArr[0]);
    }
  }
}

export class IXHorizontalMenu extends Button {

  public async click(timeOut: any = this.getTimeOut()) {
    try {
      let index=2;
      while(!await this.isElementPresent()){
        await this.clickElement(find('//p-horizontal-navigation/div/ul[2]/li[' + (index++) + ']'), timeOut);
      }
      await this.clickElement(this.element, timeOut)
    } catch (clickErr) {
      throw clickErr;
    }
  }

}

export class DateSelect1 extends OptionSelect {
  private inputDate: string[];

  constructor(element: ElementFinder, selector: string) {
    super(element, selector);
  }

  private getBasePath(): string {
    return this.selector;
  }

  private getDatePickerPath(): string {
    return this.getBasePath() + "/div/div";
  }

  private getDatePickerInnerPath(): string {
    return this.getBasePath() + "/div/datepicker-inner";
  }

  private getDayPickerPath(): string {
    return this.getDatePickerInnerPath() + "/div/day-picker";
  }

  private getMonthPickerPath(): string {
    return this.getDatePickerInnerPath() + "/div/month-picker";
  }

  private getYearPickerPath(): string {
    return this.getDatePickerInnerPath() + "/div/year-picker";
  }
  
  private isValidateDate(dateStr: string) {
    try {
      new Date(Date.parse(dateStr));
      this.inputDate = dateStr.split(" ");
      return true;
    } catch (error) {
      console.log("wrong date => ", error);
      return false;
    }
  }

  private async gotoSelect(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.datePicker) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.datePicker));
    await this.clickElement(find(this.getDatePickerPath()), timeOut); //click datapicker
    await this.clickElement(find(this.getDayPickerPath() + "/table/thead/tr[1]/th[2]/button")); //goto month pickup
    await this.clickElement(find(this.getMonthPickerPath() + "/table/thead/tr[1]/th[2]/button")); //goto year pickup
    let inputDateYyyy = parseInt(this.inputDate[2]);
    let datePickerValueArr;
    await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
      datePickerValueArr = value.split(" - ");
    });
    let datePickerStartYear = datePickerValueArr[0];
    let datePickerEndYear = datePickerValueArr[1];
    let cycleTime = 1; //avoid cycle and cycle
    while (datePickerEndYear < inputDateYyyy || datePickerStartYear > inputDateYyyy) {
      if (cycleTime >= 5) { break; } else { cycleTime++; }
      if (datePickerEndYear < inputDateYyyy) {
        //go to next page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[3]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerEndYear = value.split(" - ")[1];
          });
        });
      } else if (datePickerStartYear > inputDateYyyy) {
        //go to pre page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[1]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerStartYear = value.split(" - ")[0];
          });
        });
      }
    }
  }

  //use for the calendar only can Mon/Year selection
  private async gotoSelect2(timeOut: any = this.getTimeOut()) {
    //await this.loading( parseInt(browser.params.delay.datePicker) * parseInt(browser.params.multiple) );
    await this.loading(parseInt(browser.params.delay.datePicker));
    await this.clickElement(find(this.getDatePickerPath()), timeOut); //click datapicker
    await this.clickElement(find(this.getMonthPickerPath() + "/table/thead/tr[1]/th[2]/button")); //goto year pickup
    let inputDateYyyy = parseInt(this.inputDate[2]);
    let datePickerValueArr;
    await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
      datePickerValueArr = value.split(" - ");
    });
    let datePickerStartYear = datePickerValueArr[0];
    let datePickerEndYear = datePickerValueArr[1];
    let cycleTime = 1; //avoid cycle and cycle
    while (datePickerEndYear < inputDateYyyy || datePickerStartYear > inputDateYyyy) {
      if (cycleTime >= 5) { break; } else { cycleTime++; }
      if (datePickerEndYear < inputDateYyyy) {
        //go to next page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[3]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerEndYear = value.split(" - ")[1];
          });
        });
      } else if (datePickerStartYear > inputDateYyyy) {
        //go to pre page
        await this.clickElement(find(this.getYearPickerPath() + "/table/thead/tr/th[1]/button")).then(async () => {
          await find(this.getYearPickerPath() + "/table/thead/tr/th[2]/button/strong").getText().then(async value => {
            datePickerStartYear = value.split(" - ")[0];
          });
        });
      }
    }
  }

  private async selectYMD(path: string, _value: string) {
    let selectYMD: ElementFinder;
    await findAll(path + "/table/tbody/*/*/button/span[not(contains(@class,'text-muted'))]").each(async _element => {
      await _element.getText().then(async ymdValue => {
        if (-1 < ymdValue.indexOf(_value)) {
          selectYMD = _element;
        }
      });
    });
    await this.clickElement(selectYMD);
  }

  private async selectYear() {
    await this.selectYMD(this.getYearPickerPath(), this.inputDate[2]);
  }

  private async selectMonth() {
    await this.selectYMD(this.getMonthPickerPath(), this.inputDate[1]);
  }

  private async selectDay() {
    await this.selectYMD(this.getDayPickerPath(), this.inputDate[0]);
  }

  public async select(dateDisplay: string, timeOut: any = this.getTimeOut()) {
    //DD MMM YYYY eg 23 Mar 2016
    if (this.isValidateDate(dateDisplay)) {
      await this.gotoSelect(timeOut);
      await this.selectYear();
      await this.selectMonth();
      await this.selectDay();
    }
  }

  //use for the calendar only can Mon/Year selection
  public async select2(dateDisplay: string, timeOut: any = this.getTimeOut()) {
    //MMM YYYY eg Mar 2016
    if (this.isValidateDate(dateDisplay)) {
      await this.gotoSelect2(timeOut);
      await this.selectYear();
      await this.selectMonth();
    }
  }

  public async isDisable() {
    await this.loading();
    let childInput = this.element.element(by.xpath('div/input'));
    // console.error('-------------------');
    // console.error(await childInput.getAttribute("disabled"));
    // console.error('-------------------');
    return (await childInput.getAttribute("disabled")) === "true";
  }

  public async getDate() {
    let childInput = this.element.element(by.xpath('div/input'));
    return await childInput.getAttribute('value');
  }
}
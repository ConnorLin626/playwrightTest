/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { WebComponent, Button, TextInput, Page, DateSelect, GateWayJsonApi } from "./";
import { browser, ExpectedConditions } from 'protractor';
import * as moment from "moment";

class WebComponentEnsurer {
  constructor(private component: WebComponent) {
  }

  public async textIs(expected: string) {
    await browser.wait(ExpectedConditions.presenceOf(this.component.element), this.component.getTimeOut()).then(async () => {
      let text = await this.component.getText();
      if (0 === text.trim().length) {
        text = await this.component.getAttribute('value');
      }
      if (expected.trim() !== text.trim()) {
        throw new Error(`Element ${this.component.selector} text is '${text}'. Expected value is '${expected}'`);
      }
    });
  }

  public async isVisible() {
    await browser.wait(ExpectedConditions.presenceOf(this.component.element), this.component.getTimeOut()).then(async () => {
      if (!await this.component.isDisplayed()) {
        throw new Error(`Element ${this.component.selector} is not visible`);
      }
    });
  }

  public async isNotVisible() {
    await browser.wait(ExpectedConditions.presenceOf(this.component.element), this.component.getTimeOut()).then(async () => {
      if (await this.component.isDisplayed()) {
        throw new Error(`Element ${this.component.selector} is visible`);
      }
    });
  }

  public async isNotElementPresent() {
    if (await this.component.element.isPresent()) {
      throw new Error(`Element ${this.component.selector} is present`);
    } else {
      console.error(`Element ${this.component.selector} is not present`);
    }
  }

  public async isElementPresent() {
    if ((await this.component.element.isPresent()) != true) {
      throw new Error(`Element ${this.component.selector} is not present`);
    } else {
      console.error(`Element ${this.component.selector} is present`);
    }
  }

  public async textContains(expected: string) {
    await this.component.getText().then(text => {
      if (!text.includes(expected)) {
        throw new Error(expected + `is not contains`);
      }
    });
  }
}

class ButtonEnsurer extends WebComponentEnsurer {
  protected button: Button;
  constructor(button: Button) {
    super(button);
    this.button = button;
  }

  public async isNotDisabled() {
    await browser.wait(ExpectedConditions.presenceOf(this.button.element), this.button.getTimeOut()).then(async () => {
      if (await this.button.isDisabled()) {
        throw new Error(`Button ${this.button.selector} is disabled`);
      }
    });
  }

  public async isSelected() {
    await browser.wait(ExpectedConditions.presenceOf(this.button.element), this.button.getTimeOut()).then(async () => {
      if (!await this.button.isElementSelected()) {
        throw new Error(`Button ${this.button.selector} is Not Selected`);
      }
    });
  }

  public async isNotSelected() {
    await browser.wait(ExpectedConditions.presenceOf(this.button.element), this.button.getTimeOut()).then(async () => {
      if (await this.button.isElementSelected()) {
        throw new Error(`Button ${this.button.selector} is Selected`);
      }
    });
  }

  public async hasClassName(expected: string) {
    await browser.wait(ExpectedConditions.presenceOf(this.button.element), this.button.getTimeOut()).then(async () => {
      let text = await this.button.getAttribute(expected);
      let flag = text === 'true' ? true : false;
      if (!flag) {
        throw new Error(`Element ${this.button.selector} table not active.`);
      }
    })
  }
}

class TextInputEnsurer extends WebComponentEnsurer {
  protected textInput: TextInput;
  constructor(textInput: TextInput) {
    super(textInput);
    this.textInput = textInput;
  }

  public async textContains(expected: string) {
    await browser.wait(ExpectedConditions.presenceOf(this.textInput.element), this.textInput.getTimeOut()).then(async () => {
      let text = await this.textInput.getText();
      if (-1 == text.trim().indexOf(expected.trim())) {
        throw new Error(`Element ${this.textInput.selector} text is '${text}'. Expected value contains '${expected}'`);
      }
    });
  }

  public async elementValueContains(expected: string) {
    await browser.wait(ExpectedConditions.presenceOf(this.textInput.element), this.textInput.getTimeOut()).then(async () => {
      let text = await this.textInput.getValue();
      if (-1 == text.trim().indexOf(expected.trim())) {
        throw new Error(`Element ${this.textInput.selector} text is '${text}'. Expected value contains '${expected}'`);
      }
    });
  }

  public async textNotContains(expected: string) {
    await browser.wait(ExpectedConditions.presenceOf(this.textInput.element), this.textInput.getTimeOut()).then(async () => {
      const text = await this.textInput.getText();
      if (-1 !== text.trim().indexOf(expected.trim())) {
        throw new Error(`Element ${this.textInput.selector} text is '${text}'. Expected value not contains '${expected}'`);
      }
    });
  }

  public async isNotEmpty() {
    await browser.wait(ExpectedConditions.presenceOf(this.textInput.element), this.textInput.getTimeOut()).then(async () => {
      let text = await this.textInput.getText();
      if (0 === text.trim().length) {
        text = await this.textInput.getAttribute('value');
      }
      if (0 === text.trim().length) {
        throw new Error(`Element ${this.textInput.selector} text is empty`);
      }
    })
  }

  public async textContainsLessOne(...expected) {
    let flag = false;
    await browser.wait(ExpectedConditions.presenceOf(this.textInput.element), this.textInput.getTimeOut()).then(async () => {
      const text = await this.textInput.getText();
      //console.log(11111, text);
      for (let i = 0; i < expected.length; i++) {
        //console.log(expected[i]);
        if (-1 < text.trim().indexOf(expected[i])) {
          flag = true;
          break;
        }
      }
    });
    if (!flag) {
      throw new Error(`Element ${this.textInput.selector} text not contains.`);
    }
  }
}

class PageEnsurer {
  constructor(private page: Page) {

  }

  public async isUxInfoSuccess() {
    await this.page.hasUXInfoMsg('successful').then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message contain success');
      }
    });
  }

  public async isUxSuccessSuccess() {
    await this.page.hasUXSuccessMsg('successful').then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message contain success');
      }
    });
  }

  public async isUXSuccess() {
    try {
      await this.isUxInfoSuccess();
    } catch (Error) {
      await this.isUxSuccessSuccess();
    }
  }

  public async isI3Success() {
    await this.page.hasI3InfoMsg('successful').then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message contain success');
      }
    });
  }

  public async isUXRejectDialogSuccess() {
    await this.page.hasUxRejectDialogInfoMsg('successful').then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message contain success');
      }
    });
  }

  public async isUXRejectDialogMsg(msg: string) {
    await this.page.hasUxRejectDialogInfoMsg(msg).then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message contain ' + msg);
      }
    });
  }

  public async isTradeSuccess() {
    await this.page.hasTradeInfoMsg('successful').then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message contain success');
      }
    });
  }

  public async isSAMError() {
    await this.page.hasSAMInfoMsg('Error').then(async (_value) => {
      if (_value) {
        throw new Error('Page failed. Actual message has error');
      }
    });
  }

  public async isSAMSuccess() {
    await this.page.hasSAMSuccess('Success').then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message is Success');
      }
    });
  }

  public async isFilesExchangeDialogSuccess() {
    await this.page.hasFilesExchangeDialogInfoMsg('successful').then(async (_value) => {
      if (!_value) {
        throw new Error('Page failed. Expected message contain success');
      }
    });
  }



}

class DateSelectEnsurer extends WebComponentEnsurer {
  protected dateSelect: DateSelect;
  constructor(dateSelect: DateSelect) {
    super(dateSelect);
    this.dateSelect = dateSelect;
  }

  public async isDisable() {
    if (await this.dateSelect.isDisable()) {
      console.error(`DateSelect ${this.dateSelect.selector} is disabled`);
    } else {
      throw new Error(`DateSelect ${this.dateSelect.selector} is enable`);
    }
  }

  public async isToday() {
    await this.dateSelect.getDate().then(dataStr => {
      console.error('default date:' + dataStr);
      let currentDate = moment(new Date()).format('DD MMM YYYY');
      console.error('current date:' + currentDate);
      if (currentDate !== dataStr) {
        throw new Error(`Payment data doesn't default to current date`);
      }
    });
  }
}

class GateWayJsonApiEnsurer {
  constructor(private gateWayApi: GateWayJsonApi) {

  }
  public async isNotEmpty() {
    if (this.gateWayApi.isNotEmpty()) {
      return true;
    } else {
      throw new Error('GateWayApi response is undefined');
    }
  }

  // Determine whether mandatory field
  public async isMandatory(matchesData: any, isMandatory?: boolean) {
    if ((undefined !== matchesData) && (isMandatory ? isMandatory : 'Optional')) {
      return true;
    } else {
      throw new Error(`GateWayApi request ${matchesData} must be mandatory`);
    }
  }

  //Determine whether within the max length
  public async isWithinLength(matchesData: string, length: number) {
    if (matchesData.length <= length) {
      return true;
    } else {
      throw new Error(`The field length cannot greater than ${length}`);
    }
  }

  //Validate date format whether it is yyyy-mm-ddd
  public async dateValidate(date: string) {
    let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    if (date.match(reg)) {
      return true;
    } else {
      throw new Error(`${date} is not the correct date format, correct format should be yyyy-mmm-dd`);
    }
  }

  // Determine whether a field has a value.
  public async isReturnValue(attr: string, isMandatory?: boolean) {
    if (this.gateWayApi.hasAttr(attr) && (isMandatory ? isMandatory : 'Optional')) {
      return true;
    } else {
      throw new Error(`GateWayApi response attribute ${attr} must be return value`);
    }
  }

  // Match single file value is equal to expect value.
  public async isMatchesValue(attr: string, value: any) {
    if (this.gateWayApi.match(attr, value)) {
      return true;
    } else {
      throw new Error(`GateWayApi response failed attribute ${attr} with value  ` +
        eval("(" + 'this.gateWayApi.response.' + attr + ")") +
        `, expect value is ${value}`);
    }
  }

  // Match file data total count is equal to expect count.
  public async isMatchesCount(attr: string, count: number) {
    if (this.isReturnValue(attr, true)) {
      if (this.gateWayApi.isCountMatch(attr, count)) {
        return true;
      } else {
        throw new Error(`GateWayApi response attribute ${attr} with count ` +
          eval("(" + 'this.gateWayApi.response.' + attr + ")").length + `, expect count is ${count}`);
      }
    }
  }

  // Determine file data is intersect with expect data.
  public async isMatchesIntersection(attr: string, matchKey: string, matchValue: string, intersectionKey: string, intersectionValue: any[]) {
    if (this.gateWayApi.isIntersection(attr, matchKey, matchValue, intersectionKey, intersectionValue)) {
      return true;
    } else {
      throw new Error(`GateWayApi response attribute ${attr} is no such authorityValue ${matchValue}`);
    }
  }

  // Match multi file data  is equal to expect Data (param tempMapData can be used multi-layer structure)
  public async isMatchesCollection(attr: string, tempMapData: object) {
    if (this.gateWayApi.isMatchesCollection(attr, tempMapData)) {
      return true
    } else {
      throw new Error(`GateWayApi response attribute ${attr} is no such authorityValue ${tempMapData}`);
    }
  }

  public async isSuccess(attr: string, value: string) {
    if (this.gateWayApi.match(attr, value)) {
      return true;
    } else {
      throw new Error(`GateWayApi response failed attribute ${attr} with value  ` +
        eval("(" + 'this.gateWayApi.response.' + attr + ")") +
        `, expect value is ${value}`);
    }
  }
}

export function ensure(component: Page): PageEnsurer;
export function ensure(component: Button): ButtonEnsurer;
export function ensure(component: DateSelect): DateSelectEnsurer;
export function ensure(component: TextInput): TextInputEnsurer;
export function ensure(component: WebComponent): WebComponentEnsurer;
export function ensure(component: GateWayJsonApi): GateWayJsonApiEnsurer;
export function ensure(component: GateWayJsonApi | WebComponent | TextInput | Button | Page): any {
  if (component instanceof Page) {
    return new PageEnsurer(component);
  } else if (component instanceof Button) {
    return new ButtonEnsurer(component);
  } else if (component instanceof DateSelect) {
    return new DateSelectEnsurer(component);
  } else if (component instanceof TextInput) {
    return new TextInputEnsurer(component);
  } else if (component instanceof WebComponent) {
    return new WebComponentEnsurer(component);
  } else if (component instanceof GateWayJsonApi) {
    return new GateWayJsonApiEnsurer(component);
  }
}

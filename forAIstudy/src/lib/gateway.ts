/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser } from "protractor";
import * as _ from 'lodash';
const { URL } = require('url');

export abstract class WebGateWay {

  public host: string;
  public response: object;

  constructor(public gateWayApi: string) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    this.host = this.getHost();
  }
  protected getHost(): string {
    const currentUrl = new URL(browser.baseUrl);
    return currentUrl.origin;
  }

  public setGateWayApi(_GateWayApi: string) {
    this.gateWayApi = _GateWayApi
  }

}

export class GateWayJsonApi extends WebGateWay {

  constructor(gateWayApi: string) {
    super(gateWayApi);
  }

  public async post(param: object) {
    let supertest = require('supertest');
    let that = this;
    await supertest(this.host).post(this.gateWayApi)
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(param)
      .expect('Content-Type', /json/)//.expect(200)
      .then(function (res) {//
        that.response = res.body
        console.log(`response => ${JSON.stringify(that.response)}`);
      });
  }

  public isEmpty() {
    return undefined === this.response || null == this.response;
  }

  public isNotEmpty() {
    return !this.isEmpty();
  }

  public getValue(attr: string) {
    return eval("(" + 'this.response.' + attr + ")");
  }

  public hasAttr(attr: string) {
    return undefined !== this.getValue(attr);
  }

  public isCountMatch(attr: string, count: number) {
    return count === this.getValue(attr).length;
  }

  public getMatchData(attr: any, matchKey: string, matchValue: string) {
    return _.find(attr, [matchKey, matchValue]);

  }

  public isMatchesProperty(matchData: any, matchKey: string, matchValue: string) {
    return _.some(matchData, [matchKey, matchValue]);
  }

  public isIntersection(attr: string, matchKey: string, matchValue: string, intersectionKey: string, intersectionValue: any[]) {
    let attrData = _.find(this.getValue(attr), [matchKey, matchValue]);
    let intersectionData = _.get(attrData, intersectionKey);
    return _.intersection(intersectionData, intersectionValue).length > 0;
  }

  public isMatchesCollection(attr: string, tempMapData: object) {
    let authorityData = _.castArray(this.getValue(attr));
    let tempMapDataKey = _.keys(tempMapData);
    let tempMapDataValue = _.values(tempMapData);
    let index = _.indexOf(tempMapDataKey, 'authorizedTypeCodes.values');
    if (index > -1) {
      tempMapDataKey.splice(index, 1);
      tempMapDataValue.splice(index, 1);
      let authorizedTypeCodes = tempMapData['authorizedTypeCodes.values'];
      return this.handleAuthorizedTypeCodes(authorityData, authorizedTypeCodes) && this.handleMatchesCollection(authorityData, tempMapDataKey, tempMapDataValue);
    } else {
      return this.handleMatchesCollection(authorityData, tempMapDataKey, tempMapDataValue);
    }
  }



  public match(attr: string, value: any) {
    return !this.isEmpty() && this.hasAttr(attr) && (value === this.getValue(attr));
  }

  private handleMatchesCollection(MatchData: any[], tempMapDataKey: any[], tempMapDataValue: any[]) {
    return _.some(MatchData, function (o) {
      let length = tempMapDataKey.length;
      let i = 0;
      let p1 = true;
      while (i < length) {
        p1 = p1 && (_.get(o, tempMapDataKey[i]).toString() === tempMapDataValue[i].toString());
        i++;
      }
      return p1;
    })
  }

  private handleAuthorizedTypeCodes(MatchData: any[], authorizedTypeCodes: any[]) {
    return _.some(MatchData, function (o) {
      if (_.get(o, 'authorizedTypeCodes.values').every(a => authorizedTypeCodes.some(b => a === b)) &&
        authorizedTypeCodes.every(_b => _.get(o, 'authorizedTypeCodes.values').some(_a => _a === _b))) {
        return true;
      } else {
        let differenceValue = _.difference(_.get(o, 'authorizedTypeCodes.values'), authorizedTypeCodes);
        throw new Error(`AuthorizedTypeCodes not equal to ${authorizedTypeCodes}` +
          `, difference value is ${differenceValue}`)
      }
    });
  }
}


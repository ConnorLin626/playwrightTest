/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { CompanyProfilePage } from './CompanyProfilePage';
import { BankAccountSettingPage } from './BankAccountSettingPage';
import { ApprovalGroupPage } from './ApprovalGroupPage';
import { ApprovalPoliciesPage } from './ApprovalPoliciesPage';
import { TestPages } from '../../../lib';
import { runInThisContext } from 'vm';

export {
  CompanyProfilePage, BankAccountSettingPage, ApprovalGroupPage, ApprovalPoliciesPage,
};

export class CompanyProfilePages extends TestPages {
  public companyProfilePage: CompanyProfilePage;
  public bankAccountSettingPage: BankAccountSettingPage;
  public approvalGrouppage: ApprovalGroupPage;
  public approvalPoliciesPage: ApprovalPoliciesPage;

  constructor() {
    super();
    this.companyProfilePage = new CompanyProfilePage();
    this.bankAccountSettingPage = new BankAccountSettingPage();
    this.approvalGrouppage = new ApprovalGroupPage();
    this.approvalPoliciesPage = new ApprovalPoliciesPage();
  }

}
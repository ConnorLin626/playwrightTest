/*
 * Playwright 工具函数库
 * 基于 forAIstudy/src/lib/utils.ts 适配
 */

/**
 * 获取当前工作目录
 */
export function getBasePath(): string {
  return process.cwd();
}

/**
 * 获取数据文件目录
 */
export function getDataPath(): string {
  return getBasePath() + '/data';
}

/**
 * 生成随机 ID (5位)
 */
export function generatedID(): string {
  return ((Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
}

/**
 * 生成随机数字 (5位)
 */
export function randomNumbers(): string {
  let rand = "";
  for (let i = 0; i < 5; i++) {
    rand += Math.floor(Math.random() * 10);
  }
  console.log(rand);
  return rand;
}

/**
 * 生成随机字母和数字组合
 * @param min 最小长度
 * @param max 最大长度
 */
export function randomAlphabetAndNumbers(min: number, max?: number): string {
  var returnStr = "",
    range = (max ? Math.round(Math.random() * (max - min)) + min : min),
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (var i = 0; i < range; i++) {
    var index = Math.round(Math.random() * (arr.length - 1));
    returnStr += arr[index];
  }
  return returnStr;
}

/**
 * 生成随机字符串
 * @param length 字符串长度
 */
export function getRandomString(length: number): string {
  const text = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const rdmIndex = (text: string) => Math.random() * text.length | 0;
  let rdmString = '';
  for (; rdmString.length < length; rdmString += text.charAt(rdmIndex(text)));
  return rdmString;
}

/**
 * 解析 URL 查询参数
 * @param url URL 地址
 */
export function parseUrl(url: string): any {
  let queryObj: any = {};
  let reg = /[?&]([^=&#]+)=([^&#]*)/g;
  let querys = url.match(reg);
  if (querys) {
    for (let i in querys) {
      let query = querys[i].split('=');
      let key = query[0].substr(1), value = query[1];
      queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
    }
  }
  return queryObj;
}

/**
 * 格式化数字为金额格式 (1,000,000)
 * @param num 数字字符串
 */
export function formatStr2Money(num: string): string {
  let result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}

/**
 * 添加路径分隔符
 * @param string1 路径1
 * @param string2 路径2
 */
export function addTail(string1: string, string2: string): string {
  if (string1.endsWith('/') && string2.startsWith('/')) {
    return string1 + string2.substr(1);
  } else if (!string1.endsWith('/') && !string2.startsWith('/')) {
    return string1 + '/' + string2
  } else {
    return string1 + string2;
  }
}

/**
 * 获取文件名（不包含路径）
 * @param fileName 完整文件路径
 */
export function getFileName(fileName: string): string {
  return fileName.split('/').pop();
}

/**
 * 数据列表类型枚举
 */
export enum DATALIST_TYPE {
  DEFAULT = 1,
  PAYNOW
}

/**
 * 项目类型枚举
 */
export enum PROJECT_TYPE {
  CB = 'CB',
  SU = 'SU',
  SSM = 'SSM',
  IDEALX = 'IDEALX'
}

/**
 * SIT 环境判断
 * 根据环境变量或 baseURL 判断是否为 SIT 环境
 */
export const SIT = (() => {
  const baseURL = process.env.BASE_URL || '';
  const testEnv = process.env.TEST_ENV || 'SIT';
  
  // 如果 URL 中不包含 'ideal-uat.dbs.com'，则为 SIT
  return baseURL.indexOf('ideal-uat.dbs.com') === -1 && testEnv.toUpperCase() !== 'UAT';
})();

/**
 * UAT 环境判断
 * 根据环境变量或 baseURL 判断是否为 UAT 环境
 */
export const UAT = (() => {
  const baseURL = process.env.BASE_URL || '';
  const testEnv = process.env.TEST_ENV || 'SIT';
  
  // 如果 URL 中包含 'ideal-uat.dbs.com' 或者环境变量为 UAT，则为 UAT
  return baseURL.indexOf('ideal-uat.dbs.com') !== -1 || testEnv.toUpperCase() === 'UAT';
})();

/**
 * 获取当前环境
 * @returns 'SIT' | 'UAT' | 'PROD'
 */
export function getCurrentEnvironment(): 'SIT' | 'UAT' | 'PROD' {
  if (UAT) return 'UAT';
  if (SIT) return 'SIT';
  return 'PROD';
}

/**
 * 打印环境信息
 */
export function printEnvironmentInfo(): void {
  console.log('='.repeat(50));
  console.log('Environment Information:');
  console.log(`  BASE_URL: ${process.env.BASE_URL || 'Not set'}`);
  console.log(`  TEST_ENV: ${process.env.TEST_ENV || 'SIT'}`);
  console.log(`  Current Environment: ${getCurrentEnvironment()}`);
  console.log(`  SIT: ${SIT}`);
  console.log(`  UAT: ${UAT}`);
  console.log('='.repeat(50));
}

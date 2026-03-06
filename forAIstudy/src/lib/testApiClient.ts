/**
 * 测试专用API客户端
 * 与具体测试文件解耦，支持代码复用
 */
import * as https from "https";
import request = require("supertest");

export interface ApiResponse<T = any> {
  status: number;
  data: T;
}

export interface ApiConfig {
  baseUrls: Record<string, string>;
  env: string;
  requestOptions: {
    timeout: number;
    rejectUnauthorized: boolean;
  };
  apiPaths: Record<string, any>;
}

export class TestApiClient {
  private apiConfig: ApiConfig;

  constructor(config?: ApiConfig) {
    this.apiConfig = config || {
      baseUrls: {
        UAT: "https://192.168.0.251:9444",
        SIT: "https://192.168.0.251:9444"
      },
      env: "SIT",
      requestOptions: {
        timeout: 20000,
        rejectUnauthorized: false
      },
      apiPaths: {} // 空的apiPaths，由各个测试用例自己定义
    };
  }

  /**
   * 获取Supertest实例
   */
  private getSupertestInstance() {
    const baseUrl = this.apiConfig.baseUrls[this.apiConfig.env];
    return request(baseUrl);
  }

  /**
   * 发送POST请求
   */
  async post<T = any>(path: string, data: any): Promise<ApiResponse<T>> {
    try {
      console.log(`[API请求] POST ${this.apiConfig.baseUrls[this.apiConfig.env]}${path}`);
      console.log(`[请求体] ${JSON.stringify(data, null, 2)}`);

      const response = await this.getSupertestInstance()
        .post(path)
        .set("Content-Type", "application/json")
        .timeout(this.apiConfig.requestOptions.timeout)
        .send(data)
        .agent(new https.Agent({
          rejectUnauthorized: this.apiConfig.requestOptions.rejectUnauthorized,
        }));

      console.log(`[API响应] 状态码：${response.status}`);
      console.log(`[响应体] ${JSON.stringify(response.body, null, 2)}`);

      return {
        status: response.status,
        data: response.body as T,
      };
    } catch (error) {
      console.error(`[API错误] ${(error as Error).message}`);
      throw new Error(`API请求失败：${(error as Error).message}`);
    }
  }

  /**
   * 发送GET请求
   */
  async get<T = any>(path: string, params?: any): Promise<ApiResponse<T>> {
    try {
      console.log(`[API请求] GET ${this.apiConfig.baseUrls[this.apiConfig.env]}${path}`);
      if (params) {
        console.log(`[请求参数] ${JSON.stringify(params, null, 2)}`);
      }

      const response = await this.getSupertestInstance()
        .get(path)
        .query(params)
        .set("Content-Type", "application/json")
        .timeout(this.apiConfig.requestOptions.timeout)
        .agent(new https.Agent({
          rejectUnauthorized: this.apiConfig.requestOptions.rejectUnauthorized,
        }));

      return {
        status: response.status,
        data: response.body as T,
      };
    } catch (error) {
      console.error(`[API错误] ${(error as Error).message}`);
      throw new Error(`API请求失败：${(error as Error).message}`);
    }
  }
}
import SftpClientLib from 'ssh2-sftp-client';
import * as fs from 'fs';
import * as path from 'path';

/**
 * SFTP 连接配置接口
 */
export interface SftpConfig {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string | Buffer;
  passphrase?: string;
}

/**
 * SFTP 完整配置接口（包含远程路径和描述）
 */
export interface SftpConnectionConfig extends SftpConfig {
  remoteBasePath?: string;
  description?: string;
}

/**
 * SFTP 配置文件结构
 */
export interface SftpConfigFile {
  sftp: {
    [environment: string]: SftpConnectionConfig;
  };
  directories?: {
    [name: string]: string;
  };
  filePatterns?: {
    [type: string]: string;
  };
}

/**
 * SFTP 客户端工具类
 * 用于连接远程 SFTP 服务器，支持文件上传、下载、列表等操作
 */
export class SftpClient {
  private client: SftpClientLib;
  private connected: boolean = false;

  constructor() {
    this.client = new SftpClientLib();
  }

  /**
   * 从配置文件加载指定环境的配置
   * @param configPath - 配置文件路径
   * @param environment - 环境名称 (SIT/UAT/PROD)
   * @returns SFTP 连接配置
   */
  static loadConfig(
    configPath: string,
    environment: string
  ): SftpConnectionConfig {
    const absolutePath = path.resolve(process.cwd(), configPath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Config file not found: ${absolutePath}`);
    }

    const configContent = fs.readFileSync(absolutePath, 'utf-8');
    const config: SftpConfigFile = JSON.parse(configContent);

    if (!config.sftp || !config.sftp[environment]) {
      throw new Error(
        `SFTP config for environment '${environment}' not found in ${configPath}`
      );
    }

    const sftpConfig = config.sftp[environment];

    // 如果配置了私钥路径，读取私钥内容
    if (sftpConfig.privateKey && typeof sftpConfig.privateKey === 'string') {
      if (fs.existsSync(sftpConfig.privateKey)) {
        sftpConfig.privateKey = fs.readFileSync(sftpConfig.privateKey);
      }
    }

    console.log(
      `Loaded SFTP config for ${environment}: ${sftpConfig.description || sftpConfig.host}`
    );

    return sftpConfig;
  }

  /**
   * 从配置文件加载所有环境的配置
   * @param configPath - 配置文件路径
   * @returns 所有环境的配置
   */
  static loadAllConfigs(configPath: string): SftpConfigFile {
    const absolutePath = path.resolve(process.cwd(), configPath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Config file not found: ${absolutePath}`);
    }

    const configContent = fs.readFileSync(absolutePath, 'utf-8');
    const config: SftpConfigFile = JSON.parse(configContent);

    // 读取所有私钥
    Object.values(config.sftp).forEach((sftpConfig) => {
      if (sftpConfig.privateKey && typeof sftpConfig.privateKey === 'string') {
        if (fs.existsSync(sftpConfig.privateKey)) {
          sftpConfig.privateKey = fs.readFileSync(sftpConfig.privateKey);
        }
      }
    });

    return config;
  }

  /**
   * 获取配置文件中的目录配置
   * @param configPath - 配置文件路径
   * @param directoryName - 目录名称
   * @returns 目录路径
   */
  static getDirectory(
    configPath: string,
    directoryName: string
  ): string {
    const config = SftpClient.loadAllConfigs(configPath);

    if (!config.directories || !config.directories[directoryName]) {
      throw new Error(
        `Directory '${directoryName}' not found in config file`
      );
    }

    return config.directories[directoryName];
  }

  /**
   * 获取配置文件中的文件模式
   * @param configPath - 配置文件路径
   * @param patternName - 模式名称
   * @returns 文件模式
   */
  static getFilePattern(
    configPath: string,
    patternName: string
  ): string {
    const config = SftpClient.loadAllConfigs(configPath);

    if (!config.filePatterns || !config.filePatterns[patternName]) {
      throw new Error(`File pattern '${patternName}' not found in config file`);
    }

    return config.filePatterns[patternName];
  }

  /**
   * 在测试失败时获取服务器日志（支持按用户筛选）
   * @param configPath - 配置文件路径
   * @param environment - 环境名称
   * @param logFilePath - 远程日志文件路径
   * @param lines - 获取的行数
   * @param testName - 测试名称（用于命名日志文件）
   * @param userKeywords - 用户关键字数组，用于筛选日志（如 ['AUTOSG01A18', 'AUTOSG01']）
   * @returns 本地日志文件路径
   */
  static async fetchServerLogsOnFailure(
    configPath: string,
    environment: string,
    logFilePath: string,
    lines: number = 50,
    testName?: string,
    userKeywords?: string[]
  ): Promise<string | null> {
    const sftp = new SftpClient();

    try {
      const config = SftpClient.loadConfig(configPath, environment);

      console.log(`Connecting to SFTP server: ${config.host}:${config.port}`);
      await sftp.connect(config);

      // 查找日志文件（支持多个备选路径）
      const altPaths = logFilePath.includes(',') ? logFilePath.split(',') : [logFilePath];
      const foundPath = await sftp.findLogFile(altPaths);

      if (!foundPath) {
        console.warn(`Log file not found: ${logFilePath}`);
        await sftp.disconnect();
        return null;
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const testNameSuffix = testName ? `${testName.replace(/\s+/g, '_')}_` : '';
      const userSuffix = userKeywords && userKeywords.length > 0
        ? `user_${userKeywords[0]}_`
        : '';
      const logFileName = `${testNameSuffix}${userSuffix}logs_${lines}_lines_${timestamp}.txt`;

      const tempDir = path.join(process.cwd(), 'test_failure_logs');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // 根据是否有用户关键字选择不同的处理方式
      let finalLogPath: string;

      if (userKeywords && userKeywords.length > 0) {
        // 按用户筛选日志
        console.log(`Filtering logs for user: ${userKeywords.join(', ')}`);
        const filteredLogPath = await sftp.getUserLogLines(foundPath, userKeywords, lines);

        // 移动到最终位置
        const userLogFileName = `${testNameSuffix}${userSuffix}logs_${lines}_lines_${timestamp}.txt`;
        finalLogPath = path.join(tempDir, userLogFileName);
        fs.copyFileSync(filteredLogPath, finalLogPath);
        fs.unlinkSync(filteredLogPath);

        console.log(`Server logs (user filtered) saved to: ${finalLogPath}`);
      } else {
        // 获取末尾N行（不筛选）
        const tempFullPath = path.join(tempDir, `temp_${timestamp}.txt`);
        await sftp.downloadFile(foundPath, tempFullPath);

        // 读取并提取最后 N 行
        const content = fs.readFileSync(tempFullPath, 'utf-8');
        const allLines = content.split('\n');
        const tailLines = allLines.slice(-lines);

        // 保存最后 N 行到最终文件
        finalLogPath = path.join(tempDir, logFileName);
        const header = `=== Test Failure Log ===\n`;
        const header2 = `Test: ${testName || 'Unknown'}\n`;
        const header3 = `Server: ${config.host}\n`;
        const header4 = `Remote Path: ${foundPath}\n`;
        const header5 = `Timestamp: ${new Date().toISOString()}\n`;
        const header6 = `Lines: ${lines}\n`;
        const header7 = `${'='.repeat(50)}\n\n`;

        fs.writeFileSync(
          finalLogPath,
          header + header2 + header3 + header4 + header5 + header6 + header7 + tailLines.join('\n')
        );

        // 删除临时文件
        fs.unlinkSync(tempFullPath);

        console.log(`Server logs saved to: ${finalLogPath}`);
      }

      await sftp.disconnect();
      return finalLogPath;

    } catch (error) {
      console.error('Failed to fetch server logs:', error);
      await sftp.disconnect();
      return null;
    }
  }

  /**
   * 加载日志配置
   * @param configPath - 配置文件路径
   * @returns 日志配置
   */
  static getLogConfig(configPath: string): { eplogPath: string; alternativePaths: string[] } {
    const config = SftpClient.loadAllConfigs(configPath);
    return {
      eplogPath: (config as any).logs?.eplogPath || '/eplog/eplog.txt',
      alternativePaths: (config as any).logs?.alternativePaths || []
    };
  }

  /**
   * 连接到 SFTP 服务器
   * @param config - SFTP 连接配置
   */
  async connect(config: SftpConfig): Promise<void> {
    if (this.connected) {
      console.log('Already connected to SFTP server');
      return;
    }

    const connectionConfig: SftpClientLib.ConnectOptions = {
      host: config.host,
      port: config.port,
      username: config.username,
    };

    if (config.password) {
      connectionConfig.password = config.password;
    } else if (config.privateKey) {
      connectionConfig.privateKey = config.privateKey;
      if (config.passphrase) {
        connectionConfig.passphrase = config.passphrase;
      }
    }

    await this.client.connect(connectionConfig);
    this.connected = true;
    console.log(`Connected to SFTP server: ${config.host}:${config.port}`);
  }

  /**
   * 断开 SFTP 连接
   */
  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.client.end();
      this.connected = false;
      console.log('Disconnected from SFTP server');
    }
  }

  /**
   * 上传文件到远程服务器
   * @param localPath - 本地文件路径
   * @param remotePath - 远程文件路径
   */
  async uploadFile(localPath: string, remotePath: string): Promise<void> {
    this.ensureConnected();
    await this.client.put(localPath, remotePath);
    console.log(`Uploaded: ${localPath} -> ${remotePath}`);
  }

  /**
   * 上传目录到远程服务器
   * @param localDir - 本地目录路径
   * @param remoteDir - 远程目录路径
   */
  async uploadDirectory(localDir: string, remoteDir: string): Promise<void> {
    this.ensureConnected();
    await this.client.uploadDir(localDir, remoteDir);
    console.log(`Uploaded directory: ${localDir} -> ${remoteDir}`);
  }

  /**
   * 从远程服务器下载文件
   * @param remotePath - 远程文件路径
   * @param localPath - 本地文件路径
   */
  async downloadFile(remotePath: string, localPath: string): Promise<void> {
    this.ensureConnected();
    // 确保本地目录存在
    const localDir = path.dirname(localPath);
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    await this.client.get(remotePath, localPath);
    console.log(`Downloaded: ${remotePath} -> ${localPath}`);
  }

  /**
   * 从远程服务器下载目录
   * @param remoteDir - 远程目录路径
   * @param localDir - 本地目录路径
   */
  async downloadDirectory(remoteDir: string, localDir: string): Promise<void> {
    this.ensureConnected();
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    await this.client.downloadDir(remoteDir, localDir);
    console.log(`Downloaded directory: ${remoteDir} -> ${localDir}`);
  }

  /**
   * 列出远程目录内容
   * @param remotePath - 远程目录路径
   * @returns 文件列表
   */
  async listFiles(remotePath: string): Promise<SftpClientLib.FileInfo[]> {
    this.ensureConnected();
    const files = await this.client.list(remotePath);
    console.log(`Listed ${files.length} items in ${remotePath}`);
    return files;
  }

  /**
   * 检查远程文件是否存在
   * @param remotePath - 远程文件路径
   * @returns 是否存在
   */
  async exists(remotePath: string): Promise<boolean> {
    this.ensureConnected();
    const result = await this.client.exists(remotePath);
    return result !== false;
  }

  /**
   * 创建远程目录
   * @param remotePath - 远程目录路径
   */
  async createDirectory(remotePath: string): Promise<void> {
    this.ensureConnected();
    await this.client.mkdir(remotePath, true);
    console.log(`Created directory: ${remotePath}`);
  }

  /**
   * 删除远程文件
   * @param remotePath - 远程文件路径
   */
  async deleteFile(remotePath: string): Promise<void> {
    this.ensureConnected();
    await this.client.delete(remotePath);
    console.log(`Deleted file: ${remotePath}`);
  }

  /**
   * 删除远程目录
   * @param remotePath - 远程目录路径
   */
  async deleteDirectory(remotePath: string): Promise<void> {
    this.ensureConnected();
    await this.client.rmdir(remotePath, true);
    console.log(`Deleted directory: ${remotePath}`);
  }

  /**
   * 重命名远程文件或目录
   * @param oldPath - 原路径
   * @param newPath - 新路径
   */
  async rename(oldPath: string, newPath: string): Promise<void> {
    this.ensureConnected();
    await this.client.rename(oldPath, newPath);
    console.log(`Renamed: ${oldPath} -> ${newPath}`);
  }

  /**
   * 获取远程文件信息
   * @param remotePath - 远程文件路径
   * @returns 文件信息
   */
  async getFileInfo(remotePath: string): Promise<SftpClientLib.FileInfo> {
    this.ensureConnected();
    const stat = await this.client.stat(remotePath);
    return stat;
  }

  /**
   * 获取远程文件的末尾 N 行内容
   * @param remotePath - 远程文件路径
   * @param lines - 要获取的行数
   * @returns 文件内容（本地临时路径）
   */
  async getTailLines(
    remotePath: string,
    lines: number = 50
  ): Promise<string> {
    this.ensureConnected();

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'temp_logs');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // 下载整个文件到临时目录
    const tempFileName = `tail_${Date.now()}_${path.basename(remotePath)}`;
    const tempFilePath = path.join(tempDir, tempFileName);

    await this.client.get(remotePath, tempFilePath);

    // 读取文件并提取最后 N 行
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    const allLines = content.split('\n');
    const tailLines = allLines.slice(-lines);

    // 创建新的文件只包含最后 N 行
    const tailFileName = `tail_last_${lines}_${path.basename(remotePath)}`;
    const tailFilePath = path.join(tempDir, tailFileName);
    fs.writeFileSync(tailFilePath, tailLines.join('\n'));

    console.log(
      `Retrieved last ${lines} lines from ${remotePath}: ${tailFilePath}`
    );

    // 删除临时下载的完整文件
    fs.unlinkSync(tempFilePath);

    return tailFilePath;
  }

  /**
   * 获取远程文件的末尾 N 行内容并返回字符串
   * @param remotePath - 远程文件路径
   * @param lines - 要获取的行数
   * @returns 文件内容字符串
   */
  async getTailLinesAsString(
    remotePath: string,
    lines: number = 50
  ): Promise<string> {
    const tempFilePath = await this.getTailLines(remotePath, lines);
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    return content;
  }

  /**
   * 获取远程文件中包含指定用户关键字的日志行（末尾 N 行）
   * @param remotePath - 远程文件路径
   * @param userKeywords - 用户关键字数组（如 ['AUTOSG01A18', 'AUTOSG01']）
   * @param maxLines - 最大返回行数（筛选后的）
   * @returns 筛选后的日志内容
   */
  async getUserLogLines(
    remotePath: string,
    userKeywords: string[],
    maxLines: number = 50
  ): Promise<string> {
    this.ensureConnected();

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'temp_logs');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // 下载文件到临时目录
    const tempFileName = `userlog_${Date.now()}_${path.basename(remotePath)}`;
    const tempFilePath = path.join(tempDir, tempFileName);

    await this.client.get(remotePath, tempFilePath);

    // 读取文件内容
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    const allLines = content.split('\n');

    // 筛选包含用户关键字的行
    const filteredLines = allLines.filter((line) => {
      return userKeywords.some((keyword) => line.includes(keyword));
    });

    // 获取最后 N 行（筛选后的）
    const tailFilteredLines = filteredLines.slice(-maxLines);

    // 创建结果文件
    const resultFileName = `userlog_filtered_${Date.now()}.txt`;
    const resultFilePath = path.join(tempDir, resultFileName);

    const header = `=== 用户日志筛选结果 ===\n`;
    const header2 = `筛选关键字: ${userKeywords.join(', ')}\n`;
    const header3 = `原始日志总行数: ${allLines.length}\n`;
    const header4 = `匹配行数: ${filteredLines.length}\n`;
    const header5 = `显示行数: ${tailFilteredLines.length}\n`;
    const header6 = `${'='.repeat(50)}\n\n`;

    fs.writeFileSync(
      resultFilePath,
      header + header2 + header3 + header4 + header5 + header6 + tailFilteredLines.join('\n')
    );

    // 删除临时文件
    fs.unlinkSync(tempFilePath);

    console.log(
      `Filtered user log: ${filteredLines.length} matching lines, ${tailFilteredLines.length} displayed`
    );

    return resultFilePath;
  }

  /**
   * 获取远程文件中包含指定用户关键字的日志行（末尾 N 行），返回字符串
   * @param remotePath - 远程文件路径
   * @param userKeywords - 用户关键字数组
   * @param maxLines - 最大返回行数
   * @returns 筛选后的日志内容字符串
   */
  async getUserLogLinesAsString(
    remotePath: string,
    userKeywords: string[],
    maxLines: number = 50
  ): Promise<string> {
    const tempFilePath = await this.getUserLogLines(remotePath, userKeywords, maxLines);
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    return content;
  }

  /**
   * 查找正确的日志文件路径（尝试多个可能的路径）
   * @param alternativePaths - 备选路径数组
   * @returns 找到的日志文件路径，如果都没找到返回 null
   */
  async findLogFile(alternativePaths: string[]): Promise<string | null> {
    this.ensureConnected();

    for (const logPath of alternativePaths) {
      try {
        const exists = await this.exists(logPath);
        if (exists) {
          console.log(`Found log file: ${logPath}`);
          return logPath;
        }
      } catch (e) {
        // 继续尝试下一个路径
      }
    }

    console.warn(`Log file not found in any of: ${alternativePaths.join(', ')}`);
    return null;
  }

  /**
   * 确保已连接到 SFTP 服务器
   */
  private ensureConnected(): void {
    if (!this.connected) {
      throw new Error('Not connected to SFTP server. Call connect() first.');
    }
  }
}

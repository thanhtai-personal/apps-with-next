import { EncryptConfig } from "@/config";
import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly iv = randomBytes(16);
  private readonly secretKey = EncryptConfig.secretKey || 'default_secret_key';
  private key: Buffer | undefined;

  constructor() {
    this.init();
  }

  private async init() {
    this.key = (await promisify(scrypt)(this.secretKey, 'salt', 32)) as Buffer;
  }

  async encrypt(jsonData: string): Promise<string> {
    const cipher = createCipheriv(this.algorithm, this.key!, this.iv);
    const encryptedText = Buffer.concat([
      cipher.update(jsonData),
      cipher.final(),
    ]);
    return encryptedText.toString();
  }

  async decrypt(encryptedText: string): Promise<any> {
    const decipher = createDecipheriv('aes-256-ctr', this.key!, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText)),
      decipher.final(),
    ]);

    return JSON.parse(decryptedText.toString());
  }
}

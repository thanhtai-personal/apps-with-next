export abstract class DomainException extends Error {
  abstract errCode: string;
  abstract domain: string;

  constructor(message: string) {
    super();
    this.message = message;
  }

  toJSON() {
    return {
      errCode: this.errCode,
      domain: this.domain,
    };
  }
}

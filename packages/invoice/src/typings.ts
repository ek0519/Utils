import { PaymentItem } from '@rytass/payments';

export enum InvoiceAwardType {
  TWO_HUNDRED = 6,
  ONE_THOUSAND = 5,
  FOUR_THOUSAND = 4,
  TEN_THOUSAND = 3,
  FORTY_THOUSAND = 2,
  TWO_HUNDRED_THOUSAND = 1,
  TWO_MILLION = 7,
  TEN_MILLION = 8,
  CLOUD_TWO_THOUSAND = 9,
  ONE_MILLION = 10,
  FIVE_HUNDRED = 11,
  EIGHT_HUNDRED = 12,
}

export enum InvoiceCarrierType {
  PRINT = 'PRINT',
  MOBILE = 'MOBILE',
  MOICA = 'MOICA',
  LOVE_CODE = 'LOVE_CODE',
  MEMBER = 'MEMBER',
  PLATFORM = 'PLATFORM',
}

interface InvoiceCarrierBase {
  type: InvoiceCarrierType;
}

export interface InvoiceAllowanceOptions {
  taxType?: Omit<TaxType, TaxType.MIXED | TaxType.SPECIAL>;
}

export type InvoicePaymentItem = PaymentItem & {
  taxType?: Omit<TaxType, TaxType.MIXED>;
}

export interface InvoiceVoidOptions {
  reason: string;
}

export interface InvoicePrintCarrier extends InvoiceCarrierBase {
  type: InvoiceCarrierType.PRINT;
}

export interface InvoiceMobileCarrier extends InvoiceCarrierBase {
  type: InvoiceCarrierType.MOBILE;
  code: string;
}

export interface InvoiceMoicaCarrier extends InvoiceCarrierBase {
  type: InvoiceCarrierType.MOICA;
  code: string;
}

export interface InvoiceLoveCodeCarrier extends InvoiceCarrierBase {
  type: InvoiceCarrierType.LOVE_CODE;
  code: string;
}

export interface InvoicMemberCarrier extends InvoiceCarrierBase {
  type: InvoiceCarrierType.MEMBER;
  code: string;
}

export interface InvoicPlatformCarrier extends InvoiceCarrierBase {
  type: InvoiceCarrierType.PLATFORM;
  code: string;
}

export type InvoiceCarrier = InvoicePrintCarrier
  | InvoiceMobileCarrier
  | InvoiceMoicaCarrier
  | InvoiceLoveCodeCarrier
  | InvoicMemberCarrier
  | InvoicPlatformCarrier;

export const InvoiceCarriers = {
  PRINT: { type: InvoiceCarrierType.PRINT } as InvoicePrintCarrier,
  MEMBER: { type: InvoiceCarrierType.MEMBER } as InvoicMemberCarrier,
  PLATFORM: { type: InvoiceCarrierType.PLATFORM } as InvoicPlatformCarrier,
  LOVE_CODE: (loveCode: string) => ({
    type: InvoiceCarrierType.LOVE_CODE,
    code: loveCode,
  } as InvoiceLoveCodeCarrier),
  MOBILE: (barcode: string) => ({
    type: InvoiceCarrierType.MOBILE,
    code: barcode,
  } as InvoiceMobileCarrier),
  MOICA: (barcode: string) => ({
    type: InvoiceCarrierType.MOICA,
    code: barcode,
  } as InvoiceMoicaCarrier),
};

export enum TaxType {
  TAXED = 'TAXED',
  TAX_FREE = 'TAX_FREE',
  ZERO_TAX = 'ZERO_TAX',
  SPECIAL = 'SPECIAL',
  MIXED = 'MIXED',
}

export enum SpecialTaxCode {
  TEA = 1,
  CLUB = 2,
  BANK_SELF = 3,
  INSURANCE = 4,
  BANK_COMMON = 5,
  BANK_SELF_SALES_BEFORE_103 = 6,
  BANK_SELF_SALES_AFTER_103 = 7,
  FREE = 8,
}

interface TaxBase {
  type: TaxType;
}

interface CommonTax extends TaxBase {
  type: Exclude<TaxType, TaxType.SPECIAL>;
}

interface SpecialTax extends TaxBase {
  type: TaxType.SPECIAL;
  taxCode: SpecialTaxCode;
}

export type InvoiceTax = CommonTax | SpecialTax;

export enum InvoiceState {
  INITED = 'INITED',
  ISSUED = 'ISSUED',
  VOID = 'VOID',
  ALLOWANCED = 'ALLOWANCED',
}

export enum InvoiceAllowanceState {
  INITED = 'INITED',
  ISSUED = 'ISSUED',
  INVALID = 'INVALID',
}

export enum CustomsMark {
  YES = 'YES',
  NO = 'NO',
}

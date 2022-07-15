declare type bit = number;
declare type byte = number;
declare type int = number;
export declare class QrCodeManager {
    readonly version: int;
    readonly errorCorrectionLevel: Ecc;
    readonly mask: int;
    static encodeText(text: string, ecl: Ecc): QrCodeManager;
    static encodeBinary(data: Array<byte>, ecl: Ecc): QrCodeManager;
    static encodeSegments(segs: Array<QrSegment>, ecl: Ecc, minVersion?: int, maxVersion?: int, mask?: int, boostEcl?: boolean): QrCodeManager;
    readonly size: int;
    private readonly modules;
    private readonly isFunction;
    constructor(version: int, errorCorrectionLevel: Ecc, dataCodewords: Array<byte>, mask: int);
    getModule(x: int, y: int): boolean;
    drawCanvas(scale: int, border: int, canvas: HTMLCanvasElement): void;
    toSvgString(border: int, color: string): string;
    private drawFunctionPatterns;
    private drawFormatBits;
    private drawVersion;
    private drawFinderPattern;
    private drawAlignmentPattern;
    private setFunctionModule;
    private addEccAndInterleave;
    private drawCodewords;
    private applyMask;
    private getPenaltyScore;
    private getAlignmentPatternPositions;
    private static getNumRawDataModules;
    private static getNumDataCodewords;
    private static reedSolomonComputeDivisor;
    private static reedSolomonComputeRemainder;
    private static reedSolomonMultiply;
    private finderPenaltyCountPatterns;
    private finderPenaltyTerminateAndCount;
    private finderPenaltyAddHistory;
    static readonly MIN_VERSION: int;
    static readonly MAX_VERSION: int;
    private static readonly PENALTY_N1;
    private static readonly PENALTY_N2;
    private static readonly PENALTY_N3;
    private static readonly PENALTY_N4;
    private static readonly ECC_CODEWORDS_PER_BLOCK;
    private static readonly NUM_ERROR_CORRECTION_BLOCKS;
}
export declare class QrSegment {
    readonly mode: Mode;
    readonly numChars: int;
    private readonly bitData;
    static makeBytes(data: Array<byte>): QrSegment;
    static makeNumeric(digits: string): QrSegment;
    static makeAlphanumeric(text: string): QrSegment;
    static makeSegments(text: string): Array<QrSegment>;
    static makeEci(assignVal: int): QrSegment;
    constructor(mode: Mode, numChars: int, bitData: Array<bit>);
    getData(): Array<bit>;
    static getTotalBits(segs: Array<QrSegment>, version: int): number;
    private static toUtf8ByteArray;
    static readonly NUMERIC_REGEX: RegExp;
    static readonly ALPHANUMERIC_REGEX: RegExp;
    private static readonly ALPHANUMERIC_CHARSET;
}
export declare class Ecc {
    readonly ordinal: int;
    readonly formatBits: int;
    static readonly LOW: Ecc;
    static readonly MEDIUM: Ecc;
    static readonly QUARTILE: Ecc;
    static readonly HIGH: Ecc;
    private constructor();
}
export declare class Mode {
    readonly modeBits: int;
    private readonly numBitsCharCount;
    static readonly NUMERIC: Mode;
    static readonly ALPHANUMERIC: Mode;
    static readonly BYTE: Mode;
    static readonly KANJI: Mode;
    static readonly ECI: Mode;
    private constructor();
    numCharCountBits(ver: int): int;
}
export {};

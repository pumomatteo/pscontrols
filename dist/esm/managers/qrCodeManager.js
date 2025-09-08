class QrCodeManager {
  /*-- Constructor (low level) and fields --*/
  // Creates a new QR Code with the given version number,
  // error correction level, data codeword bytes, and mask number.
  // This is a low-level API that most users should not use directly.
  // A mid-level API is the encodeSegments() function.
  constructor(version, errorCorrectionLevel, dataCodewords, mask) {
    this.version = version;
    this.errorCorrectionLevel = errorCorrectionLevel;
    this.mask = mask;
    if (version < QrCodeManager.MIN_VERSION || version > QrCodeManager.MAX_VERSION)
      throw "Version value out of range";
    if (mask < -1 || mask > 7)
      throw "Mask value out of range";
    this.size = version * 4 + 17;
    let row = [];
    for (let i = 0; i < this.size; i++)
      row.push(false);
    for (let i = 0; i < this.size; i++) {
      this.modules.push(row.slice());
      this.isFunction.push(row.slice());
    }
    this.drawFunctionPatterns();
    const allCodewords = this.addEccAndInterleave(dataCodewords);
    this.drawCodewords(allCodewords);
    if (mask == -1) {
      let minPenalty = 1e9;
      for (let i = 0; i < 8; i++) {
        this.applyMask(i);
        this.drawFormatBits(i);
        const penalty = this.getPenaltyScore();
        if (penalty < minPenalty) {
          mask = i;
          minPenalty = penalty;
        }
        this.applyMask(i);
      }
    }
    if (mask < 0 || mask > 7)
      throw "Assertion error";
    this.mask = mask;
    this.applyMask(mask);
    this.drawFormatBits(mask);
    this.isFunction = [];
  }
  // Returns a QR Code representing the given Unicode text string at the given error correction level.
  static encodeText(text, ecl) {
    const segs = QrSegment.makeSegments(text);
    return QrCodeManager.encodeSegments(segs, ecl);
  }
  // Returns a QR Code representing the given binary data at the given error correction level.
  static encodeBinary(data, ecl) {
    const seg = QrSegment.makeBytes(data);
    return QrCodeManager.encodeSegments([seg], ecl);
  }
  // Returns a QR Code representing the given segments with the given encoding parameters.
  static encodeSegments(segs, ecl, minVersion = 1, maxVersion = 40, mask = -1, boostEcl = true) {
    if (!(QrCodeManager.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= QrCodeManager.MAX_VERSION) || mask < -1 || mask > 7)
      throw "Invalid value";
    let version;
    let dataUsedBits;
    for (version = minVersion; ; version++) {
      const dataCapacityBits2 = QrCodeManager.getNumDataCodewords(version, ecl) * 8;
      const usedBits = QrSegment.getTotalBits(segs, version);
      if (usedBits <= dataCapacityBits2) {
        dataUsedBits = usedBits;
        break;
      }
      if (version >= maxVersion)
        throw "Data too long";
    }
    for (const newEcl of [Ecc.MEDIUM, Ecc.QUARTILE, Ecc.HIGH]) {
      if (boostEcl && dataUsedBits <= QrCodeManager.getNumDataCodewords(version, newEcl) * 8)
        ecl = newEcl;
    }
    let bb = [];
    for (const seg of segs) {
      appendBits(seg.mode.modeBits, 4, bb);
      appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
      for (const b of seg.getData())
        bb.push(b);
    }
    if (bb.length != dataUsedBits)
      throw "Assertion error";
    const dataCapacityBits = QrCodeManager.getNumDataCodewords(version, ecl) * 8;
    if (bb.length > dataCapacityBits)
      throw "Assertion error";
    appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
    appendBits(0, (8 - bb.length % 8) % 8, bb);
    if (bb.length % 8 != 0)
      throw "Assertion error";
    for (let padByte = 236; bb.length < dataCapacityBits; padByte ^= 236 ^ 17)
      appendBits(padByte, 8, bb);
    let dataCodewords = [];
    while (dataCodewords.length * 8 < bb.length)
      dataCodewords.push(0);
    bb.forEach((b, i) => dataCodewords[i >>> 3] |= b << 7 - (i & 7));
    return new QrCodeManager(version, ecl, dataCodewords, mask);
  }
  // The width and height of this QR Code, measured in modules, between
  // 21 and 177 (inclusive). This is equal to version * 4 + 17.
  size;
  // The modules of this QR Code (false = white, true = black).
  // Immutable after constructor finishes. Accessed through getModule().
  modules = [];
  // Indicates function modules that are not subjected to masking. Discarded when constructor finishes.
  isFunction = [];
  /*-- Accessor methods --*/
  // Returns the color of the module (pixel) at the given coordinates, which is false
  // for white or true for black. The top left corner has the coordinates (x=0, y=0).
  // If the given coordinates are out of bounds, then false (white) is returned.
  getModule(x, y) {
    return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
  }
  /*-- Public instance methods --*/
  // Draws this QR Code, with the given module scale and border modules, onto the given HTML
  // canvas element. The canvas's width and height is resized to (this.size + border * 2) * scale.
  // The drawn image is be purely black and white, and fully opaque.
  // The scale must be a positive integer and the border must be a non-negative integer.
  drawCanvas(scale, border, canvas) {
    if (scale <= 0 || border < 0)
      throw "Value out of range";
    const width = (this.size + border * 2) * scale;
    canvas.width = width;
    canvas.height = width;
    let ctx = canvas.getContext("2d");
    for (let y = -border; y < this.size + border; y++) {
      for (let x = -border; x < this.size + border; x++) {
        ctx.fillStyle = this.getModule(x, y) ? "#000000" : "#FFFFFF";
        ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
      }
    }
  }
  // Returns a string of SVG code for an image depicting this QR Code, with the given number
  // of border modules. The string always uses Unix newlines (\n), regardless of the platform.
  toSvgString(border, color) {
    if (border < 0)
      throw "Border must be non-negative";
    let parts = [];
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.getModule(x, y))
          parts.push(`M${x + border},${y + border}h1v1h-1z`);
      }
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${this.size + border * 2} ${this.size + border * 2}" stroke="none">
	<rect width="100%" height="100%" fill="#FFFFFF"/>
	<path d="${parts.join(" ")}" fill="` + color + `"/>
</svg>
`;
  }
  // Reads this object's version field, and draws and marks all function modules.
  drawFunctionPatterns() {
    for (let i = 0; i < this.size; i++) {
      this.setFunctionModule(6, i, i % 2 == 0);
      this.setFunctionModule(i, 6, i % 2 == 0);
    }
    this.drawFinderPattern(3, 3);
    this.drawFinderPattern(this.size - 4, 3);
    this.drawFinderPattern(3, this.size - 4);
    const alignPatPos = this.getAlignmentPatternPositions();
    const numAlign = alignPatPos.length;
    for (let i = 0; i < numAlign; i++) {
      for (let j = 0; j < numAlign; j++) {
        if (!(i == 0 && j == 0 || i == 0 && j == numAlign - 1 || i == numAlign - 1 && j == 0))
          this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
      }
    }
    this.drawFormatBits(0);
    this.drawVersion();
  }
  // Draws two copies of the format bits (with its own error correction code)
  // based on the given mask and this object's error correction level field.
  drawFormatBits(mask) {
    const data = this.errorCorrectionLevel.formatBits << 3 | mask;
    let rem = data;
    for (let i = 0; i < 10; i++)
      rem = rem << 1 ^ (rem >>> 9) * 1335;
    const bits = (data << 10 | rem) ^ 21522;
    if (bits >>> 15 != 0)
      throw "Assertion error";
    for (let i = 0; i <= 5; i++)
      this.setFunctionModule(8, i, getBit(bits, i));
    this.setFunctionModule(8, 7, getBit(bits, 6));
    this.setFunctionModule(8, 8, getBit(bits, 7));
    this.setFunctionModule(7, 8, getBit(bits, 8));
    for (let i = 9; i < 15; i++)
      this.setFunctionModule(14 - i, 8, getBit(bits, i));
    for (let i = 0; i < 8; i++)
      this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
    for (let i = 8; i < 15; i++)
      this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
    this.setFunctionModule(8, this.size - 8, true);
  }
  // Draws two copies of the version bits (with its own error correction code),
  // based on this object's version field, iff 7 <= version <= 40.
  drawVersion() {
    if (this.version < 7)
      return;
    let rem = this.version;
    for (let i = 0; i < 12; i++)
      rem = rem << 1 ^ (rem >>> 11) * 7973;
    const bits = this.version << 12 | rem;
    if (bits >>> 18 != 0)
      throw "Assertion error";
    for (let i = 0; i < 18; i++) {
      const color = getBit(bits, i);
      const a = this.size - 11 + i % 3;
      const b = Math.floor(i / 3);
      this.setFunctionModule(a, b, color);
      this.setFunctionModule(b, a, color);
    }
  }
  // Draws a 9*9 finder pattern including the border separator,
  // with the center module at (x, y). Modules can be out of bounds.
  drawFinderPattern(x, y) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        const xx = x + dx;
        const yy = y + dy;
        if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size)
          this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
      }
    }
  }
  // Draws a 5*5 alignment pattern, with the center module
  // at (x, y). All modules must be in bounds.
  drawAlignmentPattern(x, y) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++)
        this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
    }
  }
  // Sets the color of a module and marks it as a function module.
  // Only used by the constructor. Coordinates must be in bounds.
  setFunctionModule(x, y, isBlack) {
    this.modules[y][x] = isBlack;
    this.isFunction[y][x] = true;
  }
  // Returns a new byte string representing the given data with the appropriate error correction
  // codewords appended to it, based on this object's version and error correction level.
  addEccAndInterleave(data) {
    const ver = this.version;
    const ecl = this.errorCorrectionLevel;
    if (data.length != QrCodeManager.getNumDataCodewords(ver, ecl))
      throw "Invalid argument";
    const numBlocks = QrCodeManager.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    const blockEccLen = QrCodeManager.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
    const rawCodewords = Math.floor(QrCodeManager.getNumRawDataModules(ver) / 8);
    const numShortBlocks = numBlocks - rawCodewords % numBlocks;
    const shortBlockLen = Math.floor(rawCodewords / numBlocks);
    let blocks = [];
    const rsDiv = QrCodeManager.reedSolomonComputeDivisor(blockEccLen);
    for (let i = 0, k = 0; i < numBlocks; i++) {
      let dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
      k += dat.length;
      const ecc = QrCodeManager.reedSolomonComputeRemainder(dat, rsDiv);
      if (i < numShortBlocks)
        dat.push(0);
      blocks.push(dat.concat(ecc));
    }
    let result = [];
    for (let i = 0; i < blocks[0].length; i++) {
      blocks.forEach((block, j) => {
        if (i != shortBlockLen - blockEccLen || j >= numShortBlocks)
          result.push(block[i]);
      });
    }
    if (result.length != rawCodewords)
      throw "Assertion error";
    return result;
  }
  // Draws the given sequence of 8-bit codewords (data and error correction) onto the entire
  // data area of this QR Code. Function modules need to be marked off before this is called.
  drawCodewords(data) {
    if (data.length != Math.floor(QrCodeManager.getNumRawDataModules(this.version) / 8))
      throw "Invalid argument";
    let i = 0;
    for (let right = this.size - 1; right >= 1; right -= 2) {
      if (right == 6)
        right = 5;
      for (let vert = 0; vert < this.size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const upward = (right + 1 & 2) == 0;
          const y = upward ? this.size - 1 - vert : vert;
          if (!this.isFunction[y][x] && i < data.length * 8) {
            this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
            i++;
          }
        }
      }
    }
    if (i != data.length * 8)
      throw "Assertion error";
  }
  // XORs the codeword modules in this QR Code with the given mask pattern.
  // The function modules must be marked and the codeword bits must be drawn
  // before masking. Due to the arithmetic of XOR, calling applyMask() with
  // the same mask value a second time will undo the mask. A final well-formed
  // QR Code needs exactly one (not zero, two, etc.) mask applied.
  applyMask(mask) {
    if (mask < 0 || mask > 7)
      throw "Mask value out of range";
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let invert;
        switch (mask) {
          case 0:
            invert = (x + y) % 2 == 0;
            break;
          case 1:
            invert = y % 2 == 0;
            break;
          case 2:
            invert = x % 3 == 0;
            break;
          case 3:
            invert = (x + y) % 3 == 0;
            break;
          case 4:
            invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0;
            break;
          case 5:
            invert = x * y % 2 + x * y % 3 == 0;
            break;
          case 6:
            invert = (x * y % 2 + x * y % 3) % 2 == 0;
            break;
          case 7:
            invert = ((x + y) % 2 + x * y % 3) % 2 == 0;
            break;
          default:
            throw "Assertion error";
        }
        if (!this.isFunction[y][x] && invert)
          this.modules[y][x] = !this.modules[y][x];
      }
    }
  }
  // Calculates and returns the penalty score based on state of this QR Code's current modules.
  // This is used by the automatic mask choice algorithm to find the mask pattern that yields the lowest score.
  getPenaltyScore() {
    let result = 0;
    for (let y = 0; y < this.size; y++) {
      let runColor = false;
      let runX = 0;
      let runHistory = [0, 0, 0, 0, 0, 0, 0];
      for (let x = 0; x < this.size; x++) {
        if (this.modules[y][x] == runColor) {
          runX++;
          if (runX == 5)
            result += QrCodeManager.PENALTY_N1;
          else if (runX > 5)
            result++;
        } else {
          this.finderPenaltyAddHistory(runX, runHistory);
          if (!runColor)
            result += this.finderPenaltyCountPatterns(runHistory) * QrCodeManager.PENALTY_N3;
          runColor = this.modules[y][x];
          runX = 1;
        }
      }
      result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * QrCodeManager.PENALTY_N3;
    }
    for (let x = 0; x < this.size; x++) {
      let runColor = false;
      let runY = 0;
      let runHistory = [0, 0, 0, 0, 0, 0, 0];
      for (let y = 0; y < this.size; y++) {
        if (this.modules[y][x] == runColor) {
          runY++;
          if (runY == 5)
            result += QrCodeManager.PENALTY_N1;
          else if (runY > 5)
            result++;
        } else {
          this.finderPenaltyAddHistory(runY, runHistory);
          if (!runColor)
            result += this.finderPenaltyCountPatterns(runHistory) * QrCodeManager.PENALTY_N3;
          runColor = this.modules[y][x];
          runY = 1;
        }
      }
      result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * QrCodeManager.PENALTY_N3;
    }
    for (let y = 0; y < this.size - 1; y++) {
      for (let x = 0; x < this.size - 1; x++) {
        const color = this.modules[y][x];
        if (color == this.modules[y][x + 1] && color == this.modules[y + 1][x] && color == this.modules[y + 1][x + 1])
          result += QrCodeManager.PENALTY_N2;
      }
    }
    let black = 0;
    for (const row of this.modules)
      black = row.reduce((sum, color) => sum + (color ? 1 : 0), black);
    const total = this.size * this.size;
    const k = Math.ceil(Math.abs(black * 20 - total * 10) / total) - 1;
    result += k * QrCodeManager.PENALTY_N4;
    return result;
  }
  // Returns an ascending list of positions of alignment patterns for this version number.
  // Each position is in the range [0,177), and are used on both the x and y axes.
  // This could be implemented as lookup table of 40 variable-length lists of integers.
  getAlignmentPatternPositions() {
    if (this.version == 1)
      return [];
    else {
      const numAlign = Math.floor(this.version / 7) + 2;
      const step = this.version == 32 ? 26 : Math.ceil((this.size - 13) / (numAlign * 2 - 2)) * 2;
      let result = [6];
      for (let pos = this.size - 7; result.length < numAlign; pos -= step)
        result.splice(1, 0, pos);
      return result;
    }
  }
  // Returns the number of data bits that can be stored in a QR Code of the given version number, after
  // all function modules are excluded. This includes remainder bits, so it might not be a multiple of 8.
  // The result is in the range [208, 29648]. This could be implemented as a 40-entry lookup table.
  static getNumRawDataModules(ver) {
    if (ver < QrCodeManager.MIN_VERSION || ver > QrCodeManager.MAX_VERSION)
      throw "Version number out of range";
    let result = (16 * ver + 128) * ver + 64;
    if (ver >= 2) {
      const numAlign = Math.floor(ver / 7) + 2;
      result -= (25 * numAlign - 10) * numAlign - 55;
      if (ver >= 7)
        result -= 36;
    }
    if (!(208 <= result && result <= 29648))
      throw "Assertion error";
    return result;
  }
  // Returns the number of 8-bit data (i.e. not error correction) codewords contained in any
  // QR Code of the given version number and error correction level, with remainder bits discarded.
  // This stateless pure function could be implemented as a (40*4)-cell lookup table.
  static getNumDataCodewords(ver, ecl) {
    return Math.floor(QrCodeManager.getNumRawDataModules(ver) / 8) - QrCodeManager.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * QrCodeManager.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
  }
  // Returns a Reed-Solomon ECC generator polynomial for the given degree. This could be
  // implemented as a lookup table over all possible parameter values, instead of as an algorithm.
  static reedSolomonComputeDivisor(degree) {
    if (degree < 1 || degree > 255)
      throw "Degree out of range";
    let result = [];
    for (let i = 0; i < degree - 1; i++)
      result.push(0);
    result.push(1);
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < result.length; j++) {
        result[j] = QrCodeManager.reedSolomonMultiply(result[j], root);
        if (j + 1 < result.length)
          result[j] ^= result[j + 1];
      }
      root = QrCodeManager.reedSolomonMultiply(root, 2);
    }
    return result;
  }
  // Returns the Reed-Solomon error correction codeword for the given data and divisor polynomials.
  static reedSolomonComputeRemainder(data, divisor) {
    let result = divisor.map((_) => 0);
    for (const b of data) {
      const factor = b ^ result.shift();
      result.push(0);
      divisor.forEach((coef, i) => result[i] ^= QrCodeManager.reedSolomonMultiply(coef, factor));
    }
    return result;
  }
  // Returns the product of the two given field elements modulo GF(2^8/0x11D). The arguments and result
  // are unsigned 8-bit integers. This could be implemented as a lookup table of 256*256 entries of uint8.
  static reedSolomonMultiply(x, y) {
    if (x >>> 8 != 0 || y >>> 8 != 0)
      throw "Byte out of range";
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = z << 1 ^ (z >>> 7) * 285;
      z ^= (y >>> i & 1) * x;
    }
    if (z >>> 8 != 0)
      throw "Assertion error";
    return z;
  }
  // Can only be called immediately after a white run is added, and
  // returns either 0, 1, or 2. A helper function for getPenaltyScore().
  finderPenaltyCountPatterns(runHistory) {
    const n = runHistory[1];
    if (n > this.size * 3)
      throw "Assertion error";
    const core = n > 0 && runHistory[2] == n && runHistory[3] == n * 3 && runHistory[4] == n && runHistory[5] == n;
    return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
  }
  // Must be called at the end of a line (row or column) of modules. A helper function for getPenaltyScore().
  finderPenaltyTerminateAndCount(currentRunColor, currentRunLength, runHistory) {
    if (currentRunColor) {
      this.finderPenaltyAddHistory(currentRunLength, runHistory);
      currentRunLength = 0;
    }
    currentRunLength += this.size;
    this.finderPenaltyAddHistory(currentRunLength, runHistory);
    return this.finderPenaltyCountPatterns(runHistory);
  }
  // Pushes the given value to the front and drops the last value. A helper function for getPenaltyScore().
  finderPenaltyAddHistory(currentRunLength, runHistory) {
    if (runHistory[0] == 0)
      currentRunLength += this.size;
    runHistory.pop();
    runHistory.unshift(currentRunLength);
  }
  // The minimum version number supported in the QR Code Model 2 standard.
  static MIN_VERSION = 1;
  // The maximum version number supported in the QR Code Model 2 standard.
  static MAX_VERSION = 40;
  // For use in getPenaltyScore(), when evaluating which mask is best.
  static PENALTY_N1 = 3;
  static PENALTY_N2 = 3;
  static PENALTY_N3 = 40;
  static PENALTY_N4 = 10;
  static ECC_CODEWORDS_PER_BLOCK = [
    // Version: (note that index 0 is for padding, and is set to an illegal value)
    //0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Low
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    // Medium
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Quartile
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    // High
  ];
  static NUM_ERROR_CORRECTION_BLOCKS = [
    // Version: (note that index 0 is for padding, and is set to an illegal value)
    //0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    // Low
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    // Medium
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    // Quartile
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
    // High
  ];
}
function appendBits(val, len, bb) {
  if (len < 0 || len > 31 || val >>> len != 0)
    throw "Value out of range";
  for (let i = len - 1; i >= 0; i--)
    bb.push(val >>> i & 1);
}
function getBit(x, i) {
  return (x >>> i & 1) != 0;
}
class QrSegment {
  // Creates a new QR Code segment with the given attributes and data.
  // The character count (numChars) must agree with the mode and the bit buffer length,
  // but the constraint isn't checked. The given bit buffer is cloned and stored.
  constructor(mode, numChars, bitData) {
    this.mode = mode;
    this.numChars = numChars;
    this.bitData = bitData;
    if (numChars < 0)
      throw "Invalid argument";
    this.bitData = bitData.slice();
  }
  // Returns a segment representing the given binary data encoded in
  // byte mode. All input byte arrays are acceptable. Any text string
  // can be converted to UTF-8 bytes and encoded as a byte mode segment.
  static makeBytes(data) {
    let bb = [];
    for (const b of data)
      appendBits(b, 8, bb);
    return new QrSegment(Mode.BYTE, data.length, bb);
  }
  // Returns a segment representing the given string of decimal digits encoded in numeric mode.
  static makeNumeric(digits) {
    if (!this.NUMERIC_REGEX.test(digits))
      throw "String contains non-numeric characters";
    let bb = [];
    for (let i = 0; i < digits.length; ) {
      const n = Math.min(digits.length - i, 3);
      appendBits(parseInt(digits.substr(i, n), 10), n * 3 + 1, bb);
      i += n;
    }
    return new QrSegment(Mode.NUMERIC, digits.length, bb);
  }
  // Returns a segment representing the given text string encoded in alphanumeric mode.
  // The characters allowed are: 0 to 9, A to Z (uppercase only), space,
  // dollar, percent, asterisk, plus, hyphen, period, slash, colon.
  static makeAlphanumeric(text) {
    if (!this.ALPHANUMERIC_REGEX.test(text))
      throw "String contains unencodable characters in alphanumeric mode";
    let bb = [];
    let i;
    for (i = 0; i + 2 <= text.length; i += 2) {
      let temp = QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
      temp += QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
      appendBits(temp, 11, bb);
    }
    if (i < text.length)
      appendBits(QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
    return new QrSegment(Mode.ALPHANUMERIC, text.length, bb);
  }
  // Returns a new mutable list of zero or more segments to represent the given Unicode text string.
  // The result may use various segment modes and switch modes to optimize the length of the bit stream.
  static makeSegments(text) {
    if (text == "")
      return [];
    else if (this.NUMERIC_REGEX.test(text))
      return [QrSegment.makeNumeric(text)];
    else if (this.ALPHANUMERIC_REGEX.test(text))
      return [QrSegment.makeAlphanumeric(text)];
    else
      return [QrSegment.makeBytes(QrSegment.toUtf8ByteArray(text))];
  }
  // Returns a segment representing an Extended Channel Interpretation
  // (ECI) designator with the given assignment value.
  static makeEci(assignVal) {
    let bb = [];
    if (assignVal < 0)
      throw "ECI assignment value out of range";
    else if (assignVal < 1 << 7)
      appendBits(assignVal, 8, bb);
    else if (assignVal < 1 << 14) {
      appendBits(2, 2, bb);
      appendBits(assignVal, 14, bb);
    } else if (assignVal < 1e6) {
      appendBits(6, 3, bb);
      appendBits(assignVal, 21, bb);
    } else
      throw "ECI assignment value out of range";
    return new QrSegment(Mode.ECI, 0, bb);
  }
  /*-- Methods --*/
  // Returns a new copy of the data bits of this segment.
  getData() {
    return this.bitData.slice();
  }
  // (Package-private) Calculates and returns the number of bits needed to encode the given segments at
  // the given version. The result is infinity if a segment has too many characters to fit its length field.
  static getTotalBits(segs, version) {
    let result = 0;
    for (const seg of segs) {
      const ccbits = seg.mode.numCharCountBits(version);
      if (seg.numChars >= 1 << ccbits)
        return Infinity;
      result += 4 + ccbits + seg.bitData.length;
    }
    return result;
  }
  // Returns a new array of bytes representing the given string encoded in UTF-8.
  static toUtf8ByteArray(str) {
    str = encodeURI(str);
    let result = [];
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) != "%")
        result.push(str.charCodeAt(i));
      else {
        result.push(parseInt(str.substr(i + 1, 2), 16));
        i += 2;
      }
    }
    return result;
  }
  /*-- Constants --*/
  // Describes precisely all strings that are encodable in numeric mode. To test
  // whether a string s is encodable: let ok: boolean = NUMERIC_REGEX.test(s);
  // A string is encodable iff each character is in the range 0 to 9.
  static NUMERIC_REGEX = /^[0-9]*$/;
  // Describes precisely all strings that are encodable in alphanumeric mode. To test
  // whether a string s is encodable: let ok: boolean = ALPHANUMERIC_REGEX.test(s);
  // A string is encodable iff each character is in the following set: 0 to 9, A to Z
  // (uppercase only), space, dollar, percent, asterisk, plus, hyphen, period, slash, colon.
  static ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/;
  // The set of all legal characters in alphanumeric mode,
  // where each character value maps to the index in the string.
  static ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
}
class Ecc {
  // The QR Code can tolerate about 30% erroneous codewords
  constructor(ordinal, formatBits) {
    this.ordinal = ordinal;
    this.formatBits = formatBits;
  }
  static LOW = new Ecc(0, 1);
  // The QR Code can tolerate about  7% erroneous codewords
  static MEDIUM = new Ecc(1, 0);
  // The QR Code can tolerate about 15% erroneous codewords
  static QUARTILE = new Ecc(2, 3);
  // The QR Code can tolerate about 25% erroneous codewords
  static HIGH = new Ecc(3, 2);
}
class Mode {
  constructor(modeBits, numBitsCharCount) {
    this.modeBits = modeBits;
    this.numBitsCharCount = numBitsCharCount;
  }
  static NUMERIC = new Mode(1, [10, 12, 14]);
  static ALPHANUMERIC = new Mode(2, [9, 11, 13]);
  static BYTE = new Mode(4, [8, 16, 16]);
  static KANJI = new Mode(8, [8, 10, 12]);
  static ECI = new Mode(7, [0, 0, 0]);
  // (Package-private) Returns the bit width of the character count field for a segment in
  // this mode in a QR Code at the given version number. The result is in the range [0, 16].
  numCharCountBits(ver) {
    return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
  }
}
export {
  Ecc,
  Mode,
  QrCodeManager,
  QrSegment
};
//# sourceMappingURL=qrCodeManager.js.map

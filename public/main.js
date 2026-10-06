(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/qrcode/lib/can-promise.js
  var require_can_promise = __commonJS({
    "node_modules/qrcode/lib/can-promise.js"(exports, module) {
      module.exports = function() {
        return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
      };
    }
  });

  // node_modules/qrcode/lib/core/utils.js
  var require_utils = __commonJS({
    "node_modules/qrcode/lib/core/utils.js"(exports) {
      var toSJISFunction;
      var CODEWORDS_COUNT = [
        0,
        // Not used
        26,
        44,
        70,
        100,
        134,
        172,
        196,
        242,
        292,
        346,
        404,
        466,
        532,
        581,
        655,
        733,
        815,
        901,
        991,
        1085,
        1156,
        1258,
        1364,
        1474,
        1588,
        1706,
        1828,
        1921,
        2051,
        2185,
        2323,
        2465,
        2611,
        2761,
        2876,
        3034,
        3196,
        3362,
        3532,
        3706
      ];
      exports.getSymbolSize = function getSymbolSize(version) {
        if (!version) throw new Error('"version" cannot be null or undefined');
        if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
        return version * 4 + 17;
      };
      exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
        return CODEWORDS_COUNT[version];
      };
      exports.getBCHDigit = function(data) {
        let digit = 0;
        while (data !== 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      };
      exports.setToSJISFunction = function setToSJISFunction(f4) {
        if (typeof f4 !== "function") {
          throw new Error('"toSJISFunc" is not a valid function.');
        }
        toSJISFunction = f4;
      };
      exports.isKanjiModeEnabled = function() {
        return typeof toSJISFunction !== "undefined";
      };
      exports.toSJIS = function toSJIS(kanji) {
        return toSJISFunction(kanji);
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-level.js
  var require_error_correction_level = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
      exports.L = { bit: 1 };
      exports.M = { bit: 0 };
      exports.Q = { bit: 3 };
      exports.H = { bit: 2 };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        const lcStr = string.toLowerCase();
        switch (lcStr) {
          case "l":
          case "low":
            return exports.L;
          case "m":
          case "medium":
            return exports.M;
          case "q":
          case "quartile":
            return exports.Q;
          case "h":
          case "high":
            return exports.H;
          default:
            throw new Error("Unknown EC Level: " + string);
        }
      }
      exports.isValid = function isValid(level) {
        return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
      };
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e3) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/bit-buffer.js
  var require_bit_buffer = __commonJS({
    "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
      function BitBuffer() {
        this.buffer = [];
        this.length = 0;
      }
      BitBuffer.prototype = {
        get: function(index) {
          const bufIndex = Math.floor(index / 8);
          return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
        },
        put: function(num, length) {
          for (let i4 = 0; i4 < length; i4++) {
            this.putBit((num >>> length - i4 - 1 & 1) === 1);
          }
        },
        getLengthInBits: function() {
          return this.length;
        },
        putBit: function(bit) {
          const bufIndex = Math.floor(this.length / 8);
          if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
          }
          if (bit) {
            this.buffer[bufIndex] |= 128 >>> this.length % 8;
          }
          this.length++;
        }
      };
      module.exports = BitBuffer;
    }
  });

  // node_modules/qrcode/lib/core/bit-matrix.js
  var require_bit_matrix = __commonJS({
    "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
      function BitMatrix(size) {
        if (!size || size < 1) {
          throw new Error("BitMatrix size must be defined and greater than 0");
        }
        this.size = size;
        this.data = new Uint8Array(size * size);
        this.reservedBit = new Uint8Array(size * size);
      }
      BitMatrix.prototype.set = function(row, col, value, reserved) {
        const index = row * this.size + col;
        this.data[index] = value;
        if (reserved) this.reservedBit[index] = true;
      };
      BitMatrix.prototype.get = function(row, col) {
        return this.data[row * this.size + col];
      };
      BitMatrix.prototype.xor = function(row, col, value) {
        this.data[row * this.size + col] ^= value;
      };
      BitMatrix.prototype.isReserved = function(row, col) {
        return this.reservedBit[row * this.size + col];
      };
      module.exports = BitMatrix;
    }
  });

  // node_modules/qrcode/lib/core/alignment-pattern.js
  var require_alignment_pattern = __commonJS({
    "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
      var getSymbolSize = require_utils().getSymbolSize;
      exports.getRowColCoords = function getRowColCoords(version) {
        if (version === 1) return [];
        const posCount = Math.floor(version / 7) + 2;
        const size = getSymbolSize(version);
        const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
        const positions = [size - 7];
        for (let i4 = 1; i4 < posCount - 1; i4++) {
          positions[i4] = positions[i4 - 1] - intervals;
        }
        positions.push(6);
        return positions.reverse();
      };
      exports.getPositions = function getPositions(version) {
        const coords = [];
        const pos = exports.getRowColCoords(version);
        const posLength = pos.length;
        for (let i4 = 0; i4 < posLength; i4++) {
          for (let j3 = 0; j3 < posLength; j3++) {
            if (i4 === 0 && j3 === 0 || // top-left
            i4 === 0 && j3 === posLength - 1 || // bottom-left
            i4 === posLength - 1 && j3 === 0) {
              continue;
            }
            coords.push([pos[i4], pos[j3]]);
          }
        }
        return coords;
      };
    }
  });

  // node_modules/qrcode/lib/core/finder-pattern.js
  var require_finder_pattern = __commonJS({
    "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
      var getSymbolSize = require_utils().getSymbolSize;
      var FINDER_PATTERN_SIZE = 7;
      exports.getPositions = function getPositions(version) {
        const size = getSymbolSize(version);
        return [
          // top-left
          [0, 0],
          // top-right
          [size - FINDER_PATTERN_SIZE, 0],
          // bottom-left
          [0, size - FINDER_PATTERN_SIZE]
        ];
      };
    }
  });

  // node_modules/qrcode/lib/core/mask-pattern.js
  var require_mask_pattern = __commonJS({
    "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
      exports.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      var PenaltyScores = {
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
      };
      exports.isValid = function isValid(mask) {
        return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
      };
      exports.from = function from(value) {
        return exports.isValid(value) ? parseInt(value, 10) : void 0;
      };
      exports.getPenaltyN1 = function getPenaltyN1(data) {
        const size = data.size;
        let points = 0;
        let sameCountCol = 0;
        let sameCountRow = 0;
        let lastCol = null;
        let lastRow = null;
        for (let row = 0; row < size; row++) {
          sameCountCol = sameCountRow = 0;
          lastCol = lastRow = null;
          for (let col = 0; col < size; col++) {
            let module2 = data.get(row, col);
            if (module2 === lastCol) {
              sameCountCol++;
            } else {
              if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
              lastCol = module2;
              sameCountCol = 1;
            }
            module2 = data.get(col, row);
            if (module2 === lastRow) {
              sameCountRow++;
            } else {
              if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
              lastRow = module2;
              sameCountRow = 1;
            }
          }
          if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
          if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        }
        return points;
      };
      exports.getPenaltyN2 = function getPenaltyN2(data) {
        const size = data.size;
        let points = 0;
        for (let row = 0; row < size - 1; row++) {
          for (let col = 0; col < size - 1; col++) {
            const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0) points++;
          }
        }
        return points * PenaltyScores.N2;
      };
      exports.getPenaltyN3 = function getPenaltyN3(data) {
        const size = data.size;
        let points = 0;
        let bitsCol = 0;
        let bitsRow = 0;
        for (let row = 0; row < size; row++) {
          bitsCol = bitsRow = 0;
          for (let col = 0; col < size; col++) {
            bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
            if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
            bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
            if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
          }
        }
        return points * PenaltyScores.N3;
      };
      exports.getPenaltyN4 = function getPenaltyN4(data) {
        let darkCount = 0;
        const modulesCount = data.data.length;
        for (let i4 = 0; i4 < modulesCount; i4++) darkCount += data.data[i4];
        const k3 = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
        return k3 * PenaltyScores.N4;
      };
      function getMaskAt(maskPattern, i4, j3) {
        switch (maskPattern) {
          case exports.Patterns.PATTERN000:
            return (i4 + j3) % 2 === 0;
          case exports.Patterns.PATTERN001:
            return i4 % 2 === 0;
          case exports.Patterns.PATTERN010:
            return j3 % 3 === 0;
          case exports.Patterns.PATTERN011:
            return (i4 + j3) % 3 === 0;
          case exports.Patterns.PATTERN100:
            return (Math.floor(i4 / 2) + Math.floor(j3 / 3)) % 2 === 0;
          case exports.Patterns.PATTERN101:
            return i4 * j3 % 2 + i4 * j3 % 3 === 0;
          case exports.Patterns.PATTERN110:
            return (i4 * j3 % 2 + i4 * j3 % 3) % 2 === 0;
          case exports.Patterns.PATTERN111:
            return (i4 * j3 % 3 + (i4 + j3) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      }
      exports.applyMask = function applyMask(pattern, data) {
        const size = data.size;
        for (let col = 0; col < size; col++) {
          for (let row = 0; row < size; row++) {
            if (data.isReserved(row, col)) continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
          }
        }
      };
      exports.getBestMask = function getBestMask(data, setupFormatFunc) {
        const numPatterns = Object.keys(exports.Patterns).length;
        let bestPattern = 0;
        let lowerPenalty = Infinity;
        for (let p3 = 0; p3 < numPatterns; p3++) {
          setupFormatFunc(p3);
          exports.applyMask(p3, data);
          const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
          exports.applyMask(p3, data);
          if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p3;
          }
        }
        return bestPattern;
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-code.js
  var require_error_correction_code = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
      var ECLevel = require_error_correction_level();
      var EC_BLOCKS_TABLE = [
        // L  M  Q  H
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        2,
        2,
        4,
        1,
        2,
        4,
        4,
        2,
        4,
        4,
        4,
        2,
        4,
        6,
        5,
        2,
        4,
        6,
        6,
        2,
        5,
        8,
        8,
        4,
        5,
        8,
        8,
        4,
        5,
        8,
        11,
        4,
        8,
        10,
        11,
        4,
        9,
        12,
        16,
        4,
        9,
        16,
        16,
        6,
        10,
        12,
        18,
        6,
        10,
        17,
        16,
        6,
        11,
        16,
        19,
        6,
        13,
        18,
        21,
        7,
        14,
        21,
        25,
        8,
        16,
        20,
        25,
        8,
        17,
        23,
        25,
        9,
        17,
        23,
        34,
        9,
        18,
        25,
        30,
        10,
        20,
        27,
        32,
        12,
        21,
        29,
        35,
        12,
        23,
        34,
        37,
        12,
        25,
        34,
        40,
        13,
        26,
        35,
        42,
        14,
        28,
        38,
        45,
        15,
        29,
        40,
        48,
        16,
        31,
        43,
        51,
        17,
        33,
        45,
        54,
        18,
        35,
        48,
        57,
        19,
        37,
        51,
        60,
        19,
        38,
        53,
        63,
        20,
        40,
        56,
        66,
        21,
        43,
        59,
        70,
        22,
        45,
        62,
        74,
        24,
        47,
        65,
        77,
        25,
        49,
        68,
        81
      ];
      var EC_CODEWORDS_TABLE = [
        // L  M  Q  H
        7,
        10,
        13,
        17,
        10,
        16,
        22,
        28,
        15,
        26,
        36,
        44,
        20,
        36,
        52,
        64,
        26,
        48,
        72,
        88,
        36,
        64,
        96,
        112,
        40,
        72,
        108,
        130,
        48,
        88,
        132,
        156,
        60,
        110,
        160,
        192,
        72,
        130,
        192,
        224,
        80,
        150,
        224,
        264,
        96,
        176,
        260,
        308,
        104,
        198,
        288,
        352,
        120,
        216,
        320,
        384,
        132,
        240,
        360,
        432,
        144,
        280,
        408,
        480,
        168,
        308,
        448,
        532,
        180,
        338,
        504,
        588,
        196,
        364,
        546,
        650,
        224,
        416,
        600,
        700,
        224,
        442,
        644,
        750,
        252,
        476,
        690,
        816,
        270,
        504,
        750,
        900,
        300,
        560,
        810,
        960,
        312,
        588,
        870,
        1050,
        336,
        644,
        952,
        1110,
        360,
        700,
        1020,
        1200,
        390,
        728,
        1050,
        1260,
        420,
        784,
        1140,
        1350,
        450,
        812,
        1200,
        1440,
        480,
        868,
        1290,
        1530,
        510,
        924,
        1350,
        1620,
        540,
        980,
        1440,
        1710,
        570,
        1036,
        1530,
        1800,
        570,
        1064,
        1590,
        1890,
        600,
        1120,
        1680,
        1980,
        630,
        1204,
        1770,
        2100,
        660,
        1260,
        1860,
        2220,
        720,
        1316,
        1950,
        2310,
        750,
        1372,
        2040,
        2430
      ];
      exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
      exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/galois-field.js
  var require_galois_field = __commonJS({
    "node_modules/qrcode/lib/core/galois-field.js"(exports) {
      var EXP_TABLE = new Uint8Array(512);
      var LOG_TABLE = new Uint8Array(256);
      (function initTables() {
        let x2 = 1;
        for (let i4 = 0; i4 < 255; i4++) {
          EXP_TABLE[i4] = x2;
          LOG_TABLE[x2] = i4;
          x2 <<= 1;
          if (x2 & 256) {
            x2 ^= 285;
          }
        }
        for (let i4 = 255; i4 < 512; i4++) {
          EXP_TABLE[i4] = EXP_TABLE[i4 - 255];
        }
      })();
      exports.log = function log(n2) {
        if (n2 < 1) throw new Error("log(" + n2 + ")");
        return LOG_TABLE[n2];
      };
      exports.exp = function exp(n2) {
        return EXP_TABLE[n2];
      };
      exports.mul = function mul(x2, y3) {
        if (x2 === 0 || y3 === 0) return 0;
        return EXP_TABLE[LOG_TABLE[x2] + LOG_TABLE[y3]];
      };
    }
  });

  // node_modules/qrcode/lib/core/polynomial.js
  var require_polynomial = __commonJS({
    "node_modules/qrcode/lib/core/polynomial.js"(exports) {
      var GF = require_galois_field();
      exports.mul = function mul(p1, p22) {
        const coeff = new Uint8Array(p1.length + p22.length - 1);
        for (let i4 = 0; i4 < p1.length; i4++) {
          for (let j3 = 0; j3 < p22.length; j3++) {
            coeff[i4 + j3] ^= GF.mul(p1[i4], p22[j3]);
          }
        }
        return coeff;
      };
      exports.mod = function mod(divident, divisor) {
        let result = new Uint8Array(divident);
        while (result.length - divisor.length >= 0) {
          const coeff = result[0];
          for (let i4 = 0; i4 < divisor.length; i4++) {
            result[i4] ^= GF.mul(divisor[i4], coeff);
          }
          let offset = 0;
          while (offset < result.length && result[offset] === 0) offset++;
          result = result.slice(offset);
        }
        return result;
      };
      exports.generateECPolynomial = function generateECPolynomial(degree) {
        let poly = new Uint8Array([1]);
        for (let i4 = 0; i4 < degree; i4++) {
          poly = exports.mul(poly, new Uint8Array([1, GF.exp(i4)]));
        }
        return poly;
      };
    }
  });

  // node_modules/qrcode/lib/core/reed-solomon-encoder.js
  var require_reed_solomon_encoder = __commonJS({
    "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
      var Polynomial = require_polynomial();
      function ReedSolomonEncoder(degree) {
        this.genPoly = void 0;
        this.degree = degree;
        if (this.degree) this.initialize(this.degree);
      }
      ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
        this.degree = degree;
        this.genPoly = Polynomial.generateECPolynomial(this.degree);
      };
      ReedSolomonEncoder.prototype.encode = function encode(data) {
        if (!this.genPoly) {
          throw new Error("Encoder not initialized");
        }
        const paddedData = new Uint8Array(data.length + this.degree);
        paddedData.set(data);
        const remainder = Polynomial.mod(paddedData, this.genPoly);
        const start = this.degree - remainder.length;
        if (start > 0) {
          const buff = new Uint8Array(this.degree);
          buff.set(remainder, start);
          return buff;
        }
        return remainder;
      };
      module.exports = ReedSolomonEncoder;
    }
  });

  // node_modules/qrcode/lib/core/version-check.js
  var require_version_check = __commonJS({
    "node_modules/qrcode/lib/core/version-check.js"(exports) {
      exports.isValid = function isValid(version) {
        return !isNaN(version) && version >= 1 && version <= 40;
      };
    }
  });

  // node_modules/qrcode/lib/core/regex.js
  var require_regex = __commonJS({
    "node_modules/qrcode/lib/core/regex.js"(exports) {
      var numeric = "[0-9]+";
      var alphanumeric = "[A-Z $%*+\\-./:]+";
      var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
      kanji = kanji.replace(/u/g, "\\u");
      var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
      exports.KANJI = new RegExp(kanji, "g");
      exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
      exports.BYTE = new RegExp(byte, "g");
      exports.NUMERIC = new RegExp(numeric, "g");
      exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
      var TEST_KANJI = new RegExp("^" + kanji + "$");
      var TEST_NUMERIC = new RegExp("^" + numeric + "$");
      var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
      exports.testKanji = function testKanji(str) {
        return TEST_KANJI.test(str);
      };
      exports.testNumeric = function testNumeric(str) {
        return TEST_NUMERIC.test(str);
      };
      exports.testAlphanumeric = function testAlphanumeric(str) {
        return TEST_ALPHANUMERIC.test(str);
      };
    }
  });

  // node_modules/qrcode/lib/core/mode.js
  var require_mode = __commonJS({
    "node_modules/qrcode/lib/core/mode.js"(exports) {
      var VersionCheck = require_version_check();
      var Regex = require_regex();
      exports.NUMERIC = {
        id: "Numeric",
        bit: 1 << 0,
        ccBits: [10, 12, 14]
      };
      exports.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 1 << 1,
        ccBits: [9, 11, 13]
      };
      exports.BYTE = {
        id: "Byte",
        bit: 1 << 2,
        ccBits: [8, 16, 16]
      };
      exports.KANJI = {
        id: "Kanji",
        bit: 1 << 3,
        ccBits: [8, 10, 12]
      };
      exports.MIXED = {
        bit: -1
      };
      exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
        if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid version: " + version);
        }
        if (version >= 1 && version < 10) return mode.ccBits[0];
        else if (version < 27) return mode.ccBits[1];
        return mode.ccBits[2];
      };
      exports.getBestModeForData = function getBestModeForData(dataStr) {
        if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
        else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
        else if (Regex.testKanji(dataStr)) return exports.KANJI;
        else return exports.BYTE;
      };
      exports.toString = function toString(mode) {
        if (mode && mode.id) return mode.id;
        throw new Error("Invalid mode");
      };
      exports.isValid = function isValid(mode) {
        return mode && mode.bit && mode.ccBits;
      };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        const lcStr = string.toLowerCase();
        switch (lcStr) {
          case "numeric":
            return exports.NUMERIC;
          case "alphanumeric":
            return exports.ALPHANUMERIC;
          case "kanji":
            return exports.KANJI;
          case "byte":
            return exports.BYTE;
          default:
            throw new Error("Unknown mode: " + string);
        }
      }
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e3) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/version.js
  var require_version = __commonJS({
    "node_modules/qrcode/lib/core/version.js"(exports) {
      var Utils = require_utils();
      var ECCode = require_error_correction_code();
      var ECLevel = require_error_correction_level();
      var Mode = require_mode();
      var VersionCheck = require_version_check();
      var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
      var G18_BCH = Utils.getBCHDigit(G18);
      function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
        for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      function getReservedBitsCount(mode, version) {
        return Mode.getCharCountIndicator(mode, version) + 4;
      }
      function getTotalBitsFromDataArray(segments, version) {
        let totalBits = 0;
        segments.forEach(function(data) {
          const reservedBits = getReservedBitsCount(data.mode, version);
          totalBits += reservedBits + data.getBitsLength();
        });
        return totalBits;
      }
      function getBestVersionForMixedData(segments, errorCorrectionLevel) {
        for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
          const length = getTotalBitsFromDataArray(segments, currentVersion);
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      exports.from = function from(value, defaultValue) {
        if (VersionCheck.isValid(value)) {
          return parseInt(value, 10);
        }
        return defaultValue;
      };
      exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid QR Code version");
        }
        if (typeof mode === "undefined") mode = Mode.BYTE;
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (mode === Mode.MIXED) return dataTotalCodewordsBits;
        const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
        switch (mode) {
          case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
          case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
          case Mode.KANJI:
            return Math.floor(usableBits / 13);
          case Mode.BYTE:
          default:
            return Math.floor(usableBits / 8);
        }
      };
      exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
        let seg;
        const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
        if (Array.isArray(data)) {
          if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
          }
          if (data.length === 0) {
            return 1;
          }
          seg = data[0];
        } else {
          seg = data;
        }
        return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
      };
      exports.getEncodedBits = function getEncodedBits(version) {
        if (!VersionCheck.isValid(version) || version < 7) {
          throw new Error("Invalid QR Code version");
        }
        let d3 = version << 12;
        while (Utils.getBCHDigit(d3) - G18_BCH >= 0) {
          d3 ^= G18 << Utils.getBCHDigit(d3) - G18_BCH;
        }
        return version << 12 | d3;
      };
    }
  });

  // node_modules/qrcode/lib/core/format-info.js
  var require_format_info = __commonJS({
    "node_modules/qrcode/lib/core/format-info.js"(exports) {
      var Utils = require_utils();
      var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
      var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
      var G15_BCH = Utils.getBCHDigit(G15);
      exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
        const data = errorCorrectionLevel.bit << 3 | mask;
        let d3 = data << 10;
        while (Utils.getBCHDigit(d3) - G15_BCH >= 0) {
          d3 ^= G15 << Utils.getBCHDigit(d3) - G15_BCH;
        }
        return (data << 10 | d3) ^ G15_MASK;
      };
    }
  });

  // node_modules/qrcode/lib/core/numeric-data.js
  var require_numeric_data = __commonJS({
    "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
      var Mode = require_mode();
      function NumericData(data) {
        this.mode = Mode.NUMERIC;
        this.data = data.toString();
      }
      NumericData.getBitsLength = function getBitsLength(length) {
        return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
      };
      NumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      NumericData.prototype.getBitsLength = function getBitsLength() {
        return NumericData.getBitsLength(this.data.length);
      };
      NumericData.prototype.write = function write(bitBuffer) {
        let i4, group, value;
        for (i4 = 0; i4 + 3 <= this.data.length; i4 += 3) {
          group = this.data.substr(i4, 3);
          value = parseInt(group, 10);
          bitBuffer.put(value, 10);
        }
        const remainingNum = this.data.length - i4;
        if (remainingNum > 0) {
          group = this.data.substr(i4);
          value = parseInt(group, 10);
          bitBuffer.put(value, remainingNum * 3 + 1);
        }
      };
      module.exports = NumericData;
    }
  });

  // node_modules/qrcode/lib/core/alphanumeric-data.js
  var require_alphanumeric_data = __commonJS({
    "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
      var Mode = require_mode();
      var ALPHA_NUM_CHARS = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        " ",
        "$",
        "%",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":"
      ];
      function AlphanumericData(data) {
        this.mode = Mode.ALPHANUMERIC;
        this.data = data;
      }
      AlphanumericData.getBitsLength = function getBitsLength(length) {
        return 11 * Math.floor(length / 2) + 6 * (length % 2);
      };
      AlphanumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      AlphanumericData.prototype.getBitsLength = function getBitsLength() {
        return AlphanumericData.getBitsLength(this.data.length);
      };
      AlphanumericData.prototype.write = function write(bitBuffer) {
        let i4;
        for (i4 = 0; i4 + 2 <= this.data.length; i4 += 2) {
          let value = ALPHA_NUM_CHARS.indexOf(this.data[i4]) * 45;
          value += ALPHA_NUM_CHARS.indexOf(this.data[i4 + 1]);
          bitBuffer.put(value, 11);
        }
        if (this.data.length % 2) {
          bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i4]), 6);
        }
      };
      module.exports = AlphanumericData;
    }
  });

  // node_modules/qrcode/lib/core/byte-data.js
  var require_byte_data = __commonJS({
    "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
      var Mode = require_mode();
      function ByteData(data) {
        this.mode = Mode.BYTE;
        if (typeof data === "string") {
          this.data = new TextEncoder().encode(data);
        } else {
          this.data = new Uint8Array(data);
        }
      }
      ByteData.getBitsLength = function getBitsLength(length) {
        return length * 8;
      };
      ByteData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      ByteData.prototype.getBitsLength = function getBitsLength() {
        return ByteData.getBitsLength(this.data.length);
      };
      ByteData.prototype.write = function(bitBuffer) {
        for (let i4 = 0, l3 = this.data.length; i4 < l3; i4++) {
          bitBuffer.put(this.data[i4], 8);
        }
      };
      module.exports = ByteData;
    }
  });

  // node_modules/qrcode/lib/core/kanji-data.js
  var require_kanji_data = __commonJS({
    "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
      var Mode = require_mode();
      var Utils = require_utils();
      function KanjiData(data) {
        this.mode = Mode.KANJI;
        this.data = data;
      }
      KanjiData.getBitsLength = function getBitsLength(length) {
        return length * 13;
      };
      KanjiData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      KanjiData.prototype.getBitsLength = function getBitsLength() {
        return KanjiData.getBitsLength(this.data.length);
      };
      KanjiData.prototype.write = function(bitBuffer) {
        let i4;
        for (i4 = 0; i4 < this.data.length; i4++) {
          let value = Utils.toSJIS(this.data[i4]);
          if (value >= 33088 && value <= 40956) {
            value -= 33088;
          } else if (value >= 57408 && value <= 60351) {
            value -= 49472;
          } else {
            throw new Error(
              "Invalid SJIS character: " + this.data[i4] + "\nMake sure your charset is UTF-8"
            );
          }
          value = (value >>> 8 & 255) * 192 + (value & 255);
          bitBuffer.put(value, 13);
        }
      };
      module.exports = KanjiData;
    }
  });

  // node_modules/dijkstrajs/dijkstra.js
  var require_dijkstra = __commonJS({
    "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
      "use strict";
      var dijkstra = {
        single_source_shortest_paths: function(graph, s3, d3) {
          var predecessors = {};
          var costs = {};
          costs[s3] = 0;
          var open = dijkstra.PriorityQueue.make();
          open.push(s3, 0);
          var closest, u4, v3, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
          while (!open.empty()) {
            closest = open.pop();
            u4 = closest.value;
            cost_of_s_to_u = closest.cost;
            adjacent_nodes = graph[u4] || {};
            for (v3 in adjacent_nodes) {
              if (adjacent_nodes.hasOwnProperty(v3)) {
                cost_of_e = adjacent_nodes[v3];
                cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                cost_of_s_to_v = costs[v3];
                first_visit = typeof costs[v3] === "undefined";
                if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                  costs[v3] = cost_of_s_to_u_plus_cost_of_e;
                  open.push(v3, cost_of_s_to_u_plus_cost_of_e);
                  predecessors[v3] = u4;
                }
              }
            }
          }
          if (typeof d3 !== "undefined" && typeof costs[d3] === "undefined") {
            var msg = ["Could not find a path from ", s3, " to ", d3, "."].join("");
            throw new Error(msg);
          }
          return predecessors;
        },
        extract_shortest_path_from_predecessor_list: function(predecessors, d3) {
          var nodes = [];
          var u4 = d3;
          var predecessor;
          while (u4) {
            nodes.push(u4);
            predecessor = predecessors[u4];
            u4 = predecessors[u4];
          }
          nodes.reverse();
          return nodes;
        },
        find_path: function(graph, s3, d3) {
          var predecessors = dijkstra.single_source_shortest_paths(graph, s3, d3);
          return dijkstra.extract_shortest_path_from_predecessor_list(
            predecessors,
            d3
          );
        },
        /**
         * A very naive priority queue implementation.
         */
        PriorityQueue: {
          make: function(opts) {
            var T3 = dijkstra.PriorityQueue, t3 = {}, key;
            opts = opts || {};
            for (key in T3) {
              if (T3.hasOwnProperty(key)) {
                t3[key] = T3[key];
              }
            }
            t3.queue = [];
            t3.sorter = opts.sorter || T3.default_sorter;
            return t3;
          },
          default_sorter: function(a3, b) {
            return a3.cost - b.cost;
          },
          /**
           * Add a new item to the queue and ensure the highest priority element
           * is at the front of the queue.
           */
          push: function(value, cost) {
            var item = { value, cost };
            this.queue.push(item);
            this.queue.sort(this.sorter);
          },
          /**
           * Return the highest priority element in the queue.
           */
          pop: function() {
            return this.queue.shift();
          },
          empty: function() {
            return this.queue.length === 0;
          }
        }
      };
      if (typeof module !== "undefined") {
        module.exports = dijkstra;
      }
    }
  });

  // node_modules/qrcode/lib/core/segments.js
  var require_segments = __commonJS({
    "node_modules/qrcode/lib/core/segments.js"(exports) {
      var Mode = require_mode();
      var NumericData = require_numeric_data();
      var AlphanumericData = require_alphanumeric_data();
      var ByteData = require_byte_data();
      var KanjiData = require_kanji_data();
      var Regex = require_regex();
      var Utils = require_utils();
      var dijkstra = require_dijkstra();
      function getStringByteLength(str) {
        return unescape(encodeURIComponent(str)).length;
      }
      function getSegments(regex, mode, str) {
        const segments = [];
        let result;
        while ((result = regex.exec(str)) !== null) {
          segments.push({
            data: result[0],
            index: result.index,
            mode,
            length: result[0].length
          });
        }
        return segments;
      }
      function getSegmentsFromString(dataStr) {
        const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
        const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
        let byteSegs;
        let kanjiSegs;
        if (Utils.isKanjiModeEnabled()) {
          byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
          kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
        } else {
          byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
          kanjiSegs = [];
        }
        const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
        return segs.sort(function(s1, s22) {
          return s1.index - s22.index;
        }).map(function(obj) {
          return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
          };
        });
      }
      function getSegmentBitsLength(length, mode) {
        switch (mode) {
          case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
          case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
          case Mode.KANJI:
            return KanjiData.getBitsLength(length);
          case Mode.BYTE:
            return ByteData.getBitsLength(length);
        }
      }
      function mergeSegments(segs) {
        return segs.reduce(function(acc, curr) {
          const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
          if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
          }
          acc.push(curr);
          return acc;
        }, []);
      }
      function buildNodes(segs) {
        const nodes = [];
        for (let i4 = 0; i4 < segs.length; i4++) {
          const seg = segs[i4];
          switch (seg.mode) {
            case Mode.NUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.ALPHANUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.KANJI:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
              break;
            case Mode.BYTE:
              nodes.push([
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
          }
        }
        return nodes;
      }
      function buildGraph(nodes, version) {
        const table = {};
        const graph = { start: {} };
        let prevNodeIds = ["start"];
        for (let i4 = 0; i4 < nodes.length; i4++) {
          const nodeGroup = nodes[i4];
          const currentNodeIds = [];
          for (let j3 = 0; j3 < nodeGroup.length; j3++) {
            const node = nodeGroup[j3];
            const key = "" + i4 + j3;
            currentNodeIds.push(key);
            table[key] = { node, lastCount: 0 };
            graph[key] = {};
            for (let n2 = 0; n2 < prevNodeIds.length; n2++) {
              const prevNodeId = prevNodeIds[n2];
              if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                table[prevNodeId].lastCount += node.length;
              } else {
                if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
              }
            }
          }
          prevNodeIds = currentNodeIds;
        }
        for (let n2 = 0; n2 < prevNodeIds.length; n2++) {
          graph[prevNodeIds[n2]].end = 0;
        }
        return { map: graph, table };
      }
      function buildSingleSegment(data, modesHint) {
        let mode;
        const bestMode = Mode.getBestModeForData(data);
        mode = Mode.from(modesHint, bestMode);
        if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
          throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
        }
        if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
          mode = Mode.BYTE;
        }
        switch (mode) {
          case Mode.NUMERIC:
            return new NumericData(data);
          case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
          case Mode.KANJI:
            return new KanjiData(data);
          case Mode.BYTE:
            return new ByteData(data);
        }
      }
      exports.fromArray = function fromArray(array) {
        return array.reduce(function(acc, seg) {
          if (typeof seg === "string") {
            acc.push(buildSingleSegment(seg, null));
          } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
          }
          return acc;
        }, []);
      };
      exports.fromString = function fromString(data, version) {
        const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
        const nodes = buildNodes(segs);
        const graph = buildGraph(nodes, version);
        const path = dijkstra.find_path(graph.map, "start", "end");
        const optimizedSegs = [];
        for (let i4 = 1; i4 < path.length - 1; i4++) {
          optimizedSegs.push(graph.table[path[i4]].node);
        }
        return exports.fromArray(mergeSegments(optimizedSegs));
      };
      exports.rawSplit = function rawSplit(data) {
        return exports.fromArray(
          getSegmentsFromString(data, Utils.isKanjiModeEnabled())
        );
      };
    }
  });

  // node_modules/qrcode/lib/core/qrcode.js
  var require_qrcode = __commonJS({
    "node_modules/qrcode/lib/core/qrcode.js"(exports) {
      var Utils = require_utils();
      var ECLevel = require_error_correction_level();
      var BitBuffer = require_bit_buffer();
      var BitMatrix = require_bit_matrix();
      var AlignmentPattern = require_alignment_pattern();
      var FinderPattern = require_finder_pattern();
      var MaskPattern = require_mask_pattern();
      var ECCode = require_error_correction_code();
      var ReedSolomonEncoder = require_reed_solomon_encoder();
      var Version = require_version();
      var FormatInfo = require_format_info();
      var Mode = require_mode();
      var Segments = require_segments();
      function setupFinderPattern(matrix, version) {
        const size = matrix.size;
        const pos = FinderPattern.getPositions(version);
        for (let i4 = 0; i4 < pos.length; i4++) {
          const row = pos[i4][0];
          const col = pos[i4][1];
          for (let r3 = -1; r3 <= 7; r3++) {
            if (row + r3 <= -1 || size <= row + r3) continue;
            for (let c3 = -1; c3 <= 7; c3++) {
              if (col + c3 <= -1 || size <= col + c3) continue;
              if (r3 >= 0 && r3 <= 6 && (c3 === 0 || c3 === 6) || c3 >= 0 && c3 <= 6 && (r3 === 0 || r3 === 6) || r3 >= 2 && r3 <= 4 && c3 >= 2 && c3 <= 4) {
                matrix.set(row + r3, col + c3, true, true);
              } else {
                matrix.set(row + r3, col + c3, false, true);
              }
            }
          }
        }
      }
      function setupTimingPattern(matrix) {
        const size = matrix.size;
        for (let r3 = 8; r3 < size - 8; r3++) {
          const value = r3 % 2 === 0;
          matrix.set(r3, 6, value, true);
          matrix.set(6, r3, value, true);
        }
      }
      function setupAlignmentPattern(matrix, version) {
        const pos = AlignmentPattern.getPositions(version);
        for (let i4 = 0; i4 < pos.length; i4++) {
          const row = pos[i4][0];
          const col = pos[i4][1];
          for (let r3 = -2; r3 <= 2; r3++) {
            for (let c3 = -2; c3 <= 2; c3++) {
              if (r3 === -2 || r3 === 2 || c3 === -2 || c3 === 2 || r3 === 0 && c3 === 0) {
                matrix.set(row + r3, col + c3, true, true);
              } else {
                matrix.set(row + r3, col + c3, false, true);
              }
            }
          }
        }
      }
      function setupVersionInfo(matrix, version) {
        const size = matrix.size;
        const bits = Version.getEncodedBits(version);
        let row, col, mod;
        for (let i4 = 0; i4 < 18; i4++) {
          row = Math.floor(i4 / 3);
          col = i4 % 3 + size - 8 - 3;
          mod = (bits >> i4 & 1) === 1;
          matrix.set(row, col, mod, true);
          matrix.set(col, row, mod, true);
        }
      }
      function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
        const size = matrix.size;
        const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
        let i4, mod;
        for (i4 = 0; i4 < 15; i4++) {
          mod = (bits >> i4 & 1) === 1;
          if (i4 < 6) {
            matrix.set(i4, 8, mod, true);
          } else if (i4 < 8) {
            matrix.set(i4 + 1, 8, mod, true);
          } else {
            matrix.set(size - 15 + i4, 8, mod, true);
          }
          if (i4 < 8) {
            matrix.set(8, size - i4 - 1, mod, true);
          } else if (i4 < 9) {
            matrix.set(8, 15 - i4 - 1 + 1, mod, true);
          } else {
            matrix.set(8, 15 - i4 - 1, mod, true);
          }
        }
        matrix.set(size - 8, 8, 1, true);
      }
      function setupData(matrix, data) {
        const size = matrix.size;
        let inc = -1;
        let row = size - 1;
        let bitIndex = 7;
        let byteIndex = 0;
        for (let col = size - 1; col > 0; col -= 2) {
          if (col === 6) col--;
          while (true) {
            for (let c3 = 0; c3 < 2; c3++) {
              if (!matrix.isReserved(row, col - c3)) {
                let dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                }
                matrix.set(row, col - c3, dark);
                bitIndex--;
                if (bitIndex === -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || size <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
      function createData(version, errorCorrectionLevel, segments) {
        const buffer = new BitBuffer();
        segments.forEach(function(data) {
          buffer.put(data.mode.bit, 4);
          buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
          data.write(buffer);
        });
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
          buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 !== 0) {
          buffer.putBit(0);
        }
        const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
        for (let i4 = 0; i4 < remainingByte; i4++) {
          buffer.put(i4 % 2 ? 17 : 236, 8);
        }
        return createCodewords(buffer, version, errorCorrectionLevel);
      }
      function createCodewords(bitBuffer, version, errorCorrectionLevel) {
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewords = totalCodewords - ecTotalCodewords;
        const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
        const blocksInGroup2 = totalCodewords % ecTotalBlocks;
        const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
        const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
        const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
        const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
        const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
        const rs = new ReedSolomonEncoder(ecCount);
        let offset = 0;
        const dcData = new Array(ecTotalBlocks);
        const ecData = new Array(ecTotalBlocks);
        let maxDataSize = 0;
        const buffer = new Uint8Array(bitBuffer.buffer);
        for (let b = 0; b < ecTotalBlocks; b++) {
          const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
          dcData[b] = buffer.slice(offset, offset + dataSize);
          ecData[b] = rs.encode(dcData[b]);
          offset += dataSize;
          maxDataSize = Math.max(maxDataSize, dataSize);
        }
        const data = new Uint8Array(totalCodewords);
        let index = 0;
        let i4, r3;
        for (i4 = 0; i4 < maxDataSize; i4++) {
          for (r3 = 0; r3 < ecTotalBlocks; r3++) {
            if (i4 < dcData[r3].length) {
              data[index++] = dcData[r3][i4];
            }
          }
        }
        for (i4 = 0; i4 < ecCount; i4++) {
          for (r3 = 0; r3 < ecTotalBlocks; r3++) {
            data[index++] = ecData[r3][i4];
          }
        }
        return data;
      }
      function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
        let segments;
        if (Array.isArray(data)) {
          segments = Segments.fromArray(data);
        } else if (typeof data === "string") {
          let estimatedVersion = version;
          if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
          }
          segments = Segments.fromString(data, estimatedVersion || 40);
        } else {
          throw new Error("Invalid data");
        }
        const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
        if (!bestVersion) {
          throw new Error("The amount of data is too big to be stored in a QR Code");
        }
        if (!version) {
          version = bestVersion;
        } else if (version < bestVersion) {
          throw new Error(
            "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
          );
        }
        const dataBits = createData(version, errorCorrectionLevel, segments);
        const moduleCount = Utils.getSymbolSize(version);
        const modules = new BitMatrix(moduleCount);
        setupFinderPattern(modules, version);
        setupTimingPattern(modules);
        setupAlignmentPattern(modules, version);
        setupFormatInfo(modules, errorCorrectionLevel, 0);
        if (version >= 7) {
          setupVersionInfo(modules, version);
        }
        setupData(modules, dataBits);
        if (isNaN(maskPattern)) {
          maskPattern = MaskPattern.getBestMask(
            modules,
            setupFormatInfo.bind(null, modules, errorCorrectionLevel)
          );
        }
        MaskPattern.applyMask(maskPattern, modules);
        setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
        return {
          modules,
          version,
          errorCorrectionLevel,
          maskPattern,
          segments
        };
      }
      exports.create = function create(data, options) {
        if (typeof data === "undefined" || data === "") {
          throw new Error("No input text");
        }
        let errorCorrectionLevel = ECLevel.M;
        let version;
        let mask;
        if (typeof options !== "undefined") {
          errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
          version = Version.from(options.version);
          mask = MaskPattern.from(options.maskPattern);
          if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
          }
        }
        return createSymbol(data, version, errorCorrectionLevel, mask);
      };
    }
  });

  // node_modules/qrcode/lib/renderer/utils.js
  var require_utils2 = __commonJS({
    "node_modules/qrcode/lib/renderer/utils.js"(exports) {
      function hex2rgba(hex) {
        if (typeof hex === "number") {
          hex = hex.toString();
        }
        if (typeof hex !== "string") {
          throw new Error("Color should be defined as hex string");
        }
        let hexCode = hex.slice().replace("#", "").split("");
        if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
          throw new Error("Invalid hex color: " + hex);
        }
        if (hexCode.length === 3 || hexCode.length === 4) {
          hexCode = Array.prototype.concat.apply([], hexCode.map(function(c3) {
            return [c3, c3];
          }));
        }
        if (hexCode.length === 6) hexCode.push("F", "F");
        const hexValue = parseInt(hexCode.join(""), 16);
        return {
          r: hexValue >> 24 & 255,
          g: hexValue >> 16 & 255,
          b: hexValue >> 8 & 255,
          a: hexValue & 255,
          hex: "#" + hexCode.slice(0, 6).join("")
        };
      }
      exports.getOptions = function getOptions(options) {
        if (!options) options = {};
        if (!options.color) options.color = {};
        const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
        const width = options.width && options.width >= 21 ? options.width : void 0;
        const scale = options.scale || 4;
        return {
          width,
          scale: width ? 4 : scale,
          margin,
          color: {
            dark: hex2rgba(options.color.dark || "#000000ff"),
            light: hex2rgba(options.color.light || "#ffffffff")
          },
          type: options.type,
          rendererOpts: options.rendererOpts || {}
        };
      };
      exports.getScale = function getScale(qrSize, opts) {
        return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
      };
      exports.getImageWidth = function getImageWidth(qrSize, opts) {
        const scale = exports.getScale(qrSize, opts);
        return Math.floor((qrSize + opts.margin * 2) * scale);
      };
      exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
        const size = qr.modules.size;
        const data = qr.modules.data;
        const scale = exports.getScale(size, opts);
        const symbolSize = Math.floor((size + opts.margin * 2) * scale);
        const scaledMargin = opts.margin * scale;
        const palette = [opts.color.light, opts.color.dark];
        for (let i4 = 0; i4 < symbolSize; i4++) {
          for (let j3 = 0; j3 < symbolSize; j3++) {
            let posDst = (i4 * symbolSize + j3) * 4;
            let pxColor = opts.color.light;
            if (i4 >= scaledMargin && j3 >= scaledMargin && i4 < symbolSize - scaledMargin && j3 < symbolSize - scaledMargin) {
              const iSrc = Math.floor((i4 - scaledMargin) / scale);
              const jSrc = Math.floor((j3 - scaledMargin) / scale);
              pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
            }
            imgData[posDst++] = pxColor.r;
            imgData[posDst++] = pxColor.g;
            imgData[posDst++] = pxColor.b;
            imgData[posDst] = pxColor.a;
          }
        }
      };
    }
  });

  // node_modules/qrcode/lib/renderer/canvas.js
  var require_canvas = __commonJS({
    "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
      var Utils = require_utils2();
      function clearCanvas(ctx, canvas, size) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!canvas.style) canvas.style = {};
        canvas.height = size;
        canvas.width = size;
        canvas.style.height = size + "px";
        canvas.style.width = size + "px";
      }
      function getCanvasElement() {
        try {
          return document.createElement("canvas");
        } catch (e3) {
          throw new Error("You need to specify a canvas element");
        }
      }
      exports.render = function render(qrData, canvas, options) {
        let opts = options;
        let canvasEl = canvas;
        if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
          opts = canvas;
          canvas = void 0;
        }
        if (!canvas) {
          canvasEl = getCanvasElement();
        }
        opts = Utils.getOptions(opts);
        const size = Utils.getImageWidth(qrData.modules.size, opts);
        const ctx = canvasEl.getContext("2d");
        const image = ctx.createImageData(size, size);
        Utils.qrToImageData(image.data, qrData, opts);
        clearCanvas(ctx, canvasEl, size);
        ctx.putImageData(image, 0, 0);
        return canvasEl;
      };
      exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
        let opts = options;
        if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
          opts = canvas;
          canvas = void 0;
        }
        if (!opts) opts = {};
        const canvasEl = exports.render(qrData, canvas, opts);
        const type = opts.type || "image/png";
        const rendererOpts = opts.rendererOpts || {};
        return canvasEl.toDataURL(type, rendererOpts.quality);
      };
    }
  });

  // node_modules/qrcode/lib/renderer/svg-tag.js
  var require_svg_tag = __commonJS({
    "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
      var Utils = require_utils2();
      function getColorAttrib(color, attrib) {
        const alpha = color.a / 255;
        const str = attrib + '="' + color.hex + '"';
        return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
      }
      function svgCmd(cmd, x2, y3) {
        let str = cmd + x2;
        if (typeof y3 !== "undefined") str += " " + y3;
        return str;
      }
      function qrToPath(data, size, margin) {
        let path = "";
        let moveBy = 0;
        let newRow = false;
        let lineLength = 0;
        for (let i4 = 0; i4 < data.length; i4++) {
          const col = Math.floor(i4 % size);
          const row = Math.floor(i4 / size);
          if (!col && !newRow) newRow = true;
          if (data[i4]) {
            lineLength++;
            if (!(i4 > 0 && col > 0 && data[i4 - 1])) {
              path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
              moveBy = 0;
              newRow = false;
            }
            if (!(col + 1 < size && data[i4 + 1])) {
              path += svgCmd("h", lineLength);
              lineLength = 0;
            }
          } else {
            moveBy++;
          }
        }
        return path;
      }
      exports.render = function render(qrData, options, cb) {
        const opts = Utils.getOptions(options);
        const size = qrData.modules.size;
        const data = qrData.modules.data;
        const qrcodesize = size + opts.margin * 2;
        const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
        const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
        const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
        const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
        const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
        if (typeof cb === "function") {
          cb(null, svgTag);
        }
        return svgTag;
      };
    }
  });

  // node_modules/qrcode/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/qrcode/lib/browser.js"(exports) {
      var canPromise = require_can_promise();
      var QRCode2 = require_qrcode();
      var CanvasRenderer = require_canvas();
      var SvgRenderer = require_svg_tag();
      function renderCanvas(renderFunc, canvas, text, opts, cb) {
        const args = [].slice.call(arguments, 1);
        const argsNum = args.length;
        const isLastArgCb = typeof args[argsNum - 1] === "function";
        if (!isLastArgCb && !canPromise()) {
          throw new Error("Callback required as last argument");
        }
        if (isLastArgCb) {
          if (argsNum < 2) {
            throw new Error("Too few arguments provided");
          }
          if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = void 0;
          } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === "undefined") {
              cb = opts;
              opts = void 0;
            } else {
              cb = opts;
              opts = text;
              text = canvas;
              canvas = void 0;
            }
          }
        } else {
          if (argsNum < 1) {
            throw new Error("Too few arguments provided");
          }
          if (argsNum === 1) {
            text = canvas;
            canvas = opts = void 0;
          } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = void 0;
          }
          return new Promise(function(resolve, reject) {
            try {
              const data = QRCode2.create(text, opts);
              resolve(renderFunc(data, canvas, opts));
            } catch (e3) {
              reject(e3);
            }
          });
        }
        try {
          const data = QRCode2.create(text, opts);
          cb(null, renderFunc(data, canvas, opts));
        } catch (e3) {
          cb(e3);
        }
      }
      exports.create = QRCode2.create;
      exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
      exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
      exports.toString = renderCanvas.bind(null, function(data, _2, opts) {
        return SvgRenderer.render(data, opts);
      });
    }
  });

  // ../../../compiler-tools/node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var d = Array.isArray;
  function w(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l3, u4, t3) {
    var i4, r3, o3, e3 = {};
    for (o3 in u4) "key" == o3 ? i4 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return m(l3, e3, i4, r3, null);
  }
  function m(n2, t3, i4, r3, o3) {
    var e3 = { type: n2, props: t3, key: i4, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function S(n2, l3) {
    if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C(n2) {
    if (n2.__P && n2.__d) {
      var u4 = n2.__v, t3 = u4.__e, i4 = [], r3 = [], o3 = w({}, u4);
      o3.__v = u4.__v + 1, l.vnode && l.vnode(o3), z(n2.__P, o3, u4, n2.__n, n2.__P.namespaceURI, 32 & u4.__u ? [t3] : null, i4, null == t3 ? S(u4) : t3, !!(32 & u4.__u), r3), o3.__v = u4.__v, o3.__.__k[o3.__i] = o3, V(i4, o3, r3), u4.__e = u4.__ = null, o3.__e != t3 && M(o3);
    }
  }
  function M(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
      if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
    }), M(n2);
  }
  function $(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !I.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(I);
  }
  function I() {
    for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, C(n2);
    I.__r = 0;
  }
  function P(n2, l3, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, y3, d3, w3, g2, _2, m3 = t3 && t3.__k || v, b = l3.length;
    for (f4 = A(u4, l3, m3, f4, b), a3 = 0; a3 < b; a3++) null != (y3 = u4.__k[a3]) && (h3 = -1 != y3.__i && m3[y3.__i] || p, y3.__i = a3, g2 = z(n2, y3, h3, i4, r3, o3, e3, f4, c3, s3), d3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && D(h3.ref, null, y3), s3.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), (_2 = !!(4 & y3.__u)) || h3.__k === y3.__k ? f4 = H(y3, f4, n2, _2) : "function" == typeof y3.type && void 0 !== g2 ? f4 = g2 : d3 && (f4 = d3.nextSibling), y3.__u &= -7);
    return u4.__e = w3, f4;
  }
  function A(n2, l3, u4, t3, i4) {
    var r3, o3, e3, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
    for (n2.__k = new Array(i4), r3 = 0; r3 < i4; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = m(null, o3, null, null, null) : d(o3) ? o3 = n2.__k[r3] = m(k, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f4 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = T(o3, u4, f4, a3)) && (a3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i4 > s3 ? h3-- : i4 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = S(e3)), E(e3, e3));
    return t3;
  }
  function H(n2, l3, u4, t3) {
    var i4, r3;
    if ("function" == typeof n2.type) {
      for (i4 = n2.__k, r3 = 0; i4 && r3 < i4.length; r3++) i4[r3] && (i4[r3].__ = n2, l3 = H(i4[r3], l3, u4, t3));
      return l3;
    }
    n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = S(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function T(n2, l3, u4, t3) {
    var i4, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e3 || s3 && e3 == c3.key && f4 == c3.type) return u4;
    if (t3 > (s3 ? 1 : 0)) {
      for (i4 = u4 - 1, r3 = u4 + 1; i4 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i4 >= 0 ? i4-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
    }
    return -1;
  }
  function j(n2, l3, u4) {
    "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || y.test(l3) ? u4 : u4 + "px";
  }
  function F(n2, l3, u4, t3, i4) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || j(n2.style, l3, "");
      if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || j(n2.style, l3, u4[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
    }
  }
  function O(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4.t) u4.t = c++;
        else if (u4.t < t3.u) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function z(n2, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, p3, y3, _2, m3, b, S2, C3, M2, $2, I2, A3, H2, L, T3 = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
    n: if ("function" == typeof T3) try {
      if (S2 = u4.props, C3 = "prototype" in T3 && T3.prototype.render, M2 = (a3 = T3.contextType) && i4[a3.__c], $2 = a3 ? M2 ? M2.props.value : a3.__ : i4, t3.__c ? b = (h3 = u4.__c = t3.__c).__ = h3.__E : (C3 ? u4.__c = h3 = new T3(S2, $2) : (u4.__c = h3 = new x(S2, $2), h3.constructor = T3, h3.render = G), M2 && M2.sub(h3), h3.state || (h3.state = {}), h3.__n = i4, p3 = h3.__d = true, h3.__h = [], h3._sb = []), C3 && null == h3.__s && (h3.__s = h3.state), C3 && null != T3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = w({}, h3.__s)), w(h3.__s, T3.getDerivedStateFromProps(S2, h3.__s))), y3 = h3.props, _2 = h3.state, h3.__v = u4, p3) C3 && null == T3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), C3 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (C3 && null == T3.getDerivedStateFromProps && S2 !== y3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(S2, $2), u4.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(S2, h3.__s, $2)) {
          u4.__v != t3.__v && (h3.props = S2, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
            n3 && (n3.__ = u4);
          }), v.push.apply(h3.__h, h3._sb), h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(S2, h3.__s, $2), C3 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(y3, _2, m3);
        });
      }
      if (h3.context = $2, h3.props = S2, h3.__P = n2, h3.__e = false, I2 = l.__r, A3 = 0, C3) h3.state = h3.__s, h3.__d = false, I2 && I2(u4), a3 = h3.render(h3.props, h3.state, h3.context), v.push.apply(h3.__h, h3._sb), h3._sb = [];
      else do {
        h3.__d = false, I2 && I2(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++A3 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i4 = w(w({}, i4), h3.getChildContext())), C3 && !p3 && null != h3.getSnapshotBeforeUpdate && (m3 = h3.getSnapshotBeforeUpdate(y3, _2)), H2 = null != a3 && a3.type === k && null == a3.key ? q(a3.props.children) : a3, f4 = P(n2, d(H2) ? H2 : [H2], u4, t3, i4, r3, o3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), b && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u4.__v = null, c3 || null != o3) if (n3.then) {
        for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        o3[o3.indexOf(f4)] = null, u4.__e = f4;
      } else {
        for (L = o3.length; L--; ) g(o3[L]);
        N(u4);
      }
      else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || N(u4);
      l.__e(n3, u4, t3);
    }
    else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = B(t3.__e, u4, t3, i4, r3, o3, e3, c3, s3);
    return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
  }
  function N(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(N));
  }
  function V(n2, u4, t3) {
    for (var i4 = 0; i4 < t3.length; i4++) D(t3[i4], t3[++i4], t3[++i4]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function q(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : d(n2) ? n2.map(q) : w({}, n2);
  }
  function B(u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, v3, y3, w3, _2, m3, b = i4.props || p, k3 = t3.props, x2 = t3.type;
    if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (a3 = 0; a3 < e3.length; a3++) if ((w3 = e3[a3]) && "setAttribute" in w3 == !!x2 && (x2 ? w3.localName == x2 : 3 == w3.nodeType)) {
        u4 = w3, e3[a3] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x2) return document.createTextNode(k3);
      u4 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x2) b === k3 || c3 && u4.data == k3 || (u4.data = k3);
    else {
      if (e3 = e3 && n.call(u4.childNodes), !c3 && null != e3) for (b = {}, a3 = 0; a3 < u4.attributes.length; a3++) b[(w3 = u4.attributes[a3]).name] = w3.value;
      for (a3 in b) w3 = b[a3], "dangerouslySetInnerHTML" == a3 ? v3 = w3 : "children" == a3 || a3 in k3 || "value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3 || F(u4, a3, null, w3, o3);
      for (a3 in k3) w3 = k3[a3], "children" == a3 ? y3 = w3 : "dangerouslySetInnerHTML" == a3 ? h3 = w3 : "value" == a3 ? _2 = w3 : "checked" == a3 ? m3 = w3 : c3 && "function" != typeof w3 || b[a3] === w3 || F(u4, a3, w3, b[a3], o3);
      if (h3) c3 || v3 && (h3.__html == v3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
      else if (v3 && (u4.innerHTML = ""), P("template" == t3.type ? u4.content : u4, d(y3) ? y3 : [y3], t3, i4, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i4.__k && S(i4, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) g(e3[a3]);
      c3 || (a3 = "value", "progress" == x2 && null == _2 ? u4.removeAttribute("value") : null != _2 && (_2 !== u4[a3] || "progress" == x2 && !_2 || "option" == x2 && _2 != b[a3]) && F(u4, a3, _2, b[a3], o3), a3 = "checked", null != m3 && m3 != u4[a3] && F(u4, a3, m3, b[a3], o3));
    }
    return u4;
  }
  function D(n2, u4, t3) {
    try {
      if ("function" == typeof n2) {
        var i4 = "function" == typeof n2.__u;
        i4 && n2.__u(), i4 && null == u4 || (n2.__u = n2(u4));
      } else n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function E(n2, u4, t3) {
    var i4, r3;
    if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current != n2.__e || D(i4, null, u4)), null != (i4 = n2.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i4.base = i4.__P = null;
    }
    if (i4 = n2.__k) for (r3 = 0; r3 < i4.length; r3++) i4[r3] && E(i4[r3], u4, t3 || "function" != typeof n2.type);
    t3 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function G(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  function J(u4, t3, i4) {
    var r3, o3, e3, f4;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, e3 = [], f4 = [], z(t3, u4 = (!r3 && i4 || t3).__k = _(k, null, [u4]), o3 || p, p, t3.namespaceURI, !r3 && i4 ? [i4] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i4 ? i4 : o3 ? o3.__e : t3.firstChild, r3, f4), V(e3, u4, f4);
  }
  n = v.slice, l = { __e: function(n2, l3, u4, t3) {
    for (var i4, r3, o3; l3 = l3.__; ) if ((i4 = l3.__c) && !i4.__) try {
      if ((r3 = i4.constructor) && null != r3.getDerivedStateFromError && (i4.setState(r3.getDerivedStateFromError(n2)), o3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), o3 = i4.__d), o3) return i4.__E = i4;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, x.prototype.setState = function(n2, l3) {
    var u4;
    u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, u4), this.props)), n2 && w(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), $(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), $(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, I.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = O(false), a = O(true), h = 0;

  // ../../../compiler-tools/node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = l;
  var e2 = c2.__b;
  var a2 = c2.__r;
  var v2 = c2.diffed;
  var l2 = c2.__c;
  var m2 = c2.unmount;
  var s2 = c2.__;
  function p2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u4, i4) {
    var o3 = p2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f4 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u5 = o3.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u5.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i5 = o3.__c.props !== n3;
        return u5.some(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
          }
        }), c3 && c3.call(this, n3, t3, r3) || i5;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u5 = c3;
          c3 = void 0, f4(n3, t3, r3), c3 = u5;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f4;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u4) {
    var i4 = p2(t2++, 3);
    !c2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.u = u4, r2.__H.__h.push(i4));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u4 = p2(t2++, 7);
    return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) {
      var t3 = n2.__H;
      if (n2.__P && t3) try {
        t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], c2.__e(r3, n2.__v);
      }
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i4 = (r2 = n2.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i4.__h.some(z2), i4.__h.some(B2), i4.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.some(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r3, 35);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // src/lib.ts
  var CATS = ["مجمدات", "لبن وأجبان", "لحوم ودواجن", "مواد غذائية"];
  var STORE_NAME = typeof window !== "undefined" && window.STORE_NAME || "المتجر";
  var STORE_PHRASES = {
    "تموينية": "بقالة وتموينية — كل ما ينزل بيتك",
    "مجمدات": "متجر للمجمدات والألبان",
    "ملاحم": "ملحم طازج — لحوم بلدي",
    "خضرة": "متجر للخضار والفواكه",
    "صيدلية": "صيدلية — أدوية ومستلزمات",
    "مخبز": "مخبز وأفران — خبز يومي",
    "وقود": "محروقات ووقود",
    "قطع سيارات": "متجر لقطع غيار السيارات",
    "كهربائات": "متجر للكهربائيات",
    "بناء": "متجر لمواد البناء",
    "صحية": "متجر للمنتجات الصحية",
    "ملابس": "متجر للملابس والألبسة",
    "موبايلات": "متجر للموبايلات والإلكترونيات",
    "أثاث": "متجر للأثاث والمفروشات",
    "هدايا": "متجر للهدايا والإكسسوارات",
    "قرطاسية وكتب": "متجر للقرطاسية والكتب",
    "غير ذلك": "متجر متنوع — كل شي تلقاه"
  };
  var storePhrase = (cat) => STORE_PHRASES[cat] || "";
  var curStore = () => typeof window !== "undefined" && window.STORE_ID || "main";
  var PKEY = () => `matjar-v1-products-${curStore()}`;
  var CKEY = () => `matjar-v1-cart-${curStore()}`;
  var OKEY = () => `matjar-v1-orders-${curStore()}`;
  var SAMPLE = [
    { id: "s6", name: "جبنة عكاوي", cat: "لبن وأجبان", price: 4.5, oldPrice: 5.75, desc: "عكاوي بلدي مملح وسط — للكيلو.", img: "🧀", qty: 15 },
    { id: "s7", name: "لبنة قريش", cat: "لبن وأجبان", price: 1.5, oldPrice: null, desc: "لبنة قريش طازجة — عبوة كيلو.", img: "🥣", qty: 20 },
    { id: "s8", name: "حليب طازج", cat: "لبن وأجبان", price: 1.25, oldPrice: null, desc: "حليب طازج مبستر — عبوة لتر.", img: "🥛", qty: 35 },
    { id: "s9", name: "بيض بلدي", cat: "لبن وأجبان", price: 4.25, oldPrice: null, desc: "طبقة ٣٠ بيضة بلدية.", img: "🥚", qty: 18 },
    { id: "s10", name: "دجاج طازج", cat: "لحوم ودواجن", price: 3.25, oldPrice: 3.95, desc: "دجاج طازج مذبوح اليوم — للكيلو.", img: "🍗", qty: 22 },
    { id: "s11", name: "لحم عجلي مفروم", cat: "لحوم ودواجن", price: 9.5, oldPrice: null, desc: "لحم عجلي بلدي مفروم طازج — للكيلو.", img: "🥩", qty: 12 },
    { id: "s12", name: "أرز مصري", cat: "مواد غذائية", price: 1.85, oldPrice: 2.25, desc: "أرز مصري درجة أولى — كيس كيلو.", img: "🍚", qty: 45 },
    { id: "s13", name: "زيت زيتون بكر", cat: "مواد غذائية", price: 8.5, oldPrice: null, desc: "زيت زيتون بكر من أول عصرة — عبوة ٧٥٠ مل.", img: "🫗", qty: 14 },
    { id: "s14", name: "شاي أحمر", cat: "مواد غذائية", price: 3.75, oldPrice: null, desc: "شاي أحمر فاخر — عبوة نصف كيلو.", img: "🫖", qty: 20 },
    { id: "s15", name: "تونة معلبة", cat: "مواد غذائية", price: 0.99, oldPrice: 1.35, desc: "قطع تونة بزيت عباد الشمس — معلبة ١٨٥ غ.", img: "🐟", qty: 60 },
    { id: "s16", name: "خضار مشكلة مجمدة", cat: "مجمدات", price: 1.95, oldPrice: 2.5, desc: "بازلاء وجزر وفاصوليا — كيس ٤٠٠ غ.", img: "🥕", qty: 28 },
    { id: "s17", name: "بطاطس ودجز مجمدة", cat: "مجمدات", price: 1.75, oldPrice: null, desc: "أصابع بطاطس مقرمشة — كيس كيلو.", img: "🍟", qty: 35 },
    { id: "s18", name: "برجر لحم مجمد", cat: "مجمدات", price: 4.25, oldPrice: 5.5, desc: "أقراص برجر لحم بلدي — عبوة ١٠ أقراص.", img: "🍔", qty: 16 },
    { id: "s19", name: "سامبوسك دجاج مجمد", cat: "مجمدات", price: 3.5, oldPrice: null, desc: "مثلثات سامبوسك محشية دجاج — كيس ٥٠٠ غ.", img: "🥟", qty: 20 },
    { id: "s20", name: "آيس كريم عبوات", cat: "مجمدات", price: 2.25, oldPrice: 3, desc: "آيس كريم فانيلا وشوكولاتة — عبوة لتر.", img: "🍦", qty: 22 }
  ];
  var STARTER = [
    { id: "f1", name: "دجاج طلح مجمد", cat: "لحوم ودواجن", price: 2.95, oldPrice: 3.5, desc: "دجاج طلح كامل مجمد — للكيلو.", img: "🐔", qty: 25 },
    { id: "f2", name: "صدور دجاج مجمدة", cat: "لحوم ودواجن", price: 4.25, oldPrice: null, desc: "صدور دجاج مجمدة مقطعة أو كاملة — للكيلو.", img: "🍗", qty: 20 },
    { id: "f3", name: "أفخاذ دجاج مجمدة", cat: "لحوم ودواجن", price: 2.95, oldPrice: null, desc: "أفخاذ دجاج مجمدة — للكيلو.", img: "🍖", qty: 22 },
    { id: "f4", name: "شاورما دجاج مجمدة", cat: "لحوم ودواجن", price: 3.95, oldPrice: null, desc: "أصابع شاورما دجاج — للكيلو.", img: "🌯", qty: 15 },
    { id: "f5", name: "لحم مفروم مجمد", cat: "لحوم ودواجن", price: 7.5, oldPrice: null, desc: "لحم بقري مفروم مجمد — للكيلو.", img: "🥩", qty: 12 },
    { id: "f6", name: "كباب حلبي مجمد", cat: "لحوم ودواجن", price: 6.5, oldPrice: 7.75, desc: "كباب حلبي بالبقدونس — للكيلو.", img: "🍢", qty: 14 },
    { id: "f7", name: "سمك بلطي مجمد", cat: "مجمدات", price: 3.25, oldPrice: null, desc: "بلطي مجمد منظف — للكيلو.", img: "🐟", qty: 18 },
    { id: "f8", name: "سمك دنيس مجمد", cat: "مجمدات", price: 5.5, oldPrice: 6.25, desc: "دنيس مجمد طازج التجميد — للكيلو.", img: "🐠", qty: 10 },
    { id: "f9", name: "جمبري مجمد", cat: "مجمدات", price: 8.5, oldPrice: null, desc: "جمبري مجمد منظف — للكيلو.", img: "🦐", qty: 8 },
    { id: "f10", name: "فيليه سمك مجمد", cat: "مجمدات", price: 4.25, oldPrice: null, desc: "فيليه سمك مجمد بلا عظم — للكيلو.", img: "🍥", qty: 12 }
  ];
  var STORE_TYPES = [
    { name: "مواد تموينية", emoji: "🏪" },
    { name: "مجمدات", emoji: "❄️" },
    { name: "ملاحم ولحوم", emoji: "🥩" },
    { name: "خضار وفواكه", emoji: "🍅" },
    { name: "صيدلية", emoji: "💊" },
    { name: "مخبز ومعجنات", emoji: "🥖" },
    { name: "محطة وقود", emoji: "⛽" },
    { name: "قطع سيارات", emoji: "🔧" },
    { name: "كهربائات", emoji: "💡" },
    { name: "مواد بناء", emoji: "🧱" },
    { name: "أدوات صحية", emoji: "🚿" },
    { name: "ملابس وأحذية", emoji: "👕" },
    { name: "موبايلات وإلكترونيات", emoji: "📱" },
    { name: "أثاث ومفروشات", emoji: "🛋️" },
    { name: "هدايا وتجميل", emoji: "🎁" },
    { name: "قرطاسية وكتب", emoji: "📚" },
    { name: "غير ذلك", emoji: "🏬" }
  ];
  var mk = (id, name, cat, price, oldPrice, desc, img, qty) => ({ id, name, cat, price, oldPrice, desc, img, qty });
  var STARTERS = {
    "مواد تموينية": [
      mk("t1", "أرز مصري", "مواد غذائية", 1.85, 2.25, "أرز مصري درجة أولى — كيس كيلو.", "🍚", 45),
      mk("t2", "زيت دوار الشمس", "مواد غذائية", 3.25, null, "زيت طهي — عبوة لتر ونصف.", "🫗", 30),
      mk("t3", "سكر أبيض", "مواد غذائية", 1.15, null, "سكر ناعم — كيس كيلو.", "🧂", 50),
      mk("t4", "شاي أحمر فاخر", "مواد غذائية", 3.75, 4.5, "شاي أحمر — عبوة نصف كيلو.", "🫖", 25),
      mk("t5", "مكرونة إيطالية", "مواد غذائية", 0.85, null, "سباجيتي — كيس ٤٠٠ غ.", "🍝", 60),
      mk("t6", "تونة معلبة", "مواد غذائية", 0.99, 1.35, "قطع تونة بزيت عباد الشمس — ١٨٥ غ.", "🐟", 60)
    ],
    "مجمدات": [
      mk("z1", "دجاج طلح مجمد", "لحوم ودواجن", 2.95, 3.5, "دجاج طلح كامل مجمد — للكيلو.", "🐔", 25),
      mk("z2", "أفخاذ دجاج مجمدة", "لحوم ودواجن", 2.95, null, "أفخاذ دجاج مجمدة — للكيلو.", "🍖", 22),
      mk("z3", "برجر لحم مجمد", "مجمدات", 4.25, 5.5, "أقراص برجر لحم — عبوة ١٠ أقراص.", "🍔", 16),
      mk("z4", "بطاطس ودجز مجمدة", "مجمدات", 1.75, null, "أصابع بطاطس مقرمشة — كيس كيلو.", "🍟", 35),
      mk("z5", "آيس كريم عبوات", "مجمدات", 2.25, 3, "فانيلا وشوكولاتة — عبوة لتر.", "🍦", 22)
    ],
    "ملاحم ولحوم": [
      mk("m1", "لحم عجلي بلدي", "لحوم طازجة", 9.5, 10.75, "لحم عجلي طازج — للكيلو.", "🥩", 15),
      mk("m2", "ستيك لحم", "لحوم طازجة", 12.5, null, "شرائح ستيك طازجة — للكيلو.", "🥩", 10),
      mk("m3", "لحم مفروم ناعم", "لحوم طازجة", 8.75, null, "مفروم طازج — للكيلو.", "🍖", 12),
      mk("m4", "كتف غنم", "لحوم طازجة", 11.5, 12.9, "كتف غنم بلدي — للكيلو.", "🐑", 8),
      mk("m5", "دجاج طازج مذبوح", "لحوم طازجة", 3.25, null, "مذبوح اليوم — للكيلو.", "🍗", 20)
    ],
    "خضار وفواكه": [
      mk("k1", "طماطم", "خضار وفواكه", 0.75, 0.95, "طماطم بلدية — للكيلو.", "🍅", 40),
      mk("k2", "خيار", "خضار وفواكه", 0.95, null, "خيار طازج — للكيلو.", "🥒", 35),
      mk("k3", "بطاطس", "خضار وفواكه", 0.65, null, "بطاطس مغسولة — للكيلو.", "🥔", 50),
      mk("k4", "تفاح أحمر", "خضار وفواكه", 1.75, 2.25, "تفاح أحمر — للكيلو.", "🍎", 30),
      mk("k5", "موز", "خضار وفواكه", 1.95, null, "موز فاخر — للكيلو.", "🍌", 25)
    ],
    "صيدلية": [
      mk("ph1", "بانادول اكسترا", "أدوية", 2.5, null, "مسكن — شريط ٢٤ حبة.", "💊", 40),
      mk("ph2", "فيتامين سي", "مكملات", 4.25, 5.5, "فوار ٢٠ قرصاً — برتقال.", "🍊", 30),
      mk("ph3", "كمامات طبية", "مستلزمات", 1.5, null, "علبة ٥٠ كماماً.", "😷", 45),
      mk("ph4", "معقم يدين", "مستلزمات", 2.25, null, "جل معقم — عبوة ٥٠٠ مل.", "🧴", 35),
      mk("ph5", "كمادة حرارية", "أدوية", 1.95, null, "بلاستر ميكانيكي — ٢٠ كمادة.", "🩹", 50)
    ],
    "مخبز ومعجنات": [
      mk("b1", "خبز عربي", "مخبوزات", 0.35, null, "خبز صاج طازج — حزمة.", "🥙", 100),
      mk("b2", "كعك بالسمسم", "مخبوزات", 1.25, null, "كعك طازج — كيس.", "🥨", 30),
      mk("b3", "بيتزا مجمدة", "مجمدات", 2.75, 3.5, "بيتزا خضار — وعاء وسط.", "🍕", 20),
      mk("b4", "مانائيش زعتر", "مخبوزات", 0.5, null, "مناقيش زعتر — حبة.", "🫓", 60),
      mk("b5", "كرواسون", "مخبوزات", 0.75, null, "كرواسون شوكولاتة.", "🥐", 40)
    ],
    "محطة وقود": [
      mk("g1", "بنزين ٩٠", "وقود", 0.895, null, "بنزين ٩٠ مضاف — للتر.", "⛽", 999),
      mk("g2", "بنزين ٩٥", "وقود", 1.095, null, "بنزين ٩٥ — للتر.", "⛽", 999),
      mk("g3", "ديزل", "وقود", 0.775, null, "ديزل — للتر.", "🛢️", 999),
      mk("g4", "زيت محرك", "زيوت", 14.5, 16.9, "زيت محرك صناعي — ٤ لتر.", "🛢️", 15),
      mk("g5", "سائل تنظيف زجاج", "مستلزمات", 2.95, null, "عبوة رش — ٥٠٠ مل.", "🧴", 25)
    ],
    "قطع سيارات": [
      mk("c1", "فلتر زيت", "قطع", 6.5, null, "فلتر زيت أصلي — يشمل أشهر الموديلات.", "🔧", 25),
      mk("c2", "فلتر هواء", "قطع", 8.75, 9.9, "فلتر هواء — قطعة أصلية.", "🌀", 20),
      mk("c3", "مساحات أمامية", "قطع", 7.5, null, "زوج مساحات — مقاسات مختلفة.", "🚗", 18),
      mk("c4", "بطارية ٧٠ أمبير", "بطاريات", 68, 75, "بطارية — ضمان سنة.", "🔋", 6),
      mk("c5", "زيت محرك ٥-٣٠", "زيوت", 18.5, null, "زيت تخليقي — ٤ لتر.", "🛢️", 14)
    ],
    "كهربائات": [
      mk("e1", "لمبة ليد", "إنارة", 1.25, 1.75, "لمبة ليد موفرة — ٩ واط.", "💡", 80),
      mk("e2", "فيشة مزدوجة", "تجهيزات", 2.5, null, "فيشة كهربائية مزدوجة.", "🔌", 40),
      mk("e3", "سلك كهربائي", "أسلاك", 0.95, null, "سلك نحاسي — للمتر.", "🧵", 200),
      mk("e4", "قاطع كهربائي", "تجهيزات", 3.75, null, "قاطع تيار — ٢٥ أمبير.", "⚡", 30),
      mk("e5", "مفتاح إضاءة", "تجهيزات", 1.95, null, "مفتاح أحادي — أبيض.", "🔘", 45)
    ],
    "مواد بناء": [
      mk("bd1", "إسمنت", "مواد أساسية", 4.25, 4.75, "إسمنت مقاوم — كيس ٥٠ كغ.", "🏗️", 100),
      mk("bd2", "حديد تسليح", "مواد أساسية", 780, null, "طوبة حديد ١٢ مم — للطوبة.", "🏗️", 50),
      mk("bd3", "رمل", "مواد أساسية", 18, null, "رمل أحمر — للمتر المكعب.", "🏖️", 30),
      mk("bd4", "بلوك", "مواد أساسية", 0.65, null, "بلوك إسمنتي ٢٠×٢٠×٤٠.", "🧱", 500),
      mk("bd5", "غراء بلاط", "مواد أساسية", 6.5, 7.25, "غراء بلاط — كيس ٢٠ كغ.", "🪣", 40)
    ],
    "أدوات صحية": [
      mk("s1", "خلاط مطبخ", "تجهيزات", 22.5, 27, "خلاط ٥٠٠ واط — ضمان سنة.", "🚿", 12),
      mk("s2", "خرطوم مرن", "تجهيزات", 3.5, null, "خرطوم مياه — ٢ متر.", "💧", 30),
      mk("s3", "سيفون مغسلة", "تجهيزات", 6.75, null, "سيفون بلاستيك متين.", "🪠", 25),
      mk("s4", "دش داف", "تجهيزات", 4.5, 5.5, "دش كروم متحرك.", "🚿", 20),
      mk("s5", "شطاف صحي", "تجهيزات", 8.5, null, "شطاف صحي — تشطيب كروم.", "🚽", 15)
    ],
    "ملابس وأحذية": [
      mk("cl1", "تيشيرت قطن", "ملابس رجالية", 6.5, 8.25, "تيشيرت قطن — مقاسات متنوعة.", "👕", 30),
      mk("cl2", "بنطلون جينز", "ملابس رجالية", 14.5, null, "جينز — مقاسات متنوعة.", "👖", 20),
      mk("cl3", "حجاب شيفون", "ملابس نسائية", 3.95, null, "شيفون — ألوان متعددة.", "🧕", 35),
      mk("cl4", "حذاء رياضي", "أحذية", 18, 22.5, "حذاء رياضي — مقاسات ٤٠–٤٥.", "👟", 15),
      mk("cl5", "جاكيت شتوي", "ملابس رجالية", 24.5, null, "جاكيت مبطن — مقاسات متنوعة.", "🧥", 10)
    ],
    "موبايلات وإلكترونيات": [
      mk("mo1", "شاحن سريع", "ملحقات", 7.5, 9.5, "شاحن ٣٣ واط — مع كيبل.", "🔌", 25),
      mk("mo2", "كفر موبايل", "ملحقات", 3.5, null, "كفر واقٍ — أشهر الموديلات.", "📱", 40),
      mk("mo3", "سماعة بلوتوث", "ملحقات", 12.5, 15.75, "سماعة لاسلكية — بطارية ٢٠ ساعة.", "🎧", 15),
      mk("mo4", "شريح ذاكرة ٦٤ غ", "ملحقات", 8.75, null, "كارت ذاكرة ٦٤ غيغا — فئة ١٠.", "💾", 20),
      mk("mo5", "باور بانك", "ملحقات", 14.5, null, "بطارية متنقلة ١٠٠٠٠ مللي أمبير.", "🔋", 12)
    ],
    "أثاث ومفروشات": [
      mk("fu1", "غسالة صحون بلاستيك", "مفروشات", 4.5, null, "طقم ٦ أشخاص.", "🍽️", 20),
      mk("fu2", "مفارش سرير", "مفروشات", 15.75, 18.5, "مفرش ٧ قطع — سرير مزدوج.", "🛏️", 12),
      mk("fu3", "ستارة مخمل", "مفروشات", 12.5, null, "ستارة — باب واحد.", "🪟", 18),
      mk("fu4", "وسادة نوم", "مفروشات", 6.5, null, "وسادة فايبر — حبة.", "🛋️", 25),
      mk("fu5", "كرسي طعام", "أثاث", 18, 21.5, "كرسي خشب متين.", "🪑", 8)
    ],
    "هدايا وتجميل": [
      mk("gf1", "عطر رجالي", "عطور", 16.5, 19.9, "عطر — عبوة ١٠٠ مل.", "🧴", 15),
      mk("gf2", "كريم مرطب", "تجميل", 5.75, null, "كريم جسم — ٢٥٠ مل.", "🧴", 25),
      mk("gf3", "طلاء أظافر", "تجميل", 2.25, null, "ألوان متعددة.", "💅", 40),
      mk("gf4", "هدية مغلفة", "هدايا", 9.5, null, "طقم هدايا مغلف.", "🎁", 12),
      mk("gf5", "شمعة معطرة", "هدايا", 4.25, null, "شمعة برائحة فاخرة.", "🕯️", 20)
    ],
    "قرطاسية وكتب": [
      mk("st1", "دفتر ١٠٠ ورقة", "قرطاسية", 1.25, null, "دفتر سطرين — تغليف صلب.", "📓", 60),
      mk("st2", "قلم جاف", "قرطاسية", 0.35, null, "قلم أزرق — حبة.", "🖊️", 200),
      mk("st3", "حقيبة مدرسية", "قرطاسية", 11.5, 13.75, "حقيبة ظهر — أشكال متنوعة.", "🎒", 15),
      mk("st4", "طباشير/أقلام تلوين", "قرطاسية", 3.5, null, "علبة ٢٤ لوناً.", "🖍️", 30),
      mk("st5", "ورق طباعة A4", "قرطاسية", 3.25, null, "رزمة ٥٠٠ ورقة — ٨٠ غ.", "📄", 25)
    ],
    "غير ذلك": [
      mk("o1", "منتج متنوع ١", "متنوع", 2.5, null, "عدّل اسمه وسعره من اللوحة — هذا نموذج بداية.", "🛍️", 20),
      mk("o2", "منتج متنوع ٢", "متنوع", 4.75, 5.9, "عدّل اسمه وسعره من اللوحة — هذا نموذج بداية.", "📦", 15),
      mk("o3", "منتج متنوع ٣", "متنوع", 1.95, null, "عدّل اسمه وسعره من اللوحة — هذا نموذج بداية.", "🏷️", 30),
      mk("o4", "منتج متنوع ٤", "متنوع", 7.25, null, "عدّل اسمه وسعره من اللوحة — هذا نموذج بداية.", "🎁", 10),
      mk("o5", "منتج متنوع ٥", "متنوع", 3.5, null, "عدّل اسمه وسعره من اللوحة — هذا نموذج بداية.", "🧺", 25)
    ]
  };
  function seedStoreProducts(storeId, cat) {
    try {
      if (storeId.startsWith("trial-")) {
        const seed2 = STARTERS[cat] || STARTERS["مواد تموينية"];
        localStorage.setItem(`matjar-v1-products-${storeId}`, JSON.stringify(seed2));
        localStorage.setItem(`matjar-v1-seeds-${storeId}`, JSON.stringify(seed2.map((s22) => s22.id)));
        localStorage.removeItem(`matjar-cart-${storeId}`);
        localStorage.removeItem(`matjar-orders-${storeId}`);
        localStorage.removeItem(`matjar-v1-favs-${storeId}`);
        return true;
      }
      const key = `matjar-v1-products-${storeId}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const ex = JSON.parse(raw || "[]");
        const junk = Array.isArray(ex) && ex.length === SAMPLE.length && ex.every((x2) => SAMPLE_IDS.has(x2.id));
        if (!junk && ex.length) return false;
      }
      const seed = STARTERS[cat] || STARTERS["مواد تموينية"];
      localStorage.setItem(key, JSON.stringify(seed));
      localStorage.setItem(`matjar-v1-seeds-${storeId}`, JSON.stringify(seed.map((s3) => s3.id)));
      return true;
    } catch (e3) {
      return false;
    }
  }
  var SEENKEY = () => `matjar-v1-seeds-${curStore()}`;
  function mergeSeeds(products) {
    let seen = [];
    try {
      seen = JSON.parse(localStorage.getItem(SEENKEY()) || "[]");
    } catch (e3) {
    }
    const add = STARTER.filter((s3) => !seen.includes(s3.id) && !products.some((p3) => p3.id === s3.id));
    if (add.length) {
      seen = [...seen, ...add.map((a3) => a3.id)];
      try {
        localStorage.setItem(SEENKEY(), JSON.stringify(seen));
      } catch (e3) {
      }
      return { list: [...products, ...add], added: add.length };
    }
    return { list: products, added: 0 };
  }
  function loadProducts() {
    try {
      const raw = localStorage.getItem(PKEY());
      if (raw) return JSON.parse(raw);
    } catch (e3) {
    }
    saveProducts(SAMPLE);
    return SAMPLE;
  }
  function saveProducts(p3) {
    try {
      localStorage.setItem(PKEY(), JSON.stringify(p3));
    } catch (e3) {
    }
  }
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CKEY()) || "[]");
    } catch (e3) {
      return [];
    }
  }
  function saveCart(c3) {
    try {
      localStorage.setItem(CKEY(), JSON.stringify(c3));
    } catch (e3) {
    }
  }
  function loadOrders() {
    try {
      return JSON.parse(localStorage.getItem(OKEY()) || "[]");
    } catch (e3) {
      return [];
    }
  }
  var FKEY = () => `matjar-v1-favs-${curStore()}`;
  function loadFavs() {
    try {
      return JSON.parse(localStorage.getItem(FKEY()) || "[]");
    } catch (e3) {
      return [];
    }
  }
  function saveFavs(f4) {
    try {
      localStorage.setItem(FKEY(), JSON.stringify(f4));
    } catch (e3) {
    }
  }
  var FEEKEY = () => `matjar-v1-fee-${curStore()}`;
  function loadFee() {
    try {
      return Number(localStorage.getItem(FEEKEY())) || 0;
    } catch (e3) {
      return 0;
    }
  }
  function saveFee(n2) {
    try {
      localStorage.setItem(FEEKEY(), String(n2));
    } catch (e3) {
    }
  }
  function saveOrders(o3) {
    try {
      localStorage.setItem(OKEY(), JSON.stringify(o3));
    } catch (e3) {
    }
  }
  var fmt = (n2) => Number(n2 || 0).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1") + " د.أ";
  var discountPct = (p3) => p3.oldPrice && p3.oldPrice > p3.price ? Math.round((1 - p3.price / p3.oldPrice) * 100) : 0;
  var backStack = [];
  var backWired = false;
  function wireBackStep() {
    if (backWired || typeof window === "undefined") return;
    backWired = true;
    let wired = "لا";
    try {
      window.history.pushState({ g: 1 }, "");
      wired = "أيه";
    } catch (err) {
      wired = "معلق: " + String(err && err.message || err).slice(0, 80);
    }
    try {
      window.sessionStorage.setItem("bk-wired", wired);
      window.dispatchEvent(new Event("bk-diag"));
    } catch {
    }
    window.addEventListener("popstate", (e3) => {
      try {
        const d3 = { t: (/* @__PURE__ */ new Date()).toLocaleTimeString(), depth: window.history.length, layers: backStack.length };
        window.sessionStorage.setItem("bk-diag", JSON.stringify(d3));
        window.dispatchEvent(new Event("bk-diag"));
      } catch {
      }
      const top = backStack.pop();
      if (top) top.close();
      try {
        window.history.pushState({ g: 1 }, "");
      } catch {
      }
    });
    window.addEventListener("keydown", (e3) => {
      if (e3.key === "Escape" && backStack.length) {
        try {
          window.sessionStorage.setItem("bk-esc", String(window.history.length));
        } catch {
        }
        const top = backStack.pop();
        if (top) top.close();
      }
    });
  }
  function registerBack(id, close) {
    unregisterBack(id);
    backStack.push({ id, close });
  }
  function unregisterBack(id) {
    const i4 = backStack.findIndex((x2) => x2.id === id);
    if (i4 >= 0) backStack.splice(i4, 1);
  }

  // ../../../compiler-tools/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f3 = 0;
  var i3 = Array.isArray;
  function u3(e3, t3, n2, o3, i4, u4) {
    t3 || (t3 = {});
    var a3, c3, p3 = t3;
    if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
    var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
    if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
    return l.vnode && l.vnode(l3), l3;
  }

  // src/components/Home.tsx
  function Offers({ offers, onOpen }) {
    const [pos, setPos] = d2({ cur: 0, prev: -1 });
    const [paused, setPaused] = d2(false);
    const [touchX, setTouchX] = d2(null);
    const n2 = offers.length;
    const go = (next) => setPos((s3) => next === s3.cur ? s3 : { cur: next, prev: s3.cur });
    y2(() => {
      if (n2 < 2 || paused) return;
      const t3 = setInterval(() => setPos((s3) => ({ cur: (s3.cur + 1) % n2, prev: s3.cur })), 3800);
      return () => clearInterval(t3);
    }, [n2, paused]);
    if (n2 === 0) return null;
    const i4 = pos.cur;
    const prev = pos.prev;
    const cur = offers[i4];
    return /* @__PURE__ */ u3("div", { class: "offers", children: [
      /* @__PURE__ */ u3("div", { class: "offers-head", children: [
        /* @__PURE__ */ u3("span", { class: "offers-chip", children: "🔥 عروض اليوم" }),
        /* @__PURE__ */ u3("span", { class: "offers-hint", children: "تتغير لحالها — اسحب لتشوف" })
      ] }),
      /* @__PURE__ */ u3(
        "div",
        {
          class: "offers-stage",
          onTouchStart: (e3) => {
            setTouchX(e3.touches[0].clientX);
            setPaused(true);
          },
          onTouchEnd: (e3) => {
            if (touchX !== null) {
              const dx = e3.changedTouches[0].clientX - touchX;
              if (dx > 45) go((i4 - 1 + n2) % n2);
              else if (dx < -45) go((i4 + 1) % n2);
            }
            setTouchX(null);
            setTimeout(() => setPaused(false), 3500);
          },
          children: [
            offers.map((p3, idx) => /* @__PURE__ */ u3(
              "div",
              {
                class: "offer-slide" + (idx === i4 ? " on" : idx === prev ? " out" : ""),
                onClick: () => onOpen(p3),
                children: [
                  /* @__PURE__ */ u3("span", { class: "offer-disc", children: [
                    "خصم ",
                    discountPct(p3),
                    "٪"
                  ] }),
                  /* @__PURE__ */ u3("span", { class: "offer-img", children: p3.photo ? /* @__PURE__ */ u3("img", { class: "pimg offer-pimg", src: p3.photo, alt: p3.name }) : p3.img }),
                  /* @__PURE__ */ u3("div", { class: "offer-info", children: [
                    /* @__PURE__ */ u3("div", { class: "offer-name", children: p3.name }),
                    /* @__PURE__ */ u3("div", { class: "offer-prices", children: [
                      /* @__PURE__ */ u3("span", { class: "offer-price", children: fmt(p3.price) }),
                      /* @__PURE__ */ u3("span", { class: "offer-old", children: fmt(p3.oldPrice) })
                    ] }),
                    /* @__PURE__ */ u3("div", { class: "offer-cta", children: "اضغط للتفاصيل" })
                  ] })
                ]
              },
              p3.id + "-" + idx
            )),
            /* @__PURE__ */ u3("div", { class: "offers-dots", children: offers.map((_2, idx) => /* @__PURE__ */ u3("span", { class: "dot" + (idx === i4 ? " on" : ""), onClick: (e3) => {
              e3.stopPropagation();
              go(idx);
            } })) })
          ]
        }
      )
    ] });
  }
  function Home({ products, favs, toggleFav, onOpen, notify }) {
    const [q2, setQ] = d2("");
    const [cat, setCat] = d2("الكل");
    const [sort, setSort] = d2("new");
    const [shownN, setShownN] = d2(24);
    y2(() => {
      setShownN(24);
    }, [q2, cat, sort]);
    const [banner, setBanner] = d2("");
    y2(() => {
      window.vellum.fetch("/v1/x/matjar-settings?key=banner").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((v3) => {
        if (v3.value === null) setBanner("");
        else if (v3.value) setBanner(v3.value);
      }).catch(() => {
      });
    }, []);
    const [storePhone, setStorePhone] = d2("");
    const [hasDelivery, setHasDelivery] = d2(null);
    y2(() => {
      window.vellum.fetch("/v1/x/matjar-phone").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((v3) => setStorePhone(v3.phone || "")).catch(() => {
      });
      window.vellum.fetch("/v1/x/matjar-settings?key=delivery").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((v3) => setHasDelivery(v3.value === "لا" ? "لا" : "نعم")).catch(() => setHasDelivery("نعم"));
    }, []);
    const copyPhone = () => {
      if (!storePhone) {
        notify("ما انحفظ رقم الدكان بعد — صاحب الدكان يدخله من لوحة المتجر");
        return;
      }
      try {
        navigator.clipboard?.writeText(storePhone);
      } catch (e3) {
      }
      notify("نُسخ الرقم ✓ — اطلب عليه مباشرة");
    };
    let offers = products.filter((p3) => p3.oldPrice && p3.oldPrice > p3.price && p3.qty > 0);
    if (offers.length === 1) offers = Array.from({ length: 7 }, () => offers[0]);
    else if (offers.length > 1 && offers.length < 7) {
      const base = offers.slice();
      offers = Array.from({ length: 7 }, (_2, k3) => base[k3 % base.length]);
    }
    const norm = (s3) => (s3 || "").replace(/\s+/g, " ").trim();
    const cats = [
      "الكل",
      ...favs.length ? ["❤️ المفضلة"] : [],
      ...Array.from(new Set(products.map((p3) => norm(p3.cat))))
    ];
    let list = products.filter((p3) => {
      const c3 = norm(p3.cat);
      if (cat === "❤️ المفضلة" && !favs.includes(p3.id)) return false;
      if (cat !== "الكل" && cat !== "❤️ المفضلة" && c3 !== cat) return false;
      const t3 = q2.trim();
      if (t3 && !p3.name.includes(t3) && !(p3.desc || "").includes(t3)) return false;
      return true;
    });
    if (sort === "asc") list = [...list].sort((a3, b) => a3.price - b.price);
    if (sort === "desc") list = [...list].sort((a3, b) => b.price - a3.price);
    const shown = shownN <= 0 ? 24 : shownN;
    const visible = list.slice(0, shown);
    const more = list.length - visible.length;
    return /* @__PURE__ */ u3("div", { class: "home", children: [
      banner ? /* @__PURE__ */ u3("img", { class: "wajeha", src: banner, alt: "" }) : /* @__PURE__ */ u3("div", { class: "wajeha-live", children: [
        /* @__PURE__ */ u3("div", { class: "wajeha-phrase", children: storePhrase((() => {
          try {
            return localStorage.getItem("matjar-multi-cat") || "";
          } catch (e3) {
            return "";
          }
        })()) || STORE_NAME }),
        /* @__PURE__ */ u3("button", { class: "wajeha-phone", onPointerDown: (e3) => {
          e3.stopPropagation();
          e3.preventDefault();
          copyPhone();
        }, children: [
          "📞 ",
          storePhone || "07xxxxxxxx",
          " — اضغط لنسخ الرقم"
        ] })
      ] }),
      hasDelivery !== null && /* @__PURE__ */ u3("div", { class: "deliv-badge" + (hasDelivery === "نعم" ? " yes" : " no"), children: hasDelivery === "نعم" ? "🚚 يوجد خدمة توصيل — اطلب ويوصلك للعنوان" : "🏪 لا يوجد خدمة توصيل — الاستلام من الدكان" }),
      /* @__PURE__ */ u3("div", { class: "search-wrap", children: /* @__PURE__ */ u3(
        "input",
        {
          class: "search",
          type: "search",
          placeholder: "دوّر على منتج…",
          value: q2,
          onInput: (e3) => setQ(e3.target.value)
        }
      ) }),
      /* @__PURE__ */ u3(Offers, { offers, onOpen }),
      /* @__PURE__ */ u3("div", { class: "chips", children: cats.map((c3) => /* @__PURE__ */ u3("button", { class: "chip" + (cat === c3 ? " on" : ""), onClick: () => setCat(c3), children: c3 })) }),
      /* @__PURE__ */ u3("div", { class: "sort-row", children: [
        /* @__PURE__ */ u3("span", { class: "count", children: [
          list.length,
          " منتج"
        ] }),
        /* @__PURE__ */ u3("select", { class: "sort", value: sort, onChange: (e3) => setSort(e3.target.value), children: [
          /* @__PURE__ */ u3("option", { value: "new", children: "الأحدث أولاً" }),
          /* @__PURE__ */ u3("option", { value: "asc", children: "السعر: من الأرخص" }),
          /* @__PURE__ */ u3("option", { value: "desc", children: "السعر: من الأغلى" })
        ] })
      ] }),
      list.length === 0 ? /* @__PURE__ */ u3("div", { class: "empty", children: cat === "❤️ المفضلة" ? "ما في مفضلات بعد — اضغط القلب ♥ على أي منتج يعجبك" : "ما في منتجات مطابقة — جرّب تصنيف ثاني أو غيّر البحث" }) : /* @__PURE__ */ u3("div", { class: "grid", children: visible.map((p3) => /* @__PURE__ */ u3("div", { class: "card" + (p3.qty <= 0 ? " soldout" : ""), onClick: () => onOpen(p3), children: [
        /* @__PURE__ */ u3(
          "button",
          {
            class: "heart" + (favs.includes(p3.id) ? " on" : ""),
            onClick: (e3) => {
              e3.stopPropagation();
              toggleFav(p3.id);
            },
            children: "♥"
          }
        ),
        p3.qty <= 0 ? /* @__PURE__ */ u3("span", { class: "card-badge off", children: "غير متوفر" }) : p3.oldPrice && p3.oldPrice > p3.price ? /* @__PURE__ */ u3("span", { class: "card-badge", children: "عرض" }) : null,
        /* @__PURE__ */ u3("div", { class: "card-img", children: p3.photo ? /* @__PURE__ */ u3("img", { class: "pimg", src: p3.photo, alt: p3.name }) : p3.img }),
        /* @__PURE__ */ u3("div", { class: "card-name", children: p3.name }),
        p3.qty > 0 ? /* @__PURE__ */ u3("div", { class: "card-prices", children: [
          /* @__PURE__ */ u3("span", { class: "card-price", children: fmt(p3.price) }),
          p3.oldPrice && p3.oldPrice > p3.price && /* @__PURE__ */ u3("span", { class: "card-old", children: fmt(p3.oldPrice) })
        ] }) : /* @__PURE__ */ u3("div", { class: "card-na", children: "نفدت الكمية حالياً" })
      ] }, p3.id)) }),
      more > 0 && /* @__PURE__ */ u3("div", { class: "more-wrap", children: /* @__PURE__ */ u3("button", { class: "btn-ghost", onClick: () => setShownN(shownN + 24), children: [
        "شوف المزيد — باقي ",
        more,
        " منتج ⬇"
      ] }) }),
      /* @__PURE__ */ u3("div", { class: "foot", children: "أسعارنا بالدينار الأردني — التوصيل حسب الاتفاق مع المكتب" })
    ] });
  }

  // src/components/MapPicker.tsx
  var TILE = 256;
  var clampLat = (la) => Math.max(-85, Math.min(85, la));
  var lngToPx = (lng, z3) => (lng + 180) / 360 * TILE * Math.pow(2, z3);
  var latToPx = (lat, z3) => {
    const s3 = Math.sin(lat * Math.PI / 180);
    return (0.5 - Math.log((1 + s3) / (1 - s3)) / (4 * Math.PI)) * TILE * Math.pow(2, z3);
  };
  var pxToLng = (x2, z3) => x2 / (TILE * Math.pow(2, z3)) * 360 - 180;
  var pxToLat = (y3, z3) => {
    const n2 = Math.PI - 2 * Math.PI * y3 / (TILE * Math.pow(2, z3));
    return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n2) - Math.exp(-n2)));
  };
  var tileCache = /* @__PURE__ */ new Map();
  function Tile({ z: z3, x: x2, y: y3, style, onDead }) {
    const [mode, setMode] = d2(0);
    const [b64, setB64] = d2("");
    y2(() => {
      if (mode !== 1) return;
      const k3 = `${style}/${z3}/${x2}/${y3}`;
      if (tileCache.has(k3)) {
        setB64(tileCache.get(k3));
        return;
      }
      let alive = true;
      window.vellum.fetch(`/v1/x/matjar-tiles?z=${z3}&x=${x2}&y=${y3}&s=${style}&fmt=b64`).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((j3) => {
        const u4 = "data:image/jpeg;base64," + j3.b64;
        if (tileCache.size > 400) {
          for (const k22 of Array.from(tileCache.keys()).slice(0, 150)) tileCache.delete(k22);
        }
        tileCache.set(k3, u4);
        if (alive) setB64(u4);
      }).catch(() => {
        if (alive) setMode(2);
      });
      return () => {
        alive = false;
      };
    }, [mode, z3, x2, y3, style]);
    y2(() => {
      if (mode === 3) onDead?.();
    }, [mode]);
    if (mode === 3) return null;
    if (mode === 1 && !b64) return null;
    const url = mode === 0 ? `/v1/x/matjar-tiles?z=${z3}&x=${x2}&y=${y3}&s=${style}` : mode === 1 ? b64 : `https://mt1.google.com/vt/lyrs=${style === "m" ? "m" : "y"}&hl=ar&x=${x2}&y=${y3}&z=${z3}&s=Galileo`;
    return /* @__PURE__ */ u3(
      "img",
      {
        src: url,
        onError: () => setMode(mode === 2 ? 3 : mode + 1),
        style: { position: "absolute", left: 0, top: 0, width: TILE, height: TILE },
        alt: "",
        draggable: false
      }
    );
  }
  function MapPicker({ lat, lng, onPick, zoom = 17, height = 210, interactive = true, recenter = 0 }) {
    const [z3, setZ] = d2(zoom);
    const [style, setStyle] = d2("g");
    const [dead, setDead] = d2(0);
    const [w3, setW] = d2(0);
    const [view, setView] = d2({ lat, lng });
    y2(() => {
      setView({ lat, lng });
    }, [lat, lng]);
    y2(() => {
      setView({ lat, lng });
    }, [recenter]);
    const [dragOn, setDragOn] = d2(false);
    const moved = A2(false);
    const ref = A2(null);
    const drag = A2(null);
    const ptrs = A2(/* @__PURE__ */ new Map());
    const pinch = A2(null);
    const tap = A2(null);
    const dbl = A2(null);
    y2(() => {
      setW(ref.current?.offsetWidth || 360);
    }, []);
    const cx = lngToPx(view.lng, z3);
    const cy = latToPx(view.lat, z3);
    const x0 = cx - w3 / 2;
    const y0 = cy - height / 2;
    const tx0 = Math.floor(x0 / TILE);
    const tx1 = Math.floor((x0 + w3) / TILE);
    const ty0 = Math.floor(y0 / TILE);
    const ty1 = Math.floor((y0 + height) / TILE);
    const n2 = Math.pow(2, z3);
    const tiles = [];
    for (let ty = ty0; ty <= ty1; ty++) {
      if (ty < 0 || ty >= n2) continue;
      for (let tx = tx0; tx <= tx1; tx++) {
        const wx = (tx % n2 + n2) % n2;
        tiles.push(
          /* @__PURE__ */ u3("div", { style: { position: "absolute", left: tx * TILE - x0, top: ty * TILE - y0, width: TILE, height: TILE }, children: /* @__PURE__ */ u3(Tile, { z: z3, x: wx, y: ty, style, onDead: () => setDead((d3) => d3 + 1) }) }, tx + "_" + ty)
        );
      }
    }
    const down = (e3) => {
      if (!interactive) return;
      e3.preventDefault();
      ref.current?.setPointerCapture?.(e3.pointerId);
      ptrs.current.set(e3.pointerId, { x: e3.clientX, y: e3.clientY });
      if (ptrs.current.size === 2) {
        const [a3, b] = Array.from(ptrs.current.values());
        pinch.current = { d0: Math.hypot(a3.x - b.x, a3.y - b.y) || 1, z0: z3 };
        drag.current = null;
        return;
      }
      drag.current = { x: e3.clientX, y: e3.clientY, lat: view.lat, lng: view.lng };
      moved.current = false;
      setDragOn(true);
      tap.current = { at: Date.now(), x: e3.clientX, y: e3.clientY };
    };
    const move = (e3) => {
      const d3 = drag.current;
      if (ptrs.current.has(e3.pointerId)) ptrs.current.set(e3.pointerId, { x: e3.clientX, y: e3.clientY });
      if (pinch.current && ptrs.current.size >= 2) {
        const [a3, b] = Array.from(ptrs.current.values());
        const ratio = Math.hypot(a3.x - b.x, a3.y - b.y) / pinch.current.d0;
        const nz = Math.max(3, Math.min(19, Math.round(pinch.current.z0 + Math.log2(ratio))));
        if (nz !== z3) setZ(nz);
        return;
      }
      if (!d3) return;
      const nx = lngToPx(d3.lng, z3) - (e3.clientX - d3.x);
      const ny = latToPx(d3.lat, z3) - (e3.clientY - d3.y);
      if (Math.abs(e3.clientX - d3.x) > 12 || Math.abs(e3.clientY - d3.y) > 12) moved.current = true;
      setView({ lat: clampLat(pxToLat(ny, z3)), lng: pxToLng(nx, z3) });
    };
    const up = (e3) => {
      const t3 = tap.current;
      const isTap = t3 && Math.abs(e3.clientX - t3.x) < 12 && Math.abs(e3.clientY - t3.y) < 12 && Date.now() - t3.at < 350;
      if (isTap) {
        if (dbl.current && Date.now() - dbl.current < 400) {
          setZ((zz) => Math.min(19, zz + 1));
          dbl.current = null;
          tap.current = null;
        } else dbl.current = Date.now();
      }
      ptrs.current.delete(e3.pointerId);
      if (ptrs.current.size < 2) pinch.current = null;
      if (ptrs.current.size < 1) {
        drag.current = null;
        setDragOn(false);
        const r3 = ref.current?.getBoundingClientRect?.();
        if (isTap && onPick && r3) {
          const nx = lngToPx(view.lng, z3) - (r3.left + r3.width / 2 - e3.clientX);
          const ny = latToPx(view.lat, z3) - (r3.top + r3.height / 2 - e3.clientY);
          const nlat = clampLat(pxToLat(ny, z3)), nlng = pxToLng(nx, z3);
          setView({ lat: nlat, lng: nlng });
          onPick(nlat, nlng);
        }
      }
    };
    const underRef = A2([]);
    const under = underRef.current;
    underRef.current = tiles;
    const pinDx = lngToPx(lng, z3) - cx;
    const pinDy = latToPx(lat, z3) - cy;
    return /* @__PURE__ */ u3(k, { children: [
      /* @__PURE__ */ u3(
        "div",
        {
          class: "map-wrap" + (onPick ? " pickable" : "") + (dragOn ? " dragging" : ""),
          style: { height: height + "px" },
          ref,
          onPointerDown: down,
          onPointerMove: move,
          onPointerUp: up,
          onPointerCancel: up,
          children: [
            /* @__PURE__ */ u3("div", { style: { position: "absolute", inset: 0 }, children: under }),
            tiles,
            tiles.length > 0 && dead >= tiles.length && /* @__PURE__ */ u3("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 10, background: "rgba(238,227,208,.92)", color: "#2b2015", fontSize: 12, textAlign: "center" }, children: "ما نزلت بلاطات الخارطة — جرب حدّث الصفحة، وإذا تكررت احكِ لي" }),
            /* @__PURE__ */ u3("div", { class: "map-pin", style: { left: `calc(50% + ${pinDx}px)`, top: `calc(50% + ${pinDy}px)` }, children: /* @__PURE__ */ u3("div", { class: "map-pin-dot" }) }),
            interactive && /* @__PURE__ */ u3("button", { class: "map-style-btn", onPointerDown: (e3) => {
              e3.stopPropagation();
              e3.preventDefault();
              setStyle((s3) => s3 === "g" ? "m" : "g");
            }, children: style === "g" ? "🛰️ قمر صناعي" : "🗺️ شوارع" }),
            /* @__PURE__ */ u3("span", { class: "map-attr", children: "© Google" })
          ]
        }
      ),
      tiles.length > 0 && dead >= tiles.length && /* @__PURE__ */ u3("div", { style: { margin: "4px 0", padding: "8px 10px", background: "#f6e3d4", color: "#7a3b12", borderRadius: 10, fontSize: 12, textAlign: "center" }, children: "⚠️ صور الخارطة ما نزلت — جرب حدّث الصفحة، وإذا تكررت احكِ لي" })
    ] });
  }

  // src/components/CartView.tsx
  function CartView({ products, cart, setCart, orders, setOrders, notify, deliveryFee, onHome }) {
    const [confirming, setConfirming] = d2(false);
    const [name, setName] = d2("");
    const [phone, setPhone] = d2("");
    const [err, setErr] = d2("");
    y2(() => {
      if (!err) return;
      const el = document.querySelector(".fld-err");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [err]);
    const confirmRef = A2(null);
    y2(() => {
      if (!confirming) return;
      if (confirmRef.current) confirmRef.current.scrollTop = 0;
      try {
        window.scrollTo(0, 0);
      } catch {
      }
    }, [confirming]);
    const [mode, setMode] = d2("توصيل");
    const [hasDelivery, setHasDelivery] = d2(true);
    y2(() => {
      window.vellum.fetch("/v1/x/matjar-settings?key=delivery").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((v3) => {
        if (v3.value === "لا") {
          setHasDelivery(false);
          setMode("استلام");
        }
      }).catch(() => {
      });
    }, []);
    const [address, setAddress] = d2("");
    const LOC_KEY = `matjar-v1-loc-${window.STORE_ID || "main"}`;
    const savedLoc = (() => {
      try {
        const s3 = localStorage.getItem(LOC_KEY);
        return s3 ? JSON.parse(s3) : null;
      } catch {
        return null;
      }
    })();
    const [loc, setLoc] = d2(savedLoc);
    const pickLoc = (la, ln) => {
      setLoc({ lat: la, lng: ln });
      try {
        localStorage.setItem(LOC_KEY, JSON.stringify({ lat: la, lng: ln }));
      } catch {
      }
    };
    const [notes, setNotes] = d2("");
    const [sending, setSending] = d2(false);
    const [done, setDone] = d2(null);
    const [myBal, setMyBal] = d2(null);
    const [payWith, setPayWith] = d2("كاش");
    y2(() => {
      if (!/^07\d{8}$/.test(phone)) {
        setMyBal(null);
        return;
      }
      let alive = true;
      window.vellum.fetch("/v1/x/matjar-wallet?phone=" + phone).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((j3) => {
        if (alive) setMyBal(j3.balance || 0);
      }).catch(() => {
        if (alive) setMyBal(null);
      });
      return () => {
        alive = false;
      };
    }, [phone]);
    const [recenter, setRecenter] = d2(0);
    const goMyLocation = () => {
      if (navigator.geolocation) {
        notify("جارٍ تحديد موقعك…");
        let settled = false;
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (settled) return;
            settled = true;
            pickLoc(pos.coords.latitude, pos.coords.longitude);
            setRecenter((n2) => n2 + 1);
            notify("نزل السهم على موقعك الحقيقي ✓");
          },
          () => {
            if (settled) return;
            settled = true;
            if (savedLoc) {
              setLoc({ ...savedLoc });
              setRecenter((n2) => n2 + 1);
              notify("ما منح الموقع — رجعنا السهم على موقعك المحفوظ ✓");
            } else notify("ما منح الموقع — المس مكان بيتك على الخارطة بالصبع");
          },
          { timeout: 6e3, maximumAge: 6e4 }
        );
        return;
      }
      if (savedLoc) {
        setLoc({ ...savedLoc });
        setRecenter((n2) => n2 + 1);
        notify("رجعنا السهم على موقعك المحفوظ ✓");
        return;
      }
      notify("المس مكان بيتك على الخارطة بالصبع — ينزل السهم على طول إصبعك");
    };
    const rows = cart.map((c3) => ({ ...c3, p: products.find((p3) => p3.id === c3.id) })).filter((r3) => r3.p);
    const total = rows.reduce((s3, r3) => s3 + r3.p.price * r3.qty, 0);
    const setQty = (id, qty) => {
      if (qty <= 0) setCart(cart.filter((c3) => c3.id !== id));
      else setCart(cart.map((c3) => c3.id === id ? { ...c3, qty } : c3));
    };
    const placeOrder = async () => {
      const fee = mode === "توصيل" ? deliveryFee : 0;
      if (payWith === "الرصيد" && (myBal === null || myBal < total + fee)) {
        setPayWith("كاش");
        notify("رصيدك ما بقى يكفي — الدفع كاش");
        return;
      }
      setErr("");
      const order = {
        id: "o" + Date.now(),
        items: rows.map((r3) => ({ id: r3.id, name: r3.p.name, qty: r3.qty, price: r3.p.price })),
        subtotal: total,
        fee,
        total: total + fee,
        at: (/* @__PURE__ */ new Date()).toLocaleString("ar-JO"),
        name: name.trim() || void 0,
        phone: phone || void 0,
        mode,
        address: address.trim() || void 0,
        notes: notes.trim() || void 0,
        lat: mode === "توصيل" && loc ? loc.lat : void 0,
        lng: mode === "توصيل" && loc ? loc.lng : void 0,
        pay: payWith
      };
      setSending(true);
      try {
        if (payWith === "الرصيد") {
          const wr = await window.vellum.fetch("/v1/x/matjar-wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, name, amount: total + fee, kind: "خصم", note: "دفع طلبية — " + order.id })
          });
          if (!wr.ok) throw "wallet";
        }
        const res = await window.vellum.fetch("/v1/x/matjar-orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order)
        });
        if (!res.ok) throw res.status;
        setOrders([order, ...orders]);
        setCart([]);
        setConfirming(false);
        setNotes("");
        notify("وصلت طلبية الدكان ✓ — منتواصل معك للتأكيد");
        setDone(order);
      } catch (e3) {
        notify("ما انرفع الطلب — تأكد من النت وجرّب مرة ثانية");
      }
      setSending(false);
    };
    const fld = (label, node) => /* @__PURE__ */ u3("label", { class: "fld", children: [
      /* @__PURE__ */ u3("span", { class: "fld-l", children: label }),
      node
    ] });
    return /* @__PURE__ */ u3("div", { class: "cart", children: [
      /* @__PURE__ */ u3("header", { class: "head", children: [
        /* @__PURE__ */ u3("div", { class: "head-title", children: "🛒 سلة المشتريات" }),
        /* @__PURE__ */ u3("div", { class: "head-sub", children: [
          rows.length,
          " صنف بالسلة"
        ] })
      ] }),
      done && rows.length === 0 ? /* @__PURE__ */ u3("div", { class: "order-done", children: [
        /* @__PURE__ */ u3("div", { class: "od-ico", children: "✅" }),
        /* @__PURE__ */ u3("h3", { children: "تم إرسال طلبك" }),
        /* @__PURE__ */ u3("p", { children: [
          "طلبيتك (",
          fmt(done.total),
          ") وصلت الدكان — منتواصل معك قريباً للتأكيد"
        ] }),
        /* @__PURE__ */ u3("div", { class: "od-btns", children: [
          /* @__PURE__ */ u3("button", { class: "btn-primary", onClick: () => {
            setDone(null);
            onHome && onHome();
          }, children: "🛍️ نعم، طلب آخر" }),
          /* @__PURE__ */ u3("button", { class: "btn-ghost", onClick: () => {
            setDone(null);
            onHome && onHome();
            notify("شكراً لكم — ننتظرك قريباً 🌹");
          }, children: "شكراً لكم 🌹" })
        ] })
      ] }) : rows.length === 0 ? /* @__PURE__ */ u3("div", { class: "empty", children: [
        "السلة فاضية — رجع للرئيسية واختر منتجاتك 🛍️",
        /* @__PURE__ */ u3("button", { class: "btn-ghost reorder", onClick: () => {
          setDone(null);
          onHome && onHome();
        }, children: "يرجى اختيار طلبك من الرئيسية" })
      ] }) : /* @__PURE__ */ u3(k, { children: [
        /* @__PURE__ */ u3("div", { class: "cart-list", children: rows.map((r3) => /* @__PURE__ */ u3("div", { class: "cart-row", children: [
          /* @__PURE__ */ u3("span", { class: "cart-img", children: r3.p.photo ? /* @__PURE__ */ u3("img", { class: "pimg cart-pimg", src: r3.p.photo, alt: "" }) : r3.p.img }),
          /* @__PURE__ */ u3("div", { class: "cart-mid", children: [
            /* @__PURE__ */ u3("div", { class: "cart-name", children: r3.p.name }),
            /* @__PURE__ */ u3("div", { class: "cart-unit", children: fmt(r3.p.price) }),
            /* @__PURE__ */ u3("button", { class: "cart-del", onClick: () => setQty(r3.id, 0), children: "إزالة" })
          ] }),
          /* @__PURE__ */ u3("div", { class: "cart-qty", children: [
            /* @__PURE__ */ u3("button", { class: "qty-btn sm", onClick: () => setQty(r3.id, r3.qty - 1), children: "−" }),
            /* @__PURE__ */ u3("span", { class: "qty-num", children: r3.qty }),
            /* @__PURE__ */ u3("button", { class: "qty-btn sm", onClick: () => setQty(r3.id, r3.qty + 1), children: "+" })
          ] }),
          /* @__PURE__ */ u3("div", { class: "cart-line", children: fmt(r3.p.price * r3.qty) })
        ] }, r3.id)) }),
        /* @__PURE__ */ u3("div", { class: "cart-foot", children: [
          /* @__PURE__ */ u3("div", { class: "cart-total", children: [
            /* @__PURE__ */ u3("span", { children: "المجموع" }),
            /* @__PURE__ */ u3("b", { children: fmt(total) })
          ] }),
          hasDelivery && deliveryFee > 0 && /* @__PURE__ */ u3("div", { class: "fee-note", children: [
            "التوصيل: ",
            fmt(deliveryFee),
            " — بيُضاف إذا اخترت توصيل للعنوان"
          ] }),
          /* @__PURE__ */ u3("button", { class: "btn-primary", onClick: () => setConfirming(true), children: "إتمام الطلبية" })
        ] })
      ] }),
      confirming && /* @__PURE__ */ u3("div", { class: "sheet-backdrop", onClick: () => setConfirming(false), children: /* @__PURE__ */ u3("div", { class: "confirm", ref: confirmRef, onClick: (e3) => e3.stopPropagation(), children: [
        /* @__PURE__ */ u3("h3", { children: "طلبية جديدة" }),
        hasDelivery && /* @__PURE__ */ u3("div", { class: "mode-row", children: [
          /* @__PURE__ */ u3("button", { class: "mode-btn" + (mode === "توصيل" ? " on" : ""), onClick: () => setMode("توصيل"), children: "🚚 توصيل للعنوان" }),
          /* @__PURE__ */ u3("button", { class: "mode-btn" + (mode === "استلام" ? " on" : ""), onClick: () => setMode("استلام"), children: "🏪 استلام من الدكان" })
        ] }),
        !hasDelivery && /* @__PURE__ */ u3("div", { class: "fee-note", children: "🏪 هذا المتجر بدون خدمة توصيل — طلبيتك جاهزة للاستلام من الدكان" }),
        mode === "توصيل" && hasDelivery && /* @__PURE__ */ u3(k, { children: [
          /* @__PURE__ */ u3("div", { class: "fld", style: { marginBottom: 10 }, children: [
            /* @__PURE__ */ u3("span", { class: "fld-l", children: "📍 يرجى اختيار موقعك — المس مكان بيتك على الخارطة فينزل السهم عليه" }),
            /* @__PURE__ */ u3(
              MapPicker,
              {
                lat: loc ? loc.lat : 31.9539,
                lng: loc ? loc.lng : 35.9106,
                onPick: pickLoc,
                recenter
              }
            ),
            /* @__PURE__ */ u3("button", { class: "btn-ghost sm loc-btn", onPointerDown: (e3) => {
              e3.stopPropagation();
              e3.preventDefault();
              goMyLocation();
            }, children: "📍 تحديد موقعك" })
          ] }),
          !loc && fld("أو اكتب عنوانك — الحي والشارع وأقرب علامة", /* @__PURE__ */ u3("input", { value: address, onInput: (e3) => setAddress(e3.target.value), placeholder: "مثال: دينا — قرب الجامع" }))
        ] }),
        fld("ملاحظات (اختياري)", /* @__PURE__ */ u3("textarea", { value: notes, onInput: (e3) => setNotes(e3.target.value), rows: 2, placeholder: "ادخل ملاحظتك" })),
        fld("الاسم (اختياري)", /* @__PURE__ */ u3("input", { value: name, onInput: (e3) => setName(e3.target.value), placeholder: "اسمك الكريم" })),
        fld("رقم الموبايل (اختياري — ١٠ أرقام تبدأ بـ07)", /* @__PURE__ */ u3("input", { type: "tel", inputmode: "numeric", value: phone, maxLength: 10, onInput: (e3) => setPhone(e3.target.value.replace(/\D/g, "")), placeholder: "0790000000" })),
        /* @__PURE__ */ u3("div", { class: "co-totals", children: [
          /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { children: "الأغراض" }),
            /* @__PURE__ */ u3("b", { children: fmt(total) })
          ] }),
          mode === "توصيل" && hasDelivery && deliveryFee > 0 && /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { children: "التوصيل" }),
            /* @__PURE__ */ u3("b", { children: fmt(deliveryFee) })
          ] }),
          /* @__PURE__ */ u3("div", { class: "co-grand", children: [
            /* @__PURE__ */ u3("span", { children: "الإجمالي" }),
            /* @__PURE__ */ u3("b", { children: fmt(total + (mode === "توصيل" && hasDelivery ? deliveryFee : 0)) })
          ] })
        ] }),
        myBal !== null && myBal > 0 && (mode === "استلام" || deliveryFee >= 0) && /* @__PURE__ */ u3("div", { class: "pay-pick", children: [
          /* @__PURE__ */ u3("button", { type: "button", class: "pay-opt" + (payWith === "كاش" ? " on" : ""), onClick: () => setPayWith("كاش"), children: "💵 كاش عند الاستلام" }),
          myBal >= total + (mode === "توصيل" ? deliveryFee : 0) ? /* @__PURE__ */ u3("button", { type: "button", class: "pay-opt" + (payWith === "الرصيد" ? " on" : ""), onClick: () => setPayWith("الرصيد"), children: [
            "💳 دفع من رصيدي (",
            fmt(myBal),
            " د.أ)"
          ] }) : /* @__PURE__ */ u3("span", { class: "pay-note", children: [
            "رصيدك ",
            fmt(myBal),
            " د.أ — لا يكفي لهذه الطلبية"
          ] })
        ] }),
        /* @__PURE__ */ u3("div", { class: "confirm-btns", children: [
          /* @__PURE__ */ u3("button", { class: "btn-ghost", onClick: () => setConfirming(false), children: "رجوع" }),
          /* @__PURE__ */ u3("button", { class: "btn-primary", disabled: sending, onClick: placeOrder, children: sending ? "جارٍ الإرسال…" : "أرسل الطلبية ✓" })
        ] })
      ] }) })
    ] });
  }

  // src/components/Admin.tsx
  var import_qrcode = __toESM(require_browser());

  // src/components/PinGate.tsx
  function PinGate({ title, sub, notify, onUnlock, onClose }) {
    const [pinInput, setPinInput] = d2("");
    const [recover, setRecover] = d2(false);
    const [phoneInput, setPhoneInput] = d2("");
    const tryPin = () => {
      window.vellum.fetch("/v1/x/matjar-pin-check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin: pinInput.trim() }) }).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((v3) => {
        if (v3.ok) {
          onUnlock();
          notify("أهلاً بك 👋");
        } else notify("الرمز غلط — جرّب مرة ثانية");
      }).catch(() => notify("ما نجح التحقق — تأكد من النت"));
    };
    const recoverPin = () => {
      window.vellum.fetch("/v1/x/matjar-pin?phone=" + encodeURIComponent(phoneInput)).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((v3) => {
        notify("رمز الدخول: " + v3.pin);
        setRecover(false);
        setPinInput(v3.pin);
      }).catch(() => notify("الرقم ما هو رقم المحل — تأكد منه"));
    };
    return /* @__PURE__ */ u3("div", { class: "staff-page", children: [
      /* @__PURE__ */ u3("header", { class: "staff-head", children: [
        /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("div", { class: "staff-title", children: title }),
          /* @__PURE__ */ u3("div", { class: "staff-sub", children: sub })
        ] }),
        onClose && /* @__PURE__ */ u3("button", { class: "btn-ghost sm", onClick: onClose, children: "✕ رجوع" })
      ] }),
      /* @__PURE__ */ u3("div", { class: "pin-box", children: [
        /* @__PURE__ */ u3(
          "input",
          {
            class: "pin-input",
            type: "text",
            autoCapitalize: "off",
            autoComplete: "off",
            spellCheck: false,
            maxLength: 20,
            placeholder: "••••",
            value: pinInput,
            onInput: (e3) => setPinInput(e3.target.value),
            onKeyDown: (e3) => {
              if (e3.key === "Enter") tryPin();
            }
          }
        ),
        /* @__PURE__ */ u3("button", { class: "btn-primary", onClick: tryPin, children: "دخول ✓" }),
        !recover ? /* @__PURE__ */ u3("button", { class: "linklike", onClick: () => setRecover(true), children: "نسيت الرمز؟" }) : /* @__PURE__ */ u3("div", { class: "pin-recover", children: [
          /* @__PURE__ */ u3("div", { class: "pin-recover-t", children: "اكتب رقم المحل لاستعادة الرمز" }),
          /* @__PURE__ */ u3(
            "input",
            {
              class: "pin-input pin-phone",
              type: "tel",
              inputmode: "numeric",
              maxLength: 13,
              placeholder: "رقم المحل",
              value: phoneInput,
              onInput: (e3) => setPhoneInput(e3.target.value)
            }
          ),
          /* @__PURE__ */ u3("button", { class: "btn-primary sm", onClick: recoverPin, children: "استعادة الرمز" })
        ] })
      ] })
    ] });
  }

  // src/components/Admin.tsx
  var BLANK = () => ({
    id: "",
    name: "",
    cat: CATS[0],
    price: 0,
    oldPrice: null,
    desc: "",
    img: "🛍️",
    qty: 0
  });
  var compressPhoto = (file) => new Promise((res, rej) => {
    const r3 = new FileReader();
    r3.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 800;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const c3 = document.createElement("canvas");
        c3.width = Math.round(img.width * scale);
        c3.height = Math.round(img.height * scale);
        c3.getContext("2d").drawImage(img, 0, 0, c3.width, c3.height);
        res(c3.toDataURL("image/jpeg", 0.78));
      };
      img.onerror = rej;
      img.src = r3.result;
    };
    r3.onerror = rej;
    r3.readAsDataURL(file);
  });
  function Admin({ products, setProducts, orders, setOrders, notify, deliveryFee, setDeliveryFee, onZoom, onExitStore }) {
    const [form, setForm] = d2(null);
    const [delId, setDelId] = d2(null);
    const [trial, setTrial] = d2(null);
    const [banner, setBanner] = d2(null);
    const [bannerBusy, setBannerBusy] = d2(false);
    const [deliv, setDeliv] = d2(null);
    y2(() => {
      window.vellum.fetch("/v1/x/matjar-settings?key=delivery").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((v3) => setDeliv(v3.value === "لا" ? "لا" : "نعم")).catch(() => setDeliv("نعم"));
    }, []);
    const setDelivVal = (val) => {
      window.vellum.fetch("/v1/x/matjar-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "delivery", value: val }) }).then(() => {
        setDeliv(val);
        notify(val === "نعم" ? "فعّلت خدمة التوصيل — الزبون يختار توصيل للعنوان ✓" : "أوقفت خدمة التوصيل — الزبون بيستلم من الدكان فقط ✓");
      }).catch(() => notify("ما انحفظ الإعداد — تأكد من النت"));
    };
    y2(() => {
      window.vellum.fetch("/v1/x/matjar-settings?key=banner").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((v3) => setBanner(v3.value || "")).catch(() => setBanner(""));
    }, []);
    const saveBanner = (file) => {
      setBannerBusy(true);
      const r3 = new FileReader();
      r3.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1280;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const c3 = document.createElement("canvas");
          c3.width = Math.round(img.width * scale);
          c3.height = Math.round(img.height * scale);
          c3.getContext("2d").drawImage(img, 0, 0, c3.width, c3.height);
          const dataUrl = c3.toDataURL("image/jpeg", 0.8);
          window.vellum.fetch("/v1/x/matjar-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "banner", value: dataUrl }) }).then((res) => {
            if (res.ok) {
              setBanner(dataUrl);
              notify("اللافتة انرفعت ✓ — بتشوفها بالرئيسية");
            } else notify("ما نجح الرفع — الصورة كبيرة؟");
            setBannerBusy(false);
          }).catch(() => {
            notify("ما نجح الاتصال");
            setBannerBusy(false);
          });
        };
        img.onerror = () => {
          notify("الصورة ما فتحت");
          setBannerBusy(false);
        };
        img.src = r3.result;
      };
      r3.readAsDataURL(file);
    };
    const removeBanner = () => {
      window.vellum.fetch("/v1/x/matjar-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "banner", value: null }) }).then(() => {
        setBanner("");
        notify("انحذفت — رجعت اللافتة الأساسية");
      }).catch(() => notify("ما نجح الاتصال"));
    };
    y2(() => {
      const sid = window.STORE_ID || localStorage.getItem("matjar-multi-store") || "";
      window.vellum.fetch("/v1/x/matjar-store-login?store=" + encodeURIComponent(sid)).then((res) => res.ok ? res.json() : Promise.reject(res.status)).then((v3) => setTrial({ daysLeft: v3.daysLeft, expired: v3.expired, trialDays: v3.trialDays })).catch(() => {
      });
    }, []);
    const [feeInput, setFeeInput] = d2(String(deliveryFee));
    const [offersOpen, setOffersOpen] = d2(false);
    const [offPick, setOffPick] = d2(null);
    const [offPrice, setOffPrice] = d2("");
    const [openOrder, setOpenOrder] = d2(null);
    const [archive, setArchive] = d2({});
    y2(() => {
      window.vellum.fetch("/v1/x/matjar-delivered").then((res) => res.ok ? res.json() : Promise.reject(res.status)).then(setArchive).catch(() => {
      });
    }, [orders]);
    const DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const ARD = "٠١٢٣٤٥٦٧٨٩";
    const arNum = (s3) => String(s3).replace(/\d/g, (d3) => ARD[+d3]);
    const dayLabel = (k3) => {
      try {
        const [y3, m3, d3] = k3.split("-").map(Number);
        const dt = new Date(y3, m3 - 1, d3);
        return `${DAYS[dt.getDay()]} ${arNum(d3)}/${arNum(m3)}/${arNum(y3)}`;
      } catch {
        return k3;
      }
    };
    const callPhone = (phone) => {
      if (!phone) return;
      let opened = false;
      try {
        const a3 = document.createElement("a");
        a3.href = "tel:" + phone;
        a3.style.display = "none";
        document.body.appendChild(a3);
        a3.click();
        setTimeout(() => a3.remove(), 800);
        opened = true;
      } catch {
      }
      if (!opened) {
        try {
          navigator.clipboard && navigator.clipboard.writeText(phone);
          notify("الاتصال المباشر غير متاح هنا — نسخنا الرقم: " + phone);
        } catch {
          notify("رقم الزبون: " + phone);
        }
      }
    };
    const goDirections = (o3) => {
      const dest = o3.lat != null ? `${o3.lat},${o3.lng}` : o3.address ? o3.address + "، عمان" : "";
      if (!dest) {
        notify("ما في موقع لهذه الطلبية — الزبون ما علّم دبوس ولا كتب عنوان");
        return;
      }
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
      let opened = false;
      try {
        opened = !!window.open(url, "_blank");
      } catch {
      }
      if (!opened) {
        try {
          navigator.clipboard && navigator.clipboard.writeText(url);
          notify("النافذة تحجب فتح جوجل — نسخنا رابط الاتجاهات، الصقه بالمتصفح");
        } catch {
          notify("رابط الاتجاهات: " + url);
        }
      }
    };
    const markStage = (o3) => {
      const cur = o3.status || "جديد";
      const next = cur === "جديد" ? "جاهزة" : cur === "جاهزة" ? "تم التوصيل" : cur === "تم التوصيل" ? "تم الاستلام" : "";
      if (!next) return;
      window.vellum.fetch("/v1/x/matjar-orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: o3.id, status: next }) }).catch(() => {
      });
      setOrders(orders.map((x2) => x2.id === o3.id ? { ...x2, status: next } : x2));
      notify(next === "جاهزة" ? "جهّزت الطلب ✓" : next === "تم التوصيل" ? "سلّمت الطلبية ✓" : "اتأكد الاستلام ✓");
    };
    const [feeAsk, setFeeAsk] = d2(null);
    const [feeVal, setFeeVal] = d2("");
    const confirmFee = (o3) => {
      const goods = Number(o3.subtotal ?? o3.total ?? 0);
      const fee = Number(feeVal) || 0;
      const total = goods + fee;
      window.vellum.fetch("/v1/x/matjar-orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: o3.id, status: "جاهزة", fee, total }) }).catch(() => {
      });
      window.vellum.fetch("/v1/x/matjar-messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: o3.id, phone: o3.phone, total, text: `تم تجهيز طلبيتك وهي في اتجاهها إليكم 🛵 — الإجمالي مع أجرة التوصيل: ${fmt(total)}` }) }).catch(() => {
      });
      setOrders(orders.map((x2) => x2.id === o3.id ? { ...x2, status: "جاهزة", fee, total } : x2));
      setFeeAsk(null);
      setFeeVal("");
      notify(`جهّزت الطلبية ووصلت رسالة الزبون — الإجمالي ${fmt(total)} ✓`);
    };
    const waCust = (o3) => {
      const ph = (o3.phone || "").trim();
      if (!/^07\d{8}$/.test(ph)) {
        notify("الطلبية ما فيها رقم زبون صحيح — واتساب ما ينفع");
        return;
      }
      const intl = "962" + ph.replace(/^0/, "");
      const items = (o3.items || []).map((it) => `${it.name} × ${it.qty}`).join("، ");
      const pickup = o3.mode === "استلام";
      const text = pickup ? `تم تجهيز الطلب — تفضل لاستلامه من الدكان 🏪
🛒 ${items}
💰 الإجمالي: ${fmt(o3.total || 0)} د.أ` : `تم تجهيز طلبك وبالاتجاه علينا 🛵
🛒 ${items}
💰 الإجمالي: ${fmt(o3.total || 0)} د.أ${o3.address ? `
📍 ${o3.address}` : ""}`;
      try {
        window.open(`https://wa.me/${intl}?text=${encodeURIComponent(text)}`, "_blank");
        notify("فتحت واتساب الزبون — الرسالة جاهزة للإرسال");
      } catch {
        notify("ما انفتح واتساب هون — رقم الزبون: " + ph);
      }
    };
    const markDelivered = (o3) => {
      window.vellum.fetch("/v1/x/matjar-orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: o3.id, status: "سُلّمت" }) }).catch(() => {
      });
      setOrders(orders.filter((x2) => x2.id !== o3.id));
      notify("سلّمت الطلبية ✓ — انتقلت لقسم الطلبات المسلَّمة");
    };
    const saveFee2 = () => {
      const n2 = Number(feeInput) || 0;
      setDeliveryFee(n2);
      notify(n2 > 0 ? `أجور التوصيل صارت ${fmt(n2)} ✓` : "التوصيل صار مجاني ✓");
    };
    const [wallet, setWallet] = d2([]);
    const [wq, setWq] = d2("");
    const [wName, setWName] = d2("");
    const [wPhone, setWPhone] = d2("");
    const [wAmount, setWAmount] = d2("");
    const [wKind, setWKind] = d2("شحن");
    const [wNote, setWNote] = d2("");
    const loadWallet = () => {
      window.vellum.fetch("/v1/x/matjar-wallet").then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then(setWallet).catch(() => {
      });
    };
    y2(() => {
      loadWallet();
    }, []);
    const saveWallet = () => {
      const amount = Number(wAmount);
      if (!/^07\d{8}$/.test(wPhone)) {
        notify("رقم الزبون لازم ١٠ أرقام يبدأ بـ07");
        return;
      }
      if (!amount || amount <= 0) {
        notify("اكتب المبلغ — أكبر من صفر");
        return;
      }
      window.vellum.fetch("/v1/x/matjar-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: wPhone, name: wName, amount, kind: wKind, note: wNote })
      }).then((r3) => {
        if (!r3.ok) throw r3.status;
        notify(wKind === "شحن" ? `شحنت ${fmt(amount)} لـ ${wName || wPhone} ✓` : `خصمت ${fmt(amount)} من ${wName || wPhone} ✓`);
        setWName("");
        setWPhone("");
        setWAmount("");
        setWNote("");
        loadWallet();
      }).catch(() => notify("ما انحفظ الرصيد — تأكد من النت وجرّب مرة ثانية"));
    };
    const offers = products.filter((p3) => p3.oldPrice && p3.oldPrice > p3.price);
    const [aq, setAq] = d2("");
    const [openLat, setOpenLat] = d2(null);
    const [unlocked, setUnlocked] = d2(() => {
      const sid = String(typeof window !== "undefined" && window.STORE_ID || "");
      if (sid.startsWith("trial-")) return true;
      try {
        return sessionStorage.getItem("matjar-logged-in") === "1";
      } catch (e3) {
        return false;
      }
    });
    const [panelView, setPanelView] = d2("home");
    const [qrImg, setQrImg] = d2(null);
    const [passCur, setPassCur] = d2("");
    const [passNew, setPassNew] = d2("");
    const [passConf, setPassConf] = d2("");
    const [ownerPhone, setOwnerPhone] = d2("");
    const [phoneInput, setPhoneInput] = d2("");
    const [phoneConfirm, setPhoneConfirm] = d2("");
    const [phoneAuthed, setPhoneAuthed] = d2(false);
    const [phoneCode, setPhoneCode] = d2("");
    const tryPhoneCode = () => {
      window.vellum.fetch("/v1/x/matjar-phone-check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: phoneCode.trim() }) }).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((v3) => {
        if (v3.ok) {
          setPhoneAuthed(true);
          notify("فتحت خانة رقم الدكان ✓");
        } else notify("الرقم السري غلط — جرّب مرة ثانية");
      }).catch(() => notify("ما نجح التحقق — تأكد من النت"));
    };
    y2(() => {
      window.vellum.fetch("/v1/x/matjar-phone").then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((v3) => setOwnerPhone(v3.phone || "")).catch(() => {
      });
    }, []);
    const savePhone = () => {
      const p3 = phoneInput.replace(/\D/g, "");
      if (!/^(07\d{8}|9627\d{8})$/.test(p3)) {
        notify("الرقم غير صالح — صيغته 07XXXXXXXX");
        return;
      }
      if (p3 !== phoneConfirm.replace(/\D/g, "")) {
        notify("التأكيد ما طابق الرقم — اكتبهما نفس الشي");
        return;
      }
      window.vellum.fetch("/v1/x/matjar-phone", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: phoneInput, code: phoneCode.trim() }) }).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((v3) => {
        setOwnerPhone(v3.phone);
        setPhoneInput("");
        setPhoneConfirm("");
        notify(v3.phone + " صار رقم الدكان ✓ — الاستعادة والرسائل عليه");
      }).catch(() => notify("ما انحفظ — جرّب مرة ثانية"));
    };
    y2(() => {
      if (panelView !== "home") {
        registerBack("pv", () => setPanelView("home"));
        return () => unregisterBack("pv");
      }
    }, [panelView]);
    y2(() => {
      if (offersOpen) {
        registerBack("offers", () => {
          setOffersOpen(false);
          setOffPick(null);
        });
        return () => unregisterBack("offers");
      }
    }, [offersOpen]);
    y2(() => {
      if (form) {
        registerBack("form", () => setForm(null));
        return () => unregisterBack("form");
      }
    }, [!!form]);
    if (!unlocked) {
      return /* @__PURE__ */ u3("div", { class: "admin", children: /* @__PURE__ */ u3(
        PinGate,
        {
          title: "🔒 لوحة المتجر",
          sub: "اكتب رمز الدخول للوصول إلى الإدارة",
          notify,
          onUnlock: () => setUnlocked(true)
        }
      ) });
    }
    const openMaps = async (lat, lng) => {
      let opened = null;
      try {
        opened = window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
      } catch (e3) {
        opened = null;
      }
      if (opened) {
        setOpenLat(null);
        return;
      }
      const coords = `${lat.toFixed(6)},${lng.toFixed(6)}`;
      try {
        await navigator.clipboard.writeText(coords);
        notify(`نُسخت الإحداثيات ${coords} — الصقها بخارطة جوجل`);
      } catch (e3) {
        setOpenLat({ lat, lng });
      }
    };
    const adminList = products.filter((p3) => {
      const t3 = aq.trim();
      return !t3 || p3.name.includes(t3) || p3.cat.includes(t3);
    });
    const pickPhoto = async (e3) => {
      const f4 = e3.target.files?.[0];
      if (!f4 || !form) return;
      try {
        const d3 = await compressPhoto(f4);
        setForm({ ...form, photo: d3 });
        notify("الصورة جاهزة ✓");
      } catch (err) {
        notify("ما قدرت أقرأ الصورة");
      }
    };
    const save = () => {
      if (!form) return;
      if (!form.name.trim()) {
        notify("اكتب اسم المنتج أول");
        return;
      }
      if (!form.price || form.price <= 0) {
        notify("اكتب سعر صحيح");
        return;
      }
      if (form.oldPrice !== null && form.oldPrice <= form.price) {
        notify("السعر القديم لازم يكون أعلى من الحالي حتى يظهر بالعروض");
        return;
      }
      if (form.id) {
        setProducts(products.map((p3) => p3.id === form.id ? form : p3));
        notify("تم تعديل المنتج ✓");
      } else {
        setProducts([{ ...form, id: "p" + Date.now() }, ...products]);
        notify("تم إضافة المنتج ✓");
      }
      setForm(null);
    };
    const fld = (label, node) => /* @__PURE__ */ u3("label", { class: "fld", children: [
      /* @__PURE__ */ u3("span", { class: "fld-l", children: label }),
      node
    ] });
    const cancelOffer = (p3) => {
      setProducts(products.map((x2) => x2.id === p3.id ? { ...x2, oldPrice: null } : x2));
      notify(`انلغى عرض ${p3.name} — والمنتج باقي بالمتجر`);
    };
    const putOffer = (p3) => {
      const v3 = Number(offPrice);
      if (!v3 || v3 <= p3.price) {
        notify("السعر القديم لازم يكون أعلى من السعر الحالي");
        return;
      }
      setProducts(products.map((x2) => x2.id === p3.id ? { ...x2, oldPrice: v3 } : x2));
      setOffPick(null);
      setOffPrice("");
      notify(`انضاف ${p3.name} إلى عروض اليوم 🔥`);
    };
    return /* @__PURE__ */ u3("div", { class: "admin", children: [
      trial?.expired && /* @__PURE__ */ u3("div", { style: { minHeight: "70dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }, children: /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 16, padding: 24, maxWidth: 460, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,.08)" }, children: [
        /* @__PURE__ */ u3("div", { style: { fontSize: 40 }, children: "⏳" }),
        /* @__PURE__ */ u3("h2", { style: { color: "#1b5e20", margin: "8px 0" }, children: "انتهت الفترة التجريبية" }),
        /* @__PURE__ */ u3("p", { style: { color: "#3d3d35", fontSize: 15, lineHeight: 1.8 }, children: [
          "جربت المنصة ",
          trial.trialDays,
          " يوماً كاملة — ومتجرك وأصنافه وطلبياته كلها محفوظة ما ضاع شي. للإكمال والاشتراك الشهري اتصل بنا على ",
          /* @__PURE__ */ u3("b", { dir: "ltr", children: "0792145720" }),
          "."
        ] }),
        /* @__PURE__ */ u3("button", { onClick: onExitStore, style: { width: "100%", padding: 12, background: "#1b5e20", color: "#fff", border: 0, borderRadius: 10, fontSize: 15, fontWeight: 700, marginTop: 10, fontFamily: "inherit" }, children: "رجوع ←" })
      ] }) }),
      !trial?.expired && trial && trial.daysLeft <= 5 && /* @__PURE__ */ u3("div", { style: { background: "#fff8e1", border: "1px solid #e6c65c", borderRadius: 10, padding: "8px 12px", margin: "8px 0", fontSize: 13.5, color: "#7a5c00", textAlign: "center" }, children: [
        "⏳ الفترة التجريبية: باقي ",
        trial.daysLeft === 0 ? "أقل من يوم" : `${trial.daysLeft} ${trial.daysLeft === 1 ? "يوم" : "أيام"}`,
        " — للإكمال والاشتراك: ",
        /* @__PURE__ */ u3("b", { dir: "ltr", children: "0792145720" })
      ] }),
      !trial?.expired && trial && trial.daysLeft > 5 && /* @__PURE__ */ u3("div", { style: { background: "#e8f2e6", border: "1px solid #bcd9b4", borderRadius: 10, padding: "8px 12px", margin: "8px 0", fontSize: 13.5, color: "#1b5e20", textAlign: "center" }, children: [
        "✅ فترة تجريبية مجانية — باقي ",
        trial.daysLeft,
        " يوماً"
      ] }),
      offersOpen && /* @__PURE__ */ u3("div", { class: "staff-overlay", children: [
        /* @__PURE__ */ u3("div", { class: "staff-head", children: [
          /* @__PURE__ */ u3("h2", { children: "🔥 عروض اليوم" }),
          /* @__PURE__ */ u3("button", { class: "btn-ghost sm", onClick: () => {
            setOffersOpen(false);
            setOffPick(null);
          }, children: "رجوع ✕" })
        ] }),
        /* @__PURE__ */ u3("div", { class: "off-count", children: offers.length > 0 ? `${offers.length} ${offers.length === 1 ? "عرض شغّال" : "عروض شغّالة"} الآن` : "ما في عروض شغّالة هلق" }),
        offers.map((p3) => /* @__PURE__ */ u3("div", { class: "off-row", children: [
          /* @__PURE__ */ u3("span", { class: "prow-img" + (p3.photo ? " clickable" : ""), onClick: () => {
            if (p3.photo) onZoom(p3.photo);
          }, children: p3.photo ? /* @__PURE__ */ u3("img", { class: "pimg prow-pimg", src: p3.photo, alt: "" }) : p3.img }),
          /* @__PURE__ */ u3("div", { class: "off-info", children: [
            /* @__PURE__ */ u3("b", { children: p3.name }),
            /* @__PURE__ */ u3("span", { class: "off-prices", children: [
              /* @__PURE__ */ u3("s", { children: fmt(p3.oldPrice) }),
              " ← ",
              /* @__PURE__ */ u3("b", { class: "off-new", children: fmt(p3.price) })
            ] }),
            /* @__PURE__ */ u3("span", { class: "off-stock", children: p3.qty > 0 ? `متوفر ${p3.qty}` : "نفدت الكمية" })
          ] }),
          /* @__PURE__ */ u3("div", { class: "off-acts", children: [
            /* @__PURE__ */ u3("button", { class: "btn-ghost sm", onClick: () => {
              setForm(p3);
              setOffersOpen(false);
            }, children: "✏️ تعديل" }),
            /* @__PURE__ */ u3("button", { class: "btn-ghost sm off-cancel", onClick: () => cancelOffer(p3), children: "🗑️ إلغاء العرض" })
          ] })
        ] }, p3.id)),
        offers.length === 0 && /* @__PURE__ */ u3("div", { class: "off-empty", children: "ضيف عروضك من القائمة تحت — أي منتج سعره القديم أعلى من سعره بيطلع بشريط عروض اليوم تلقائياً" }),
        /* @__PURE__ */ u3("h3", { class: "off-sub", children: "منتجات بدون عرض — اضغط لوضعها بالعروض" }),
        products.filter((p3) => !(p3.oldPrice && p3.oldPrice > p3.price)).map((p3) => /* @__PURE__ */ u3("div", { class: "off-row", children: [
          /* @__PURE__ */ u3("span", { class: "prow-img", children: p3.photo ? /* @__PURE__ */ u3("img", { class: "pimg prow-pimg", src: p3.photo, alt: "" }) : p3.img }),
          /* @__PURE__ */ u3("div", { class: "off-info", children: [
            /* @__PURE__ */ u3("b", { children: p3.name }),
            /* @__PURE__ */ u3("span", { class: "off-stock", children: [
              fmt(p3.price),
              " · ",
              p3.qty > 0 ? `متوفر ${p3.qty}` : "نفدت الكمية"
            ] })
          ] }),
          /* @__PURE__ */ u3("div", { class: "off-acts", children: offPick === p3.id ? /* @__PURE__ */ u3("div", { class: "off-set", children: [
            /* @__PURE__ */ u3("input", { type: "number", inputmode: "decimal", step: "0.05", placeholder: "السعر القديم", value: offPrice, onInput: (e3) => setOffPrice(e3.target.value) }),
            /* @__PURE__ */ u3("button", { class: "btn-primary sm", onClick: () => putOffer(p3), children: "حفظ" })
          ] }) : /* @__PURE__ */ u3("button", { class: "btn-primary sm", onClick: () => {
            setOffPick(p3.id);
            setOffPrice("");
          }, children: "🔥 ضع بالعرض" }) })
        ] }, p3.id))
      ] }),
      /* @__PURE__ */ u3("header", { class: "head", children: [
        /* @__PURE__ */ u3("div", { class: "head-title", children: "🧰 لوحة المتجر" }),
        /* @__PURE__ */ u3("div", { class: "head-sub", children: "إدارة المنتجات والعروض والطلبات" }),
        /* @__PURE__ */ u3("button", { class: "btn-gold sm staff-open", onClick: () => setOffersOpen(true), children: "🔥 عروض اليوم — إدارة العروض" })
      ] }),
      /* @__PURE__ */ u3("div", { class: "stats", children: [
        /* @__PURE__ */ u3("div", { class: "stat", children: [
          /* @__PURE__ */ u3("b", { children: products.length }),
          /* @__PURE__ */ u3("span", { children: "منتج" })
        ] }),
        /* @__PURE__ */ u3("div", { class: "stat gold", children: [
          /* @__PURE__ */ u3("b", { children: offers.length }),
          /* @__PURE__ */ u3("span", { children: "عرض شغّال" })
        ] }),
        /* @__PURE__ */ u3("div", { class: "stat", children: [
          /* @__PURE__ */ u3("b", { children: orders.length }),
          /* @__PURE__ */ u3("span", { children: "طلب" })
        ] })
      ] }),
      panelView === "home" && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 14, margin: "10px 0" }, children: [
        /* @__PURE__ */ u3("b", { style: { fontSize: 14.5, color: "#1b5e20" }, children: "🖼️ اللافتة العلوية للرئيسية" }),
        /* @__PURE__ */ u3("p", { style: { margin: "4px 0 10px", fontSize: 13, color: "#6b6b5f" }, children: "هي الصورة الكبيرة اللي بتشوفها الزبون أول ما يفتح متجرك — ارفع اللي تريد (صورة محلك أو إعلان)" }),
        banner !== null && banner ? /* @__PURE__ */ u3("img", { src: banner, alt: "", style: { width: "100%", maxHeight: 130, objectFit: "cover", borderRadius: 10, display: "block", marginBottom: 10 } }) : null,
        /* @__PURE__ */ u3("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ u3("label", { style: { flex: 1, textAlign: "center", padding: 10, background: "#1b5e20", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }, children: [
            bannerBusy ? "جارٍ الرفع…" : banner ? "تغيير الصورة" : "رفع صورة",
            /* @__PURE__ */ u3("input", { type: "file", accept: "image/*", style: { display: "none" }, onChange: (e3) => {
              const f4 = e3.target.files?.[0];
              if (f4) saveBanner(f4);
              e3.target.value = "";
            } })
          ] }),
          banner ? /* @__PURE__ */ u3("button", { onClick: removeBanner, style: { flex: 1, padding: 10, background: "#fff", color: "#b00020", border: "1px solid #e2b0b6", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "inherit" }, children: "حذف اللافتة" }) : null
        ] })
      ] }),
      panelView === "home" && /* @__PURE__ */ u3("div", { class: "panel-btns", children: [
        /* @__PURE__ */ u3("button", { class: "panel-btn", onClick: () => setPanelView("orders"), children: [
          /* @__PURE__ */ u3("span", { class: "panel-btn-ic", children: "📦" }),
          /* @__PURE__ */ u3("b", { children: "الطلبات المسلَّمة" }),
          /* @__PURE__ */ u3("span", { class: "panel-btn-sub", children: [
            "الواردة والمسلَّمة — ",
            orders.filter((o3) => !["تم الاستلام", "سُلّمت"].includes(o3.status || "")).length,
            " بالانتظار"
          ] })
        ] }),
        /* @__PURE__ */ u3("button", { class: "panel-btn", onClick: () => setPanelView("products"), children: [
          /* @__PURE__ */ u3("span", { class: "panel-btn-ic", children: "🛍️" }),
          /* @__PURE__ */ u3("b", { children: "المنتجات" }),
          /* @__PURE__ */ u3("span", { class: "panel-btn-sub", children: [
            products.length,
            " منتج — إضافة وتعديل"
          ] })
        ] }),
        /* @__PURE__ */ u3("button", { class: "panel-btn", onClick: () => setPanelView("phone"), children: [
          /* @__PURE__ */ u3("span", { class: "panel-btn-ic", children: "📞" }),
          /* @__PURE__ */ u3("b", { children: "رقم الدكان" }),
          /* @__PURE__ */ u3("span", { class: "panel-btn-sub", children: ownerPhone ? ownerPhone + " — تعديل ورسائل" : "غير محفوظ بعد — اضغط للإدخال" })
        ] }),
        /* @__PURE__ */ u3("button", { class: "panel-btn", onClick: () => {
          setPanelView("qr");
          const sid = window.STORE_ID || localStorage.getItem("matjar-multi-store") || "";
          const url = window.location.origin + window.location.pathname + "?store=" + encodeURIComponent(sid);
          import_qrcode.default.toDataURL(url, { width: 460, margin: 2, color: { dark: "#1b5e20", light: "#ffffff" } }).then((u4) => setQrImg(u4)).catch(() => setQrImg(null));
        }, children: [
          /* @__PURE__ */ u3("span", { class: "panel-btn-ic", children: "📷" }),
          /* @__PURE__ */ u3("b", { children: "رمز QR لمتجرك" }),
          /* @__PURE__ */ u3("span", { class: "panel-btn-sub", children: "اطبعه وعلّقه بالدكان — الزبون يمسحه فيفتح متجرك" })
        ] }),
        /* @__PURE__ */ u3("button", { class: "panel-btn", onClick: () => setPanelView("pass"), children: [
          /* @__PURE__ */ u3("span", { class: "panel-btn-ic", children: "🔐" }),
          /* @__PURE__ */ u3("b", { children: "كلمة سر اللوحة" }),
          /* @__PURE__ */ u3("span", { class: "panel-btn-sub", children: "غيّرها متى شئت — حروف وأرقام ورموز كما تحب" })
        ] })
      ] }),
      panelView === "home" && deliv !== null && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 14, margin: "10px 0" }, children: [
        /* @__PURE__ */ u3("b", { style: { fontSize: 14.5, color: "#1b5e20" }, children: "هل توفر خدمة التوصيل؟" }),
        /* @__PURE__ */ u3("p", { style: { margin: "4px 0 10px", fontSize: 13, color: "#6b6b5f" }, children: "الزبون يشوف الخيار بالرئيسية وبسلة الطلب" }),
        /* @__PURE__ */ u3(
          "select",
          {
            value: deliv || "",
            onChange: (e3) => {
              const v3 = e3.target.value;
              if (v3) setDelivVal(v3);
            },
            style: { width: "100%", padding: 11, borderRadius: 10, border: "2px solid #e2ddcf", fontSize: 15, fontWeight: 700, fontFamily: "inherit", background: "#fff", color: deliv === "لا" ? "#7a4d00" : "#1b5e20" },
            children: [
              /* @__PURE__ */ u3("option", { value: "", disabled: true, children: "— اختر من القائمة —" }),
              /* @__PURE__ */ u3("option", { value: "نعم", children: "✅ متوفرة" }),
              /* @__PURE__ */ u3("option", { value: "لا", children: "❌ غير متوفرة" })
            ]
          }
        ),
        /* @__PURE__ */ u3("div", { style: { marginTop: 8, fontSize: 13.5, fontWeight: 700, color: deliv === "لا" ? "#7a4d00" : "#1b5e20" }, children: [
          "الحالية: ",
          deliv === "نعم" ? "🚚 متوفرة" : "🏪 غير متوفرة"
        ] })
      ] }),
      panelView === "home" && onExitStore && /* @__PURE__ */ u3("button", { onClick: onExitStore, style: { display: "block", margin: "14px auto 0", padding: "8px 22px", background: "#1b5e20", color: "#fff", border: 0, borderRadius: 999, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }, children: "🏪 المتاجر — فتح أو تسجيل متجر آخر" }),
      panelView !== "home" && /* @__PURE__ */ u3("button", { class: "btn-ghost sm panel-back", onClick: () => setPanelView("home"), children: "⬅ رجوع للقائمة" }),
      panelView === "orders" && orders.length > 0 && /* @__PURE__ */ u3("div", { class: "sec", children: [
        /* @__PURE__ */ u3("div", { class: "sec-head", children: /* @__PURE__ */ u3("h3", { children: "الطلبات الواردة — طلبيات التوصيل والاستلام" }) }),
        orders.filter((o3) => !["تم الاستلام", "سُلّمت"].includes(o3.status || "")).map((o3, i4) => /* @__PURE__ */ u3("div", { class: "order c" + i4 % 5 + (openOrder === o3.id ? " open" : ""), onClick: () => setOpenOrder(openOrder === o3.id ? null : o3.id), children: [
          /* @__PURE__ */ u3("div", { class: "order-head", children: [
            /* @__PURE__ */ u3("b", { children: fmt(o3.total) }),
            o3.status && o3.status !== "جديد" && /* @__PURE__ */ u3("span", { class: "so-badge b-" + o3.status, children: o3.status }),
            /* @__PURE__ */ u3("span", { class: "order-at", children: o3.at })
          ] }),
          /* @__PURE__ */ u3("div", { class: "order-cust", children: [
            "👤 ",
            o3.name || "زبون",
            " ·",
            " ",
            /* @__PURE__ */ u3("button", { class: "phone-call", onClick: (e3) => {
              e3.stopPropagation();
              callPhone(o3.phone);
            }, children: [
              "📞 ",
              o3.phone || "—"
            ] })
          ] }),
          /* @__PURE__ */ u3("div", { class: "order-mode", children: [
            o3.mode === "استلام" ? "🏪 استلام من الدكان" : `🚚 توصيل${o3.address ? " — " + o3.address : ""}`,
            o3.pay === "الرصيد" ? " · 💳 دُفع من الرصيد" : ""
          ] }),
          /* @__PURE__ */ u3("button", { class: "btn-ghost sm view-order", onClick: (e3) => {
            e3.stopPropagation();
            setOpenOrder(openOrder === o3.id ? null : o3.id);
          }, children: "📋 عرض الطلب" }),
          openOrder === o3.id && /* @__PURE__ */ u3(k, { children: [
            /* @__PURE__ */ u3("div", { class: "order-more", children: [
              (o3.items || []).map((it, i5) => /* @__PURE__ */ u3("div", { class: "order-item-line", children: [
                /* @__PURE__ */ u3("span", { children: [
                  it.name,
                  " × ",
                  it.qty
                ] }),
                /* @__PURE__ */ u3("b", { children: fmt(it.price * it.qty) })
              ] }, i5)),
              /* @__PURE__ */ u3("div", { class: "order-sumrow", children: [
                /* @__PURE__ */ u3("span", { children: "الأغراض" }),
                /* @__PURE__ */ u3("b", { children: fmt(o3.subtotal ?? o3.total ?? 0) })
              ] }),
              o3.fee ? /* @__PURE__ */ u3("div", { class: "order-sumrow", children: [
                /* @__PURE__ */ u3("span", { children: "التوصيل" }),
                /* @__PURE__ */ u3("b", { children: fmt(o3.fee) })
              ] }) : null
            ] }),
            (o3.status || "جديد") === "جديد" && feeAsk !== o3.id && /* @__PURE__ */ u3("button", { class: "btn-primary sm full-w", onClick: (e3) => {
              e3.stopPropagation();
              if (o3.mode === "استلام") {
                window.vellum.fetch("/v1/x/matjar-orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: o3.id, status: "جاهزة" }) }).catch(() => {
                });
                window.vellum.fetch("/v1/x/matjar-messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: o3.id, phone: o3.phone, total: o3.total, text: "تم تجهيز الطلب — تفضل لاستلامه من الدكان 🏪" }) }).catch(() => {
                });
                setOrders(orders.map((x2) => x2.id === o3.id ? { ...x2, status: "جاهزة" } : x2));
                notify("جهّزت الطلبية ✓ — تفضل لاستلامها");
              } else {
                setFeeAsk(o3.id);
                setFeeVal("");
              }
            }, children: "✓ تم تجهيز الطلبية" }),
            (o3.status || "جديد") === "جديد" && feeAsk === o3.id && /* @__PURE__ */ u3("div", { class: "fee-ask", onClick: (e3) => e3.stopPropagation(), children: [
              /* @__PURE__ */ u3("div", { class: "fee-ask-head", children: "🧾 تجهيز الطلبية" }),
              /* @__PURE__ */ u3("div", { class: "order-sumrow", children: [
                /* @__PURE__ */ u3("span", { children: "الأغراض" }),
                /* @__PURE__ */ u3("b", { children: fmt(o3.subtotal ?? o3.total ?? 0) })
              ] }),
              o3.mode !== "استلام" && deliv !== "لا" && /* @__PURE__ */ u3("input", { type: "number", inputmode: "decimal", step: "0.25", placeholder: "أجرة التوصيل بالدينار (اختياري)", value: feeVal, onInput: (e3) => setFeeVal(e3.target.value) }),
              o3.mode === "استلام" && /* @__PURE__ */ u3("div", { class: "fee-note", style: { fontSize: 13, color: "#7a4d00", fontWeight: 700 }, children: "🏪 استلام من الدكان — لا يوجد توصيل" }),
              /* @__PURE__ */ u3("div", { class: "order-sumrow fee-grand", children: [
                /* @__PURE__ */ u3("span", { children: "الإجمالي للزبون" }),
                /* @__PURE__ */ u3("b", { children: fmt((o3.subtotal ?? o3.total ?? 0) + (o3.mode !== "استلام" && deliv !== "لا" ? Number(feeVal) || 0 : 0)) })
              ] }),
              o3.lat != null && o3.mode !== "استلام" && /* @__PURE__ */ u3("div", { class: "order-map", children: [
                /* @__PURE__ */ u3("div", { class: "order-map-l", children: "📍 موقع الزبون على الخارطة" }),
                /* @__PURE__ */ u3(MapPicker, { lat: o3.lat, lng: o3.lng, height: 150 })
              ] }),
              o3.lat != null && o3.mode !== "استلام" && /* @__PURE__ */ u3("button", { class: "btn-primary sm full-w", onClick: (e3) => {
                e3.stopPropagation();
                goDirections(o3);
              }, children: "🧭 التوجه إلى الموقع" }),
              /* @__PURE__ */ u3("button", { class: "btn-primary sm full-w", onClick: (e3) => {
                e3.stopPropagation();
                confirmFee(o3);
              }, children: "✓ تأكيد وإرسال الرسالة للزبون" }),
              /* @__PURE__ */ u3("button", { class: "btn-ghost sm full-w", onClick: (e3) => {
                e3.stopPropagation();
                setFeeAsk(null);
              }, children: "إلغاء" })
            ] }),
            /* @__PURE__ */ ((st) => st !== "جديد" && st !== "جاهزة")(o3.status || "جديد") && o3.mode !== "استلام" && /* @__PURE__ */ u3("button", { class: "btn-primary sm full-w", onClick: (e3) => {
              e3.stopPropagation();
              goDirections(o3);
            }, children: "🧭 التوجه إلى الموقع" }),
            (o3.status || "جديد") === "جاهزة" && /* @__PURE__ */ u3(k, { children: [
              /* @__PURE__ */ u3("button", { class: "btn-ghost sm full-w wa-btn", onClick: (e3) => {
                e3.stopPropagation();
                waCust(o3);
              }, children: o3.mode === "استلام" ? "🟢 واتساب الزبون — تم تجهيز الطلب تفضل لاستلامه" : "🟢 واتساب الزبون — تم تجهيز الطلب وبالاتجاه عليك" }),
              o3.mode !== "استلام" && /* @__PURE__ */ u3("button", { class: "btn-primary sm full-w", onClick: (e3) => {
                e3.stopPropagation();
                if (o3.lat != null) {
                  goDirections(o3);
                  return;
                }
                const ad = (o3.address || "").trim();
                if (ad) {
                  try {
                    window.open("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("متجر " + ad), "_blank");
                    notify("فتحت جوجل بالعنوان المكتوب: " + ad);
                  } catch {
                    notify("انسخ العنوان لجوجل: " + ad);
                  }
                } else notify("الطلبية بلا موقع ولا عنوان — اطلب من الزبون موقعه");
              }, children: "🧭 التوجه إلى الموقع" }),
              /* @__PURE__ */ u3("button", { class: "btn-primary sm full-w", onClick: (e3) => {
                e3.stopPropagation();
                markDelivered(o3);
              }, children: "✓ تم التسليم" })
            ] }),
            (o3.status || "جديد") === "تم التوصيل" && /* @__PURE__ */ u3("button", { class: "btn-primary sm full-w", onClick: (e3) => {
              e3.stopPropagation();
              markStage(o3);
            }, children: "✓ تم الاستلام" }),
            (o3.status || "جديد") === "سُلّمت" && /* @__PURE__ */ u3("button", { class: "btn-ghost sm full-w done-gray", disabled: true, children: "✓ تم التسليم" }),
            o3.lat != null && /* @__PURE__ */ u3("div", { class: "order-map", onClick: (e3) => e3.stopPropagation(), children: [
              /* @__PURE__ */ u3("div", { class: "order-map-l", children: "📍 موقع الزبون على الخارطة" }),
              /* @__PURE__ */ u3(MapPicker, { lat: o3.lat, lng: o3.lng, height: 150 }),
              openLat && /* @__PURE__ */ u3("div", { class: "coords-line", children: [
                "الإحداثيات: ",
                openLat.lat.toFixed(6),
                " , ",
                openLat.lng.toFixed(6),
                " — الصقها بخارطة جوجل"
              ] })
            ] }),
            o3.notes && /* @__PURE__ */ u3("div", { class: "order-notes", children: [
              "📝 ",
              o3.notes
            ] })
          ] })
        ] }, o3.id))
      ] }),
      panelView === "orders" && (() => {
        const days = Object.keys(archive).filter((k3) => (archive[k3] || []).length > 0).sort().reverse();
        if (!days.length) return null;
        return /* @__PURE__ */ u3("div", { class: "sec", children: [
          /* @__PURE__ */ u3("div", { class: "sec-head", children: /* @__PURE__ */ u3("h3", { children: "📋 الطلبات المسلَّمة — محفوظة باليوم" }) }),
          days.map((k3) => /* @__PURE__ */ u3("div", { class: "day-block", children: [
            /* @__PURE__ */ u3("div", { class: "day-head", children: [
              "📅 ",
              dayLabel(k3),
              " ",
              /* @__PURE__ */ u3("i", { children: [
                "(",
                arNum(archive[k3].length),
                " طلبية)"
              ] })
            ] }),
            archive[k3].map((o3, i4) => /* @__PURE__ */ u3("div", { class: "order done c" + i4 % 5 + (openOrder === o3.id ? " open" : ""), onClick: () => setOpenOrder(openOrder === o3.id ? null : o3.id), children: [
              /* @__PURE__ */ u3("div", { class: "order-head", children: [
                /* @__PURE__ */ u3("b", { children: fmt(o3.total) }),
                /* @__PURE__ */ u3("span", { class: "so-badge b-تم-الاستلام", children: o3.status === "سُلّمت" ? "سُلّمت" : "تم الاستلام" }),
                /* @__PURE__ */ u3("span", { class: "order-at", children: o3.at })
              ] }),
              /* @__PURE__ */ u3("div", { class: "order-cust", children: [
                "👤 ",
                o3.name || "زبون",
                " ·",
                " ",
                /* @__PURE__ */ u3("button", { class: "phone-call", onClick: (e3) => {
                  e3.stopPropagation();
                  callPhone(o3.phone);
                }, children: [
                  "📞 ",
                  o3.phone || "—"
                ] })
              ] }),
              /* @__PURE__ */ u3("button", { class: "btn-ghost sm view-order", onClick: (e3) => {
                e3.stopPropagation();
                setOpenOrder(openOrder === o3.id ? null : o3.id);
              }, children: "📋 عرض الطلب" }),
              openOrder === o3.id && /* @__PURE__ */ u3(k, { children: [
                (o3.items || []).map((it, j3) => /* @__PURE__ */ u3("div", { class: "order-row", children: [
                  /* @__PURE__ */ u3("span", { children: [
                    it.name,
                    " × ",
                    it.qty
                  ] }),
                  /* @__PURE__ */ u3("b", { children: fmt(it.price * it.qty) })
                ] }, j3)),
                /* @__PURE__ */ u3("div", { class: "order-sumrow", children: [
                  /* @__PURE__ */ u3("span", { children: "الإجمالي" }),
                  /* @__PURE__ */ u3("b", { children: fmt(o3.total) })
                ] }),
                o3.notes && /* @__PURE__ */ u3("div", { class: "order-notes", children: [
                  "📝 ",
                  o3.notes
                ] })
              ] })
            ] }, o3.id))
          ] }, k3))
        ] });
      })(),
      panelView === "products" && /* @__PURE__ */ u3("div", { class: "sec", children: [
        /* @__PURE__ */ u3("div", { class: "sec-head", children: [
          /* @__PURE__ */ u3("h3", { children: [
            "المنتجات (",
            products.length,
            ")"
          ] }),
          /* @__PURE__ */ u3("button", { class: "btn-primary sm", onClick: () => setForm(BLANK()), children: "+ منتج جديد" })
        ] }),
        products.length > 8 && /* @__PURE__ */ u3(
          "input",
          {
            class: "search admin-search",
            type: "search",
            placeholder: "دوّر بالمنتجات…",
            value: aq,
            onInput: (e3) => setAq(e3.target.value)
          }
        ),
        adminList.map((p3) => /* @__PURE__ */ u3("div", { class: "prow", children: [
          /* @__PURE__ */ u3(
            "span",
            {
              class: "prow-img" + (p3.photo ? " clickable" : ""),
              onClick: () => {
                if (p3.photo) onZoom(p3.photo);
              },
              children: p3.photo ? /* @__PURE__ */ u3("img", { class: "pimg prow-pimg", src: p3.photo, alt: "" }) : p3.img
            }
          ),
          /* @__PURE__ */ u3("div", { class: "prow-mid", children: [
            /* @__PURE__ */ u3("div", { class: "prow-name", children: p3.name }),
            /* @__PURE__ */ u3("div", { class: "prow-meta", children: [
              p3.cat,
              " · ",
              fmt(p3.price),
              p3.oldPrice && p3.oldPrice > p3.price && /* @__PURE__ */ u3("span", { class: "prow-offer", children: " · عرض 🔥" })
            ] })
          ] }),
          delId === p3.id ? /* @__PURE__ */ u3("div", { class: "prow-del", children: [
            /* @__PURE__ */ u3("button", { class: "btn-danger sm", onClick: () => {
              setProducts(products.filter((x2) => x2.id !== p3.id));
              setDelId(null);
              notify("حُذف المنتج");
            }, children: "متأكد؟ احذف" }),
            /* @__PURE__ */ u3("button", { class: "btn-ghost sm", onClick: () => setDelId(null), children: "إلغاء" })
          ] }) : /* @__PURE__ */ u3("div", { class: "prow-actions", children: [
            /* @__PURE__ */ u3("button", { class: "btn-ghost sm", onClick: () => setForm({ ...p3 }), children: "تعديل" }),
            /* @__PURE__ */ u3("button", { class: "btn-danger sm", onClick: () => setDelId(p3.id), children: "حذف" })
          ] })
        ] }, p3.id))
      ] }),
      panelView === "phone" && /* @__PURE__ */ u3("div", { class: "sec", children: [
        /* @__PURE__ */ u3("div", { class: "sec-head", children: /* @__PURE__ */ u3("h3", { children: "📞 رقم صاحب الدكان" }) }),
        phoneAuthed ? /* @__PURE__ */ u3(k, { children: [
          ownerPhone ? /* @__PURE__ */ u3("div", { class: "phone-now", children: [
            "الرقم الحالي: ",
            /* @__PURE__ */ u3("b", { dir: "ltr", children: ownerPhone })
          ] }) : /* @__PURE__ */ u3("div", { class: "phone-now phone-empty", children: "ما في رقم محفوظ بعد — دخّل رقمك وأكّده ليشتغل بالاستعادة والرسائل" }),
          /* @__PURE__ */ u3("div", { class: "phone-edit", children: [
            /* @__PURE__ */ u3(
              "input",
              {
                class: "pin-input pin-phone",
                type: "tel",
                inputmode: "numeric",
                maxLength: 13,
                placeholder: ownerPhone ? "الرقم الجديد — 07XXXXXXXX" : "أدخل رقمك — 07XXXXXXXX",
                value: phoneInput,
                onInput: (e3) => setPhoneInput(e3.target.value)
              }
            ),
            /* @__PURE__ */ u3(
              "input",
              {
                class: "pin-input pin-phone",
                type: "tel",
                inputmode: "numeric",
                maxLength: 13,
                placeholder: ownerPhone ? "أكد الرقم الجديد — نفس الرقم" : "أكد رقمك — اكتبه مرة ثانية",
                value: phoneConfirm,
                onInput: (e3) => setPhoneConfirm(e3.target.value)
              }
            ),
            /* @__PURE__ */ u3("button", { class: "btn-primary sm", onClick: savePhone, children: ownerPhone ? "حفظ الرقم ✓" : "تأكيد الرقم ✓" })
          ] }),
          /* @__PURE__ */ u3("div", { class: "phone-hint", children: ownerPhone ? "تغيّر رقمك متى ما احتجت — الجديد يشتغل فوراً بالاستعادة ورسائل الطلبيات" : "هذا الرقم عليه: استعادة رمز الدخول · إشعارات الطلبيات" })
        ] }) : /* @__PURE__ */ u3("div", { class: "phone-edit", children: [
          /* @__PURE__ */ u3("div", { class: "phone-hint", children: "هذه الخانة محميّة برقم سري — اكتب الرقم السري الخاص بصاحب الدكان" }),
          /* @__PURE__ */ u3(
            "input",
            {
              class: "pin-input pin-phone",
              type: "text",
              autoCapitalize: "off",
              autoComplete: "off",
              spellCheck: false,
              maxLength: 20,
              placeholder: "••••",
              value: phoneCode,
              onInput: (e3) => setPhoneCode(e3.target.value),
              onKeyDown: (e3) => {
                if (e3.key === "Enter") tryPhoneCode();
              }
            }
          ),
          /* @__PURE__ */ u3("button", { class: "btn-primary sm", onClick: tryPhoneCode, children: "فتح الخانة ✓" })
        ] })
      ] }),
      panelView === "qr" && /* @__PURE__ */ u3("div", { class: "sec", children: [
        /* @__PURE__ */ u3("div", { class: "sec-head", children: /* @__PURE__ */ u3("h3", { children: "📷 رمز QR لمتجرك" }) }),
        qrImg ? /* @__PURE__ */ u3("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ u3("img", { src: qrImg, alt: "رمز المتجر", style: { width: 230, maxWidth: "80%", border: "2px solid #e2ddcf", borderRadius: 14, padding: 10, background: "#fff" } }),
          /* @__PURE__ */ u3("p", { style: { fontSize: 13.5, color: "#3d3d35", margin: "10px 0" }, children: "ضوّر الكاميرا عليه من جوالك — يفتح صفحة متجرك عند الزبون فوراً" }),
          /* @__PURE__ */ u3("div", { style: { display: "flex", gap: 8, justifyContent: "center" }, children: /* @__PURE__ */ u3(
            "a",
            {
              href: qrImg,
              download: "qr-" + (window.STORE_ID || localStorage.getItem("matjar-multi-store") || "store") + ".png",
              style: { padding: "10px 18px", background: "#1b5e20", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" },
              children: "حفظ الصورة ⬇"
            }
          ) })
        ] }) : /* @__PURE__ */ u3("p", { style: { fontSize: 13.5, color: "#b00020" }, children: "ما نجح توليد الرمز — أعد فتح البطاقة" })
      ] }),
      panelView === "pass" && /* @__PURE__ */ u3("div", { class: "sec", children: [
        /* @__PURE__ */ u3("div", { class: "sec-head", children: /* @__PURE__ */ u3("h3", { children: "🔐 كلمة سر اللوحة" }) }),
        /* @__PURE__ */ u3("p", { style: { margin: "0 0 10px", fontSize: 13, color: "#6b6b5f" }, children: "هذه الكلمة تحمي لوحة متجرك — من ٤ إلى ٣٠ محرفاً: حروف وأرقام ورموز كما تريد" }),
        /* @__PURE__ */ u3("div", { class: "phone-edit", children: [
          /* @__PURE__ */ u3(
            "input",
            {
              class: "pin-input pin-phone",
              type: "text",
              autoCapitalize: "off",
              autoComplete: "off",
              spellCheck: false,
              maxLength: 30,
              placeholder: "كلمة السر الحالية — الافتراضية 1234",
              value: passCur,
              onInput: (e3) => setPassCur(e3.target.value)
            }
          ),
          /* @__PURE__ */ u3(
            "input",
            {
              class: "pin-input pin-phone",
              type: "text",
              autoCapitalize: "off",
              autoComplete: "off",
              spellCheck: false,
              maxLength: 30,
              placeholder: "كلمة السر الجديدة",
              value: passNew,
              onInput: (e3) => setPassNew(e3.target.value)
            }
          ),
          /* @__PURE__ */ u3(
            "input",
            {
              class: "pin-input pin-phone",
              type: "text",
              autoCapitalize: "off",
              autoComplete: "off",
              spellCheck: false,
              maxLength: 30,
              placeholder: "أكد كلمة السر الجديدة — اكتبها مرة ثانية",
              value: passConf,
              onInput: (e3) => setPassConf(e3.target.value)
            }
          ),
          /* @__PURE__ */ u3("button", { class: "btn-primary sm", onClick: () => {
            if (passNew.trim().length < 4) {
              notify("كلمة السر من ٤ محارف على الأقل");
              return;
            }
            if (passNew.trim() !== passConf.trim()) {
              notify("التأكيد ما طابق الجديدة — اكتبها نفسها");
              return;
            }
            fetch("/v1/x/matjar-pin", { method: "POST", headers: { "Content-Type": "application/json", "x-matjar-store": window.STORE_ID || localStorage.getItem("matjar-multi-store") || "" }, body: JSON.stringify({ currentPin: passCur.trim(), newPin: passNew.trim() }) }).then((r3) => r3.json().then((v3) => ({ r: r3, v: v3 }))).then(({ r: r3, v: v3 }) => {
              if (r3.ok && v3.ok) {
                notify("حُفظت كلمة السر الجديدة ✓ — احفظها عندك");
                setPassCur("");
                setPassNew("");
                setPassConf("");
              } else notify(v3.error || "ما نجح التغيير");
            }).catch(() => notify("ما نجح الاتصال"));
          }, children: "حفظ كلمة السر ✓" })
        ] })
      ] }),
      form && /* @__PURE__ */ u3("div", { class: "sheet-backdrop", onClick: () => setForm(null), children: /* @__PURE__ */ u3("div", { class: "sheet", onClick: (e3) => e3.stopPropagation(), children: [
        /* @__PURE__ */ u3("h3", { class: "sheet-name", children: form.id ? "تعديل منتج" : "منتج جديد" }),
        fld("الاسم", /* @__PURE__ */ u3("input", { value: form.name, onInput: (e3) => setForm({ ...form, name: e3.target.value }), placeholder: "مثال: جبنة عكاوي" })),
        fld("التصنيف", /* @__PURE__ */ u3("select", { value: form.cat, onChange: (e3) => setForm({ ...form, cat: e3.target.value }), children: CATS.map((c3) => /* @__PURE__ */ u3("option", { value: c3, children: c3 })) })),
        /* @__PURE__ */ u3("div", { class: "fld-row", children: [
          fld("السعر (د.أ)", /* @__PURE__ */ u3("input", { type: "number", inputmode: "decimal", step: "0.05", value: form.price || "", onInput: (e3) => setForm({ ...form, price: Number(e3.target.value) || 0 }) })),
          fld("السعر القديم — للعرض (اختياري)", /* @__PURE__ */ u3("input", { type: "number", inputmode: "decimal", step: "0.05", value: form.oldPrice ?? "", onInput: (e3) => {
            const v3 = e3.target.value;
            setForm({ ...form, oldPrice: v3 === "" ? null : Number(v3) });
          } }))
        ] }),
        /* @__PURE__ */ u3("div", { class: "fld-row", children: [
          fld("الصورة (رمز تعبيري)", /* @__PURE__ */ u3("input", { value: form.img, onInput: (e3) => setForm({ ...form, img: e3.target.value || "🛍️" }) })),
          fld("الكمية", /* @__PURE__ */ u3("input", { type: "number", inputmode: "numeric", value: form.qty || "", onInput: (e3) => setForm({ ...form, qty: Number(e3.target.value) || 0 }) }))
        ] }),
        fld("صورة المنتج — بضغطة وحدة تفتح الكاميرا", /* @__PURE__ */ u3("div", { class: "photo-pick", children: [
          /* @__PURE__ */ u3("label", { class: "btn-primary photo-cam", children: [
            "📸 صور المنتج",
            /* @__PURE__ */ u3("input", { type: "file", accept: "image/*", capture: "environment", style: { display: "none" }, onChange: pickPhoto })
          ] }),
          /* @__PURE__ */ u3("label", { class: "photo-gallery", children: [
            "أو اختر صورة من المعرض",
            /* @__PURE__ */ u3("input", { type: "file", accept: "image/*", style: { display: "none" }, onChange: pickPhoto })
          ] }),
          form.photo && /* @__PURE__ */ u3("div", { class: "photo-preview", children: [
            /* @__PURE__ */ u3("img", { src: form.photo, alt: "" }),
            /* @__PURE__ */ u3("button", { class: "btn-ghost sm", onClick: () => setForm({ ...form, photo: void 0 }), children: "شيل الصورة" })
          ] })
        ] })),
        fld("الوصف", /* @__PURE__ */ u3("textarea", { value: form.desc, onInput: (e3) => setForm({ ...form, desc: e3.target.value }), rows: 2, placeholder: "وصف قصير يظهر للزبون" })),
        /* @__PURE__ */ u3("div", { class: "confirm-btns", children: [
          /* @__PURE__ */ u3("button", { class: "btn-ghost", onClick: () => setForm(null), children: "إلغاء" }),
          /* @__PURE__ */ u3("button", { class: "btn-primary", onClick: save, children: "حفظ ✓" })
        ] })
      ] }) })
    ] });
  }

  // src/components/ProductSheet.tsx
  function ProductSheet({ product, favs, toggleFav, onClose, onAdd, onZoom }) {
    const [q2, setQ] = d2(1);
    const isOffer = !!product.oldPrice && product.oldPrice > product.price && product.qty > 0;
    const soldOut = product.qty <= 0;
    return /* @__PURE__ */ u3("div", { class: "sheet-backdrop", onClick: onClose, children: /* @__PURE__ */ u3("div", { class: "sheet", onClick: (e3) => e3.stopPropagation(), children: [
      /* @__PURE__ */ u3(
        "div",
        {
          class: "sheet-img" + (isOffer ? " offer" : "") + (product.photo ? " clickable" : ""),
          onClick: (e3) => {
            if (product.photo) {
              e3.stopPropagation();
              onZoom(product.photo);
            }
          },
          children: [
            product.photo ? /* @__PURE__ */ u3("img", { class: "pimg sheet-pimg", src: product.photo, alt: product.name }) : product.img,
            isOffer && /* @__PURE__ */ u3("span", { class: "offer-disc", children: [
              "خصم ",
              discountPct(product),
              "٪"
            ] }),
            soldOut && /* @__PURE__ */ u3("span", { class: "offer-disc grey", children: "غير متوفر" })
          ]
        }
      ),
      /* @__PURE__ */ u3("div", { class: "sheet-body", children: [
        /* @__PURE__ */ u3("div", { class: "sheet-name-row", children: [
          /* @__PURE__ */ u3("h2", { class: "sheet-name", children: product.name }),
          /* @__PURE__ */ u3(
            "button",
            {
              class: "heart sheet-heart" + (favs.includes(product.id) ? " on" : ""),
              onClick: () => toggleFav(product.id),
              children: "♥"
            }
          )
        ] }),
        /* @__PURE__ */ u3("div", { class: "sheet-cat", children: product.cat }),
        /* @__PURE__ */ u3("div", { class: "sheet-prices", children: [
          /* @__PURE__ */ u3("span", { class: "price", children: fmt(product.price) }),
          isOffer && /* @__PURE__ */ u3("span", { class: "old", children: fmt(product.oldPrice) })
        ] }),
        /* @__PURE__ */ u3("p", { class: "sheet-desc", children: product.desc }),
        !soldOut && product.qty <= 5 && /* @__PURE__ */ u3("div", { class: "low-stock", children: [
          "باقي بالكمية: ",
          product.qty,
          " فقط"
        ] }),
        /* @__PURE__ */ u3("div", { class: "qty-row", children: [
          /* @__PURE__ */ u3("button", { class: "qty-btn", onClick: () => setQ((v3) => Math.max(1, v3 - 1)), children: "−" }),
          /* @__PURE__ */ u3("span", { class: "qty-num", children: q2 }),
          /* @__PURE__ */ u3("button", { class: "qty-btn", onClick: () => setQ((v3) => v3 + 1), children: "+" })
        ] }),
        soldOut ? /* @__PURE__ */ u3("button", { class: "btn-primary disabled", disabled: true, children: "غير متوفر حالياً" }) : /* @__PURE__ */ u3("button", { class: "btn-primary", onClick: () => {
          onAdd(product.id, q2);
          onClose();
        }, children: [
          "أضف للسلة — ",
          fmt(product.price * q2)
        ] })
      ] })
    ] }) });
  }

  // src/components/PlatformAdmin.tsx
  function PlatformAdmin({ onEnter: onEnter2 }) {
    const MASTERKEY = "matjar-multi-master";
    const [mOpen, setMOpen] = d2(false);
    const [mCode, setMCode] = d2("");
    const [mList, setMList] = d2(null);
    const [mMsg, setMMsg] = d2("");
    const [mDel, setMDel] = d2(null);
    const [master, setMaster] = d2(() => {
      try {
        return localStorage.getItem(MASTERKEY) === "1";
      } catch (e3) {
        return false;
      }
    });
    const openStores = () => {
      setMMsg("");
      window.vellum.fetch("/v1/x/matjar-stores?code=" + encodeURIComponent(mCode.trim())).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((v3) => {
        try {
          localStorage.setItem(MASTERKEY, "1");
        } catch (e3) {
        }
        setMaster(true);
        setMList(v3);
        setMOpen(false);
      }).catch(() => setMMsg("رمز المنصة غلط"));
    };
    const patchStore = (id, body) => {
      window.vellum.fetch("/v1/x/matjar-stores", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...body }) }).then((r3) => r3.json().then((v3) => ({ r: r3, v: v3 }))).then(({ r: r3, v: v3 }) => {
        if (r3.ok && v3.ok) {
          setMMsg("");
          setMList((l3) => l3 ? l3.map((x2) => x2.id === id ? v3.store : x2) : l3);
        } else setMMsg(v3.error || "ما نجح التغيير");
      }).catch(() => setMMsg("ما نجح الاتصال"));
    };
    const delStore = (id) => {
      window.vellum.fetch("/v1/x/matjar-store-delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, code: mCode.trim() }) }).then((r3) => r3.json().then((v3) => ({ r: r3, v: v3 }))).then(({ r: r3, v: v3 }) => {
        if (r3.ok && v3.ok) {
          setMDel(null);
          setMList((l3) => l3 ? l3.filter((x2) => x2.id !== id) : l3);
        } else setMMsg(v3.error || "ما نجح الإمسح");
      }).catch(() => setMMsg("ما نجح الاتصال"));
    };
    if (!mList) return /* @__PURE__ */ u3("div", { style: { minHeight: "100dvh", background: "#f6f1e7", padding: "60px 16px", direction: "rtl", textAlign: "center" }, children: [
      /* @__PURE__ */ u3("h1", { style: { color: "#1b5e20", fontSize: 22, margin: "0 0 18px" }, children: "⚙️ إدارة المنصة" }),
      !mOpen ? /* @__PURE__ */ u3("button", { onClick: () => {
        if (master) {
          window.vellum.fetch("/v1/x/matjar-stores?code=9178").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then(setMList).catch(() => setMMsg("ما نجح الاتصال"));
        } else setMOpen(true);
      }, style: { padding: "12px 30px", background: "#1b5e20", color: "#fff", border: 0, borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: "inherit" }, children: "فتح اللوحة" }) : /* @__PURE__ */ u3("div", { style: { display: "flex", gap: 8, maxWidth: 340, margin: "0 auto" }, children: [
        /* @__PURE__ */ u3(
          "input",
          {
            value: mCode,
            onInput: (e3) => setMCode(e3.target.value),
            placeholder: "رمز المنصة",
            dir: "ltr",
            inputMode: "numeric",
            onKeyDown: (e3) => {
              if (e3.key === "Enter") openStores();
            },
            style: { flex: 1, padding: 10, border: "1px solid #d8d2c2", borderRadius: 10, fontSize: 15, textAlign: "center", fontFamily: "inherit" }
          }
        ),
        /* @__PURE__ */ u3("button", { onClick: openStores, style: { padding: "10px 18px", background: "#1b5e20", color: "#fff", border: 0, borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "inherit" }, children: "فتح" })
      ] }),
      mMsg && /* @__PURE__ */ u3("p", { style: { fontSize: 13, color: "#b00020", marginTop: 6 }, children: mMsg })
    ] });
    return /* @__PURE__ */ u3("div", { style: { minHeight: "100dvh", background: "#f6f1e7", padding: "24px 14px", direction: "rtl" }, children: /* @__PURE__ */ u3("div", { style: { maxWidth: 460, margin: "0 auto", background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 16 }, children: [
      /* @__PURE__ */ u3("b", { style: { color: "#1b5e20", fontSize: 15 }, children: [
        "⚙️ لوحة المتاجر — ",
        mList.length
      ] }),
      /* @__PURE__ */ u3("div", { style: { display: "flex", gap: 6, marginTop: 10 }, children: [
        { n: mList.filter((t3) => t3.status === "مدفوع").length, l: "مدفوع", c: "#1b5e20" },
        { n: mList.filter((t3) => t3.status === "تجربة").length, l: "تجربة", c: "#b07d00" },
        { n: mList.filter((t3) => t3.status === "منتهٍ").length, l: "منتهٍ", c: "#b00020" }
      ].map((k3, i4) => /* @__PURE__ */ u3("div", { style: { flex: 1, background: "#f8f6ef", border: "1px solid #e2ddcf", borderRadius: 10, padding: 8, textAlign: "center" }, children: [
        /* @__PURE__ */ u3("b", { style: { fontSize: 18, color: k3.c }, children: k3.n }),
        /* @__PURE__ */ u3("div", { style: { fontSize: 11.5, color: "#6b6b5f" }, children: k3.l })
      ] }, i4)) }),
      /* @__PURE__ */ u3("div", { style: { marginTop: 10, display: "grid", gap: 8 }, children: mList.map((t3) => {
        const paid = t3.status === "مدفوع";
        const ended = t3.status === "منتهٍ";
        return /* @__PURE__ */ u3("div", { style: { border: "1px solid " + (ended ? "#e2b0b6" : "#e2ddcf"), borderRight: "5px solid " + (paid ? "#1b5e20" : ended ? "#b00020" : "#d9a441"), borderRadius: 10, padding: "8px 10px", background: "#fff" }, children: [
          /* @__PURE__ */ u3("div", { style: { display: "flex", gap: 6, alignItems: "stretch" }, children: [
            /* @__PURE__ */ u3("button", { onClick: () => onEnter2(t3.id, t3.cat || void 0), style: { flex: 1, padding: 8, background: "#f8f6ef", border: "1px solid #e2ddcf", borderRadius: 10, fontSize: 15, fontWeight: 700, color: "#1b5e20", fontFamily: "inherit", textAlign: "right", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
              /* @__PURE__ */ u3("span", { children: t3.name }),
              /* @__PURE__ */ u3("span", { style: { fontSize: 12, color: "#9a9484", fontWeight: 400 }, children: [
                t3.cat || "",
                " ←"
              ] })
            ] }),
            mDel === t3.id ? /* @__PURE__ */ u3("button", { onClick: () => delStore(t3.id), style: { padding: "8px 12px", background: "#b00020", color: "#fff", border: 0, borderRadius: 10, fontSize: 12.5, fontWeight: 700, fontFamily: "inherit" }, children: "متأكد؟" }) : /* @__PURE__ */ u3("button", { onClick: () => setMDel(t3.id), style: { padding: "8px 12px", background: "#fff", color: "#b00020", border: "1px solid #e2b0b6", borderRadius: 10, fontSize: 14, fontFamily: "inherit" }, children: "🗑️" })
          ] }),
          /* @__PURE__ */ u3("div", { style: { marginTop: 6, fontSize: 12.5, fontWeight: 700, color: paid ? "#1b5e20" : ended ? "#b00020" : "#7a4d00" }, children: paid ? `✅ مدفوع حتى ${new Date(t3.paidUntil).toLocaleDateString("ar-JO", { year: "numeric", month: "long", day: "numeric" })}` : t3.status === "تجربة" ? `⏳ تجربة مجانية — باقٍ ${t3.daysLeft} يوم` : "⛔ لم يدفع — انتهت تجربته" }),
          /* @__PURE__ */ u3("div", { style: { display: "flex", gap: 6, marginTop: 6 }, children: [
            /* @__PURE__ */ u3("button", { onClick: () => {
              const ph = String(t3.phone || "").replace(/^0/, "962");
              const text = "تحية طيبة — اشتراك تطبيق المتجر لم يتم دفعه. خلال ثلاثة أيام ستتوقف الخدمة في حال لم يتم الدفع. للتجديد تواصل مع إدارة المنصة 🌹";
              if (!t3.phone) {
                setMMsg("المتجر بلا رقم هاتف محفوظ");
                return;
              }
              try {
                window.open("https://wa.me/" + ph + "?text=" + encodeURIComponent(text), "_blank");
                setMMsg("فتحت التذكير بالواتساب — جاهزة للإرسال");
              } catch {
                setMMsg("انسخ الرقم: " + t3.phone);
              }
            }, style: { flex: 1, padding: 7, background: "#fff", color: "#7a4d00", border: "2px solid #d9a441", borderRadius: 8, fontSize: 12.5, fontWeight: 700, fontFamily: "inherit" }, children: "📩 تذكير بالدفع" }),
            t3.blocked ? /* @__PURE__ */ u3("button", { onClick: () => patchStore(t3.id, { blocked: false }), style: { flex: 1, padding: 7, background: "#1b5e20", color: "#fff", border: 0, borderRadius: 8, fontSize: 12.5, fontWeight: 700, fontFamily: "inherit" }, children: "✅ رفع الحجب" }) : /* @__PURE__ */ u3("button", { onClick: () => patchStore(t3.id, { blocked: true }), style: { flex: 1, padding: 7, background: "#b00020", color: "#fff", border: 0, borderRadius: 8, fontSize: 12.5, fontWeight: 700, fontFamily: "inherit" }, children: "⛔ حجب المتجر" }),
            /* @__PURE__ */ u3("button", { onClick: () => patchStore(t3.id, { months: 1, blocked: false }), style: { flex: 1, padding: 7, background: "#1b5e20", color: "#fff", border: 0, borderRadius: 8, fontSize: 12.5, fontWeight: 700, fontFamily: "inherit" }, children: "💵 تم الدفع +١ شهر" }),
            /* @__PURE__ */ u3("button", { onClick: () => patchStore(t3.id, { months: 3, blocked: false }), style: { flex: 1, padding: 7, background: "#fff", color: "#1b5e20", border: "2px solid #1b5e20", borderRadius: 8, fontSize: 12.5, fontWeight: 700, fontFamily: "inherit" }, children: "+٣ أشهر" }),
            t3.phone ? /* @__PURE__ */ u3("div", { style: { padding: 7, fontSize: 12.5, color: "#6b6b5f", display: "flex", alignItems: "center" }, dir: "ltr", children: t3.phone }) : null
          ] })
        ] }, t3.id);
      }) }),
      mMsg && /* @__PURE__ */ u3("p", { style: { fontSize: 13, color: "#b00020", textAlign: "center", margin: "4px 0 0" }, children: mMsg }),
      /* @__PURE__ */ u3("button", { onClick: () => {
        setMList(null);
        setMDel(null);
      }, style: { width: "100%", marginTop: 10, padding: 8, background: "transparent", border: 0, color: "#9a9484", fontSize: 13, fontFamily: "inherit" }, children: "إغلاق" })
    ] }) });
  }

  // src/components/App.tsx
  var STORE_KEY = "matjar-multi-store";
  function StoreGate({ onEnter: onEnter2 }) {
    const [step, setStep] = d2("home");
    const [cat, setCat] = d2("");
    const [name, setName] = d2("");
    const [pin, setPin] = d2("");
    const [phone, setPhone] = d2("");
    const [needPhone, setNeedPhone] = d2(true);
    y2(() => {
      if (step !== "login" || name.trim().length < 2) return;
      const t3 = setTimeout(() => {
        window.vellum.fetch("/v1/x/matjar-store-login?name=" + encodeURIComponent(name.trim())).then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((v3) => setNeedPhone(!(v3.exists && v3.hasPhone))).catch(() => {
        });
      }, 500);
      return () => clearTimeout(t3);
    }, [name, step]);
    const [msg, setMsg] = d2("");
    const [busy, setBusy] = d2(false);
    const [owned] = d2(() => {
      try {
        return localStorage.getItem("matjar-multi-owned") === "1";
      } catch (e3) {
        return false;
      }
    });
    const [fName, setFName] = d2("");
    const [fPhone, setFPhone] = d2("");
    const [fCode, setFCode] = d2("");
    const [fDemo, setFDemo] = d2("");
    const [fStage, setFStage] = d2("ask");
    const [regSid, setRegSid] = d2("");
    const [fNewPin, setFNewPin] = d2("");
    const [fConfPin, setFConfPin] = d2("");
    const [fSid, setFSid] = d2("");
    y2(() => {
      if (step !== "home") {
        registerBack("gate", () => setStep("home"));
        return () => unregisterBack("gate");
      }
    }, [step]);
    const post = (url, body) => window.vellum.fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((r3) => r3.json().then((v3) => ({ r: r3, v: v3 })));
    const enter = () => {
      setBusy(true);
      setMsg("");
      post("/v1/x/matjar-store-login", { name: name.trim(), pin: pin.trim(), phone: phone.trim() }).then(({ r: r3, v: v3 }) => {
        setBusy(false);
        if (r3.ok && v3.ok) onEnter2(v3.store.id, v3.store.cat);
        else setMsg(v3.blocked ? "⛔ " + v3.error : v3.error || "الاسم أو الرمز غلط");
      }).catch(() => {
        setBusy(false);
        setMsg("ما نجح الاتصال — تأكد من النت");
      });
    };
    const reg = () => {
      setMsg("");
      if (!cat) {
        setMsg("اختر نوع المتجر أولاً");
        return;
      }
      post("/v1/x/matjar-stores", { name: name.trim(), id: regSid.trim(), cat, phone: phone.trim(), pin: pin.trim() }).then(({ r: r3, v: v3 }) => {
        if (r3.ok && v3.ok) onEnter2(v3.store.id, cat);
        else setMsg(v3.error || "ما نجح التسجيل");
      }).catch(() => setMsg("ما نجح الاتصال — تأكد من النت"));
    };
    const askCode = () => {
      setMsg("");
      setFDemo("");
      post("/v1/x/matjar-otp", { action: "request", name: fName.trim(), phone: fPhone.trim() }).then(({ r: r3, v: v3 }) => {
        if (r3.ok && v3.ok) {
          setFStage("code");
          setFDemo(v3.demoCode || "");
        } else setMsg(v3.error || "الاسم أو الهاتف غلط");
      }).catch(() => setMsg("ما نجح الاتصال"));
    };
    const afterVerify = (sid) => {
      const np = fNewPin.trim();
      if (!np) {
        onEnter2(sid);
        return;
      }
      if (np.length < 4 || np !== fConfPin.trim()) {
        setMsg(np.length < 4 ? "كلمة السر من ٤ محارف على الأقل" : "التأكيد ما طابق الجديدة");
        return;
      }
      window.vellum.fetch("/v1/x/matjar-pin", { method: "POST", headers: { "Content-Type": "application/json", "x-matjar-store": sid }, body: JSON.stringify({ phone: fPhone.trim(), newPin: np }) }).then((r3) => r3.json().then((v3) => ({ r: r3, v: v3 }))).then(({ r: r3, v: v3 }) => {
        if (r3.ok && v3.ok) onEnter2(sid);
        else setMsg(v3.error || "ما نجح التغيير");
      }).catch(() => setMsg("ما نجح الاتصال"));
    };
    const verifyCode = () => {
      setMsg("");
      post("/v1/x/matjar-otp", { action: "verify", name: fName.trim(), phone: fPhone.trim(), code: fCode.trim() }).then(({ r: r3, v: v3 }) => {
        if (r3.ok && v3.ok) {
          setFSid(v3.store.id);
          setFStage("newpin");
        } else setMsg(v3.error || "الكود غلط");
      }).catch(() => setMsg("ما نجح الاتصال"));
    };
    const enterTrial = (c3) => {
      const id = `trial-${STORE_TYPES.findIndex((t3) => t3.name === c3) + 1}`;
      try {
        const k3 = `matjar-trial-day-${id}`;
        const last = Number(localStorage.getItem(k3) || 0);
        if (Date.now() - last > 864e5) {
          localStorage.removeItem(`matjar-v1-products-${id}`);
          localStorage.removeItem(`matjar-v1-seeds-${id}`);
          localStorage.removeItem(`matjar-cart-${id}`);
          localStorage.removeItem(`matjar-orders-${id}`);
        }
        localStorage.setItem(k3, String(Date.now()));
      } catch (e3) {
      }
      onEnter2(id, c3);
    };
    const inp = { width: "100%", padding: "12px", border: "1px solid #d8d2c2", borderRadius: 10, fontSize: "16px", margin: "8px 0", fontFamily: "inherit" };
    const btn = { width: "100%", padding: 12, background: "#1b5e20", color: "#fff", border: 0, borderRadius: 10, fontSize: "16px", fontWeight: 700, marginTop: 6, fontFamily: "inherit" };
    const link = (t3, go) => /* @__PURE__ */ u3("button", { onClick: go, style: { background: "transparent", border: 0, color: "#1b5e20", fontSize: 13.5, fontWeight: 700, fontFamily: "inherit", textDecoration: "underline", padding: "8px 0" }, children: t3 });
    const typeGrid = (pick) => /* @__PURE__ */ u3("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }, children: STORE_TYPES.map((t3) => /* @__PURE__ */ u3("button", { onClick: () => pick(t3.name), style: { padding: "12px 6px", borderRadius: 10, border: "2px solid #e2ddcf", background: "#fff", color: "#3d3d35", fontSize: 13.5, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }, children: [
      /* @__PURE__ */ u3("span", { children: t3.emoji }),
      /* @__PURE__ */ u3("span", { children: t3.name })
    ] }, t3.name)) });
    return /* @__PURE__ */ u3("div", { style: { minHeight: "100dvh", background: "#f6f1e7", padding: "28px 16px", direction: "rtl" }, children: [
      /* @__PURE__ */ u3("h1", { style: { textAlign: "center", color: "#1b5e20", fontSize: 22, margin: "12px 0 4px" }, children: "🏪 المتاجر" }),
      /* @__PURE__ */ u3("p", { style: { textAlign: "center", color: "#6b6b5f", fontSize: 13, marginBottom: 20 }, children: step === "home" ? "أهلاً بك — كيف تحب تبدأ؟" : step === "type" ? "اختر نوع متجرك أولاً" : step === "login" ? `متجر ${cat} — ادخل ببياناتك` : step === "reg" ? `تسجيل متجر ${cat} — تجربة مجانية ١٤ يوماً` : "استعادة رمز الدخول" }),
      /* @__PURE__ */ u3("div", { style: { maxWidth: 460, margin: "0 auto" }, children: [
        step === "home" && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 18, textAlign: "center" }, children: [
          !owned && /* @__PURE__ */ u3("button", { onClick: () => setStep("trial"), style: { width: "100%", padding: 18, background: "#f8f6ef", color: "#1b5e20", border: "2px dashed #1b5e20", borderRadius: 12, fontSize: 17, fontWeight: 700, fontFamily: "inherit", marginBottom: 12 }, children: [
            "🧪 تجربة التطبيق",
            /* @__PURE__ */ u3("span", { style: { display: "block", fontSize: 12.5, fontWeight: 400, color: "#6b6b5f", marginTop: 4 }, children: "تدخل متجراً جاهزاً وتعمل ما تشاء — كل ما تُدخله يُمسح تلقائياً بعد يوم" })
          ] }),
          /* @__PURE__ */ u3("button", { onClick: () => setStep("type"), style: { width: "100%", padding: 18, background: "#1b5e20", color: "#fff", border: 0, borderRadius: 12, fontSize: 17, fontWeight: 700, fontFamily: "inherit" }, children: [
            "🏪 ",
            owned ? "الدخول لمتجرك" : "تسجيل متجرك",
            /* @__PURE__ */ u3("span", { style: { display: "block", fontSize: 12.5, fontWeight: 400, color: "#d8ead9", marginTop: 4 }, children: owned ? "متجرك مسجّل بهذا الجهاز — ادخل ببياناتك" : "متجر حقيقي باسمك ورمزك — تجربة مجانية ١٤ يوماً" })
          ] })
        ] }),
        step === "type" && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 16 }, children: [
          /* @__PURE__ */ u3("b", { style: { color: "#1b5e20" }, children: "نوع متجرك؟" }),
          typeGrid((c3) => {
            setCat(c3);
            setStep("login");
          }),
          link("‹ رجوع", () => setStep("home"))
        ] }),
        step === "trial" && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 16 }, children: [
          /* @__PURE__ */ u3("b", { style: { color: "#1b5e20" }, children: "اختر نوع التجربة — تفتح فوراً بمنتجات نوعها" }),
          typeGrid((c3) => enterTrial(c3)),
          link("‹ رجوع", () => setStep("home"))
        ] }),
        step === "login" && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }, children: [
          /* @__PURE__ */ u3("input", { value: name, onInput: (e3) => setName(e3.target.value), placeholder: "اسم المتجر", autoCapitalize: "off", style: inp }),
          /* @__PURE__ */ u3("input", { value: pin, onInput: (e3) => setPin(e3.target.value), placeholder: "رمز الدخول", autoCapitalize: "off", autoComplete: "off", spellCheck: false, style: inp }),
          needPhone && /* @__PURE__ */ u3(
            "input",
            {
              value: phone,
              onInput: (e3) => setPhone(e3.target.value),
              placeholder: "أول تسجيل — رقم هاتفك 07xxxxxxxx",
              dir: "ltr",
              inputMode: "numeric",
              maxLength: 10,
              onKeyDown: (e3) => {
                if (e3.key === "Enter") enter();
              },
              style: inp
            }
          ),
          /* @__PURE__ */ u3("button", { onClick: enter, disabled: busy, style: { ...btn, opacity: busy ? 0.7 : 1 }, children: busy ? "جارٍ الدخول…" : "دخول ←" }),
          msg && /* @__PURE__ */ u3("p", { style: { marginTop: 10, fontSize: 14, color: "#b00020", textAlign: "center" }, children: msg }),
          /* @__PURE__ */ u3("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 4 }, children: [
            link("نسيت الرمز؟", () => {
              setFName(name);
              setFPhone(phone);
              setFStage("ask");
              setMsg("");
              setStep("forgot");
            }),
            link("سجّل متجر جديد ➕", () => {
              setMsg("");
              setStep("reg");
            })
          ] }),
          link("‹ رجوع للبداية", () => {
            setMsg("");
            setStep("home");
          })
        ] }),
        step === "reg" && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 16 }, children: [
          /* @__PURE__ */ u3("input", { value: name, onInput: (e3) => setName(e3.target.value), placeholder: "اسم المتجر — مثال: بقالة الأمل", style: inp }),
          /* @__PURE__ */ u3("input", { value: regSid, onInput: (e3) => setRegSid(e3.target.value), placeholder: "معرّف (اختياري) — حروف إنكليزية صغيرة", dir: "ltr", style: inp }),
          /* @__PURE__ */ u3("input", { value: pin, onInput: (e3) => setPin(e3.target.value), placeholder: "رمز دخول متجرك — اختره بنفسك", autoCapitalize: "off", autoComplete: "off", spellCheck: false, style: inp }),
          /* @__PURE__ */ u3("input", { value: phone, onInput: (e3) => setPhone(e3.target.value), placeholder: "رقم هاتفك — 07… (يُستعاد به الرمز)", dir: "ltr", inputMode: "numeric", maxLength: 10, style: inp }),
          /* @__PURE__ */ u3("button", { onClick: reg, style: btn, children: "تسجيل المتجر ✚" }),
          msg && /* @__PURE__ */ u3("p", { style: { marginTop: 10, fontSize: 14, color: "#b00020", textAlign: "center" }, children: msg }),
          /* @__PURE__ */ u3("p", { style: { margin: "8px 0 0", fontSize: 12.5, color: "#6b6b5f", textAlign: "center" }, children: "تجربة مجانية ١٤ يوماً — بعدها الاشتراك لمن يرغب بالإكمال، وبيانات متجرك كاملة محفوظة" }),
          link("‹ رجوع للبداية", () => {
            setMsg("");
            setStep("home");
          })
        ] }),
        step === "forgot" && /* @__PURE__ */ u3("div", { style: { background: "#fff", border: "1px solid #e2ddcf", borderRadius: 14, padding: 16 }, children: [
          fStage === "ask" ? /* @__PURE__ */ u3(k, { children: [
            /* @__PURE__ */ u3("input", { value: fName, onInput: (e3) => setFName(e3.target.value), placeholder: "اسم المتجر", autoCapitalize: "off", style: inp }),
            /* @__PURE__ */ u3("input", { value: fPhone, onInput: (e3) => setFPhone(e3.target.value), placeholder: "رقم الهاتف المسجل — 07…", dir: "ltr", inputMode: "numeric", maxLength: 10, style: inp }),
            /* @__PURE__ */ u3("button", { onClick: askCode, style: btn, children: "أرسل الكود 📱" })
          ] }) : fStage === "newpin" ? /* @__PURE__ */ u3(k, { children: [
            /* @__PURE__ */ u3("p", { style: { fontSize: 14, color: "#1b5e20", textAlign: "center", margin: "8px 0" }, children: "تم التحقق ✓ — اختر كلمة سر جديدة للوحة متجرك (حروف وأرقام ورموز كما تحب)" }),
            /* @__PURE__ */ u3("input", { value: fNewPin, onInput: (e3) => setFNewPin(e3.target.value), placeholder: "كلمة السر الجديدة", autoCapitalize: "off", autoComplete: "off", spellCheck: false, maxLength: 30, style: inp }),
            /* @__PURE__ */ u3(
              "input",
              {
                value: fConfPin,
                onInput: (e3) => setFConfPin(e3.target.value),
                placeholder: "أكدها — اكتبها مرة ثانية",
                autoCapitalize: "off",
                autoComplete: "off",
                spellCheck: false,
                maxLength: 30,
                onKeyDown: (e3) => {
                  if (e3.key === "Enter") afterVerify(fSid);
                },
                style: inp
              }
            ),
            /* @__PURE__ */ u3("button", { onClick: () => afterVerify(fSid), style: btn, children: "تغيير والدخول ←" }),
            link("تخطى — ادخل بالرمز القديم", () => onEnter2(fSid))
          ] }) : /* @__PURE__ */ u3(k, { children: [
            /* @__PURE__ */ u3("p", { style: { fontSize: 14, color: "#1b5e20", textAlign: "center", margin: "8px 0" }, children: [
              "كود التحقق بيوصل لجوالك المنتهي بـ ",
              fPhone.slice(-2),
              " خلال لحظات"
            ] }),
            fDemo && /* @__PURE__ */ u3("p", { style: { fontSize: 12.5, color: "#6b6b5f", textAlign: "center", margin: "0 0 6px" }, children: [
              "وضع التجربة — الكود: ",
              /* @__PURE__ */ u3("b", { dir: "ltr", children: fDemo })
            ] }),
            /* @__PURE__ */ u3(
              "input",
              {
                value: fCode,
                onInput: (e3) => setFCode(e3.target.value),
                placeholder: "الكود — ٤ خانات",
                dir: "ltr",
                inputMode: "numeric",
                maxLength: 4,
                onKeyDown: (e3) => {
                  if (e3.key === "Enter") verifyCode();
                },
                style: { ...inp, textAlign: "center", fontSize: 20, letterSpacing: 6, fontWeight: 700 }
              }
            ),
            /* @__PURE__ */ u3("button", { onClick: verifyCode, style: btn, children: "تحقق وادخل ←" })
          ] }),
          msg && /* @__PURE__ */ u3("p", { style: { marginTop: 10, fontSize: 14, color: "#b00020", textAlign: "center" }, children: msg }),
          link("‹ رجوع للدخول", () => {
            setMsg("");
            setStep("login");
          })
        ] })
      ] })
    ] });
  }
  function App() {
    const [platform, setPlatform] = d2(() => {
      try {
        return window.location.hash === "#admin";
      } catch {
        return false;
      }
    });
    y2(() => {
      const h3 = () => setPlatform(window.location.hash === "#admin");
      window.addEventListener("hashchange", h3);
      return () => window.removeEventListener("hashchange", h3);
    }, []);
    if (platform) return /* @__PURE__ */ u3(PlatformAdmin, { onEnter: (id, c3) => {
      window.location.hash = "";
      setPlatform(false);
      onEnter(id, c3);
    } });
    const [store, setStore] = d2(() => {
      try {
        const qs = new URLSearchParams(window.location.search).get("store");
        if (qs && /^[a-z0-9][a-z0-9-]{1,23}$/.test(qs)) return qs;
      } catch {
      }
      try {
        if (!localStorage.getItem("matjar-multi-store") && !localStorage.getItem("matjar-multi-migrated")) {
          const OLD = ["matjar-v1-products", "matjar-v1-cart", "matjar-v1-orders", "matjar-v1-favs", "matjar-v1-fee", "matjar-v1-seeds"];
          let had = false;
          for (const k3 of OLD) {
            const v3 = localStorage.getItem(k3);
            if (v3 !== null) {
              localStorage.setItem(k3 + "-aqtash", v3);
              had = true;
            }
          }
          const seen = localStorage.getItem("matjar-seen-msg");
          if (seen) localStorage.setItem("matjar-seen-msg-aqtash", seen);
          localStorage.setItem("matjar-multi-migrated", "1");
          if (had) {
            localStorage.setItem("matjar-multi-store", "aqtash");
            return "aqtash";
          }
        }
      } catch {
      }
      return localStorage.getItem(STORE_KEY);
    });
    const [tab, setTab] = d2("home");
    const [products, setProducts] = d2([]);
    const [cart, setCart] = d2([]);
    const [orders, setOrders] = d2([]);
    const [favs, setFavs] = d2([]);
    const [deliveryFee, setDeliveryFeeState] = d2(0);
    const [ready, setReady] = d2(false);
    const [toast, setToast] = d2("");
    const [shopMsg, setShopMsg] = d2(null);
    y2(() => {
      const pull = () => window.vellum.fetch("/v1/x/matjar-messages").then((r3) => r3.ok ? r3.json() : Promise.reject(0)).then((list) => {
        if (Array.isArray(list) && list.length) {
          const seen = localStorage.getItem(`matjar-seen-msg-${curStore()}`);
          const last = list[list.length - 1];
          if (last.id !== seen) setShopMsg(last);
        }
      }).catch(() => {
      });
      pull();
      const t3 = setInterval(pull, 2e4);
      return () => clearInterval(t3);
    }, []);
    const dismissMsg = () => {
      if (shopMsg) localStorage.setItem(`matjar-seen-msg-${curStore()}`, shopMsg.id);
      setShopMsg(null);
    };
    const [sel, setSel] = d2(null);
    const [zoom, setZoom] = d2(null);
    y2(() => {
      window.STORE_ID = store;
    }, [store]);
    y2(() => {
      wireBackStep();
    }, []);
    y2(() => {
      if (zoom) {
        registerBack("zoom", () => setZoom(null));
        return () => unregisterBack("zoom");
      }
    }, [!!zoom]);
    y2(() => {
      if (sel) {
        registerBack("sel", () => setSel(null));
        return () => unregisterBack("sel");
      }
    }, [!!sel]);
    y2(() => {
      if (tab === "cart") {
        registerBack("cart", () => setTab("home"));
        return () => unregisterBack("cart");
      }
    }, [tab]);
    y2(() => {
      if (tab === "admin") {
        registerBack("admin", () => setTab("home"));
        return () => unregisterBack("admin");
      }
    }, [tab]);
    y2(() => {
      if (store && tab === "home") {
        registerBack("store-root", () => {
          localStorage.removeItem(STORE_KEY);
          setStore(null);
        });
        return () => unregisterBack("store-root");
      }
    }, [store, tab]);
    y2(() => {
      let clean = loadProducts().map((p3) => ({ ...p3, cat: (p3.cat || "").replace(/\s+/g, " ").trim() }));
      if (curStore() === "aqtash") clean = mergeSeeds(clean).list;
      setProducts(clean);
      saveProducts(clean);
      const kept = loadCart().filter((c3) => clean.some((p3) => p3.id === c3.id));
      setCart(kept);
      saveCart(kept);
      setOrders(loadOrders());
      setFavs(loadFavs());
      setDeliveryFeeState(loadFee());
      window.vellum.fetch("/v1/x/matjar-orders").then((res) => res.ok ? res.json() : Promise.reject(res.status)).then((o3) => {
        setOrders(o3);
        saveOrders(o3);
      }).catch(() => setOrders(loadOrders()));
      window.vellum.fetch("/v1/x/matjar-products").then((res) => res.ok ? res.json() : Promise.reject(res.status)).then((srv) => {
        const list = srv && srv.products;
        if (Array.isArray(list) && list.length) {
          setProducts(list);
          saveProducts(list);
        } else if (Array.isArray(list)) {
          return window.vellum.fetch("/v1/x/matjar-products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: clean })
          });
        }
      }).catch(() => {
      });
      setReady(true);
    }, [store]);
    const notify = (m3) => {
      setToast(m3);
      setTimeout(() => setToast(""), 2600);
    };
    const updateProducts = (p3) => {
      setProducts(p3);
      saveProducts(p3);
      try {
        window.vellum.fetch("/v1/x/matjar-products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products: p3 })
        });
      } catch (e3) {
      }
    };
    const updateCart = (c3) => {
      setCart(c3);
      saveCart(c3);
    };
    const updateOrders = (o3) => {
      setOrders(o3);
      saveOrders(o3);
    };
    const updateDeliveryFee = (n2) => {
      setDeliveryFeeState(n2);
      saveFee(n2);
    };
    const toggleFav = (id) => {
      const has = favs.includes(id);
      const f4 = has ? favs.filter((x2) => x2 !== id) : [...favs, id];
      setFavs(f4);
      saveFavs(f4);
      notify(has ? "أُزيل من المفضلة" : "أُضيف إلى المفضلة ♥");
    };
    const addToCart = (id, qty) => {
      const c3 = [...cart];
      const ex = c3.find((x2) => x2.id === id);
      if (ex) ex.qty += qty;
      else c3.push({ id, qty });
      updateCart(c3);
      notify("أُضيف إلى السلة ✓");
    };
    if (!ready) return /* @__PURE__ */ u3("div", { class: "loading", children: "جارٍ التحميل…" });
    const cartCount = cart.reduce((s3, x2) => s3 + x2.qty, 0);
    if (!store) return /* @__PURE__ */ u3(StoreGate, { onEnter: (id, seedCat) => {
      localStorage.setItem(STORE_KEY, id);
      if (!String(id).startsWith("trial-")) try {
        localStorage.setItem("matjar-multi-owned", "1");
      } catch {
      }
      try {
        sessionStorage.setItem("matjar-logged-in", "1");
      } catch (e3) {
      }
      window.STORE_ID = id;
      if (seedCat) {
        try {
          localStorage.setItem("matjar-multi-cat", seedCat);
        } catch {
        }
        seedStoreProducts(id, seedCat);
      }
      setStore(id);
    } });
    return /* @__PURE__ */ u3("div", { class: "app", children: [
      /* @__PURE__ */ u3("main", { class: "main", children: [
        shopMsg && tab !== "admin" && !sel && !zoom && /* @__PURE__ */ u3("div", { class: "shop-msg", children: [
          /* @__PURE__ */ u3("span", { class: "shop-msg-txt", children: shopMsg.text }),
          /* @__PURE__ */ u3("button", { class: "shop-msg-x", onClick: dismissMsg, children: "✕" })
        ] }),
        tab === "home" && /* @__PURE__ */ u3(Home, { products, favs, toggleFav, onOpen: setSel, notify }),
        tab === "cart" && /* @__PURE__ */ u3(CartView, { products, cart, setCart: updateCart, orders, setOrders: updateOrders, notify, deliveryFee, onHome: () => setTab("home") }),
        tab === "admin" && /* @__PURE__ */ u3(Admin, { onExitStore: () => {
          localStorage.removeItem(STORE_KEY);
          setStore(null);
        }, products, setProducts: updateProducts, orders, setOrders: updateOrders, notify, deliveryFee, setDeliveryFee: updateDeliveryFee, onZoom: setZoom })
      ] }),
      /* @__PURE__ */ u3("nav", { class: "bnav", children: [
        /* @__PURE__ */ u3("button", { class: "bnav-btn" + (tab === "home" ? " on" : ""), onClick: () => setTab("home"), children: [
          /* @__PURE__ */ u3("span", { class: "bnav-ico", children: "🛍️" }),
          /* @__PURE__ */ u3("span", { children: "الرئيسية" })
        ] }),
        /* @__PURE__ */ u3("button", { class: "bnav-btn" + (tab === "cart" ? " on" : ""), onClick: () => setTab("cart"), children: [
          /* @__PURE__ */ u3("span", { class: "bnav-ico", children: [
            "🛒",
            cartCount > 0 && /* @__PURE__ */ u3("b", { class: "bnav-badge", children: cartCount })
          ] }),
          /* @__PURE__ */ u3("span", { children: "السلة" })
        ] }),
        /* @__PURE__ */ u3("button", { class: "bnav-btn" + (tab === "admin" ? " on" : ""), onClick: () => setTab("admin"), children: [
          /* @__PURE__ */ u3("span", { class: "bnav-ico", children: "🧰" }),
          /* @__PURE__ */ u3("span", { children: "لوحة المتجر" })
        ] })
      ] }),
      sel && /* @__PURE__ */ u3(ProductSheet, { product: sel, favs, toggleFav, onClose: () => setSel(null), onAdd: addToCart, onZoom: setZoom }),
      zoom && /* @__PURE__ */ u3("div", { class: "zoom-backdrop", onClick: () => setZoom(null), children: [
        /* @__PURE__ */ u3("img", { src: zoom, alt: "" }),
        /* @__PURE__ */ u3("span", { class: "zoom-hint", children: "اضغط في أي مكان للرجوع" })
      ] }),
      toast && /* @__PURE__ */ u3("div", { class: "toast", children: toast })
    ] });
  }

  // src/main.tsx
  var STORE_KEY2 = "matjar-multi-store";
  window.STORE_ID = localStorage.getItem(STORE_KEY2) || "main";
  var _vf = window.vellum.fetch.bind(window.vellum);
  window.vellum.fetch = (url, opts = {}) => {
    if (typeof url === "string" && url.startsWith("/v1/x/matjar-")) {
      opts.headers = { ...opts.headers || {}, "x-matjar-store": localStorage.getItem(STORE_KEY2) || "main" };
    }
    return _vf(url, opts);
  };
  J(/* @__PURE__ */ u3(App, {}), document.getElementById("app"));
})();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STACK = void 0;
exports.sort = sort;
/**
 * Stack names for package dispatch.
 */
exports.STACK = {
    STANDARD: "STANDARD",
    SPECIAL: "SPECIAL",
    REJECTED: "REJECTED",
};
const BULKY_VOLUME_CM3 = 1000000;
const BULKY_DIMENSION_CM = 150;
const HEAVY_MASS_KG = 20;
/**
 * Determines if a package is bulky.
 * Bulky: volume >= 1,000,000 cm³ OR any dimension >= 150 cm.
 */
function isBulky(width, height, length) {
    const volume = width * height * length;
    return (volume >= BULKY_VOLUME_CM3 ||
        width >= BULKY_DIMENSION_CM ||
        height >= BULKY_DIMENSION_CM ||
        length >= BULKY_DIMENSION_CM);
}
/**
 * Determines if a package is heavy (mass >= 20 kg).
 */
function isHeavy(mass) {
    return mass >= HEAVY_MASS_KG;
}
/**
 * Dispatches a package to the correct stack based on volume and mass.
 *
 * @param width - width in cm
 * @param height - height in cm
 * @param length - length in cm
 * @param mass - mass in kg
 * @returns Stack name: "STANDARD" | "SPECIAL" | "REJECTED"
 *
 * - STANDARD: not bulky and not heavy
 * - SPECIAL: heavy or bulky (but not both)
 * - REJECTED: both heavy and bulky
 */
function sort(width, height, length, mass) {
    const bulky = isBulky(width, height, length);
    const heavy = isHeavy(mass);
    if (heavy && bulky) {
        return exports.STACK.REJECTED;
    }
    if (heavy || bulky) {
        return exports.STACK.SPECIAL;
    }
    return exports.STACK.STANDARD;
}

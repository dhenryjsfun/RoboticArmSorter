/**
 * Stack names for package dispatch.
 */
export declare const STACK: {
    readonly STANDARD: "STANDARD";
    readonly SPECIAL: "SPECIAL";
    readonly REJECTED: "REJECTED";
};
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
export declare function sort(width: number, height: number, length: number, mass: number): string;

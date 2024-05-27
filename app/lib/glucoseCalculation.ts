import GlucoseDataType from "../type/GlucoseDataType";

/**
 * @author: Ziyin ZENG
 * @description: take out all glucose value from a list of GlucoseData
 *
 * @param: {glucoseDataList: GlucoseDataType[]}
 * @returns: {number[]}
 */
export const getAllGlucoseValue = (glucoseDataList: GlucoseDataType[]): number[] => {
    return glucoseDataList.map(gd => +gd.glucoseValue);     // this '+' before gd.glucoseValue is to translate string into number
}

/**
 * @author: Ziyin ZENG
 * @description: calculate average glucose value
 *
 * @param: {glucoseList: number[]}
 * @returns: {number}
 */
export const averageGlucose = (glucoseList: number[]): string => { 
    if(!glucoseList.length) return '0';
    return (glucoseList.reduce((sum, curr) => sum + curr) / glucoseList.length).toFixed(1);
};

/**
 * @author: Ziyin ZENG
 * @description: calculate TIR
 *
 * @param: {glucoseList: number[]}
 * @returns: {number}
 */
export const tirGlucose = (glucoseList: number[]): string => {
    if(!glucoseList.length) return '0.0%';
    const inRangeValueList = glucoseList.filter(v => v >= 5 && v <= 7);
    return (inRangeValueList.length / glucoseList.length * 100).toFixed(1) + '%';
}

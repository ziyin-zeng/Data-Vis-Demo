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
export const averageGlucose = (glucoseList: number[]): number => { 
    return glucoseList.reduce((sum, curr) => sum + curr) / glucoseList.length;
};



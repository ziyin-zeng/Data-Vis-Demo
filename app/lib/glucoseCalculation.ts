import GlucoseDataType from "../type/GlucoseDataType";

/**
 * @author: Ziyin ZENG
 * @description: take out all glucose value from a list of GlucoseData
 *
 * @param: {glucoseDataList: GlucoseDataType[]}
 * @returns: {number[]}
 */
export const getAllGlucoseValue = (glucoseDataList: GlucoseDataType[]): number[] => {
    return glucoseDataList.map(gd => +gd.glucose_value);     // this '+' before gd.glucoseValue is to translate string into number
}

/**
 * @author: Ziyin ZENG
 * @description: take out all glucose value & date from a list of GlucoseData
 *
 * @param: {glucoseDataList: GlucoseDataType[]}
 * @returns: {number[][]}
 */
export const getAllGlucoseValueAndDate = (glucoseDataList: GlucoseDataType[]): number[][] => {
    return glucoseDataList.map(gd => [+gd.createdAt, +gd.glucose_value]);     // this '+' before gd.glucoseValue is to translate string into number
}

/**
 * @author: Ziyin ZENG
 * @description: calculate average glucose value
 *
 * @param: {glucoseList: number[]}
 * @returns: {number}
 */
export const averageGlucose = (glucoseList: number[]): string => {
    if (!glucoseList.length) return '0';
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
    if (!glucoseList.length) return '0.0%';
    const inRangeValueList = glucoseList.filter(v => v >= 5 && v <= 7);
    return (inRangeValueList.length / glucoseList.length * 100).toFixed(1) + '%';
}

/**
 * @author: Ziyin ZENG
 * @description: mock glucose data
 *
 * @param: {}
 * @returns: {json}
 */
export const mockGlucose = () => {
    let base = +new Date(2024, 4, 28);
    let fiveMin = 5 * 60 * 1000;

    let data: [{
        id: number,
        createdAt: number,
        glucose_value: number | null,
        study_id: string
    }] = [{
        id: 1,
        createdAt: base,
        glucose_value: 5.2,
        study_id: "1",
    }];

    for (let i = 1; i < 5000; i++) {
        let now = +new Date(base += fiveMin);

        let lastData = (data[i - 1].glucose_value ? data[i - 1].glucose_value : data[i - 2].glucose_value) as number;
        let nextData = +((Math.random() - 0.5) * 2 + lastData).toFixed(1);

        if (nextData >= 15) {
            data.push({
                id: i+1,
                createdAt: now,
                glucose_value: 15,
                study_id: "1"
            });
        } else if (nextData <= 3 || !nextData) {
            data.push({
                id: i+1,
                createdAt: now,
                glucose_value: 3,
                study_id: "1"
            });
        } else if (Math.round(Math.random() * 100) > 95) {
            data.push({
                id: i+1,
                createdAt: now,
                glucose_value: null,
                study_id: "1"
            });
        } else {
            data.push({
                id: i+1,
                createdAt: now,
                glucose_value: nextData,
                study_id: "1"
            });
        }
    }
    return JSON.stringify(data);
}
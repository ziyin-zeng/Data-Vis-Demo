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
 * @description: take out all glucose value & date from a list of GlucoseData
 *
 * @param: {glucoseDataList: GlucoseDataType[]}
 * @returns: {number[][]}
 */
export const getAllGlucoseValueAndDate = (glucoseDataList: GlucoseDataType[]): number[][] => {
    return glucoseDataList.map(gd => [+gd.createdAt, gd.glucoseValue]);     // this '+' before gd.glucoseValue is to translate string into number
}

/**
 * @author: Ziyin ZENG
 * @description: take out all glucose value of the recent 7 days from the return of getAllGlucoseValueAndDate
 *
 * @param: {glucoseDataList: GlucoseDataType[]}
 * @returns: {number[][]}
 */
 export const getSevenDaysGlucoseValueAndDate = (glucoseDataList: number[][]): number[][] => {
    const result = [];
    for(let i = 0; i < 7; i++) {
        let glucoseDataOneDayList = glucoseDataList.slice(i*48, i*48 + 48);
        result.push(glucoseDataOneDayList.map(gd => gd[1]));
    }
    return result;
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
    const inRangeValueList = glucoseList.filter(v => v >= 4 && v <= 8);
    return (inRangeValueList.length / glucoseList.length * 100).toFixed(1);
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
        glucoseValue: number | null,
        studyId: number
    }] = [{
        id: 1,
        createdAt: base,
        glucoseValue: 5.9,
        studyId: 2,
    }];

    for (let i = 1; i < 5000; i++) {
        let now = +new Date(base += fiveMin);

        let lastData = (data[i - 1].glucoseValue ? data[i - 1].glucoseValue : data[i - 2].glucoseValue) as number;
        let nextData = +((Math.random() - 0.5) * 2 + lastData).toFixed(1);

        if (nextData >= 15) {
            data.push({
                id: i + 1,
                createdAt: now,
                glucoseValue: 15,
                studyId: 2
            });
        } else if (nextData <= 3 || !nextData) {
            data.push({
                id: i + 1,
                createdAt: now,
                glucoseValue: 3,
                studyId: 2
            });
        } else if (Math.round(Math.random() * 100) > 95) {
            data.push({
                id: i + 1,
                createdAt: now,
                glucoseValue: null,
                studyId: 2
            });
        } else {
            data.push({
                id: i + 1,
                createdAt: now,
                glucoseValue: nextData,
                studyId: 2
            });
        }
    }
    return JSON.stringify(data);
}
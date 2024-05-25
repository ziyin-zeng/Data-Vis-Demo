// Always should be updated after the API is changed 
interface GlucoseDataType {
    id : string,
    value : number,
    time : Date,
    studyId : string,   // each glucose value has a unique corresponding study, a study could however have a set of glucose value
}

export default GlucoseDataType;
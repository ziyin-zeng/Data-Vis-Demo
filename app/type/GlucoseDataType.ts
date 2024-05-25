// Always should be updated after the API is changed 
interface GlucoseDataType {
    id : string,
    glucoseValue : number,
    createdAt : string,
    studyId : string,   // each glucose value has a unique corresponding study, a study could however have a set of glucose value
}

export default GlucoseDataType;
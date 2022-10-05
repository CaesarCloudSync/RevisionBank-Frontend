export const Bookids:any = [{'label': 'Pure Mathematics 1', 'value': 0}, {'label': 'Pure Mathematics 2', 'value': 1}, {'label': 'Statistics', 'value': 2}, {'label': 'Mechanics', 'value': 3}, {'label': 'Statistics and Mechanics', 'value': 4},{'label': 'Core Mathematics', 'value': 5},{'label': 'Decision Maths', 'value': 6},{'label': 'Further Pure Mathematics', 'value': 7}]

const EdexcelAlevel= {"Core Mathematics": {"start":0,"end":39},"Decision Mathematics":{"start":0,"end":17},"Mechanics":{"start":0,"end":53},"Further Pure Mathematics":{"start":0,"end":28},"Pure Mathematics 1":{"start":0,"end":5},"Pure Mathematics 2":{"start":0,"end":5},"Statistics":{"start":0,"end":39},"Statistics and Mechanics":{"start":0,"end":"1"}}
const EdexcelASlevel = {"Mechanics":{"start":0,"end":3},"Pure Mathematics 1": {"start":0,"end":3},"Statistics":{"start":0,"end":3}}
const EdexcelAllPosibilities =  {"All":{"start":0,"end":53}}
// Even is Question Papers and Odd indexes are markschemes
function EdexcelGenerateSelect(edexcelyear:any){
   const edexcelselect = []
    for (let i = edexcelyear.start; i< edexcelyear.end + 1; i++) { 
        if (i % 2 === 0){
        edexcelselect.push({'label':`${i} qp`,'value':i})
        }
        else{
            edexcelselect.push({'label':`${i} ms`,'value':i})
        }
    }
    return edexcelselect
    //A Level Pure Mathematics 1 0 qs.pdf
   

}
export const coreselect:any = EdexcelGenerateSelect(EdexcelAlevel["Core Mathematics"])
export const decisionselect:any = EdexcelGenerateSelect(EdexcelAlevel["Decision Mathematics"])
export const mechanicselect:any = EdexcelGenerateSelect(EdexcelAlevel["Mechanics"])
export const furtherpureselect:any = EdexcelGenerateSelect(EdexcelAlevel["Further Pure Mathematics"])
export const pureoneselect:any = EdexcelGenerateSelect(EdexcelAlevel["Pure Mathematics 1"])
export const puretwoselect:any = EdexcelGenerateSelect(EdexcelAlevel["Pure Mathematics 2"])
export const statisticsselect:any = EdexcelGenerateSelect(EdexcelAlevel["Statistics"])
//export const statisticnmechanicssselect = EdexcelGenerateSelect(EdexcelAlevel["Statistics and Mechanics"],"Statistics and Mechanics")
export const EdexcelSelect:any = {"Core Mathematics":coreselect,"Decision Mathematics":decisionselect,"Mechanics":mechanicselect,"Further Pure Mathematics":furtherpureselect,"Pure Mathematics 1":pureoneselect,"Pure Mathematics 2":puretwoselect,"Statistics":statisticsselect}
export const EdexcelIndexAll:any = EdexcelGenerateSelect(EdexcelAllPosibilities["All"])
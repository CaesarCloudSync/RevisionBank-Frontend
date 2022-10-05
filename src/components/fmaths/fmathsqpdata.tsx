export function getTopics(){
    // Data collected
    const topics = {
        "c":["Algebra","Coordinate Geometry","Curve Sketching","Polynomials","Surds","Simultaneous Equations","Transformation of Graphs","Differentiation","Integration","Logarithms & Exponential Functions","Sequences & Series","Trigonometry","Exponentials & Natural Logarithms","Functions","Proof","Differential Equations"," Parametric Equations","Vectors","Binomial Expansion"],
        "m":["Kinematics","Equilibrium & Components","Newton's Laws of Motion","Projectiles","Vectors","Dynamics","Centres of Mass","Collisions","Modelling","Moments","Work and Energy","Circular Motion"],
        "s" :["Binomial Distribution & Hypothesis Testing","Data Presentation & Interpretation","Discrete Random Variables","Probability","Statictical Modeling & Sampling Techniques","Correlation and regression","Discrete distributions","Discrete random variables","Continuous distributions","Continuous random variable","Discrete","Confidence intervals","Hypothesis test"],
        "fp":["Complex Numbers","Matrices","Proof by Induction","Roots of Polynomial Equations","Summation of Series","Algebra","De Moivre's Theorems","Differentiation","Functions","Graphs","Integration","Maclaurin","Coordinate Systems","Numerical Methods","Differential Equations","Groups","Differentiation","Vectors","Further Matrcix Algebra","Series"],
        "d" :["Algorithms","Critical Path Analysis","Linear Programming","Miniumum Connectors","Route Inspection","Dijkstra","Matchings","Sorting","Tree","Graph","Allocation","Dynamic Programming","Game Theory","Network Flows","Simplex"]
    }
    // Put into individual arrays for specific format of react select
    const core = topics["c"].map((top,index) => {return {'label': top, 'value': index}})
    const mechanics = topics["m"].map((top,index) => {return {'label': top, 'value': index}})
    const statistics = topics["s"].map((top,index) => {return {'label': top, 'value': index}})
    const furtherpure = topics["fp"].map((top,index) => {return {'label': top, 'value': index}})
    const decisionmaths = topics["d"].map((top,index) => {return {'label': top, 'value': index}})
    const allist = topics["c"].concat(topics["m"]).concat(topics["s"]).concat(topics["fp"]).concat(topics["d"])
    const allselect = allist.map((top,index) => {return {'label': top, 'value': index}})
    //console.log(allselect)
    return [core,mechanics,statistics,furtherpure,decisionmaths,allselect]
}

export const Bookids:any = [{'label': 'Core Maths', 'value': 0}, {'label': 'Mechanics', 'value': 1}, {'label': 'Statistics', 'value': 2}, {'label': 'Further Pure', 'value': 3}, {'label': 'Decision Maths', 'value': 4}]

export const [core,mechanics,statistics,furtherpure,decisionmaths,TopicAll] = getTopics()
export const TopicsSelect:any = {"fmathsqpselect":{'Core Maths':core,'Mechanics':mechanics,'Statistics':statistics,'Further Pure':furtherpure,'Decision Maths':decisionmaths}}

//console.log(core)
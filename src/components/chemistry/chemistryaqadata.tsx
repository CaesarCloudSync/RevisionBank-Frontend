export default function chemistryaqaselectcollect() {
    const chemistrytitles = ["November 2020 A-Level Chemistry  Paper 1: Inorganic and Physical Chemistry (7405/1)", "November 2020 A-Level Chemistry  Paper 2: Organic and Physical Chemistry (7405/2)", "November 2020 A-Level Chemistry  Paper 3: (7405/3)", "June 2019 A-Level Chemistry  Paper 1: Inorganic and Physical Chemistry (7405/1)", "June 2019 A-Level Chemistry  Paper 2: Organic and Physical Chemistry (7405/2)", "June 2019 A-Level Chemistry  Paper 3: (7405/3)", "June 2018 A-Level Chemistry  Paper 1: Inorganic and Physical Chemistry (7405/1)", "June 2018 A-Level Chemistry  Paper 2: Organic and Physical Chemistry (7405/2)", "June 2018 A-Level Chemistry  Paper 3: (7405/3)", "A-Level Chemistry  Paper 1: Inorganic and Physical Chemistry (7405/1) Specimen", "A-Level Chemistry  Paper 2: Organic and Physical Chemistry (7405/2)", "A-Level Chemistry  Paper 3: (7405/3)"]
    const  chemistryaqaselect = []
    for (let i = 0; i< chemistrytitles.length; i++) { 
        chemistryaqaselect.push({'label':`${chemistrytitles[i]}`,'value':i})

    }
    return chemistryaqaselect
    

}

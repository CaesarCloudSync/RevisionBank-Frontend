export default function biologyaqaselectcollect() {
    const biologypapertitles = ['November 2020 - A-Level Biology  Paper 1 (7402/1)', 'November 2020 - A-Level Biology  Paper 2 (7402/2)', 'November 2020 - A-Level Biology  Paper 3 (7402/3)', 'June 2019 - A-Level Biology  Paper 1 (7402/1)', 'June 2019 - A-Level Biology  Paper 2 (7402/2)', 'June 2019 - A-Level Biology  Paper 3 (7402/3)', 'June 2018 - A-Level Biology  Paper 1 (7402/1)', 'June 2018 - A-Level Biology  Paper 2 (7402/2)', 'June 2018 - A-Level Biology  Paper 3 (7402/3)', 'June 2017 - A-Level Biology  Paper 1 (7402/1)', 'June 2017 - A-Level Biology  Paper 2 (7402/2)', 'June 2017 - A-Level Biology  Paper 3 (7402/3)', 'A-Level Biology  Paper 1 (7402/1)', 'A-Level Biology  Paper 2 (7402/2)', 'A-Level Biology  Paper 3 (7402/3)']
    const  biologyaqaselect = []
    for (let i = 0; i< biologypapertitles.length; i++) { 
        biologyaqaselect.push({'label':`${biologypapertitles[i]}`,'value':i})

    }
    return biologyaqaselect
    

}
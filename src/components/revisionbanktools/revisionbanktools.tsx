import './revisionbanktools.css'
import HeaderComponent from '../headers/headerhome';
import { Helmet } from 'react-helmet';
export default function RevissNameionBankToolssName(){
    return(
        <div className="limiter">
		<Helmet>
		<title>RevisionBank Tools</title>
        <meta
          name="description"
          content="See the question papers and markschemes available. An unlimited number of revision cards that can be scheduled every 60 minutes to revise on-the-go for AS and A Level subjects."
        />
        <meta
          name="keywords"
          content="RevisionBank tools,Revision Bank tools,RevisionBank scheduler,Revision card scheduler,Exam papers, practice questions, practice papers, Exam questions, topic questions, maths questions,maths practice questions, maths practice papers, further maths practice papers, further maths practice questions, further maths solution banks, maths solution banks, a level maths questions, a level maths practice papers, a level physics question papers, a level physics practice questions, a level physics mark schemes, a level aqa physics question papers, "
        />
	</Helmet>
        <HeaderComponent></HeaderComponent>
		<div style={{position:"relative",top:"30px"}}>
		<div style={{display:"flex",justifyContent:"center"}}>
			<h1 style={{color:"white"}}>RevisionBanks</h1>
		</div>
		</div>
		<div className='containerposition'>
			<div className="container-table100">
				<div style={{marginBottom:"20px"}} className="wrap-table100">
						<div className="table100">
							<table>
								<thead>
									<tr className="table100-head">
										<th className="column1-small">RevisionBank Scheduler</th>
										<th className="column2-small">Number of Revision Cards</th>
										<th className="column3-small">Revision Intervals</th>
										<th className="column4-small">Number of Scheduled Cards</th>
									</tr>
								</thead>
								<tbody>
											<tr>
												<td className="column1-small">RevisionBank Scheduler</td>
												<td className="column2-small">Unlimited</td>
												<td className="column3-small">60 Minutes</td>
												<td className="column4-small">3-5 Cards Limit</td>
											</tr>
								</tbody>
							</table>
						</div>
				</div>
				<div className="wrap-table100">
					<div className="table100">
						<table>
							<thead>
								<tr className="table100-head">
									<th className="column1">RevisionBanks</th>
									<th className="column2">Exam Boards</th>
									<th className="column3">Chapters/Books</th>
									<th className="column4">AS/A Level</th>
									<th className="column5">Number of papers</th>
									<th className="column6">Sent to email</th>
								</tr>
							</thead>
							<tbody>
									<tr>
										<td className="column1">Further Maths & Maths Exam Papers</td>
										<td className="column2">Edexcel</td>
										<td className="column3">Core Mathematics,Pure Mathematics 1 & 2,Statistics and Mechanics, Decision Maths, Further Pure Mathematics </td>
										<td className="column4">&#10004;</td>
										<td className="column5">200+ papers</td>
										<td className="column6">&#10004;</td>
									</tr>
									<tr>
										<td className="column1">Further Maths & Maths Topic papers</td>
										<td className="column2">Edexcel,OCR,AQA</td>
										<td className="column3">Pure Maths,Statistics and Mechanics and Further Maths </td>
										<td className="column4">&#10004;</td>
										<td className="column5">200+ papers</td>
										<td className="column6">&#10004;</td>
									</tr>
									<tr>
										<td className="column1">Further Maths & Maths and Solution Banks</td>
										<td className="column2">Edexcel</td>
										<td className="column3">Pure Maths,Statistics and Mechanics and Further Maths </td>
										<td className="column4">&#10004;</td>
										<td className="column5">150+ papers</td>
										<td className="column6">&#10004;</td>
									</tr>
									<tr>
										<td className="column1">Physics Question Papers and Mark Schemes</td>
										<td className="column2">AQA</td>
										<td className="column3">Section 1 - Section 13.5</td>
										<td className="column4">&#10004;</td>
										<td className="column5">100+ papers</td>
										<td className="column6">&#10004;</td>
									</tr>
									<tr>
										<td className="column1">Biology OCR Practice Question Mark Scheme</td>
										<td className="column2">OCR</td>
										<td className="column3">Chapter 2 - Chapter 31</td>
										<td className="column4">&#10004;</td>
										<td className="column5">29 Mark Schemes</td>
										<td className="column6">&#10004;</td>
									</tr>
									<tr>
										<td className="column1">Physics OCR Practice Question Mark Schemes</td>
										<td className="column2">OCR</td>
										<td className="column3">Chapter 3 - Chapter 24</td>
										<td className="column4">&#10004;</td>
										<td className="column5">21 Mark Schemes</td>
										<td className="column6">&#10004;</td>
									</tr>
									<tr>
										<td className="column1">Chemistry OCR Practice Question Mark Scheme</td>
										<td className="column2">OCR</td>
										<td className="column3">Chapter 2 - Chapter 26</td>
										<td className="column4">&#10004;</td>
										<td className="column5">24 Mark Schemes</td>
										<td className="column6">&#10004;</td>
									</tr>
									
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}

import './revisionbanktools.css'
import HeaderComponent from '../headers/headerhome';
export default function RevissNameionBankToolssName(){
    return(
        <div className="limiter">
        <HeaderComponent></HeaderComponent>
		<div style={{position:"relative",top:"30px"}}>
		<div style={{display:"flex",justifyContent:"center"}}>
			<h1 style={{color:"white"}}>RevisionBanks</h1>
		</div>
		</div>
		<div className='containerposition'>
			<div className="container-table100">
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
										<td className="column1">Further Maths & Maths Question papers</td>
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
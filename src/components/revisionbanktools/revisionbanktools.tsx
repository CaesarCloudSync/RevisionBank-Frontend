
import './revisionbanktools.css'
import HeaderComponent from '../headers/headerhome';
export default function RevissNameionBankToolssName(){
    return(
        <div className="limiter">
        <HeaderComponent></HeaderComponent>
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100">
					<table>
						<thead>
							<tr className="table100-head">
								<th className="column1">Exam Boards</th>
								<th className="column2">Subjects</th>
								<th className="column3">Topics</th>
								<th className="column4">AS/A Level</th>
								<th className="column5">Number of papers</th>
								<th className="column6">Total</th>
							</tr>
						</thead>
						<tbody>
								<tr>
									<td className="column1">Edexcel</td>
									<td className="column2">Maths Solution Bank</td>
									<td className="column3">Pure Maths,Statistics and Mechanics and Further Maths </td>
									<td className="column4">&#10004;</td>
									<td className="column5">100+ papers</td>
									<td className="column6">$999.00</td>
								</tr>
								<tr>
									<td className="column1">AQA</td>
									<td className="column2">200397</td>
									<td className="column3">SamssNameung S8 Black</td>
									<td className="column4">$756.00</td>
									<td className="column5">1</td>
									<td className="column6">$756.00</td>
								</tr>
								<tr>
									<td className="column1">OCR</td>
									<td className="column2">200396</td>
									<td className="column3">Game ConssNameole Controller</td>
									<td className="column4">$22.00</td>
									<td className="column5">2</td>
									<td className="column6">$44.00</td>
								</tr>
								
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
    )
}
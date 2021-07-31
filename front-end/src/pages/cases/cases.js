import { useHistory } from "react-router-dom";
import { DataTable, Button } from '../../components';
import customStyles from './cases.module.scss';

const Cases = () => {
    const history = useHistory();

    const initConfig={
        name:'Your Cases',
        header: ['Case ID', 'Case Title', 'Date', 'Status'],
        fieldnames:[{n:'caseID',f:'t'},{n:'caseTitle',f:'t'},{n:'caseDate',f:'t'},{n:'status',f:'t'}],
        actions:[{fn:'view',path:'/app/dashboard/case/thread'}, {fn:'respond',path:''}]
    }

    const data = [
        {'caseID':1873999, 'caseTitle': 'Relationship', 'caseDate':'20-12-2020', 'status':'Responded'},
        {'caseID':7489391, 'caseTitle': 'Marriage', 'caseDate':'20-12-2020', 'status':'Not Responded'},
        {'caseID':3462781, 'caseTitle': 'Drug Abuse', 'caseDate':'20-12-2020', 'status':'Not Responded'},
        {'caseID':9372781, 'caseTitle': 'Domestic Abuse', 'caseDate':'20-12-2020', 'status':'Responded'}
    ]

    const goToNewCase = () => {
        history.push('/app/dashboard/cases/addcase')
    }

    return (
        <div className={customStyles.tickets}>
            <Button btntype="btn" btntext={'Create New Case'} onClick={() => goToNewCase()} style={{width: '150px', marginLeft:'auto', marginBottom: '20px'}}/>
            <DataTable config={initConfig} data={ data } />
        </div>
    )
}


export default Cases;
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Field, Button } from '../../components';
import utilstyle from '../../asset/scss/util.module.scss';
import customStyles from './addcase.module.scss';
import styles from '../../asset/scss/forms.module.scss';
// import VisaIcon from '../../asset/icons/visa.png'; 
// import MasterCardIcon from '../../asset/icons/mastercard.png'; 


const Addcase = () => {
    const history = useHistory()

    const onChange = () => {
        
    }

    const cancel = () => {
        history.push('/app/dashboard/cases')
    }
    return (
        <div className={customStyles.donate}>
            <Card className={utilstyle.card} id={customStyles.payment} style={{maxWidth: "510px"}}>
                <CardHeader className={utilstyle.cardheader}>
                    <h5>Case Details</h5>
                </CardHeader>
                <CardBody className={utilstyle.cardbody}>
                    {/* <div className={customStyles.icons}>
                        <img src={MasterCardIcon} alt="MASTERCARD ICON" />
                        <img src={VisaIcon} alt="VISA ICON" />
                    </div> */}
                    <Field 
                        label={"Case Title"} 
                        id={'title'} 
                        type={'text'} 
                        placeholder={'Drug Abuse'} 
                        fieldtype={'tt'} 
                        onChange={onChange} 
                        required={true} 
                        styles={styles} 
                        style={{ marginBottom:'20px'}}
                        disabled={false}
                    />
                    <Field 
                    label={'Description'} 
                    id={'description'} 
                    type={'text'} 
                    placeholder={'Give a full description of your case'} 
                    fieldtype={'ta'} 
                    onChange={onChange}
                    required={true} 
                    styles={styles} 
                    style={{ marginBottom:'20px'}}
                    disabled={false}
                    rows={"10"}
                    />
                </CardBody>
                <CardFooter className={utilstyle.cardfooter}>
                    <Button btntype="btn btn-clear" btntext={'Cancel'} onClick={() => cancel()} style={{width: "50%", marginRight:10}}/>
                    <Button btntype="btn" btntext={'Save'} style={{width: "50%"}}/>
                </CardFooter>   
            </Card>
        </div>
    )
}


export default Addcase;
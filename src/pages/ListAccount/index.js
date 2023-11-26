import { Link } from 'react-router-dom';
import './styles.scss';

const ListAccount = () => {
    return (
        <div className='listAccount-wrap'>
            <div className='listAccount-container'>
                <div className='account'>
                    <h3>Email : </h3><span>bella@gmail.com</span>
                    <h3>Password : </h3><span>Ab12345!</span>
                </div>
                <div className='account'>
                    <h3>Email : </h3><span>jennifer@gmail.com</span>
                    <h3>Password : </h3><span>Ab12345!</span>
                </div>
                <div className='account'>
                    <h3>Email : </h3><span>iggy@gmail.com</span>
                    <h3>Password : </h3><span>Ab12345!</span>
                </div>
            </div>
            <p>You do have an account ? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default ListAccount;
import './styles.scss';

function Login({ title }) {
    return (
        <div className='form-group'>
            <button
                className="button-control btn btn-circle btn-cyan btn-login"
            >
                { title }
            </button>
        </div>
    );
}

export default Login;
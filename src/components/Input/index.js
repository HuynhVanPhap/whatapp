import { useState } from 'react';
import { EyeIcon, EyeClosedIcon } from '@/icons';
import './styles.scss';

function Input({ type, placeholder, icon }) {
    const [inputType, setInputType] = useState(type);

    const showPassword = () => {
        if (inputType === 'password') {
            setInputType('text');
        } else if (inputType === 'text') {
            setInputType('password');
        }
    }

    return (
        <div className='form-group'>
            <input
                className='input-control'
                type={inputType}
                placeholder={placeholder}
            />

            {typeof(icon) === 'string' && (
                <span className='icon-wrapper' onClick={showPassword}>
                    {inputType === 'password' ? <EyeIcon /> : <EyeClosedIcon />}
                </span>
            )}
        </div>
    );
}

export default Input;
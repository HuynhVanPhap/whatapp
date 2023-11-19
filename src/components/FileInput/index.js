import './styles.scss';

const FileInput = ({ name }) => {
    return (
        <div className='form-group'>
            <input
                type='file'
                name={name}
            />
        </div>
    );
}

export default FileInput;
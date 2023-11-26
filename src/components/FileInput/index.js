import { useState, useRef } from 'react';
import { UserTieIcon } from '@/icons';
import './styles.scss';

const FileInput = ({ name }) => {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const handleSelectFile = () => fileInputRef.current.click();

    const handleOnChangeUpload = (e) => {
        let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png','image/gif','image/bmp'];

        if (e.target.files.length === 0 || allowedExtension.indexOf(e.target.files[0].type) === -1) {
            (image !== null) && setImage(null);
            return false;
        }
        setImage(e.target.files[0]);
    }

    return (
        <div className='form-group image-control'>
            <input
                type='file'
                name={name}
                style={{display: 'none'}}
                ref={fileInputRef}
                onChange={handleOnChangeUpload}
            />
            <div className='image-info'>
                <div className='image-info__preview-wrap' onClick={handleSelectFile}>
                    <div className='image-info__preview'>
                        {(image !== null)
                            ? <img src={URL.createObjectURL(image)} alt={image.name} />
                            : <UserTieIcon />
                        }
                    </div>
                </div>
                <div className='image-info__name'>
                    {(image?.name) ? (<span className='three-dot'>{image.name}</span>) : 'Select image upload...'}
                </div>
            </div>
        </div>
    );
}

export default FileInput;
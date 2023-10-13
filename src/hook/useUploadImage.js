import { useState, useRef } from 'react';

const useUploadImage = () => {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleSelectFile = () => fileInputRef.current.click();

    const handleOnChangeUpload = (e) => {
        const files = e.target.files;

        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            // if (files[i].type.split('/')[0] !== 'image') continue; // Validate type file
            if (!images.some((e) => e.name == files[i].name)) {
                setImages(prevImages => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ])
            }
        }
    }

    const removeImage = (index) => {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    }

    return [images, fileInputRef, handleSelectFile, handleOnChangeUpload, removeImage];
}

export default useUploadImage;
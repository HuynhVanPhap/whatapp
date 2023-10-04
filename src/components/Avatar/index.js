import './styles.scss';

function Avatar({ name, width, height }) {
    return (
        <div className="avatarWrap">
            <div className='avatar_img' style={{width: width, height: height}}>
                <img
                    src={name}
                    alt="Avatar"
                    width={width}
                    height={height}
                >
                </img>
                <span className='onlineIcon'></span>
            </div>
        </div>
    );
}

export default Avatar;
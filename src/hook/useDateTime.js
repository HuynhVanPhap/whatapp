const useDateTime = () => {
    const dateNow = new Date();

    const formatTimeLastMessage = (input) => {
        const date = new Date(input);

        if (dateNow.getFullYear() - date.getFullYear() !== 0) {
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        }

        if (dateNow.getDate() - date.getDate() !== 0) {
            return `${date.getDate()}/${date.getMonth()+1}`;
        }

        const minutes = (date.getMinutes() <= 9) ? `0${date.getMinutes()}` : date.getMinutes();

        return `${date.getHours()}:${minutes}`;
    }

    return [
        formatTimeLastMessage,
    ];
}

export default useDateTime;
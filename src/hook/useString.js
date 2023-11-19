const useString = () => {
    const upperName = (name) => {
        let nameArr = name.split(" ");
        return nameArr.map(char => char.length !== 0 && char.replace(/^./, char[0].toUpperCase())).join(" ");
    }

    return [
        upperName
    ];
}

export default useString;
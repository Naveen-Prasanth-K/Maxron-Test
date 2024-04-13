
const DtSentenceCase = (item) => {
    return item != "" && item != "null" && item[0]?.toUpperCase() + item?.slice(1)?.toLowerCase();
}

export default DtSentenceCase

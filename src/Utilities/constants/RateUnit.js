
const RateUnit = (item) => {
    switch (item.landTypeName) {
        case 'Layout':
            return `₹ ${item?.approximateRate} / ${item?.landAreaTypeName}`;
        case 'Agriculture Land':
            return `₹ ${(item?.approximateRate / 100000).toFixed(2)} L`;
        case 'Empty Land':
            return `₹ ${(item?.approximateRate / 100000).toFixed(2)} L`;
        case 'Apartment':
            return `₹ ${(item?.approximateRate / 100000).toFixed(2)} L`;
        case 'Individual House':
            return `₹ ${(item?.approximateRate / 100000).toFixed(2)} L`;
        default:
            return `L`;
    }
};

export default RateUnit


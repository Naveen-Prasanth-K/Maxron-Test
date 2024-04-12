export const GOOGLE_API_KEY = "AIzaSyCSypOznNZ_lY7djECM7QQkJhvxyAQkA04";

// export const URL = "https://www.sreeragu.com/realestate/api/";
export const URL = "https://snapcodetech.com/maxron-develop/api/v1/";

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
}

export const layOutUrl = "https://firebasestorage.googleapis.com/v0/b/myproperty-src.appspot.com/o/Images%2Fplot1.png?alt=media&token=04c1ac1d-fcf5-4026-8410-6eb64339063d";
export const agriUrl = "https://firebasestorage.googleapis.com/v0/b/myproperty-src.appspot.com/o/Images%2FAgri%20Land%202.webp?alt=media&token=7139664a-adf7-46b8-9170-fd7355db1b17";
export const emptyUrl = "https://firebasestorage.googleapis.com/v0/b/myproperty-src.appspot.com/o/Images%2FEmpty%20Land.jpg?alt=media&token=97c64053-0192-4ee9-8828-595b7411d053";
export const houseUrl = "https://firebasestorage.googleapis.com/v0/b/myproperty-src.appspot.com/o/Images%2FIndiviual%20House.jpg?alt=media&token=353b0401-4223-4903-93af-cbf10c42744f";
export const AprtmentUrl = "https://firebasestorage.googleapis.com/v0/b/myproperty-src.appspot.com/o/Images%2FAppartment.jpg?alt=media&token=7524573a-d998-46e8-a3b6-c11897c943e1";

export const getLandUrl = (landType, type) => {
    if (landType == 1) {
        return layOutUrl;
    } else if (landType == 2 && type == 1) {
        return houseUrl;
    } else if (landType == 2 && type == 2) {
        return AprtmentUrl;
    } else if (landType == 3 && type == 1) {
        return agriUrl;
    } else if (landType == 3 && type == 2) {
        return emptyUrl;
    } else {
        return layOutUrl;
    }
}

export const rateUnit = (item) => {
    switch (item.layoutType) {
        case 1:
            return `₹ ${item?.approximateRate} / ${item?.landAreaTypeName}`;
        case 2:
            return `₹ ${(item?.approximateRate / 100000).toFixed(2)} L`;
        case 3:
            return `₹ ${(item?.approximateRate / 100000).toFixed(2)} L`;
        default:
            return `L`;
    }
}



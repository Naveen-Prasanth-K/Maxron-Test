import { useLayoutEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const WinDimensions = () => {

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    useLayoutEffect(() => {
        const updateLayout = () => {
            setScreenWidth(Dimensions.get('window').width);
            setScreenHeight(Dimensions.get('window').height);
        };
        updateLayout();
        Dimensions.addEventListener("change", updateLayout);
    }, []);
    return { screenWidth, screenHeight };

}

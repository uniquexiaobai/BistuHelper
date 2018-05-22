import ButtonStyle from 'antd-mobile/lib/button/style/index.native';
import {colors} from '../constants/colors';

export const CustomSmallButtonStyle = {
    ...ButtonStyle, 
    smallRaw: {
        height: 30,
        paddingLeft: 25,
        paddingRight: 25,
    },
    smallRawText: {
        fontSize: 14,
    },
    ghostRaw: {
        backgroundColor: 'transparent',
        borderColor: colors.brand_primary,
    },
    primaryRaw: {
        backgroundColor: colors.brand_primary,
        borderColor: colors.brand_primary,
    },
    primaryHighlightText: {
        color: colors.fill_base + '4D',
    },
    ghostHighlightText: {
        color: colors.brand_primary + '4D',
    },
};

export const CustomDefaultButtonStyle = {
    ...ButtonStyle,
};

import SearchBarStyle from 'antd-mobile/lib/search-bar/style/index.native';

import {colors} from '../constants/colors';

const CustomSearchBarStyle = {
    ...SearchBarStyle,
    wrapper: {
        ...SearchBarStyle.wrapper,
        backgroundColor: colors.fill_light_gray,
    },
};

export default CustomSearchBarStyle;

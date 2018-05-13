import {StyleSheet} from 'react-native';
import AccordionStyle from 'antd-mobile/lib/accordion/style/index.native';

import {colors} from '../constants/colors';

const CustomAccordionStyle = {
    ...AccordionStyle,
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border_color_base,
    },
    headerWrap: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 16,
        color: colors.color_text_base,
    },
    contentText: {
        lineHeight: 25,
        fontSize: 15,
        color: colors.color_text_paragraph,
    },
};

export default CustomAccordionStyle;

import Icon from 'react-native-vector-icons/Ionicons';

const iconMap = {
    'refresh': 'md-arrow-back',
};

export default ({type}) => (
    <Icon 
        name={iconMap[type]}
        color='#000000' 
        size={25}
    />
);

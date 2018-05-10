import React, {Component} from 'react';
import {ScrollView, View, Image} from 'react-native';

import {screenWidth} from '../../utils/screen';

class LibraryContact extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '开放时间',
    });

    render() {
        const {navigation} = this.props;

        return (
            <ScrollView>
                <View style={{padding: 5}}>
                    <Image 
                        resizeMode="contain"
                        source={{uri: 'http://p8hsgb6wh.bkt.clouddn.com/library-open-time.jpg'}}
                        style={{
                            width: screenWidth - 10,
                            height: 2.4 * (screenWidth - 10),
                        }} 
                    />
                </View>
            </ScrollView>
        );
    }
}

export default LibraryContact;

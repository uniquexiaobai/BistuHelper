import React from 'react';
import {ScrollView} from 'react-native';
import {Steps} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {bus_data} from '../../constants/data';

const SchoolBus = () => {
    const busTimeValue = (times) => {
        if (!times || !times.length) return '';

        return `发车时间：${times.join(', ')}`;
    };

    return (
        <ScrollView style={{padding: 20}}>
            {
                bus_data.map((bus, index) => (
                    <Steps size='small' key={`school_bus${index}`}>
                        {
                            bus.map(({station, time}, i) => (
                                <Steps.Step
                                    status='finish' 
                                    key={`school_bus${index}-station${i}`} 
                                    title={station} 
                                    description={busTimeValue(time)}
                                />
                            ))
                        }
                    </Steps>
                ))
            }
        </ScrollView>
    );
};

SchoolBus.navigationOptions = ({navigation}) => ({
    header: <BackNavBar navigation={navigation} config={{
        title: '校车',
    }}/>
});

export default SchoolBus;

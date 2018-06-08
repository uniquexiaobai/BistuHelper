import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {StyleSheet, View, Text} from 'react-native';
import {Accordion, Toast} from 'antd-mobile';

import {RefreshNavBar} from '../../components/nav-bar';
import {getFromStorage} from '../../utils/storage';
import CustomAccordionStyle from '../../styles/accordion';

const educationAccountStorageKey = 'BistuHelper__education__account';

@inject('examQueryStore')
@observer
class ExamQuery extends Component {
    static navigationOptions = ({navigation}) => ({
        header: (
            <RefreshNavBar 
                navigation={navigation}
                config={{
                    title: '考试查询',
                }}
            />
        )
    });

    componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({onRefresh: () => this.fetchData(true)});
        this.fetchData();
    }

    fetchData = async (force) => {
        const {navigate} = this.props.navigation;
        const {fetchEducationExam} = this.props.examQueryStore;

        try {
            const {username, password} = await getFromStorage(educationAccountStorageKey) || {};

            if (!username || !password) {
                Toast.info('请先绑定教务处账号', 1);
                setTimeout(() => navigate('EducationSignIn'), 1000);
                return;
            }

            Toast.loading('', 0);
            fetchEducationExam({username, password}, force);
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        const {examInfo} = this.props.examQueryStore;

        return (
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
                {
                    examInfo ? (
                        <Accordion styles={CustomAccordionStyle}>
                            {
                                examInfo.map(exam => (
                                    <Accordion.Panel key={exam.course} header={exam.course}>
                                        <Text>考试科目：</Text>
                                        <Text> {exam.course}</Text>{'\n'}
                                        <Text>    考试人：</Text>
                                        <Text>{exam.name}</Text>{'\n'}
                                        <Text>考试时间：</Text>
                                        <Text>{exam.date}</Text>{'\n'}
                                        <Text>考试地点：</Text>
                                        <Text>{exam.address}</Text>{'\n'}
                                        <Text>    座位号：</Text>
                                        <Text>{exam.seatNo}</Text>
                                    </Accordion.Panel>
                                ))
                            }
                        </Accordion>
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
   
});

export default ExamQuery;

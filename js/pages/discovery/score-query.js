import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {StyleSheet, TouchableOpacity, ScrollView, View, Text, Picker} from 'react-native';
import {Accordion, Toast} from 'antd-mobile';

import CustomAccordionStyle from '../../styles/Accordion';
import {getFromStorage} from '../../utils/storage';
import {colors} from '../../constants/colors';

const educationAccountStorageKey = 'BistuHelper__education__account';

@inject('scoreQueryStore')
@observer
class ScoreQuery extends Component {
    static navigationOptions = () => ({
        title: '成绩查询',
    });

    async componentDidMount() {
        const {navigate} = this.props.navigation;
        const {fetchEducationScore} = this.props.scoreQueryStore;

        try {
            const {username, password, name, major} = await getFromStorage(educationAccountStorageKey) || {};

            if (!username || !password) {
                Toast.info('请先绑定教务处账号', 1);
                setTimeout(() => navigate('EducationSignIn'), 1000);
                return;
            }

            this.userInfo = {name, major};

            Toast.loading('', 0);
            await fetchEducationScore({username, password});
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        const {setCurScoreTerm, scoreTerms, curScoreTerm, curScoreInfo} = this.props.scoreQueryStore;
        const userInfo = this.userInfo || {};
        const pickerData = scoreTerms.map(value => {
            const keys = value.split('#');

            return {
                label: `${keys[0]}学年 第${keys[1]}学期`,
                value,
            };
        });

        return (
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
                {
                    userInfo.name ? (
                        <View style={{marginBottom: 15, paddingLeft: 5}}>
                            <Text style={styles.scoreQuery__top}>{`${userInfo.name} ${userInfo.major}`}</Text>
                        </View>
                    ) : null
                }

                <View>
                    <Picker 
                        selectedValue={curScoreTerm}
                        onValueChange={value => setCurScoreTerm(value)}
                    >
                        {pickerData.map(({label, value}) => (
                            <Picker.Item key={value} label={label} value={value}/>
                        ))}
                    </Picker>
                </View>

                <ScrollView>
                    {
                        curScoreInfo.length ? (
                            <Accordion styles={CustomAccordionStyle}>
                                {
                                    curScoreInfo.map(score => (
                                        <Accordion.Panel key={score.courseID} header={score.name}>
                                            <Text>课程代码：</Text>
                                            <Text> {score.courseID}</Text>{'\n'}
                                            <Text>课程性质：</Text>
                                            <Text> {score.type}</Text>{'\n'}
                                            <Text>学分：</Text>
                                            <Text> {score.credit}</Text>{'\n'}
                                            <Text>成绩：</Text>
                                            <Text> {score.score}</Text>{'\n'}
                                            <Text>绩点：</Text>
                                            <Text> {score.point}</Text>
                                        </Accordion.Panel>
                                    ))
                                }
                            </Accordion>
                        ) : null
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scoreQuery__top: {
        color: colors.color_text_paragraph,
    }
});

export default ScoreQuery;

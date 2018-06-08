import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Accordion, Toast, Picker, List} from 'antd-mobile';

import {RefreshNavBar} from '../../components/nav-bar';
import {getFromStorage} from '../../utils/storage';
import {colors} from '../../constants/colors';
import CustomAccordionStyle from '../../styles/accordion';
import ListItemStyle from 'antd-mobile/lib/list/style/index.native';

const educationAccountStorageKey = 'BistuHelper__education__account';

const PickerBody = ({extra, onClick}) => (
    <List.Item styles={CustomListItemStyle} extra='请选择' onClick={onClick}>{extra}</List.Item>
);

@inject('scoreQueryStore')
@observer
class ScoreQuery extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <RefreshNavBar navigation={navigation} config={{
            title: '成绩查询',
        }}/>
    });

    componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({onRefresh: () => this.fetchData(true)});
        this.fetchData();
    }

    componentWillUnmount() {
        Toast.hide();
    }

    fetchData = async (force) => {
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
            await fetchEducationScore({username, password}, force);
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    getTermLabel = (value) => {
        if (!value || value.length < 2) return '';
        const keys = value.split('#');

        return `${keys[0]}学年 第${keys[1]}学期`;
    }

    render() {
        const {setCurTerm, allTerms = [], curTerm, curTermScore} = this.props.scoreQueryStore;
        const userInfo = this.userInfo || {};
        const curTermLabel = this.getTermLabel(curTerm);
        const pickerData = allTerms.map(value => {
            return {
                label: this.getTermLabel(value),
                value,
            };
        });

        return (
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5, flex: 1}}>
                {
                    userInfo.name ? (
                        <View style={{marginBottom: 5, paddingLeft: 5}}>
                            <Text style={styles.scoreQuery__top}>{`${userInfo.name} ${userInfo.major}`}</Text>
                        </View>
                    ) : null
                }
                
                {
                    pickerData.length ? (
                        <View>
                            <Picker
                                data={pickerData} 
                                cols={1}
                                value={[curTerm]}
                                onOk={val => setCurTerm(val[0])}
                                title='选择学期'
                            >
                                <PickerBody/>
                            </Picker>
                        </View>
                    ) : null
                }

                <ScrollView>
                    {
                        curTermScore.length ? (
                            <Accordion styles={CustomAccordionStyle}>
                                {
                                    curTermScore.map(score => (
                                        <Accordion.Panel key={score.courseID} header={score.name}>
                                            <Text>课程代码：</Text>
                                            <Text> {score.courseID}</Text>{'\n'}
                                            <Text>课程性质：</Text>
                                            <Text> {score.type}</Text>{'\n'}
                                            <Text>        学分：</Text>
                                            <Text> {score.credit}</Text>{'\n'}
                                            <Text>        成绩：</Text>
                                            <Text> {score.score}</Text>{'\n'}
                                            <Text>        绩点：</Text>
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

const CustomListItemStyle = {
    ...ListItemStyle,
    Item: {
        ...ListItemStyle.Item,
        paddingLeft: 5,
    },
    Line: {
        ...ListItemStyle.Line,
        paddingRight: 20,
        borderBottomWidth: 0,
        justifyContent: 'space-between',
    },
    column: {},
    Content: {
        ...ListItemStyle.Content,
        color: colors.color_text_base,
    },
    Extra: {
        ...ListItemStyle.Extra,
        color: colors.fill_gray,
    }
};

const styles = StyleSheet.create({
    scoreQuery__top: {
        color: colors.color_text_paragraph,
    }
});

export default ScoreQuery;

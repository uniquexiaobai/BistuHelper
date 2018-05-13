import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {StyleSheet, View, Text} from 'react-native';
import {Accordion, Toast} from 'antd-mobile';

import CustomAccordionStyle from '../../styles/Accordion';
import {getFromStorage} from '../../utils/storage';
import {colors} from '../../constants/colors';

const educationAccountStorageKey = 'BistuHelper__education__account';

@inject('cetQueryStore')
@observer
class CetQuery extends Component {
    static navigationOptions = () => ({
        title: '四六级查询',
    });

    async componentDidMount() {
        const {navigate} = this.props.navigation;
        const {fetchEducationCet} = this.props.cetQueryStore;
        

        try {
            const {username, password, name, major} = await getFromStorage(educationAccountStorageKey) || {};

            if (!username || !password) {
                Toast.info('请先绑定教务处账号', 1);
                setTimeout(() => navigate('EducationSignIn'), 1000);
                return;
            }

            this.userInfo = {name, major};

            Toast.loading('', 0);
            await fetchEducationCet({username, password});
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        const {cetInfo = []} = this.props.cetQueryStore;
        const userInfo = this.userInfo || {};

        return (
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
                {
                    userInfo.name ? (
                        <View style={{marginBottom: 15, paddingLeft: 5}}>
                            <Text style={styles.cetQuery__top}>{`${userInfo.name} ${userInfo.major}`}</Text>
                        </View>
                    ) : null
                }

                {
                    cetInfo.length ? (
                        <Accordion styles={CustomAccordionStyle}>
                            {
                                cetInfo.map(cet => (
                                    <Accordion.Panel key={cet.id} header={`${cet.type}   总成绩（${cet.totalScore}）`}>
                                        <Text>准考证号：</Text>
                                        <Text> {cet.id}</Text>{'\n'}
                                        <Text>考试时间：</Text>
                                        <Text> {cet.date}</Text>{'\n'}
                                        <Text>听力成绩：</Text>
                                        <Text> {cet.listeningScore}</Text>{'\n'}
                                        <Text>阅读成绩：</Text>
                                        <Text> {cet.readingScore}</Text>{'\n'}
                                        <Text>写作成绩：</Text>
                                        <Text> {cet.writingScore}</Text>
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
    cetQuery__top: {
        color: colors.color_text_paragraph,
    }
});

export default CetQuery;

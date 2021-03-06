import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import {BackNavBar} from '../../components/nav-bar';

class SchoolOverview extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '学校概况',
        }}/>
    });

    render() {
        const {navigation} = this.props;
        const space8 = '        ';

        return (
            <ScrollView style={styles.schoolOverview}>
                <View style={styles.schoolOverview__content}>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}北京信息科技大学是北京市重点支持建设的高校，坐落于北京市海淀区，有清河小营、健翔桥、清河、金台路、酒仙桥5个校区，占地500亩，校舍建筑面积33.32万平方米。学校总用地规模1183.6亩的新校区已于2015年正式开工建设。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}北京信息科技大学2008年经教育部批准由北京机械工业学院和北京信息工程学院合并设立。北京机械工业学院原隶属机械部，其前身是1986年成立的北京机械工业管理学院，办学历史可追溯至1937年设立的北平市立高级商业职业学校和1946年设立的国立北平高级工业职业学校；北京信息工程学院原隶属电子部，其前身是1978年成立的北京大学第二分校。70多年来，学校为国家和社会培养了数以万计的各类人才，校友遍布于世界各地、成就于各行各业。学校正式成立以来，紧紧围绕国家、首都及行业发展需求，特别是抢抓北京建设世界城市和京津冀一体化等重大机遇，积极调整学科专业布局，不断推进人才培养模式、内部管理体制等各项改革，努力寻找与信息时代、网络社会、高端制造等发展趋势的契合点，各项办学指标大幅提升，整体实力显著增强，社会贡献力有效提升。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}学校设机电工程学院、仪器科学与光电工程学院、自动化学院、信息与通信工程学院、计算机学院、经济管理学院、信息管理学院、马克思主义学院、公共管理与传媒学院、外国语学院、理学院、国际交流学院等12个学院以及研究生院、体育部、计算中心、机电实习中心、电子信息与控制实验教学中心和继续教育学院等教学机构。学校面向全国29个省（自治区、直辖市）招收全日制普通本科生，面向西部3个省（自治区）招收少数民族预科班学生，面向内地新疆高中班和内地西藏高中班招收本科生。学校现有12个专业和1个类别（计算机类）在北京地区一本招生，在京外26个省（自治区、直辖市）全部或部分专业进入一本招生。现有在校生16544人，其中，硕士研究生1308人，普通本科生10899人，成人教育本专科生4163人。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}学校拥有结构合理、素质较高的教师队伍。现有专任教师855人，其中52.5%具有博士学位，正高级职称134人、副高级职称323人，各类硕士生导师358人、博士生导师22人。学校依托北京市人才强教深化计划，引进双聘院士6人，北京市海外高层次人才3人，特聘教授2人，讲座教授3人，获得市属高校学科首席专家岗位1个。入选国家百千万人才工程1人，北京市新世纪百千万人才工程3人，北京学者2人，长城学者4人。现有全国优秀教师2人、北京市优秀教师9人、全国优秀教学团队1个、北京市优秀教学团队8个、北京市教学名师12人、北京市属市管高校创新团队24个、创新人才15人，青年拔尖人才35人，北京市人才强教深化计划骨干教师107人。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}学校人才培养特色鲜明。现有39个本科专业，覆盖工、管、理、经、文等5个学科门类。其中，国家级特色专业建设点4个、北京市特色专业建设点9个，自动化、通信工程、网络工程3个专业入选教育部“卓越工程师教育培养计划”，测控技术与仪器专业通过工程教育专业认证，自动化、计算机科学与技术2个专业获批教育部“地方高校本科专业综合改革试点专业”。拥有国家级实验教学示范中心2个、国家级大学生校外实践教育基地 1个、国家级工程实践教育中心建设单位 1个；北京市实验教学示范中心4个、校外人才培养基地3个。2014年，学校作为独立完成单位首次获得国家级教育教学成果二等奖；以本科生为主的足球机器人water队在中型机器人足球世界杯赛中四次荣获冠军，为国家争得荣誉；学生“捷能车队”在全国大学Honda汽车节能比赛中连续四年蝉联冠军。近年来，本科毕业生一次就业率保持在95%以上，毕业研究生一次就业率达到100%。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}学校学科综合实力不断增强。现有一级学科硕士点14个，二级学科硕士点43个；现有工程硕士和工商管理硕士2个专业学位授权种类，7个专业学位授权领域。其中，北京市重点学科3个、北京市重点建设学科9个；省部共建教育部重点实验室1个，北京市级重点实验室5个，部级重点实验室2个，机械工业重点实验室2个，北京市哲学社会科学研究基地1个，北京市高校工程技术研究中心1个；学校具有开展推荐优秀应届本科毕业生免试攻读硕士研究生工作资格，并获批“北京信息科技大学产学研联合研究生培养基地建设”项目，成为拥有北京高校产学研联合研究生培养基地的市属高校之一。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}学校立足优势，紧贴需求，把握趋势，以应用研究和科技开发为重点，科技工作保持了持续快速发展的良好势头，取得了以连续3年作为第一完成单位获得4项国家级科技奖励为标志的重大突破，学校科技竞争力明显增强。近年来学校各类科研项目数稳步提高，科研到款额每年以约20%增速稳步上升；科研项目层次不断提高，国家自然科学基金立项数稳步上升，国家科技重大专项、国家科技支撑计划、863课题等高水平国家级项目立项取得突破性进展，发明专利授权数大幅增长。2011年6月15日，我校参股的北京拓尔思信息技术股份有限公司在创业板成功上市，成为北京市属市管高校中首家上市企业。拓尔思公司的成功上市，标志着学校科研成果转化及产业化工作进入了新的发展阶段。学校共持有该公司1470.74万股，占总股本的7.18%，按2015年3月18日收盘价44.03元计算，市值约6.48亿元。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}2009年7月，学校成为“中关村国家自主创新示范区”首批6家股权激励试点单位之一。2009年10月，学校获批建设北京市大学科技园。2010年12月，学校获批中关村科学城第二批建设项目“北京高端信息产业技术研究院”。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}学校持续推进国际化办学。现与美国、德国、英国、法国等国家及港澳台地区50余所高校建立了校际合作关系，开展了科研合作、互访讲学、管理人员培训、英语教师和双语教师学习进修，本科生双学位项目以及联合培养硕士和博士研究生合作项目。学校聘请6位国外大学校长担任学校学术委员会荣誉委员，聘请诺贝尔经济学奖获得者罗伯特·蒙代尔教授等16位世界知名学者担任荣誉教授。学校设有国际交流学院，积极扩大来华留学生教育规模，提升来华留学生教育质量。现有在校留学生174人。</Text>
                    </View>
                    <View style={styles.schoolOverview__section}>
                        <Text style={styles.schoolOverview__text}>{space8}北京信息科技大学以其奋发图强的发展历程，诠释着自己光荣的传统和独特的骄傲。在信息时代和网络社会迅猛发展的今天，学校将秉持“勤以为学、信以立身”的校训，肩负崭新的历史使命，抢抓空前的发展机遇，朝着建设特色鲜明的高水平教学研究型大学大步迈进！</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    schoolOverview: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    schoolOverview__content: {
        paddingBottom: 20,
    },
    schoolOverview__section: {
        marginBottom: 5,
    },
    schoolOverview__text: {
        fontSize: 16,
        lineHeight: 28,
        color: '#363636',
    },
});

export default SchoolOverview;

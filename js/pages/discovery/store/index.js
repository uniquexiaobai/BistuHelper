import SchoolNewsStore from './school_news';
import CetQueryStore from './cet-query';
import ScoreQueryStore from './score-query';
import ExamQueryStore from './exam-query';

export default {
    schoolNewsStore: new SchoolNewsStore,
    cetQueryStore: new CetQueryStore,
    scoreQueryStore: new ScoreQueryStore,
    examQueryStore: new ExamQueryStore,
};

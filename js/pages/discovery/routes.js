import PhoneBook from './phone_book';
import Library from './library';
import LibraryBorrow from './library_borrow';
import LibraryContact from './library_contact';
import LibraryOpenTime from './library_open-time';
import SchoolOverview from './school_overview';
import SchoolNews from './school_news';
import NewsDetail from './news_detail';
import SchoolCalendar from './school_calendar';
import SubwayMap from './subway-map';
import AirQuality from './air_quality';
import TimeTable from './time-table';
import CetQuery from './cet-query';
import ScoreQuery from './score-query';
import SchoolBus from './school_bus';
import SchoolMap from './school_map';
import SiteWiki from './site-wiki';
import ExamQuery from './exam-query';

const discoveryRoutes = {
    Library: {
        screen: Library,
    },
    LibraryBorrow: {
        screen: LibraryBorrow,
    },
    LibraryContact: {
        screen: LibraryContact,
    },
    LibraryOpenTime: {
        screen: LibraryOpenTime,
    },
    SchoolOverview: {
        screen: SchoolOverview,
    },
    SchoolCalendar: {
        screen: SchoolCalendar,
    },
    SchoolNews: {
        screen: SchoolNews,
    },
    NewsDetail: {
        screen: NewsDetail,
    },
    PhoneBook: {
        screen: PhoneBook,
    },
    SubwayMap: {
        screen: SubwayMap,
    },
    AirQuality: {
        screen: AirQuality,
    },
    TimeTable: {
        screen: TimeTable,
    },
    CetQuery: {
        screen: CetQuery,
    },
    ScoreQuery: {
        screen: ScoreQuery,
    },
    SchoolBus: {
        screen: SchoolBus,
    },
    SchoolMap: {
        screen: SchoolMap,
    },
    SiteWiki: {
        screen: SiteWiki,
    },
    ExamQuery: {
        screen: ExamQuery,
    }
};

export default discoveryRoutes;

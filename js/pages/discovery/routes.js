import PhoneBook from './phone_book';
import Library from './library';
import LibraryBorrow from './library_borrow';
import LibraryContact from './library_contact';
import LibraryOpenTime from './library_open-time';
import SchoolOverview from './school_overview';
import SchoolNews from './school_news';
import NewsDetail from './news_detail';
import SchoolCalendar from './school_calendar';

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
    PhoneBook: {
        screen: PhoneBook,
    },
    SchoolOverview: {
        screen: SchoolOverview,
    },
    SchoolNews: {
        screen: SchoolNews,
    },
    NewsDetail: {
        screen: NewsDetail,
    },
    SchoolCalendar: {
        screen: SchoolCalendar,
    },
};

export default discoveryRoutes;

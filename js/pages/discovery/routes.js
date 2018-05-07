import Library from './library';
import PhoneBook from './phone_book';
import LibraryBorrow from './library_borrow';
import SchoolOverview from './school_overview';

const discoveryRoutes = {
    Library: {
        screen: Library,
    },
    LibraryBorrow: {
        screen: LibraryBorrow,
    },
    PhoneBook: {
        screen: PhoneBook,
    },
    SchoolOverview: {
        screen: SchoolOverview,
    },
};

export default discoveryRoutes;

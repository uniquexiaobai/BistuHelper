import Library from './library';
import PhoneBook from './phone_book';
import LibraryBorrow from './library_borrow';
import LibrarySignIn from './library_sign-in';
import SchoolOverview from './school_overview';

const discoveryRoutes = {
    Library: {
        screen: Library,
    },
    LibrarySignIn: {
        screen: LibrarySignIn,
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

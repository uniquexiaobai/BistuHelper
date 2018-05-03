import Library from './library';
import PhoneBook from './phone_book';
import LibraryBorrow from './library_borrow';
import LibrarySignIn from './library_sign-in';

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
};

export default discoveryRoutes;

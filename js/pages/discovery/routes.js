import Library from './library';
import PhoneBook from './phone_book';
import LibraryBorrow from './library_borrow';

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
};

export default discoveryRoutes;

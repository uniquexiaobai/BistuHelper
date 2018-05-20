import SignUp from './sign-up';
import SignIn from './sign-in';
import LibrarySignIn from './library_sign-in';
import EducationSignIn from './education_sign-in';
import Settings from './settings';

const MeRoutes = {
    SignUp: {
        screen: SignUp,
    },
    SignIn: {
        screen: SignIn,
    },
    LibrarySignIn: {
        screen: LibrarySignIn,
    },
    EducationSignIn: {
        screen: EducationSignIn,
    },
    Settings: {
        screen: Settings,
    },
};

export default MeRoutes;
import {observable, action, runInAction, computed} from 'mobx';

import {handleError} from '../../../utils/error';
import {getFromStorage, saveToStorage, removeFromStorage} from '../../../utils/storage';
import {accountStorageKey} from '../../../constants/storage';

class AccountStore {
    @observable account;

    constructor() {
        this.initAccount();
    }

    @action
    initAccount = async () => {
        try {
            const user = await getFromStorage(accountStorageKey);

            runInAction(() => {
                if (user) this.account = user;
            });
        } catch (err) {
            handleError(err);
        }
    };

    @computed
    get currentAccount() {
        return this.account;
    }

    @action 
    logout = () => {
        this.account = undefined;
        removeFromStorage(accountStorageKey);
    }

    @action 
    login = (loggedInUser) => {
        this.account = loggedInUser;
        saveToStorage(accountStorageKey, loggedInUser);
    }
}

export default AccountStore;

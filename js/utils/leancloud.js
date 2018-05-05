import AV from 'leancloud-storage';

const leancloud = {
    APP_ID: '8uwQzbcDfcfTRWK6V6Gpks6L-gzGzoHsz',
    APP_KEY: 's0vd46QUGbVCrpgPByekrqBv',
};

AV.init({
  appId: leancloud.APP_ID,
  appKey: leancloud.APP_KEY
});

export const user_signUp = ({username, password}, success, fail) => {
    const user = new AV.User();

    user.setUsername(username);
    user.setPassword(password);

    user.signUp()
        .then(loginedUser => {
            success(loginedUser);
        })
        .then(error => {
            fail(error);
        });
};
    
import CodePush from 'react-native-code-push';

export const CodePush__sync = () => {
    CodePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
    });
};

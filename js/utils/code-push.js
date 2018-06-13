import CodePush from 'react-native-code-push';

export const CodePush__sync = () => {
    CodePush.sync({
        updateDialog: true,
        installMode: CodePush.InstallMode.IMMEDIATE
    });
};

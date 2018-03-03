import {NavigationActions} from 'react-navigation';

export const navigationReset = (navigation, routeName) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: routeName})]
  });

  navigation.dispatch(resetAction);
};

import React, {Component} from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  Alert,
  ToastAndroid,
} from 'react-native';

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newsList) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.newsList),
      });
    }
  }

  render() {
    const {newsList} = this.props;

    return (
      <View style={styles.news_list}>
        {
          newsList ?
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => (
              <View key={rowData.id} style={styles.news_item}>
                <Text style={styles.news_item__text}>{rowData.title}</Text>
              </View>
            )}
          />
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  news_list: {
    margin: 10,
  },
  news_item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ced1d6',
    backgroundColor: '#fff',
  },
  news_item__text: {
    fontSize: 18,
    lineHeight: 32,
  }
});

export default NewsList;

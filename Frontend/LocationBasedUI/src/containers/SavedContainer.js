import React, { Component } from 'react';
import {
  FlatList,
   ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';


const moment = require('moment');

export default class InboxContainer extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  static navigationOptions = {
    tabBarLabel: 'CATEGORY',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="ios-contact-outline"
        size={22}
        color={tintColor}
      />
    ),
  };

  componentDidMount(){
    return fetch('http://172.31.98.4:8000/category/', {
          method: 'POST',
          
          headerss: {
              'Accept': 'application/json',
              "Content-Type": "application/json",                
          },
          body: JSON.stringify({
              cname: 'sports',
             
          })
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
//     fetch('http://192.168.8.100:8000/category/', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     cname: 'sports',
   
//   }),
// });
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
    delayPressIn={70}
    activeOpacity={0.8}
    onPress={() => this.onItemPressed(item)}>
    <RkCard rkType='blog' style={styles.card}>
        {/* <Image rkCardImg source={item.image_link} /> */}
        {/* <Image rkCardImg source={{uri:item.image_link}}/> */}
        <View rkCardHeader style={styles.content}>
        <Text>{item.title}</Text>
          {/* <RkText style={styles.section} rkType='header4'>{item.title}</RkText> */}
        </View>
        <Image source={{uri:item.image_link}}/>
        <View rkCardContent>
          <View>
            <RkText rkType='primary3 mediumLine' numberOfLines={4}>{item.summary}</RkText>
          </View>
        </View>
        <View rkCardFooter>
        <Text>{item.date_time}</Text>        
          {/* <View style={styles.userInfo}> */}
            {/* <Avatar style={styles.avatar} rkType='circle small' img={item.user.photo} /> */}
            {/* <RkText rkType='header6'>{`${item.user.firstName} ${item.user.lastName}`}</RkText> */}
          {/* </View> */}
          {/* <RkText rkType='secondary2 hintColor'>{moment().add(item.date_time, 'seconds').fromNow()}</RkText> */}
        </View>
      </RkCard>
    </TouchableOpacity>
  );


  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    
    return (
      <View style={{flex: 1, paddingTop:20}}>
      
        <FlatList
      data={this.state.dataSource}
      renderItem={this.renderItem}
      keyExtractor={this.extractItemKey}
      style={styles.container}
    />
      </View>
    );
  }
};

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
}));

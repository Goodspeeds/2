/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import styles from '../Styles/Main';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';

const REQUEST_URL = 'https://api.douban.com/v2/movie/us_box';

class USBox extends React.Component {

 constructor(props){
 	super(props);
/* 	let movies = [
       {title:'肖申克的救赎'},
       {title:'这个杀手不太冷'},
       {title:'阿甘正传'},
	   {title:'霸王别姬'},
	   {title:'美丽人生'},
 	];
　let dataSource = new ListView.DataSource({
	rowHasChanged:(row1,row2) => row1 !== row2
	});
*/
	this.state = {
 	//movies:dataSource.cloneWithRows(movies)
 	movies:new ListView.DataSource({
 	rowHasChanged:(row1,row2) => row1 !== row2
 	}),
 	 loaded:false
   };
   this.fetchData();
 }

 	fetchData(){
 		fetch(REQUEST_URL)
 		.then(response =>response.json())
 		.then(responseData =>{
 			this.setState({
 			movies:this.state.movies.cloneWithRows(responseData.subjects),
 			loaded:true
 		 });
 		})
 		.done()
 	}

renderMovieList(movie){
	return(

    <TouchableHighlight
          underlayColor="rgba(34,26,38,0.1)"
          onPress={() => {
            console.log(`<${movie.title}>被点了！`)
          }}
      >


<View style={styles.item}>
<View style={styles.itemImage}>
 	<Image
 		source={{uri:movie.subject.images.large}}
 		style={styles.image}
 		/>

 		</View>
 			<View style={styles.itemContent}>
 			<Text style={styles.itemHeader}>{movie.subject.title}</Text>
			<Text style={styles.itemMeta}>
			{movie.original_title}({movie.subject.year})
			</Text>
			<Text style={styles.redText}>{movie.subject.rating.average}</Text>
 		</View>
 		</View>
      </TouchableHighlight>
		);
}


  render() {
  	if (!this.state.loaded) {
  		return(
  			<View style={styles.container}>
				<View style={styles.loading}>
					
          <ActivityIndicatorIOS 
            size='large'/>
				</View>
  			</View>
  			);
  	}
    return (
      <View style={styles.container}>
      <ListView
      dataSource={this.state.movies}
      renderRow={this.renderMovieList}
 />
      </View>
    );
  }
}


export { USBox as default };

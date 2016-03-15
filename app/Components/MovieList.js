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
} from 'react-native';

const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';

class MovieList extends React.Component {

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
<View style={styles.item}>
<View style={styles.itemImage}>
 	<Image
 		source={{uri:movie.images.large}}
 		style={styles.image}
 		/>

 		</View>
 			<View style={styles.itemContent}>
 			<Text style={styles.itemHeader}>{movie.title}</Text>
			<Text style={styles.itemMeta}>
			{movie.original_title}({movie.year})
			</Text>
			<Text style={styles.redText}>{movie.rating.average}</Text>
 		</View>
 		</View>
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


export { MovieList as default };
import React,{Component} from 'react';
import {SafeAreaView,Image,View,Text,FlatList} from 'react-native';

export default class Product extends Component{
    state={
        datalist:[],
        loading:true
    }
    componentDidMount() {
        debugger;
        console.log("Api calling");
        debugger;
        return fetch("http://localhost:3001/product/getproducts").then((res)=>res.json()).then((data)=>{
            console.log(data);
                 this.setState({datalist:data})
        });
    }

    onrenderItem = ({item})=>
        <View>
        <Text> {item.productname}</Text>
            <Text>{item.image}</Text>
        <Image source={{uri:'http://localhost:3001/image/'+item.image}} style={{width:100,height:100}}/>
        </View>

    render(){
        debugger;
        console.log(this.state.datalist);
        return (


                    <SafeAreaView>
                    <FlatList
                        data={this.state.datalist}
                        renderItem={this.onrenderItem}
                        keyExtractor={({item}, index) => index}
                    />
                    </SafeAreaView>


        )
    }
}
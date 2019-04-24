import React,{Component} from 'react';
import {SafeAreaView,View,Button,Image,StyleSheet,Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default class AddProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            filepath:" ",
            data:" ",
            name:'xyz',
            price:'30'

        }
    }
    chooseFile = () => {
        debugger;
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
            this.setState({filepath:response.uri,
            data:response.data});
            console.log(this.state.filepath)
            this.uploadToServer()

        });
    };

    uploadToServer = ()=>{
        const data=new FormData();
        data.append('productname','xyz');
        data.append('image',{
            uri:this.state.filepath,
            type:'image/jpeg',
            name:'image.jpeg'
        });
        data.append('price','10');
        fetch('http://localhost:3001/product',{
            method:"POST",
            body:data
        }).then(res=>{
            console.log(res)
        })

    };

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.container}>
                    {this.state.filepath && (
                        <Image
                            source={{ uri: this.state.filepath }}
                            style={{ width: 300, height: 300,borderRadius:5,borderColor:'#000',borderWidth:5 }}
                        />
                    )}
                    <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
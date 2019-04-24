import React,{Component} from 'react';
import {SafeAreaView,View,Button,Image,StyleSheet,Text} from 'react-native';
import ImagePicker from 'react-native-image-picker'
export default class AddProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            filepath:" "

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
            this.setState({filepath:response.uri});
            console.log(this.state.filepath)

        });
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
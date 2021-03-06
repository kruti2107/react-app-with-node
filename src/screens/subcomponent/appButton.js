import React,{Component} from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AppButton = (props) =>{
    const {btnOuter,btnText} = styles;
    const {title, onPress, extraStyle} = props;
    return(
        <TouchableOpacity style={[btnOuter,extraStyle && extraStyle]}
                          onPress={onPress}>
            <Text style={[btnText,extraStyle&&extraStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    btnOuter:{
        height: hp('6%'),
        width:wp('93%'),
        borderRadius: 25,
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        color:'#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:hp('2%')

    }
});

export {AppButton};

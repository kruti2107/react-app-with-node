import React,{Component} from 'react';
import {Text,View,StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity,Button,ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AppButton} from '../subcomponent/appButton';
import {DatePickerDialog} from 'react-native-datepicker-dialog'
var moment = require('moment');

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            fname:' ',
            lname:' ',
            email:' ',
            phone:' ',
            pass:' ',
            cpass:' ',
            newDate:new Date(),
            DateText:'Select Your Birth Date',
            photo:null

        }
    }

    datePicker = () =>{
        this.refs.DatePickerDialog.open({

            date: this.state.newDate,
            DateText: moment(this.state.newDate).format('DD-MMM-YYYY')

        })
    };
    ondatePicked = (date)=>{
        this.setState({
            DateText:moment(date).format('DD-MMM-YYYY')
        })
    }
    onSignUp = () =>{
        fetch("http://192.168.200.129:3001/user", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.fname,
                lastName: this.state.lname,
                email: this.state.email,
                phoneNo: this.state.phone,
                password: this.state.pass,
                DOB:this.state.DateText
            })
        }).then((res)=>{
            return res.json();
        }).then((result)=>{
            if(!result.error)
            alert("User Register Successfully!")
            else
                alert(result.error)
        }).catch((err)=>{
            alert(err)
        })
       };

    render(){
        const {mainconatiner,
               txtStyle,
               subcontainer,
               container,
               inputstyle,
               inputs,btnStyle,btn,datePickerText}=styles;


        return(

            <SafeAreaView style={mainconatiner}>

                <View style={subcontainer}>
                    <Text style={txtStyle}>Sign Up</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 300, height: 300 }}
                        />
                    )}
                    <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                </View>

                <View style={ container}>
                    <View style={inputstyle}>
                        <TextInput placeholder="FirstName"
                                   style={inputs}
                                   placeholderTextColor="#fff"
                                    onChangeText={text=>{this.setState({fname:text})}}/>
                    </View>
                    <View style={inputstyle}>
                        <TextInput placeholder="LastName"
                                   style={inputs}
                                   placeholderTextColor="#fff"
                                   onChangeText={text=>{this.setState({lname:text})}}/>
                    </View>
                    <View style={inputstyle}>
                        <TextInput placeholder="Email"
                                   style={inputs}
                                   placeholderTextColor="#fff"
                                   keyboardType={"email-address"}
                                   onChangeText={text=>{this.setState({email:text})}}/>
                    </View>
                    <View style={inputstyle}>
                        <TextInput placeholder="Phone Number"
                                   style={inputs}
                                   placeholderTextColor="#fff"
                                   keyboardType={"numeric"}
                                   onChangeText={text=>{this.setState({phone:text})}}/>
                    </View>
                    <View >
                        <TouchableOpacity onPress={this.datePicker.bind(this)}>
                            <View style={inputstyle}>
                                <Text style={datePickerText}>{this.state.DateText}</Text>
                            </View>
                        </TouchableOpacity>
                        <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.ondatePicked.bind(this)}/>
                    </View>
                    <View style={inputstyle}>
                        <TextInput placeholder="Password"
                                   secureTextEntry={true}
                                   style={inputs}
                                   placeholderTextColor="#fff"
                                   onChangeText={text=>{this.setState({pass:text})}}/>
                    </View>
                    <View style={inputstyle}>
                        <TextInput placeholder="ConfirmPassword"
                                   secureTextEntry={true}
                                   style={inputs}
                                   placeholderTextColor="#fff"
                                   onChangeText={text=>{this.setState({cpass:text})}}/>
                    </View>
                    <View style={btn}>
                    <AppButton  title={'Sign Up'}
                                extraStyle={btnStyle}
                                onPress={this.onSignUp}/>
                    </View>

                    <View style={btn}>
                        <AppButton  title={'Already have an account?Login here'} extraStyle={{fontWeight: 'normal'}}/>
                    </View>
                </View>

            </SafeAreaView>

        )
    }
}

const styles=StyleSheet.create({
    mainconatiner:{
        flex:1,
        backgroundColor:'#273045'
    },
    txtStyle:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize:50
    },
    subcontainer:{
        alignItems:'center'
    },
    container:{
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center'
    },
    inputstyle:{
        //backgroundColor: '#273045',
        borderWidth: .5,
        borderColor: '#fff',
        height: hp('6%'),
        width:wp('93%'),
        borderRadius: 25 ,
        margin:4,
        color:'#fff',
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:hp('4%'),
        marginLeft:16,
        color: '#FFFFFF',
        flex:1,
    },
    btnStyle:{
        backgroundColor:'#fd3f34'
    },
    btn:{
        margin: 20
    },
    datePickerText: {
        fontSize: 14,
        marginLeft: 16,
        borderWidth: 0,
        color: '#fff',

    },
});
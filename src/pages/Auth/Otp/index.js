import React, { useState } from 'react';
import {Container} from '../../../containers';
import {
  CButton,
  CPagination,
  CText,
  ProgressiveImage,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');
import OTPInputView from '@twotalltotems/react-native-otp-input';
import GlobalStyle from '../../../assets/styling/GlobalStyle';

function Register({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
const [code , setCode] = useState("")
const [error , setError] = useState("")


  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
    };
  });
  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Sing in',
    bgHeadeStyle: {
      width: width * 1,
      height: height * 0.3,
      marginTop: -30,
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
  };

  const submit = async values => {

      if(code === "2357"){
        setError("")

        navigation.navigate('Confirm');
      } else {
        setError("You enter valid code")
      }
    // alert("sss")
  };

  return (
    <Container
      backgroundColor={'theme-color'}
      showPattern={true}
      scrollView={true}
      style={AuthStyle.style}
      headerProps={headerProps}
      loading={reduxState?.loading}
      scrollViewProps={{
        contentContainerStyle: AuthStyle.container,
      }}>
      <View
        style={[
          AuthStyle.cardHeader,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <CText style={AuthStyle.cardHeaderTitle}>Enter Code</CText>
        <CText
          style={[
            AuthStyle.cardHeaderSubTitle,
            {textAlign: 'center', width: '75%'},
          ]}>
          Please enter code sent your email code will expire in
        </CText>
        <CText
          style={[
            AuthStyle.cardHeaderSubTitle,
            {textAlign: 'center', width: '75%'},
          ]}>
          29s
        </CText>
      </View>
      <View>
        <OTPInputView
          codeInputFieldStyle={AuthStyle.codeInputFieldStyle}
          style={AuthStyle.otpInputView}
          pinCount={4}
          code={code}
          onCodeChanged={(code) => {
            setCode(code)
        }}
        />
       {error  && <CText style={{...GlobalStyle.errorTextStyle,}}>
        {error}
      </CText>}
      </View>

      <CButton
        title={'Proceed'}
        iconType="left"
        loading={false}
        onPress={() => submit()}
      />

      <TouchableOpacity style={AuthStyle.forgot}>
        <CText style={AuthStyle.recieveCode}>Did’t get the code?</CText>
      </TouchableOpacity>

      <View style={AuthStyle.orContainer}>
        <CText
          onPress={() => navigation.navigate('Login')}
          style={[AuthStyle.cardBottomText2]}>
          Resend Code
        </CText>
      </View>
    </Container>
  );
}
export default Register;

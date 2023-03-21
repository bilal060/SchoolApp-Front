import React, { useEffect } from 'react';
import {Container} from '../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { login } from '../../../redux/actions/Auth.action';
const {width, height} = Dimensions.get('screen')
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

function Login({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })


  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
    };
  });
  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Sing in',
    bgHeadeStyle:{width: width * 1, height: height * 0.3, marginTop: -30, paddingVertical: 40, paddingHorizontal: 20}
  };

  const submit = async values => {
    dispatch(login())
  };
  useEffect(async() => {
    rnBiometrics.isSensorAvailable()
  .then((resultObject) => {
    const { available, biometryType } = resultObject

    if (available && biometryType === BiometryTypes.TouchID) {
      console.log('TouchID is supported')
    } else if (available && biometryType === BiometryTypes.FaceID) {
      console.log('FaceID is supported')
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('Biometrics is supported')
    } else {
      console.log('Biometrics not supported')
    }
  })
  rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
  .then((resultObject) => {
    const { success } = resultObject

    if (success) {
      console.log('successful biometrics provided')
    } else {
      console.log('user cancelled biometric prompt')
    }
  })
  .catch(() => {
    console.log('biometrics failed')
  })

  }, []);

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
        
      <CForm submit={submit} loading={reduxState?.loading} onForgotPress={()=> navigation.navigate('Forgot')} />
      <View style={AuthStyle.orContainer}>
        <ProgressiveImage
          source={Google}
          resizeMode={'contain'}
          style={AuthStyle.IconImage}
        />
        <ProgressiveImage
          source={Facebook}
          resizeMode={'contain'}
          style={AuthStyle.IconImage}
        />
      </View>
      <View style={AuthStyle.orContainer}>
        <CText style={AuthStyle.cardBottomText}>New to School?</CText>
        <CText onPress={()=> navigation.navigate('Register')} style={[AuthStyle.cardBottomText2]}>Sign Up</CText>
      </View>
    </Container>
  );
}
export default Login;

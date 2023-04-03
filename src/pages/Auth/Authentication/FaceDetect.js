import React, {useEffect, useRef, useState} from 'react';
import {Container} from '../../../containers';
import {CButton, CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View} from 'react-native';
import AuthStyle from '../Auth.style';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google, Profile, Rocket} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {login} from '../../../redux/actions/Auth.action';
const {width, height} = Dimensions.get('screen');
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import { RNCamera } from 'react-native-camera';


function FaceDetect({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      setTimeout(() => {
        navigation.navigate("Confirm" ,{
          btnName:"Go to Home",
          title:"Awesome",
          des:"We have successfully processed your facial verification",
          image:Rocket
      })
      }, 3000);
    }
  };
  
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
    dispatch(login());
  };
  useEffect(async () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported', BiometryTypes.FaceID);
      } else {
        console.log('Biometrics not supported');
      }
    });
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
      <View style={AuthStyle.card}>
        <View style={AuthStyle.cardHeader}>
          <CText style={AuthStyle.cardHeaderTitle}>{'Let’s Begin'}</CText>
          <CText style={[AuthStyle.cardHeaderSubTitle, {fontSize:18,}]}>
            {'Get your face straight to the camera'}
          </CText>
        </View>

        <View style={{alignSelf: 'center', marginVertical: 30 ,}}>
        <RNCamera
        ref={cameraRef}
        style={AuthStyle.preview}
        type={cameraType}
        flashMode={flashMode}
        // captureQuality={RNCamera.Constants.CaptureQualit}
      />
        <CButton
                title={'Capture'}
                iconType=""
                loading={false}
                onPress={() =>takePicture()}
                buttonStyle={AuthStyle.buttonStyle}
              />
              
      </View>
      </View>
    </Container>
  );
}
export default FaceDetect;

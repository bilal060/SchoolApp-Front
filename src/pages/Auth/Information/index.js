import React, { useEffect, useState } from 'react';
import {Container, CountriesModal} from '../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View , Modal} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { login } from '../../../redux/actions/Auth.action';
const {width, height} = Dimensions.get('screen')
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

function Information({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })


  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
      currentCountry: global.currentCountry,
      countries: global.countries,
    };
  });
  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Sing in',
    bgHeadeStyle:{width: width * 1, height: height * 0.3, marginTop: -30, paddingVertical: 40, paddingHorizontal: 20}
  };

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState(
      reduxState.currentCountry
  );
  console.log("🚀 ~ file: index.js:30 ~ Register ~ selectedCountry:", selectedCountry)

  const toggleCountryModal = () => {
      updateCountryModalIsOpen(!countryModalIsOpen);
  };

  const countryOnSelect = (item) => {
      updateSelectedCountry(item);
      toggleCountryModal();
  };
  

  const submit = async values => {
    console.log("🚀 ~ file: index.js:52 ~ submit ~ values:", values)
    navigation.navigate("OTP")
  };
  useEffect(async() => {}, []);
  

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
        
      <CForm submit={submit} loading={reduxState?.loading} onForgotPress={()=> navigation.navigate('Forgot')} selectedCountry={selectedCountry}
                toggleCountryModal={toggleCountryModal} />
      
      <View style={AuthStyle.orContainer}>
        <CText style={AuthStyle.cardConfirmBottomText}>By confirming you agree to all</CText>
        <CText onPress={()=> navigation.navigate('Register')} style={[AuthStyle.cardBottomText2]}>terms</CText>
      </View>

      <Modal
                transparent={true}
                visible={countryModalIsOpen}
                onRequestClose={() => toggleCountryModal()}
            >
                <View style={AuthStyle.modalContainer}>
                    <View style={AuthStyle.modalInnerContainer}>
                        <CountriesModal
                            onSelect={(val) => countryOnSelect(val)}
                        />
                    </View>
                </View>
            </Modal>
    </Container>
  );
}
export default Information;

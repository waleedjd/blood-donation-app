import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBackground from '../../components/AppBackground';
import Logo from '../../components/Logo';
import CustomButton from '../../components/CustomButton';
import {Colors, NavService} from '../../config';
import {errorToast, getOtp, updateUser} from '../../redux/apis';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {loaderStart, loaderStop} from '../../redux/actions';

const {width} = Dimensions.get('window');

const Verification = ({route}) => {
  const {nextRoute, confirmation, user} = route.params;

  const [code, setCode] = useState('');
  const [resend, setResend] = useState(false);
  const [remainingTime, setRemainingTime] = useState(59);
  const [otpValidator, setOtpValidator] = useState(confirmation);

  let interval = null;

  const onResend = async () => {
    loaderStart();
    const confirmation = await getOtp(user.phone);
    setOtpValidator(confirmation);
    setResend(false);
    setRemainingTime(59);
    loaderStop();
  };

  const verifyCode = async () => {
    if (code.length != 6) {
      errorToast('Please enter valid OTP');
      return;
    }
    loaderStart();
    try {
      await otpValidator.confirm(code);
      await updateUser({...user, isVerified: true, isAvailableToDonate: true});
      loaderStop();
      NavService.navigate(nextRoute, {user});
    } catch (e) {
      loaderStop();
      errorToast('Please enter valid OTP');
    }
  };

  useEffect(() => {
    interval = setInterval(() => {
      setRemainingTime(rt => {
        if (rt > 0) {
          return rt - 1;
        } else {
          setResend(true);
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      setRemainingTime(59);
      setCode('');
      setResend('false');
    };
  }, []);

  const otpContainerWidth = width - 70;
  const otpSingle = (width - 105) / 6;
  return (
    <AppBackground showHeader={false}>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 40}}>
        <Logo />
        <View style={{flex: 1, marginTop: 40, alignItems: 'center'}}>
          <OTPInputView
            style={{width: otpContainerWidth, height: otpSingle}}
            pinCount={6}
            code={code}
            onCodeChanged={setCode}
            autoFocusOnLoad={false}
            codeInputFieldStyle={{
              width: otpSingle,
              height: otpSingle,
              borderWidth: 1,
              borderColor: Colors.lightGrey,
              borderRadius: 5,
              backgroundColor: Colors.lightGrey,
              color: Colors.text,
              fontSize: 20,
            }}
            codeInputHighlightStyle={{
              borderColor: Colors.primary,
              borderWidth: 1,
            }}
          />
          <View
            style={{width: width - 40, alignItems: 'flex-end', marginTop: 30}}>
            {resend ? (
              <TouchableOpacity activeOpacity={0.8} onPress={onResend}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: Colors.primary,
                  }}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{fontSize: 16, color: Colors.primary}}>
                Resend Code in{' '}
                {remainingTime > 9 ? remainingTime : `0${remainingTime}`} sec
              </Text>
            )}
          </View>
          <CustomButton
            title={'VERIFY'}
            onPress={verifyCode}
            buttonStyle={{marginTop: 40}}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default Verification;

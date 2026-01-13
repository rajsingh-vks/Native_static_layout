import { useEffect, useState } from 'react';
import {Text} from 'react-native';
import Stylesheet from '../../utils/styles';
import moment from 'moment';

const OtpTimer = ({active, timer, onComplete = () => null}) => {

  var change;
  const [seconds, setSeconds] = useState(timer);
  const [isTimerActive, setIsTimerActive] = useState(active ? active : false);
  
  useEffect(() => {
    if (isTimerActive) {
      countDown = setInterval(() => {
        if (!seconds) {
          clearInterval(countDown);
          setIsTimerActive(false);
        }
        if (seconds > 0) {
          change = seconds - 1;
          setSeconds(change);
          if(change == 0){
            onComplete(true);
          }
        }
      }, 1000);
    }

    return () => clearInterval(countDown);
  }, [isTimerActive, seconds]);
  
  if (seconds > 0) {
    return (
      <Text style={{fontSize:14, fontWeight:'600'}}> 
        Resend in <Text style={[Stylesheet.otpCounter, {fontSize:14}]}>00 : {(seconds || '00').toString().padStart(2, '0')}</Text>
      </Text>
    );
  }
};

export default OtpTimer;

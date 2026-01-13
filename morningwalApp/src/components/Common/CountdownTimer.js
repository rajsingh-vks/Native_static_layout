import React from 'react';
import {useCountdown} from '../../utils/useCountdown';
import {Text} from 'react-native';
import Stylesheet from '../../utils/styles';
import moment from 'moment';

const CountdownTimer = ({data}) => {
  const [days, hours, minutes, seconds] = useCountdown(
    new Date(
      moment().format('YYYY-MM-DD') +
        ' ' +
        (data?.clocked_in ? data?.shift_details?.to_time : ''),
    ).getTime()
  );

  if (days + hours + minutes + seconds <= 0) {
    return <Text style={Stylesheet.timerCounter}>00 : 00 : 00</Text>;
  } else {
    return (
      <>
        <Text style={Stylesheet.timerCounter}>
          {(hours || '00').toString().padStart(2, '0')} :{' '}
          {(minutes || '00').toString().padStart(2, '0')} :{' '}
          {(seconds || '00').toString().padStart(2, '0')}
        </Text>
      </>
    );
  }
};

export default CountdownTimer;

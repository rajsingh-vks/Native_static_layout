import React, {useState} from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import appColors from '../../utils/appColors';
import appStyles from '../../utils/appStyles';
import styles from '../../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ErrorText from './ErrorText';
import Modal from 'react-native-modal';
import {modalProps} from '../../utils/appHelpers';

const Input = ({
  inputMode = 'text',
  type = 'text', // 'date' | 'time' | 'text' | 'textarea' | 'radio' | 'button' | 'select',
  label = null,
  required = false,
  disabled = false,
  value = null,
  autoCapitalize = 'none',
  placeholder = '',
  placeholderTextColor = appColors.placeholderColor,
  iconName = null,
  maxDate = null,
  dateFormat = 'YYYY-MM-DD',
  visibleDateFormat = 'DD-MM-YYYY',
  numberOfLines = 2,
  errorMessage = null,
  data = [],
  bgColor = null,
  textColor = null,
  style = {},
  onChange = val => null,
  onPress = () => null,
}) => {
  const [modal, setModal] = useState(false);
  let selectedDateTime = new Date();
  if (type === 'time' && value) {
    selectedDateTime = new Date(moment(value, 'HH:mm').format());
  } else if (type === 'date' && value) {
    selectedDateTime = new Date(moment(value, dateFormat).format());
  }

  let selectedText = '';
  if (type === 'select') {
    for (let i = 0; i < data.length; i++) {
      let option_value = Object.keys(data[i])[0] || '';
      let option_label = data[i][option_value];
      if (String(value) === String(option_value)) {
        selectedText = option_label;
        break;
      }
    }
  }

  return (
    <>
      {/* Input label */}
      {label && (
        <Text style={[styles.inputLabel, appStyles.mt3]}>
          {label}
          {required && <Text style={appStyles.textDanger}> *</Text>}
        </Text>
      )}

      {/* Text input */}
      {type === 'text' && (
        <View style={[styles.inputwrapper]}>
          <TextInput 
            editable={!disabled}
            inputMode={inputMode}
            value={value}
            autoCapitalize={autoCapitalize}
            style={[styles.inputArea, style]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            backgroundColor={bgColor}
            onChangeText={val => onChange(val)}
          />
        </View>
      )}

      {/* Text input */}
      {type === 'textarea' && (
        <View style={[styles.inputwrapper, styles.input, {height: 60}, style]}>
          <TextInput
            inputMode={inputMode}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline={true}
            numberOfLines={numberOfLines}
            value={value}
            style={[appStyles.textArea]}
            onChangeText={val => onChange(val)}
          />
        </View>
      )}

      {/* Redio buttons */}
      {type === 'radio' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[appStyles.row]}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={'radio-' + index}
              onPress={() => onChange(Object.keys(item)[0] || null)}
              activeOpacity={0.7}
              style={[
                styles.radioBtn,
                value == (Object.keys(item)[0] || null)
                  ? styles.radioBtnActive
                  : '',
              ]}>
              <Text style={[styles.radioBtnTxt]}>
                {Object.values(item)[0] || null}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Button */}
      {type === 'button' && (
        <TouchableOpacity
          onPress={() => onPress()}
          style={[
            appStyles.btn,
            {backgroundColor: bgColor || appColors.dark700},
            style,
          ]}>
          <Text style={[appStyles.btnTxt, {color: textColor || 'white'}]}>
            {value}
          </Text>
        </TouchableOpacity>
      )}

      {/* Date and time input */}
      {(type === 'date') && (
        <View style={[styles.inputwrapper, {alignSelf: 'flex-start' }]}>
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDateTime}
            mode={type}
            is24Hour={true}
            maximumDate={maxDate ? new Date(maxDate) : null}
            onChange={(event, dateTime) => {
              setModal(false);
              if (event.type === 'set') {
                onChange(moment(dateTime, 'YYYY-MM-DD').format(dateFormat));
              }
            }}
            style={{marginLeft:0}}
          />
          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={[appStyles.h100, appStyles.row, appStyles.alignItemsCenter]}
            onPress={() => setModal(true)}>
            <TextInput
              inputMode={inputMode}
              style={styles.inputArea}
              placeholderTextColor={placeholderTextColor}
              editable={false}
              value={
                value
                  ? type === 'date'
                    ? moment(value, dateFormat).format(visibleDateFormat)
                    : value
                  : ''
              }
              placeholder={placeholder}
            />
            {iconName && (
              <Icon
                style={[appStyles.me2]}
                name={iconName}
                size={23}
                color={appColors.dark500}
              />
            )}
          </TouchableOpacity> */}
        </View>
      )}

      {(type === 'time') && (
        <View style={[styles.inputwrapper, {alignContent:'flex-start'}]}>
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDateTime}
            mode={type}
            is24Hour={true}
            maximumDate={maxDate ? new Date(maxDate) : null}
            onChange={(event, dateTime) => {
              setModal(false);
              if (event.type === 'set') {
                onChange(moment(dateTime, 'h:mm A').format('HH:mm'));
              }
            }}
          />
        </View>
      )}

      {/* Datetime Picker */}
      {modal && (type === 'date' || type === 'time') && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDateTime}
          mode={type}
          is24Hour={true}
          maximumDate={maxDate ? new Date(maxDate) : null}
          onChange={(event, dateTime) => {
            setModal(false);
            if (event.type === 'set') {
              if (type === 'time') {
                onChange(moment(dateTime, 'h:mm A').format('HH:mm'));
              } else if (type === 'date') {
                onChange(moment(dateTime, 'YYYY-MM-DD').format(dateFormat));
              }
            }
          }}
        />
      )}

      {type === 'select' && (
        <>
          <View style={[styles.inputwrapper, styles.input]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                appStyles.h100,
                appStyles.row,
                appStyles.alignItemsCenter,
              ]}
              onPress={() => setModal(true)}>
              <TextInput
                style={[styles.inputArea]}
                placeholderTextColor={placeholderTextColor}
                editable={false}
                value={selectedText}
                placeholder={placeholder}
              />
              <Icon
                style={[appStyles.me2]}
                name="caret-down-outline"
                size={15}
                color={appColors.dark500}
              />
            </TouchableOpacity>
          </View>
          <Modal
            {...modalProps.zoom}
            isVisible={modal}
            onBackdropPress={() => setModal(false)}
            style={[appStyles.modalContainer]}>
            <View style={[istyles.pickerModal, {height: data.length * 45}]}>
              <ScrollView>
                {data.map((item, index) => {
                  let value = Object.keys(item)[0] || '';
                  let label = item[value];
                  return (
                    <Pressable
                      key={'option-'+index}
                      onPress={() => {
                        setModal(false);
                        onChange(value);
                      }}
                      android_ripple={{
                        color: appColors.rippleBgColor,
                      }}
                      style={istyles.optionBtn}>
                      {selectedText === label ? (
                        <Icon
                          name="radio-button-on-outline"
                          size={15}
                          color={appColors.dark500}
                        />
                      ) : (
                        <Icon
                          name="radio-button-off-outline"
                          size={15}
                          color={appColors.dark500}
                        />
                      )}
                      <Text style={istyles.optionText}>{label}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>
        </>
      )}

      {/* Show Error message */}
      <ErrorText error={errorMessage} />
    </>
  );
};

export default Input;

const istyles = StyleSheet.create({
  pickerModal: {
    overflow: 'hidden',
    borderRadius: 3,
    minWidth: '80%',
    minHeight: 100,
    backgroundColor: 'white',
    maxHeight: '70%',
  },
  optionBtn: {
    height: 45,
    width: '100%',
    paddingLeft: 12,
    paddingStart: 20,
    // fontSize: 15,
    color: appColors.dark300,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    color: appColors.dark400,
    overflow: 'hidden',
    marginLeft: 7,
  },
});

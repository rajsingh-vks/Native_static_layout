import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deleteFiles,
  hidePopup,
  maxChar,
  showLoading,
  showPopup,
  showSuccessToast,
  uploadFile,
} from '../../utils/appHelpers';
import ErrorText from './ErrorText';
import appStyles from '../../utils/appStyles';
import DocumentPicker from 'react-native-document-picker';
import appColors from '../../utils/appColors';

const UploadFiles = ({
  multiple = false,
  onUploadSuccess = () => null, // return uploaded files in array
  onRemoveSuccess = () => null,
  label = 'Upload Documents',
  uploadPath = '',
  instituteId = '',
}) => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);

  // Crate files name with comma seprated and count total uploaded files
  const getFilesName = () => {
    let fileNames = '';
    let i = 0;
    files.forEach((item, index) => {
      fileNames += (fileNames ? ', ' : '') + item.name;
      i += 1;
    });
    return i > 1
      ? `${maxChar(fileNames, 20)} (${i} Files)`
      : `${maxChar(fileNames, 25)}`;
  };

  // Pick a single/Multiple file
  const uploadDocuments = async () => {
    await setFiles([]);
    await setError(null);
    try {
      let res = await DocumentPicker.pick({
        allowMultiSelection: multiple,
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.zip,
        ],
      });
      res = Array.isArray(res) && res.length > 0 ? res[0] : null;
      if (res) {
        const form_data = new FormData();
        form_data.append('filepond', res);
        form_data.append('path', uploadPath);
        form_data.append('institute_id', instituteId);
        uploadFile({
          formData: form_data,
          // setLoader: showLoading,
          setLoader: show => {
            show ? showPopup('progressbar', 'Uploading...') : hidePopup();
          },
          onComplete: data => {
            if (data.success) {
              setFiles([res]);
              setUploadedFiles(data?.file_path);
              onUploadSuccess(data?.file_path);
            } else if (data?.error) {
              setError(data?.message);
            }
          },
        });
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        setError(error.message);
      }
    }
  };
  return (
    <>
      <View style={[styles.attachment]}>
        <TouchableOpacity
          disabled={uploadedFiles.length > 0 ? true : false}
          style={styles.attachmentUploadBtn}
          onPress={() => uploadDocuments()}>
          {uploadedFiles.length <= 0 && (
            <Icon name="cloud-upload-outline" size={25} color={'#555'} />
          )}
          <Text
            style={[
              styles.attachmentText,
              {color: files.length > 0 ? 'green' : '#555'},
            ]}>
            {files.length > 0 ? getFilesName() : label}
          </Text>
        </TouchableOpacity>
        {uploadedFiles.length > 0 && (
          <TouchableOpacity
            style={styles.attachmentDeleteBtn}
            onPress={() => {
              deleteFiles({
                file_path: uploadedFiles,
                onComplete: res => {
                  setFiles([]);
                  setUploadedFiles([]);
                  showSuccessToast(res?.message);
                  onRemoveSuccess(res);
                },
              });
            }}>
            <Icon2
              name="delete-circle-outline"
              size={25}
              color={appColors.red}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={[appStyles.textSecondary, appStyles.fs1, appStyles.mt1]}>
        Allowed file types : jpeg, jpg, png, pdf, zip (Max file size: 10MB)
      </Text>
      <ErrorText error={error} align="center" style={appStyles.mt2} />
    </>
  );
};

export default UploadFiles;

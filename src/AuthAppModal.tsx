import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AuthAppModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AuthAppModal: React.FC<AuthAppModalProps> = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>提示</Text>
          <Text style={styles.desc}>当前设备暂未安装Chainless应用</Text>
          <TouchableOpacity onPress={onConfirm} style={styles.linkBtn}>
            <Text style={styles.linkText}>跳转到第三方浏览器页面进行下载安装？</Text>
          </TouchableOpacity>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>不，谢谢</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
              <Text style={styles.confirmText}>立即跳转</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  desc: {
    fontSize: 15,
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  linkBtn: {
    marginBottom: 20,
    paddingHorizontal:8,
    width:'100%',
    paddingVertical:6,
    borderRadius:8,
    backgroundColor:"#F3F8FF"
  },
  linkText: {
    color: '#1890ff',
    fontSize: 15,
    textAlign: 'center',
    // textDecorationLine: 'underline',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#f2f3f5',
    borderRadius: 8,
    marginRight: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#1890ff',
    borderRadius: 8,
    marginLeft: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default AuthAppModal; 
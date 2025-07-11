import React, { useEffect, useState, useCallback } from 'react';
import { Linking } from 'react-native';
import AuthAppModal from './AuthAppModal';
import axios from 'axios';

interface UseLaunchAuthAppOptions {
  clientId: string;
  onDeepLink?: (url: string, params: Record<string, string>) => void;
  CustomModal?: React.ComponentType<{
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
  }>;
}

const parseQueryParams = (url: string): Record<string, string> => {
  const queryString = url.split('?')[1];
  if (!queryString) return {};
  const entries = queryString.split('&').map(part => {
    const [key, value] = part.split('=');
    return [decodeURIComponent(key), decodeURIComponent(value)];
  });
  if (typeof Object.fromEntries === 'function') {
    return Object.fromEntries(entries);
  } else {
    const obj: Record<string, string> = {};
    entries.forEach(([k, v]) => { obj[k] = v; });
    return obj;
  }
};

export const useLaunchAuthApp = (options: UseLaunchAuthAppOptions) => {
  const { clientId, onDeepLink, CustomModal } = options;
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string>('https://download.chainlessdw20.com/');

  // 监听被其他App拉起
  useEffect(() => {
    if (!onDeepLink) return;
    const handleDeepLink = (event: { url: string }) => {
      const params = parseQueryParams(event.url);
      onDeepLink(event.url, params);
    };
    const sub = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });
    return () => sub.remove();
  }, [onDeepLink]);

  // 尝试唤起App
  const launch = useCallback(async () => {
    try {
      const resultInfo = await axios.get('http://59.36.210.102:8064/oauth2/client_info', {
        params: {
          client_id: clientId,
        },
      });
      console.log('resultInfo',resultInfo)
      if(resultInfo.data.code != 0){
        return {
            success:false,
            // data:resultInfo.data.data,
            message:resultInfo.data.msg
        };
      }
     
      await Linking.openURL('com.chainlessandroid.app://login?clientId=' + clientId);

       return {
            success:true,
            // data:resultInfo.data.data,
            message:''
        };

    } catch (error) {
        console.log(444444444,error)
    }
  }, [clientId]);

  // 跳转到第三方浏览器
  const handleConfirm = useCallback(() => {
    if (pendingUrl) {
      Linking.openURL(pendingUrl);
    }
    setModalVisible(false);
  }, [pendingUrl]);

  // 关闭弹窗
  const handleCancel = useCallback(() => {
    setModalVisible(false);
  }, []);

  // Modal 组件，支持自定义
  const ModalComponent = CustomModal || AuthAppModal;
  const AuthModal = (
    <ModalComponent
      visible={modalVisible}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );

  return { launch, AuthModal };
};

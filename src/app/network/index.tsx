/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useRef } from 'react';
import axios, { AxiosInstance } from 'axios';

import { useKeycloak } from '@react-keycloak/web';

export const useAxios = () => {
  const axiosInstance = useRef<AxiosInstance>();
  const { keycloak, initialized } = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  const myBaseUrl = process.env.REACT_APP_BASE_URL || 'https://gateway.bolead.creo.tn/';

  useEffect(() => {
    axiosInstance.current = axios.create({
      baseURL: myBaseUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        Authorization: initialized ? `Bearer ${kcToken}` : undefined,
      },
    });

    return () => {
      axiosInstance.current = undefined;
    };
  }, [myBaseUrl, initialized, kcToken]);

  return axiosInstance;
};
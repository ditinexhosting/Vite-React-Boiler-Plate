/**
 * @version 1.0.1
 * Updated On : March 27, 2025
 * This is a wrapper element on the root component.
 * It handles all additional work and states needed before initializing root component.
 */
import { Alert, theme } from 'antd';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useErrorLog } from 'src/hooks';
const { ErrorBoundary } = Alert;
const { darkAlgorithm, defaultAlgorithm } = theme;
const { useToken } = theme;

const PermissibleUI = ({ allowedPermissions = [], children }) => {
  //-------------- State & Variables --------------//
  const handleError = useErrorLog('lib/PermissibleUI');
  const dispatch = useDispatch();
  const { permission_list } = useSelector((state) => state.permission);
  const { isLoading } = useSelector((state) => state.session);

  //-------------- Use Effects --------------//
  const isVisible = useMemo(() => {
    return allowedPermissions.every((element) => permission_list.includes(element));
  }, [allowedPermissions, permission_list]);
  
  //-------------- Other Methods --------------//

  return isVisible ? children : <></>;
};

export { PermissibleUI };

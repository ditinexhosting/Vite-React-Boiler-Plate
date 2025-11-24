/**
 * @version 0.0.1
 * Updated On : Nov 24, 2025
 * This is the Login page.
 */
import { Button, Segmented } from "antd";
import { loadingStart, loadingStop, setLanguage } from "@/redux/action";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

//import components and hooks
import { GoogleIcon } from "src/components";
import { LANGUAGES, ROUTES } from "src/utils";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userSession, isLoading } = useSelector((state) => state.session);
  const { transcript, activeLanguage } = useSelector((state) => state.language);

  // Redirect if authenticated
  useEffect(() => {
    // if (userSession?.access_token) navigate(ROUTES.HOME, { replace: true });
  }, [location.pathname, userSession]);

  // Google OAuth
  const onGoogleAuth = () => {
    dispatch(loadingStart("login-google-icon"));
    setTimeout(() => {
      dispatch(loadingStop());
      navigate(ROUTES.DASHBOARD_HOME, { replace: true });
    }, 3000);
  };

  const onChangeLanguage = (lang) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div className="min-h-screen theme-background relative flex justify-center items-center">
      {/* Center Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="flex flex-col bg-bodyBg card-box-shadow rounded-3xl p-4"
      >
        <div className="flex flex-row justify-end pb-4 gap-4">
          <Segmented
            options={Object.keys(LANGUAGES)}
            value={activeLanguage}
            onChange={onChangeLanguage}
          />
        </div>
        <h1 className="py-4 text-center text-2xl font-bold text-black dark:text-white">
          {transcript.login.title}
        </h1>
        <div className="text-center text-secondary max-w-2xs self-center py-4">
          {transcript.login.subtitle}
        </div>
        <div className="space-y-3">
          <Button
            ghost={true}
            variant="outline"
            onClick={onGoogleAuth}
            className="w-full h-12 text-base font-medium text-primary! hover:text-primary/50! rounded-full transition-all duration-200 shadow-sm border-primary! hover:border-primary/50!"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {transcript.login.google_login_button}
          </Button>
          <p className="text-muted font-medium text-[8px] text-center self-center max-w-2xs">
            {transcript.login.footer[0]}{" "}
            <a href="" className="text-primary! hover:text-primary/80!">
              {transcript.login.footer[1]}
            </a>{" "}
            {transcript.login.footer[2]}{" "}
            <a href="" className="text-primary! hover:text-primary/80!">
              {transcript.login.footer[3]}
            </a>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const AR = {
  login: {
    title: "مرحبًا بك في تووتAI",
    subtitle: "يرجى تسجيل الدخول بحساب Google لبدء الدردشة مع منسق الأزياء الشخصي الخاص بك.",
    google_login_button: "تواصل مع جوجل",
    login_failed_message: "فشل في تسجيل الدخول.",
    footer: ["الدخول", "الدخول", "الدخول", "الدخول"]
  },
  dashboard: {
    greeting: (name) => {
      return `مرحباً ${name} كيف يمكنني مساعدتك؟`;
    }
  }
};

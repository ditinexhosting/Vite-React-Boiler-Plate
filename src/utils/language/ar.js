export const AR = {
  login: {
    title: 'مرحبًا بك في تووتAI',
    subtitle: 'يرجى تسجيل الدخول بحساب Google لبدء الدردشة مع منسق الأزياء الشخصي الخاص بك.',
    google_login_button: 'تواصل مع جوجل',
    login_failed_message: 'فشل في تسجيل الدخول.'
  },
  dashboard: {
    greeting: (name) => {
      return `مرحباً ${name} كيف يمكنني مساعدتك؟`;
    },
    wedding_collection: 'مجموعة الزفاف',
    casual_wear: 'ملابس غير رسمية',
    summer_collection: 'مجموعة الصيف',
    more: 'أكثر',
    disclaimer: 'قد يرتكب روبوت الدردشة أخطاءً. راجع السياسات. راجع تفضيلات ملفات تعريف الارتباط.',
    textarea_placeholder: 'ماذا تريد أن تبحث عنه؟',
    preference: 'التفضيل'
  }
};

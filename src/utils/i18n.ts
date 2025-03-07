import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resourses = {
  en: {
    translation: {
      home: {
        header: {
          signup: 'Signup',
          login: 'Login'
        },
        landing: {
          get_started: 'Get Started'
        }
      },
      auth: {
        login: {
          title: 'Login',
          email: 'Email',
          password: 'Password',
          submit: 'Login',
          signup: 'Signup',
          dont_have_an_account: 'Don\'t have an account?',
          enter_your_email: 'Enter your email',
          enter_your_password: 'Enter your password'
        },
        signup: {
          title: 'Signup',
          first_name: 'First Name',
          last_name: 'Last Name',
          email: 'Email',
          password: 'Password',
          submit: 'Signup',
          login: 'Login',
          have_an_account: 'Already have an account?',
          enter_your_email: 'Enter your email',
          enter_your_password: 'Enter your password',
          enter_your_password_again: 'Enter your confirm password'
        }
      },
      sidebar: {
        todos: 'Todos',
        categories: 'Categories',
        logout: 'Logout',
        welcome: 'Hi, {{name}}'
      },
      todos: {
        page: {
          title: 'Todos',
          add: 'Add Todo',
          search: 'Search Todo',
          category_filter: 'Category: {{category}}'
        },
        card: {
          edit: 'Edit',
          delete: 'Delete'
        },
        form: {
          title: 'Title',
          description: 'Description',
          category: 'Category',
          not_found: 'No categories found',
          submit: 'Add'
        }
      },
      categories: {
        page: {
          title: 'Categories',
          add: 'Add Category',
          submit: 'Add'
        }
      }
    }
  },
  ar: {
    translation: {
      home: {
        header: {
          signup: 'إنشاء حساب',
          login: 'تسجيل الدخول'
        },
        landing: {
          get_started: 'ابدأ الآن',
        }
      },
      auth: {
        login: {
          title: 'تسجيل الدخول',
          email: 'البريد الالكتروني',
          password: 'كلمة المرور',
          submit: 'تسجل الدخول',
          signup: 'إنشاء حساب',
          dont_have_an_account: 'ليس لديك حساب؟',
          enter_your_email: 'أدخل بريدك الإلكتروني',
          enter_your_password: 'أدخل كلمة المرور'
        },
        signup: {
          title: 'إنشاء حساب',
          first_name: 'الاسم الأول',
          last_name: 'الاسم الأخير',
          email: 'البريد الالكتروني',
          password: 'كلمة المرور',
          submit: 'إنشاء حساب',
          login: 'تسجيل الدخول',
          have_an_account: 'لديك حساب بالفعل؟',
          enter_your_email: 'أدخل بريدك الإلكتروني',
          enter_your_password: 'أدخل كلمة المرور',
          enter_your_password_again: 'أدخل تأكيد كلمة المرور'
        }
      },
      sidebar: {
        todos: 'المهام',
        categories: 'التصنيفات',
        logout: 'تسجيل الخروج',
        welcome: 'مرحبًا، {{name}}'
      },
      todos: {
        page: {
          title: 'المهام',
          add: 'إضافة مهمة',
          search: 'ابحث عن مهمة',
          category_filter: 'التصنيف: {{category}}'
        },
        card: {
          edit: 'تعديل',
          delete: 'حذف'
        },
        form: {
          title: 'العنوان',
          description: 'الوصف',
          category: 'التصنيف',
          not_found: 'لا توجد تصنيف',
          submit: 'إضافة'
        }
      },
      categories: {
        page: {
          title: 'التصنيفات',
          add: 'إضافة تصنيف',
          submit: 'إضافة'
        }
      }
    }
  } 
}

const savedLanguage = localStorage.getItem('language') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: resourses,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
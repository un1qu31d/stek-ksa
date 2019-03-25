const languages = [
  {
    name: 'en',
    content: {
      newsletterFromInputEmailRequiredTitle: '',
      newsletterFromInputEmailRequiredContent: 'email field is required'
    }
  },
  {
    name: 'ar',
    content: {
      newsletterFromInputEmailRequiredTitle: '',
      newsletterFromInputEmailRequiredContent: 'حقل البريد الالكترونى مطلوب',
    }
  }
];
const language = languages.find(language => language.name === document.querySelector('html').getAttribute('lang')).content;
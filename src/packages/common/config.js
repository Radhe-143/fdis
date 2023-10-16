const language = {
  en: 'en',
  vi: 'vi'
}

const languageList = Object.values(language)
const baseLanguage = language.en

const available = {
  available: 1,
  unavailable: 0
}

const availableList = Object.values(available)

const blocked = {
  blocked: 1,
  nonblocked: 0
}

const blockedList = Object.values(blocked)

const deleted = {
  deleted: 1,
  undeleted: 0
}

const deletedList = Object.values(deleted)

export default {
  limit: {
    index: 20
  },
  available,
  availableList,
  blocked,
  blockedList,
  language,
  languageList,
  baseLanguage,
  deleted,
  deletedList
}

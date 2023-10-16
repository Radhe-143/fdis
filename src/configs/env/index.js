import amazon from './cross-env/amazon'

const app = {
  env: {
    production: 'production',
    development: 'development',
    test: 'test'
  },

  conventions: {
    number: 0,
    array: [],
    string: '',
    object: null
  },
  errorResponse: {
    create: 'Create failed!',
    update: 'Update failed!',
    destroy: 'Delete failed!',
    show: 'Not Found!',
    existed: 'Title field already existed!',
    common: 'Name field or Email field already existed!',
    format: 'SVG format is not supported',
    notMatchingPassword: 'Password must match repeatPassword',
    limit: 'File size must be smaller 5MB',
    invalidFile: 'File format must be png or jpg or gif or jpeg!'
  },

  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
    phone: /^\+?1?(\d{4,16}$)/,
    email: /\S+@\S+\.\S+/,
    password: /^[a-f0-9]{32}$/,
    code: /^[0-9]{4}$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    time: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
  },

  format: {
    date: 'DD/MM/YYYY, HH:mm'
  },

  refreshTokenLifeTime: '30d',
  accessTokenLifeTime: '7d',

  fileSize: {
    limit: 1024 * 1024 * 5
  },
  media: {
    imageSizeLimit: {
      limit: 1024 * 1024 * 5,
      text: '5 Mb',
      ext: ['.png', '.jpg', '.gif', '.jpeg']
    },
    docs: {
      limit: 1024 * 1024 * 5,
      text: '5 Mb',
      ext: ['.pdf', '.doc', '.docx', '.png', '.jpg', '.gif', '.jpeg']
    }
  },
  imageDimensions: {
    thumbnail: {
      width: 800,
      height: 800
    },
    feature: {
      width: 1200
    },
    avatar: {
      width: 200,
      height: 200
    }
  },

}

export default Object.assign(app, amazon)

const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['is-admin'] = require('../middleware/is-admin.js')
middleware['is-admin'] = middleware['is-admin'].default || middleware['is-admin']

export default middleware

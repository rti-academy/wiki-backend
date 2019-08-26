module.exports = {
    apps : [
        {
            name: 'wiki-backend-dev',
            script: "dist/app.js",
            logs: 'logs',
            env: {
                'NODE_ENV': 'dev'
            }
        }
    ]
}

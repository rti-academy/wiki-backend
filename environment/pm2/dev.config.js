module.exports = {
    apps : [
        {
            name: 'wiki-backend-dev',
            script: "dist/app.js",
            logs: 'logs',
            env: {
                'NODE_ENV': 'dev',
                'UPLOADS_HOSTNAME': '//82.202.226.246'
            }
        }
    ]
}

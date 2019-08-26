module.exports = {
    apps : [
        {
            name: 'wiki-backend',
            script: "dist/app.js",
            logs: 'logs',
            env: {
                'NODE_ENV': 'prod'
            }
        }
    ]
}

module.exports = {
    apps : [
        {
            name: 'wiki-backend-dev',
            script: "dist/app.js",
            logs: 'logs',
            env_production : {
                "NODE_ENV": "dev"
            }
        }
    ]
}

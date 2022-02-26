const path = require("path")
const addPath = dir => path.join(__dirname, dir);
module.exports = {
    webpack: {
        alias: {
            "@": addPath("src"),
            "components": addPath("src/components"),
            "routes": addPath("src/routes"),
            "pages": addPath("src/pages"),
            "assets": addPath("src/assets"),
            "service": addPath("src/service"),
        }
    },
}

const path = require('path');
const fs = require('fs');

module.exports = function (grunt)
{
    //#region Config
    grunt.initConfig({
        webpack: {
            options: {
            },
            prod: require('./webpack.config'),
            dev: require('./webpack.debug.config'),
        },
        prettier: {
            options: {
                progress: true,
                useTabs: true,
                tabWidth: 5,
                bracketSpacing: true,
                arrowParens: "avoid",
                jsxBracketSameLine: false
            },
            files: {
                src:
                    [
                        'dist/vrcontrols.d.ts'
                    ]
            }
        },
        cssmin: {
            target: {
                files: {
                    './dist/vrcontrols.all.min.css': ['./dist/definitions/vrcontrols.all.css']
                }
            },
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['webpack'],
                options: {
                    interrupt: true,
                },
            },
        },
        run: {
            options: {
                // ...
            },
            compodoc: {
                exec: 'npm run compodoc'
            }
        }
    });
    //#endregion

    grunt.loadNpmTasks("grunt-webpack");
    grunt.loadNpmTasks('grunt-prettier');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask("removeDefinitionsFolder", "Remove definitions folder", function () 
    {
        let rimraf = require("rimraf");
        rimraf.sync("./dist");
    });

    //#region Create definition files
    grunt.registerTask("createDefinitionFiles", "Create definition (.d) files", function () 
    {
        let destinationContentReaded = "";
        let fileNameList = walk("./dist/definitions/");

        //#region Read files and place #region
        for (let i = 0; i < fileNameList.length; i++)
        {
            let filename = path.resolve(String(fileNameList[i]));
            if (!filename.endsWith(".d.ts"))
                continue;

            let regionName = filename.split("\\")[filename.split("\\").length - 1].replace(".d.ts", "");
            if (regionName === "vr")
                regionName = "vrFactory";

            destinationContentReaded += "//#region " + regionName + "\r\n";
            let content = fs.readFileSync(filename, 'utf8');
            destinationContentReaded += content;
            destinationContentReaded += "//#endregion";

            if (i < fileNameList.length - 1)
                destinationContentReaded += "\r\n\r\n";
        }
        //#endregion

        //#region Clear output
        let destinationContent = "declare module vr {";
        let destinationContentLines = destinationContentReaded.split(/\r?\n/);
        for (let line of destinationContentLines)
        {
            if (line.startsWith("///") || line.startsWith("import") || line.includes("private"))
                continue;

            if (line.includes("global"))
                break;

            line = line.replace(" {", "\r\n{");
            destinationContent += line.replace(/declare /g, "") + "\r\n";
        }
        destinationContent += "}";
        //#endregion

        let ffs = require("fs");
        let destinationPath = path.resolve("./dist/vrcontrols.d.ts");
        ffs.writeFileSync(destinationPath, destinationContent, { encoding: "utf8", flag: "w" });
    });
    //#endregion

    //#region Lets make art
    grunt.registerTask("asciiart", "Lets make art", function ()
    {
        console.log('\x1b[36m', `
 < mooooooooooooooooooooooooooooooooooooo >
  `);

        console.log('\x1b[33m', `        \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||`);
        console.log('\x1b[32m', `----------------------------------------
           < build succeeded >`);
    });
    //#endregion

    //#region Merge CSS
    grunt.registerTask("mergeCss", "Merge css and create .all.css file", function () 
    {
        let destinationContentReaded = "";
        let fileNameList = walk("./src/styles/");

        //#region Read files and place #region
        for (let i = 0; i < fileNameList.length; i++)
        {
            let filename = path.resolve(String(fileNameList[i]));
            if (!filename.endsWith(".css"))
                continue;

            let content = fs.readFileSync(filename, 'utf8');
            destinationContentReaded += content;

            if (i < fileNameList.length - 1)
                destinationContentReaded += "\r\n\r\n";
        }
        //#endregion

        let ffs = require("fs");
        let destinationPath = path.resolve("./dist/definitions/vrcontrols.all.css");
        ffs.writeFileSync(destinationPath, destinationContentReaded, { encoding: "utf8", flag: "w" });
    });
    //#endregion

    //#region Copy files to production enviroments
    grunt.registerTask("copyFilesToProduction", "Copy files to production environments", function ()
    {
        let ffs = require("fs");

        //#region Definition files
        let definitionFilesToCopy = [path.resolve("./dist/vrcontrols.d.ts")];
        let productionDefitinionFolders =
            [
                path.resolve("N://Vettore.CRM/client.Patient/types/"),
                path.resolve("N://Vettore.Client/client.MedicalReportDelivery/types/"),
                path.resolve("N://Mediblu/Vettore.Doctor/Vettore.Doctor/Scripts/"),
                path.resolve("N://Vettore.Web/trunk/Vettore.Web/Vettore.Web/Scripts/"),
                path.resolve("N://Vettore.Web/24.prod/Vettore.Web/Vettore.Web/Scripts/"),
                path.resolve("N://Vettore.Web/24.dev/Vettore.Web/Vettore.Web/Scripts/"),
            ];

        for (let path of productionDefitinionFolders)
        {
            for (let file of definitionFilesToCopy)
            {
                let realPath = path + "/" + file.split("\\")[file.split("\\").length - 1];
                let content = fs.readFileSync(file, 'utf8');
                ffs.writeFileSync(realPath, content, { encoding: "utf8", flag: "w" });
            }
        }
        //#endregion

        //#region Production files

        //#region Js files
        let jsFilesToCopy =
            [
                path.resolve("./dist/vrcontrols.all.min.js"),
                path.resolve("./dist/vrcontrols.all.min.js.map")
            ];
        let productionJsFiles =
            [
                path.resolve("N://Vettore.CRM/server/Vettore.CRM/wwwroot/scripts/"),
                path.resolve("N://Mediblu/Vettore.Doctor/Vettore.Doctor/Scripts/"),
                path.resolve("N://Vettore.Web/trunk/Vettore.Web/Vettore.Web/Scripts/"),
                path.resolve("N://Vettore.Web/24.prod/Vettore.Web/Vettore.Web/Scripts/"),
                path.resolve("N://Vettore.Web/24.dev/Vettore.Web/Vettore.Web/Scripts/"),
            ];
        for (let path of productionJsFiles)
        {
            for (let file of jsFilesToCopy)
            {
                let realPath = path + "/" + file.split("\\")[file.split("\\").length - 1];
                let content = fs.readFileSync(file, 'utf8');
                ffs.writeFileSync(realPath, content, { encoding: "utf8", flag: "w" });
            }
        }
        //#endregion

        //#region Css files
        let cssFilesToCopy =
            [
                path.resolve("./dist/vrcontrols.all.min.css")
            ];
        let productionCssFiles =
            [
                path.resolve("N://Vettore.CRM/server/Vettore.CRM/wwwroot/styles/"),
                path.resolve("N://Mediblu/Vettore.Doctor/Vettore.Doctor/styles/"),
                path.resolve("N://Vettore.Web/trunk/Vettore.Web/Vettore.Web/styles/"),
                path.resolve("N://Vettore.Web/24.prod/Vettore.Web/Vettore.Web/styles/"),
                path.resolve("N://Vettore.Web/24.dev/Vettore.Web/Vettore.Web/styles/"),
            ];
        for (let path of productionCssFiles)
        {
            for (let file of cssFilesToCopy)
            {
                let realPath = path + "/" + file.split("\\")[file.split("\\").length - 1];
                let content = fs.readFileSync(file, 'utf8');
                ffs.writeFileSync(realPath, content, { encoding: "utf8", flag: "w" });
            }
        }
        //#endregion

        //#endregion

    });
    //#endregion   

    // Run tasks
    grunt.registerTask("default", ["removeDefinitionsFolder", "webpack:dev", "createDefinitionFiles", "mergeCss", "cssmin", "copyFilesToProduction", "asciiart"]);
    grunt.registerTask("dev", ["removeDefinitionsFolder", "webpack:dev", "createDefinitionFiles", "mergeCss", "cssmin", "copyFilesToProduction", "asciiart"]);
    grunt.registerTask("prod", ["removeDefinitionsFolder", "webpack:prod", "createDefinitionFiles", "prettier", "mergeCss", "cssmin", "copyFilesToProduction", "run:compodoc", "asciiart"]);
    grunt.registerTask("prodNopret", ["removeDefinitionsFolder", "webpack:prod", "createDefinitionFiles", "mergeCss", "cssmin", "copyFilesToProduction", "run:compodoc", "asciiart"]);

    //#region Support
    function walk(dir)
    {
        let files = fs.readdirSync(dir);
        files = files.map(file =>
        {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) return walk(filePath);
            else if (stats.isFile()) return filePath;
        });
        return files.reduce((all, folderContents) => all.concat(folderContents), []);
    }
    //#endregion
};
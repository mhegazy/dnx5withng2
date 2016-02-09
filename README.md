# asp.net 5 with angular 2 support

I found there to be a mix of angular 2 [ng2] references, some based on building solutions using no existing host environments and others with details
on how to make use of it in the context of current generation asp.net [ execution environment, aka dnx ] 5 web app host environment.  The solutions 
contained in this repo are intended as a guide for what i found was necessary to make things work in asp.net 5 web app environment, with typescript 
support, as that is the target environment i wanted to work from with my angular 2 exploration.

### references used
1. [angular 2 for typescript 5 minute quick start](https://angular.io/docs/ts/latest/quickstart.html) which covers basics of angular 2 with typescript support
but some settings that don't readily cross over to asp.net 5 web app environment  

2. [asp.net 5 and angular 2](http://bifrost.pro/page/asp-net-5-and-angular-2/) which covers more specific details on enabling asp.net 5 web api environment
with support for angular 2 but had some issues i found specifically around how where to put things, for reasons noted below, and how to make use of gulp 
task execution environment for replicating necessary parts of npm packages used in typescript build process that need to be present in wwwroot structure  

3. [angular 2 quickstart with visual studio code project settings](https://github.com/joergjo/angular2-quickstart) which covers details on enabling a
[visual studio code](https://code.visualstudio.com/) project with settings necessary to support angular 2 development  

###notes
\- in reference 1 and 3 it denotes use of node_modules/systemjs/dist/system.src.js vs /system.js and node_modules/angular2/bundles/angular2.dev.js vs /angular.js 
to enable un-minified step in (f11) debugging support of these modules.  Similarly reference 2 denotes use of node_modules/angular2/bundles/router.dev.js 
vs /router.js for the same reason and includes this module reference to enable ng2 functionality that the quick starts don't get into.

\- in reference 3 it denotes use of node_modules/es6-shim/es6-shim.js which "provides compatibility shims so that legacy javaScript engines behave as 
closely as possible to ecmaScript 6".  For example the es6-shim is need for ie11 support but not for evergreen browsers like edge, chrome, etc..  More 
details see the package's [project site](https://www.npmjs.com/package/es6-shim).  I found it unexpected that things don't work if you set typescript 
compiler to produce ecmaScript 6 output using tsconfig.json "target": "es5" -> "es6" entry.

\- in reference 2 it denotes use if <script src="https://code.angularjs.org/..."></script> references in ng2 enabled html files which i've tested covering 
instead using <script src="node_modules/..."></script> references where that wwwroot/node_modules folder structure is populated using gulpfile.js task that
copies from $(ProjectDir)node_modules folder whose files get maintained by npm package.json settings.  In the task execution explorer you can run this task
adhoc or using Bindings to configure it automatically execute when "After Build" or "Project Open" events occur.  This would suggest that ones repo .gitignore
will need to have "node_modules/" entry changed to "**/node_modules/*", similar to what is in place for nuget packages ignore, so that you are not inadvertantly
checking in this npm restore + gulp task managed files.

\- in case of asp.net web application | asp.net 5 templates | empty example the project.json dependencies needs to have "Microsoft.AspNet.StaticFiles": "1.0.0-rc1-final"
add so that Startup.cs | Configure() can use app.UseStaticFiles(); in lieu of app.Run(async (context) => { });

\- all examples made use of a typescript compiler tsconfig.json file with "outDir": "wwwroot/app" entry to cause $(SolutionDir)app\*.ts output to be placed
in $(SolutionDir)wwwroot\app folder.  Using the default system.js module loader configuration it expects to load your components source path from /app 
folder path.  If you need to use something other than that convention start with https://github.com/systemjs/systemjs/blob/master/docs/config-api.md for
details on how to modify the default configuration settings. 

\- while the ide intellisense suggests that placing // and /* */ comments in your gulpfile.js, package.json, project.json, tsconfig.json is supported
you'll find that it is not and generates build output window errors and results

\- currently when you change tsconfig.json target: "es5" -> "es6" it will cause "error TS2300: Duplicate identifier" errors. The 
issue is that ng2 ships a copy of es6-shims.d.ts, that defined pieces of the es6 language runtime, specifically Promises. When you
use –t ES6, the compiler automatically includes a different version of the standard library, lib.es6.d.ts vs. lib.d.ts for --t es5, 
that has a definition of Promise as well. So you get the duplicate definition errors. The angular team has a fix for this issue, 
by removing the typings files shipped in the package. I do not know when that will land in their master branch, but I can check 
and get back to you. Meanwhile to solve the issue, copy lib.d.ts and include it in your project, this will force the compiler to 
include it all the time and do not include lib.es6.d.ts, e.g. 
pushd $(ProjectDir)
// pushd "%programfiles(x86)%\Microsoft SDKs\TypeScript\1.7" & dir /s /b lib*.d.ts -> lib.d.ts & lib.es6.d.ts
// robocopy "%programfiles(x86)%\Microsoft SDKs\TypeScript\1.7" app\typings lib.d.ts
// pushd node_modules\typescript\lib & dir /s /b lib*.d.ts -> lib.d.ts & lib.es6.d.ts
robocopy node_modules\typescript\lib app\typings lib.d.ts -> causes "error TS2318: Cannot find global type"
ren node_modules\typescript\lib\lib.es6.d.ts lib.es6.d.ts.bak -> causes "error TS2318: Cannot find global type"
// pushd node_modules\angular2\typings\es6-shim & dir 
// ren $(ProjectDir)node_modules\angular2\typings\es6-shim\es6-shim.d.ts es6-shim.d.ts.bak
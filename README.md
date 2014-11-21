#Projise
This is going to be a rebuild of projise with a few modifications and additional features.  
Demo: [Link](http://projise-klind.rhcloud.com/) - test@test.com/test, free account on openshift which puts it to sleep, sometimes needs a refresh.  
Domain model and design: [Link](https://github.com/kristofferlind/projise/blob/master/documentation/domain.md)  
Source: [Link](https://github.com/kristofferlind/projise)

##Description
Projise is a realtime multiuser project management system with project, sprint, story and task management aswell as team management, document management, chat and ideas with voting. I also want to add calendar functionality, remote management from IDE, voice chat, charts and more statistics aswell as improvements to assessments by analyzing statistics.

##Technology
Current application uses mongodb, node, express, angular and socket.io
New application will use mongodb, .net web api, .net mvc, angular and signalr

Node, grunt, karma and protractor are and will be used for client and e2e testing.

##Modifications
* Will probably use signalr instead of socket.io, found a library for socket.io, but i'm pretty sure it's nowhere near as stable.
* Remote management from IDE will not be implemented(it's not in there now either, just an idea in the model)
* I might skip team management and document management to save time.
* Add commit logs
* Add calendar functionality
* Add a home page showing some statistics to get more mvc views (this will be a few presentation pages, home, stats, about, contact)

##External Apis
Which external apis are used might change, calendar is probably a great idea. Not that sure about the commit log though. These will change if I figure something a bit more interesting out. Guessing I have a few weeks of work before I can think about adding new features.

##Bonus tasks
* add configurable public project reports using mvc (configuration in spa, public page in mvc)
* add private messages and voice chat to chatpanel
* add IDE remote
* make current travis tasks work with .net (if it's even possible)

Would nice to find something comparable to code climate, pretty sure they don't support c#

##Solution structure
no route - Domain model project
/ - mvc project
/api - api project
/dashboard - spa project

##Api endpoints
* /api/project
* /api/sprint
* /api/story
* /api/task
* /api/user
* /api/team
* /api/documentData
* /api/documentMeta - Would be nice to figure out some nice way to put these two together

##Problems with requirements
* Most of the c# parts of the application will be api points for the spa, tried adding a few views with presentation page and moving authentication to mvc (not completely sure about this)
* Use of 2 external apis, spa will use all of the api points aswell as github and google (these two are required for WT2) Stats page was added to make sure I use the api in the mvc project aswell
* Not sure i can make mongodb work with entity framework, couldn't find any library for it. Guessing it's pretty hard to implement. Not very useful either as entity is an orm.

##General problems
* Need to figure out where to deploy, azure? (mongodb is not allowed on my binero server, .net is not allowed on my openshift account, pretty sure school server doesn't have mongodb)
* Lack of knowledge about nosql security, especially when used in combination with .net
* Need to implement equivalents to mongoose's onsave, onremove and populate. onsave and onremove are probably easy, populate might be hard?
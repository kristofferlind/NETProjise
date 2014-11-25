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

Node, grunt, karma and protractor will be used for client and e2e testing.

##Modifications
* Will probably use signalr instead of socket.io, found a library for socket.io, but i'm pretty sure it's nowhere near as stable.
* Remote management from IDE will not be implemented(it's not in there now either, just an idea in the model)
* I might skip team management and document management to save time.
* Add commit logs
* Add calendar functionality
* Add a home page showing some statistics to get more mvc views (this will be a few presentation pages, home, stats, about, contact)

##External Apis
Which external apis are used might change, calendar is probably a great idea. Not that sure about the commit log though. These will change if I figure something a bit more interesting out. Guessing I have a few weeks of work before it's time to add these features.

##Bonus tasks
* add configurable public project reports using mvc (configuration in spa, public page in mvc)
* add private messages and voice chat to chatpanel
* add IDE remote
* make current travis tasks work with .net (if it's even possible)

##Solution structure
* no route - Domain model project
* / - mvc project
* /api - api project
* /dashboard - spa project

##Api endpoints
* /api/project
* /api/sprint
* /api/story
* /api/task
* /api/user
* /api/team
* /api/idea
* /api/documentData
* /api/documentMeta

##Problems with requirements
###1DV409
* Most of the c# parts of the application will be api points for the spa, tried adding a few views with presentation page and moving authentication to mvc (not completely sure about auth)
* Not sure I can make mongodb work with entity framework, couldn't find any library for it. Guessing it's pretty hard to implement. Not very useful either as entity is an orm.

###1DV449
* Offline first seems pretty hard to implement in combination with realtime data across multiple clients (Need to implement some kind of queue and diffs).
* There will be a few issues with mobile first. I already have a design I want to start off with so the process can't be correct. Guessing document editor and drag & drop will be pretty hard to get right aswell.

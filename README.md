#Projise
##New
Site: (http://projise.azurewebsites.net)

##Old
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
* Will probably use signalr instead of socket.io.
* Remote management from IDE will not be implemented(it's not in there now either, just an idea in the model)
* I might skip team management and document management to save time.
* Add commit logs
* Add calendar functionality
* Add a home page showing some statistics to get more mvc views (this will be a few presentation pages, home, stats, about, contact)

##External Apis
Google calendar and contacts used for now.

##Bonus tasks
* add configurable public project reports using mvc (configuration in spa, public page in mvc)
* add private messages and voice chat to chatpanel
* add IDE remote
* make current travis tasks work with .net (if it's even possible)

#Projise
##Inledning
Projise är ett kollaborativt projekthanteringssystem som förenklar hantering av arbetslag, projekt samt dess uppgifter och dokument. Det finns mängder med liknande applikationer, men av de lösningar jag testat känns fortfarande kalkylblad och vanliga dokument vettigare, trots att det där är tråkigt att hålla dokument i synk. Visionen för min applikation är en enkel uppgiftshantering, dokumenthantering med markdown, hjälp med uppgiftsbedömning, undvika allt dubbeljobb och att presentera detta på ett överskådligt sätt.

##Domänmodell
![DomainModel](documentation/DomainModel.png)

Utförligare modeller: [Länk](documentation/domain.md)  
Modellerna beskriver inte applikationen utan är uppritade som ett mål att arbeta mot, men det är inga större skillnader.

##Serversida
Startsida, kontohantering, rapporter och första vy för SPA utnyttjar Asp.net MVC, vyer som hämtas in av SPA är statisk html och dess data hämtas från Asp.net Web API. SignalR används för synkronisering, MongoDB används för all användar- och projektdata, Entity framework(MSSQL) sköter data från Google Contacts och Google Calendar. Kalender och kontaktdata hämtas om befintlig data är äldre än en dag. Klientsidan hämtar data vid första förfrågan, denna hålls sedan synkroniserad med SignalR. Data som hämtas från externa APIer är tänkt att vara en bonus i kalendern, vars huvudsakliga syfte är att presentera viktiga projektdatum. För andra fel har jag en notifikationsservice på klienten som fångar upp felmeddelanden från servern i anropet och presenterar för användaren.

##Klientsida
Klientsidan är till största del angular, dess router är utbytt mot UI Router, Showdown används för visning av Markdown och Lodash nyttjas en del i koden. Till startsida, kontohantering och rapporter används Bootstrap och Jquery.

##Säkerhet
Det har varit svårt att hitta bra resurser för vad man ska tänka på för MongoDB i kombination med C#, men jag har testat en del och jag har iaf inte lyckats få någon javascript att köras i databasen. De fält jag tänker mig kan attackeras är textfält och dessa sparas som strängar i C#, dessa kan då aldrig sparas som något annat än strängar i databasen. Mot MSSQL används Entity framework som löser de möjliga attacker jag kan tänka mig där. Angular löser de problem jag kan komma på vid presentation av data. Överpostning och underpostning ska också vara en vanlig attack mot Asp.net. Vet inte om det är tillräckligt, men all input är väldefinierad. En tänkbar specifik attack skulle vara att sätta sig som medlem i ett projekt man inte ska ha tillgång till. Av denna anledning har jag försökt minska mängden platser där detta kan sättas. Aktivt projektId lagras på användaren och hämtas därifrån överallt där det behövs, det finns sedan bara ett anrop som kan sätta detta id. Vid detta anrop görs en kontroll att användaren tillhör projektet. Möjligen kan SignalR attackeras så att man blir medlem i ett annat projekts grupp och därför får tillgång till data man inte har rätt att se. Det finns dock inte möjlighet att redigera någon data via SignalR. För skydd mot CSRF utnyttjas Angulars standardfunktionalitet för detta. Serversidan genererar en token utifrån autentieringstoken och sätts som cookie med namnet XSRF-Token, vid varje request läser Angular denna och placerar dess värde som header med namnet X-XSRF-Token. Serversidan kontrollerar sedan att denna stämmer överens med det som skickats ut. I övrigt finns det diverse varianter av man in the middle attacker för datastöld eller vid fallet med externa apier att felaktig data kan komma in i databaser(här kontrolleras att det är rätt format, vet inte vad man mer kan göra). Lockout finns som skydd mot bruteforce attacker för inloggning. Det finns förmodligen också säkerhetsbrister i flera av de bibliotek som används. Med alla attackmöjligheter som finns är jag övertygad om att det finns luckor, förhoppningen är snarare att det kräver tillräckligt engagemang för att göra en attack ointressant.

##Prestanda
Bundling i Asp.net används för all css och js, vid release mode konkateneras, komprimeras och versionshanteras dessa. Detta har också utnyttjats för att skapa ett script som tar innehållet i samtliga partiella vyer och placerar i Angulars $templateCache. En del material hämtas också från CDN, fler av biblioteken som används finns tillgängliga via CDN, men har inte hunnit sätta mig in i hur detta hanteras. För skalning skulle backend för SignalR behövas, förslagsvis med Redis paketet som finns för detta, förmodligen bara en fråga om lite inställningar. Sharding och replikering borde också läggas till för MongoDB, men detta fungerar inte med gratis hosting. Databaserna skulle också kunna optimeras en del, indexering borde ses över och jag har kompromissat lite med MongoDB för att förenkla, exempelvis vid listning av projekt, här görs en förfrågan som letar efter användarid i alla projekts användarlistor, eftersom vi här redan har användaren hade det varit klart effektivare att ha en lista med delmängd av projekt på användaren.

Dokumenthanteringen är däremot ett riktigt stort problem, här skickas hela dokumentet varje gång det sparas. Operational transformation skulle behöva användas och jag har kikat lite på ot.js, men det får bli ett problem till något annat tillfälle.

Att jQuery, Bootstrap och Modernizr plockas in för startsida och kontohantering är rejält onödigt.

#Offline-first
Detta bör också ses som en optimering, Appcache har utnyttjats för att spara applikationen lokalt. För att inte hämta data i onödan eller störa de serverrenderade sidorna sätts Appcache när SPA laddas. En fallback sätts här också i form av en route från startsida till SPA. Manifest genereras av .net utifrån filer i bundles vid debug och direkt mot bundles vid release. Vid debug sätts en datumsträng för att undvika cache.

Status från SignalR används för att hålla reda på om användaren är online eller inte (det är bara kopplingen mot servern som är intressant).

###Anrop
För att fånga upp lyckade/misslyckade anrop används interceptor för Angulars $httpProvider.

####GET
Lyckade anrop sparas i localstorage och vid misslyckade anrop görs försök att hämta data därifrån.

####POST/PUT
Misslyckade anrop sparas i localstorage och dess data skickas till synkkomponenten för att uppdatera gränssnitt. För att kunna illustrera vilken data som är ur synk sätts en variabel på dessa objekt.

När koppling till servern sedan upptäcks gås listan från localstorage igenom för att försöka skicka dessa anrop på nytt, varpå objekten via synkkomponenten uppdateras och då blir av med sin variabel(notSynced).

####DELETE
Samtliga knappar som utför någon form av radering är satt till disabled vid arbete offline.

###Synkronisering
Om SignalR har varit anslutet buffras meddelanden som skulle ha skickats till klienten och skickas vid återanslutning.

####Problem
Om SignalR inte varit anslutet innan arbete offline kommer data från andra användare att saknas och systemet är ur synk. Min tanke här är att bygga en operationslogg så att ändringar sedan den data man har kan efterfrågas, men jag har inte hunnit lösa detta.

Det görs inga kontroller för om data ändrats sedan läsning, här tänker jag mig en lösning med optimistic concurrency; versionshantering på samtliga objekt och i första hand bara ett felmeddelande. I förlängningen skulle två formulär presenteras vid sidan av varandra. Ett med den data man försökt spara och ett med uppdaterad data från databasen. Kanske något försök till automatisk merge vid enklare objekt.

Det finns också lite problem med uppdateringen av användarnas gränssnitt vid synkroniseringen, data blir korrekt på servern, men en del events verkar försvinna i mängden, vilket gör att användargränssnitt hamnar ur synk.

##Reflektion
Det blev inte mycket till mashup, jag ville ha kopplingen med kalender, men kom inte på något bra att kombinera det med, att dra in contacts fyller enbart syftet att uppfylla krav på att kombinera data. Jag tänkte också utnyttja contacts till hjälp vid inbjudan av användare, men hann inte. Brände närmare två veckor på att att försöka uppfylla krav på användande av Entity framework, då med att leta efter provider för MongoDB och att sätta mig in i BrightstarDB(som jag sedan inte ens använt). Användandet av MongoDB blev också källa till många bekymmer, framförallt då ObjectId där .nets konverterande mellan json, bson och objekt behövde lite hjälp. Hade svårt att hitta bra resurser för hur allt skulle göras och det skiljde sig ganska mycket från hur jag arbetat mot MongoDB med NodeJS drivern.

Det finns mycket kvar jag skulle vilja göra, för det första att lösa alla de problem som nämnts med offline-first och dokumenthantering. Jag skulle också vilja fixa inställningar för vs så att de enhetstester jag har körs där och komma fram till hur man löser kontinuerlig integration med denna teknikkombination(likt den process som finns med travis för projektet jag utgått från). Klientsidan skulle refaktorerats en del och arbeta mer mot den modell jag har uppritad för det. Kopplingen mellan olika objekt och dokument och mallar. Visa diagram med d3.js, privata meddelanden, röstkommunikation med peer.js och bygga styrningen från IDE med ngdoc/jsdoc/vsdoc, dgeni och grunt/gulp.

Allt detta skulle jag förmodligen inte hinna lösa ens om jag fortsatte på det här som exjobb. Vet inte ens om det skulle vara ok och det finns ganska mycket andra verktyg/bibliotek jag är nyfiken på (React, Rxjs, TypeScript för att nämna ett fåtal). 

Teknikkombinationen har trots problemen med MongoDB varit riktigt trevlig, blir nog kanon när bättre stöd för NoSQL kommer med EF7. Har svårt för att bestämma mig för om jag gillar MEAN eller det här mest, men av allt jag testat hittils är det definitivt en av dessa som har ledningen. Lutar dock åt att C# vinner, mycket tack vare vinster med utvecklingsmiljö, gissar därför också på att TypeScript skulle vara riktigt trevligt.

Applikationen känns lite "halvbakad" och det stör mig att behöva lämna in den i detta skick. Det har dock varit väldigt lärorikt, allt utom Angular och MongoDB har varit helt nytt och alla bekymmer har lett till att jag fått sätta mig in i hur väldigt mycket fungerar.

##Risker
Tekniskt och säkerhetsmässigt tror jag att jag fått med allt relevant under tidigare rubriker, känns inte heller som det finns något större etiskt problem. Borde förmodligen inte be om rättigheter till kontakt- och kalenderdata förrän användare aktivt valt att visa denna data ihop med annan kalenderdata. 

Kalenderns huvudsyfte är att presentera egen kalenderdata, data från google apier blir därför endast en bonus och det känns därför inte som något större problem om tjänsten skulle stängas ner heller. Ekonomiskt skulle det kunna vara ett problem om Google börjar ta betalt för denna data, men om det skulle bli ett problem finns det goda möjligheter att tjäna betydligt mer pengar på tjänsten. Alternativt att bara plocka bort denna data från applikationen.

##Betygshöjande
Trots brister med offline first och bristande kodkvalitet i socket.service.js är det förmodligen offline first och synkronisering som är de mest intressanta komponenterna. Storleken på applikationen har lett till många minus pga tidsbrist, så jag hoppas att det samtidigt är ett plus. Jag har inte lyckats köra mina enhetstester inuti VS, men det finns 106 enhetstester för js(19 orelevanta tester skippade), täckningsrapport skapas om karma start körs i foldern med karma.conf.js.

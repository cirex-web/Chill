Devpost link: https://devpost.com/software/chill-v4xn76
## Inspiration
On a day-to-day basis, many of us get distracted by various websites through mindless internet browsing. These websites can serve as a huge hindrance to our productivity, especially if our self-control isn't the best.
## What it does
Chill is an extension that blocks websites of your choice... with a catch. Unlike other site blockers, you can temporarily unblock webpages that you've blocked, but we made sure to give you some extra time to think about if scrolling Twitter or watching Youtube is *really* worth it.
![image](https://user-images.githubusercontent.com/57322506/120670948-4c8e4580-c467-11eb-92ef-cf556377704d.png)

In addition to a delay before site access, users also must enter a justification for using the site. They will only be able to approve it right before site access.

![image](https://user-images.githubusercontent.com/57322506/120670916-44cea100-c467-11eb-9aeb-903483ef043d.png)

## How we built it
We used chrome's inbuilt storage plus HTML, CSS, JS, and JSON. Due to the nature of this hack, real-time script-to-script communication was also implemented. 

## Challenges we ran into
Blocking and unblocking websites, adding and removing HTML and CSS dynamically, and abiding by Chrome's Cross-origin resource sharing policies (CORS) that restrict certain capabilities of HTML, CSS, and JS were all challenges we had to solve. Additionally, we had to make sure that all sites were properly synced up in real-time to the blocked site list, as there shouldn't be visual discrepancies between two tabs open to the same site.

![](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/514/681/datas/original.png)
(old screenshot)
## Accomplishments that we're proud of
Some accomplishments that we're proud of include proper functionality of the extension, the interface, the fail-proof backend handling of requests sent by the popup/content scripts, as well as the involvement of ES6 modules in the frontend scripts.

## What we learned
We learned (or relearned) how to build Chrome extensions and how tools like HTML, CSS, JS, and JSON can become extremely powerful when used properly. 

## What's next for Chill
In the future, Chill will receive an update that enables temporarily blocking a site. It will likely be published as an official chrome extension by that time.

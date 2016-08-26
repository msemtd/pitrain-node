# pitrain-node
Pi memorisation tool using the Major System and the CMU phonetic dictionary.

TODO list:-
* import and cache CMUdict, phonemes, major-mappings, etc. - DONE
* page for major system help - just link to wikipedia to start with
* provide form to query groups of digits and initiate searches for major mappings - DONE
** this is the early important one: need simple UI for querying blocks of pi digits (initially only in 10s) and working on those blocks - DONE
** fields: pi digit block start, pi digit block length, or text digits field entered by user
** buttons to select digits or work on digits - all async if possible - render to single page or multi page?
* page for CMU dict words search on a digit sequence - DONE
** minimum length filter - cache results? - DONE
*** show cache - cache to files - cache to CSV or TSV?
*** automatically create caches of files for 1000 digits with this system? Min 2 digit words
* CSV production with caching
* word choosing form - processes cached search
* use a templating engine within express - DONE
** just choose one? - using the default Jade/Pug but getting increadsingly annoyed with it!
** I want async partials (I think!) - using AJAX to pass back blocks of data during scan
** single page would be rad
* authentication, etc.



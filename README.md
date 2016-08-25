# pitrain-node
Pi memorisation tool using the Major System and the CMU phonetic dictionary.

TODO list:-
* import and cache CMUdict, phonemes, major-mappings, etc. - DONE
* page for major system help - just link to wikipedia to start with
* provide form to query groups of digits and initiate searches for major mappings
** this is the early important one: need simple UI for querying blocks of pi digits (initially only in 10s) and working on those blocks
** fields: pi digit block start, pi digit block length, or text digits field entered by user
** buttons to select digits or work on digits - all async if possible - render to single page or multi page?
* page for CMU dict words search on a digit sequence
** minimum length filter - cache results?
*** show cache - cache to files - cache to CSV or TSV?
*** automatically create caches of files for 1000 digits with this system? Min 2 digit words
* CSV production with caching
* word choosing form - processes cached search
* use a pemplating engine within express 
** just choose one? 
** I want async partials (I think!)
** single page would be rad
* authentication, etc.



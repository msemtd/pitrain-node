/*
    majorscan
    Scan for major system digit sequences in CMU dictionary entries



    The dictionary is big so we don't want to search the whole thing 
    before coming back with results. It makes sense to pass around an iterator
    object that keeps track of the position in the dictionary so a search 
    can be paused and resumed from the current place.
    
    When getting results with AJAX we might want to chunk them or just grab 
    single results. We might want to send back a message saying "I'm still searching"
    if it is taking a long time to find the next item. We want to send back a 
    message saying "finished" when all items have been processed. In general we 
    want live progress feedback for a search. We want to be able to cancel a long 
    search, and this all has to be multi-user and multi-session aware!
    
    
    
   
*/

// perhaps this needs a search context to pass to callback
function majorWordCheckNext(digits, dict, minimumDigits, i, cbfunc)
{
    var doot = (typeof(cbfunc) === 'function');
    if(i < 0 || i >= dict.length)
        return("out of range");
    var e = dict[i];
    //[word, phonemes, mapped_phonemes, mapped_phonemes_length]
    if(e[3] < minimumDigits) return;
    // position found within digits
    var pos = digits.indexOf(e[2]);
    if(pos < 0) return;
    // decorate digits string with <before>[<found word>]<after>
    var decorated_digits = digits.split(e[2]).join("["+e[2]+"]");
    // do something with data...
    if(doot)
        cbfunc(e, pos, i, decorated_digits);
}

// look for each CMU dictionary entry (as a major digit sequence) within the given digit string
// digits string
// CMU dictionary
// minimum number of digits to match
// callback function - accepting position int, cmu dict entry, NOT decorated string showing major work match position
function majorWordScan(digits, dict, minimumDigits, cbfunc)
{
    var doot = (typeof(cbfunc) === 'function');
    // iterate dictionary
    for(var i = 0; i < dict.length; i++){
        var e = dict[i];
        //[word, phonemes, mapped_phonemes, mapped_phonemes_length]
        if(e[3] < minimumDigits) continue;
        var pos = digits.indexOf(e[2]);
        if(pos < 0) continue;
        // do something with data...
        if(doot)
            cbfunc(e, pos);
    }
}



//~ public static void MajorWordScanPi(int start, int count, List<CmuDict.Dentry> d, int minimumDigits)
//~ {
    //~ var digits = PiDigits.GetDigitsString(start, count);
    //~ // split up into groups of 10 digits as I don't want to have words that span these boundaries - stick in some spacing...
    //~ digits = Regex.Replace(digits, ".{10}", "$0 ");
    //~ log.Info("Scanning " + count + "digits from " + start + " with a collecting callback...");
    //~ Stopwatch s1 = Stopwatch.StartNew();
    //~ List<Tuple<int, CmuDict.Dentry, string>> funStuff = new List<Tuple<int, CmuDict.Dentry, string>>();
    //~ Func<CmuDict.Dentry, int, string, bool> callback = (e, pos, map) => {
        //~ funStuff.Add(Tuple.Create(pos, e, map));
        //~ return true;
    //~ };
    //~ DigitScanner(d, digits, minimumDigits, callback);
    //~ s1.Stop();
    //~ log.Info("collecting callback found " + funStuff.Count + " words in " + s1.Elapsed.TotalMilliseconds + " ms");

    //~ // sort the collection by word position...
    //~ log.Info("Sorting collected hits by hit position...");
    //~ s1 = Stopwatch.StartNew();

    //~ funStuff.Sort((x, y) => x.Item1.CompareTo(y.Item1));
    //~ s1.Stop();
    //~ log.Info("sort took " + s1.Elapsed.TotalMilliseconds + " ms");
    //~ // Write to file...
    //~ var csvFile = "sorted_major_pi_from_" + start + "_for_" + count + ".csv";
    //~ log.Info("Writing results to file: " + csvFile);
    //~ try {
        //~ var sw = new StreamWriter(csvFile);
        //~ sw.WriteLine("{0},{1},{2},{3},{4},{5}", "position", "word", "maj", "len", "phones", "map");
        //~ foreach (var a in funStuff) {
            //~ var e = a.Item2;
            //~ sw.WriteLine("{0},{1},{2},{3},{4},{5}", a.Item1, e.word, e.maj, e.ml, e.phones, a.Item3);
        //~ }
        //~ sw.Close();
    //~ } catch (Exception x) {
        //~ log.Error("failed: " + x.Message);
    //~ }
    //~ log.Info("Finished writing results to file: " + csvFile);
//~ }


//~ private static void DigitScanner(List<CmuDict.Dentry> d, string digits, int minimumDigits, Func<CmuDict.Dentry, int, string, bool> callback)
//~ {
    //~ foreach (var e in d) {
        //~ if (e.ml < minimumDigits) continue;
        //~ var pos = digits.IndexOf(e.maj);
        //~ if (pos < 0) continue;
        //~ var map = digits.Substring(0, pos) + "[" + digits.Substring(pos, e.ml) + "]" + digits.Substring(pos + e.ml);
        //~ // do something with data...
        //~ if(callback != null) {
            //~ if (!callback.Invoke(e, pos, map))
                //~ return;
        //~ }
    //~ }
//~ }

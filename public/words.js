// Common English words for typing test
const WORDS = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
    "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
    "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
    "is", "was", "are", "been", "has", "had", "were", "said", "did", "having",
    "may", "should", "could", "being", "does", "did", "doing", "would", "could", "ought",
    "am", "is", "are", "was", "were", "be", "being", "been", "have", "has",
    "had", "do", "does", "did", "shall", "will", "should", "would", "may", "might",
    "must", "can", "could", "ought", "need", "dare", "used", "having", "getting", "making",
    "going", "coming", "taking", "seeing", "knowing", "thinking", "looking", "wanting", "giving", "using",
    "finding", "telling", "asking", "working", "seeming", "feeling", "leaving", "putting", "meaning", "keeping",
    "letting", "beginning", "showing", "trying", "calling", "running", "moving", "living", "believing", "bringing",
    "happening", "writing", "sitting", "standing", "losing", "paying", "meeting", "including", "continuing", "setting",
    "learning", "changing", "leading", "understanding", "watching", "following", "stopping", "creating", "speaking", "reading",
    "allowing", "adding", "spending", "growing", "opening", "walking", "winning", "offering", "remembering", "loving",
    "considering", "appearing", "buying", "waiting", "serving", "dying", "sending", "building", "staying", "falling",
    "cutting", "reaching", "killing", "remaining", "suggesting", "raising", "passing", "selling", "requiring", "reporting",
    "deciding", "pulling", "producing", "eating", "covering", "catching", "drawing", "choosing", "returning", "breaking",
    "driving", "throwing", "holding", "wearing", "carrying", "singing", "dancing", "listening", "hearing", "tasting",
    "smelling", "touching", "feeling", "seeing", "watching", "looking", "noticing", "observing", "viewing", "examining",
    "computer","keyboard","monitor","screen","software","hardware","network","internet","browser","website",
"server","database","coding","programming","algorithm","function","variable","object","array","string",
"number","boolean","syntax","compile","execute","debug","deploy","repository","version","commit",
"branch","merge","request","review","developer","engineer","designer","project","product","system",

"school","college","student","teacher","lesson","course","subject","knowledge","learning","practice",
"exercise","example","question","answer","problem","solution","method","concept","theory","research",

"morning","afternoon","evening","night","today","tomorrow","yesterday","always","sometimes","never",
"often","rarely","quickly","slowly","carefully","easily","hardly","nearly","almost","together",

"music","movie","story","chapter","paragraph","sentence","letter","symbol","language","culture",
"history","science","nature","energy","matter","planet","galaxy","universe","gravity","motion",

"apple","banana","orange","grape","mango","peach","pear","melon","berry","lemon",
"coffee","tea","water","bread","butter","cheese","sugar","salt","spice","flavor",

"travel","journey","adventure","explore","discover","wander","mountain","river","forest","desert",
"ocean","island","village","city","country","nation","border","street","bridge","station",

"happy","excited","curious","calm","peaceful","brave","strong","clever","creative","bright",
"gentle","kind","friendly","honest","loyal","patient","proud","careful","helpful","thoughtful",

"future","present","past","moment","second","minute","hour","week","month","year",
"dream","goal","plan","idea","vision","progress","success","failure","effort","result",
"ability","absence","academy","account","action","activity","actor","addition","address","advance",
"advice","agency","agreement","airport","analysis","animal","answer","anxiety","appeal","appearance",
"application","appointment","argument","arrival","article","assistant","attention","attitude","audience","author",

"balance","battle","beauty","benefit","biology","birthday","business","button","camera","capital",
"career","category","celebration","center","century","challenge","chance","character","choice","citizen",
"climate","clothes","collection","community","company","competition","computer","concert","condition","conference",

"confidence","connection","construction","context","control","conversation","country","courage","creation","culture",
"customer","damage","danger","decision","definition","delivery","department","design","development","difference",
"difficulty","direction","discussion","disease","distance","distribution","doctor","document","education","effect",

"efficiency","effort","emotion","employee","employer","energy","environment","equipment","event","evidence",
"example","exchange","experience","expert","expression","failure","family","feature","feedback","feeling",
"festival","finance","fitness","flight","focus","football","freedom","friendship","function","future",

"garden","generation","government","growth","guidance","happiness","health","hearing","history","holiday",
"hospital","housing","human","identity","imagination","importance","improvement","independence","industry","information",

"initiative","innovation","inspiration","instance","instruction","intelligence","interaction","interest","investment","knowledge",
"language","leadership","library","lifestyle","location","machine","management","manager","marketing","material",

"medicine","memory","message","method","midnight","mission","moment","movement","musician","mystery",
"nature","negotiation","network","opinion","opportunity","operation","organization","outcome","performance","permission",

"personality","perspective","philosophy","photograph","physics","planning","platform","player","pleasure","population",
"position","possibility","power","practice","presence","pressure","priority","process","product","profession",

"profit","progress","project","promotion","property","protection","purpose","quality","quantity","question",
"reaction","reality","reason","recognition","recommendation","record","recovery","reflection","relationship","reputation",

"requirement","research","resolution","resource","responsibility","restaurant","result","revenue","review","science",
"security","selection","service","situation","society","solution","source","speaker","specialist","strategy",

"strength","structure","student","success","suggestion","support","system","technology","temperature","theory",
"thought","tradition","training","transport","treatment","understanding","university","variety","vehicle","version",

"victory","village","vision","visitor","volume","warning","weather","wedding","welcome","winner",
"wisdom","worker","writer","youth","zone","ability","absence","academy","accuracy","achievement",

"adaptation","addition","adjustment","admission","advantage","adventure","advertising","affair","affection","afternoon",
"agreement","airline","airport","ambition","analysis","announcement","anxiety","apartment","appeal","appearance",

"application","appointment","argument","arrival","article","assistant","attention","attitude","audience","author",
"background","balance","battle","beauty","behavior","benefit","biology","birthday","boundary","building",

"business","calendar","campaign","capacity","capital","career","category","celebration","center","century",
"challenge","champion","chance","character","choice","citizen","climate","clothes","collection","community",

"company","competition","computer","concert","condition","conference","confidence","connection","construction","context",
"control","conversation","country","courage","creation","culture","customer","damage","danger","decision",

"definition","delivery","department","design","development","difference","difficulty","direction","discussion","disease",
"distance","distribution","document","education","effect","efficiency","effort","emotion","employee","employer"
];

const PUNCTUATION = ['.', ',', '!', '?', ';', ':', '-', '(', ')'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

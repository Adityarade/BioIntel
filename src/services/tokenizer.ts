export const BIOMEDICAL_STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
  "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
  "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is",
  "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no",
  "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves",
  "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
  "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there",
  "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
  "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom",
  "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your",
  "yours", "yourself", "yourselves",
  // Academic fillers
  "study", "studies", "results", "demonstrate", "analyzed", "findings", "via", "well", "using", "also", "shows"
]);

export function cleanText(text: string): string {
  if (!text) return "";
  return text.replace(/[\r\n\t]+/g, " ").trim();
}

export function tokenize(text: string, removeStopwords: boolean = true): string[] {
  if (!text) return [];
  
  // Extract alphanumeric sequences with internal hyphens (preserves genes like 'BRCA1', 'TNF-alpha', 'anti-PD-1')
  const rawTokens = text.toLowerCase().match(/[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*/g) || [];
  
  if (!removeStopwords) return rawTokens;
  
  return rawTokens.filter(t => !BIOMEDICAL_STOPWORDS.has(t) && t.length > 1);
}

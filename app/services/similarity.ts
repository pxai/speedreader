function calculateSimilarity(str1: string, str2: string): number {
  // Tokenize the strings into sets of words
  const set1 = new Set(str1.split(/\s+/));
  const set2 = new Set(str2.split(/\s+/));

  // Calculate the intersection
  const intersection = new Set([...set1].filter(word => set2.has(word)));

  // Calculate the union
  const union = new Set([...set1, ...set2]);

  // Calculate Jaccard similarity
  const jaccardSimilarity = intersection.size / union.size;

  // Convert to percentage
  return jaccardSimilarity * 100;
}

export default calculateSimilarity;

// Example usage
// const str1 = "This is a sample string with several words";
// const str2 = "This is another sample string with different words";

// const similarityPercentage = calculateSimilarity(str1, str2);
// console.log(`Similarity: ${similarityPercentage.toFixed(2)}%`);